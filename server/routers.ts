import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { addProjectComment, createClient, createProject, createContractDraft, createSale, getClientPortalData, listClients, listDeliveries, listInstrumentals, listProjectActivities, listProjects, listSales, updateSaleStatus } from "./db";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => { if (ctx.user.role !== "admin") throw new Error("Acesso restrito ao Duck/admin"); return next(); });

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  studio: router({
    clients: protectedProcedure.query(({ ctx }) => listClients(ctx.user.id)),
    createClient: adminProcedure.input(z.object({ name: z.string().min(1), email: z.string().email().optional(), genre: z.string().optional() })).mutation(({ ctx, input }) => createClient({ ownerId: ctx.user.id, ...input })),
    projects: protectedProcedure.query(({ ctx }) => listProjects(ctx.user.id)),
    createProject: adminProcedure.input(z.object({ name: z.string().min(1), clientId: z.number().optional(), phase: z.string().default("Pré-produção"), participation: z.string().default("Duck 100%") })).mutation(({ ctx, input }) => createProject({ ownerId: ctx.user.id, ...input })),
    deliveries: protectedProcedure.input(z.object({ projectId: z.number() })).query(({ input }) => listDeliveries(input.projectId)),
    comment: protectedProcedure.input(z.object({ deliveryId: z.number(), body: z.string().min(1), timestampMs: z.number().optional() })).mutation(({ ctx, input }) => addProjectComment({ authorId: ctx.user.id, ...input })),
    portal: protectedProcedure.query(({ ctx }) => getClientPortalData(ctx.user.id)),
    activities: protectedProcedure.input(z.object({ projectId: z.number().optional() }).optional()).query(({ input }) => listProjectActivities(input?.projectId)),
    instrumentals: protectedProcedure.query(({ ctx }) => listInstrumentals(ctx.user.id)),
    createSale: adminProcedure.input(z.object({ clientId: z.number(), licenseOfferId: z.number(), referralCode: z.string().optional() })).mutation(({ input }) => createSale(input)),
    createContractDraft: adminProcedure.input(z.object({ saleId: z.number() })).mutation(({ input }) => createContractDraft(input.saleId)),
    sales: protectedProcedure.query(() => listSales()),
    updateSaleStatus: adminProcedure.input(z.object({ id: z.number(), status: z.enum(["pending", "paid", "refunded"]) })).mutation(({ input }) => updateSaleStatus(input.id, input.status)),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
