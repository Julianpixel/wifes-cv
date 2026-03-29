import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getSiteData } from "@/lib/data";
import { SmoothScroll } from "@/components/SmoothScroll";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const instrument = Instrument_Serif({ weight: "400", subsets: ["latin"], variable: "--font-instrument" });

export const metadata: Metadata = {
  title: "Leandri Karolina Ramírez Rivera | Administración Turística",
  description: "Portafolio profesional de Leandri Karolina Ramírez Rivera, Licenciada en Administración de Empresas Turísticas de la UCE San Pedro de Macorís, República Dominicana.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getSiteData();

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
      </head>
      <body className={`${jakarta.variable} ${outfit.variable} ${instrument.variable} min-h-screen font-sans antialiased`}>
        <ThemeProvider initialTheme={data.theme} initialTypography={data.typography}>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
