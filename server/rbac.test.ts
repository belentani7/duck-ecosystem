import { describe, expect, it, vi } from "vitest";

const dbMocks = vi.hoisted(() => ({
  getClientPortalData: vi.fn(async (userId: number) => userId === 22 ? { client: { id: 5, name: "Cliente Viewer", role: "viewer", status: "active" }, projects: [], deliveries: [] } : { client: undefined, projects: [], deliveries: [] }),
  canAccessDelivery: vi.fn(async () => true),
  canAccessProject: vi.fn(async () => true),
  approveDelivery: vi.fn(async () => ({ ok: true })),
  addProjectComment: vi.fn(async () => ({ ok: true })),
  createStudioNotification: vi.fn(async (input) => input),
  listStudioNotifications: vi.fn(async () => []),
  listStudioTasks: vi.fn(async () => [{ id: 1, ownerId: 30, title: "Revisar vocal", status: "pending" }]),
  createStudioTask: vi.fn(async (input) => ({ insertId: 1, ...input })),
  createProject: vi.fn(async (input) => ({ insertId: 2, ...input })),
  updateStudioTask: vi.fn(async (id, ownerId, status) => ({ id, ownerId, status })),
}));

vi.mock("./db", () => ({ ...dbMocks }));
const { appRouter } = await import("./routers");

const context = (id: number, role: "admin" | "collaborator" | "viewer" | "user") => ({ user: { id, role }, req: {}, res: {} } as any);

describe("RBAC do studio", () => {
  it("permite portal somente ao viewer vinculado a um cliente ativo", async () => {
    const portal = await appRouter.createCaller(context(22, "viewer")).studio.portal();
    expect(portal.client?.id).toBe(5);
    await expect(appRouter.createCaller(context(23, "viewer")).studio.portal()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("bloqueia aprovação para viewer mesmo quando a entrega está no escopo", async () => {
    await expect(appRouter.createCaller(context(22, "viewer")).studio.approveDelivery({ deliveryId: 10 })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("permite collaborator aprovar entrega dentro do escopo", async () => {
    await appRouter.createCaller(context(30, "collaborator")).studio.approveDelivery({ deliveryId: 10 });
    expect(dbMocks.approveDelivery).toHaveBeenCalledWith(10, 30);
  });

  it("bloqueia comentário quando a entrega não pertence ao usuário", async () => {
    dbMocks.canAccessDelivery.mockResolvedValueOnce(false);
    await expect(appRouter.createCaller(context(30, "collaborator")).studio.comment({ deliveryId: 10, body: "fora do escopo" })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("permite ao collaborator gerenciar tarefas persistentes do próprio escopo", async () => {
    const caller = appRouter.createCaller(context(30, "collaborator"));
    await expect(caller.studio.tasks()).resolves.toHaveLength(1);
    await caller.studio.createTask({ title: "Revisar vocal", priority: "high" });
    expect(dbMocks.createStudioTask).toHaveBeenCalledWith(expect.objectContaining({ ownerId: 30, title: "Revisar vocal", priority: "high" }));
    await caller.studio.updateTaskStatus({ id: 1, status: "completed" });
    expect(dbMocks.updateStudioTask).toHaveBeenCalledWith(1, 30, "completed");
  });

  it("bloqueia tarefas para viewer", async () => {
    await expect(appRouter.createCaller(context(22, "viewer")).studio.tasks()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("diferencia collaborator de admin en acciones estructurales", async () => {
    const collaborator = appRouter.createCaller(context(30, "collaborator"));
    await expect(collaborator.studio.createProject({ name: "No permitido" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await appRouter.createCaller(context(1, "admin")).studio.createProject({ name: "Proyecto administrado" });
    expect(dbMocks.createProject).toHaveBeenCalledWith(expect.objectContaining({ ownerId: 1, name: "Proyecto administrado" }));
  });
});
