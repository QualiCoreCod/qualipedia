import React, { useState, useEffect } from "react";
import { dataService } from "@/services/dataService";
import { Compass, Lightbulb, ListChecks, ExternalLink } from "lucide-react";
import ReferenceList from "@/components/ReferenceList";

export default function DecisionGuidePage() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dataService.listDecisionGuides()
      .then((g) => {
        setGuides(g || []);
        setLoading(false);
      })
      .catch(() => {
        setGuides([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-12 md:py-16">
      <div className="flex items-start justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 text-primary mb-3">
            <Compass className="h-5 w-5" />
            <span className="text-xs uppercase tracking-wider font-medium">Guia de decisão</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            Qual ferramenta usar?
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Para cada situação-problema, uma ferramenta recomendada. Consulte o raciocínio e os passos
            sugeridos para aplicar a melhor abordagem.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-muted-foreground">Carregando guia de decisão...</div>
      ) : guides.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <Compass className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Nenhuma situação cadastrada ainda.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {guides.map((g) => (
            <div key={g.id} className="group rounded-2xl border border-border bg-card p-6 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between gap-4">
                <span className="text-[11px] uppercase tracking-wide text-muted-foreground border border-border rounded-full px-2.5 py-1 shrink-0">
                  {g.category}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-3 mb-1">Situação</p>
              <p className="font-medium leading-relaxed">{g.situation}</p>
              <div className="mt-4 flex items-start gap-2.5 rounded-lg bg-accent/50 p-3.5">
                <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Recomendado</p>
                  <p className="font-heading font-semibold">{g.recommended_tool}</p>
                </div>
              </div>
              {g.reasoning && (
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Por que usar</p>
                  <p className="text-sm leading-relaxed">{g.reasoning}</p>
                </div>
              )}
              {g.applies_to && (
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Em que se aplica</p>
                  <p className="text-sm leading-relaxed">{g.applies_to}</p>
                </div>
              )}
              {g.steps && (
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1.5">
                    <ListChecks className="h-3.5 w-3.5" /> Passos sugeridos
                  </p>
                  <ol className="text-sm leading-relaxed space-y-1 list-decimal list-inside">
                    {g.steps
                      .split("\n")
                      .filter((s) => s.trim())
                      .slice(0, 5)
                      .map((step, i) => (
                        <li key={i}>{step.replace(/^\d+[\.\)]\s*/, "")}</li>
                      ))}
                  </ol>
                </div>
              )}
              {g.references && Array.isArray(g.references) && g.references.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <ExternalLink className="h-3.5 w-3.5" /> Fontes externas
                  </p>
                  <ReferenceList references={g.references} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
