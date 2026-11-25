# AXYRON Dental Ultra Premium Master

Modelo estático de website odontológico com interface em português, formulário de contato via WhatsApp e editor interno AXYRON Studio. O conteúdo inicial apresenta a marca demonstrativa AXYRON ODONTOLOGIA com o preset Blue Medical Ultra Premium.

## Requisitos e comandos

Use Node.js 22.16 ou superior e npm. O lockfile acompanha o projeto.

| Comando | Resultado |
| --- | --- |
| `npm ci` | Instala as versões registradas no lockfile |
| `npm run dev` | Inicia o site para desenvolvimento |
| `npm run studio` | Inicia o editor local em `http://127.0.0.1:5174/studio.html` |
| `npm run typecheck` | Executa a verificação TypeScript |
| `npm run lint` | Executa ESLint |
| `npm test` | Executa os testes de configuração, SEO, temas e WhatsApp |
| `npm run build` | Gera `dist/` com HTML pré-renderizado, assets, robots e sitemap |
| `npm run preview` | Serve o resultado de produção localmente |
| `npm run build:studio` | Gera a build interna em `dist-studio/` |
| `npm run preview:studio` | Serve a build interna. Abra `/studio.html` |
| `npx playwright install chromium` | Instala Chromium para os testes de interface |
| `npm run test:e2e` | Testa as duas builds. Execute as builds antes deste comando |
| `npm run audit` | Audita a build local com Lighthouse mobile e desktop. Requer Chromium instalado |

Use `AXYRON_CHROMIUM=/caminho/para/chromium` para indicar um navegador já instalado. Playwright e Lighthouse gravam capturas e relatórios em `artifacts/`.

## Personalizar uma clínica

1. Crie um repositório ou branch a partir deste projeto e mantenha uma cópia da configuração master.
2. Rode o AXYRON Studio. Abra Identidade visual, escolha o preset e personalize logotipo, tipografia e cores. Escolha o dispositivo na barra superior para conferir os pontos de quebra.
3. Preencha contato e identificação profissional. Em **Métricas da clínica**, cadastre apenas números confirmados e contextualize o período ou a fonte. Valores em branco ficam ocultos. Ajuste tratamentos, profissionais, fotografias, perguntas, textos e seções. Cadastre avaliações somente com autorização e fonte quando disponível.
4. Exporte o JSON pelo Studio. O formulário do Studio valida formatos e mantém a última prévia válida enquanto um campo estiver incompleto. As alterações ficam em memória até a exportação.
5. Rode `npm run clinic:apply -- /caminho/cliente.json`. O comando valida o JSON e substitui `src/config/clinic.config.ts`. Imagens enviadas no Studio ficam em `public/images/client/`, com nomes derivados do conteúdo, e as referências passam a apontar para caminhos locais. Revise o diff e inclua a configuração e os assets no commit.
6. Para editar manualmente, use `src/config/clinic.config.ts` e mantenha imagens sob `public/images/`. Prefira WebP ou AVIF com texto alternativo e uma versão vertical para o hero no celular. SVGs confiáveis podem entrar via caminhos locais. Use URLs HTTPS quando a hospedagem externa for intencional.
7. Valide o domínio HTTPS, os dados públicos e a finalidade do aviso de privacidade com a clínica. Somente na versão real mude `demo` e `seo.noindex` para `false`. Refaça a build e confira as tags no HTML final.

Os presets ficam em `src/config/presets.ts` e os tipos são inferidos do schema de validação. As fotos do master são imagens conceituais geradas para a demonstração, com identificação na entrada e na galeria. O template usa Newsreader e Manrope, distribuídas pelo Fontsource sob SIL Open Font License. Para trocar a família por outra fonte local, atualize `src/lib/theme.ts`, o schema e os seletores do Studio.

## WhatsApp e privacidade

Use o formato DDI + DDD + número, com somente dígitos, em `contact.whatsapp`. A primeira etapa prepara a mensagem no navegador. O visitante decide se envia a mensagem no WhatsApp e a clínica confirma a disponibilidade em conversa. O formulário solicita nome, período e ciência do aviso. A informação de tratamento é opcional.

O modo demonstrativo, a prévia do Studio e a ausência de número habilitam somente a prévia. O site mantém a informação digitada no estado do formulário enquanto a página está aberta. Não há banco, persistência local, analytics ou logs de preenchimento. O mapa só carrega após ação do visitante e mediante URL de incorporação configurada. Revise o aviso com a clínica para refletir o tratamento real dos dados após o contato.

## Publicar

Na **Vercel**, importe o repositório e escolha Vite como framework. `vercel.json` define o comando e a pasta `dist`. Selecione Node.js 22 ou 24 no projeto e vincule o domínio do cliente.

Na **Netlify**, importe o repositório. `netlify.toml` define Node.js 22, comando e pasta. Para upload manual, gere a build e envie somente a pasta `dist/`.

O Studio usa entrada HTML e configuração de build próprias. Para edição local, rode `npm run studio`. Se a equipe publicar `dist-studio/` em uma infraestrutura interna, restrinja o acesso nessa infraestrutura. O conteúdo gerado pelo Studio deve ser exportado e aplicado antes de publicar `dist/`.

## Checklist comercial

- Validar nome, marca, domínio, cidade, endereço, horário, registro profissional, canais e permissões dos materiais.
- Conferir alternativas de tratamento e textos de orientação com o responsável pela clínica.
- Usar fotos e relatos autorizados. Conferir créditos e a coluna de texto alternativo das imagens.
- Confirmar contatos, mapa e assinatura. Usar o número aprovado e conferir o WhatsApp no celular.
- Revisar privacidade e publicidade odontológica com os responsáveis da clínica.
- Rodar TypeScript, lint, testes, builds, Playwright e Lighthouse. Testar também a página de produção após publicar.
- Publicar somente `dist/`. Revisar HTTPS, canonical, sitemap, robots, Schema.org e indexação no domínio real.
