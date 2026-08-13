import { useState } from "react";
import { Check, ListTodo, Plus } from "lucide-react";
import { trpc } from "@/lib/trpc";

const statusLabels = { pending: "Pendente", in_progress: "Em andamento", completed: "Concluída", canceled: "Cancelada" } as const;

export function TaskPanel() {
  const tasksQuery = trpc.studio.tasks.useQuery(undefined, { retry: false });
  const projectsQuery = trpc.studio.projects.useQuery(undefined, { retry: false });
  const createTask = trpc.studio.createTask.useMutation({ onSuccess: () => { void tasksQuery.refetch(); setTitle(""); setShowForm(false); } });
  const updateStatus = trpc.studio.updateTaskStatus.useMutation({ onSuccess: () => void tasksQuery.refetch() });
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "normal" | "high">("normal");
  const [projectId, setProjectId] = useState<number | undefined>();
  const [showForm, setShowForm] = useState(false);
  const save = () => { if (!title.trim()) return; createTask.mutate({ title: title.trim(), priority, projectId }); };
  const tasks = tasksQuery.data || [];
  return <section className="management-workspace"><div className="workspace-heading"><div><span className="panel-kicker">CRM · TAREFAS</span><h2>Próximas ações do estúdio</h2><p>Tarefas persistidas, vinculadas ao owner e opcionalmente a um projeto.</p></div><button className="primary-button" onClick={() => setShowForm((value) => !value)}><Plus size={16} /> Nova tarefa</button></div>{showForm && <div className="inline-form"><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Ex.: revisar vocal do refrão" autoFocus /><select value={priority} onChange={(event) => setPriority(event.target.value as typeof priority)}><option value="low">Baixa</option><option value="normal">Normal</option><option value="high">Alta</option></select><select value={projectId || ""} onChange={(event) => setProjectId(event.target.value ? Number(event.target.value) : undefined)}><option value="">Sem projeto</option>{(projectsQuery.data || []).map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select><button className="secondary-button" onClick={save} disabled={createTask.isPending}><Check size={14} /> Salvar</button></div>}<div className="entity-list">{tasks.length ? tasks.map((task) => <article className="entity-row" key={task.id}><div className="entity-icon violet"><ListTodo size={17} /></div><div className="entity-main"><b>{task.title}</b><span>{task.projectId ? `Projeto #${task.projectId}` : "Tarefa geral"} · prioridade {task.priority}</span></div><div className="entity-meta"><select value={task.status} onChange={(event) => updateStatus.mutate({ id: task.id, status: event.target.value as keyof typeof statusLabels })} aria-label={`Status de ${task.title}`}><option value="pending">{statusLabels.pending}</option><option value="in_progress">{statusLabels.in_progress}</option><option value="completed">{statusLabels.completed}</option><option value="canceled">{statusLabels.canceled}</option></select><small>{new Date(task.createdAt).toLocaleDateString("pt-BR")}</small></div></article>) : <div className="empty-state">Nenhuma tarefa persistida. Crie a primeira ação operacional do estúdio.</div>}</div></section>;
}
