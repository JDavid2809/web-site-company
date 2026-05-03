"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import gsap from "gsap"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface SlideData {
    title: string
    description: string
    image: string
    topRightText: string
}

const slides: SlideData[] = [
    {
        title: 'Innovación <span class="text-accent">Digital</span>',
        description:
            "Transformamos ideas en soluciones tecnológicas de vanguardia. Nuestro equipo de expertos crea software que impulsa el futuro de tu negocio.",
        image: "/hero/Hero1.png",
        topRightText: "Creamos el futuro",
    },
    {
        title: 'Desarrollo <span class="text-accent">a Medida</span>',
        description:
            "Cada línea de código está diseñada para tus necesidades específicas. Construimos aplicaciones robustas, escalables y seguras.",
        image: "/hero/Hero2.png",
        topRightText: "Código que importa",
    },
    {
        title: '<span class="text-accent">Escalabilidad</span> Sin Límites',
        description:
            "Tu software crece contigo. Arquitecturas modernas preparadas para el éxito, desde startups hasta empresas globales.",
        image: "/hero/Hero3.png",
        topRightText: "Sin fronteras",
    },
]

export function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const containerRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const descriptionRef = useRef<HTMLParagraphElement>(null)
    const topRightRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)
    const auraRef = useRef<HTMLDivElement>(null)
    const leftArrowRef = useRef<HTMLButtonElement>(null)
    const rightArrowRef = useRef<HTMLButtonElement>(null)

    // Initial animation on mount
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

            // Set initial states
            gsap.set(titleRef.current, {
                opacity: 0,
                y: -80,
                rotateX: 45,
            })
            gsap.set(descriptionRef.current, {
                opacity: 0,
                y: 80,
                rotateX: -45,
            })
            gsap.set(topRightRef.current, {
                opacity: 0,
                x: 100,
                rotateY: -30,
            })
            gsap.set(imageRef.current, {
                opacity: 0,
                scale: 0.3,
                rotateZ: -20,
            })
            gsap.set(auraRef.current, {
                opacity: 0,
                scale: 0.2,
            })
            gsap.set([leftArrowRef.current, rightArrowRef.current], {
                opacity: 0,
                y: 60,
                scale: 0.5,
            })

            // Animate in sequence
            tl.to(titleRef.current, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 1.2,
                ease: "elastic.out(1, 0.5)",
            })
                .to(
                    topRightRef.current,
                    {
                        opacity: 1,
                        x: 0,
                        rotateY: 0,
                        duration: 1,
                        ease: "back.out(1.7)",
                    },
                    "-=0.8"
                )
                .to(
                    descriptionRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        duration: 1.2,
                        ease: "elastic.out(1, 0.5)",
                    },
                    "-=0.8"
                )
                .to(
                    auraRef.current,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 1.4,
                        ease: "elastic.out(1, 0.4)",
                    },
                    "-=1"
                )
                .to(
                    imageRef.current,
                    {
                        opacity: 1,
                        scale: 1,
                        rotateZ: 0,
                        duration: 1.4,
                        ease: "elastic.out(1, 0.4)",
                    },
                    "-=1.2"
                )
                .to(
                    [leftArrowRef.current, rightArrowRef.current],
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "back.out(2)",
                    },
                    "-=0.6"
                )

            // Continuous aura pulse animation (Softly pulsating)
            gsap.to(auraRef.current, {
                scale: 1.15,
                opacity: 0.35,
                duration: 3.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
            })

            // Floating image animation
            gsap.to(imageRef.current, {
                y: -20,
                duration: 3.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    const animateToSlide = useCallback(
        (direction: "left" | "right", nextIndex: number) => {
            if (isAnimating) return
            setIsAnimating(true)

            const ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    defaults: { ease: "power3.inOut" },
                    onComplete: () => {
                        setCurrentSlide(nextIndex)
                        setIsAnimating(false)
                    },
                })

                const xDirection = direction === "left" ? 200 : -200
                const xDirectionOpposite = direction === "left" ? -200 : 200
                const rotateDirection = direction === "left" ? 1 : -1

                // Phase 1: Exit animations
                tl.to(titleRef.current, {
                    opacity: 0,
                    x: xDirection,
                    rotateY: 30 * rotateDirection,
                    skewX: 10 * rotateDirection,
                    duration: 0.5,
                })
                    .to(
                        topRightRef.current,
                        {
                            opacity: 0,
                            x: xDirection * 0.8,
                            rotateY: 25 * rotateDirection,
                            duration: 0.5,
                        },
                        "-=0.4"
                    )
                    .to(
                        descriptionRef.current,
                        {
                            opacity: 0,
                            x: xDirection,
                            rotateY: 25 * rotateDirection,
                            skewX: 8 * rotateDirection,
                            duration: 0.5,
                        },
                        "-=0.4"
                    )
                    .to(
                        imageRef.current,
                        {
                            opacity: 0,
                            scale: 0.5,
                            rotateZ: 25 * rotateDirection,
                            rotateY: 40 * rotateDirection,
                            duration: 0.6,
                        },
                        "-=0.5"
                    )

                // Phase 2: Update content
                tl.call(() => {
                    if (titleRef.current)
                        titleRef.current.innerHTML = slides[nextIndex].title
                    if (descriptionRef.current)
                        descriptionRef.current.textContent = slides[nextIndex].description
                    if (topRightRef.current) {
                        const spanNode = topRightRef.current.querySelector('.dynamic-text')
                        if (spanNode) {
                            spanNode.textContent = slides[nextIndex].topRightText
                        } else {
                            topRightRef.current.textContent = slides[nextIndex].topRightText
                        }
                    }
                    if (imageRef.current) imageRef.current.src = slides[nextIndex].image
                })

                // Set starting positions for entry
                tl.set(titleRef.current, {
                    x: xDirectionOpposite,
                    rotateY: -30 * rotateDirection,
                    skewX: -10 * rotateDirection,
                })
                    .set(topRightRef.current, {
                        x: xDirectionOpposite * 0.8,
                        rotateY: -25 * rotateDirection,
                    })
                    .set(descriptionRef.current, {
                        x: xDirectionOpposite,
                        rotateY: -25 * rotateDirection,
                        skewX: -8 * rotateDirection,
                    })
                    .set(imageRef.current, {
                        scale: 0.5,
                        rotateZ: -25 * rotateDirection,
                        rotateY: -40 * rotateDirection,
                    })

                // Phase 3: Enter animations with stagger
                tl.to(
                        imageRef.current,
                        {
                            opacity: 1,
                            scale: 1,
                            rotateZ: 0,
                            rotateY: 0,
                            duration: 1,
                            ease: "elastic.out(1, 0.5)",
                        }
                    )
                    .to(
                        titleRef.current,
                        {
                            opacity: 1,
                            x: 0,
                            rotateY: 0,
                            skewX: 0,
                            duration: 0.9,
                            ease: "back.out(1.7)",
                        },
                        "-=0.8"
                    )
                    .to(
                        topRightRef.current,
                        {
                            opacity: 1,
                            x: 0,
                            rotateY: 0,
                            duration: 0.8,
                            ease: "back.out(1.5)",
                        },
                        "-=0.7"
                    )
                    .to(
                        descriptionRef.current,
                        {
                            opacity: 1,
                            x: 0,
                            rotateY: 0,
                            skewX: 0,
                            duration: 0.9,
                            ease: "back.out(1.7)",
                        },
                        "-=0.7"
                    )

                // Arrow magnetic effect
                const arrowRef = direction === "left" ? leftArrowRef : rightArrowRef
                gsap.to(arrowRef.current, {
                    scale: 0.8,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut",
                })
            }, containerRef)

            return () => ctx.revert()
        },
        [isAnimating]
    )

    const handlePrev = () => {
        const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1
        animateToSlide("left", prevIndex)
    }

    const handleNext = () => {
        const nextIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1
        animateToSlide("right", nextIndex)
    }

    // Arrow hover animations
    const handleArrowHover = (
        ref: React.RefObject<HTMLButtonElement | null>,
        enter: boolean,
        isLeft: boolean
    ) => {
        if (!ref.current) return

        const arrow = ref.current.querySelector(".arrow-line")
        const arrowHead = ref.current.querySelector(".arrow-head")

        gsap.to(ref.current, {
            scale: enter ? 1.1 : 1,
            duration: 0.4,
            ease: "elastic.out(1, 0.5)",
        })

        gsap.to(arrow, {
            width: enter ? "48px" : "32px",
            duration: 0.3,
            ease: "power2.out",
        })

        gsap.to(arrowHead, {
            x: enter ? (isLeft ? -6 : 6) : 0,
            duration: 0.3,
            ease: "power2.out",
        })
    }

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full overflow-hidden bg-background pt-[75px] transition-colors duration-400"
            style={{ perspective: "1500px" }}
        >
            {/* Fondo completamente limpio */}

            <div className="relative z-10 mx-auto flex min-h-screen w-full px-8 py-12 lg:px-16 xl:px-[8%]">
                <div className="flex w-full flex-col items-center lg:flex-row lg:items-stretch lg:justify-between">
                    {/* Left Section - 35% */}
                    <div className="flex w-full flex-col items-center justify-between gap-6 py-8 text-center lg:w-[35%] lg:items-start lg:gap-0 lg:py-16 lg:text-left">
                        {/* Top Left - Title */}
                        <div className="px-4 lg:px-0 lg:pr-4">
                            <h1
                                ref={titleRef}
                                className="text-[32px] font-bold leading-tight tracking-tight text-foreground lg:text-[44px] xl:text-[54px]"
                                dangerouslySetInnerHTML={{ __html: slides[currentSlide].title }}
                            />
                        </div>

                        {/* Bottom Left - Description */}
                        <div className="px-4 lg:px-0 lg:pr-4">
                            <p
                                ref={descriptionRef}
                                className="max-w-md text-pretty text-[15px] leading-relaxed text-text-muted lg:max-w-xs lg:text-[17px]"
                            >
                                {slides[currentSlide].description}
                            </p>
                        </div>
                    </div>

                    {/* Center Section - 40% */}
                    <div className="relative flex w-full flex-col items-center justify-center py-12 lg:w-[40%] lg:py-0">
                        {/* Aura effect (fija, menos intensa) */}
                        <div
                            ref={auraRef}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            <div className="h-[250px] w-[250px] rounded-full bg-accent opacity-[0.35] blur-[100px] lg:h-[500px] lg:w-[500px] transition-colors duration-400" />
                        </div>

                        {/* Atomic Background / Rings */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {/* Inner dashed spinning ring */}
                            <div className="absolute h-[220px] w-[220px] rounded-full border border-dashed border-accent/30 animate-[spin_40s_linear_infinite] lg:h-[380px] lg:w-[380px] xl:h-[420px] xl:w-[420px]" />
                            {/* Outer dashed ring with a glowing electron dot */}
                            <div className="absolute h-[260px] w-[260px] rounded-full border border-dashed border-accent/20 animate-[spin_60s_linear_infinite_reverse] lg:h-[460px] lg:w-[460px] xl:h-[520px] xl:w-[520px]">
                                <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_var(--color-accent)]" />
                            </div>
                        </div>

                        {/* Main image (más grande, flotando limpia) */}
                        <img
                            ref={imageRef}
                            src={slides[currentSlide].image}
                            alt="Hero illustration"
                            className="relative z-10 h-[300px] w-[300px] object-contain lg:h-[480px] lg:w-[480px] xl:h-[600px] xl:w-[600px]"
                        />
                    </div>

                    {/* Right Section - 25% */}
                    <div className="flex w-full flex-col items-center justify-between gap-12 py-8 lg:w-[25%] lg:items-end lg:gap-0 lg:py-16">
                        {/* Top Right - Dynamic text */}
                        <div className="flex justify-center px-4 lg:justify-end lg:px-0 lg:pl-4">
                            <div
                                ref={topRightRef}
                                className="flex items-center gap-3"
                            >
                                <svg className="h-4 w-4 text-accent animate-[spin_6s_linear_infinite]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                                </svg>
                                <span className="dynamic-text text-[11px] font-bold uppercase tracking-[0.4em] text-text-muted transition-colors duration-400">
                                    {slides[currentSlide].topRightText}
                                </span>
                            </div>
                        </div>

                        {/* Bottom Right - Navigation arrows & Indicator */}
                        <div className="flex items-center justify-center gap-4 px-4 lg:justify-end lg:px-0 lg:pl-4">
                            <button
                                ref={leftArrowRef}
                                onClick={handlePrev}
                                onMouseEnter={() => handleArrowHover(leftArrowRef, true, true)}
                                onMouseLeave={() => handleArrowHover(leftArrowRef, false, true)}
                                disabled={isAnimating}
                                className="group flex h-10 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Anterior"
                            >
                                <div className="relative flex items-center">
                                    <ArrowLeft className="arrow-head h-5 w-5 text-foreground transition-colors group-hover:text-accent" />
                                    <div className="arrow-line ml-1 h-[1px] w-8 bg-foreground transition-colors group-hover:bg-accent" />
                                </div>
                            </button>

                            {/* Marker / Indicator Centered */}
                            <div className="flex items-center gap-2 mx-4">
                                {slides.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-[1.5px] transition-all duration-500 ${i === currentSlide ? "w-6 bg-accent" : "w-2 bg-text-muted/30"}`}
                                    />
                                ))}
                            </div>

                            <button
                                ref={rightArrowRef}
                                onClick={handleNext}
                                onMouseEnter={() => handleArrowHover(rightArrowRef, true, false)}
                                onMouseLeave={() => handleArrowHover(rightArrowRef, false, false)}
                                disabled={isAnimating}
                                className="group flex h-10 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Siguiente"
                            >
                                <div className="relative flex items-center">
                                    <div className="arrow-line mr-1 h-[1px] w-8 bg-foreground transition-colors group-hover:bg-accent" />
                                    <ArrowRight className="arrow-head h-5 w-5 text-foreground transition-colors group-hover:text-accent" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
