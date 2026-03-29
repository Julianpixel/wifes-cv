import { getSiteData } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

export const dynamic = 'force-dynamic';

export default async function AllProjectsPage() {
  const data = await getSiteData();

  const categoryColors: Record<string, string> = {
    'Turismo Rural':       'bg-emerald-500/15 text-emerald-400',
    'Gestión de Eventos':  'bg-violet-500/15 text-violet-400',
    'Marketing Turístico': 'bg-amber-500/15 text-amber-400',
    'Turismo Sostenible':  'bg-teal-500/15 text-teal-400',
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar name={data.profile.name} />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6">

          {/* Back */}
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </Link>

          <div className="mb-14">
            <p className="text-xs font-bold tracking-[0.25em] text-primary uppercase mb-3">Portafolio</p>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">
              Todos los{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  background: 'linear-gradient(135deg, hsl(171 90% 55%), hsl(38 95% 55%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                proyectos.
              </span>
            </h1>
            <p className="text-muted-foreground max-w-xl">
              {data.projects.length} proyectos en turismo, eventos, marketing y sostenibilidad.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.projects.map((project: any) => {
              const colorClass = categoryColors[project.category] ?? 'bg-primary/15 text-primary';
              return (
                <Link key={project.id} href={`/proyectos/${project.id}`} className="group">
                  <div className="rounded-3xl border border-border/50 bg-card overflow-hidden hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                    </div>
                    <div className="p-6">
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 ${colorClass}`}>
                        {project.category}
                      </span>
                      <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h2>
                      <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer name={data.profile.name} />
      <ScrollToTop />
    </div>
  );
}
