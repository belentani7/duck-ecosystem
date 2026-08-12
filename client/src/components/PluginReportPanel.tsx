import { useEffect, useState } from "react";
import { FileSearch, LockKeyhole, ShieldCheck } from "lucide-react";

export function PluginReportPanel() {
  const [report, setReport] = useState<{ error?: string; name?: string; sha256?: string; static_audit?: string; manually_approved?: number; audit_report?: string } | null>(null);
  useEffect(() => { fetch("http://127.0.0.1:8765/plugins/1/report").then((response) => response.ok ? response.json() : null).then(setReport).catch(() => setReport(null)); }, []);
  return <section className="plugin-report panel"><div className="panel-heading"><div><span className="panel-kicker">PLUGIN VAULT · AUDIT REPORT</span><h2>Revisão antes de executar</h2></div><LockKeyhole size={18} className="panel-muted" /></div>{report && !report.error ? <div className="plugin-report-grid"><div><FileSearch size={20} /><b>{report.name || "Plugin inventariado"}</b><small>SHA-256: {(report.sha256 || "").slice(0, 22)}…</small></div><div><ShieldCheck size={20} /><b>{report.static_audit || "pending"}</b><small>Execução bloqueada até aprovação manual</small></div></div> : <div className="queue-empty">Nenhum relatório local disponível ainda. Importe um VST/CLAP para gerar hash e auditoria.</div>}</section>;
}
