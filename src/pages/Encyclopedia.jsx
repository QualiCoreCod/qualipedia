import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { dataService } from "@/services/dataService";
import { BookOpen, Search, ArrowRight, Tag, Layers, Wrench, Clock } from "lucide-react";

const CATEGORIES = ["Todas", "Ferramenta", "Metodologia", "Norma", "Indicador", "Processo", "Conceito"];

export default function Encyclopedia() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = searchParams.get("q") || "";
  const catParam = searchParams.get("categoria") || "Todas";

  useEffect(() => {
    dataService.listQualityThemes().then((t) => {
      setThemes(t || []);
      setLoading(false);
    });
  }, []);

  const handleQueryChange = (val) => {
    const params = new URLSearchParams(searchParams);
    if (val) params.set("q", val);
    else params.delete("q");
    setSearchParams(params);
  };

  const handleCatChange = (c) => {
    const params = new URLSearchParams(searchParams);
    if (c === "Todas") params.delete("categoria");
    else params.set("categoria", c);
    setSearchParams(params);
  };

  const q = query.trim().toLowerCase();
  const filtered = themes.filter((t) => {
    const matchCat = catParam === "Todas" || t.category === catParam;
    const matchQ =
      !q ||
      [
        t.title,
        t.category,
        t.concept,
        t.how_to_apply,
        t.examples,
        t.where_i_used,
        t.origin,
        t.when_to_use,
        ...(t.tags || []),
        ...(t.contexts || [])
      ].some((field) => field?.toLowerCase().includes(q));
    return matchCat && matchQ;
  });

  return (
    <div className="w-full bg-slate-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header da Enciclopédia */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-destaque rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="h-4 w-4" /> Catálogo Técnico Completo
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Enciclopédia da Qualidade
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-3xl leading-relaxed">
            Consulte {themes.length > 0 ? `${themes.length} ` : ""}fichas técnicas detalhadas com conceitos, contexto de aplicação, metodologia passo a passo, exemplos práticos e cenários fictícios de aplicação e referências bibliográficas.
          </p>
        </div>

        {/* Barra de Filtros e Busca */}
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Buscar por nome da ferramenta, sigla, contexto (ex.: 'atendimento', 'risco', 'pareto')..."
              className="w-full h-13 rounded-xl border-2 border-slate-200 bg-slate-50 pl-12 pr-4 text-base text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-destaque focus:bg-white focus:ring-4 focus:ring-destaque/10"
            />
          </div>

          {/* Categorias Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
              Filtrar:
            </span>
            {CATEGORIES.map((c) => {
              const isSelected = catParam === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleCatChange(c)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-sm"
                      : "border-2 border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* Contador de Resultados */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-semibold text-slate-700">
            Exibindo <strong>{filtered.length}</strong> temas documentados
            {catParam !== "Todas" && ` em ${catParam}`}
            {query && ` para "${query}"`}
          </span>
        </div>

        {/* Grid de Fichas */}
        {loading ? (
          <div className="py-20 text-center text-slate-500 font-medium">
            Carregando enciclopédia...
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
            <p className="text-slate-700 font-bold text-lg mb-1">
              Nenhum tema encontrado para os filtros selecionados.
            </p>
            <p className="text-slate-500 text-sm mb-4">
              Tente buscar por termos mais genéricos como "processo", "risco" ou "melhoria".
            </p>
            <button
              onClick={() => {
                setSearchParams({});
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-5 py-2.5 text-xs font-bold hover:bg-destaque transition-colors"
            >
              Limpar todos os filtros
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t) => (
              <Link
                key={t.id}
                to={`/tema/${t.id}`}
                className="group flex flex-col rounded-2xl border-2 border-slate-200 bg-white p-6 hover:border-destaque hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-destaque bg-blue-50 border border-blue-200 rounded-md px-2.5 py-0.5">
                    {t.category}
                  </span>
                  {Array.isArray(t.contexts) && t.contexts[0] && (
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 rounded px-2 py-0.5">
                      {t.contexts[0]}
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-destaque transition-colors mb-2">
                  {t.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {t.concept}
                </p>

                {t.when_to_use && (
                  <div className="mt-auto pt-3 border-t border-slate-100 mb-4">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                      Quando usar:
                    </span>
                    <p className="text-xs text-slate-700 italic line-clamp-2">
                      {t.when_to_use}
                    </p>
                  </div>
                )}

                <div className="inline-flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-destaque transition-colors mt-auto">
                  <span>Ver ficha técnica completa</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
