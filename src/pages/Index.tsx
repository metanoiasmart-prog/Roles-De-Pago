import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatosModule from "@/components/nomina/DatosModule";
import NominaModule from "@/components/nomina/NominaModule";
import RolPagosModule from "@/components/nomina/RolPagosModule";
import { DatosConfig, Empleado } from "@/types/nomina";
import { FileSpreadsheet, Users, Calculator } from "lucide-react";

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const getCurrentMonth = () => {
  const monthIndex = new Date().getMonth();
  return MESES[monthIndex];
};

const Index = () => {
  const [datos, setDatos] = useState<DatosConfig>({
    id: "1",
    empresa: "",
    mes: getCurrentMonth(),
    fechaCorte: new Date().toISOString().split("T")[0],
    diasMes: 30,
  });

  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [activeTab, setActiveTab] = useState("datos");

  const canAccessNomina = datos.empresa.trim() !== "";
  const canAccessRol = canAccessNomina && empleados.length > 0;

  return (
    <div className="min-h-screen bg-background">
      {activeTab === "datos" ? (
        <main className="min-h-screen flex items-center justify-center px-6 py-12">
          <DatosModule
            datos={datos}
            onUpdate={setDatos}
            onContinue={() => setActiveTab("nomina")}
          />
        </main>
      ) : (
        <>
          <header className="border-b bg-card">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="h-8 w-8" />
                <div>
                  <h1 className="text-xl font-bold">{datos.empresa}</h1>
                  <p className="text-sm text-muted-foreground">
                    {datos.mes} - Corte: {new Date(datos.fechaCorte).toLocaleDateString("es-ES")}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-6 py-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 h-12">
                <TabsTrigger value="datos" className="text-sm gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  Datos
                </TabsTrigger>
                <TabsTrigger value="nomina" disabled={!canAccessNomina} className="text-sm gap-2">
                  <Users className="h-4 w-4" />
                  Nómina
                </TabsTrigger>
                <TabsTrigger value="rol" disabled={!canAccessRol} className="text-sm gap-2">
                  <Calculator className="h-4 w-4" />
                  Rol de Pagos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="datos" className="space-y-4">
                <DatosModule
                  datos={datos}
                  onUpdate={setDatos}
                  onContinue={() => setActiveTab("nomina")}
                />
              </TabsContent>

              <TabsContent value="nomina" className="space-y-4">
                <NominaModule
                  empleados={empleados}
                  onUpdate={setEmpleados}
                  empresa={datos.empresa}
                />
              </TabsContent>

              <TabsContent value="rol" className="space-y-4">
                <RolPagosModule empleados={empleados} datos={datos} />
              </TabsContent>
            </Tabs>
          </main>
        </>
      )}
    </div>
  );
};

export default Index;
