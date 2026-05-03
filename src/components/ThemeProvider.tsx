"use client";

import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    useCallback,
    type ReactNode,
} from "react";

// ─── Context ──────────────────────────────────────────────────────────────────
interface ThemeContextValue {
    dark: boolean;
    mounted: boolean;          // false durante SSR / antes de hidratación
    toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
    dark: true,
    mounted: false,
    toggle: () => {},
});

export const useTheme = () => useContext(ThemeContext);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ThemeProvider({ children }: { children: ReactNode }) {
    // undefined = "aún no sabemos" → evita hydration mismatch
    const [dark, setDark] = useState<boolean | undefined>(undefined);

    // Guarda para evitar transiciones concurrentes
    const transitioning = useRef(false);

    // Se ejecuta solo en el cliente, tras la hidratación
    useEffect(() => {
        const stored  = localStorage.getItem("theme");
        const mq      = window.matchMedia("(prefers-color-scheme: dark)");
        const isDark  = stored ? stored === "dark" : mq.matches;

        setDark(isDark);
        document.documentElement.classList.toggle("dark", isDark);
    }, []);

    const toggle = useCallback(() => {
        // Bloquea si ya hay una View Transition en progreso
        if (transitioning.current) return;

        setDark((prev) => {
            const next = !prev;

            const apply = () => {
                document.documentElement.classList.toggle("dark", next);
                localStorage.setItem("theme", next ? "dark" : "light");
            };

            if (typeof document !== "undefined" && "startViewTransition" in document) {
                transitioning.current = true;

                const vt = (document as any).startViewTransition(apply);

                // El browser rechaza todas las promesas de View Transition si se aborta
                // Debemos silenciarlas para que Next.js no salte con Unhandled Promise Rejection
                if (vt.ready) vt.ready.catch(() => {});
                if (vt.updateCallbackDone) vt.updateCallbackDone.catch(() => {});
                
                if (vt.finished) {
                    vt.finished.catch(() => {}).finally(() => {
                        transitioning.current = false;
                    });
                } else {
                    transitioning.current = false;
                }
            } else {
                apply();
            }

            return next;
        });
    }, []);

    const resolvedDark = dark ?? true;

    return (
        <ThemeContext.Provider value={{ dark: resolvedDark, mounted: dark !== undefined, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
}

