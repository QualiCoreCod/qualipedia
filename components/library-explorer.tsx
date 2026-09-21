"use client";

import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, CheckCircle2, ChevronDown, Clock3, Factory, Headphones, Search, ShoppingCart, SlidersHorizontal, Target, TriangleAlert, UserMinus, Users, Workflow } from "lucide-react";
import { problemGuides, qualityTools, sectors, toolBySlug } from "@/lib/qualipedia-data";

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const stopWords = new Set(["a", "as", "com", "como", "da", "das", "de", "do", "dos", "e", "em", "na", "nas", "no", "nos", "o", "os", "ou", "para", "por", "problema", "problemas", "que", "um", "uma"]);

const searchTerms = (value: string) =>
  normalize(value)
    .split(/\s+/)
    .filter((term) => term.length > 2 && !stopWords.has(term));

const toolSearchText = (tool: (typeof qualityTools)[number]) =>
  normalize([tool.name, tool.category, tool.summary, tool.origin, tool.why, ...tool.useWhen, ...tool.sectors, ...tool.keywords].join(" "));

const problemSearchText = (guide: (typeof problemGuides)[number]) =>
  normalize([guide.problem, guide.context, guide.outcome, ...guide.keywords].join(" "));

const suggestions = ["problema de comunicação", "aumentar vendas", "perda de cliente", "medição e estatística", "risco em projetos"];

const areas = [
  { title: "Atendimento", description: "Suporte, experiência do cliente, comunicação e padronização.", query: "atendimento suporte experiência do cliente", sector: "Atendimento", icon: Headphones },
  { title: "Vendas e e-commerce", description: "Conversão, prospecção, jornada de compra, entrega e devolução.", query: "vendas e-commerce conversão cliente", sector: "Todos", icon: ShoppingCart },
  { title: "Projetos e processos", description: "Planejamento, implantação, fluxo, escopo e melhoria.", query: "projetos processos implantação melhoria", sector: "Projetos", icon: Workflow },
  { title: "Gestão de pessoas", description: "Desempenho, treinamento, avaliação e ambiente de trabalho.", query: "pessoas treinamento avaliação desempenho", sector: "Pessoas", icon: Users },
  { title: "Riscos e falhas", description: "Prevenção, não conformidades, causa raiz e controles.", query: "riscos falhas não conformidades causa raiz", sector: "Riscos", icon: TriangleAlert },
  { title: "Perda de clientes", description: "Churn, cancelamento, retenção, satisfação e recompra.", query: "perda de cliente churn retenção cancelamento", sector: "Todos", icon: UserMinus },
  { title: "Indústria e operações", description: "Variação, desperdício, produtividade e estabilidade.", query: "indústria operações produtividade desperdício", sector: "Operações", icon: Factory },
] as const;

export function LibraryExplorer() {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("Todos");
  const [visible, setVisible] = useState(9);
  const normalizedQuery = normalize(query);
  const terms = useMemo(() => searchTerms(query), [query]);

  const matchingGuides = useMemo(() => {
    if (!normalizedQuery) return [];
    return problemGuides
      .map((guide) => ({ guide, score: terms.reduce((total, term) => total + (problemSearchText(guide).includes(term) ? 1 : 0), 0) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ guide }) => guide);
  }, [normalizedQuery, terms]);

  const recommendedSlugs = useMemo(() => new Set(matchingGuides.flatMap((guide) => guide.toolSlugs)), [matchingGuides]);

  const filteredTools = useMemo(() => {
    return qualityTools
      .filter((tool) => sector === "Todos" || tool.sectors.includes(sector))
      .map((tool) => {
        const text = toolSearchText(tool);
        const directScore = terms.reduce((total, term) => total + (text.includes(term) ? 1 : 0), 0);
        const score = directScore + (recommendedSlugs.has(tool.slug) ? 4 : 0);
        return { tool, score };
      })
      .filter(({ score }) => !normalizedQuery || terms.length === 0 || score > 0)
      .sort((a, b) => b.score - a.score || a.tool.name.localeCompare(b.tool.name, "pt-BR"))
      .map(({ tool }) => tool);
  }, [normalizedQuery, recommendedSlugs, sector, terms]);

  function chooseSuggestion(value: string) {
    setQuery(value);
    setVisible(9);
    document.getElementById("biblioteca")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function chooseArea(area: (typeof areas)[number]) {
    setQuery(area.query);
    setSector(area.sector);
    setVisible(9);
    window.setTimeout(() => document.getElementById("enciclopedia")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  return (
    <>
      <section id="inicio" className="scroll-mt-28 border-b border-[#DFE3E8] bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-7 lg:px-10 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-[5px] border border-[#DCE1E8] bg-[#F8F9FB] px-3 py-1.5 text-xs font-bold text-[#647083]"><BookOpen size={14} /> Base de conhecimento em gestão da qualidade</div>
              <h1 className="max-w-3xl text-4xl font-extrabold tracking-[-0.045em] text-[#172033] sm:text-5xl">QualiPédia</h1>
              <p className="mt-3 text-xl font-bold leading-8 text-[#263248]">Sua enciclopédia de gestão da qualidade</p>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#647083]">
                Um ambiente de consulta para compreender conceitos, escolher ferramentas e aplicar qualidade em diferentes setores, processos e situações de trabalho.
              </p>
            </div>
            <div className="border-l-2 border-[#D9E2F2] pl-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-[#1D5FD1]">Para que serve</p>
              <ul className="mt-3 space-y-2.5">
                <li className="flex gap-2 text-sm leading-5 text-[#536071]"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#2563EB]" />Encontrar a ferramenta adequada para uma situação.</li>
                <li className="flex gap-2 text-sm leading-5 text-[#536071]"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#2563EB]" />Entender quando, por que e como aplicar cada método.</li>
                <li className="flex gap-2 text-sm leading-5 text-[#536071]"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#2563EB]" />Explorar qualidade em atendimento, vendas, projetos e operações.</li>
              </ul>
            </div>
          </div>

          <div className="mt-9 max-w-5xl">
            <label htmlFor="quality-search" className="sr-only">Pesquisar problema, área ou ferramenta</label>
            <div className="flex min-h-14 items-center rounded-[6px] border border-[#BAC3D1] bg-white shadow-[0_5px_16px_rgba(31,45,68,0.08)] focus-within:border-[#2563EB] focus-within:ring-3 focus-within:ring-[#2563EB]/10">
              <Search className="ml-4 shrink-0 text-[#647083]" size={21} />
              <input
                id="quality-search"
                value={query}
                onChange={(event) => { setQuery(event.target.value); setVisible(9); }}
                placeholder="Descreva sua situação ou problema..."
                className="min-w-0 flex-1 bg-transparent px-3 py-4 text-base text-[#172033] outline-none placeholder:text-[#98A1AF]"
              />
              {query ? (
                <button type="button" onClick={() => setQuery("")} className="mr-2 rounded-[4px] px-3 py-2 text-xs font-bold text-[#647083] hover:bg-[#F0F3F7]">Limpar</button>
              ) : null}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[#7B8495]">Experimente:</span>
              {suggestions.map((item) => (
                <button key={item} type="button" onClick={() => chooseSuggestion(item)} className="rounded-[4px] border border-[#DCE1E8] bg-[#F8F9FB] px-2.5 py-1.5 text-xs font-semibold text-[#536071] hover:border-[#AFC5EB] hover:bg-[#EEF4FF] hover:text-[#1D5FD1]">
                  {item}
                </button>
              ))}
            </div>
          </div>

          <section className="mt-10" aria-labelledby="areas-title">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <h2 id="areas-title" className="text-xl font-extrabold tracking-[-0.02em]">Explorar por área de atuação</h2>
                <p className="mt-1 text-sm text-[#7B8495]">Escolha um contexto para encontrar ferramentas e situações relacionadas.</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {areas.map((area) => {
                const Icon = area.icon;
                return (
                  <button key={area.title} type="button" onClick={() => chooseArea(area)} className="group min-h-40 rounded-[6px] border border-[#DFE3E8] bg-white p-5 text-left transition hover:border-[#AFC5EB] hover:bg-[#F8FAFF] hover:shadow-[0_5px_18px_rgba(31,45,68,0.07)]">
                    <span className="grid size-10 place-items-center rounded-[5px] border border-[#DCE1E8] bg-[#F7F8FA] text-[#263248] group-hover:border-[#C9D8F2] group-hover:bg-[#EAF1FF] group-hover:text-[#1D5FD1]"><Icon size={20} /></span>
                    <span className="mt-4 block text-base font-extrabold text-[#263248]">{area.title}</span>
                    <span className="mt-1 block text-sm leading-5 text-[#7B8495]">{area.description}</span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </section>

      <main className="mx-auto max-w-[1440px] px-4 py-9 sm:px-7 lg:px-10 lg:py-12">
        {matchingGuides.length > 0 ? (
          <section className="mb-10" aria-labelledby="recommended-title">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#1D5FD1]">Rotas sugeridas</p>
                <h2 id="recommended-title" className="mt-1 text-xl font-extrabold tracking-[-0.02em]">O que pode ajudar neste problema</h2>
              </div>
              <span className="text-sm text-[#7B8495]">{matchingGuides.length} {matchingGuides.length === 1 ? "situação relacionada" : "situações relacionadas"}</span>
            </div>
            <div className="grid gap-3 lg:grid-cols-3">
              {matchingGuides.map((guide) => (
                <article key={guide.problem} className="rounded-[6px] border border-[#C9D8F2] bg-[#F5F8FF] p-5">
                  <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-[#1D5FD1]"><Target size={15} /> Diagnóstico inicial</div>
                  <h3 className="text-base font-extrabold leading-6 text-[#172033]">{guide.problem}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#647083]">{guide.outcome}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {guide.toolSlugs.map((slug) => {
                      const tool = toolBySlug(slug);
                      return tool ? <a key={slug} href={`#${slug}`} className="rounded-[4px] bg-white px-2 py-1 text-xs font-bold text-[#1D5FD1] ring-1 ring-[#CCD9EF] hover:bg-[#EAF1FF]">{tool.name}</a> : null;
                    })}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section id="enciclopedia" className="scroll-mt-28" aria-labelledby="tools-title">
          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#7B8495]">Enciclopédia</p>
              <h2 id="tools-title" className="mt-1 text-2xl font-extrabold tracking-[-0.025em]">
                {query ? "Ferramentas relacionadas à sua busca" : "Ferramentas e métodos de qualidade"}
              </h2>
              <p className="mt-1 text-sm text-[#7B8495]">{filteredTools.length} {filteredTools.length === 1 ? "resultado" : "resultados"}</p>
            </div>
            <div className="flex max-w-full flex-wrap items-center gap-2 pb-1" aria-label="Filtrar por área">
              <SlidersHorizontal size={16} className="shrink-0 text-[#7B8495]" />
              {sectors.map((item) => (
                <button key={item} type="button" onClick={() => { setSector(item); setVisible(9); }} className={`whitespace-nowrap rounded-[4px] border px-3 py-2 text-xs font-bold ${sector === item ? "border-[#2563EB] bg-[#2563EB] text-white" : "border-[#DCE1E8] bg-white text-[#647083] hover:border-[#AFC5EB] hover:text-[#1D5FD1]"}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          {filteredTools.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredTools.slice(0, visible).map((tool) => (
                <article id={tool.slug} key={tool.slug} className="scroll-mt-28 rounded-[6px] border border-[#DFE3E8] bg-white shadow-[0_1px_3px_rgba(31,45,68,0.04)]">
                  <div className="p-5">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <span className="rounded-[4px] bg-[#EDF3FF] px-2 py-1 text-[11px] font-extrabold uppercase tracking-[0.07em] text-[#1D5FD1]">{tool.category}</span>
                      <BookOpen size={17} className="text-[#98A1AF]" />
                    </div>
                    <h3 className="text-lg font-extrabold tracking-[-0.015em] text-[#172033]">{tool.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#647083]">{tool.summary}</p>
                    <div className="mt-4 border-t border-[#EEF0F3] pt-4">
                      <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#929AA8]">Use quando</p>
                      <p className="mt-1 text-sm font-medium leading-6 text-[#435067]">{tool.useWhen[0]}</p>
                    </div>
                  </div>
                  <details className="group border-t border-[#E7EAF0]">
                    <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3 text-sm font-bold text-[#1D5FD1] hover:bg-[#F7F9FC]">
                      Ver ficha completa
                      <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="space-y-5 border-t border-[#EEF0F3] bg-[#FAFBFC] px-5 py-5">
                      <div>
                        <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.08em] text-[#7B8495]"><Clock3 size={14} /> Origem e período</p>
                        <p className="mt-1.5 text-sm leading-6 text-[#536071]">{tool.origin}</p>
                      </div>
                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#7B8495]">Por que foi criada</p>
                        <p className="mt-1.5 text-sm leading-6 text-[#536071]">{tool.why}</p>
                      </div>
                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#7B8495]">Situações de aplicação</p>
                        <ul className="mt-2 space-y-2">
                          {tool.useWhen.map((item) => <li key={item} className="flex gap-2 text-sm leading-5 text-[#536071]"><ArrowRight size={14} className="mt-0.5 shrink-0 text-[#2563EB]" />{item}</li>)}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {tool.sectors.map((item) => <span key={item} className="rounded-[4px] border border-[#E0E4EA] bg-white px-2 py-1 text-xs font-semibold text-[#647083]">{item}</span>)}
                      </div>
                    </div>
                  </details>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[6px] border border-dashed border-[#C9D0DB] bg-white px-6 py-14 text-center">
              <Search className="mx-auto text-[#98A1AF]" size={28} />
              <h3 className="mt-3 font-extrabold">Nenhum resultado com esses filtros</h3>
              <p className="mt-1 text-sm text-[#7B8495]">Tente descrever o problema com outras palavras ou selecione “Todos”.</p>
            </div>
          )}

          {visible < filteredTools.length ? (
            <div className="mt-7 text-center">
              <button type="button" onClick={() => setVisible((value) => value + 9)} className="rounded-[5px] border border-[#BFC7D3] bg-white px-5 py-3 text-sm font-bold text-[#435067] hover:border-[#2563EB] hover:text-[#1D5FD1]">Mostrar mais ferramentas</button>
            </div>
          ) : null}
        </section>

        <section id="guia" className="scroll-mt-28 py-16" aria-labelledby="guide-title">
          <div className="mb-6 max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#1D5FD1]">Guia de decisão</p>
            <h2 id="guide-title" className="mt-1 text-2xl font-extrabold tracking-[-0.025em]">Situações comuns e primeiros caminhos</h2>
            <p className="mt-2 text-sm leading-6 text-[#647083]">A recomendação ajuda a começar. A escolha final depende do contexto, dos dados disponíveis e do risco envolvido.</p>
          </div>
          <div className="divide-y divide-[#E7EAF0] overflow-hidden rounded-[6px] border border-[#DFE3E8] bg-white">
            {problemGuides.map((guide) => (
              <details key={guide.problem} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 hover:bg-[#F8F9FB] sm:px-6">
                  <span className="font-bold text-[#263248]">{guide.problem}</span>
                  <ChevronDown size={17} className="shrink-0 text-[#7B8495] transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-[#EEF0F3] bg-[#FAFBFC] px-5 py-5 sm:px-6">
                  <p className="text-sm leading-6 text-[#647083]">{guide.context}</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[#435067]">Objetivo: {guide.outcome}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {guide.toolSlugs.map((slug) => {
                      const tool = toolBySlug(slug);
                      return tool ? <a key={slug} href={`#${slug}`} className="rounded-[4px] bg-[#EAF1FF] px-2.5 py-1.5 text-xs font-bold text-[#1D5FD1] hover:bg-[#DCE9FF]">{tool.name}</a> : null;
                    })}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
