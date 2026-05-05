import NavBar from "@/components/NavBar";
import { Hero } from "@/components/pages/Home/Hero";
import ValueProposition from "@/components/pages/Home/ValueProposition";
import Projects from "@/components/pages/Home/Projects";
import WorkProcess from "@/components/pages/Home/WorkProcess";

export default function Home() {
  return (
    <div style={{ minHeight: "100svh", background: "var(--background)" }}>
      <NavBar />
      <Hero />
      <ValueProposition />
      <Projects />
      <WorkProcess />
    </div>
  );
}
