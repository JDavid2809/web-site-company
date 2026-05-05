"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, Flip);
}

const STEPS = [
    {
        title: "Análisis",
        description: "Entendemos tu negocio, objetivos y limitaciones. Definimos el alcance, los KPIs y construimos el roadmap técnico antes de escribir una sola línea de código.",
        accent: "#3b82f6",
        image: "/procesos/Analisis.png",
        pos: "top-[22%] left-[4%]", w: 280, h: 200,
        textPos: "top-[22%] left-[calc(4%+310px)]",
    },
    {
        title: "Diseño",
        description: "Sistemas de diseño coherentes, prototipado en Figma y validación con usuarios reales. Cada decisión visual está fundamentada en datos de conversión.",
        accent: "#8b5cf6",
        image: "/procesos/Diseño.png",
        pos: "top-[20%] right-[5%]", w: 220, h: 260,
        textPos: "top-[20%] right-[calc(5%+250px)]",
    },
    {
        title: "Desarrollo",
        description: "Código limpio, arquitectura escalable y CI/CD desde el día uno. Tests automatizados, revisiones de código y deploys continuos que reducen el riesgo.",
        accent: "#10b981",
        image: "/procesos/Desarrollo.png",
        pos: "bottom-[16%] left-[8%]", w: 320, h: 160,
        textPos: "bottom-[16%] left-[calc(8%+350px)]",
    },
    {
        title: "Entrega",
        description: "Lanzamiento controlado, monitoreo en tiempo real y soporte post-launch. El proyecto no termina con el deploy — termina cuando los resultados son medibles.",
        accent: "#f59e0b",
        image: "/procesos/Entrega.png",
        pos: "bottom-[6%] right-[6%]", w: 260, h: 200,
        textPos: "bottom-[6%] right-[calc(6%+290px)]",
    },
];

export default function WorkProcess() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const endRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const markerRefs = useRef<(HTMLDivElement | null)[]>([]);
    const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
    const boxImgRefs = useRef<(HTMLDivElement | null)[]>([]);
    const staticImgRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        let flipCtx: gsap.Context | null = null;

        const buildTimeline = () => {
            flipCtx?.revert();
            flipCtx = gsap.context(() => {
                const box = boxRef.current;
                const markers = markerRefs.current.filter(Boolean) as HTMLDivElement[];
                const labels = labelRefs.current.filter(Boolean) as HTMLDivElement[];
                const boxImgs = boxImgRefs.current.filter(Boolean) as HTMLDivElement[];
                const staticImgs = staticImgRefs.current.filter(Boolean) as HTMLDivElement[];

                if (!box || markers.length < STEPS.length) return;

                // Capturamos los estados destino para FLIP
                const states = markers.map(m => Flip.getState(m));
                const STEP_GAP = 2.5;

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: stickyRef.current,
                        start: "top top",
                        endTrigger: endRef.current,
                        end: "top top",
                        scrub: 1.2,
                        pin: stickyRef.current,
                    },
                });

                // --- Estado inicial ---
                // Textos
                gsap.set(labels[0], { autoAlpha: 1 });
                labels.slice(1).forEach((l) => gsap.set(l, { autoAlpha: 0, y: 20 }));
                // Imágenes estáticas (las que se "quedan")
                // Ocultas al inicio para evitar que se encimen/dupliquen con la caja móvil
                staticImgs.forEach((img) => gsap.set(img, { autoAlpha: 0 }));
                // Color inicial del aura de la caja móvil
                gsap.set(box, { "--box-shadow-color": STEPS[0].accent });

                // --- Construcción del Timeline ---
                states.slice(1).forEach((state, idx) => {
                    const i = idx + 1; // índice de destino
                    const pos = idx * STEP_GAP + 0.5; // arranca a los 0.5s para dar tiempo de lectura

                    // 1. Justo cuando la caja arranca, encendemos la imagen estática de la sección actual
                    // Esto "deja el rastro" sin causar encimados cuando está en reposo.
                    tl.set(staticImgs[idx], { autoAlpha: 1 }, pos);

                    // 2. Mover la caja (Flip) a la nueva posición
                    const flipAnim = Flip.fit(box, state, {
                        ease: "power2.inOut",
                        duration: 1,
                    }) as gsap.core.Tween;
                    if (flipAnim) tl.add(flipAnim, pos);

                    // 3. Transición suave y SIMULTÁNEA de la imagen DENTRO de la caja.
                    if (boxImgs[idx]) tl.to(boxImgs[idx], { autoAlpha: 0, scale: 0.9, duration: 0.5 }, pos + 0.2);
                    if (boxImgs[i]) tl.fromTo(boxImgs[i], { autoAlpha: 0, scale: 1.1 }, { autoAlpha: 1, scale: 1, duration: 0.5 }, pos + 0.3);

                    // 4. Cambiar el color del aura de la caja
                    tl.to(box, { "--box-shadow-color": STEPS[i].accent, duration: 0.5 }, pos + 0.2);

                    // 5. Mostrar el texto de la nueva sección
                    tl.to(labels[i], { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, pos + 0.3);
                });

                tl.to({}, { duration: 0.6 }); // end pause
            });
        };

        buildTimeline();
        window.addEventListener("resize", buildTimeline);
        return () => { window.removeEventListener("resize", buildTimeline); flipCtx?.revert(); };
    }, []);

    return (
        <>
            {/* ── Tall outer section ── */}
            <div
                ref={sectionRef}
                id="proceso"
                className="hidden lg:block relative w-full bg-background transition-colors duration-400"
                style={{ height: `${STEPS.length * 90}vh` }}
            >
                {/* ── Sticky viewport ── */}
                <div
                    ref={stickyRef}
                    className="relative w-full h-svh overflow-hidden border-t border-foreground/[0.07]"
                >
                    {/* Dot grid */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.03]"
                        style={{
                            backgroundImage: [
                                "linear-gradient(rgba(128,128,128,0.08) 2px, transparent 2px)",
                                "linear-gradient(90deg, rgba(128,128,128,0.08) 2px, transparent 2px)",
                                "linear-gradient(rgba(128,128,128,0.04) 1px, transparent 1px)",
                                "linear-gradient(90deg, rgba(128,128,128,0.04) 1px, transparent 1px)",
                            ].join(", "),
                            backgroundSize: "100px 100px, 100px 100px, 20px 20px, 20px 20px",
                            backgroundPosition: "-2px -2px, -2px -2px, -1px -1px, -1px -1px",
                        }}
                    />

                    {/* Section header */}
                    <div className="absolute top-0 left-0 right-0 z-20 flex items-end justify-between px-8 lg:px-14 pt-28 pb-5 border-b border-foreground/[0.06]">
                        <div className="flex items-baseline gap-4">
                            <span className="text-[10px] font-mono tracking-[0.32em] uppercase text-accent">
                                Proceso
                            </span>
                            <h2 className="text-[clamp(22px,3vw,40px)] font-bold leading-none tracking-tight text-foreground">
                                Cómo <span className="font-serif italic font-light text-accent">trabajamos.</span>
                            </h2>
                        </div>
                        <span className="hidden sm:block text-[10px] font-mono tracking-[0.22em] uppercase text-text-muted">
                            {STEPS.length} fases
                        </span>
                    </div>

                    {/* ── Invisible target markers ── */}
                    {STEPS.map((s, i) => (
                        <div
                            key={`marker-${i}`}
                            ref={(el) => { markerRefs.current[i] = el; }}
                            className={`absolute ${s.pos} pointer-events-none`}
                            style={{ width: s.w, height: s.h }}
                        />
                    ))}

                    {/* ── Imágenes estáticas (las que se "quedan" y no se borran) ── */}
                    {STEPS.map((s, i) => (
                        <div
                            key={`static-${i}`}
                            ref={(el) => { staticImgRefs.current[i] = el; }}
                            className={`absolute ${s.pos} rounded-sm z-0`}
                            style={{ width: s.w, height: s.h, opacity: 0, visibility: "hidden" }}
                        >
                            {/* Aura de fondo suave (sangra hacia afuera del contenedor) */}
                            <div className="absolute inset-0 -z-10 blur-[50px] opacity-40 scale-125" style={{ backgroundColor: s.accent }} />
                            <Image
                                src={s.image}
                                alt={s.title}
                                fill
                                className="object-contain drop-shadow-xl"
                                sizes="(max-width: 1024px) 280px, 320px"
                            />
                        </div>
                    ))}

                    {/* ── Actor box animado (la imagen que va "bajando") ── 
                        Es 'libre' (sin borders duros) pero con un aura de color. */}
                    <div
                        ref={boxRef}
                        className={`absolute ${STEPS[0].pos} rounded-sm flex items-center justify-center z-10 transition-shadow duration-500`}
                        style={{
                            width: STEPS[0].w,
                            height: STEPS[0].h,
                        }}
                    >
                        {/* Aura animada de fondo que sigue a la caja principal */}
                        <div className="absolute inset-0 -z-10 blur-[50px] opacity-40 scale-125 transition-colors duration-500" style={{ backgroundColor: "var(--box-shadow-color, transparent)" }} />

                        {/* Images inside the moving actor box — swapped on each step on timeline ── */}
                        {STEPS.map((s, i) => (
                            <div
                                key={`moving-${i}`}
                                ref={(el) => { boxImgRefs.current[i] = el; }}
                                className="absolute inset-0"
                                style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
                            >
                                <Image
                                    src={s.image}
                                    alt={s.title}
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    sizes="(max-width: 1024px) 280px, 320px"
                                    priority={i === 0}
                                />
                            </div>
                        ))}
                    </div>

                    {/* ── Step label panels (no enumeration, accumulate) ── */}
                    {STEPS.map((s, i) => (
                        <div
                            key={`label-${i}`}
                            ref={(el) => { labelRefs.current[i] = el; }}
                            className={`absolute ${s.textPos} z-20 flex flex-col gap-3 max-w-[280px]`}
                            style={{ opacity: 0, visibility: "hidden" }}
                        >
                            <h3 className="text-[clamp(30px,4vw,52px)] font-bold leading-[0.9] tracking-tight text-foreground">
                                {s.title}
                            </h3>
                            <p className="text-[13px] leading-[1.75] text-text-muted">
                                {s.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Mobile fallback: static vertical list ── */}
            <section
                id="proceso-mobile"
                className="lg:hidden w-full bg-background border-t border-foreground/[0.07] px-6 pt-10 pb-14"
            >
                <div className="mb-8">
                    <span className="text-[10px] font-mono tracking-[0.32em] uppercase text-accent">Proceso</span>
                    <h2 className="mt-1 text-[clamp(24px,6vw,36px)] font-bold leading-tight tracking-tight text-foreground">
                        Cómo <span className="font-serif italic font-light text-accent">trabajamos.</span>
                    </h2>
                </div>
                <div className="flex flex-col gap-6">
                    {STEPS.map((s, i) => (
                        <div key={i} className="flex gap-4 items-start">
                            <div className="flex-shrink-0 w-[3px] self-stretch rounded-full" style={{ backgroundColor: s.accent }} />
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[9px] font-mono tracking-[0.3em] uppercase" style={{ color: s.accent }}>
                                    {i + 1}
                                </span>
                                <h3 className="text-[22px] font-bold tracking-tight text-foreground leading-tight">
                                    {s.title}
                                </h3>
                                <p className="text-[13px] leading-relaxed text-text-muted">
                                    {s.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── End trigger for ScrollTrigger ── */}
            <div ref={endRef} className="w-full h-0" />
        </>
    );
}
