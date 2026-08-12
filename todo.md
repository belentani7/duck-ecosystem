# Project TODO

- [x] Inicializar el proyecto full-stack DuckOS/RnF
- [x] Auditar y consolidar los cinco materiales de referencia
- [x] Dashboard principal PT-BR con estética verde neon sobre fondo oscuro
- [x] Sidebar persistente con navegación por teclado y micro-animaciones tipo hardware de áudio
- [x] Tela de carregamento con shaders y frases motivacionais sobre perseverança, sonhos y autoconhecimento
- [ ] Gestão de clientes con historial, estados y roles
- [ ] Gestão de proyectos con fases, status y percentuais de participação
- [ ] Permissões parciais de visualização para clientes
- [ ] Histórico de actividades por cliente y proyecto
- [ ] Portal de entregas con versiones de archivos y estados
- [ ] Comentarios por timestamp y aprobaciones de entregas
- [ ] Notificaciones de cambios de status
- [ ] Catálogo de instrumentales y tipos de licencia
- [ ] Splits de royalties y porcentajes de participación
- [ ] Sistema de referidos con descuento automático
- [ ] Generación exportable de orçamentos y contratos
- [ ] Módulo financeiro con cobranças y estados de pagamento
- [x] Herramientas de áudio: afinador, espectro, LUFS/potencia y BPM/tonalidade
- [x] Catálogo de acordes y patrones harmônicos con reproducción
- [x] Tareas de audio y análisis en segundo plano sin bloquear la UI
- [x] Assistente flutuante Duck con avatar redondo humanoide
- [x] Modo offline por reglas con memoria persistente individual por cliente
- [x] Edición de memoria del asistente por Duck y por cliente
- [x] Adaptadores opcionales de IA externa activados solo por API key
- [x] Vault de plugins VST/CLAP con inventario, metadatos, licencia, hash y dependencias
- [ ] Auditoría estática de repositorios GitHub/Hugging Face
- [x] Bloqueo de ejecución e instalación hasta aprobación manual
- [ ] RBAC para Duck/admin, colaborador y cliente-visualizador
- [ ] Portal online parcial para entregas, comentarios y status
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

- [ ] Implementar medição real de potência/RMS e caminho de análise LUFS/BPM/tonalidade no AudioLabPanel
- [ ] Expandir catálogo harmônico com categorias, progressões e busca
- [ ] Integrar a fila do painel com o backend local e progresso real
- [x] Adicionar configuração segura de API keys e adaptadores server-side opcionais
- [x] Implementar auditoria estática de plugins com extração de licença/dependências e relatório
- [x] Aplicar branding Duck também na shell principal, além do watermark
- [ ] Preparar build verificável do backend local para integração com Electron em Windows

## Security integration follow-ups

- [x] Implementar tela/fluxo seguro de configuração de API keys com validação server-side e adaptadores opcionais
- [x] Expandir auditoria para parsear dependências reais de package.json, requirements.txt e pyproject.toml e persistir o relatório no Plugin Vault
- [x] Adicionar testes para adaptadores opcionais e auditoria estática de plugins

## Final integration gaps

- [x] Limitar o ampliar los adaptadores según proveedores realmente implementados y añadir pruebas del flujo de validación
- [x] Persistir el JSON de auditoría en la tabla Plugin Vault y exponerlo al producto
- [x] Añadir tests automatizados para ai_adapters.py y /assistant/config/validate
