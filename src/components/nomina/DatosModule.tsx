import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatosConfig } from "@/types/nomina";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

interface DatosModuleProps {
  datos: DatosConfig;
  onUpdate: (datos: DatosConfig) => void;
  onContinue?: () => void;
  variant?: "landing" | "standard";
}

const isFormComplete = (datos: DatosConfig): boolean => {
  return datos.empresa.trim() !== "" && datos.mes !== "" && datos.fechaCorte !== "";
};

export default function DatosModule({
  datos,
  onUpdate,
  onContinue,
  variant = "standard",
}: DatosModuleProps) {
  const [localDatos, setLocalDatos] = useState(datos);

  const isLanding = variant === "landing";

  useEffect(() => {
    setLocalDatos(datos);
  }, [datos]);

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

  const baseInputClasses = "h-12 w-full text-base rounded-2xl bg-background transition";
  const landingInputClasses =
    "border-emerald-100 bg-white/90 shadow-sm focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:border-emerald-400";
  const standardInputClasses = "border-muted";

  const formFields = (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="empresa" className="text-sm font-medium text-muted-foreground">
          Nombre de la empresa
        </Label>
        <Input
          id="empresa"
          value={localDatos.empresa}
          onChange={(e) => handleChange("empresa", e.target.value)}
          placeholder="Ingrese el nombre de su empresa"
          className={cn(
            baseInputClasses,
            isLanding ? landingInputClasses : standardInputClasses,
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="mes" className="text-sm font-medium text-muted-foreground">
            Mes del período
          </Label>
          <Select value={localDatos.mes} onValueChange={(value) => handleChange("mes", value)}>
            <SelectTrigger
              id="mes"
              className={cn(
                baseInputClasses,
                "justify-between",
                isLanding ? landingInputClasses : standardInputClasses,
              )}
            >
              <SelectValue placeholder="Seleccione mes" />
            </SelectTrigger>
            <SelectContent>
              {MESES.map((mes) => (
                <SelectItem key={mes} value={mes} className="text-base">
                  {mes}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fechaCorte" className="text-sm font-medium text-muted-foreground">
            Fecha de corte
          </Label>
          <Input
            id="fechaCorte"
            type="date"
            value={localDatos.fechaCorte}
            onChange={(e) => handleChange("fechaCorte", e.target.value)}
            className={cn(
              baseInputClasses,
              isLanding ? landingInputClasses : standardInputClasses,
            )}
          />
        </div>
      </div>
    </div>
  );

  const actionArea = (
    <div
      className={
        isLanding
          ? "space-y-5"
          : "pt-6 border-t space-y-4"
      }
    >
      <div
        className={
          isLanding
            ? "flex items-center justify-between rounded-3xl border border-emerald-100 bg-emerald-50/70 px-6 py-4 shadow-sm"
            : "flex items-center justify-between p-4 bg-muted rounded-lg"
        }
      >
        <span className="text-base font-medium">Días del mes</span>
        <span className="text-2xl font-bold text-emerald-600">{localDatos.diasMes}</span>
      </div>

      {isFormComplete(localDatos) ? (
        <Button
          onClick={handleContinue}
          size="lg"
          className={cn(
            "w-full h-12 text-base gap-2 rounded-2xl",
            isLanding ? "bg-emerald-500 hover:bg-emerald-600" : "",
          )}
        >
          Continuar a Nómina
          <ArrowRight className="h-5 w-5" />
        </Button>
      ) : (
        <div
          className={
            isLanding
              ? "rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/70 px-6 py-4 text-center"
              : "p-4 bg-muted/50 border border-dashed rounded-lg"
          }
        >
          <p className="text-sm text-muted-foreground">
            Complete todos los campos para continuar
          </p>
        </div>
      )}
    </div>
  );

  if (isLanding) {
    return (
      <div className="space-y-10">
        <header className="space-y-3 text-center md:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Configuración
          </p>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
              Configura tu período de nómina
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground">
              Completa los datos iniciales para comenzar a gestionar los roles de pago de tu empresa.
            </p>
          </div>
        </header>

        {formFields}

        {actionArea}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
          Bienvenido
        </p>
        <h1 className="text-4xl font-bold">Sistema de Nómina</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Configure los datos generales del período de nómina para comenzar
        </p>
      </div>

      <Card className="rounded-3xl border px-8 py-10 shadow-sm">
        <div className="space-y-8">
          {formFields}
          {actionArea}
        </div>
      </Card>
    </div>
  );
}
