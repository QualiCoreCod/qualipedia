import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dataService } from "@/services/dataService";
import { BookOpen, Search, ArrowRight } from "lucide-react";

const CATEGORIES = ["Metodologia", "Norma", "Ferramenta", "Indicador", "Processo", "Conceito"];

export default function Encyclopedia() {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("Todas");

  useEffect(() => {
    dataService.listQualityThemes().then((t) => {
      setThemes(t || []);
      setLoading(false);
    });
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = themes.filter((t) => {
    const matchCat = cat === "Todas" || t.category === cat;
    const matchQ = !q || [t.title, t.category, t.concept, t.how_to_apply, t.examples, t.where_i_used, t.origin, t.when_to_use, ...(t.tags || []), ...(t.contexts || [])].some((field) => field?.toLowerCase().includes(q));
    return matchCat && matchQ;
  });

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-primary mb-3">
            <BookOpen className="h-5 w-5" />
            <span className="text-xs uppercase tracking-wider font-medium">Enciclopédia</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-2">Temas de qualidade</h1>
          <p className="text-muted-foreground">Fichas completas: conceito, como aplicar, exemplos e onde já usei.</p>
        </div>
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar tema ou tag..."
          className="w-full rounded-xl border border-border bg-card pl-11 pr-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {["Todas", ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
              cat === c ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-muted-foreground">Carregando...</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Nenhum tema encontrado.</p>
          <Link to="/adicionar" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary mt-3 hover:underline">
            Adicionar primeiro tema <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((t) => (
            <Link
              key={t.id}
              to={`/tema/${t.id}`}
              className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-sm transition-all flex flex-col"
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-[11px] uppercase tracking-wide text-muted-foreground border border-border rounded-full px-2.5 py-1">
                  {t.category}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2 group-hover:text-primary transition-colors">{t.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">{t.concept}</p>
              {t.contexts?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {t.contexts.slice(0, 5).map((ctx) => (
                    <span key={ctx} className="text-[11px] font-medium text-primary border border-primary/20 bg-primary/5 rounded-full px-2 py-0.5">
                      {ctx}
                    </span>
                  ))}
                </div>
              )}
              {t.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {t.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="text-[11px] text-muted-foreground bg-accent rounded-full px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
