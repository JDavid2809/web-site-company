"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { 
    Globe, Layout, FileCode2, Brackets, Atom, Layers, Paintbrush, Sparkles,
    Server, Cpu, Box, Terminal, Share2, 
    Database, Leaf, Zap, 
    GitBranch, Cloud, Triangle, Workflow
} from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const STACK = [
    {
        category: "Frontend",
        skills: [
            { name: "HTML", icon: Globe, img: "/technologies/html-5.svg" },
            { name: "JavaScript", icon: FileCode2, img: "/technologies/javascript.svg" },
            { name: "TypeScript", icon: Brackets, img: "/technologies/typescript-icon.svg" },
            { name: "React", icon: Atom, img: "/technologies/react.svg" },
            { name: "Next.js", icon: Layers, img: "/technologies/nextjs-icon.svg" },
            { name: "Tailwind CSS", icon: Paintbrush, img: "/technologies/tailwindcss-icon.svg" },
            { name: "GSAP", icon: Sparkles, img: "/technologies/gsap.svg" }
        ]
    },
    {
        category: "Backend",
        skills: [
            { name: "Node.js", icon: Server, img: "/technologies/nodejs-icon.svg" },
            { name: "Express", icon: Cpu, img: "/technologies/express.svg" },
            { name: "NestJS", icon: Box, img: "/technologies/nestjs.svg" },
            { name: "Python", icon: Terminal, img: "/technologies/python.svg" },
            { name: "GraphQL", icon: Share2, img: "/technologies/graphql.svg" }
        ]
    },
    {
        category: "Base de Datos",
        skills: [
            { name: "PostgreSQL", icon: Database, img: "/technologies/postgresql.svg" },
            { name: "MongoDB", icon: Leaf, img: "/technologies/mongodb-icon.svg" },
            { name: "MySQL", icon: Database, img: "/technologies/mysql-icon.svg" },
            { name: "Redis", icon: Zap }
        ]
    },
    {
        category: "Infraestructura & Herramientas",
        skills: [
            { name: "Git", icon: GitBranch, img: "/technologies/git-icon.svg" },
            { name: "Docker", icon: Box, img: "/technologies/docker-icon.svg" },
            { name: "AWS", icon: Cloud },
            { name: "Vercel", icon: Triangle, img: "/technologies/vercel-icon.svg" },
            { name: "CI/CD", icon: Workflow }
        ]
    }
];

function AccordionItem({ category, skills, isOpen, onClick }: { category: string, skills: {name: string, icon: any, img?: string}[], isOpen: boolean, onClick: () => void }) {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;
        if (isOpen) {
            gsap.to(contentRef.current, { height: "auto", opacity: 1, duration: 0.5, ease: "power3.out" });
        } else {
            gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.4, ease: "power3.out" });
        }
    }, [isOpen]);

    return (
        <div className="border-b border-foreground/[0.08] overflow-hidden">
            <button 
                onClick={onClick}
                className="w-full flex items-center justify-between text-left py-8 group"
            >
                <h3 className="text-3xl md:text-5xl font-light text-foreground group-hover:text-accent transition-colors duration-400">
                    {category}
                </h3>
                <span className="text-2xl font-light text-text-muted group-hover:text-accent transition-colors duration-400">
                    {isOpen ? "—" : "+"}
                </span>
            </button>
            <div ref={contentRef} className="h-0 opacity-0 overflow-hidden">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pb-8 pl-2">
                    {skills.map((skill, idx) => {
                        const Icon = skill.icon;
                        return (
                            <li key={idx} className="flex items-center gap-3 text-lg md:text-xl text-text-muted hover:text-foreground hover:translate-x-1 transition-all duration-300 cursor-default group/item">
                                {skill.img ? (
                                    <div className="relative w-6 h-6 grayscale opacity-70 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-300">
                                        <Image src={skill.img} alt={skill.name} fill className="object-contain" />
                                    </div>
                                ) : (
                                    <Icon className="w-6 h-6 text-accent opacity-70 group-hover/item:opacity-100 transition-opacity duration-300" />
                                )}
                                <span>{skill.name}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default function Technologies() {
    const [openIndex, setOpenIndex] = useState<number>(0);
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animar el título
            if (titleRef.current) {
                gsap.fromTo(titleRef.current, 
                    { opacity: 0, y: 50 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 1, 
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 70%",
                        }
                    }
                );
            }

            // Animar la lista de tecnologías en cascada
            if (accordionRefs.current.length > 0) {
                gsap.fromTo(accordionRefs.current,
                    { opacity: 0, x: -30 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 60%",
                        }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section 
            id="tecnologias"
            ref={sectionRef}
            // mt-24 md:mt-32 agrega margen físico real para separar del componente superior (WorkProcess)
            // pt-20 md:pt-32 agrega el padding interno necesario
            className="relative w-full bg-background transition-colors duration-400 border-t border-foreground/[0.07] px-6 md:px-14 mt-24 md:mt-32 pt-20 md:pt-32 pb-12 md:pb-16"
        >
            <div className="max-w-[1800px] mx-auto flex flex-col-reverse md:flex-row gap-16 md:gap-24">
                
                {/* Lado Izquierdo: Tecnologías (Acordeón) */}
                <div className="w-full md:w-1/2 flex flex-col">
                    <div className="border-t border-foreground/[0.08]">
                        {STACK.map((item, index) => (
                            <div key={index} ref={el => { accordionRefs.current[index] = el; }}>
                                <AccordionItem
                                    category={item.category}
                                    skills={item.skills}
                                    isOpen={openIndex === index}
                                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lado Derecho: Título y Subtítulo (Sticky) */}
                <div className="w-full md:w-1/2 relative">
                    {/* Quitamos espacio excesivo con top-32 en lugar de márgenes altos, y lo mantenemos en pantalla */}
                    <div className="md:sticky md:top-32 flex flex-col items-start">
                        <span className="text-[10px] font-mono tracking-[0.32em] uppercase text-accent mb-6">
                            Skills
                        </span>
                        {/* El texto principal ahora es text-accent (azul) y el resto text-foreground (o muted) */}
                        <h2 
                            ref={titleRef}
                            className="text-[clamp(32px,4vw,56px)] font-bold leading-[1.1] tracking-tight text-accent uppercase"
                        >
                            SOMOS EXPERTOS EN DESARROLLO,{" "}
                            <span className="text-foreground">
                                UTILIZANDO LAS MEJORES TECNOLOGÍAS PARA CREAR SOLUCIONES ESCALABLES Y ROBUSTAS.
                            </span>
                        </h2>
                        
                        <a href="#contacto" className="mt-12 group flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-foreground hover:text-accent transition-colors duration-300">
                            Contáctanos 
                            <span className="inline-block transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                                ↗
                            </span>
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
