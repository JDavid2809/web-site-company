"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sun, Moon, Mail, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// ─── Datos de cada sección ────────────────────────────────────────────────────
interface NavItem {
    label: string;
    href: string;
    image: string;         // ruta pública /sections/xxx.png
    description: string;
}

const NAV_ITEMS: NavItem[] = [
    { label: "Inicio", href: "#inicio", image: "/menu/Inicio.png", description: "Punto de partida. Una experiencia digital construida con propósito." },
    { label: "Servicios", href: "#servicios", image: "/menu/Servicios.png", description: "Soluciones de software a medida, desde arquitectura hasta entrega." },
    { label: "Proyectos", href: "#proyectos", image: "/menu/Proyectos.png", description: "Casos reales, resultados medibles y código que escala." },
    { label: "Nosotros", href: "#nosotros", image: "/menu/Nosotros.png", description: "Un equipo pequeño con ambición grande y metodología de precisión." },
];

export default function NavbarSylvara() {
    const { dark, toggle: toggleTheme } = useTheme();

    const navRef = useRef<HTMLElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const overlayTl = useRef<gsap.core.Timeline | null>(null);

    // Panel de detalle refs
    const panelImgRef = useRef<HTMLDivElement>(null);
    const floatingImgRef = useRef<HTMLDivElement>(null);
    const panelDescRef = useRef<HTMLParagraphElement>(null);
    const panelLblRef = useRef<HTMLSpanElement>(null);

    const [menuOpen, setMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<NavItem | null>(null);

    // ── 1. Entrance ─────────────────────────────────────────────────────────
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({ defaults: { ease: "power4.out" } })
                .from(navRef.current, { y: -90, opacity: 0, duration: 0.9 })
                .from(".nb-left", { x: -20, opacity: 0, duration: 0.6 }, "-=.5")
                .from(".nb-center", { y: -12, opacity: 0, duration: 0.6 }, "-=.5")
                .from(".nb-right", { x: 20, opacity: 0, duration: 0.6 }, "-=.5");
        });
        return () => ctx.revert();
    }, []);

    // ── 2. Scroll ───────────────────────────────────────────────────────────
    useEffect(() => {
        const trigger = ScrollTrigger.create({
            start: 60,
            onEnter: () => {
                navRef.current?.setAttribute("data-scrolled", "1");
                gsap.to(navRef.current, { minHeight: 80, duration: 0.5, ease: "power3.out" });
                gsap.to(".logo-img-wrapper", { scale: 0.75, y: 5, duration: 0.5, ease: "power3.out" });
                gsap.to(".logo-text", { opacity: 0, scale: 0.8, y: -10, duration: 0.3, ease: "power2.out" });
            },
            onLeaveBack: () => {
                navRef.current?.removeAttribute("data-scrolled");
                gsap.to(navRef.current, { minHeight: 120, duration: 0.5, ease: "power3.out" });
                gsap.to(".logo-img-wrapper", { scale: 1, y: 0, duration: 0.5, ease: "power3.out" });
                gsap.to(".logo-text", { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.1 });
            },
        });
        return () => trigger.kill();
    }, []);

    // ── 3. Overlay timeline ─────────────────────────────────────────────────
    useEffect(() => {
        const ctx = gsap.context(() => {
            overlayTl.current = gsap.timeline({ paused: true, defaults: { ease: "expo.inOut" } })
                .to(overlayRef.current, {
                    clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
                    duration: 0.55,
                })
                .from(".o-item", {
                    y: "110%", opacity: 0, stagger: 0.07, duration: 0.5, ease: "power3.out",
                }, "-=.15")
                .from(".o-panel", {
                    x: 40, opacity: 0, duration: 0.45, ease: "power3.out",
                }, "-=.35");
        });
        return () => ctx.revert();
    }, []);

    // ── 3.5 Floating Image Animation ────────────────────────────────────────
    useEffect(() => {
        if (!floatingImgRef.current) return;

        const floatAnim = gsap.to(floatingImgRef.current, {
            y: "-15px",
            rotationZ: 2,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        return () => {
            floatAnim.kill();
        };
    }, []);

    // ── 4. Toggle menu ──────────────────────────────────────────────────────
    const toggleMenu = () => {
        const next = !menuOpen;
        setMenuOpen(next);
        if (next) {
            overlayTl.current?.play();
            // Reset panel al abrir
            setActiveItem(NAV_ITEMS[0]);
        } else {
            overlayTl.current?.reverse();
            setActiveItem(null);
        }
    };

    // ── 5. Link hover ───────────────────────────────────────────────────────
    const onLinkEnter = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
        // En lugar del JS palette, usamos variables CSS de Tailwind
        gsap.to(e.currentTarget, { color: "var(--link-hover)", x: 14, duration: 0.25, ease: "power3.out" });
        setActiveItem(item);

        if (panelImgRef.current && panelDescRef.current && panelLblRef.current) {
            gsap.killTweensOf([panelImgRef.current, panelDescRef.current, panelLblRef.current]);
            gsap.fromTo(panelImgRef.current,
                { scale: 1.08, opacity: 0, y: 12 },
                { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
            );
            gsap.fromTo(panelDescRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.1 }
            );
            gsap.fromTo(panelLblRef.current,
                { opacity: 0, x: -8 },
                { opacity: 1, x: 0, duration: 0.35, ease: "power3.out", delay: 0.05 }
            );
        }
    };

    const onLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        gsap.to(e.currentTarget, {
            color: "var(--link-idle)",
            x: 0,
            duration: 0.22,
            ease: "power3.in",
            onComplete: () => {
                gsap.set(e.currentTarget, { clearProps: "color,x" });
            },
        });
    };

    return (
        <>
            <style>{`
        nav[data-scrolled] {
          background: var(--nav-bg-scrolled) !important;
          box-shadow: 0 1px 28px rgba(0,0,0,0.12) !important;
        }

        .nb-contact { position: relative; transition: color .2s; }
        .nb-contact::after {
          content: ''; position: absolute; bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: var(--accent);
          transition: width .32s cubic-bezier(.16,1,.3,1);
        }
        .nb-contact:hover { color: var(--accent) !important; }
        .nb-contact:hover::after { width: 100%; }
      `}</style>

            {/* ══ Navbar ══ */}
            <nav
                ref={navRef}
                role="navigation"
                aria-label="Navegación principal"
                className="fixed top-0 left-0 right-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center min-h-[120px] px-[clamp(1rem,4vw,2.5rem)] bg-nav-bg backdrop-blur-[18px] transition-[background,box-shadow] duration-400"
            >
                {/* ── Izquierda ── */}
                <div className="nb-left flex items-center gap-3">
                    <button
                        onClick={toggleMenu}
                        aria-expanded={menuOpen}
                        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                        className="flex items-center gap-2 bg-transparent border-none cursor-pointer py-1.5 px-1 text-accent transition-opacity duration-200 hover:opacity-80"
                    >
                        {menuOpen ? <X size={20} strokeWidth={1.6} /> : <Menu size={20} strokeWidth={1.6} />}
                        <span className="hidden sm:inline text-[10px] tracking-[0.22em] uppercase text-text-muted font-medium">
                            {menuOpen ? "Cerrar" : "Menú"}
                        </span>
                    </button>
                </div>

                {/* ── Centro: Logo Image con Next/Image ── */}
                <div
                    className="nb-center flex flex-col items-center cursor-pointer select-none"
                    role="link"
                    tabIndex={0}
                    aria-label="Volver al inicio"
                >
                    <div className="logo-img-wrapper origin-top">
                        <Image
                            src="/logos/logo-2.png"
                            alt="Logo Quetzalco"
                            width={90}
                            height={90}
                            className="object-contain"
                        />
                    </div>
                    <span className="logo-text block origin-top font-sans text-[13px] font-light tracking-[0.35em] uppercase text-text-primary whitespace-nowrap -mt-2">
                        Quetzalco/Dev
                    </span>
                </div>

                {/* ── Derecha: toggle → contacto ── */}
                <div className="nb-right flex justify-end items-center gap-1.5">
                    <button
                        className="flex items-center justify-center border-none bg-transparent cursor-pointer text-text-muted hover:text-accent transition-colors duration-200"
                        onClick={toggleTheme}
                        aria-label={dark ? "Modo claro" : "Modo oscuro"}
                        title={dark ? "Modo claro" : "Modo oscuro"}
                    >
                        {dark ? <Sun size={16} strokeWidth={1.7} /> : <Moon size={16} strokeWidth={1.7} />}
                    </button>

                    <span aria-hidden className="w-px h-[18px] bg-divider shrink-0 mx-1" />

                    <a
                        href="#contacto"
                        className="nb-contact inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase text-text-muted no-underline px-2 py-1.5 font-medium"
                    >
                        <Mail size={13} strokeWidth={1.7} className="text-accent" />
                        <span className="hidden sm:inline">Contacto</span>
                    </a>
                </div>
            </nav>

            {/* ══ Overlay Menu ══ */}
            <div
                ref={overlayRef}
                role="dialog"
                aria-modal="true"
                aria-label="Menú de navegación"
                aria-hidden={!menuOpen}
                className={`fixed inset-0 bg-overlay-bg z-40 overflow-y-auto flex flex-col p-[clamp(5.5rem,10vh,7rem)_clamp(1.5rem,5vw,3rem)_3rem] pointer-events-${menuOpen ? 'auto' : 'none'}`}
                style={{ clipPath: "polygon(0 0,100% 0,100% 0%,0 0%)" }}
            >
                <div className="w-full max-w-[1100px] mx-auto md:my-auto mb-auto mt-16 md:mt-auto grid grid-cols-1 md:grid-cols-2 gap-[clamp(2rem,6vw,5rem)] items-center">
                    {/* ── Links ── */}
                    <ul className="list-none p-0 m-0">
                        {NAV_ITEMS.map((item) => {
                            const isActive = activeItem?.href === item.href;
                            return (
                                <li key={item.href} className="overflow-hidden">
                                    <a
                                        href={item.href}
                                        className={`o-item block font-sans text-[clamp(28px,5vw,52px)] font-light italic no-underline py-1 tracking-[-0.01em] transition-colors duration-200 ${isActive ? 'text-link-hover' : 'text-link-idle'}`}
                                        onClick={toggleMenu}
                                        onMouseEnter={(e) => onLinkEnter(e, item)}
                                        onMouseLeave={onLinkLeave}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    {/* ── Panel de detalle con imagen ── */}
                    <div className="o-panel flex flex-col gap-5 items-center">
                        {/* Imagen de sección */}
                        <div
                            ref={panelImgRef}
                            className="w-full max-w-[400px] h-[300px] relative flex items-center justify-center pointer-events-none"
                            style={{ filter: "drop-shadow(0 15px 40px rgba(100, 150, 255, 0.15))" }}
                        >
                            <div ref={floatingImgRef} className="relative w-full h-full">
                                {activeItem && (
                                    <Image
                                        key={activeItem.href}
                                        src={activeItem.image}
                                        alt={activeItem.label}
                                        fill
                                        sizes="(max-width: 800px) 90vw, 400px"
                                        className="object-contain"
                                        priority
                                    />
                                )}
                            </div>
                        </div>

                        {/* Label de sección */}
                        <span
                            ref={panelLblRef}
                            className="text-[9px] tracking-[0.3em] uppercase text-accent font-medium"
                        >
                            {activeItem?.label ?? ""}
                        </span>

                        {/* Descripción */}
                        <p
                            ref={panelDescRef}
                            className="font-sans text-[clamp(14px,1.8vw,17px)] font-light leading-relaxed text-foreground/55 max-w-[360px] text-center"
                        >
                            {activeItem?.description ?? ""}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}