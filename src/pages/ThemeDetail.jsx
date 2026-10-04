import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { dataService } from "@/services/dataService";
import { ArrowLeft, BookOpen, Lightbulb, ListChecks, MapPin, Paperclip, FileText, History, HelpCircle, ExternalLink } from "lucide-react";
import ReferenceList from "@/components/ReferenceList";
import ToolDiagram from "@/components/ToolDiagram";

const DEPTHS = [
  { id: "resumo", label: "Resumo" },
  { id: "completa", label: "Ficha completa" },
  { id: "experiencia", label: "Experiência real" },
];

export default function ThemeDetail() {
  const { id } = useParams();
  const [theme, setTheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [depth, setDepth] = useState("completa");

  useEffect(() => {
    setLoading(true);
    dataService.getQualityTheme(id)
      .then((t) => {
        setTheme(t);
        setLoading(false);
      })
      .catch(() => {
        setTheme(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="max-w-3xl mx-auto px-6 py-16 text-muted-foreground">Carregando ficha...</div>;
  }

  if (!theme) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-muted-foreground text-lg mb-2">Ficha não encontrada.</p>
        <Link to="/enciclopedia" className="text-primary hover:underline inline-block">
          Voltar à enciclopédia
        </Link>
      </div>
    );
  }

  const allSections = [
    { key: "origin", label: "Origem", icon: History },
    { key: "concept", label: "Conceito", icon: BookOpen },
    { key: "when_to_use", label: "Quando usar", icon: HelpCircle, list: true },
    { key: "how_to_apply", label: "Como aplicar", icon: ListChecks, list: true, numbered: true },
    { key: "examples", label: "Exemplos", icon: Lightbulb },
    { key: "where_i_used", label: "Onde já apliquei", icon: MapPin },
  ];

  const visibleSections =
    depth === "resumo"
      ? allSections.filter((s) => s.key === "concept")
      : depth === "experiencia"
      ? allSections.filter((s) => s.key === "where_i_used")
      : allSections;

  const toLines = (text) =>
    (text || "")
      .split("\n")
      .map((l) => l.replace(/^[-•\d.)]+\s*/, "").trim())
      .filter(Boolean);

  const tags = Array.isArray(theme.tags) ? theme.tags : [];
  const contexts = Array.isArray(theme.contexts) ? theme.contexts : [];
  const references = Array.isArray(theme.references) ? theme.references : [];
  const attachments = Array.isArray(theme.attachments) ? theme.attachments : [];

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-12 md:py-16">
      <Link
        to="/enciclopedia"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Enciclopédia
      </Link>

      <div className="flex items-center justify-between gap-4 mb-6">
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground border border-border rounded-full px-2.5 py-1">
          {theme.category}
        </span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-3">
        {theme.title}
      </h1>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="text-xs text-muted-foreground bg-accent rounded-full px-2.5 py-1">
              {tag}
            </span>
          ))}
        </div>
      )}

      {contexts.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          {contexts.map((ctx) => (
            <span
              key={ctx}
              className="text-xs font-medium text-primary border border-primary/20 bg-primary/5 rounded-full px-2.5 py-1"
            >
              {ctx}
            </span>
          ))}
        </div>
      )}

      {/* Depth selector */}
      <div className="flex gap-1 mb-8 border-b border-border">
        {DEPTHS.map((d) => (
          <button
            key={d.id}
            onClick={() => setDepth(d.id)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              depth === d.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Sections based on depth */}
      <div className="space-y-8">
        {visibleSections.map((s) => {
          const val = theme[s.key];
          const Icon = s.icon;
          const lines = s.list && val ? toLines(val) : [];
          const useList = s.list && lines.length > 1;

          return (
            <section key={s.key} className={val ? "" : "opacity-40"}>
              <h2 className="flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-muted-foreground mb-2.5">
                <Icon className="h-4 w-4" /> {s.label}
              </h2>
              {val ? (
                useList ? (
                  s.numbered ? (
                    <ol className="space-y-2.5">
                      {lines.map((line, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-[15px] leading-relaxed pt-0.5">{line}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <ul className="space-y-2">
                      {lines.map((line, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          <span className="text-[15px] leading-relaxed">{line}</span>
                        </li>
                      ))}
                    </ul>
                  )
                ) : (
                  <p className="text-[15px] leading-relaxed whitespace-pre-line">{val}</p>
                )
              ) : (
                <p className="text-sm text-muted-foreground italic">Não preenchido.</p>
              )}
            </section>
          );
        })}
      </div>

      {/* Technical diagram (only on full depth) */}
      {depth === "completa" && <ToolDiagram tool={theme.title} />}

      {/* References (only on full depth) */}
      {depth === "completa" && references.length > 0 && (
        <section className="mt-8">
          <h2 className="flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-muted-foreground mb-3">
            <ExternalLink className="h-4 w-4" /> Fontes externas
          </h2>
          <ReferenceList references={references} />
        </section>
      )}

      {/* Attachments (on full and experiencia) */}
      {depth !== "resumo" && attachments.length > 0 && (
        <section className="mt-8">
          <h2 className="flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-muted-foreground mb-3">
            <Paperclip className="h-4 w-4" /> Anexos
          </h2>
          <div className="space-y-2">
            {attachments.map((att, i) => (
              <a
                key={i}
                href={att.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3 text-sm hover:border-primary/40 hover:shadow-sm transition-all"
              >
                <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="truncate">{att.name}</span>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
