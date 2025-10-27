import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatosModule from "@/components/nomina/DatosModule";
import NominaModule from "@/components/nomina/NominaModule";
import RolPagosModule from "@/components/nomina/RolPagosModule";
import { DatosConfig, Empleado } from "@/types/nomina";
import { Button } from "@/components/ui/button";
import { CalendarDays, CheckCircle2, Users } from "lucide-react";

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
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-sky-50">
          <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-emerald-200/50 blur-3xl" />
          <div className="absolute bottom-[-160px] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-sky-200/30 blur-3xl" />
          <div className="absolute right-[-180px] top-[-120px] h-[480px] w-[480px] rounded-full bg-emerald-300/40 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_60%)]" />

          <div className="relative z-10 flex min-h-screen flex-col">
            <header className="px-6 pt-10">
              <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-lg font-bold text-white shadow-lg shadow-emerald-500/40">
                    RP
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-slate-900">Roles de Pago</p>
                    <p className="text-sm text-slate-500">Gestión de nómina inteligente</p>
                  </div>
                </div>

                <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 lg:flex">
                  <a className="hover:text-emerald-600" href="#beneficios">
                    Beneficios
                  </a>
                  <a className="hover:text-emerald-600" href="#caracteristicas">
                    Características
                  </a>
                  <a className="hover:text-emerald-600" href="#soporte">
                    Soporte
                  </a>
                </nav>

                <div className="hidden items-center gap-4 lg:flex">
                  <Button variant="ghost" className="text-slate-700 hover:text-emerald-600">
                    Documentación
                  </Button>
                  <Button className="rounded-full bg-emerald-500 px-6 text-white hover:bg-emerald-600">
                    Iniciar sesión
                  </Button>
                </div>

                <Button variant="outline" className="rounded-full border-emerald-200 text-emerald-600 lg:hidden">
                  Menú
                </Button>
              </div>
            </header>

            <main className="flex flex-1 items-center">
              <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-6 pb-16 lg:grid-cols-[1.05fr_0.95fr]">
                <section className="space-y-10 text-center lg:text-left">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-4 py-1 text-sm font-medium text-emerald-600 shadow-sm backdrop-blur">
                      <CheckCircle2 className="h-4 w-4" />
                      Nuevo módulo de roles de pago
                    </span>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                      Controla cada detalle de tu nómina con precisión
                    </h1>
                    <p className="text-lg leading-relaxed text-slate-600 md:max-w-xl">
                      Centraliza la información de tu empresa, automatiza cálculos y entrega roles de pago impecables con una experiencia diseñada para equipos de talento humano.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2" id="beneficios">
                    <div className="flex items-start gap-4 rounded-3xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-slate-900">Validación automática</p>
                        <p className="text-sm text-slate-600">Comprueba montos y deducciones en tiempo real.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-3xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <CalendarDays className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-slate-900">Períodos flexibles</p>
                        <p className="text-sm text-slate-600">Configura cortes y días laborables de forma personalizada.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-6 pt-6 lg:justify-start" id="caracteristicas">
                    <div className="rounded-3xl border border-white/80 bg-white/90 px-6 py-4 shadow-xl shadow-emerald-100/50 backdrop-blur">
                      <p className="text-sm text-slate-500">Empleados gestionados</p>
                      <p className="text-3xl font-semibold text-emerald-600">+120</p>
                    </div>
                    <div className="flex items-center gap-3 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-left shadow-sm backdrop-blur" id="soporte">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Soporte dedicado</p>
                        <p className="text-xs text-slate-500">Acompañamiento 24/7 para tu equipo.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <aside className="relative w-full">
                  <div className="absolute inset-0 -z-10 rounded-[36px] bg-gradient-to-br from-emerald-200/40 via-white to-sky-200/40 blur-2xl" />
                  <div className="relative rounded-[36px] border border-white/70 bg-white/95 p-10 shadow-[0_40px_90px_-40px_rgba(16,185,129,0.55)] backdrop-blur">
                    <div className="absolute -top-10 right-16 hidden h-24 w-24 rounded-full bg-emerald-400/30 blur-2xl sm:block" />
                    <DatosModule
                      datos={datos}
                      onUpdate={setDatos}
                      onContinue={() => setActiveTab("nomina")}
                      variant="landing"
                    />
                  </div>
                </aside>
              </div>
            </main>
          </div>
        </div>
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
