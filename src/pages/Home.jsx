import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dataService } from "@/services/dataService";
import { Search, BookOpen, Compass, FolderOpen, ArrowRight, ChevronRight, Layers, MapPin, Award } from "lucide-react";
import SmartSearch from "@/components/SmartSearch";
import GuidedWizard from "@/components/GuidedWizard";
import ToolCard from "@/components/ToolCard";
import QualityWatermark from "@/components/QualityWatermark";
import { getDiagramInfo } from "@/components/ToolDiagram";
import { SECTORS } from "@/lib/sectors";
import { AREAS } from "@/lib/areas";

const PILARES = [
  { name: "Planejamento da Qualidade", definition: "Definir objetivos, requisitos, processos e clientes antes de executar.", tools: ["SIPOC", "QFD", "BSC", "5W2H"], isoClause: "planejamento", isoLabel: "Cláusula 6" },
  { name: "Controle da Qualidade", definition: "Avaliar conformidade e monitorar processos em operação.", tools: ["Folha de Verificação", "Carta de Controle", "MSA", "Auditoria"], isoClause: "avaliacao", isoLabel: "Cláusula 9" },
  { name: "Garantia da Qualidade", definition: "Prevenir falhas, padronizar e documentar processos.", tools: ["ISO 9001", "FMEA", "Poka-Yoke", "Procedimentos"], isoClause: "apoio", isoLabel: "Cláusula 7" },
  { name: "Melhoria Contínua", definition: "Identificar e eliminar causas, evoluir resultados.", tools: ["PDCA", "Kaizen", "DMAIC", "MASP"], isoClause: "melhoria", isoLabel: "Cláusula 10" },
];

const SEARCH_CHIPS = ["Problema de comunicação", "Perda de clientes", "Melhorar vendas", "Riscos em projetos", "Medição e estatística"];

export default function Home() {
  const [themes, setThemes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [guides, setGuides] = useState([]);
  const [query, setQuery] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      dataService.listQualityThemes(),
      dataService.listMaterials(),
      dataService.listDecisionGuides(),
    ]).then(([t, m, g]) => {
      setThemes(t || []);
      setMaterials(m || []);
      setGuides(g || []);
      setLoading(false);
    });
  }, []);

  const findThemeByTool = (toolName) => {
    const lower = toolName.toLowerCase();
    return themes.find((t) => {
      const title = t.title?.toLowerCase() || "";
      return title === lower || title.includes(lower) || lower.includes(title);
    });
  };

  const toolThemes = themes.filter((t) => getDiagramInfo(t.title));

  const q = query.trim().toLowerCase();
  const matchScore = (item, specs) => {
    let best = { score: 0, reason: "" };
    for (const spec of specs) {
      const val = item[spec.key];
      const match = spec.isArray ? (val || []).some((v) => v?.toLowerCase().includes(q)) : val?.toLowerCase().includes(q);
      if (match && spec.weight > best.score) best = { score: spec.weight, reason: spec.isArray ? `${spec.label} "${q}"` : spec.label };
    }
    return best;
  };
  const themeSpecs = [
    { key: "title", weight: 100, label: "título" }, { key: "contexts", weight: 80, label: "contexto", isArray: true },
    { key: "tags", weight: 70, label: "tag", isArray: true }, { key: "when_to_use", weight: 60, label: "quando usar" },
    { key: "concept", weight: 40, label: "conceito" }, { key: "how_to_apply", weight: 20, label: "como aplicar" },
    { key: "examples", weight: 15, label: "exemplos" }, { key: "where_i_used", weight: 10, label: "onde usei" },
    { key: "origin", weight: 10, label: "origem" },
  ];
  const guideSpecs = [
    { key: "situation", weight: 100, label: "situação" }, { key: "recommended_tool", weight: 90, label: "ferramenta" },
    { key: "category", weight: 50, label: "categoria" }, { key: "reasoning", weight: 40, label: "raciocínio" },
    { key: "steps", weight: 20, label: "passos" },
  ];
  const materialSpecs = [
    { key: "title", weight: 100, label: "título" }, { key: "contexts", weight: 80, label: "contexto", isArray: true },
    { key: "type", weight: 50, label: "tipo" }, { key: "description", weight: 40, label: "descrição" },
    { key: "related_theme", weight: 30, label: "tema relacionado" },
  ];
  const guideResults = q ? guides.map((g) => ({ item: g, section: "guide", ...matchScore(g, guideSpecs) })).filter((r) => r.score > 0).sort((a, b) => b.score - a.score) : [];
  const themeResults = q ? themes.map((t) => ({ item: t, section: "theme", ...matchScore(t, themeSpecs) })).filter((r) => r.score > 0).sort((a, b) => b.score - a.score) : [];
  const materialResults = q ? materials.map((m) => ({ item: m, section: "material", ...matchScore(m, materialSpecs) })).filter((r) => r.score > 0).sort((a, b) => b.score - a.score) : [];
  const combined = [...guideResults, ...themeResults, ...materialResults];
  const limit = showMore ? combined.length : 10;
  const visible = combined.slice(0, limit);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border" style={{ background: "linear-gradient(180deg, #F5F7FA 55%, #EAF1F8 100%)" }}>
        <QualityWatermark />
        <div className="relative max-w-5xl mx-auto px-6 md:px-10 pt-12 pb-20 md:pt-14 md:pb-24 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] mb-3 text-grafite">
            QualiPédia
          </h1>
          <p className="text-base md:text-lg font-medium mb-2 text-petroleo">
            Sua enciclopédia de gestão da qualidade.
          </p>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Um ambiente de consulta para compreender conceitos, encontrar ferramentas e aplicar a gestão da qualidade em diferentes áreas, processos e situações profissionais.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="bg-surface-blue border-b border-border">
        <div className="max-w-3xl mx-auto px-6 md:px-10 pb-10 md:pb-12">
          {/* Floating search card */}
          <div className="-mt-10 md:-mt-12 relative z-10 rounded-xl bg-background border border-petroleo shadow-md p-5">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-petroleo" />
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShowMore(false); }}
                placeholder="Descreva uma situação, problema, área ou ferramenta..."
                className="w-full rounded-lg border border-azul-claro bg-background pl-12 pr-4 py-3 text-base outline-none transition-all focus:border-destaque"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {SEARCH_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => { setQuery(chip); setShowMore(false); }}
                  className="text-xs text-petroleo border border-azul-claro bg-background rounded-full px-3 py-1.5 hover:border-destaque hover:text-destaque transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Search results */}
          {q && (
            <div className="mt-8">
              {combined.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-background p-10 text-center">
                  <p className="text-muted-foreground">Nenhum resultado para "{query}".</p>
                  <p className="text-sm text-muted-foreground mt-1">Tente a busca guiada ou o diagnóstico rápido abaixo.</p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-4">{combined.length} resultado(s) para "{query}"</p>
                  {visible.filter((r) => r.section === "guide").length > 0 && (
                    <div className="mb-6">
                      <h3 className="flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-primary mb-3"><Compass className="h-4 w-4" /> Guia de decisão</h3>
                      <div className="grid gap-3">
                        {visible.filter((r) => r.section === "guide").map((r) => (
                          <Link key={r.item.id} to="/decisao" className="group rounded-xl border border-primary/20 bg-primary/5 p-4 hover:border-primary/40 transition-all">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0"><p className="font-medium text-sm">{r.item.situation}</p><p className="text-sm text-muted-foreground mt-1">→ {r.item.recommended_tool}</p></div>
                              <span className="shrink-0 text-[10px] text-primary bg-primary/10 rounded-full px-2 py-0.5">match: {r.reason}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {visible.filter((r) => r.section === "theme").length > 0 && (
                    <div className="mb-6">
                      <h3 className="flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-primary mb-3"><BookOpen className="h-4 w-4" /> Enciclopédia</h3>
                      <div className="grid gap-3">
                        {visible.filter((r) => r.section === "theme").map((r) => (
                          <Link key={r.item.id} to={`/tema/${r.item.id}`} className="group rounded-xl border border-border bg-background p-4 hover:border-primary/40 hover:shadow-sm transition-all">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0"><h4 className="font-heading font-semibold group-hover:text-primary transition-colors">{r.item.title}</h4><p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{r.item.concept}</p></div>
                              <span className="shrink-0 text-[10px] text-muted-foreground bg-accent rounded-full px-2 py-0.5">match: {r.reason}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {visible.filter((r) => r.section === "material").length > 0 && (
                    <div className="mb-6">
                      <h3 className="flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-primary mb-3"><FolderOpen className="h-4 w-4" /> Acervo pessoal</h3>
                      <div className="grid gap-3">
                        {visible.filter((r) => r.section === "material").map((r) => (
                          <Link key={r.item.id} to="/acervo" className="group rounded-xl border border-border bg-background p-4 hover:border-primary/40 hover:shadow-sm transition-all">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0"><h4 className="font-heading font-semibold group-hover:text-primary transition-colors">{r.item.title}</h4><p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{r.item.description}</p></div>
                              <span className="shrink-0 text-[10px] text-muted-foreground bg-accent rounded-full px-2 py-0.5">match: {r.reason}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {combined.length > 10 && !showMore && (
                    <button onClick={() => setShowMore(true)} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                      Ver mais resultados ({combined.length - 10}) <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Pilares */}
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="font-heading text-xl md:text-2xl font-semibold tracking-tight">Pilares da Qualidade</h2>
              <p className="text-sm text-muted-foreground mt-1">Segundo a ISO 9001:2015</p>
            </div>
            <Link to="/iso" className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all">
              Ver norma <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {PILARES.map((p) => (
              <div key={p.name} className="rounded-xl border border-border bg-card p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-heading font-semibold text-base">{p.name}</h3>
                  </div>
                  <Link to={`/iso#${p.isoClause}`} className="text-[10px] uppercase tracking-wide text-primary border border-primary/20 bg-primary/5 rounded-full px-2 py-0.5 hover:bg-primary/10 transition-colors">
                    {p.isoLabel}
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{p.definition}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tools.map((tool) => {
                    const theme = findThemeByTool(tool);
                    return theme ? (
                      <Link key={tool} to={`/tema/${theme.id}`} className="text-xs font-medium text-primary border border-primary/20 bg-primary/5 rounded-full px-2.5 py-1 hover:bg-primary/10 transition-colors">
                        {tool}
                      </Link>
                    ) : (
                      <span key={tool} className="text-xs text-muted-foreground border border-border rounded-full px-2.5 py-1">{tool}</span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onde a qualidade se aplica */}
      <section className="bg-accent/30 border-b border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <h2 className="font-heading text-xl md:text-2xl font-semibold tracking-tight mb-1">Onde a qualidade se aplica?</h2>
          <p className="text-sm text-muted-foreground mb-5">Filtre a biblioteca por setor</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {SECTORS.map((s) => {
              const Icon = s.icon;
              return (
                <Link key={s.id} to={`/setor/${s.id}`} className="group rounded-xl border border-border bg-background p-5 hover:border-primary/40 hover:shadow-sm transition-all">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 border border-primary/10 mb-3">
                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-heading font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{s.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{s.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ferramentas */}
      <section className="bg-surface-blue border-b border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="font-heading text-xl md:text-2xl font-semibold tracking-tight">Ferramentas</h2>
              <p className="text-sm text-muted-foreground mt-1">Diagramas técnicos, origem, aplicação e como utilizar</p>
            </div>
            <Link to="/enciclopedia" className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all">
              Enciclopédia completa <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {toolThemes.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {toolThemes.map((t) => (
                <ToolCard key={t.id} theme={t} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-background p-10 text-center text-sm text-muted-foreground">
              {loading ? "Carregando ferramentas..." : "Nenhuma ferramenta com diagrama cadastrada ainda."}
            </div>
          )}
        </div>
      </section>

      {/* Busca guiada */}
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <h2 className="font-heading text-xl md:text-2xl font-semibold tracking-tight mb-1">Busca guiada</h2>
          <p className="text-sm text-muted-foreground mb-5">Necessidade → setor → tipo de empresa → conteúdo → resultados</p>
          <GuidedWizard themes={themes} guides={guides} materials={materials} />
        </div>
      </section>

      {/* Diagnóstico rápido */}
      <section className="bg-accent/30 border-b border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <h2 className="font-heading text-sm uppercase tracking-wider font-semibold text-muted-foreground mb-4">Diagnóstico rápido</h2>
          <SmartSearch themes={themes} guides={guides} materials={materials} />
        </div>
      </section>

      {/* Explorar */}
      <section>
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <h2 className="font-heading text-sm uppercase tracking-wider font-semibold text-muted-foreground mb-4">Explorar</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Link to="/decisao" className="group rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-sm transition-all">
              <Compass className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors mb-4" />
              <h3 className="font-heading font-semibold text-xl mb-1.5">Guia de decisão</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Situações-problema e ferramentas recomendadas para cada desafio de qualidade.</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-4 group-hover:gap-2 transition-all">Abrir guia <ArrowRight className="h-4 w-4" /></span>
            </Link>
            <Link to="/iso" className="group rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-sm transition-all">
              <Award className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors mb-4" />
              <h3 className="font-heading font-semibold text-xl mb-1.5">ISO 9001:2015</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">As cláusulas da norma explicadas em linguagem prática, ciclo PDCA e certificação.</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-4 group-hover:gap-2 transition-all">Abrir página <ArrowRight className="h-4 w-4" /></span>
            </Link>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="flex items-center gap-2 text-sm font-medium mb-3"><MapPin className="h-4 w-4 text-muted-foreground" /> Trilhas por área de atuação</h3>
            <div className="flex flex-wrap gap-2">
              {AREAS.map((area) => {
                const Icon = area.icon;
                return (
                  <Link key={area.id} to={`/area/${area.id}`} className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/40 transition-all">
                    <Icon className="h-3.5 w-3.5" /> {area.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
