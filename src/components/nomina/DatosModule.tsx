import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatosConfig } from "@/types/nomina";
import { Calendar, FileSpreadsheet, ArrowRight, Building2 } from "lucide-react";

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

interface DatosModuleProps {
  datos: DatosConfig;
  onUpdate: (datos: DatosConfig) => void;
  onContinue?: () => void;
}

const isFormComplete = (datos: DatosConfig): boolean => {
  return datos.empresa.trim() !== "" && datos.mes !== "" && datos.fechaCorte !== "";
};

export default function DatosModule({ datos, onUpdate, onContinue }: DatosModuleProps) {
  const [localDatos, setLocalDatos] = useState(datos);

  const handleChange = (field: keyof DatosConfig, value: string) => {
    const updated = { ...localDatos, [field]: value };

    if (field === "mes") {
      updated.diasMes = 30;
    }

    setLocalDatos(updated);
    onUpdate(updated);
  };

  const handleContinue = () => {
    if (isFormComplete(localDatos) && onContinue) {
      onContinue();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-6">
          <div className="rounded-2xl gradient-primary p-6 shadow-large animate-pulse">
            <FileSpreadsheet className="h-14 w-14 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Sistema de Nómina
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
          Configure los datos generales del período de nómina para comenzar
        </p>
      </div>

      <Card className="p-10 shadow-large border-2 backdrop-blur-sm bg-card/95 animate-slide-up">
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <Label htmlFor="empresa" className="text-base font-semibold">
                  Nombre de la Empresa
                </Label>
              </div>
              <Input
                id="empresa"
                value={localDatos.empresa}
                onChange={(e) => handleChange("empresa", e.target.value)}
                placeholder="Ingrese el nombre de su empresa"
                className="h-14 text-base transition-all focus:ring-2 focus:ring-primary/20 shadow-soft"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <Label htmlFor="mes" className="text-base font-semibold">
                    Mes del Período
                  </Label>
                </div>
                <Select value={localDatos.mes} onValueChange={(value) => handleChange("mes", value)}>
                  <SelectTrigger id="mes" className="h-14 text-base transition-all focus:ring-2 focus:ring-primary/20 shadow-soft">
                    <SelectValue placeholder="Seleccione mes" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover shadow-large border-2">
                    {MESES.map((mes) => (
                      <SelectItem key={mes} value={mes} className="text-base hover:bg-primary/10 transition-colors">
                        {mes}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <Label htmlFor="fechaCorte" className="text-base font-semibold">
                    Fecha de Corte
                  </Label>
                </div>
                <Input
                  id="fechaCorte"
                  type="date"
                  value={localDatos.fechaCorte}
                  onChange={(e) => handleChange("fechaCorte", e.target.value)}
                  className="h-14 text-base transition-all focus:ring-2 focus:ring-primary/20 shadow-soft"
                />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t-2 space-y-5">
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl shadow-medium backdrop-blur-sm border">
              <span className="text-lg font-semibold text-foreground">Días del mes:</span>
              <span className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">{localDatos.diasMes}</span>
            </div>

            {isFormComplete(localDatos) ? (
              <Button
                onClick={handleContinue}
                size="lg"
                className="w-full h-14 text-lg gap-3 shadow-large hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                Continuar a Nómina
                <ArrowRight className="h-6 w-6" />
              </Button>
            ) : (
              <div className="p-6 bg-muted/40 border-2 border-dashed rounded-xl shadow-soft">
                <p className="text-base text-center text-muted-foreground font-medium">
                  Complete todos los campos para continuar
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
