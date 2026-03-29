'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Mail,
  MapPin,
  Send,
  ExternalLink,
  X,
  Plane
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface ContactProps {
  email: string;
  location: string;
  socials: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export function Contact({ email, location, socials }: ContactProps) {
  return (
    <section id="contact" className="py-32 scroll-mt-20 overflow-hidden relative">
      <div className="absolute inset-0 bg-muted/10 -z-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Contáctame</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
            ¿Tienes un proyecto turístico?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Cuéntame tu idea. Estoy lista para convertirla en una experiencia turística de impacto.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Info column */}
          <motion.div variants={fadeInUp} className="flex flex-col justify-center gap-10">
            {/* Contact details */}
            <div className="space-y-6">
              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Email</p>
                  <a href={`mailto:${email}`} className="font-bold text-lg hover:text-primary transition-colors">{email}</a>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Ubicación</p>
                  <p className="font-bold text-lg">{location}</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <Plane className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Especialidad</p>
                  <p className="font-bold text-lg">Administración Turística · UCE</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {socials.twitter && (
                <a href={socials.twitter} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl hover:border-primary/40 hover:text-primary transition-all" title="Twitter / X">
                    <X className="w-5 h-5" />
                  </Button>
                </a>
              )}
              {socials.linkedin && (
                <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl hover:border-primary/40 hover:text-primary transition-all" title="LinkedIn">
                    <ExternalLink className="w-5 h-5" />
                  </Button>
                </a>
              )}
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            variants={fadeInUp}
            className="p-8 md:p-10 rounded-[2.5rem] bg-muted/20 border border-border/50 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24 blur-3xl" />

            <form className="space-y-5 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Nombre</label>
                  <Input placeholder="Tu nombre" className="rounded-xl h-12 bg-background border-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Email</label>
                  <Input placeholder="tu@email.com" type="email" className="rounded-xl h-12 bg-background border-border" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Asunto</label>
                <Input placeholder="Ej: Consultoría hotelera en Bávaro" className="rounded-xl h-12 bg-background border-border" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Mensaje</label>
                <Textarea
                  placeholder="Cuéntame sobre tu proyecto turístico..."
                  className="rounded-xl min-h-[140px] bg-background border-border resize-none"
                />
              </div>
              <Button className="w-full h-13 rounded-2xl text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all">
                Enviar Mensaje <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
