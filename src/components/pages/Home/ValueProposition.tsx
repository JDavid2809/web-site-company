"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Zap, ShieldCheck, Layers, Cpu } from "lucide-react"

const benefits = [
    {
        title: "Rendimiento Extremo",
        description: "Optimizamos cada línea de código para que tus aplicaciones carguen a la velocidad de la luz, garantizando una experiencia de usuario impecable.",
        icon: Zap,
    },
    {
        title: "Seguridad Robusta",
        description: "Implementamos los estándares más altos de seguridad de grado empresarial para proteger tus datos y la integridad de tus sistemas en todo momento.",
        icon: ShieldCheck,
    },
    {
        title: "Arquitectura Escalable",
        description: "Diseñamos bases tecnológicas preparadas para crecer contigo. Sin cuellos de botella, sin límites, listas para miles de usuarios concurrentes.",
        icon: Layers,
    },
    {
        title: "Tecnología de Vanguardia",
        description: "Utilizamos los frameworks y herramientas más modernas del mercado para asegurar que tu producto esté siempre un paso adelante de la competencia.",
        icon: Cpu,
    },
]

export function ValueProposition() {
    const containerRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    const ctx = gsap.context(() => {
                        // Title entrance
                        gsap.fromTo(
                            titleRef.current,
                            { opacity: 0, y: 30 },
                            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
                        )

                        // Cards stagger entrance
                        gsap.fromTo(
                            cardsRef.current,
                            { opacity: 0, y: 50 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.8,
                                stagger: 0.15,
                                ease: "power3.out",
                                delay: 0.2,
                            }
                        )
                    }, containerRef)

                    // Once animated, we can stop observing
                    observer.disconnect()
                    return () => ctx.revert()
                }
            },
            { threshold: 0.15 } // Trigger when 15% of the section is visible
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section ref={containerRef} className="relative w-full bg-background py-24 lg:py-32 overflow-hidden transition-colors duration-400">
            {/* Soft background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none transition-colors duration-400" />

            <div className="relative z-10 mx-auto max-w-7xl px-8 lg:px-12">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
                    <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-[44px] font-bold tracking-tight text-foreground opacity-0">
                        Nuestra Propuesta de <span className="text-accent">Valor</span>
                    </h2>
                    <p className="mt-6 text-lg text-text-muted">
                        No solo escribimos código, construimos los cimientos del éxito digital de tu empresa. 
                        Descubre por qué somos el partner tecnológico ideal.
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            ref={(el) => { cardsRef.current[index] = el; }}
                            className="group relative p-8 rounded-2xl border border-foreground/5 bg-foreground/[0.02] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-foreground hover:shadow-2xl opacity-0 overflow-hidden"
                        >
                            {/* Hover inner gradient effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/10 group-hover:to-transparent transition-all duration-500 rounded-2xl pointer-events-none" />
                            
                            <div className="relative z-10 flex flex-col h-full">
                                {/* Icon container */}
                                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-500 group-hover:bg-background group-hover:scale-110 group-hover:rotate-3 shadow-[0_0_15px_rgba(var(--color-accent),0)] group-hover:shadow-[0_0_20px_var(--color-accent)]">
                                    <benefit.icon className="h-6 w-6" />
                                </div>
                                
                                {/* Text content */}
                                <h3 className="text-xl font-semibold text-foreground transition-colors duration-500 group-hover:text-background mb-3">
                                    {benefit.title}
                                </h3>
                                <p className="text-sm text-text-muted leading-relaxed transition-colors duration-500 group-hover:text-background/80">
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
