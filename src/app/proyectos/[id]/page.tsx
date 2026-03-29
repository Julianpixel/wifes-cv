import { getSiteData } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft, Calendar, Target, MapPin, ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getSiteData();
  const project = data.projects.find((p: any) => p.id === id);

  if (!project) notFound();

  const categoryColors: Record<string, string> = {
    'Turismo Rural':       'bg-emerald-500/15 text-emerald-400',
    'Gestión de Eventos':  'bg-violet-500/15 text-violet-400',
    'Marketing Turístico': 'bg-amber-500/15 text-amber-400',
    'Turismo Sostenible':  'bg-teal-500/15 text-teal-400',
  };
  const colorClass = categoryColors[project.category] ?? 'bg-primary/15 text-primary';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar name={data.profile.name} />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6">

          {/* Back */}
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Todos los proyectos
          </Link>

          {/* Hero image */}
          <div className="rounded-3xl overflow-hidden aspect-[16/7] mb-12 relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <span className={`inline-block text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4 ${colorClass}`}>
                {project.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-6">
                {project.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {(project as any).fullDescription ?? project.description}
              </p>

              {/* Gallery */}
              {(project as any).gallery && (
                <div>
                  <h2 className="text-xl font-bold mb-5 text-foreground">Galería</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {(project as any).gallery.map((img: string, i: number) => (
                      <div key={i} className="rounded-2xl overflow-hidden aspect-[4/3]">
                        <img src={img} alt={`${project.title} ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Results */}
              {(project as any).results && (
                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-4 h-4 text-primary" />
                    <h3 className="font-bold text-sm uppercase tracking-wider text-primary">Resultados</h3>
                  </div>
                  <ul className="space-y-3">
                    {(project as any).results.map((result: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA sidebar */}
              <div
                className="rounded-2xl p-6 text-center"
                style={{ background: 'linear-gradient(135deg, hsl(175 80% 18%), hsl(210 40% 8%))' }}
              >
                <p className="text-white/60 text-xs uppercase tracking-widest mb-2">¿Proyecto similar?</p>
                <p className="text-white font-bold mb-5 text-lg leading-tight">Trabajemos juntos en tu próximo proyecto</p>
                <a
                  href={`https://wa.me/${(data.profile as any).whatsapp?.replace(/\D/g, '') ?? '18095550000'}?text=Hola%20Leandri,%20me%20interesa%20tu%20servicio%20de%20${encodeURIComponent(project.category)}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 rounded-xl font-bold text-sm text-black transition-all duration-300 hover:-translate-y-1"
                  style={{ background: 'linear-gradient(135deg, hsl(171 90% 44%), hsl(38 95% 55%))' }}
                >
                  💬 Contáctame por WhatsApp
                </a>
                <Link href="#contact">
                  <span className="block mt-3 text-white/50 text-xs hover:text-white/70 transition-colors cursor-pointer">
                    o envía un correo →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer name={data.profile.name} />
      <ScrollToTop />
    </div>
  );
}
