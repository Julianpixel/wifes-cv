import * as React from 'react';
import Image from 'next/image';
import { SiteData, Service, Project, Testimonial } from '@/lib/types';
import { updateSiteAction, uploadImageAction } from '@/lib/actions';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Save, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

function ImageUploader({ label, value, onChange, className }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const result = await uploadImageAction(formData);
      if (result.success && result.url) {
        onChange(result.url);
      } else {
        alert('Error al subir la imagen');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error crítico al subir la imagen');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <div className="relative group aspect-video md:aspect-[16/6] rounded-2xl overflow-hidden border-2 border-dashed border-border/50 bg-muted/30 transition-all hover:border-primary/50">
        {value ? (
          <>
            <Image 
              src={value} 
              alt={label} 
              fill 
              className="object-cover transition-transform group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <Button 
                variant="secondary" 
                size="sm" 
                className="rounded-full gap-2"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                Cambiar
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                className="rounded-full"
                onClick={() => onChange('')}
                disabled={isUploading}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            {isUploading ? (
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Subir imagen</span>
              </>
            )}
          </button>
        )}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange} 
        />
      </div>
      <Input 
        value={value} 
        placeholder="O pega una URL externa..."
        onChange={(e) => onChange(e.target.value)}
        className="text-xs h-8 bg-muted/20 border-none italic"
      />
    </div>
  );
}

export default function ContentPage({ initialData }: { initialData: SiteData }) {
  const [data, setData] = React.useState<SiteData>(initialData);
  const [isSaving, setIsSaving] = React.useState(false);

  // Auto-sync with initialData when it changes (server-side updates)
  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleSave = async () => {
    setIsSaving(true);
    await updateSiteAction(data);
    setIsSaving(false);
  };

  const updateProfile = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      profile: { ...prev.profile, [field]: value }
    }));
  };

  const addService = () => {
    const newService: Service = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'Nuevo Servicio',
      description: 'Descripción del servicio...',
      icon: 'Zap'
    };
    setData(prev => ({ ...prev, services: [...prev.services, newService] }));
  };

  const removeService = (id: string) => {
    setData(prev => ({ ...prev, services: prev.services.filter(s => s.id !== id) }));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'Nuevo Proyecto',
      category: 'Web',
      image: '',
      description: 'Descripción del proyecto...'
    };
    setData(prev => ({ ...prev, projects: [...prev.projects, newProject] }));
  };

  const removeProject = (id: string) => {
    setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">Gestión de Contenido</h1>
          <p className="text-muted-foreground mt-1">Personaliza cada rincón de tu portafolio profesional.</p>
        </div>
        <Button size="lg" className="gap-2 rounded-2xl px-8 h-14 font-bold shadow-lg shadow-primary/20" onClick={handleSave} disabled={isSaving}>
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {isSaving ? 'Guardando...' : 'Publicar Cambios'}
        </Button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="flex w-full mb-8 rounded-2xl bg-muted/50 p-1.5 overflow-x-auto no-scrollbar">
          <TabsTrigger value="profile" className="flex-1 rounded-xl font-bold py-3 transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">Perfil</TabsTrigger>
          <TabsTrigger value="services" className="flex-1 rounded-xl font-bold py-3 transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">Servicios</TabsTrigger>
          <TabsTrigger value="projects" className="flex-1 rounded-xl font-bold py-3 transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">Proyectos</TabsTrigger>
          <TabsTrigger value="sections" className="flex-1 rounded-xl font-bold py-3 transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">Visibilidad</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-0 space-y-6 outline-none focus:ring-0">
          <Card className="border-none shadow-xl shadow-black/5 bg-background/50 backdrop-blur-sm rounded-3xl overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-2xl font-black">Información Personal</CardTitle>
              <CardDescription>Estos datos alimentan la sección Hero y el contacto.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-4 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-4">
                  <ImageUploader 
                    label="Foto de Perfil" 
                    value={data.profile.image} 
                    onChange={(url) => updateProfile('image', url)}
                    className="aspect-square md:aspect-square"
                  />
                </div>
                <div className="lg:col-span-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-primary/70">Nombre Completo</label>
                      <Input 
                        value={data.profile.name} 
                        onChange={(e) => updateProfile('name', e.target.value)} 
                        className="rounded-2xl h-14 bg-muted/30 border-none text-lg font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-primary/70">Rol / Título</label>
                      <Input 
                        value={data.profile.role} 
                        onChange={(e) => updateProfile('role', e.target.value)} 
                        className="rounded-2xl h-14 bg-muted/30 border-none text-lg font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-primary/70">Bio Profesional</label>
                    <Textarea 
                      value={data.profile.bio} 
                      onChange={(e) => updateProfile('bio', e.target.value)} 
                      className="rounded-2xl min-h-[140px] bg-muted/30 border-none text-lg leading-relaxed resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-primary/70">Email de Contacto</label>
                  <Input 
                    value={data.profile.email} 
                    onChange={(e) => updateProfile('email', e.target.value)} 
                    className="rounded-2xl h-14 bg-muted/30 border-none font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-primary/70">Ubicación</label>
                  <Input 
                    value={data.profile.location} 
                    onChange={(e) => updateProfile('location', e.target.value)} 
                    className="rounded-2xl h-14 bg-muted/30 border-none font-medium"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="mt-0 space-y-6 outline-none">
          <div className="flex justify-end">
            <Button onClick={addService} className="gap-2 rounded-2xl h-12 px-6 font-bold shadow-md">
              <Plus className="w-5 h-5" /> Agregar Servicio
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {data.services.map((service, index) => (
              <Card key={service.id} className="border-none shadow-xl shadow-black/5 bg-background/50 backdrop-blur-sm rounded-3xl group transition-all hover:shadow-primary/5">
                <CardHeader className="flex flex-row items-center justify-between p-6">
                  <CardTitle className="text-xl font-bold">Servicio #{index + 1}</CardTitle>
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 rounded-xl" onClick={() => removeService(service.id)}>
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Título del Servicio</label>
                      <Input 
                        placeholder="Ej. Diseño UI/UX" 
                        value={service.title} 
                        onChange={(e) => {
                          setData(prev => ({
                            ...prev,
                            services: prev.services.map((s, i) => 
                              i === index ? { ...s, title: e.target.value } : s
                            )
                          }));
                        }}
                        className="rounded-2xl h-12 bg-muted/30 border-none font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Icono (Lucide)</label>
                      <Input 
                        placeholder="Ej. Layout, Palette, Code..." 
                        value={service.icon} 
                        onChange={(e) => {
                          setData(prev => ({
                            ...prev,
                            services: prev.services.map((s, i) => 
                              i === index ? { ...s, icon: e.target.value } : s
                            )
                          }));
                        }}
                        className="rounded-2xl h-12 bg-muted/30 border-none font-mono"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Descripción detallada</label>
                    <Textarea 
                      placeholder="¿Qué ofreces exactamente?" 
                      value={service.description} 
                      onChange={(e) => {
                        setData(prev => ({
                          ...prev,
                          services: prev.services.map((s, i) => 
                            i === index ? { ...s, description: e.target.value } : s
                          )
                        }));
                      }}
                      className="rounded-2xl min-h-[100px] bg-muted/30 border-none resize-none"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

          <TabsContent value="projects" className="mt-0 space-y-6 outline-none">
            <div className="flex justify-end">
              <Button onClick={addProject} className="gap-2 rounded-2xl h-12 px-6 font-bold shadow-md">
                <Plus className="w-5 h-5" /> Nuevo Proyecto
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {data.projects.map((project, index) => (
                <Card key={project.id} className="border-none shadow-xl shadow-black/5 bg-background/50 backdrop-blur-sm rounded-3xl overflow-hidden transition-all hover:shadow-primary/5">
                  <div className="grid grid-cols-1 lg:grid-cols-5">
                    <div className="lg:col-span-2 p-6 border-r border-border/10">
                      <ImageUploader 
                        label="Imagen del Proyecto" 
                        value={project.image} 
                        onChange={(url) => {
                          setData(prev => ({
                            ...prev,
                            projects: prev.projects.map((p, i) => 
                              i === index ? { ...p, image: url } : p
                            )
                          }));
                        }}
                      />
                    </div>
                    <div className="lg:col-span-3 p-6 flex flex-col justify-between">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black uppercase bg-primary/10 text-primary px-3 py-1 rounded-full">Proyecto #{index + 1}</span>
                          <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 rounded-xl" onClick={() => removeProject(project.id)}>
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Título</label>
                            <Input 
                              placeholder="Nombre del proyecto" 
                              value={project.title} 
                              onChange={(e) => {
                                setData(prev => ({
                                  ...prev,
                                  projects: prev.projects.map((p, i) => 
                                    i === index ? { ...p, title: e.target.value } : p
                                  )
                                }));
                              }}
                              className="rounded-xl h-12 bg-muted/30 border-none font-black"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Categoría</label>
                            <Input 
                              placeholder="Ej. Aplicación Web" 
                              value={project.category} 
                              onChange={(e) => {
                                setData(prev => ({
                                  ...prev,
                                  projects: prev.projects.map((p, i) => 
                                    i === index ? { ...p, category: e.target.value } : p
                                  )
                                }));
                              }}
                              className="rounded-xl h-12 bg-muted/30 border-none"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Resumen del caso</label>
                          <Textarea 
                            placeholder="Cuéntanos un poco sobre el reto y la solución..." 
                            value={project.description} 
                            onChange={(e) => {
                              setData(prev => ({
                                ...prev,
                                projects: prev.projects.map((p, i) => 
                                  i === index ? { ...p, description: e.target.value } : p
                                )
                              }));
                            }}
                            className="rounded-xl min-h-[100px] bg-muted/30 border-none resize-none leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="testimonials" className="mt-0 space-y-6 outline-none">
            <div className="flex justify-end">
              <Button 
                onClick={() => {
                  const newT: Testimonial = { id: Math.random().toString(36).substr(2, 9), name: 'Nuevo Cliente', role: 'Cargo', content: 'Excelente servicio...' };
                  setData(prev => ({ ...prev, testimonials: [...(prev.testimonials || []), newT] }));
                }} 
                className="gap-2 rounded-2xl h-12 px-6 font-bold shadow-md"
              >
                <Plus className="w-5 h-5" /> Agregar Testimonio
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(data.testimonials || []).map((t, index) => (
                <Card key={t.id} className="border-none shadow-xl shadow-black/5 bg-background/50 backdrop-blur-sm rounded-3xl group">
                  <CardHeader className="flex flex-row items-center justify-between p-6">
                    <ImageUploader 
                      label="Foto / Avatar" 
                      value={t.avatar || ''} 
                      onChange={(url) => {
                        setData(prev => ({
                          ...prev,
                          testimonials: prev.testimonials.map((item, i) => 
                            i === index ? { ...item, avatar: url } : item
                          )
                        }));
                      }}
                      className="w-20"
                    />
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 rounded-xl" onClick={() => {
                        setData(prev => ({ ...prev, testimonials: prev.testimonials.filter(item => item.id !== t.id) }));
                    }}>
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-4">
                    <Input 
                      placeholder="Nombre del cliente" 
                      value={t.name} 
                      onChange={(e) => {
                        setData(prev => ({
                          ...prev,
                          testimonials: prev.testimonials.map((item, i) => 
                            i === index ? { ...item, name: e.target.value } : item
                          )
                        }));
                      }}
                      className="rounded-xl h-12 bg-muted/30 border-none font-bold"
                    />
                    <Input 
                      placeholder="Cargo o Empresa" 
                      value={t.role} 
                      onChange={(e) => {
                        setData(prev => ({
                          ...prev,
                          testimonials: prev.testimonials.map((item, i) => 
                            i === index ? { ...item, role: e.target.value } : item
                          )
                        }));
                      }}
                      className="rounded-xl h-12 bg-muted/30 border-none text-sm"
                    />
                    <Textarea 
                      placeholder="Contenido del testimonio..." 
                      value={t.content} 
                      onChange={(e) => {
                        setData(prev => ({
                          ...prev,
                          testimonials: prev.testimonials.map((item, i) => 
                            i === index ? { ...item, content: e.target.value } : item
                          )
                        }));
                      }}
                      className="rounded-xl min-h-[100px] bg-muted/30 border-none resize-none leading-relaxed"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sections" className="mt-0 outline-none">
            <Card className="border-none shadow-xl shadow-black/5 bg-background/50 backdrop-blur-sm rounded-3xl overflow-hidden">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-2xl font-black">Visibilidad y Estructura</CardTitle>
                <CardDescription>Controla qué partes de tu sitio están visibles al mundo.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(data.sections || {}).map(([key, value]) => (
                    <div 
                      key={key} 
                      onClick={async () => {
                        const newData = {
                          ...data,
                          sections: { ...data.sections, [key]: !value }
                        };
                        setData(newData);
                        await updateSiteAction(newData);
                      }}
                      className={cn(
                        "group relative flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all active:scale-95",
                        value 
                          ? "bg-primary/5 border-primary/20 shadow-sm" 
                          : "bg-muted/10 border-transparent hover:border-muted-foreground/20 opacity-60 hover:opacity-100"
                      )}
                    >
                    <div className="flex flex-col">
                      <label className="font-black capitalize text-lg tracking-tighter leading-none mb-1">{key}</label>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        {value ? 'Visible' : 'Oculto'}
                      </span>
                    </div>
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm",
                      value ? "bg-primary text-primary-foreground rotate-0" : "bg-muted text-muted-foreground rotate-45"
                    )}>
                      {value ? <Plus className="w-6 h-6 rotate-45" /> : <Plus className="w-6 h-6" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
