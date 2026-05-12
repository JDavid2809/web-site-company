"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

const STEPS = [
    {
        title: "Análisis",
        description: "Entendemos tu negocio, objetivos y limitaciones. Definimos el alcance, los KPIs y construimos el roadmap técnico antes de escribir una sola línea de código.",
        accent: "#3b82f6",
        image: "/procesos/Analisis.png",
        highlights: ["Auditoría", "KPIs", "Roadmap técnico", "Alcance"],
    },
    {
        title: "Diseño",
        description: "Sistemas de diseño coherentes, prototipado en Figma y validación con usuarios reales. Cada decisión visual está fundamentada en datos de conversión.",
        accent: "#8b5cf6",
        image: "/procesos/Diseño.png",
        highlights: ["Figma", "Design System", "Prototipado", "UX Research"],
    },
    {
        title: "Desarrollo",
        description: "Código limpio, arquitectura escalable y CI/CD desde el día uno. Tests automatizados, revisiones de código y deploys continuos que reducen el riesgo.",
        accent: "#10b981",
        image: "/procesos/Desarrollo.png",
        highlights: ["CI / CD", "Code Review", "Testing", "Arquitectura"],
    },
    {
        title: "Entrega",
        description: "Lanzamiento controlado, monitoreo en tiempo real y soporte post-launch. El proyecto no termina con el deploy — termina cuando los resultados son medibles.",
        accent: "#f59e0b",
        image: "/procesos/Entrega.png",
        highlights: ["Deploy", "Monitoreo", "Soporte", "Métricas"],
    },
];

interface PosEntry {
    left?: string;
    right?: string;
    top: string;
    textSide: "left" | "right";
}

const POSITIONS: PosEntry[] = [
    { left: "60%",    top: "8%",  textSide: "left"  }, // initial
    { left: "2%",     top: "36%", textSide: "right" }, // second
    { right: "2%",    top: "62%", textSide: "left"  }, // third
    { left: "18%",    top: "88%", textSide: "right" }, // fourth
];

const C     = 220; // container circular dashed (px)
const A     = 180; // actor circular imagen (px)
const INSET = (C - A) / 2; // 20px
const GAP   = 36;

export default function WorkProcess() {
    const mainRef    = useRef<HTMLDivElement>(null);
    const finalRef   = useRef<HTMLDivElement>(null);
    const actorRef   = useRef<HTMLDivElement>(null);
    const auraRef    = useRef<HTMLDivElement>(null);
    const markerRefs = useRef<(HTMLDivElement | null)[]>([]);
    const imgRefs    = useRef<(HTMLDivElement | null)[]>([]);
    const ghostRefs  = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        let ctx: gsap.Context | null = null;

        const buildTimeline = () => {
            ctx?.revert();
            ctx = gsap.context(() => {
                const actor   = actorRef.current;
                const markers = markerRefs.current.filter(Boolean) as HTMLDivElement[];
                const imgs    = imgRefs.current.filter(Boolean)    as HTMLDivElement[];
                const ghosts  = ghostRefs.current.filter(Boolean)  as HTMLDivElement[];

                if (!actor || markers.length < STEPS.length) return;

                gsap.set(actor, { x: 0, y: 0 });

                const aR = actor.getBoundingClientRect();

                const points = markers.slice(1).map((m) => {
                    const r = m.getBoundingClientRect();
                    return {
                        x: r.left + r.width  / 2 - (aR.left + aR.width  / 2),
                        y: r.top  + r.height / 2 - (aR.top  + aR.height / 2),
                    };
                });

                imgs.forEach((img, i) => gsap.set(img, { autoAlpha: i === 0 ? 1 : 0 }));
                // Todos los ghosts ocultos al inicio
                ghosts.forEach((g) => gsap.set(g, { autoAlpha: 0 }));

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger:    markers[0],
                        start:      "clamp(top center)",
                        endTrigger: finalRef.current,
                        end:        "clamp(top center)",
                        scrub:      1,
                    },
                });

                // 1. Actor recorre el path curvo
                tl.to(actor, {
                    duration: 1,
                    ease: "none",
                    motionPath: { path: points, curviness: 1.5 },
                }, 0);

                const seg = 1 / points.length;
                points.forEach((_, idx) => {
                    const i    = idx + 1;
                    const mid  = seg * (idx + 0.5);
                    const half = seg * 0.18;

                    // 2. Crossfade imagen en el actor
                    tl.to(imgs[idx], { autoAlpha: 0, duration: half, ease: "sine.inOut" }, mid - half * 0.8);
                    tl.to(imgs[i],   { autoAlpha: 1, duration: half, ease: "sine.inOut" }, mid + half * 0.2);

                    // 3. Aura color
                    tl.to(auraRef.current, {
                        backgroundColor: STEPS[i].accent,
                        duration: half * 2,
                        ease: "sine.inOut",
                    }, mid - half);

                    // 4. Ghost de origen: aparece cuando el actor empieza a irse
                    //    → al subir (scrub reverso) desaparece
                    if (idx === 0) {
                        tl.to(ghosts[0], { autoAlpha: 1, duration: seg * 0.25, ease: "power1.out" }, seg * 0.08);
                    }

                    // 5. Ghost de destino: aparece cuando el actor llega
                    //    → al subir desaparece porque el timeline se revierte
                    tl.to(ghosts[i], { autoAlpha: 1, duration: seg * 0.25, ease: "power1.out" }, seg * i - seg * 0.12);
                });
            });
        };

        buildTimeline();
        window.addEventListener("resize", buildTimeline);
        return () => {
            window.removeEventListener("resize", buildTimeline);
            ctx?.revert();
        };
    }, []);

    // Actor empieza en marker[0]
    const p0 = POSITIONS[0];
    const actorStyle: React.CSSProperties = {
        position: "absolute",
        width:    A,
        height:   A,
        top:      `calc(${p0.top} + ${INSET}px)`,
        zIndex:   10,
        ...(p0.left  ? { left:  `calc(${p0.left}  + ${INSET}px)` } : {}),
        ...(p0.right ? { right: `calc(${p0.right} + ${INSET}px)` } : {}),
    };

    return (
        <>
            {/* ── Desktop ── */}
            <div
                id="proceso"
                className="hidden lg:block w-full bg-background transition-colors duration-400 border-t border-foreground/[0.07]"
            >
                {/* Header sticky */}
                <div className="sticky top-0 z-30 flex items-center justify-between px-8 lg:px-14 py-5 border-b border-foreground/[0.06] bg-background transition-colors duration-400">
                    <div className="flex items-baseline gap-4">
                        <span className="text-[10px] font-mono tracking-[0.32em] uppercase text-accent">Proceso</span>
                        <h2 className="text-[clamp(22px,3vw,40px)] font-bold leading-none tracking-tight text-foreground">
                            Cómo <span className="font-serif italic font-light text-accent">trabajamos.</span>
                        </h2>
                    </div>
                    <span className="hidden sm:block text-[10px] font-mono tracking-[0.22em] uppercase text-text-muted">
                        {STEPS.length} fases
                    </span>
                </div>

                {/* ── Main — sección alta, sin pin ── */}
                <div
                    ref={mainRef}
                    className="relative bg-background transition-colors duration-400"
                    style={{ height: "190vh" }}
                >
                    {STEPS.map((step, i) => {
                        const pos     = POSITIONS[i];
                        const toRight = pos.textSide === "right";

                        // Label: ocupa todo el espacio horizontal disponible
                        let labelStyle: React.CSSProperties = {
                            position:  "absolute",
                            top:       `calc(${pos.top} + ${C / 2}px)`,
                            transform: "translateY(-50%)",
                        };
                        if (toRight && pos.left) {
                            labelStyle = { ...labelStyle, left: `calc(${pos.left} + ${C + GAP}px)`, right: "4%" };
                        } else if (!toRight && pos.left) {
                            labelStyle = { ...labelStyle, left: "4%", right: `calc(${100 - parseFloat(pos.left)}% + ${GAP}px)` };
                        } else if (!toRight && pos.right) {
                            labelStyle = { ...labelStyle, left: "4%", right: `calc(${pos.right} + ${C + GAP}px)` };
                        }

                        return (
                            <div key={`phase-${i}`}>
                                {/* Container circular dashed */}
                                <div
                                    className="absolute rounded-full border-2 border-dashed"
                                    style={{
                                        left:        pos.left,
                                        right:       pos.right,
                                        top:         pos.top,
                                        width:       C,
                                        height:      C,
                                        borderColor: `${step.accent}40`,
                                    }}
                                >
                                    {/* Marker invisible */}
                                    <div
                                        ref={(el) => { markerRefs.current[i] = el; }}
                                        style={{ position: "absolute", left: INSET, top: INSET, width: A, height: A }}
                                    />
                                    <div
                                        className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 rounded-full ring-2 ring-background"
                                        style={{ backgroundColor: step.accent }}
                                    />
                                </div>

                                {/* Ghost — imagen estática que se QUEDA cuando el actor llega
                                    y desaparece al subir (timeline se revierte con scrub) */}
                                <div
                                    ref={(el) => { ghostRefs.current[i] = el; }}
                                    className="absolute pointer-events-none"
                                    style={{
                                        left:   pos.left  ? `calc(${pos.left}  + ${INSET}px)` : undefined,
                                        right:  pos.right ? `calc(${pos.right} + ${INSET}px)` : undefined,
                                        top:    `calc(${pos.top} + ${INSET}px)`,
                                        width:  A,
                                        height: A,
                                        opacity: 0,
                                        visibility: "hidden",
                                    }}
                                >
                                    {/* Aura del ghost */}
                                    <div
                                        className="absolute inset-0 blur-[45px] opacity-40 scale-[1.6] rounded-full"
                                        style={{ backgroundColor: step.accent }}
                                    />
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        fill
                                        className="object-contain p-4 relative"
                                        sizes="200px"
                                    />
                                </div>

                                {/* Label */}
                                <div style={labelStyle} className="flex flex-col gap-4">
                                    <div className="w-8 h-[2px] rounded-full" style={{ backgroundColor: step.accent }} />
                                    <h3 className="text-[clamp(38px,4.5vw,68px)] font-bold leading-[0.9] tracking-tight text-foreground">
                                        {step.title}
                                    </h3>
                                    <p className="text-[15px] leading-[1.85] text-text-muted">
                                        {step.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {step.highlights.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[10px] font-mono tracking-[0.22em] uppercase px-3 py-1.5 rounded-sm border"
                                                style={{ borderColor: `${step.accent}30`, color: step.accent }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* ── Actor — sin bg sólido, solo aura + PNG transparente ── */}
                    <div ref={actorRef} style={actorStyle}>
                        {/* Aura de color */}
                        <div
                            ref={auraRef}
                            className="absolute inset-0 -z-10 blur-[50px] opacity-60 scale-[1.8] rounded-full pointer-events-none"
                            style={{ backgroundColor: STEPS[0].accent }}
                        />
                        {/* Imágenes — crossfade conforme avanza el scroll */}
                        {STEPS.map((step, i) => (
                            <div
                                key={`img-${i}`}
                                ref={(el) => { imgRefs.current[i] = el; }}
                                className="absolute inset-0"
                                style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
                            >
                                <Image
                                    src={step.image}
                                    alt={step.title}
                                    fill
                                    className="object-contain p-4 drop-shadow-2xl"
                                    sizes="200px"
                                    priority={i === 0}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div ref={finalRef} className="h-[8vh] bg-background transition-colors duration-400" />
            </div>

            {/* ── Mobile ── */}
            <section
                id="proceso-mobile"
                className="lg:hidden w-full bg-background transition-colors duration-400 border-t border-foreground/[0.07] px-6 pt-10 pb-14"
            >
                <div className="mb-8">
                    <span className="text-[10px] font-mono tracking-[0.32em] uppercase text-accent">Proceso</span>
                    <h2 className="mt-1 text-[clamp(24px,6vw,36px)] font-bold leading-tight tracking-tight text-foreground">
                        Cómo <span className="font-serif italic font-light text-accent">trabajamos.</span>
                    </h2>
                </div>
                <div className="flex flex-col gap-8">
                    {STEPS.map((s, i) => (
                        <div key={i} className="flex gap-4 items-start">
                            <div className="flex-shrink-0 w-[3px] self-stretch rounded-full" style={{ backgroundColor: s.accent }} />
                            <div className="flex flex-col gap-2">
                                <h3 className="text-[20px] font-bold tracking-tight text-foreground leading-tight">{s.title}</h3>
                                <p className="text-[13px] leading-relaxed text-text-muted">{s.description}</p>
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                    {s.highlights.map((tag) => (
                                        <span key={tag} className="text-[9px] font-mono tracking-[0.2em] uppercase px-2 py-1 rounded-sm border" style={{ borderColor: `${s.accent}30`, color: s.accent }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
