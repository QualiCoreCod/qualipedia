# QualiPédia

**Enciclopédia pessoal da qualidade** — a "cola" de consulta rápida da
Bruna Silva Ramos Sousa: o que ela sabe, o que já construiu e qual ferramenta
usar em cada situação, para aplicar gestão da qualidade em qualquer empresa,
setor ou momento da carreira.

Site estático em HTML, CSS e JavaScript puros — sem build, sem dependências.
Basta abrir o `index.html` no navegador.

## Estrutura

```
qualipedia-repo/
├── index.html          # Hub: busca rápida + todas as seções
├── qualipedia/
│   └── data.js         # TODO o conteúdo (fichas, guia, acervo) — edite aqui
├── css/
│   └── styles.css      # Tokens de design no topo do arquivo
├── js/
│   └── app.js          # Renderização e busca
└── README.md
```

## Como alimentar com novos temas

Todo o conteúdo está em `qualipedia/data.js`, em formato fácil de ler:

- **enciclopedia** — uma ficha por ferramenta/tema: `titulo`, `categoria`,
  `conceito`, `como` (lista de passos), `exemplos` e `onde` (onde já usei —
  opcional, é a sua memória de aplicação real).
- **guia** — situações-problema e a ferramenta recomendada.
- **acervo** — materiais e metodologias que você criou, com descrição livre.

A busca do site varre automaticamente tudo que estiver no `data.js` — adicionar
uma ficha nova é só copiar um bloco existente e trocar o texto.

## Publicação (opcional)

**GitHub Pages:** crie um repositório, suba os arquivos e ative
Settings → Pages → branch `main` / `/ (root)`.

**Atenção:** o conteúdo inclui dados reais da sua metodologia e resultados
profissionais. Se publicar na internet, prefira um repositório privado ou
avalie o que deseja expor publicamente.
