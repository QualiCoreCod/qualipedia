# QualiPédia

Biblioteca digital de gestão da qualidade criada por Bruna Silva Ramos. O projeto ajuda profissionais de qualquer área a partir de um problema real e encontrar ferramentas para medir, analisar, priorizar e melhorar processos.

## Versão publicada

[qualipedia-bruna.comprasbru1807.chatgpt.site](https://qualipedia-bruna.comprasbru1807.chatgpt.site)

A publicação inicial está privada para revisão da proprietária.

## Funcionalidades

- busca por problema, objetivo, setor ou nome da ferramenta;
- recomendações para atendimento, vendas, e-commerce, projetos, riscos, pessoas e operações;
- fichas com conceito, origem, finalidade e situações de aplicação;
- filtros por área;
- guia de decisão com caminhos iniciais para problemas comuns;
- rota protegida para metodologias próprias;
- layout responsivo seguindo a identidade visual definida para o projeto.

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

## Conteúdo

As ferramentas e os guias de decisão ficam em:

```text
lib/qualipedia-data.ts
```

Cada ferramenta possui categoria, resumo, contexto histórico, finalidade, situações de aplicação, setores e palavras relacionadas. As palavras relacionadas permitem que uma busca como `problema de comunicação`, `perda de cliente` ou `medição e estatística` encontre caminhos úteis mesmo sem o usuário conhecer o nome técnico da ferramenta.

## Hospedagem

Esta versão usa autenticação fornecida pelo Sites. Para implantar a rota privada em outro provedor, como a Hostinger, será necessário substituir essa integração por autenticação e autorização compatíveis com o servidor escolhido.

## Segurança

Consulte [SECURITY.md](SECURITY.md) antes de adicionar documentos ou dados profissionais.
