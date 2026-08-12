import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  AudioLines,
  BarChart3,
  Bell,
  Bolt,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Code2,
  Command,
  FileAudio,
  FolderKanban,
  Gauge,
  Headphones,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Music2,
  PackageCheck,
  PanelLeftClose,
  Play,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
  WandSparkles,
  X,
} from "lucide-react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { AssistantWidget } from "@/components/AssistantWidget";
import { AudioLabPanel } from "@/components/AudioLabPanel";
import { PluginReportPanel } from "@/components/PluginReportPanel";

const phrases = [
  "Acredite no seu som.",
  "Persistência transforma talento em resultado.",
  "Conhecer seu processo é ampliar sua liberdade.",
  "Sonhe grande. Produza maior ainda.",
  "Cada acorde é um passo em direção à sua assinatura.",
];

const projects = [
  { name: "NOVA ERA — EP", client: "Luna Reis", phase: "Mixagem", progress: 78, color: "lime", due: "Hoje, 18:00" },
  { name: "VIBRAÇÃO 04", client: "Caio Sol", phase: "Produção", progress: 46, color: "amber", due: "Amanhã" },
  { name: "DUCK SESSIONS", client: "Projeto interno", phase: "Master", progress: 91, color: "violet", due: "12 ago" },
];

const audioTools = [
  { icon: Activity, label: "Espectro", value: "48 kHz", hint: "Analisador em tempo real" },
  { icon: Gauge, label: "Loudness", value: "−14 LUFS", hint: "Alvo streaming" },
  { icon: AudioLines, label: "Afinador", value: "A4 · 440 Hz", hint: "Pronto para ouvir" },
  { icon: Music2, label: "Harmonia", value: "12 padrões", hint: "Catálogo de ideias" },
];

const navItems = [
  { label: "Visão geral", icon: LayoutDashboard },
  { label: "Projetos", icon: FolderKanban, count: "04" },
  { label: "Clientes", icon: Users, count: "18" },
  { label: "Entregas", icon: PackageCheck, count: "03" },
  { label: "Financeiro", icon: CircleDollarSign },
  { label: "Ferramentas", icon: Headphones },
  { label: "Vault de plugins", icon: ShieldCheck },
];

function Waveform({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`waveform ${compact ? "waveform-compact" : ""}`} aria-hidden="true">
      {Array.from({ length: compact ? 30 : 54 }).map((_, index) => (
        <i key={index} style={{ height: `${18 + ((index * 29) % 72)}%`, animationDelay: `${index * 22}ms` }} />
      ))}
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, delta, accent }: { icon: typeof Activity; label: string; value: string; delta: string; accent: string }) {
  return (
    <article className="metric-card">
      <div className="metric-top"><span className={`metric-icon ${accent}`}><Icon size={17} /></span><span className="metric-delta">{delta}</span></div>
      <p>{label}</p>
      <strong>{value}</strong>
      <div className="metric-line"><span style={{ width: accent === "amber" ? "64%" : accent === "violet" ? "82%" : "72%" }} /></div>
    </article>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("Visão geral");
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window === "undefined" || window.innerWidth > 820);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1450);
    const phraseTimer = window.setInterval(() => setPhraseIndex((current) => (current + 1) % phrases.length), 3200);
    return () => { window.clearTimeout(timer); window.clearInterval(phraseTimer); };
  }, []);

  const visibleProjects = useMemo(() => projects.filter((project) => `${project.name} ${project.client} ${project.phase}`.toLowerCase().includes(query.toLowerCase())), [query]);

  if (loading) return <LoadingScreen phrase={phrases[phraseIndex]} />;

  return (
    <div className="duck-app">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="grid-noise" />
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="brand-lockup"><img className="brand-logo-image" src="/manus-storage/Untitled2_3621346a.png" alt="Duck" /><div className="duck-mark">D</div><div className="brand-copy"><b>DUCK</b><span>RITMO & FREQUÊNCIA</span></div><button className="icon-button mobile-only" onClick={() => setSidebarOpen(false)} aria-label="Fechar menu"><X size={18} /></button></div>
        <div className="on-air"><span className="on-air-dot" /> SESSÃO ATIVA <small>02:41:18</small></div>
        <nav className="main-nav" aria-label="Navegação principal">
          <p className="nav-kicker">MISSION CONTROL</p>
          {navItems.map(({ label, icon: Icon, count }) => <button key={label} className={`nav-item ${active === label ? "active" : ""}`} onClick={() => setActive(label)}><Icon size={18} strokeWidth={1.8} /><span>{label}</span>{count && <em>{count}</em>} {active === label && <i className="nav-signal" />}</button>)}
        </nav>
        <div className="sidebar-bottom"><div className="storage-meter"><div><span>VAULT LOCAL</span><strong>68%</strong></div><div className="storage-track"><i /></div><small>12,4 GB disponíveis</small></div><button className="nav-item"><Settings2 size={18} /><span>Configurações</span></button><div className="profile-row"><div className="avatar-duck">D</div><div><b>Duck</b><small>Admin · offline-first</small></div><MoreHorizontal size={18} /></div></div>
      </aside>

      <main className={`main-content ${sidebarOpen ? "" : "wide"}`}>
        <header className="topbar"><div className="topbar-left"><button className="icon-button" onClick={() => setSidebarOpen((open) => !open)} aria-label="Alternar menu">{sidebarOpen ? <PanelLeftClose size={19} /> : <Menu size={19} />}</button><div className="breadcrumb"><span>DUCK.OS</span><ChevronRight size={14} /><b>{active.toUpperCase()}</b></div></div><div className="topbar-actions"><label className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar no estúdio" /><kbd>⌘ K</kbd></label><button className="icon-button notification" aria-label="Notificações"><Bell size={18} /><i /></button><button className="duck-mini" onClick={() => setAssistantOpen((open) => !open)}><Sparkles size={16} /> Falar com Duck</button></div></header>

        <section className="hero-section"><div><span className="eyebrow"><span className="pulse-dot" /> TERÇA-FEIRA · 12 AGO 2026</span><h1>Bom trabalho,<br /><span>Duck.</span></h1><p className="hero-subtitle">Seu estúdio está em movimento. <strong>3 entregas</strong> aguardam seu toque.</p><div className="hero-actions"><button className="primary-button"><Plus size={17} /> Novo projeto</button><button className="secondary-button"><Command size={16} /> Atalhos rápidos</button></div></div><div className="hero-console"><div className="console-heading"><span><span className="signal-bars">▂▅▇</span> MASTER BUS</span><small>−6.2 dB <i>PEAK</i></small></div><Waveform /><div className="console-footer"><span>48kHz / 24bit</span><span className="console-status"><i /> SISTEMA ESTÁVEL</span><span>02:41:18</span></div></div></section>

        <section className="metrics-grid"><MetricCard icon={CircleDollarSign} label="Receita no mês" value="R$ 18.420" delta="+18,4%" accent="lime" /><MetricCard icon={FolderKanban} label="Projetos ativos" value="08 projetos" delta="+02 novos" accent="violet" /><MetricCard icon={PackageCheck} label="Entregas pendentes" value="03 revisões" delta="−01 hoje" accent="amber" /><MetricCard icon={Activity} label="Horas em sessão" value="42h 18m" delta="+6,2h" accent="cyan" /></section>

        <section className="dashboard-grid"><div className="panel projects-panel"><div className="panel-heading"><div><span className="panel-kicker">WORKSPACE</span><h2>Projetos em andamento</h2></div><button className="text-button" onClick={() => setActive("Projetos")}>Ver todos <ArrowUpRight size={15} /></button></div><div className="project-list">{visibleProjects.map((project) => <button className="project-row" key={project.name} onClick={() => setActive("Projetos")}><div className={`project-cover ${project.color}`}><Waveform compact /></div><div className="project-info"><div><b>{project.name}</b><span>{project.client}</span></div><small>{project.phase} · {project.due}</small><div className="project-progress"><span style={{ width: `${project.progress}%` }} /><em>{project.progress}%</em></div></div><ChevronRight size={18} className="row-arrow" /></button>)}{visibleProjects.length === 0 && <div className="empty-state">Nenhum projeto encontrado para “{query}”.</div>}</div></div><div className="panel activity-panel"><div className="panel-heading"><div><span className="panel-kicker">LIVE FEED</span><h2>Atividade recente</h2></div><button className="icon-button"><MoreHorizontal size={18} /></button></div><div className="activity-list"><div className="activity-item"><div className="activity-icon lime"><Check size={15} /></div><div><b>Entrega aprovada</b><span>Luna Reis aprovou “NOVA ERA V02”</span></div><time>há 12 min</time></div><div className="activity-item"><div className="activity-icon violet"><MessageCircle size={15} /></div><div><b>Novo comentário</b><span>“A voz pode respirar mais no refrão?”</span></div><time>há 38 min</time></div><div className="activity-item"><div className="activity-icon amber"><CircleDollarSign size={15} /></div><div><b>Pagamento recebido</b><span>Licença exclusiva · R$ 2.400</span></div><time>há 1 h</time></div><div className="activity-item"><div className="activity-icon cyan"><Bolt size={15} /></div><div><b>Plugin auditado</b><span>VocalAir · hash verificado</span></div><time>há 2 h</time></div></div><button className="full-link">Abrir histórico completo <ArrowUpRight size={15} /></button></div></section>

        <section className="bottom-grid"><div className="panel audio-panel"><div className="panel-heading"><div><span className="panel-kicker">STUDIO RACK</span><h2>Ferramentas de áudio</h2></div><button className="text-button" onClick={() => setActive("Ferramentas")}>Abrir rack <ArrowUpRight size={15} /></button></div><div className="audio-tools">{audioTools.map(({ icon: Icon, label, value, hint }) => <button key={label} className="audio-tool" onClick={() => setActive("Ferramentas")}><span className="tool-icon"><Icon size={19} /></span><b>{label}</b><strong>{value}</strong><small>{hint}</small><span className="tool-led" /></button>)}</div></div><div className="panel security-panel"><div className="panel-heading"><div><span className="panel-kicker">SECURITY</span><h2>Plugin Vault</h2></div><LockKeyhole size={18} className="panel-muted" /></div><div className="security-score"><div className="score-ring"><strong>94</strong><span>/100</span></div><div><b>Ambiente protegido</b><span>25 plugins inventariados</span><small><ShieldCheck size={13} /> Nenhuma ameaça detectada</small></div></div><div className="vault-row"><Code2 size={16} /><span>VST/CLAP aguardando aprovação</span><b>02</b></div><button className="full-link" onClick={() => setActive("Vault de plugins")}>Revisar fila segura <ArrowUpRight size={15} /></button></div></section>

        {active === "Ferramentas" && <AudioLabPanel />}
        {active === "Vault de plugins" && <PluginReportPanel />}
        <footer className="app-footer"><span><span className="footer-led" /> DUCK.OS LOCAL CORE v0.1.0</span><span>Seus dados permanecem sob seu controle</span><span>Ajuda <span className="footer-separator">·</span> Privacidade</span></footer>
      </main>
      {assistantOpen && <AssistantWidget onClose={() => setAssistantOpen(false)} />}
    </div>
  );
}
