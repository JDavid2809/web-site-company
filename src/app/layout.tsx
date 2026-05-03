import type { Metadata } from "next";
import "./globals.css";
// Fontsource: Stack Sans Notch — pesos utilizados en el proyecto
import "@fontsource/stack-sans-notch/300.css";
import "@fontsource/stack-sans-notch/400.css";
import "@fontsource/stack-sans-notch/500.css";
import "@fontsource/stack-sans-notch/600.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Quetzalco Dev Studio",
  description: "Arquitectura digital de precisión. Software que perdura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased dark" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
