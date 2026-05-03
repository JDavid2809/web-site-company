"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
    {
        tag: "Frontend · Backend · Full Stack",
        title: "Desarrollo\nWeb",
        body: "Construimos aplicaciones web de alto rendimiento con Next.js, arquitecturas REST y GraphQL. Desde landing pages hasta plataformas SaaS complejas que escalan con tu negocio.",
        highlights: ["Next.js", "React", "Node.js", "TypeScript", "GraphQL"],
        accentClass: "text-blue-400 dark:text-blue-400",
        glowStyle: { background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(59,130,246,0.12) 0%, transparent 70%)" },
        visual: "web",
    },
    {
        tag: "iOS · Android · Cross-platform",
        title: "Aplicaciones\nMóviles",
        body: "Experiencias nativas y multiplataforma con React Native y Expo. Apps que se sienten como parte del dispositivo, con rendimiento fluido y diseño que enamora desde la primera pantalla.",
        highlights: ["React Native", "Expo", "Swift", "Kotlin"],
        accentClass: "text-violet-400 dark:text-violet-400",
        glowStyle: { background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(139,92,246,0.12) 0%, transparent 70%)" },
        visual: "mobile",
    },
    {
        tag: "AWS · GCP · Docker · CI/CD",
        title: "Cloud &\nDevOps",
        body: "Infraestructura escalable y automatizada desde el primer día. Pipelines de despliegue continuo, monitoreo en tiempo real y arquitecturas serverless preparadas para cualquier carga.",
        highlights: ["AWS", "Docker", "Terraform", "GitHub Actions", "Kubernetes"],
        accentClass: "text-emerald-400 dark:text-emerald-400",
        glowStyle: { background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(16,185,129,0.12) 0%, transparent 70%)" },
        visual: "cloud",
    },
    {
        tag: "LLM · Visión · Automatización",
        title: "Inteligencia\nArtificial",
        body: "Integramos modelos de lenguaje, visión artificial y pipelines de datos en tus flujos de trabajo. Software que aprende, optimiza y reduce el trabajo manual de forma significativa.",
        highlights: ["OpenAI", "LangChain", "Python", "Pinecone", "HuggingFace"],
        accentClass: "text-orange-400 dark:text-orange-400",
        glowStyle: { background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(251,146,60,0.12) 0%, transparent 70%)" },
        visual: "ai",
    },
    {
        tag: "Research · Prototipado · Sistemas",
        title: "Diseño\nUI / UX",
        body: "Interfaces que reducen fricción y maximizan conversión. Diseñamos sistemas de componentes coherentes, accesibles y orientados a resultados. El diseño no es solo estética, es estrategia.",
        highlights: ["Figma", "Framer", "Storybook", "Tailwind", "GSAP"],
        accentClass: "text-pink-400 dark:text-pink-400",
        glowStyle: { background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(244,114,182,0.12) 0%, transparent 70%)" },
        visual: "design",
    },
];

// ─── SVG Visuals ──────────────────────────────────────────────────────────────
function CardVisual({ type }: { type: string }) {
    const cls = "absolute inset-0 w-full h-full pointer-events-none";
    if (type === "web") return (
        <svg className={cls} viewBox="0 0 600 400" fill="none" aria-hidden>
            <rect x="80" y="70" width="440" height="280" rx="10" stroke="currentColor" strokeOpacity="0.07" strokeWidth="1.2" />
            <rect x="80" y="70" width="440" height="38" fill="currentColor" fillOpacity="0.04" />
            <circle cx="108" cy="89" r="6" fill="currentColor" fillOpacity="0.18" />
            <circle cx="130" cy="89" r="6" fill="currentColor" fillOpacity="0.12" />
            <circle cx="152" cy="89" r="6" fill="currentColor" fillOpacity="0.07" />
            <rect x="170" y="83" width="120" height="12" rx="6" fill="currentColor" fillOpacity="0.06" />
            <rect x="100" y="135" width="200" height="12" rx="6" fill="currentColor" fillOpacity="0.10" />
            <rect x="100" y="157" width="300" height="8" rx="4" fill="currentColor" fillOpacity="0.06" />
            <rect x="100" y="173" width="260" height="8" rx="4" fill="currentColor" fillOpacity="0.06" />
            <rect x="100" y="189" width="220" height="8" rx="4" fill="currentColor" fillOpacity="0.04" />
            <rect x="100" y="230" width="100" height="36" rx="6" fill="var(--accent)" fillOpacity="0.15" />
            <rect x="214" y="230" width="100" height="36" rx="6" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1" />
            <rect x="340" y="130" width="160" height="180" rx="8" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.06" strokeWidth="1" />
            <rect x="354" y="146" width="132" height="80" rx="4" fill="currentColor" fillOpacity="0.04" />
            <rect x="354" y="238" width="90" height="8" rx="4" fill="currentColor" fillOpacity="0.07" />
            <rect x="354" y="254" width="110" height="6" rx="3" fill="currentColor" fillOpacity="0.04" />
        </svg>
    );
    if (type === "mobile") return (
        <svg className={cls} viewBox="0 0 600 400" fill="none" aria-hidden>
            <rect x="210" y="30" width="180" height="340" rx="28" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1.5" />
            <rect x="222" y="72" width="156" height="256" rx="8" fill="currentColor" fillOpacity="0.03" />
            <rect x="255" y="44" width="90" height="10" rx="5" fill="currentColor" fillOpacity="0.10" />
            <rect x="280" y="44" width="10" height="10" rx="5" fill="currentColor" fillOpacity="0.15" />
            <rect x="232" y="88" width="136" height="72" rx="8" fill="currentColor" fillOpacity="0.05" />
            <rect x="232" y="172" width="60" height="60" rx="8" fill="var(--accent)" fillOpacity="0.12" />
            <rect x="304" y="172" width="60" height="60" rx="8" fill="currentColor" fillOpacity="0.05" />
            <rect x="232" y="172" width="60" height="60" rx="8" stroke="var(--accent)" strokeOpacity="0.12" strokeWidth="1" />
            <rect x="232" y="244" width="136" height="8" rx="4" fill="currentColor" fillOpacity="0.07" />
            <rect x="232" y="260" width="100" height="6" rx="3" fill="currentColor" fillOpacity="0.04" />
            <rect x="232" y="280" width="136" height="28" rx="6" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.07" strokeWidth="1" />
        </svg>
    );
    if (type === "cloud") return (
        <svg className={cls} viewBox="0 0 600 400" fill="none" aria-hidden>
            <circle cx="300" cy="200" r="110" stroke="currentColor" strokeOpacity="0.05" strokeWidth="1" strokeDasharray="5 8" />
            <circle cx="300" cy="200" r="70" stroke="var(--accent)" strokeOpacity="0.09" strokeWidth="1" strokeDasharray="3 6" />
            <circle cx="300" cy="200" r="30" fill="var(--accent)" fillOpacity="0.08" />
            <circle cx="300" cy="90" r="12" fill="currentColor" fillOpacity="0.14" />
            <circle cx="400" cy="260" r="12" fill="currentColor" fillOpacity="0.10" />
            <circle cx="200" cy="260" r="12" fill="currentColor" fillOpacity="0.10" />
            <circle cx="400" cy="140" r="10" fill="currentColor" fillOpacity="0.08" />
            <circle cx="200" cy="140" r="10" fill="currentColor" fillOpacity="0.08" />
            <line x1="300" y1="102" x2="300" y2="170" stroke="currentColor" strokeOpacity="0.07" strokeWidth="1" />
            <line x1="391" y1="255" x2="331" y2="223" stroke="currentColor" strokeOpacity="0.07" strokeWidth="1" />
            <line x1="209" y1="255" x2="269" y2="223" stroke="currentColor" strokeOpacity="0.07" strokeWidth="1" />
            <line x1="392" y1="148" x2="338" y2="180" stroke="currentColor" strokeOpacity="0.07" strokeWidth="1" />
            <line x1="208" y1="148" x2="262" y2="180" stroke="currentColor" strokeOpacity="0.07" strokeWidth="1" />
        </svg>
    );
    if (type === "ai") return (
        <svg className={cls} viewBox="0 0 600 400" fill="none" aria-hidden>
            {[0,1,2,3,4].map(i => (
                <circle key={`t${i}`} cx={100 + i * 100} cy="100" r="12" fill="currentColor" fillOpacity="0.08" />
            ))}
            {[0,1,2,3].map(i => (
                <circle key={`m${i}`} cx={150 + i * 100} cy="200" r="12" fill="currentColor" fillOpacity="0.08" />
            ))}
            {[0,1,2,3,4].map(i => (
                <circle key={`b${i}`} cx={100 + i * 100} cy="300" r="12" fill="currentColor" fillOpacity="0.08" />
            ))}
            <circle cx="300" cy="200" r="16" fill="var(--accent)" fillOpacity="0.25" />
            {/* Connections layer 1→2 */}
            {[0,1,2,3,4].map(ix => [0,1,2,3].map(iy => (
                <line key={`l1-${ix}-${iy}`} x1={100+ix*100} y1="112" x2={150+iy*100} y2="188" stroke="currentColor" strokeOpacity="0.04" strokeWidth="0.8" />
            )))}
            {/* Connections layer 2→3 */}
            {[0,1,2,3].map(ix => [0,1,2,3,4].map(iy => (
                <line key={`l2-${ix}-${iy}`} x1={150+ix*100} y1="212" x2={100+iy*100} y2="288" stroke="currentColor" strokeOpacity="0.04" strokeWidth="0.8" />
            )))}
        </svg>
    );
    return (
        <svg className={cls} viewBox="0 0 600 400" fill="none" aria-hidden>
            <rect x="80" y="90" width="440" height="220" rx="14" stroke="currentColor" strokeOpacity="0.07" strokeWidth="1.2" />
            <rect x="100" y="112" width="160" height="176" rx="8" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.06" strokeWidth="1" />
            <circle cx="180" cy="200" r="40" stroke="var(--accent)" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="4 5" />
            <rect x="284" y="124" width="216" height="54" rx="8" fill="var(--accent)" fillOpacity="0.08" />
            <rect x="284" y="190" width="140" height="10" rx="5" fill="currentColor" fillOpacity="0.07" />
            <rect x="284" y="208" width="180" height="8" rx="4" fill="currentColor" fillOpacity="0.05" />
            <rect x="284" y="224" width="160" height="8" rx="4" fill="currentColor" fillOpacity="0.04" />
            <rect x="284" y="248" width="216" height="28" rx="6" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.07" strokeWidth="1" />
        </svg>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ValueProposition() {
    const wrapperRef  = useRef<HTMLDivElement>(null);
    const trackRef    = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    // ── GSAP — no `dark` dependency to avoid scroll reset on theme change ──
    useEffect(() => {
        const ctx = gsap.context(() => {
            const wrapper = wrapperRef.current;
            const track   = trackRef.current;
            if (!wrapper || !track) return;

            const getX = () => -(track.scrollWidth - window.innerWidth);

            const scrollTween = gsap.to(track, { x: getX, ease: "none" });

            const st = ScrollTrigger.create({
                trigger: wrapper,
                start: "top top",
                end: () => `+=${Math.abs(getX()) + window.innerHeight * 0.3}`,
                pin: true,
                anticipatePin: 1,
                scrub: 1.2,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    if (progressRef.current) {
                        gsap.set(progressRef.current, { scaleX: self.progress });
                    }
                },
                animation: scrollTween,
            });

            // Per-card reveal
            track.querySelectorAll<HTMLElement>(".vp-card").forEach((card) => {
                const base = { trigger: card, containerAnimation: scrollTween, scrub: true };

                gsap.fromTo(card.querySelector(".card-tag"),
                    { opacity: 0, y: -10 },
                    { opacity: 1, y: 0, ease: "power2.out", scrollTrigger: { ...base, start: "left 92%", end: "left 64%" } }
                );
                gsap.fromTo(card.querySelector(".card-line"),
                    { scaleX: 0 },
                    { scaleX: 1, ease: "expo.out", scrollTrigger: { ...base, start: "left 90%", end: "left 56%" } }
                );
                gsap.fromTo(card.querySelector(".card-title"),
                    { opacity: 0, y: 52 },
                    { opacity: 1, y: 0, ease: "power3.out", scrollTrigger: { ...base, start: "left 84%", end: "left 50%" } }
                );
                gsap.fromTo(card.querySelector(".card-body"),
                    { opacity: 0, y: 32 },
                    { opacity: 1, y: 0, ease: "power3.out", scrollTrigger: { ...base, start: "left 76%", end: "left 40%" } }
                );
                gsap.fromTo(card.querySelectorAll(".card-pill"),
                    { opacity: 0, y: 16 },
                    { opacity: 1, y: 0, stagger: 0.06, ease: "power2.out", scrollTrigger: { ...base, start: "left 68%", end: "left 28%" } }
                );
                gsap.fromTo(card.querySelector(".card-visual"),
                    { opacity: 0, scale: 1.04 },
                    { opacity: 1, scale: 1, ease: "power2.out", scrollTrigger: { ...base, start: "left 80%", end: "left 45%" } }
                );
                gsap.fromTo(card.querySelector(".card-glow"),
                    { opacity: 0 },
                    { opacity: 1, ease: "none", scrollTrigger: { ...base, start: "left 75%", end: "left 38%" } }
                );
            });

            // Intro parallax
            gsap.to(".vp-heading", {
                x: -50,
                opacity: 0.06,
                ease: "none",
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top top",
                    end: () => `+=${Math.abs(getX()) * 0.4}`,
                    scrub: 1.8,
                },
            });

            return () => st.kill();
        }, wrapperRef);

        return () => ctx.revert();
    }, []); // ← empty deps: GSAP runs once, colors via CSS vars adapt to theme automatically

    return (
        <div
            ref={wrapperRef}
            className="relative w-full h-svh overflow-hidden bg-background transition-colors duration-400"
            aria-label="Nuestros servicios"
        >
            {/* Progress bar */}
            <div
                ref={progressRef}
                className="absolute top-0 left-0 w-full h-[2px] z-20 origin-left scale-x-0 bg-accent"
            />

            {/* Thin top accent gradient border */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent z-10" />

            {/* Dot grid background pattern */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.025]"
                style={{
                    backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* Grid lines — only on large screens */}
            <div className="hidden lg:block absolute inset-y-0 left-12 w-px bg-foreground/[0.05]" />
            <div className="hidden lg:block absolute inset-y-0 right-12 w-px bg-foreground/[0.05]" />

            {/* ══ Horizontal Track ══ */}
            <div ref={trackRef} className="flex flex-row h-full will-change-transform pt-0 lg:pt-20">

                {/* ─── Intro Panel ─── */}
                <div className="flex-shrink-0 flex flex-col justify-center w-screen lg:w-[clamp(360px,34vw,500px)] h-full px-8 lg:px-14 pt-24 pb-12 lg:pt-0 lg:pb-0 gap-7 border-r-0 lg:border-r border-foreground/[0.07]">
                    <span className="text-[10px] font-mono tracking-[0.32em] uppercase text-accent">
                        Servicios
                    </span>
                    <h2 className="vp-heading text-[clamp(44px,6vw,80px)] font-bold leading-[0.9] tracking-tight text-foreground">
                        Lo que<br />
                        <span className="font-serif italic font-light text-accent">construimos</span><br />
                        juntos.
                    </h2>
                    <p className="text-[15px] leading-relaxed text-text-muted max-w-sm">
                        Cinco disciplinas. Un equipo. La misma obsesión por el detalle
                        y el rendimiento en cada entrega.
                    </p>
                    <div className="flex items-center gap-3">
                        <span className="text-accent text-sm">→</span>
                        <span className="text-[10px] font-mono tracking-[0.26em] uppercase text-text-muted">
                            Desplaza para explorar
                        </span>
                    </div>
                </div>

                {/* ─── Service Cards ─── */}
                {SERVICES.map((s, i) => (
                    <article
                        key={i}
                        className="vp-card group flex-shrink-0 relative flex flex-col justify-center lg:justify-between w-screen lg:w-[clamp(460px,48vw,680px)] h-full px-8 lg:px-[clamp(3rem,5vw,5rem)] pt-20 pb-8 lg:pt-12 lg:pb-12 bg-background overflow-hidden transition-colors duration-400 gap-6 lg:gap-0"
                    >
                        {/* Thin accent top bar (per service color) */}
                        <div className={`card-glow absolute top-0 left-0 right-0 h-[3px] ${s.accentClass.replace("text-", "bg-")} opacity-0 origin-left scale-x-0`}
                            style={{ transitionProperty: "none" }}
                        />

                        {/* Subtle left separator line */}
                        <div className="absolute inset-y-0 left-0 w-px bg-foreground/[0.06] hidden lg:block" />
                        {/* Per-service radial glow */}
                        <div
                            className="card-glow absolute inset-0 pointer-events-none opacity-0 transition-colors duration-400"
                            style={s.glowStyle}
                        />

                        {/* SVG Background visual */}
                        <div className="card-visual absolute inset-0 text-foreground opacity-0">
                            <CardVisual type={s.visual} />
                        </div>

                        {/* ── Top zone ── */}
                        <div className="relative z-10 flex flex-col gap-4 lg:gap-5">
                            <span className={`card-tag text-[10px] font-mono tracking-[0.3em] uppercase opacity-0 ${s.accentClass}`}>
                                {s.tag}
                            </span>

                            <div className={`card-line h-[2px] origin-left scale-x-0 ${s.accentClass.replace("text-", "bg-")} opacity-60`} />

                            <h3 className="card-title text-[clamp(32px,5vw,66px)] font-bold leading-[0.9] tracking-tight text-foreground opacity-0 whitespace-pre-line">
                                {s.title}
                            </h3>
                        </div>

                        {/* ── Body ── */}
                        <p className="card-body relative z-10 text-[clamp(14px,1.3vw,16px)] leading-[1.85] text-text-muted max-w-[540px] opacity-0">
                            {s.body}
                        </p>

                        {/* ── Tech pills ── */}
                        <div className="relative z-10 flex flex-wrap gap-2">
                            {s.highlights.map((h) => (
                                <span
                                    key={h}
                                    className={`card-pill text-[11px] font-mono tracking-[0.18em] uppercase border border-foreground/[0.08] text-text-muted px-3 py-1.5 rounded-sm opacity-0 transition-all duration-400 group-hover:border-current/30 group-hover:text-foreground ${s.accentClass}`}
                                >
                                    {h}
                                </span>
                            ))}
                        </div>
                    </article>
                ))}

                {/* ─── Closing Panel ─── */}
                <div className="flex-shrink-0 flex flex-col justify-center items-start w-screen lg:w-[clamp(300px,28vw,440px)] h-full px-8 lg:px-14 py-16 lg:py-0 gap-8 border-l border-foreground/[0.07]">
                    <p className="text-[clamp(40px,5.5vw,66px)] font-bold leading-[0.9] tracking-tight text-foreground/[0.08]">
                        ¿Y tu<br />proyecto?
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
            </div>
        </div>
    );
}