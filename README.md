# QualiPédia

Biblioteca digital de gestão da qualidade criada por Bruna Silva Ramos. O projeto ajuda profissionais de qualquer área a partir de um problema real e encontrar ferramentas para medir, analisar, priorizar e melhorar processos.

## Versão publicada

[qualipedia-bruna.comprasbru1807.chatgpt.site](https://qualipedia-bruna.comprasbru1807.chatgpt.site)

A publicação inicial está privada para revisão da proprietária.

> Existe também a versão oficial em aplicativo (Base44), com login próprio, busca com IA, trilhas por área de negócio, acervo protegido e painel de usuários e permissões.

## Estrutura do repositório

```
qualipedia/
├── app/                        # Páginas do site (Next.js)
│   ├── page.tsx                # Home: biblioteca com busca aplicada
│   └── metodologias/page.tsx   # Área privada (exige autenticação + OWNER_EMAIL)
├── components/                 # Interface (explorador, shell, filtros)
├── lib/qualipedia-data.ts      # TODO o conteúdo: 59 ferramentas + 22 situações-guia
├── site-estatico/              # Versão offline portátil (abre sem instalar nada)
│   └── index.html              # Dê dois cliques para abrir no navegador
├── documentos/                 # Documentos do projeto (portfólio)
│   ├── Documentacao-Completa-QualiPedia.docx
│   ├── Documento-Instrucao-QualiPedia.docx
│   └── Apresentacao-QualiPedia.pptx
├── scripts/                    # Scripts de build e instalação
└── vendor/, build/             # Dependências de estilo e build
```

## Funcionalidades

- busca por problema, objetivo, setor ou nome da ferramenta;
- recomendações para atendimento, vendas, e-commerce, projetos, riscos, pessoas e operações;
- fichas com conceito, origem (quem criou, quando e por quê), finalidade e situações de aplicação;
- filtros por área;
- guia de decisão com 22 caminhos iniciais para problemas comuns;
- rota protegida para metodologias próprias;
- layout responsivo seguindo a identidade visual definida para o projeto.

## Documentação técnica

- [`docs/arquitetura-e-telas.md`](docs/arquitetura-e-telas.md) — todas as telas, design system (paleta, tipografia, diagramas técnicos), tecnologias de cada camada e o que existe por trás de cada tela.
- [`docs/iso-9001.md`](docs/iso-9001.md) — conteúdo oficial verificado da ISO 9001:2015 (10 cláusulas, PDCA, pensamento baseado em risco, certificação no Brasil via Inmetro) com links brasileiros (ABNT, Inmetro, FNQ).
- `documentos/TCC-QualiPedia.docx` — Trabalho de Conclusão de Curso do projeto (formato ABNT).

## Conteúdo

As ferramentas e os guias de decisão ficam em `lib/qualipedia-data.ts`:

- **68 ferramentas e conceitos**, incluindo: as 7 ferramentas clássicas (fluxograma, Ishikawa, folha de verificação, Pareto, histograma, carta de controle, dispersão), ferramentas complementares (SIPOC, Kanban, 5S, matriz de risco, PFMEA, 5 Porquês, 5W2H, MASP, DMAIC, PDCA, Kaizen e Kaizen A3, matriz GUT, BSC, QFD, 8D, MSA/R&R, Poka-Yoke, BPMN, VSM, Gemba walk, SWOT, brainstorming, FMEA) e a série **Fundamentos e História** (Deming, Juran, Crosby, Ishikawa, Feigenbaum, Taguchi, gestão da qualidade, implantação passo a passo, excelência organizacional, enfoque sistêmico, eficiência × eficácia, TQM, sustentabilidade, ciclo de vida do produto, ISO 9001, auditoria interna, gestão de não conformidades, gestão de riscos ISO 31000, gestão do conhecimento, automação de processos, gestão de projetos, Lean, Six Sigma, Gerenciamento pelas Diretrizes (GPD/Hoshin Kanri), Matriz X, benchmarking, OEE, Performance Prism, MEG/FNQ, produtividade x eficiência, estratégia de manufatura e Taylorismo/Fordismo).
- **25 situações-guia** com contexto, resultado esperado e ferramentas indicadas.

Cada ferramenta possui categoria, resumo, contexto histórico, finalidade, situações de aplicação, setores e palavras relacionadas. As palavras relacionadas permitem que uma busca como `problema de comunicação`, `perda de cliente` ou `medição e estatística` encontre caminhos úteis mesmo sem o usuário conhecer o nome técnico da ferramenta.

## Limite entre conteúdo público e privado

O repositório contém somente conhecimento público e a estrutura geral das metodologias.

Não devem ser adicionados ao código público:

- critérios internos de avaliação;
- pesos e fórmulas;
- prompts proprietários;
- planilhas e documentos empresariais;
- nomes de clientes ou colaboradores;
- dados individuais de atendimento;
- resultados operacionais não anonimizados.

A rota `/metodologias` exige autenticação e autorização no servidor. O acesso da proprietária é controlado pela variável `OWNER_EMAIL`.

## Versão offline (site-estatico/)

Para usar sem instalar nada: abra `site-estatico/index.html` no navegador. A busca, o guia e as fichas funcionam localmente. Todo o conteúdo dessa versão (36 fichas da enciclopédia, guia de decisão e acervo público) fica em `site-estatico/qualipedia/data.js`. Serve também para publicação em hospedagem simples (opção "implantar como estático").

## Tecnologias

- React 19;
- TypeScript;
- Next.js com Vinext;
- Tailwind CSS;
- Lucide React;
- Cloudflare Workers por meio do Sites.

## Executar localmente

Requisitos: Node.js 22.13 ou superior e pnpm.

```bash
pnpm install
pnpm dev
```

Para validar a versão de produção:

```bash
pnpm lint
pnpm build
```

## Configuração da área privada

Copie `.env.example` para `.env.local` e informe o e-mail autorizado:

```env
OWNER_EMAIL=seu-email-da-conta@example.com
```

Na hospedagem, configure essa variável como segredo do ambiente. Não grave o e-mail real ou outras credenciais no repositório.

## Hospedagem

Esta versão usa autenticação fornecida pelo Sites. Para implantar a rota privada em outro provedor, como a Hostinger, será necessário substituir essa integração por autenticação e autorização compatíveis com o servidor escolhido. A versão em `site-estatico/` pode ser implantada como site estático em qualquer provedor.

## Segurança

Consulte [SECURITY.md](SECURITY.md) antes de adicionar documentos ou dados profissionais.
