import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, BookOpen, Compass, FolderOpen, Search } from "lucide-react";

export default function SmartSearch({ themes = [], guides = [], materials = [] }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = input.trim().toLowerCase();
    if (!q) return;

    setLoading(true);
    setResults(null);

    setTimeout(() => {
      const words = q.split(/\s+/).filter((w) => w.length > 2);
      const matched = [];

      // Score themes
      (themes || []).forEach((t) => {
        let score = 0;
        const titleLower = (t.title || "").toLowerCase();
        const whenLower = (t.when_to_use || "").toLowerCase();
        const conceptLower = (t.concept || "").toLowerCase();
        const ctxStr = Array.isArray(t.contexts) ? t.contexts.join(" ").toLowerCase() : "";

        if (titleLower.includes(q)) score += 10;
        if (whenLower.includes(q)) score += 8;
        if (ctxStr.includes(q)) score += 7;
        if (conceptLower.includes(q)) score += 5;

        words.forEach((w) => {
          if (titleLower.includes(w)) score += 4;
          if (whenLower.includes(w)) score += 3;
          if (ctxStr.includes(w)) score += 3;
          if (conceptLower.includes(w)) score += 2;
        });

        if (score > 0) {
          const reason = t.when_to_use
            ? t.when_to_use.split("\n")[0].slice(0, 100)
            : `Recomendado para desafios em ${t.category || "gestão"}.`;
          matched.push({ id: t.id, type: "theme", title: t.title, reason, score });
        }
      });

      // Score guides
      (guides || []).forEach((g) => {
        let score = 0;
        const sitLower = (g.situation || "").toLowerCase();
        const toolLower = (g.recommended_tool || "").toLowerCase();
        const reasonLower = (g.reasoning || "").toLowerCase();

        if (sitLower.includes(q)) score += 10;
        if (toolLower.includes(q)) score += 8;
        if (reasonLower.includes(q)) score += 5;

        words.forEach((w) => {
          if (sitLower.includes(w)) score += 4;
          if (toolLower.includes(w)) score += 3;
          if (reasonLower.includes(w)) score += 2;
        });

        if (score > 0) {
          matched.push({
            id: g.id,
            type: "guide",
            title: g.recommended_tool,
            reason: g.reasoning ? g.reasoning.slice(0, 110) : g.situation,
            score,
          });
        }
      });

      // Score materials
      (materials || []).forEach((m) => {
        let score = 0;
        const titleLower = (m.title || "").toLowerCase();
        const descLower = (m.description || "").toLowerCase();
        const ctxStr = Array.isArray(m.contexts) ? m.contexts.join(" ").toLowerCase() : "";

        if (titleLower.includes(q)) score += 8;
        if (ctxStr.includes(q)) score += 6;
        if (descLower.includes(q)) score += 4;

        words.forEach((w) => {
          if (titleLower.includes(w)) score += 3;
          if (ctxStr.includes(w)) score += 3;
          if (descLower.includes(w)) score += 2;
        });

        if (score > 0) {
          matched.push({
            id: m.id,
            type: "material",
            title: m.title,
            reason: m.description ? m.description.slice(0, 100) : "Material prático e modelo de aplicação.",
            score,
          });
        }
      });

      matched.sort((a, b) => b.score - a.score);
      setResults(matched.slice(0, 8));
      setLoading(false);
    }, 150);
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
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Descreva sua situação ou problema... (ex.: 'atendimento com reclamações recorrentes')"
            className="w-full rounded-2xl border border-primary/20 bg-primary/5 pl-12 pr-28 py-4 text-base shadow-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            <Search className="h-4 w-4" />
            Buscar
          </button>
        </div>
      </form>

      {loading && (
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          Buscando ferramentas mais relevantes para sua situação...
        </div>
      )}

      {!loading && results && results.length === 0 && (
        <div className="mt-4 rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          Nenhum item relevante encontrado para essa descrição. Tente palavras-chave como "risco", "processo", "clientes" ou "auditoria".
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
