import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataService } from "@/services/dataService";
import { PlusCircle, Check, Wand2 } from "lucide-react";
import AttachmentUploader from "@/components/AttachmentUploader";
import ReferenceEditor from "@/components/ReferenceEditor";

const CATEGORIES = ["Metodologia", "Norma", "Ferramenta", "Indicador", "Processo", "Conceito"];

const empty = { title: "", category: "Ferramenta", origin: "", concept: "", when_to_use: "", how_to_apply: "", examples: "", contexts: "", where_i_used: "", tags: "", attachments: [], references: [] };

const TEMPLATE = {
  origin: "Origem:\n- Quem criou:\n- Quando:\n- Por quê (problema que resolveu):",
  concept: "Definição:\n\nPara que serve:\n\nPrincípio fundamental:",
  when_to_use: "1. Situação-gatilho 1\n2. Situação-gatilho 2\n3. Situação-gatilho 3",
  how_to_apply: "1. Primeiro passo:\n2. Segundo passo:\n3. Terceiro passo:\n4. Quarto passo:\n5. Quinto passo:",
  examples: "Exemplo 1:\n\nExemplo 2:",
  where_i_used: "Onde:\nQuando:\nResultado:",
};

export default function AddTheme() {
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (k, v) => setForm({ ...form, [k]: v });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
        contexts: form.contexts.split(",").map((s) => s.trim()).filter(Boolean),
      };
      const created = /* create mocked */
      setSaved(true);
      setTimeout(() => navigate(`/tema/${created.id}`), 600);
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { key: "origin", label: "Origem (quem/quando/por quê)", rows: 3, placeholder: "Quem criou, em que ano/década e o problema que resolveu." },
    { key: "concept", label: "Conceito *", rows: 4, placeholder: "Definição do tema, o que é e para que serve." },
    { key: "when_to_use", label: "Quando usar (situações-gatilho)", rows: 3, placeholder: "Situações em que esta ferramenta se aplica." },
    { key: "how_to_apply", label: "Como aplicar", rows: 4, placeholder: "Passo a passo ou orientações de uso." },
    { key: "examples", label: "Exemplos", rows: 3, placeholder: "Casos práticos e aplicações reais." },
    { key: "where_i_used", label: "Onde já usei", rows: 3, placeholder: "Registre onde e quando você aplicou este tema." },
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-12 md:py-16">
      <div className="inline-flex items-center gap-2 text-primary mb-3">
        <PlusCircle className="h-5 w-5" />
        <span className="text-xs uppercase tracking-wider font-medium">Novo tema</span>
      </div>
      <h1 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-2">Adicionar tema</h1>
      <p className="text-muted-foreground mb-8">Preencha a ficha padrão. Apenas o título e o conceito são obrigatórios.</p>

      <button
        type="button"
        onClick={() => setForm({ ...empty, ...TEMPLATE })}
        className="mb-6 inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
      >
        <Wand2 className="h-4 w-4" /> Usar template de 5 etapas
      </button>

      <form onSubmit={submit} className="space-y-5">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Título *</label>
          <input required value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Ex.: Diagrama de Ishikawa" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Categoria</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => set("category", c)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${form.category === c ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground hover:bg-accent"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        {fields.map((f) => (
          <div key={f.key}>
            <label className="text-sm font-medium mb-1.5 block">{f.label}</label>
            <textarea
              value={form[f.key]}
              onChange={(e) => set(f.key, e.target.value)}
              rows={f.rows}
              placeholder={f.placeholder}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
        ))}
        <div>
          <label className="text-sm font-medium mb-1.5 block">Anexos</label>
          <AttachmentUploader value={form.attachments || []} onChange={(v) => set("attachments", v)} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Fontes externas (para aprofundamento)</label>
          <ReferenceEditor value={form.references || []} onChange={(v) => set("references", v)} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Contextos de aplicação (separados por vírgula)</label>
          <input value={form.contexts} onChange={(e) => set("contexts", e.target.value)} placeholder="atendimento, vendas, e-commerce, projetos, risco" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Tags (separadas por vírgula)</label>
          <input value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="causa-raiz, melhoria, análise" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
        </div>
        <button
          type="submit"
          disabled={saving || saved}
          className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 disabled:opacity-50"
        >
          {saved ? (<><Check className="h-4 w-4" /> Salvo! Abrindo...</>) : saving ? "Salvando..." : "Salvar tema"}
        </button>
      </form>
    </div>
  );
}
