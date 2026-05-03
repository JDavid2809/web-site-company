"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROJECTS = [
    {
        tag: "SaaS · Analytics",
        title: "Nexus Analytics",
        description:
            "Plataforma de analítica en tiempo real para equipos de producto. Dashboards personalizables, alertas automáticas y pipelines de datos construidos sobre AWS y Next.js.",
        image: "/projects/nexus.png",
        accentColor: "rgba(59,130,246,0.15)",
        accentText: "text-blue-400",
        accentBg: "bg-blue-400",
        href: "#",
        year: "2024",
    },
    {
        tag: "E-commerce · Mobile",
        title: "ShopFlow",
        description:
            "App de comercio electrónico multiplataforma con React Native. Integración con Stripe, sistema de recomendaciones con ML y experiencia de usuario centrada en conversión.",
        image: "/projects/shopflow.png",
        accentColor: "rgba(139,92,246,0.15)",
        accentText: "text-violet-400",
        accentBg: "bg-violet-400",
        href: "#",
        year: "2024",
    },
    {
        tag: "AI · Productividad",
        title: "Aria — AI Assistant",
        description:
            "Asistente conversacional empresarial basado en LLMs. RAG sobre documentación interna, historial persistente y API REST para integración con sistemas existentes.",
        image: "/projects/aichat.png",
        accentColor: "rgba(16,185,129,0.15)",
        accentText: "text-emerald-400",
        accentBg: "bg-emerald-400",
        href: "#",
        year: "2025",
    },
];

// ─── Single project row ────────────────────────────────────────────────────────
function ProjectRow({
    project,
    index,
}: {
    project: (typeof PROJECTS)[number];
    index: number;
}) {
    const rowRef     = useRef<HTMLDivElement>(null);
    const imgRef     = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const row  = rowRef.current;
            const img  = imgRef.current;
            const info = contentRef.current;
            if (!row || !img || !info) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: row,
                    start: "top 80%",
                    end: "top 35%",
                    scrub: false,
                    toggleActions: "play none none reverse",
                },
            });

            // Image: clip reveal from left
            tl.fromTo(
                img,
                { clipPath: "inset(0 100% 0 0)", opacity: 1 },
                { clipPath: "inset(0 0% 0 0)", ease: "expo.out", duration: 1 },
                0
            );
            // Image inner: counter-scale so content doesn't stretch
            tl.fromTo(
                img.querySelector("img, .proj-img-inner"),
                { scale: 1.12 },
                { scale: 1, ease: "expo.out", duration: 1 },
                0
            );

            // Content: staggered fade-slide from right
            const children = info.querySelectorAll<HTMLElement>(".proj-reveal");
            tl.fromTo(
                children,
                { opacity: 0, x: 40 },
                { opacity: 1, x: 0, ease: "power3.out", duration: 0.7, stagger: 0.10 },
                0.15
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={rowRef}
            className="relative flex flex-col lg:flex-row items-stretch gap-0 border-b border-foreground/[0.07] overflow-hidden group"
        >
            {/* ── Left: Image ── */}
            <div
                ref={imgRef}
                className="relative w-full lg:w-[55%] aspect-video lg:aspect-auto lg:min-h-[420px] overflow-hidden"
                style={{ clipPath: "inset(0 100% 0 0)" }}
            >
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="proj-img-inner object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                />

                {/* Overlay gradient */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(to right, transparent 60%, var(--background) 100%)",
                    }}
                />

                {/* Year badge */}
                <span className="absolute top-5 left-5 text-[10px] font-mono tracking-[0.28em] uppercase text-white/60 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                    {project.year}
                </span>
            </div>

            {/* ── Right: Content ── */}
            <div
                ref={contentRef}
                className="relative flex flex-col justify-center gap-6 w-full lg:w-[45%] px-8 lg:px-14 py-10 lg:py-16"
            >
                {/* Accent glow blob */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-60"
                    style={{
                        background: `radial-gradient(ellipse 80% 60% at 20% 50%, ${project.accentColor}, transparent 70%)`,
                    }}
                />

                <div className="relative z-10 flex flex-col gap-6">
                    {/* Tag + index */}
                    <div className="proj-reveal flex items-center gap-4">
                        <span className={`text-[10px] font-mono tracking-[0.3em] uppercase ${project.accentText}`}>
                            {project.tag}
                        </span>
                        <span className="text-[10px] font-mono text-foreground/20">
                            0{index + 1}
                        </span>
                    </div>

                    {/* Accent line */}
                    <div className={`proj-reveal h-[2px] w-12 ${project.accentBg} opacity-60`} />

                    {/* Title */}
                    <h3 className="proj-reveal text-[clamp(30px,4vw,52px)] font-bold leading-[0.92] tracking-tight text-foreground">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="proj-reveal text-[15px] leading-[1.8] text-text-muted max-w-md">
                        {project.description}
                    </p>

                    {/* CTA */}
                    <div className="proj-reveal">
                        <a
                            href={project.href}
                            className={`
                                inline-flex items-center gap-3 group/btn
                                text-[11px] font-mono tracking-[0.24em] uppercase
                                text-foreground border border-foreground/15
                                px-6 py-3.5 rounded-sm no-underline
                                hover:border-foreground/40 hover:bg-foreground/[0.03]
                                transition-all duration-300
                            `}
                        >
                            Saber más
                            <svg
                                width="14" height="14" viewBox="0 0 14 14" fill="none"
                                className="transition-transform duration-300 group-hover/btn:translate-x-1"
                                aria-hidden
                            >
                                <path
                                    d="M2 7h10M8 3l4 4-4 4"
                                    stroke="currentColor" strokeWidth="1.4"
                                    strokeLinecap="round" strokeLinejoin="round"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const heading = headingRef.current;
            if (!heading) return;

            gsap.fromTo(
                heading.querySelectorAll<HTMLElement>(".head-reveal"),
                { opacity: 0, y: 32 },
                {
                    opacity: 1, y: 0,
                    ease: "power3.out",
                    duration: 0.8,
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: heading,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="proyectos"
            className="relative w-full bg-background transition-colors duration-400"
            aria-label="Proyectos destacados"
        >
            {/* Dot grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.025]"
                style={{
                    backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* ── Section Header ── */}
            <div
                ref={headingRef}
                className="relative z-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 px-8 lg:px-16 pt-24 pb-16 border-b border-foreground/[0.07]"
            >
                <div className="flex flex-col gap-4">
                    <span className="head-reveal text-[10px] font-mono tracking-[0.32em] uppercase text-accent">
                        Proyectos
                    </span>
                    <h2 className="head-reveal text-[clamp(40px,6vw,80px)] font-bold leading-[0.9] tracking-tight text-foreground">
                        Trabajo<br />
                        <span className="font-serif italic font-light text-accent">reciente.</span>
                    </h2>
                </div>

                <p className="head-reveal text-[15px] leading-relaxed text-text-muted max-w-xs sm:text-right pb-2">
                    Proyectos reales, resultados medibles. Cada uno construido con intención y obsesión por el detalle.
                </p>
            </div>

            {/* ── Project List ── */}
            <div className="relative z-10">
                {PROJECTS.map((p, i) => (
                    <ProjectRow key={p.title} project={p} index={i} />
                ))}
            </div>

            {/* ── Footer CTA ── */}
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 px-8 lg:px-16 py-16 border-t border-foreground/[0.07]">
                <p className="text-[clamp(22px,3vw,36px)] font-bold leading-tight tracking-tight text-foreground/15">
                    ¿Tienes un proyecto<br />en mente?
                </p>
                <a
                    href="#contacto"
                    className="inline-flex items-center gap-3 bg-accent text-white text-[11px] font-mono tracking-[0.24em] uppercase px-7 py-4 rounded-sm no-underline hover:opacity-80 transition-opacity duration-200"
                >
                    Hablemos
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
            </div>
        </section>
    );
}
