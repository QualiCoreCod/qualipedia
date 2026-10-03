import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { dataService } from "@/services/dataService";
import { ArrowLeft, Compass, BookOpen, FolderOpen, Lightbulb } from "lucide-react";
import { getArea } from "@/lib/areas";

export default function AreaTrail() {
  const { areaId } = useParams();
  const area = getArea(areaId);
  const [themes, setThemes] = useState([]);
  const [guides, setGuides] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!area) { setLoading(false); return; }
    Promise.all([
      dataService.listQualityThemes(),
      dataService.listDecisionGuides(),
      dataService.listMaterials(),
    ]).then(([t, g, m]) => {
      setThemes(t || []);
      setGuides(g || []);
      setMaterials(m || []);
      setLoading(false);
    });
  }, [areaId]);

  if (!area) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-muted-foreground">Área não encontrada.</p>
        <Link to="/" className="text-primary hover:underline mt-2 inline-block">Voltar ao início</Link>
      </div>
    );
  }

  if (loading) return <div className="max-w-4xl mx-auto px-6 py-16 text-muted-foreground">Carregando...</div>;

  const ctxMatch = (ctx, contexts) => contexts.some((c) => c.toLowerCase().includes(ctx.toLowerCase()));

  // Filter guides: by text match or cross-reference with themes
  const areaGuides = guides.filter((g) => {
    const text = `${g.situation || ""} ${g.recommended_tool || ""} ${g.reasoning || ""} ${g.steps || ""}`.toLowerCase();
    if (area.contexts.some((ctx) => text.includes(ctx.toLowerCase()))) return true;
    const toolTheme = themes.find((t) =>
      t.title && g.recommended_tool &&
      (g.recommended_tool.toLowerCase().includes(t.title.toLowerCase()) || t.title.toLowerCase().includes(g.recommended_tool.toLowerCase()))
    );
    return toolTheme && area.contexts.some((ctx) => (toolTheme.contexts || []).some((c) => c.toLowerCase().includes(ctx.toLowerCase())));
  });

  // Filter and sort themes by number of matching contexts
  const areaThemes = themes
    .filter((t) => (t.contexts || []).some((c) => area.contexts.some((ctx) => c.toLowerCase().includes(ctx.toLowerCase()))))
    .sort((a, b) => {
      const aM = (a.contexts || []).filter((c) => area.contexts.some((ctx) => c.toLowerCase().includes(ctx.toLowerCase()))).length;
      const bM = (b.contexts || []).filter((c) => area.contexts.some((ctx) => c.toLowerCase().includes(ctx.toLowerCase()))).length;
      return bM - aM;
    });

  // Filter materials
  const areaMaterials = materials.filter((m) =>
    (m.contexts || []).some((c) => area.contexts.some((ctx) => c.toLowerCase().includes(ctx.toLowerCase())))
  );

  const Icon = area.icon;

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-12 md:py-16">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Início
      </Link>

      <div className="flex items-center gap-4 mb-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 border border-primary/10 shrink-0">
          <Icon className="h-7 w-7 text-primary" />
        </div>
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight">{area.name}</h1>
          <p className="text-muted-foreground text-sm">{area.description}</p>
        </div>
      </div>

      <p className="text-lg text-muted-foreground leading-relaxed mb-10 mt-4">
        Ferramentas e conceitos para quem trabalha com <span className="text-foreground font-medium">{area.name.toLowerCase()}</span>.
      </p>

      {/* Guides first */}
      {areaGuides.length > 0 && (
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-primary mb-4">
            <Compass className="h-4 w-4" /> Comece pelo problema — Guia "Qual ferramenta usar?"
          </h2>
          <div className="space-y-3">
            {areaGuides.map((g) => (
              <div key={g.id} className="rounded-xl border border-border bg-card p-5">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Situação</p>
                <p className="font-medium leading-relaxed">{g.situation}</p>
                <div className="mt-3 flex items-start gap-2.5 rounded-lg bg-accent/50 p-3.5">
                  <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Recomendado</p>
                    <p className="font-heading font-semibold">{g.recommended_tool}</p>
                  </div>
                </div>
                {g.reasoning && <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{g.reasoning}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Then themes */}
      {areaThemes.length > 0 && (
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-primary mb-4">
            <BookOpen className="h-4 w-4" /> Enciclopédia — ferramentas e conceitos
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {areaThemes.map((t) => (
              <Link
                key={t.id}
                to={`/tema/${t.id}`}
                className="group rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-sm transition-all flex flex-col"
              >
                <h3 className="font-heading font-semibold text-lg group-hover:text-primary transition-colors mb-1">{t.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{t.concept}</p>
                {t.when_to_use && (
                  <p className="text-xs text-muted-foreground mt-2 italic line-clamp-1">Quando usar: {t.when_to_use}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Then materials */}
      {areaMaterials.length > 0 && (
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-primary mb-4">
            <FolderOpen className="h-4 w-4" /> Acervo pessoal — seus materiais
          </h2>
          <div className="space-y-3">
            {areaMaterials.map((m) => (
              <div key={m.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-heading font-semibold text-lg">{m.title}</h3>
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground border border-border rounded-full px-2 py-0.5">{m.type}</span>
                </div>
                {m.description && <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{m.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {areaGuides.length === 0 && areaThemes.length === 0 && areaMaterials.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">Nenhum item encontrado para esta área ainda.</p>
        </div>
      )}
    </div>
  );
}
