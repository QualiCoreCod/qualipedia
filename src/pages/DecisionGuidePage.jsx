import React, { useState, useEffect } from "react";
import { dataService } from "@/services/dataService";
import { Compass, Plus, Lightbulb, ListChecks, X, ExternalLink } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import ReferenceList from "@/components/ReferenceList";
import ReferenceEditor from "@/components/ReferenceEditor";

const CATEGORIES = ["Análise de causa", "Planejamento", "Controle", "Melhoria", "Auditoria", "Indicadores"];

export default function DecisionGuidePage() {
  const { isAuthenticated } = useAuth();
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ situation: "", recommended_tool: "", reasoning: "", applies_to: "", steps: "", category: "Melhoria", references: [] });
  const [saving, setSaving] = useState(false);

  const load = () =>
    dataService.listDecisionGuides().then((g) => {
      setGuides(g || []);
      setLoading(false);
    });

  useEffect(() => {
    load().catch(() => setLoading(false));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      /* create mocked */
      setForm({ situation: "", recommended_tool: "", reasoning: "", applies_to: "", steps: "", category: "Melhoria", references: [] });
      setShowForm(false);
      await load();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    /* delete mocked */
    load();
  };

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-12 md:py-16">
      <div className="flex items-start justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 text-primary mb-3">
            <Compass className="h-5 w-5" />
            <span className="text-xs uppercase tracking-wider font-medium">Guia de decisão</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-3">Qual ferramenta usar?</h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Para cada situação-problema, uma ferramenta recomendada. Consulte o raciocínio e os passos
            sugeridos para aplicar a melhor abordagem.
          </p>
        </div>
        {isAuthenticated && (
          <button
            onClick={() => setShowForm((s) => !s)}
            className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" /> Nova situação
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6 mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold">Nova situação-problema</h3>
            <button type="button" onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Situação-problema *</label>
            <textarea
              required
              value={form.situation}
              onChange={(e) => setForm({ ...form, situation: e.target.value })}
              rows={2}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              placeholder="Ex.: Preciso identificar a causa raiz de um problema recorrente"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Ferramenta recomendada *</label>
              <input
                required
                value={form.recommended_tool}
                onChange={(e) => setForm({ ...form, recommended_tool: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                placeholder="Ex.: Diagrama de Ishikawa"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Categoria</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Por que usar</label>
            <textarea
              value={form.reasoning}
              onChange={(e) => setForm({ ...form, reasoning: e.target.value })}
              rows={2}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Em que se aplica (contextos/setores)</label>
            <textarea
              value={form.applies_to}
              onChange={(e) => setForm({ ...form, applies_to: e.target.value })}
              rows={2}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              placeholder="Ex.: indústria, serviços, projetos, atendimento"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Passos sugeridos (máx. 5, um por linha)</label>
            <textarea
              value={form.steps}
              onChange={(e) => setForm({ ...form, steps: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Fontes externas (para aprofundamento)</label>
            <ReferenceEditor value={form.references || []} onChange={(v) => setForm({ ...form, references: v })} />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar situação"}
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-muted-foreground">Carregando...</div>
      ) : guides.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <Compass className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Nenhuma situação cadastrada ainda.</p>
          <p className="text-sm text-muted-foreground mt-1">Clique em "Nova situação" para começar.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {guides.map((g) => (
            <div key={g.id} className="group rounded-2xl border border-border bg-card p-6 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between gap-4">
                <span className="text-[11px] uppercase tracking-wide text-muted-foreground border border-border rounded-full px-2.5 py-1 shrink-0">
                  {g.category}
                </span>
                {isAuthenticated && (
                  <button
                    onClick={() => remove(g.id)}
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
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
                    {g.steps.split("\n").filter((s) => s.trim()).slice(0, 5).map((step, i) => (
                      <li key={i}>{step.replace(/^\d+[\.\)]\s*/, "")}</li>
                    ))}
                  </ol>
                </div>
              )}
              {g.references?.length > 0 && (
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
