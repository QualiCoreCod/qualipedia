# QualiPédia — Arquitetura, telas, design e tecnologias

Documentação técnica de referência do projeto QualiPédia: todas as telas, o design system, as tecnologias de cada camada e o que existe por trás de cada tela.

## 1. Os dois ambientes do projeto

| Ambiente | O que é | Hospedagem |
|---|---|---|
| **Aplicativo oficial** | Produto completo: login, busca com IA, enciclopédia, guia de decisão, acervo pessoal protegido, convites e painel de permissões | Base44 (app id: 6aae986d830b0be6e6f3384c) |
| **Versão Next.js** | Site de conteúdo público gerado no ecossistema ChatGPT/Sites | qualipedia-bruna.comprasbru1807.chatgpt.site |
| **Versão estática portátil** | HTML/CSS/JS puros, abre offline com dois cliques; serve para hospedar como site estático em qualquer provedor (ex.: Hostinger) | Pasta `site-estatico/` deste repositório |

## 2. Telas do aplicativo oficial (Base44)

### 2.1 Home / Hub central
- **Função:** abrir como biblioteca técnica de gestão da qualidade.
- **Conteúdo:** frase de abertura ("Bem-vindo à qualidade em forma de enciclopédia"), os **4 pilares da gestão da qualidade segundo a ISO** (Planejamento, Controle, Garantia, Melhoria Contínua, cada um com as ferramentas correspondentes), seção **"Onde a qualidade se aplica"** com cards por setor (Indústria/Manufatura, Serviços, Saúde, Tecnologia e Software, Varejo e E-commerce, Logística e Suprimentos, Educação, Setor Público, Financeiro), e a **busca guiada em etapas** (necessidade → setor → tipo de empresa → categoria de conteúdo → resultados com subpesquisa).
- **Por trás:** componente React + motor de busca em linguagem natural com IA generativa (invoke_superagent_step) que interpreta a descrição do problema e retorna conceitos e ferramentas aplicáveis.

### 2.2 Enciclopédia de ferramentas
- **Função:** catálogo completo de fichas de ferramentas e conceitos de gestão da qualidade.
- **Conteúdo por ficha (padrão editorial obrigatório):** conceito, autor e data de origem, por que usar, quando aplicar, como utilizar (passo a passo), setores de aplicação, palavras-chave de busca, diagrama técnico (quando aplicável), fonte externa de referência.
- **Por trás:** entidade `QualityTheme` (campos: title, category, origin, concept, when_to_use, how_to_apply, examples, contexts, where_i_used, tags, attachments, references). Filtros por área e busca por palavra-chave indexada por termos de negócio.

### 2.3 Guia de decisão ("Qual ferramenta usar?")
- **Função:** atalho "situação-problema → ferramenta recomendada".
- **Conteúdo por item:** situação, raciocínio (por que essa ferramenta), onde se aplica, passos sugeridos, referências externas.
- **Por trás:** entidade `DecisionGuide` (situation, recommended_tool, reasoning, applies_to, steps, category, references).

### 2.4 Página da ISO 9001
- **Função:** página dedicada à norma.
- **Conteúdo:** as 10 cláusulas oficiais explicadas uma a uma, o ciclo PDCA aplicado à estrutura da norma, pensamento baseado em riscos, certificação passo a passo (organismo acreditado Cgcre/Inmetro) e seção de anexos restrita à administradora (Manual da Qualidade, manual técnico, procedimentos).
- **Fonte oficial do conteúdo:** `docs/iso-9001.md` deste repositório.
- **Por trás:** entidade `IsoDocument` (title, description, file_url, clause) para os anexos.

### 2.5 Acervo pessoal (protegido)
- **Função:** portfólio real da autora: como a metodologia de qualidade foi criada e aplicada numa operação de suporte técnico.
- **Conteúdo público (qualquer usuário logado):** contexto do projeto, aplicação do PDCA, visão geral da metodologia, os 5 pilares do QA com nome e definição (Gestão do Fluxo e Rastreabilidade, Gestão da Tratativa da Demanda, Análise e Assertividade Técnica, Qualidade da Comunicação, Conduta Relacional), os 5 pilares do IEPC (Resolução Percebida, Compreensão e Segurança Percebida, Esforço Percebido pelo Cliente, Tempo e Fluidez, Experiência Relacional), categorias de não conformidade, o que é um elogio, gamificação (visão geral), resultados qualitativos e o projeto QualiVisão.
- **Conteúdo restrito (apenas administradora autenticada):** pesos e subcritérios de cada pilar, penalidades, fórmulas, procedimento interno completo, documentos anexos e resultados numéricos do período jan-set/2026.
- **Por trás:** entidades `Material` (metodologia QA 100 pts, categorias de NC, ciclo avaliativo/PDI) + controle de acesso por papel (RBAC): administradora tem edição total; leitores convidados veem só o público.

### 2.6 Biblioteca de materiais e formulário de novos temas
- **Função:** a autora envia material bruto (foto de caderno, resumo, áudio, PDF); a ficha nova entra na enciclopédia após processamento.
- **Por trás:** entidade `Material` (title, type, description, file_url, link, related_theme, contexts) + workflow com a assistente (Superagent) que estrutura o conteúdo no padrão da ficha.

## 3. Versão Next.js (pasta raiz deste repositório)

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (Vinext) sobre Vite 8, React 19, TypeScript 5.9 |
| Estilo | Tailwind CSS 4.2 + tokens shadcn (vendor/shadcn-tailwind-4.13.0.css) |
| Ícones | Lucide React (line-art, traço fino) — **sem emojis** |
| Build/Hospedagem | Cloudflare Workers via Sites (scripts/ e build/sites-vite-plugin.ts) |
| Autenticação | Integração de login do ecosistema (app/chatgpt-auth.ts) + variável OWNER_EMAIL para a rota privada /metodologias |
| Dados | 100% em lib/qualipedia-data.ts: 68 ferramentas/conceitos + 25 situações-guia com busca por palavra-chave |

## 4. Versão estática portátil (site-estatico/)

- Arquivos: `index.html`, `css/styles.css`, `js/app.js`, `qualipedia/data.js`, `README.md`.
- Sem dependências: HTML5, CSS3 e JavaScript puros; busca, filtros e fichas funcionam offline (dois cliques no index.html).
- Todo o conteúdo em `qualipedia/data.js` (JSON): enciclopédia (36 fichas em formato resumido), guia de decisão e acervo público.
- Deploy: pode ser publicado como site estático em qualquer hospedagem.

## 5. Design system (padrão editorial visual)

- **Paleta:** fundo claro neutro; tinta escura #172033; azul de interação (#2563EB / #1D5FD1); cinzas neutros para texto secundário; um único acento.
- **Tipografia:** família limpa estilo Inter/system-ui; títulos em peso extrabold com tracking negativo; rótulos em caixa alta com letter-spacing.
- **Diagramas técnicos:** SVG monocromático (preto/cinza sobre claro, traço fino), padrão manual técnico de engenharia: Ishikawa (espinha de peixe com 6M rotulados), fluxograma (símbolos técnicos), Pareto (barras + linha acumulada), histograma, carta de controle (LSC/LIC), dispersão, SIPOC, PDCA, DMAIC, 5S, GUT.
- **Proibições:** emojis em qualquer elemento de interface; cores vivas decorativas; ilustrações cartunescas.
- **Tom de texto:** terminologia técnica de gestão da qualidade (conformidade, não conformidade, indicador, causa raiz, variabilidade, prevenção, auditoria).

## 6. Regras de segurança do conteúdo

Detalhadas em `SECURITY.md` e na regra editorial do `docs/iso-9001.md`:
- Nada de critérios internos, pesos, fórmulas, prompts proprietários, planilhas, nomes de clientes/colaboradores ou dados individuais no conteúdo público.
- Nome da empresa parceira nunca aparece no site (usar "operação de suporte técnico").
- Dados de performance ficam restritos a acessos autorizados no acervo pessoal.
