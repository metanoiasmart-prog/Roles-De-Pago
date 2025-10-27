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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {activeTab === "datos" ? (
        <main className="min-h-screen flex items-center justify-center px-6 py-12 animate-fade-in">
          <DatosModule
            datos={datos}
            onUpdate={setDatos}
            onContinue={() => setActiveTab("nomina")}
          />
        </main>
      ) : (
        <>
          <header className="border-b bg-card/80 backdrop-blur-lg shadow-soft sticky top-0 z-50">
            <div className="container mx-auto px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-gradient-primary shadow-medium">
                  <FileSpreadsheet className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {datos.empresa}
                  </h1>
                  <p className="text-sm text-muted-foreground font-medium">
                    {datos.mes} - Corte: {new Date(datos.fechaCorte).toLocaleDateString("es-ES")}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-6 py-10">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 h-14 bg-card shadow-medium border">
                <TabsTrigger value="datos" className="text-sm gap-2 data-[state=active]:shadow-medium transition-all">
                  <FileSpreadsheet className="h-5 w-5" />
                  <span className="font-semibold">Datos</span>
                </TabsTrigger>
                <TabsTrigger value="nomina" disabled={!canAccessNomina} className="text-sm gap-2 data-[state=active]:shadow-medium transition-all">
                  <Users className="h-5 w-5" />
                  <span className="font-semibold">Nómina</span>
                </TabsTrigger>
                <TabsTrigger value="rol" disabled={!canAccessRol} className="text-sm gap-2 data-[state=active]:shadow-medium transition-all">
                  <Calculator className="h-5 w-5" />
                  <span className="font-semibold">Rol de Pagos</span>
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
