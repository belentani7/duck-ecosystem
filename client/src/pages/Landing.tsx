import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Music,
  Globe,
  Wrench,
  Cpu,
  Shield,
  FlaskConical,
  Eye,
  Layers,
  FileText,
  Map,
  BookOpen,
  KeyRound,
  Zap,
  Lock,
  CalendarClock,
} from "lucide-react";
import { Link } from "wouter";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const machineSteps = [
  { label: "INTENT", desc: "O que o usuário quer fazer" },
  { label: "PLAN", desc: "Decomposição em etapas verificáveis" },
  { label: "CAPABILITY", desc: "Descoberta de sistemas elegíveis" },
  { label: "APPROVAL", desc: "Gate de confiança antes de agir" },
  { label: "ACTION", desc: "Execução通过 adapters" },
  { label: "EVENT", desc: "Registro auditável de cada passo" },
  { label: "MEMORY", desc: "Resultado persistido para contexto futuro" },
];

const organs = [
  { name: "DUCK STUDIO", icon: Music, desc: "Projetos, stems, versões, comentários, entrega", domain: "Produção" },
  { name: "ZION", icon: Globe, desc: "Experiência, portal, apresentação, automação", domain: "Experiência" },
  { name: "GEMA", icon: Wrench, desc: "Toolkit criativo e instrumentos", domain: "Identidade" },
  { name: "LOCAL", icon: Cpu, desc: "Workstation, DAW e plugins", domain: "Núcleo local" },
  { name: "OMEGA / AION", icon: Shield, desc: "Inteligência, planejamento e agentes", domain: "Inteligência" },
  { name: "NOIACORE", icon: FlaskConical, desc: "Experimentação e laboratório de IA", domain: "Pesquisa" },
];

const realityStates = [
  { state: "REAL", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", desc: "Conectado e com evidência confirmada" },
  { state: "SIMULATED", color: "bg-amber-500/20 text-amber-400 border-amber-500/30", desc: "Modelo executável sem efeitos colaterais reais" },
  { state: "PLANNED", color: "bg-violet-500/20 text-violet-400 border-violet-500/30", desc: "Capacidade definida para o futuro" },
  { state: "UNKNOWN", color: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30", desc: "Evidência ausente" },
];

const trustChain = ["CLAIM", "SOURCE", "VERSION", "EVIDENCE", "TRACE", "RESULT"];

const devLinks = [
  { label: "Visual DNA", icon: Eye },
  { label: "Architecture", icon: Layers },
  { label: "Contracts", icon: FileText },
  { label: "Registry", icon: BookOpen },
  { label: "Operation Map", icon: Map },
  { label: "Truth Model", icon: Shield },
  { label: "Adapter SDK", icon: KeyRound },
  { label: "Event Model", icon: Zap },
  { label: "Security Model", icon: Lock },
  { label: "Roadmap", icon: CalendarClock },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-950/40 via-black to-black" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 max-w-3xl"
        >
          <motion.p variants={fadeUp} className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            DUCK ECOSYSTEM
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            One creative machine.<br />Many systems. One memory.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            Independent tools become one operating environment without losing their original identity.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild>
              <a href="#the-machine">
                ENTER THE MACHINE <ArrowRight className="ml-1" size={16} />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#architecture">VIEW ARCHITECTURE</a>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/portal">
                PORTAL DE CLIENTES
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 01 — The Problem */}
      <section className="px-6 py-24 max-w-4xl mx-auto text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">01 — THE PROBLEM</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-semibold mb-6">
            Your studio is already built. It is just distributed.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The studio has projects, stems, DAWs, plugins, ideas, AI systems, client portals and experiments.
            The problem is not the lack of tools. The problem is that the tools do not share a common language.
          </motion.p>
        </motion.div>
      </section>

      {/* Section 02 — The Thesis */}
      <section className="px-6 py-24 max-w-4xl mx-auto text-center border-t border-white/5">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">02 — THE THESIS</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-semibold mb-6">
            Duck Ecosystem does not replace the tools.<br />It gives them a nervous system.
          </motion.h2>
        </motion.div>
      </section>

      {/* Section 03 — The Machine */}
      <section id="the-machine" className="px-6 py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">03 — THE MACHINE</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-semibold">
              The pipeline that connects everything
            </motion.h2>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-2 justify-center">
            {machineSteps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex items-center gap-2"
              >
                <div className="flex flex-col items-center gap-1 px-3 py-4 rounded-lg bg-white/5 border border-white/10 min-w-[100px] text-center">
                  <span className="text-xs font-mono font-bold tracking-wider text-violet-400">{step.label}</span>
                  <span className="text-[11px] text-muted-foreground leading-tight hidden lg:block">{step.desc}</span>
                </div>
                {i < machineSteps.length - 1 && (
                  <ArrowRight size={14} className="text-muted-foreground shrink-0 hidden md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 04 — The Organs */}
      <section id="architecture" className="px-6 py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">04 — SYSTEM CONSTELLATION</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-semibold">The organs</motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {organs.map((organ) => (
              <motion.div key={organ.name} variants={fadeUp}>
                <Card className="bg-white/5 border-white/10 hover:border-white/20 transition-colors h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-violet-500/10">
                        <organ.icon size={18} className="text-violet-400" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{organ.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{organ.domain}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{organ.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 05 — Live Truth */}
      <section className="px-6 py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">05 — LIVE TRUTH</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-semibold mb-4">
              Every capability declares its reality
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
              The interface makes uncertainty look intentional, not broken.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {realityStates.map((rs) => (
              <motion.div key={rs.state} variants={fadeUp}>
                <div className={`rounded-lg border px-4 py-5 text-center ${rs.color}`}>
                  <span className="text-lg font-mono font-bold">{rs.state}</span>
                  <p className="text-xs mt-2 opacity-80">{rs.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 06 — Demonstration */}
      <section className="px-6 py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="text-center mb-12">
            <motion.p variants={fadeUp} className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">06 — DEMONSTRATION</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-semibold">
              One intent, many systems
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Input: Prepare Therapist for Duck</span>
            </div>
            <div className="space-y-3 font-mono text-sm">
              {[
                { step: "INTENT", text: "Request received — decomposing into executable plan", badge: "REAL" },
                { step: "PLAN", text: "3 actions: create project, assign stems, schedule review", badge: "REAL" },
                { step: "CAPABILITY", text: "DUCK STUDIO: project.create — READY", badge: "REAL" },
                { step: "APPROVAL", text: "Automated — low-risk operation", badge: "SIMULATED" },
                { step: "ACTION", text: "Adapter called — DUCK STUDIO project.create", badge: "SIMULATED" },
                { step: "EVENT", text: "project.created — audit log emitted", badge: "SIMULATED" },
                { step: "RESULT", text: "Project 'Therapist' created — 1 stem assigned, review scheduled", badge: "SIMULATED" },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-md bg-white/5"
                >
                  <span className="text-violet-400 font-bold shrink-0 w-20">{item.step}</span>
                  <span className="text-muted-foreground flex-1">{item.text}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 shrink-0">{item.badge}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-4 text-center uppercase tracking-wider">
              Simulated execution — no external side effects
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 07 — Originality Preserved */}
      <section className="px-6 py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">07 — ORIGINALITY PRESERVED</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-semibold mb-6">
              Reference. Don't replace.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Original repositories remain authoritative. Duck Ecosystem stores identity, contracts, relationships, provenance and orchestration — it does not silently fork or absorb source systems.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Section 08 — Trust Layer */}
      <section className="px-6 py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="text-center mb-12">
            <motion.p variants={fadeUp} className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">08 — TRUST LAYER</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-semibold">
              Provenance chain
            </motion.h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2">
            {trustChain.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-2"
              >
                <span className="px-4 py-2 rounded-md bg-white/5 border border-white/10 text-xs font-mono font-bold tracking-wider text-emerald-400">
                  {step}
                </span>
                {i < trustChain.length - 1 && (
                  <ArrowRight size={12} className="text-muted-foreground" />
                )}
              </motion.div>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground text-sm mt-6 max-w-lg mx-auto"
          >
            The ecosystem refuses to convert UI into evidence. A rendered card is not proof of execution.
          </motion.p>
        </div>
      </section>

      {/* Section 09 — Developer Surface */}
      <section className="px-6 py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="text-center mb-12">
            <motion.p variants={fadeUp} className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">09 — DEVELOPER SURFACE</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-semibold">
              Built for other tools
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Claude. Codex. OpenHands. Local agents. Future tools. All enter through the same contracts.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
          >
            {devLinks.map((link) => (
              <motion.div key={link.label} variants={fadeUp}>
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 border border-white/10 text-center hover:border-white/20 transition-colors">
                  <link.icon size={20} className="text-muted-foreground" />
                  <span className="text-xs font-medium">{link.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Closing */}
      <section className="px-6 py-32 text-center border-t border-white/5">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-4">
            One creative system.<br />Many instruments.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
            Keep the originals. Connect the capabilities. Make the machine useful.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild>
              <Link href="/portal">
                OPEN DUCK ECOSYSTEM <ArrowRight className="ml-1" size={16} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/portal">PORTAL DE CLIENTES</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/5 text-center text-xs text-muted-foreground">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <span>DUCK ECOSYSTEM v0.1.0</span>
          <span className="hidden sm:inline">·</span>
          <span>Seus dados permanecem sob seu controle</span>
          <span className="hidden sm:inline">·</span>
          <a href="https://github.com/belentani7/duck-ecosystem" className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
