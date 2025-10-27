import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Empleado } from "@/types/nomina";
import { Plus, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NominaModuleProps {
  empleados: Empleado[];
  onUpdate: (empleados: Empleado[]) => void;
  empresa: string;
}

export default function NominaModule({ empleados, onUpdate, empresa }: NominaModuleProps) {
  const calcularAplicaFondoReserva = (fechaIngreso: string): boolean => {
    if (!fechaIngreso) return false;
    const fechaIngresoDate = new Date(fechaIngreso);
    const hoy = new Date();
    const diferenciaMs = hoy.getTime() - fechaIngresoDate.getTime();
    const diasDiferencia = diferenciaMs / (1000 * 60 * 60 * 24);
    return diasDiferencia >= 365;
  };

  const handleAddEmpleado = () => {
    const fechaHoy = new Date().toISOString().split("T")[0];
    const newEmpleado: Empleado = {
      id: `emp-${Date.now()}`,
      apellidos: "",
      nombres: "",
      cargo: "",
      asignacion: "",
      fechaIngreso: fechaHoy,
      sueldoNominal: 470,
      cedula: "",
      activo: true,
      tieneFondoReserva: calcularAplicaFondoReserva(fechaHoy),
      acumulaFondoReserva: false,
      mensualizaDecimos: false,
    };
    onUpdate([...empleados, newEmpleado]);
  };

  const toggleEstado = (id: string) => {
    const updated = empleados.map((emp) =>
      emp.id === id ? { ...emp, activo: !emp.activo } : emp
    );
    onUpdate(updated);
  };

  const updateEmpleado = (id: string, updates: Partial<Empleado>) => {
    const updated = empleados.map((emp) =>
      emp.id === id ? { ...emp, ...updates } : emp
    );
    onUpdate(updated);
  };

  const handleUpdate = (id: string, field: keyof Empleado, value: any) => {
    let updates: Partial<Empleado> = { [field]: value };

    if (field === "fechaIngreso") {
      updates.tieneFondoReserva = calcularAplicaFondoReserva(value);
    }

    updateEmpleado(id, updates);
  };

  const handleDelete = (id: string) => {
    onUpdate(empleados.filter((emp) => emp.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Base de Datos de Empleados</h2>
          <p className="text-sm text-muted-foreground">
            {empresa} - Gestione la información personal y laboral de cada empleado
          </p>
        </div>
        <Button onClick={handleAddEmpleado} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Empleado
        </Button>
      </div>

      <Card className="border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead>
              <tr className="border-b bg-muted">
                <th className="text-left p-4 text-sm font-bold whitespace-nowrap">No.</th>
                <th className="text-left p-4 text-sm font-bold whitespace-nowrap min-w-[260px]">
                  Nombre Completo
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    (Apellidos y Nombres)
                  </span>
                </th>
                <th className="text-left p-4 text-sm font-bold whitespace-nowrap min-w-[150px]">Cédula</th>
                <th className="text-left p-4 text-sm font-bold whitespace-nowrap min-w-[180px]">Cargo</th>
                <th className="text-left p-4 text-sm font-bold whitespace-nowrap min-w-[180px]">Asignación</th>
                <th className="text-left p-4 text-sm font-bold whitespace-nowrap min-w-[150px]">Sueldo Nominal</th>
                <th className="text-left p-4 text-sm font-bold whitespace-nowrap min-w-[140px]">Fecha de Entrada</th>
                <th className="text-left p-4 text-sm font-bold whitespace-nowrap min-w-[140px]">Fecha de Salida</th>
                <th className="text-left p-4 text-sm font-bold whitespace-nowrap">Estado</th>
                <th className="text-center p-4 text-sm font-bold whitespace-nowrap">Aplica para Fondo de Reserva</th>
                <th className="text-center p-4 text-sm font-bold whitespace-nowrap">Acumula Fondo</th>
                <th className="text-center p-4 text-sm font-bold whitespace-nowrap">Mensualiza Décimos</th>
                <th className="text-left p-4 text-sm font-bold whitespace-nowrap">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((empleado, index) => (
                <tr key={empleado.id} className="border-b hover:bg-muted/50">
                  <td className="p-4 text-sm">{index + 1}</td>
                  <td className="p-4">
                    <div className="grid min-w-[260px] gap-2 sm:grid-cols-2">
                      <Input
                        value={empleado.apellidos ?? ""}
                        onChange={(e) => updateEmpleado(empleado.id, { apellidos: e.target.value })}
                        className="h-10 text-sm"
                        placeholder="Apellidos"
                      />
                      <Input
                        value={empleado.nombres ?? ""}
                        onChange={(e) => updateEmpleado(empleado.id, { nombres: e.target.value })}
                        className="h-10 text-sm"
                        placeholder="Nombres"
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <Input
                      value={empleado.cedula}
                      onChange={(e) => handleUpdate(empleado.id, "cedula", e.target.value)}
                      className="h-10 text-sm min-w-[150px]"
                      placeholder="0000000000"
                    />
                  </td>
                  <td className="p-4">
                    <Input
                      value={empleado.cargo}
                      onChange={(e) => handleUpdate(empleado.id, "cargo", e.target.value)}
                      className="h-10 text-sm min-w-[180px]"
                      placeholder="Cargo"
                    />
                  </td>
                  <td className="p-4">
                    <Select
                      value={empleado.asignacion}
                      onValueChange={(value) => handleUpdate(empleado.id, "asignacion", value)}
                    >
                      <SelectTrigger className="h-10 text-sm min-w-[180px]">
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Costo">Costo</SelectItem>
                        <SelectItem value="Gasto">Gasto</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-4">
                    <Input
                      type="number"
                      value={empleado.sueldoNominal}
                      onChange={(e) => handleUpdate(empleado.id, "sueldoNominal", parseFloat(e.target.value) || 0)}
                      className="h-10 text-sm min-w-[150px]"
                      step="0.01"
                    />
                  </td>
                  <td className="p-4">
                    <Input
                      type="date"
                      value={empleado.fechaIngreso}
                      onChange={(e) => handleUpdate(empleado.id, "fechaIngreso", e.target.value)}
                      className="h-10 text-sm min-w-[140px]"
                    />
                  </td>
                  <td className="p-4">
                    <Input
                      type="date"
                      value={empleado.fechaSalida || ""}
                      onChange={(e) => handleUpdate(empleado.id, "fechaSalida", e.target.value || undefined)}
                      className="h-10 text-sm min-w-[140px]"
                    />
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={empleado.activo ? "default" : "secondary"}
                      className="cursor-pointer select-none"
                      onClick={() => toggleEstado(empleado.id)}
                    >
                      {empleado.activo ? "Activo" : "Inactivo"}
                    </Badge>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <Switch
                        checked={empleado.tieneFondoReserva}
                        disabled
                        className="opacity-100"
                      />
                      {empleado.tieneFondoReserva && (
                        <span className="text-xs text-green-600 font-medium">Sí</span>
                      )}
                      {!empleado.tieneFondoReserva && (
                        <span className="text-xs text-muted-foreground">No</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center">
                      <Switch
                        checked={empleado.acumulaFondoReserva}
                        onCheckedChange={(checked) => handleUpdate(empleado.id, "acumulaFondoReserva", checked)}
                      />
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center">
                      <Switch
                        checked={empleado.mensualizaDecimos}
                        onCheckedChange={(checked) => handleUpdate(empleado.id, "mensualizaDecimos", checked)}
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(empleado.id)}
                      className="h-9 w-9 p-0 hover:bg-destructive/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
