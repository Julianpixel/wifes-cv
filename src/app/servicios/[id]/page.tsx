import { getSiteData } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, MessageCircle, Mail } from 'lucide-react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import * as Icons from 'lucide-react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getSiteData();
  const service = data.services.find((s: any) => s.id === id);

  if (!service) notFound();

  const Icon = (Icons as any)[service.icon] || Icons.Star;
  const whatsapp = (data.profile as any).whatsapp?.replace(/\D/g, '') ?? '18095550000';
  const waMessage = encodeURIComponent(`Hola Leandri, me interesa tu servicio de ${service.title}. ¿Podemos hablar?`);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar name={data.profile.name} />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6">

          {/* Back */}
          <Link href="/#services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Todos los servicios
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2">
              {/* Icon + title */}
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">Servicio</p>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter">{service.title}</h1>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                {(service as any).fullDescription ?? service.description}
              </p>

              {/* What's included */}
              {(service as any).includes && (
                <div>
                  <h2 className="text-xl font-bold mb-5">¿Qué incluye?</h2>
                  <ul className="space-y-3">
                    {(service as any).includes.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Other services */}
              <div className="mt-12 pt-10 border-t border-border/30">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-5">Otros servicios</h3>
                <div className="flex flex-wrap gap-3">
                  {data.services.filter((s: any) => s.id !== service.id).map((s: any) => (
                    <Link
                      key={s.id}
                      href={`/servicios/${s.id}`}
                      className="px-4 py-2 rounded-xl border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky sidebar */}
            <div className="lg:sticky lg:top-28 space-y-4 self-start">
              {/* Pricing */}
              <div className="rounded-2xl border border-border/50 bg-card p-6">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Inversión</p>
                <p className="text-2xl font-black text-foreground mb-1">A consultar</p>
                <p className="text-sm text-muted-foreground mb-5">El precio varía según el alcance del proyecto. Consulta gratuita incluida.</p>
                <div className="flex items-center gap-1.5 text-xs text-primary/80 font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  Cupos disponibles este mes
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${whatsapp}?text=${waMessage}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, hsl(142 70% 45%), hsl(142 60% 38%))',
                  boxShadow: '0 8px 24px hsl(142 70% 45% / 0.3)',
                }}
              >
                <MessageCircle className="w-5 h-5" />
                Contratar por WhatsApp
              </a>

              {/* Email CTA */}
              <a
                href={`mailto:${data.profile.email}?subject=Consulta sobre ${service.title}&body=Hola Leandri, me gustaría obtener más información sobre tu servicio de ${service.title}.`}
                className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl font-bold text-foreground border border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Enviar correo
              </a>

              <p className="text-center text-xs text-muted-foreground">
                Respuesta garantizada en menos de 24 horas
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer name={data.profile.name} />
      <ScrollToTop />
    </div>
  );
}
