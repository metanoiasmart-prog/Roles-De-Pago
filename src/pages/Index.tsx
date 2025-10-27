import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatosModule from "@/components/nomina/DatosModule";
import NominaModule from "@/components/nomina/NominaModule";
import RolPagosModule from "@/components/nomina/RolPagosModule";
import { DatosConfig, Empleado } from "@/types/nomina";

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
        <main className="min-h-screen bg-white px-6 py-16">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 md:flex-row md:items-center">
            <div className="relative flex justify-center md:flex-1">
              <div className="relative w-full max-w-xl">
                <div className="relative overflow-hidden rounded-[32px] border border-muted bg-muted/40 p-10 shadow-lg">
                  <div className="absolute -left-16 top-10 h-32 w-32 rounded-full bg-emerald-100 blur-3xl" />
                  <div className="absolute -right-10 bottom-0 h-36 w-36 rounded-full bg-emerald-200 blur-3xl" />
                  <img
                    src="/nomina-landing-illustration.svg"
                    alt="Ilustración de sistema de nómina"
                    className="relative z-10 h-auto w-full"
                  />
                </div>
              </div>
            </div>

            <div className="w-full md:max-w-md">
              <div className="rounded-[32px] border border-zinc-200 bg-white px-10 py-12 shadow-xl shadow-emerald-100/60">
                <DatosModule
                  datos={datos}
                  onUpdate={setDatos}
                  onContinue={() => setActiveTab("nomina")}
                  variant="landing"
                />
              </div>
            </div>
          </div>
        </main>
      ) : (
        <>
          <header className="border-b bg-card">
            <div className="container mx-auto px-6 py-4">
              <div>
                <h1 className="text-xl font-bold">{datos.empresa}</h1>
                <p className="text-sm text-muted-foreground">
                  {datos.mes} - Corte: {new Date(datos.fechaCorte).toLocaleDateString("es-ES")}
                </p>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-6 py-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 h-12">
                <TabsTrigger value="datos" className="text-sm">Datos</TabsTrigger>
                <TabsTrigger value="nomina" disabled={!canAccessNomina} className="text-sm">Nómina</TabsTrigger>
                <TabsTrigger value="rol" disabled={!canAccessRol} className="text-sm">Rol de Pagos</TabsTrigger>
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
