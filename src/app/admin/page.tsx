import { getSiteData } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Briefcase, 
  MessageSquare, 
  Eye,
  ArrowUpRight
} from 'lucide-react';

export default async function AdminDashboard() {
  const data = await getSiteData();

  const stats = [
    { name: 'Proyectos', value: data.projects.length, icon: Briefcase, color: 'text-blue-500' },
    { name: 'Servicios', value: data.services.length, icon: Users, color: 'text-green-500' },
    { name: 'Testimonios', value: data.testimonials.length, icon: MessageSquare, color: 'text-purple-500' },
    { name: 'Vistas (Mock)', value: '1.2k', icon: Eye, color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bienvenido, {data.profile.name.split(' ')[0]}</h1>
        <p className="text-muted-foreground mt-2">Gestiona tu presencia digital desde un solo lugar.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="overflow-hidden border-none shadow-sm bg-background">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-green-500" />
                  +12% esta semana
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Estado de Secciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(data.sections).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <span className="capitalize font-medium">{key}</span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${value ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {value ? 'ACTIVO' : 'INACTIVO'}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Configuración Actual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Tema</span>
              <span className="font-bold uppercase">{data.theme}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Tipografía</span>
              <span className="font-bold">{data.typography}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Radio de Bordes</span>
              <span className="font-bold uppercase">{data.appearance.borderRadius}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
