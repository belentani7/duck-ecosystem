# Project TODO

- [x] Inicializar el proyecto full-stack DuckOS/RnF
- [x] Auditar y consolidar los cinco materiales de referencia
- [x] Dashboard principal PT-BR con estética verde neon sobre fondo oscuro
- [x] Sidebar persistente con navegación por teclado y micro-animaciones tipo hardware de áudio
- [x] Tela de carregamento con shaders y frases motivacionais sobre perseverança, sonhos y autoconhecimento
- [x] Gestão de clientes con historial, estados y roles
- [x] Gestão de proyectos con fases, status y percentuais de participação
- [x] Permissões parciais de visualização para clientes
- [x] Histórico de actividades por cliente y proyecto
- [x] Portal de entregas con versiones de archivos y estados
- [x] Comentarios por timestamp y aprobaciones de entregas
- [x] Notificaciones de cambios de status
- [x] Catálogo de instrumentales y tipos de licencia
- [x] Splits de royalties y porcentajes de participación
- [x] Sistema de referidos con descuento automático
- [x] Generación exportable de orçamentos y contratos
- [x] Módulo financeiro con cobranças y estados de pagamento
- [x] Herramientas de áudio: afinador, espectro, LUFS/potencia y BPM/tonalidade
- [x] Catálogo de acordes y patrones harmônicos con reproducción
- [x] Tareas de audio y análisis en segundo plano sin bloquear la UI
- [x] Assistente flutuante Duck con avatar redondo humanoide
- [x] Modo offline por reglas con memoria persistente individual por cliente
- [x] Edición de memoria del asistente por Duck y por cliente
- [x] Adaptadores opcionales de IA externa activados solo por API key
- [x] Vault de plugins VST/CLAP con inventario, metadatos, licencia, hash y dependencias
- [x] Auditoría estática de repositorios GitHub/Hugging Face
- [x] Bloqueo de ejecución e instalación hasta aprobación manual
- [x] RBAC para Duck/admin, colaborador y cliente-visualizador
- [x] Portal online parcial para entregas, comentarios y status
- [x] Pruebas Vitest para procedimientos, permisos, memoria y seguridad de plugins
- [x] Verificación visual desktop y móvil
- [x] Documentación de ejecución local, empaquetado Windows y límites del MVP

## Verification follow-ups

- [x] Implementar loading com shader real em canvas/WebGL ou documentar a animação CSS como fallback acessível
- [x] Criar ferramentas de áudio funcionais com Web Audio: afinador, espectro, LUFS/potência e BPM/tonalidade
- [x] Implementar catálogo real de acordes e padrões harmônicos com reprodução
- [x] Adicionar fila e worker assíncrono para análises de áudio com progresso
- [x] Persistir memória do Duck por cliente em armazenamento local e carregar por contexto
- [x] Criar UI e lógica para editar memórias por cliente
- [x] Implementar adaptadores de IA externa protegidos por API key opcional
- [x] Modelar e implementar o Plugin Vault real com inventário, hashes, licenças e dependências

## Scope extension: identidad y EXE

- [x] Aplicar a identidade visual Duck fornecida como branding principal sin perder la estética RnF funcional
- [x] Incorporar el logo proporcionado como asset webdev persistente y fallback textual local
- [x] Consolidar una shell Electron segura para Windows con preload aislado y sin nodeIntegration
- [x] Crear backend local reproducible y launcher para modo offline
- [x] Crear scripts de build portable y NSIS installer para generar DuckOS.exe
- [x] Documentar firma digital, modelos opcionales, plugins y límites de distribución

## Hardening before EXE checkpoint

- [x] Implementar medição real de potência/RMS e caminho de análise LUFS/BPM/tonalidade no AudioLabPanel
- [x] Expandir catálogo harmônico com categorias, progressões e busca
- [x] Integrar a fila do painel com o backend local e progresso real
- [x] Adicionar configuração segura de API keys e adaptadores server-side opcionais
- [x] Implementar auditoria estática de plugins com extração de licença/dependências e relatório
- [x] Aplicar branding Duck também na shell principal, além do watermark
- [x] Preparar build verificável do backend local para integração com Electron em Windows

## Security integration follow-ups

- [x] Implementar tela/fluxo seguro de configuração de API keys com validação server-side e adaptadores opcionais
- [x] Expandir auditoria para parsear dependências reais de package.json, requirements.txt e pyproject.toml e persistir o relatório no Plugin Vault
- [x] Adicionar testes para adaptadores opcionais e auditoria estática de plugins

## Final integration gaps

- [x] Limitar o ampliar los adaptadores según proveedores realmente implementados y añadir pruebas del flujo de validación
- [x] Persistir el JSON de auditoría en la tabla Plugin Vault y exponerlo al producto
- [x] Añadir tests automatizados para ai_adapters.py y /assistant/config/validate

## Persistência e operação real

- [x] Conectar projetos, clientes, entregas, catálogo, referidos e finanças ao backend via tRPC e substituir dados estáticos onde possível
- [x] Implementar enforcement de RBAC para admin, colaborador e cliente-visualizador
- [x] Criar upload/versionamento real de entregas e fluxo de comentário por timestamp com aprovação
- [x] Ligar catálogo/licenças/splits/referidos ao banco e aplicar desconto automático em propostas/vendas
- [x] Implementar módulo financeiro persistente com criação de cobrança, alteração de status e listagem

## Audio completion pass

- [x] Conectar o AudioLabPanel ao endpoint /audio/analyze com upload e mostrar LUFS, BPM, tonalidade e duração
- [x] Implementar polling real de /tasks até conclusão no AudioLabPanel
- [x] Tornar a tarefa backend específica para análise de áudio e não apenas genérica

## Audio queue robustness

- [x] Implementar polling robusto com cleanup, timeout explícito e estado de erro no AudioLabPanel
- [x] Criar endpoint específico de tarefa/status para análise de áudio em vez de usar fila genérica
- [x] Adicionar testes automatizados para /audio/analyze e para criação/status da fila de análise

## Audio verification corrections

- [x] Mostrar estado explícito de erro/timeout na fila e limpar intervalos pendentes no unmount
- [x] Adicionar teste automatizado do endpoint /audio/analyze para sucesso e dependências DSP indisponíveis
- [x] Cobrir transições queued → processing → completed/error no teste da fila de áudio

## Audio test completeness

- [x] Adicionar fixture WAV válida e validar status ok com lufs, bpm, key e duration quando DSP estiver instalado
- [x] Manter teste separado para status unavailable quando dependências DSP não estiverem instaladas
- [x] Observar de fato processing e cobrir erro/timeout na fila de áudio sem pré-popular estados

## Final timeout coverage

- [x] Adicionar teste automatizado cobrindo explicitamente o timeout do polling/fila de análise de áudio

## Product integrity hardening

- [x] Gravar atividades reais em projetos, entregas, comentários, aprovações e finanças, sem depender de fallback no histórico
- [x] Gerar orçamento/contrato com dados persistidos de instrumentais, licenças, vendas, descontos e contratos
- [x] Criar vínculo real de cliente-visualizador e aplicar RBAC específico ao portal seguro

## Delivery persistence hardening

- [x] Persistir entregas/versiones no banco com arquivo, versão, status e projeto
- [x] Conectar comentários por timestamp do portal a endpoint/tRPC persistente vinculado à versão correta
- [x] Persistir aprovações/status de entrega no backend e refletir no histórico
- [x] Adicionar testes cobrindo upload, versão, comentário por timestamp e aprovação

## Repository audit product integration

- [x] Integrar auditoria estática ao backend/Plugin Vault com endpoint para URL GitHub/Hugging Face e relatório persistido
- [x] Exibir relatório de auditoria de repositório no produto com aprovação manual explícita
- [x] Adicionar testes do fluxo URL → relatório persistido → leitura no produto com execução bloqueada

## Repository report readback

- [x] Armazenar o ID retornado pela auditoria de URL e carregar o relatório persistido correspondente no Plugin Vault
- [x] Adicionar endpoint/listagem determinística de relatórios de repositório
- [x] Testar auditoria → persistência → leitura por ID com aprovação manual bloqueada

## Dedicated repository reports

- [x] Criar endpoint específico /repositories/reports e /repositories/reports/{id} para auditorias persistidas
- [x] Atualizar PluginReportPanel para consumir a API dedicada de relatórios de repositório
- [x] Adicionar cobertura de listagem e leitura do endpoint dedicado

## Dedicated repository endpoint coverage

- [x] Testar /repositories/reports/{id} com leitura do relatório persistido
- [x] Testar /repositories/reports com listagem determinística de auditorias de repositório
- [x] Reexecutar suíte com evidência explícita dos endpoints dedicados

## Repository HTTP integration coverage

- [x] Testar POST /repositories/audit seguido de GET /repositories/reports/{id} com banco temporário real
- [x] Testar GET /repositories/reports com ordenação determinística em dados persistidos
- [x] Reexecutar suíte com saída explícita dos endpoints HTTP dedicados

## Notification completeness

- [x] Emitir notificações persistentes para upload, aprovação, comentário e mudança de status financeiro
- [x] Expor notificações no portal do cliente e atualizar o feed com polling
- [x] Adicionar testes de geração e leitura de notificações nos fluxos principais

## Notification flow corrections

- [x] Emitir notificação persistente na aprovação de entrega, comentário por timestamp e mudança de status financeiro
- [x] Consumir essas notificações a partir dos fluxos tRPC/Drizzle reais
- [x] Testar aprovação, comentário e mudança financeira com leitura de notificações

## tRPC notification test coverage

- [x] Testar studio.approveDelivery, studio.comment e studio.updateSaleStatus com criação de studioNotifications
- [x] Testar studio.notifications após mutações para provar leitura persistente por usuário
- [x] Reexecutar a suíte com evidência explícita dos testes de notificações tRPC

## Notification persistence integration

- [x] Validar mutações de aprovação, comentário e finanças com um banco temporário real e registros em studioNotifications
- [x] Validar leitura real por usuário após as mutações sem mocks de db

## Windows packaging verification

- [x] Gerar artefato Windows portable/NSIS quando o host Windows estiver disponível ou documentar o limite do host Linux
- [x] Empacotar o backend local como executável verificável, não apenas copiar main.py
- [x] Adicionar verificador de artefatos e smoke test do Electron com backend local

## Electron integrated smoke coverage

- [x] Executar smoke test integrado do shell Electron com backend local empacotado
- [x] Validar processo Electron, carregamento da UI e backend acessível durante a sessão
- [x] Adicionar fallback headless/CI e documentar limitação de display do host quando necessário

## RBAC hardening finalizado

- [x] Aplicar migration `0005_loose_blonde_phantom.sql` com `clients.userId`
- [x] Vincular portal seguro por `clients.userId` e exigir cliente viewer ativo
- [x] Aplicar policies admin/collaborator/viewer e ownership em projetos e entregas
- [x] Adicionar testes automatizados de acesso permitido, acesso negado e ownership

## Auditoria integral solicitada

- [x] Auditar EXE portátil, instalador NSIS e artefatos por plataforma
- [x] Auditar segurança Electron: preload, sandbox, isolamento, permissões e IPC
- [x] Auditar backend local FastAPI, loopback, endpoints e empacotamento PyInstaller
- [x] Auditar dependências, scripts de build e vulnerabilidades conhecidas
- [x] Auditar RBAC, ownership, migrations, persistência e notificações
- [x] Auditar Plugin Vault, auditoria de repositórios e bloqueio de execução
- [x] Auditar UX/PT-BR, estados vazios, fluxos reais e consistência visual
- [x] Corrigir riscos críticos encontrados e repetir os testes
- [x] Produzir relatório técnico final da auditoria com evidências e limitações

## Auditoria real com evidências

- [x] Executar auditoria reproduzível com comandos, testes, artefatos e resultados registrados; não tratar intenção como evidência

## Auditoría de realidad operativa

- [x] Mapear cada pantalla visible a una operación backend, tabla, procedimiento y estado verificable
- [x] Probar el flujo productor: cliente → proyecto → entrega → comentario → aprobación → cobro → notificación
- [x] Probar catálogo: instrumental → licencia → referido → venta → contrato
- [x] Probar Audio Lab, asistente, memoria, Plugin Vault y auditoría de repositorios con datos reales
- [x] Eliminar o etiquetar como demo cualquier métrica, contenido o acción que no tenga fuente persistente
- [x] Documentar qué funciona offline, qué requiere servidor y qué todavía es sólo scaffolding
- [x] Corrigir bloqueio SQLite no fluxo real de aprovação de plugin e repetir o teste end-to-end

## Elevación operativa solicitada

- [x] Separar visual y funcionalmente operador Duck/admin, colaborador, cliente portal y asistente contextual
- [x] Evitar que el asistente trate al operador autenticado como cliente y mostrar contexto/rol activo
- [x] Elevar CRM con historial de cliente, pipeline, tareas, entregas, cobros y permisos conectados
- [x] Convertir acciones principales del dashboard en operaciones reales o estados claramente no disponibles
- [x] Auditar pack de plugins: binarios legítimos, licencias, procedencia, compatibilidad, instalación y bloqueo seguro
- [x] Revisar errores reproducibles del sistema y aplicar correcciones verificadas sin eliminar módulos existentes

## Gaps confirmados por auditoría

- [x] Mapear explícitamente cada pantalla visible a procedures, tablas y estados verificables
- [x] Sustituir o etiquetar como demo todas las métricas hardcoded restantes del dashboard y asistente
- [x] Aplicar guard de rol también a `/portal` y diferenciar funcionalmente admin, collaborator y viewer
- [x] Implementar tareas persistentes del CRM con schema, tRPC, UI y permisos

## Gaps finais confirmados

- [x] Inspecionar e rotular respostas, métricas e estados locais do AssistantWidget como informativos, sem prometer ações executadas
- [x] Demonstrar diferenças funcionais concretas entre admin e collaborator na UI, ações permitidas e testes

## Evidências finais solicitadas pela auditoria

- [x] Executar auditoria de vulnerabilidades conhecida em ambiente com registry acessível e registrar resultado real
- [x] Executar teste real do Audio Lab com fixture/endpoint e registrar conclusão ou erro honesto
- [x] Executar fluxo real do assistente e memória por papel/contexto, incluindo limites informativos
- [x] Executar auditoria real de repositório: URL → relatório persistido → leitura/aprovação bloqueada

## Evidência final residual

- [x] Executar teste reproduzível do AssistantWidget por papel cobrindo gravação/leitura local da memória e limites informativos
- [x] Executar teste real de auditoria de repositório que comprove bloqueio antes da aprovação manual

## Evidência de componente final

- [x] Adicionar e executar teste do próprio AssistantWidget cobrindo admin/collaborator/viewer, localStorage e limites informativos

## Discrepância de estado visível

- [x] Investigar por que a interface ainda mostra o projeto como não concluído apesar do checkpoint final e alinhar o indicador com o estado real

## Verificação final do estado visível

- [x] Verificar visualmente qual elemento mostra o projeto como não acabado e registrar evidência
- [x] Testar timeout do useAuthGate e saída do LoadingScreen em modo offline/servidor indisponível
- [x] Ajustar LoadingScreen para estado conclusivo/erro honesto, sem progresso preso em 96%

## Evidência final do estado de autenticação

- [x] Adicionar teste automatizado de useAuthGate/roteamento para loading inicial, timeout de 3s e fallback sem travar
- [x] Mostrar estado visual explícito de indisponibilidade após timeout, em vez de fallback silencioso
- [x] Registrar evidência textual verificável da captura corrigida, incluindo estado do dashboard e áudio sem fonte

## Teste real do App/auth gate

- [x] Adicionar e executar teste DOM real de RoleAwareHome/RoleAwarePortal com loading inicial, timeout de 3s e fallback de modo local
