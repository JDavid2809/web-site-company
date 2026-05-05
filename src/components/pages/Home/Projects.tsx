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
        year: "2024",
        tech: ["Next.js", "AWS", "PostgreSQL"],
        description:
            "Plataforma de analítica en tiempo real con dashboards personalizables, alertas automáticas y pipelines de datos sobre AWS. Más de 40k eventos procesados por minuto.",
        image: "/projects/nexus.png",
        accent: "#3b82f6",
    },
    {
        tag: "E-commerce · Mobile",
        title: "ShopFlow",
        year: "2024",
        tech: ["React Native", "Stripe", "Python ML"],
        description:
            "App de comercio multiplataforma con React Native, integración Stripe y sistema de recomendaciones basado en ML. +120% conversión vs versión anterior.",
        image: "/projects/shopflow.png",
        accent: "#8b5cf6",
    },
    {
        tag: "AI · Productividad",
        title: "Aria Assistant",
        year: "2025",
        tech: ["LangChain", "OpenAI", "Pinecone"],
        description:
            "Asistente conversacional empresarial basado en LLMs con RAG sobre documentación interna y API REST. Reduce en 60% el tiempo de búsqueda de información.",
        image: "/projects/aichat.png",
        accent: "#10b981",
    },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const listRef    = useRef<HTMLUListElement>(null);
    const fillRef    = useRef<HTMLDivElement>(null);
    const rightRef   = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const section = sectionRef.current;
            const list    = listRef.current;
            const fill    = fillRef.current;
            const right   = rightRef.current;
            if (!section || !list || !fill || !right) return;

            const listItems = gsap.utils.toArray<HTMLElement>(".proj-item", list);
            const slides    = gsap.utils.toArray<HTMLElement>(".proj-slide", right);
            const descs     = gsap.utils.toArray<HTMLElement>(".proj-desc", right);
            const n         = listItems.length;

            // ── Initial state ──
            gsap.set(fill, { scaleY: 1 / n, transformOrigin: "top center" });
            listItems.forEach((item, i) => {
                gsap.set(item, { color: i === 0 ? PROJECTS[0].accent : "var(--text-muted)" });
            });
            gsap.set(slides[0], { autoAlpha: 1 });
            gsap.set(descs[0],  { autoAlpha: 1 });
            slides.slice(1).forEach((s) => gsap.set(s, { autoAlpha: 0 }));
            descs.slice(1).forEach((d)  => gsap.set(d, { autoAlpha: 0 }));

            // ── Timeline (pin + scrub) ──
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: `+=${n * 60}%`,
                    pin: true,
                    scrub: 1,
                },
            });

            listItems.forEach((item, i) => {
                const prev = listItems[i - 1];
                if (prev) {
                    tl.set(item, { color: PROJECTS[i].accent },  0.5 * i)
                        .to(slides[i],     { autoAlpha: 1, duration: 0.25 }, "<")
                        .to(descs[i],      { autoAlpha: 1, duration: 0.25 }, "<")
                        .set(prev,         { color: "var(--text-muted)" },    "<")
                        .to(slides[i - 1], { autoAlpha: 0, duration: 0.25 }, "<")
                        .to(descs[i - 1],  { autoAlpha: 0, duration: 0.25 }, "<");
                }
            });

            tl.to(
                fill,
                { scaleY: 1, transformOrigin: "top center", ease: "none", duration: tl.duration() },
                0,
            ).to({}, {});
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="proyectos"
            className="relative w-full h-svh flex flex-col bg-background transition-colors duration-400 overflow-hidden border-t border-foreground/[0.07] pt-20"
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

            {/* ── Header strip ── */}
            <div className="relative z-10 flex-shrink-0 flex items-end justify-between px-8 lg:px-14 py-5 border-b border-foreground/[0.06]">
                <div className="flex items-baseline gap-4">
                    <span className="text-[10px] font-mono tracking-[0.32em] uppercase text-accent">
                        Proyectos
                    </span>
                    <h2 className="text-[clamp(22px,3vw,40px)] font-bold leading-none tracking-tight text-foreground">
                        Trabajo <span className="font-serif italic font-light text-accent">reciente.</span>
                    </h2>
                </div>
                <span className="hidden sm:block text-[10px] font-mono tracking-[0.22em] uppercase text-text-muted">
                    {PROJECTS.length} proyectos
                </span>
            </div>

            {/* ── Main layout: left list / right panel ── */}
            <div className="relative z-10 flex-1 flex flex-col lg:flex-row min-h-0">

                {/* ══ LEFT — progress bar + title list ══ */}
                <div className="order-last lg:order-first flex-shrink-0 w-full lg:w-[40%] h-[55%] lg:h-auto flex flex-row min-h-0 border-t lg:border-t-0 lg:border-r border-foreground/[0.06]">

                    {/* Progress fill track */}
                    <div className="hidden lg:block relative flex-shrink-0 w-[4px] bg-foreground/[0.07]">
                        <div
                            ref={fillRef}
                            className="absolute top-0 left-0 w-full bg-accent"
                            style={{
                                height: "100%",
                                transform: `scaleY(${1 / PROJECTS.length})`,
                                transformOrigin: "top center",
                            }}
                        />
                    </div>

                    {/* List */}
                    <ul
                        ref={listRef}
                        className="flex-1 list-none m-0 p-0 flex flex-col divide-y divide-foreground/[0.05] overflow-hidden"
                    >
                        {PROJECTS.map((p, i) => (
                            <li
                                key={i}
                                className="proj-item flex flex-col justify-center gap-2 px-8 lg:px-10 py-4 cursor-default flex-1"
                                style={{ color: "var(--text-muted)" }}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-[9px] font-mono tracking-[0.3em] uppercase opacity-50">
                                        {p.tag}
                                    </span>
                                    <span className="text-[9px] font-mono text-foreground/20">
                                        {p.year}
                                    </span>
                                </div>
                                <span className="text-[clamp(24px,3vw,46px)] font-bold leading-[0.9] tracking-tight transition-colors duration-200">
                                    {p.title}
                                </span>
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                    {p.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="text-[9px] font-mono tracking-[0.16em] uppercase border border-foreground/[0.08] text-foreground/25 px-2 py-0.5 rounded-sm"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ══ RIGHT — framed image + info card (visible on all screens) ══ */}
                <div ref={rightRef} className="order-first lg:order-last flex flex-col flex-1 lg:flex-none lg:w-[60%] h-[45%] lg:h-auto min-h-0 p-4 lg:p-8 gap-3 lg:gap-6">

                    {/* Image frame — constrained, not full-bleed */}
                    <div className="relative flex-1 rounded-sm overflow-hidden border border-foreground/[0.06] min-h-0">
                        {PROJECTS.map((p, i) => (
                            <div
                                key={i}
                                className="proj-slide absolute inset-0"
                                style={{ opacity: 0, visibility: "hidden" }}
                            >
                                <Image
                                    src={p.image}
                                    alt={p.title}
                                    fill
                                    className="object-cover"
                                    sizes="55vw"
                                    priority={i === 0}
                                />
                                {/* Subtle bottom gradient so it merges into the info card */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
                            </div>
                        ))}
                    </div>

                    {/* Info card — swaps with the image */}
                    <div className="relative flex-shrink-0 h-[72px] lg:h-[100px]">
                        {PROJECTS.map((p, i) => (
                            <div
                                key={i}
                                className="proj-desc absolute inset-0 flex items-center gap-5"
                                style={{ opacity: 0, visibility: "hidden" }}
                            >
                                {/* Accent side bar */}
                                <div
                                    className="w-[3px] self-stretch rounded-full flex-shrink-0"
                                    style={{ backgroundColor: p.accent, opacity: 0.7 }}
                                />

                                {/* Text */}
                                <div className="flex-1 flex flex-col gap-1.5">
                                    <span
                                        className="text-[10px] font-mono tracking-[0.26em] uppercase"
                                        style={{ color: p.accent }}
                                    >
                                        {p.tag}
                                    </span>
                                    <p className="text-[13px] leading-[1.7] text-text-muted line-clamp-2">
                                        {p.description}
                                    </p>
                                </div>

                                {/* CTA */}
                                <a
                                    href="#contacto"
                                    className="flex-shrink-0 inline-flex items-center gap-2.5 text-[10px] font-mono tracking-[0.22em] uppercase border px-5 py-3 rounded-sm no-underline transition-all duration-200 text-foreground border-foreground/15 hover:border-foreground/40 hover:bg-foreground/[0.04] self-center"
                                >
                                    Saber más
                                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

            </div>{/* end main layout */}

        </section>
    );
}
