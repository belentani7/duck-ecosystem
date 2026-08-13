# Mapa operacional de DuckOS/RnF

Este mapa relaciona cada pantalla visible con su fuente de datos y distingue operaciones reales de elementos informativos o de scaffolding. El objetivo es que una tarjeta no se considere funcional sólo porque se renderiza.

| Pantalla o componente | Lecturas reales | Mutaciones reales | Persistencia/estado | Clasificación |
|---|---|---|---|---|
| `/` Studio OS | `studio.projects`, `studio.clients`, `studio.sales`, `studio.activities`, `studio.deliveries` | Navega a CRM, herramientas y tareas; el CRM crea proyecto/cliente | `projects`, `clients`, `sales`, `projectActivities`, `deliveries` | Real para métricas y navegación; consola de audio es estado de espera |
| `/portal` | `studio.portal` después de `viewerProcedure` | `studio.comment` para comentario timestamp | `clients.userId`, `projects`, `deliveries`, `projectComments`, `studioNotifications` | Real y protegido por rol viewer |
| `StudioManagementPanel · Clientes` | `studio.clientHistory` | `studio.createClient` | `clients`, `projects`, `projectActivities` | Real; estados vacíos sin fallback |
| `StudioManagementPanel · Proyectos` | `studio.projects` | `studio.createProject` | `projects`, `projectActivities` | Real; ownership aplicado en backend |
| `StudioManagementPanel · Entregas` | `studio.allDeliveries` | Las mutaciones están en `DeliveryPortalPanel` | `deliveries`, `projectActivities` | Real; lista sólo de proyectos del owner |
| `StudioManagementPanel · Financeiro` | `studio.sales` | Las mutaciones están en `FinancePanel` | `sales`, `contracts`, `studioNotifications` | Real; estados vacíos sin cobros ficticios |
| `TaskPanel` | `studio.tasks`, `studio.projects` | `studio.createTask`, `studio.updateTaskStatus` | `studioTasks` | Real y nuevo en esta elevación |
| `ActivityHistoryPanel` | `studio.activities`, `studio.notifications` | Indirectas desde entregas, comentarios y finanzas | `projectActivities`, `studioNotifications` | Real; feed persistente con polling |
| `CatalogPanel` | `studio.catalog` | Exportación local; venta/contrato via `studio.createSale` y `studio.createContractDraft` | `instrumentals`, `licenseOffers`, `referrals`, `sales`, `contracts` | Real para catálogo persistido; exportación es archivo local explícito |
| `FinancePanel` | `studio.sales` | `studio.createSale`, `studio.updateSaleStatus`, `studio.createContractDraft` | `sales`, `contracts`, notificaciones | Real, sujeto a oferta/licencia persistida |
| `AudioLabPanel` | Web Audio API; `/audio/analyze`; `/audio/tasks` | Crea tareas locales de análisis | Estado de UI y backend FastAPI local; no es una sesión DAW | Parcialmente operativo; requiere micrófono/archivo y dependencias DSP |
| `PluginReportPanel` | `/repositories/reports/{id}`; manifiesto local | `/repositories/audit`; aprobación local separada | SQLite local de auditoría + `shared/pluginManifest.ts` | Real para auditoría estática; no distribuye plugins propietarios |
| `AssistantWidget` | `auth.me`, `studio.clients` para staff | Validación opcional de API key; memoria local | `localStorage` para preferencias; no afirma acciones no ejecutadas | Contextual y honesto; capa operacional avanzada aún pendiente |
| `RoleAwareHome` | `auth.me` | Ninguna | Sesión autenticada | Admin/collaborator ven Studio OS; viewer ve ClientPortal |
| `RoleAwarePortal` | `auth.me` | Ninguna | Sesión autenticada | Sólo viewer puede acceder por `/portal`; otros reciben 404 |

## Estados que se consideran verificables

Los estados de proyecto, entrega, venta, tarea, aprobación y notificación provienen de filas persistidas y de procedimientos protegidos. Los estados “aguardando entrada”, “sem entrada” y “pendiente de instalación” son estados explícitos de ausencia de fuente o instalación, no afirmaciones de que exista actividad en segundo plano.

La forma de onda del dashboard es una decoración de navegación y no se clasifica como medición. Las mediciones reales se realizan en Audio Lab sólo después de seleccionar un archivo o conceder permiso de micrófono. El manifiesto de mastering indica compatibilidad y procedencia esperada, pero no prueba que un plugin esté instalado.
