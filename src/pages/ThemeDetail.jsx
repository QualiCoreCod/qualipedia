import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { dataService } from "@/services/dataService";
import { ArrowLeft, BookOpen, Lightbulb, ListChecks, ClipboardList, MapPin, Trash2, Pencil, Paperclip, FileText, History, HelpCircle, ExternalLink } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import AttachmentUploader from "@/components/AttachmentUploader";
import ReferenceList from "@/components/ReferenceList";
import ReferenceEditor from "@/components/ReferenceEditor";
import ToolDiagram from "@/components/ToolDiagram";

const DEPTHS = [
  { id: "resumo", label: "Resumo" },
  { id: "completa", label: "Ficha completa" },
  { id: "experiencia", label: "Experiência real" },
];

export default function ThemeDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [depth, setDepth] = useState("completa");

  const load = () =>
    base44.entities.QualityTheme.get(id).then((t) => {
      setTheme(t);
      setForm(t);
      setLoading(false);
    });

  useEffect(() => {
    load().catch(() => setLoading(false));
  }, [id]);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await base44.entities.QualityTheme.update(id, {
        title: form.title, category: form.category, origin: form.origin, concept: form.concept,
        when_to_use: form.when_to_use, how_to_apply: form.how_to_apply, examples: form.examples,
        contexts: form.contexts || [], where_i_used: form.where_i_used, tags: form.tags,
        attachments: form.attachments || [], references: form.references || [],
      });
      setEditing(false);
      await load();
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    await base44.entities.QualityTheme.delete(id);
    navigate("/enciclopedia");
  };

  if (loading) return <div className="max-w-3xl mx-auto px-6 py-16 text-muted-foreground">Carregando...</div>;
  if (!theme) return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <p className="text-muted-foreground">Ficha não encontrada.</p>
      <Link to="/enciclopedia" className="text-primary hover:underline mt-2 inline-block">Voltar à enciclopédia</Link>
    </div>
  );

  if (editing) {
    return (
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading text-2xl font-semibold">Editar ficha</h1>
          <button onClick={() => setEditing(false)} className="text-sm text-muted-foreground hover:text-foreground">Cancelar</button>
        </div>
        <form onSubmit={save} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Título *</label>
            <input required value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Categoria</label>
            <select value={form.category || "Ferramenta"} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
              {["Metodologia", "Norma", "Ferramenta", "Indicador", "Processo", "Conceito"].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Origem (quem/quando/por quê)</label>
            <textarea value={form.origin || ""} onChange={(e) => setForm({ ...form, origin: e.target.value })} rows={3} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Conceito *</label>
            <textarea required value={form.concept || ""} onChange={(e) => setForm({ ...form, concept: e.target.value })} rows={4} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Quando usar (situações-gatilho)</label>
            <textarea value={form.when_to_use || ""} onChange={(e) => setForm({ ...form, when_to_use: e.target.value })} rows={3} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Como aplicar</label>
            <textarea value={form.how_to_apply || ""} onChange={(e) => setForm({ ...form, how_to_apply: e.target.value })} rows={4} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Exemplos</label>
            <textarea value={form.examples || ""} onChange={(e) => setForm({ ...form, examples: e.target.value })} rows={4} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Contextos de aplicação (separados por vírgula)</label>
            <input value={(form.contexts || []).join(", ")} onChange={(e) => setForm({ ...form, contexts: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} placeholder="indústria, atendimento, projetos, risco" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Onde já apliquei</label>
            <textarea value={form.where_i_used || ""} onChange={(e) => setForm({ ...form, where_i_used: e.target.value })} rows={4} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Anexos</label>
            <AttachmentUploader value={form.attachments || []} onChange={(v) => setForm({ ...form, attachments: v })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Fontes externas (para aprofundamento)</label>
            <ReferenceEditor value={form.references || []} onChange={(v) => setForm({ ...form, references: v })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Tags (separadas por vírgula)</label>
            <input value={(form.tags || []).join(", ")} onChange={(e) => setForm({ ...form, tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-50">
            {saving ? "Salvando..." : "Salvar alterações"}
          </button>
        </form>
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

  const visibleSections = depth === "resumo"
    ? allSections.filter((s) => s.key === "concept")
    : depth === "experiencia"
    ? allSections.filter((s) => s.key === "where_i_used")
    : allSections;

  const toLines = (text) => (text || "").split("\n").map((l) => l.replace(/^[-•\d.\)]+\s*/, "").trim()).filter(Boolean);

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-12 md:py-16">
      <Link to="/enciclopedia" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Enciclopédia
      </Link>

      <div className="flex items-center justify-between gap-4 mb-6">
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground border border-border rounded-full px-2.5 py-1">{theme.category}</span>
        {isAuthenticated && (
          <div className="flex items-center gap-2">
            <button onClick={() => setEditing(true)} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg px-3 py-1.5 hover:bg-accent transition-colors">
              <Pencil className="h-3.5 w-3.5" /> Editar
            </button>
            <button onClick={remove} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive border border-border rounded-lg px-3 py-1.5 hover:bg-accent transition-colors">
              <Trash2 className="h-3.5 w-3.5" /> Excluir
            </button>
          </div>
        )}
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-3">{theme.title}</h1>
      {theme.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {theme.tags.map((tag) => <span key={tag} className="text-xs text-muted-foreground bg-accent rounded-full px-2.5 py-1">{tag}</span>)}
        </div>
      )}
      {theme.contexts?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          {theme.contexts.map((ctx) => <span key={ctx} className="text-xs font-medium text-primary border border-primary/20 bg-primary/5 rounded-full px-2.5 py-1">{ctx}</span>)}
        </div>
      )}

      {/* Depth selector */}
      <div className="flex gap-1 mb-8 border-b border-border">
        {DEPTHS.map((d) => (
          <button
            key={d.id}
            onClick={() => setDepth(d.id)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${depth === d.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
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
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold mt-0.5">{i + 1}</span>
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
      {depth === "completa" && theme.references?.length > 0 && (
        <section className="mt-8">
          <h2 className="flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-muted-foreground mb-3">
            <ExternalLink className="h-4 w-4" /> Fontes externas
          </h2>
          <ReferenceList references={theme.references} />
        </section>
      )}

      {/* Attachments (on full and experiencia) */}
      {depth !== "resumo" && theme.attachments?.length > 0 && (
        <section className="mt-8">
          <h2 className="flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-muted-foreground mb-3">
            <Paperclip className="h-4 w-4" /> Anexos
          </h2>
          <div className="space-y-2">
            {theme.attachments.map((att, i) => (
              <a key={i} href={att.url} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3 text-sm hover:border-primary/40 hover:shadow-sm transition-all">
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
