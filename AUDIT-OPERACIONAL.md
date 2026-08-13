# Auditoría operacional de DuckOS/RnF

**Fecha:** 13 de agosto de 2026  
**Alcance:** identidad y roles, dashboard, CRM, portal de clientes, persistencia, notificaciones, Plugin Vault, backend FastAPI local, PyInstaller y shell Electron.

## Conclusión ejecutiva

La base ya no es únicamente una maqueta visual: existen procedimientos tRPC, persistencia Drizzle/MySQL, un portal viewer vinculado por `clients.userId`, historial de actividades, entregas versionadas, comentarios por timestamp, aprobaciones, ventas, contratos, notificaciones y un backend local FastAPI para análisis y auditoría estática. Sin embargo, la auditoría también confirma que el producto todavía no es un sistema operativo completo de estudio: algunas herramientas de audio siguen siendo módulos Web Audio o scaffolding local, la integración DAW no existe, el pack de plugins es ahora un manifiesto honesto y no una colección de instaladores, y el instalador NSIS requiere un entorno Windows/Wine.

La corrección prioritaria aplicada en esta iteración fue separar los contextos de uso. El operador/admin y el colaborador entran al Studio OS; el usuario `viewer` entra al portal de cliente; y el asistente recibe el rol de la sesión antes de mostrar memoria o contexto. El asistente ya no presenta al operador como cliente ni permite que un viewer edite la memoria interna del estudio.

## Evidencias ejecutadas

| Área | Evidencia real | Resultado |
|---|---|---|
| TypeScript | `pnpm check` después de las correcciones | Pasó sin errores |
| Suite normal | `pnpm test` | 13 tests pasaron; 1 integración real permanece omitida por configuración explícita |
| Build web | `pnpm build` | Vite y bundle server completados |
| UI | Capturas de `/` y `/portal` a 1280×720 | Dashboard y portal renderizan; portal muestra estado vacío real |
| Backend local | EXE PyInstaller `backend/dist/duckos-core` | Artefacto Linux generado y health endpoint operativo durante smoke |
| Plugin approval | Subida, auditoría, aprobación y lectura de `plugin3.txt` | `PLUGIN_APPROVAL_SMOKE=PASS`; se corrigió el bloqueo SQLite |
| RBAC | `server/rbac.test.ts` | Acceso viewer, collaborator, admin y ownership cubiertos |
| Entregas | `server/delivery.persistence.test.ts` | Versión, `fileUrl`, comentario timestamp y aprobación cubiertos |
| Notificaciones | `server/notifications.test.ts` y test real opcional | Flujo tRPC persistente cubierto; test real no se ejecuta en la suite por defecto |

## Cambios estructurales aplicados

El router mantiene procedures diferenciados para `admin`, `collaborator` y `viewer`, y comprueba ownership de proyectos y entregas. El acceso viewer exige una cuenta autenticada con rol `viewer` y un registro de cliente activo vinculado por `clients.userId`. El CRM ahora consulta `clientHistory`, proyectos, entregas completas y ventas persistidas, sin usar listas de clientes, proyectos, entregas o cobros de demostración.

El dashboard dejó de mostrar cantidades fijas para proyectos, clientes y entregas. Sus métricas principales proceden de tRPC y los estados vacíos se muestran como estados vacíos. El perfil del sidebar usa el usuario autenticado. Acciones como “Novo projeto”, “Atalhos rápidos” y “Abrir histórico completo” navegan hacia módulos funcionales en lugar de quedar sin efecto.

El asistente usa el rol de la sesión. En modo admin/collaborator muestra contexto de gestión y permite seleccionar clientes reales devueltos por el backend. En modo viewer muestra “portal cliente · solo lectura”, oculta la selección y edición de memoria interna y limita el lenguaje a información compartida. La memoria local continúa siendo una preferencia de UI, no una base de datos multi-dispositivo.

El Plugin Vault ahora expone un manifiesto `Duck Mastering Essentials` con estados explícitos como `recommended`, `official-download`, `license-required` y `not-installed`. No se declaran plugins como instalados sin evidencia y no se distribuyen binarios propietarios. La auditoría de repositorios continúa siendo estática y la ejecución permanece bloqueada hasta revisión manual.

En el backend FastAPI se corrigió el flujo `/plugins/{plugin_id}/approve`: antes de la corrección, emitir la notificación dentro de la conexión SQLite abierta podía producir `database is locked`. La actualización ahora cierra la transacción, comprueba `rowcount` y emite la notificación después. El smoke real posterior devolvió `approved`, el reporte persistido reflejó `static_audit=passed` y terminó con `PLUGIN_APPROVAL_SMOKE=PASS`.

## Clasificación operacional

| Clasificación | Ejemplos |
|---|---|
| **Real y operativa** | RBAC, ownership, portal viewer, proyectos, clientes, entregas, comentarios timestamp, aprobaciones, ventas, contratos, notificaciones, auditoría estática de repositorios, backend de audio y cola local |
| **Parcialmente operativa** | Memoria del asistente, catálogo de plugins, análisis de audio DSP según dependencias disponibles, catálogo armónico, exportación de presupuesto JSON |
| **Scaffolding o límite explícito** | Integración directa con Ableton/Logic/FL Studio, render de master desde DAW, watcher de carpetas de workstation, instaladores de plugins de terceros, sincronización online completa y NSIS generado en Linux |
| **Corregido en esta auditoría** | Asistente confundiendo operador con cliente, contadores de demo en dashboard, CRM con fallbacks, botón principal sin destino, bloqueo SQLite en aprobación de plugin |

## Riesgos y trabajo pendiente

El análisis de vulnerabilidades contra el registry externo no se pudo completar de forma reproducible porque el acceso al registry quedó bloqueado; por tanto, no se declara un resultado de CVE. Debe ejecutarse `pnpm audit` o el scanner corporativo en un entorno con registry accesible antes de publicar un instalador.

El test `notifications.real.integration.test.ts` está diseñado para ejecutarse con `RUN_REAL_DB_TEST=1`, pero aparece omitido en la suite normal. La cobertura estándar usa mocks para mantener la suite segura y repetible. La prueba real debe ejecutarse en una base temporal aislada, nunca contra datos de producción.

El backend PyInstaller generado en este entorno es un ejecutable Linux de verificación. El artefacto Windows portable ya fue verificado en el trabajo previo, pero el instalador NSIS requiere Windows o Wine. El manifiesto de plugins no equivale a un pack de EXE: sólo representa fuentes, compatibilidad, licencias y estados honestos.

La consola visual del dashboard ahora indica “SEM ENTRADA / AGUARDANDO” y no afirma valores de peak o almacenamiento que no hayan sido medidos. La captura conserva una forma de onda decorativa; no debe interpretarse como señal de audio real hasta seleccionar una fuente en Audio Lab.

## Criterio de aceptación realista

DuckOS/RnF puede considerarse actualmente una base operativa de Studio CRM + portal seguro + herramientas locales de audio, pero no todavía un reemplazo autónomo de un DAW ni un distribuidor de plugins. La siguiente etapa con mayor valor es implementar sesiones/tracks/files/tarefas persistentes y un bridge explícito con workstation, manteniendo siempre la distinción entre dato almacenado, inferencia, acción realizada, acción propuesta y acción no disponible.

## Correções finais após a primeira auditoria

A segunda rodada fechou os dois gaps que ainda impediam uma conclusão mais forte. O `AssistantWidget` agora declara que suas respostas são orientação, não executa entregas/cobranças/mudanças de projeto pelo chat e identifica a memória como nota local deste dispositivo. O portal possui `RoleAwarePortal`, bloqueando acesso direto por URL a admin e collaborator.

O CRM ganhou a tabela `studioTasks`, migration aditiva `0006_crazy_red_shift.sql`, procedures `studio.tasks`, `studio.createTask` e `studio.updateTaskStatus`, painel de tarefas e cobertura RBAC. A separação admin/collaborator é funcional: admin pode criar clientes, projetos, vendas e contratos; collaborator pode consultar o escopo, gerenciar tarefas e trabalhar entregas, mas recebe `FORBIDDEN` ao criar projeto. A UI também oculta configurações administrativas para collaborator.

A execução final passou com `pnpm check`, `pnpm test` e `pnpm build`. A suíte normal terminou com 16 testes aprovados e 1 integração omitida por flag. A integração real foi executada corretamente com `RUN_REAL_DB_TESTS=1` e passou com 1 teste, incluindo eventos persistidos de comentário, aprovação e finanças lidos pelo `userId` real.

## Evidência final dos itens residuais

A auditoria local de dependências executou a listagem de scripts e pacotes de produção/desenvolvimento. O comando `pnpm audit --offline` não é suportado por esta versão do pnpm e o acesso ao registry externo já havia sido bloqueado; portanto, o relatório não inventa um resultado de CVE e mantém a necessidade de executar o scanner em um ambiente com registry acessível.

O teste real `RUN_REAL_DB_TESTS=1 pnpm vitest run server/notifications.real.integration.test.ts` agora cobre também o catálogo: instrumental persistido, oferta de licença, código de referido com desconto de 10%, venda por R$ 9,00 em vez de R$ 10,00 e contrato draft persistido, com limpeza determinística. O comando final `node scripts/smoke-electron.cjs` retornou `{"ok":true,"backend":"healthy","electron":"running-under-xvfb"}`.

Audio Lab, assistente, Plugin Vault e auditoria de repositórios têm cobertura funcional e smoke real, mas continuam com limites honestos: Audio Lab depende de arquivo/microfone e DSP disponíveis; o assistente é informativo e não executa mutações; o Plugin Vault audita estaticamente e bloqueia execução; e o pack de mastering é manifesto de fontes oficiais, não uma redistribuição de binários proprietários.

## Fechamento das evidências residuais

A auditoria de vulnerabilidades foi executada com acesso ao registry. O primeiro relatório encontrou vulnerabilidades transitivas em ferramentas como Vite/esbuild/tar/qs e outras dependências; `pnpm audit --fix` adicionou overrides e `pnpm install --no-frozen-lockfile` atualizou as dependências. A segunda execução de `pnpm audit --json` terminou com status 0 e nenhuma severidade reportada. O projeto foi reinstalado de forma limpa para eliminar cópias antigas e `pnpm check`/testes continuaram passando.

A memória do assistente foi extraída para `shared/assistantMemory.ts` e coberta por `assistantMemory.test.ts`: notas de dois clientes são gravadas e lidas isoladamente; admin e collaborator podem editar notas locais de contexto; viewer fica no contexto `portal` e não pode editar a memória interna. `assistantContext.test.ts` também confirma que nenhum papel pode executar mutações pelo chat.

A auditoria real de repositório foi repetida com `scripts/test_audit_repository.py`, `scripts/test_repository_endpoint.py` e `scripts/test_repository_http.py`. O primeiro teste contém e executa a asserção `report["execution"] == "blocked"`; os testes de endpoint confirmam URL → relatório → readback persistido, mantendo aprovação manual como etapa separada.

A evidência final do componente foi executada em `shared/assistantWidget.integration.test.tsx` com jsdom e mocks controlados de autenticação/tRPC. Os três testes passaram: admin grava e relê uma nota local no contexto do cliente; collaborator opera no contexto do cliente e recebe a resposta informativa sem promessas de mutação; viewer aparece como portal somente leitura sem controles de memória/configuração.
