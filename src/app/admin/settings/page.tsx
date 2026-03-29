import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, Lock, Bell, Globe } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ajustes del Sistema</h1>
        <p className="text-muted-foreground mt-2">Configura las opciones generales y de seguridad de tu panel.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              <CardTitle>Seguridad</CardTitle>
            </div>
            <CardDescription>Gestiona el acceso a tu panel de administración.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Contraseña Actual</label>
                <Input type="password" placeholder="••••••••" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nueva Contraseña</label>
                <Input type="password" placeholder="••••••••" className="rounded-xl" />
              </div>
            </div>
            <Button className="rounded-xl">Actualizar Contraseña</Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              <CardTitle>General</CardTitle>
            </div>
            <CardDescription>Configuración global de la aplicación.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
              <div className="space-y-0.5">
                <label className="font-medium">Modo Mantenimiento</label>
                <p className="text-sm text-muted-foreground">Ocultar el sitio público mientras haces cambios.</p>
              </div>
              <Button variant="outline" className="rounded-full h-8 px-4">Desactivado</Button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
              <div className="space-y-0.5">
                <label className="font-medium">Notificaciones de Contacto</label>
                <p className="text-sm text-muted-foreground">Recibir un email cuando alguien te escriba.</p>
              </div>
              <Button variant="default" className="rounded-full h-8 px-4">Activado</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-4">
        <Button size="lg" className="px-12 rounded-xl font-bold gap-2">
          <Save className="w-5 h-5" />
          Guardar Ajustes
        </Button>
      </div>
    </div>
  );
}
