import React, { useState } from "react";
import { Link } from "react-router-dom";
import { dataService } from "@/services/dataService";
import { Sparkles, Loader2, ArrowRight, BookOpen, Compass, FolderOpen, Search } from "lucide-react";

export default function SmartSearch({ themes = [], guides = [], materials = [] }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const buildCatalog = () => {
    const items = [];
    themes.forEach((t, i) => {
      items.push({
        ref: `T${i + 1}`,
        id: t.id,
        type: "theme",
        title: t.title,
        label: `T${i + 1}: ${t.title} | Contextos: ${(t.contexts || []).join(", ")} | Quando usar: ${(t.when_to_use || "").slice(0, 150)}`,
      });
    });
    guides.forEach((g, i) => {
      items.push({
        ref: `G${i + 1}`,
        id: g.id,
        type: "guide",
        title: g.recommended_tool,
        label: `G${i + 1}: "${(g.situation || "").slice(0, 120)}" → ${g.recommended_tool} | ${g.category}`,
      });
    });
    materials.forEach((m, i) => {
      items.push({
        ref: `M${i + 1}`,
        id: m.id,
        type: "material",
        title: m.title,
        label: `M${i + 1}: ${m.title} | Contextos: ${(m.contexts || []).join(", ")}`,
      });
    });
    return items;
  };

  const fallbackSearch = () => {
    const q = input.trim().toLowerCase();
    const matched = [];
    themes.forEach((t) => {
      if ([t.title, t.concept, t.when_to_use, ...(t.contexts || []), ...(t.tags || [])].some((f) => f?.toLowerCase().includes(q))) {
        matched.push({ id: t.id, type: "theme", title: t.title, reason: "correspondência por palavra-chave" });
      }
    });
    guides.forEach((g) => {
      if ([g.situation, g.recommended_tool, g.reasoning].some((f) => f?.toLowerCase().includes(q))) {
        matched.push({ id: g.id, type: "guide", title: g.recommended_tool, reason: "correspondência por palavra-chave" });
      }
    });
    materials.forEach((m) => {
      if ([m.title, m.description, ...(m.contexts || [])].some((f) => f?.toLowerCase().includes(q))) {
        matched.push({ id: m.id, type: "material", title: m.title, reason: "correspondência por palavra-chave" });
      }
    });
    setResults(matched.slice(0, 8));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setResults(null);
    try {
      const items = buildCatalog();
      const catalog = items.map((it) => it.label).join("\n");

      const prompt = `Você é um consultor especialista em gestão da qualidade. O usuário descreveu a seguinte situação ou problema:

"${input}"

Abaixo está a base de conhecimento disponível (fichas da enciclopédia, situações do guia de decisão e materiais do acervo). Selecione os 5 a 8 itens MAIS relevantes para resolver o problema descrito. Para cada item, dê UMA frase curta (máximo 15 palavras) explicando por que ele ajuda.

BASE DE CONHECIMENTO:
${catalog}

REGRAS:
- Selecione APENAS itens que existem na lista acima (use o código exato: T1, G1, M1, etc.)
- Priorize itens cujos contextos de aplicação correspondam ao problema do usuário
- Não invente ferramentas ou itens que não estão na lista
- Retorne entre 5 e 8 itens, ordenados por relevância (mais relevante primeiro)`;

      const res = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  ref: { type: "string" },
                  reason: { type: "string" },
                },
                required: ["ref", "reason"],
              },
            },
          },
          required: ["results"],
        },
      });

      const matched = (res.results || [])
        .map((r) => {
          const item = items.find((it) => it.ref === r.ref);
          if (!item) return null;
          return { ...item, reason: r.reason };
        })
        .filter(Boolean);

      if (matched.length > 0) {
        setResults(matched);
      } else {
        fallbackSearch();
      }
    } catch (err) {
      fallbackSearch();
    } finally {
      setLoading(false);
    }
  };

  const linkFor = (r) => {
    if (r.type === "theme") return `/tema/${r.id}`;
    if (r.type === "guide") return "/decisao";
    return "/acervo";
  };

  const iconFor = (r) => {
    if (r.type === "theme") return BookOpen;
    if (r.type === "guide") return Compass;
    return FolderOpen;
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Descreva sua situação ou problema... (ex.: 'trabalho com atendimento e quero melhorar a qualidade')"
            className="w-full rounded-2xl border border-primary/20 bg-primary/5 pl-12 pr-28 py-4 text-base shadow-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            {loading ? "Analisando..." : "Buscar"}
          </button>
        </div>
      </form>

      {loading && (
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Analisando sua situação e buscando as ferramentas mais relevantes...
        </div>
      )}

      {!loading && results && results.length === 0 && (
        <div className="mt-4 rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          Nenhum item relevante encontrado. Tente descrever com mais detalhes ou use a busca por palavra-chave abaixo.
        </div>
      )}

      {!loading && results && results.length > 0 && (
        <div className="mt-5">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            {results.length} recomendação(ões) para sua situação:
          </p>
          <div className="grid gap-3">
            {results.map((r, i) => {
              const Icon = iconFor(r);
              return (
                <Link
                  key={i}
                  to={linkFor(r)}
                  className="group rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 border border-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading font-semibold group-hover:text-primary transition-colors">{r.title}</h4>
                        <span className="text-[10px] uppercase tracking-wide text-muted-foreground border border-border rounded-full px-1.5 py-0.5">
                          {r.type === "theme" ? "Ficha" : r.type === "guide" ? "Guia" : "Acervo"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{r.reason}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
