"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

const IconLinkedin = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"/>
    </svg>
);
const IconInstagram = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
);
const IconGithub = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
);
const IconX = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
);


if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);
}

// ── Paths del morph ──────────────────────────────────────────────────────────
const PATH_INIT = "M 0 100 V 100 Q 50 100 100 100 V 100 z"; // plano
const PATH_WAVE = "M 0 100 V 50 Q 50 0 100 50 V 100 z";     // ola
const PATH_FULL = "M 0 100 V 0 Q 50 0 100 0 V 100 z";       // lleno

const NAV = [
    { label: "Inicio",     href: "#inicio"    },
    { label: "Servicios",  href: "#servicios" },
    { label: "Proyectos",  href: "#proyectos" },
    { label: "Nosotros",   href: "#nosotros"  },
    { label: "Contacto",   href: "#contacto"  },
];

const SERVICES = [
    "Desarrollo Web",
    "Apps Móviles",
    "Cloud & DevOps",
    "Inteligencia Artificial",
    "Diseño UI / UX",
];

const SOCIALS = [
    { label: "LinkedIn",  href: "https://linkedin.com",  Icon: IconLinkedin  },
    { label: "Instagram", href: "https://instagram.com", Icon: IconInstagram },
    { label: "GitHub",    href: "https://github.com",    Icon: IconGithub    },
    { label: "X / Twitter", href: "https://x.com",      Icon: IconX         },
];

export default function Footer() {
    const sectionRef = useRef<HTMLElement>(null);
    const pathRef    = useRef<SVGPathElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const tlRef      = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        const path    = pathRef.current;
        const content = contentRef.current;
        if (!path || !content) return;

        // Estado inicial
        path.setAttribute("d", PATH_INIT);
        gsap.set(content, { autoAlpha: 0, y: 40 });

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ paused: true });
            tlRef.current = tl;

            // Fase 1: plano → ola
            tl.to(path, { morphSVG: PATH_WAVE, duration: 0.6, ease: "power2.in" })
            // Fase 2: ola → lleno
              .to(path, { morphSVG: PATH_FULL, duration: 0.7, ease: "power2.out" })
            // Contenido aparece
              .to(content, { autoAlpha: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.35");

            // ScrollTrigger: play al entrar, reverse al salir
            ScrollTrigger.create({
                trigger:     sectionRef.current,
                start:       "top 80%",
                onEnter:     () => tl.play(),
                onEnterBack: () => tl.play(),
                onLeaveBack: () => {
                    tl.reverse();
                    tl.eventCallback("onReverseComplete", () => {
                        path.setAttribute("d", PATH_INIT);
                        tl.pause(0);
                    });
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={sectionRef}
            id="contacto"
            className="relative w-full overflow-hidden transition-colors duration-400 border-t border-foreground/[0.07]"
            style={{
                minHeight: "100vh",
                background: "var(--background)",
                marginTop: "clamp(8rem, 15vh, 14rem)",
            }}
        >
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMin slice"
                aria-hidden
            >
                <path
                    ref={pathRef}
                    fill="var(--foreground)"
                    stroke="var(--foreground)"
                    strokeWidth="0.3"
                    vectorEffect="non-scaling-stroke"
                    d={PATH_INIT}
                />
            </svg>

            <div
                ref={contentRef}
                className="relative z-10 flex flex-col justify-between min-h-screen px-8 lg:px-14 pt-16 pb-6"
            >
                {/* Top: nombre + email */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 border-b border-background/20 pb-8">
                    <div>
                        <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-accent mb-3 block">
                            Software Studio
                        </span>
                        <h2 className="text-[clamp(44px,8vw,110px)] font-bold leading-none tracking-tight text-background">
                            Quetzalco.
                        </h2>
                    </div>
                    <a
                        href="mailto:hola@quetzalco.dev"
                        className="group inline-flex items-center gap-3 text-background hover:text-accent transition-colors duration-200 self-start lg:self-end"
                    >
                        <span className="text-[clamp(14px,1.8vw,20px)] font-medium underline underline-offset-4 decoration-background/30 group-hover:decoration-accent transition-colors duration-200">
                            hola@quetzalco.dev
                        </span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <path d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                    </a>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 py-10">
                    <div>
                        <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-background/60 mb-5">
                            Navegación
                        </p>
                        <ul className="flex flex-col gap-3">
                            {NAV.map(({ label, href }) => (
                                <li key={label}>
                                    <Link
                                        href={href}
                                        className="text-[14px] text-background/80 hover:text-background transition-colors duration-150"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-background/60 mb-5">
                            Servicios
                        </p>
                        <ul className="flex flex-col gap-3">
                            {SERVICES.map((s) => (
                                <li key={s} className="text-[14px] text-background/80">
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-background/60 mb-5">
                            Redes sociales
                        </p>
                        <div className="flex flex-col gap-3">
                            {SOCIALS.map(({ label, href, Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2.5 text-[14px] text-background/80 hover:text-accent transition-colors duration-150 w-fit"
                                    aria-label={label}
                                >
                                    <Icon />
                                    {label}
                                </a>
                            ))}
                        </div>

                        <div className="mt-8">
                            <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-background/60 mb-3">
                                Contacto
                            </p>
                            <ul className="flex flex-col gap-2 text-[13px] text-background/70">
                                <li>México · Guadalajara</li>
                                <li>hola@quetzalco.dev</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 border-t border-background/20 pb-4">
                    <p className="text-[11px] font-mono tracking-[0.18em] text-background/60">
                        © {new Date().getFullYear()} Quetzalco/Dev. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-6">
                        {["Privacidad", "Términos"].map((l) => (
                            <Link
                                key={l}
                                href="#"
                                className="text-[11px] font-mono tracking-[0.15em] text-background/60 hover:text-background transition-colors duration-150"
                            >
                                {l}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
