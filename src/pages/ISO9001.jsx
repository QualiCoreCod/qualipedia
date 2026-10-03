import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dataService } from "@/services/dataService";
import { ArrowLeft, Award, FileText, Upload, Loader2, X, Trash2, BookOpen, RefreshCw, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import ToolDiagram from "@/components/ToolDiagram";

const CLAUSES = [
  { id: "contexto", num: "4", title: "Contexto", description: "A organização precisa entender seu contexto interno e externo, identificar as partes interessadas e definir o escopo do sistema de gestão. Quem somos, para quem servimos, que fatores nos afetam.", points: ["Contexto da organização (fatores internos e externos)", "Partes interessadas (clientes, fornecedores, funcionários, sociedade)", "Escopo do sistema de gestão da qualidade"] },
  { id: "lideranca", num: "5", title: "Liderança", description: "A alta direção precisa demonstrar comprometimento com o sistema, estabelecer a política da qualidade e definir papéis e responsabilidades. A liderança não delega — participa ativamente.", points: ["Comprometimento da alta direção", "Política da qualidade", "Papéis, responsabilidades e responsabilidades da liderança"] },
  { id: "planejamento", num: "6", title: "Planejamento", description: "Identificar riscos e oportunidades, estabelecer objetivos da qualidade e planos para alcanç-los. É o pensamento baseado em riscos aplicado ao planejamento do sistema.", points: ["Ações para riscos e oportunidades", "Objetivos da qualidade e planos de ação", "Planejamento de mudanças"] },
  { id: "apoio", num: "7", title: "Apoio", description: "A base que sustenta o sistema: recursos, competências, conscientização, comunicação e informação documentada. Sem apoio, a operação não acontece de forma controlada.", points: ["Recursos (infraestrutura, ambiente, pessoas)", "Competências e conscientização", "Comunicação e informação documentada"] },
  { id: "operacao", num: "8", title: "Operação", description: "Onde o trabalho acontece: controle operacional, requisitos de produtos e serviços, projeto, produção e prestação. É a execução planejada e controlada dos processos.", points: ["Controle operacional", "Requisitos de produtos e serviços", "Projeto, produção e prestação", "Controle de processos e saídas não conformes"] },
  { id: "avaliacao", num: "9", title: "Avaliação de desempenho", description: "Verificar se o sistema está funcionando: monitoramento, medição, análise, auditoria interna e análise crítica pela direção. É a fase Check do PDCA aplicado à norma.", points: ["Monitoramento, medição e análise", "Auditoria interna", "Análise crítica pela direção"] },
  { id: "melhoria", num: "10", title: "Melhoria", description: "Tratar não conformidades, executar ações corretivas e promover melhoria contínua. O ciclo se fecha e recomeça, elevando o nível do sistema a cada volta.", points: ["Não conformidades e ações corretivas", "Melhoria contínua", "Adequação do sistema"] },
];

const PDCA_STEPS = [
  { phase: "Plan (Planejar)", clauses: "Cláusulas 4, 5, 6", desc: "Estabelecer o contexto, a liderança e o plano do sistema de gestão." },
  { phase: "Do (Executar)", clauses: "Cláusulas 7, 8", desc: "Apoiar a operação com recursos e executar o controle operacional." },
  { phase: "Check (Verificar)", clauses: "Cláusula 9", desc: "Avaliar desempenho com monitoramento, auditoria interna e análise crítica." },
  { phase: "Act (Agir)", clauses: "Cláusula 10", desc: "Tratar não conformidades, corrigir e promover melhoria contínua." },
];

const CERT_STEPS = [
  "Implantação do sistema de gestão conforme ISO 9001:2015",
  "Realização de auditoria interna para verificar conformidade",
  "Análise crítica pela direção: avaliar resultados e ajustar",
  "Seleção do organismo certificador credenciado",
  "Auditoria de certificação — Fase 1 (documental)",
  "Auditoria de certificação — Fase 2 (operacional)",
  "Emissão do certificado, válido por 3 anos",
  "Auditorias de manutenção anuais e recertificação a cada 3 anos",
];

const CLAUSE_OPTIONS = ["Geral", "Contexto", "Liderança", "Planejamento", "Apoio", "Operação", "Avaliação de desempenho", "Melhoria"];

export default function ISO9001() {
  const { isAuthenticated } = useAuth();
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newDoc, setNewDoc] = useState({ title: "", description: "", file_url: "", clause: "Geral" });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () =>
    dataService.listIsoDocuments().then((d) => {
      setDocs(d || []);
      setLoading(false);
    });

  useEffect(() => {
    load().catch(() => setLoading(false));
  }, []);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = { file_url: "" };
      setNewDoc((d) => ({ ...d, file_url, title: d.title || file.name }));
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      /* create mocked */
      setNewDoc({ title: "", description: "", file_url: "", clause: "Geral" });
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
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Início
      </Link>

      <div className="flex items-center gap-2 text-primary mb-3">
        <Award className="h-5 w-5" />
        <span className="text-xs uppercase tracking-wider font-medium">Norma</span>
      </div>
      <h1 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-3">ISO 9001:2015</h1>
      <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-12">
        A norma internacional de sistemas de gestão da qualidade. As sete cláusulas explicadas em linguagem prática,
        o ciclo PDCA aplicado à norma e o passo a passo da certificação.
      </p>

      {/* Cláusulas */}
      <section className="mb-14">
        <h2 className="font-heading text-xl font-semibold tracking-tight mb-1">As cláusulas da norma</h2>
        <p className="text-sm text-muted-foreground mb-6">Cada cláusula explicada em linguagem prática</p>
        <div className="space-y-4">
          {CLAUSES.map((c) => (
            <div key={c.id} id={c.id} className="rounded-2xl border border-border bg-card p-6 scroll-mt-20">
              <div className="flex items-center gap-3 mb-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/5 border border-primary/10 text-sm font-heading font-semibold text-primary shrink-0">
                  {c.num}
                </span>
                <h3 className="font-heading font-semibold text-lg">{c.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{c.description}</p>
              <ul className="space-y-1.5">
                {c.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Como a ISO funciona */}
      <section className="mb-14">
        <h2 className="font-heading text-xl font-semibold tracking-tight mb-1">Como a ISO funciona</h2>
        <p className="text-sm text-muted-foreground mb-6">O ciclo PDCA aplicado à norma, pensamento baseado em riscos e certificação</p>

        <div className="rounded-2xl border border-border bg-card p-6 mb-6">
          <h3 className="font-heading font-semibold text-base mb-4 flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-primary" /> Ciclo PDCA aplicado à norma
          </h3>
          <div className="space-y-3">
            {PDCA_STEPS.map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/5 border border-primary/10 text-xs font-semibold text-primary shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-sm">{s.phase} <span className="text-muted-foreground font-normal">— {s.clauses}</span></p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 mb-6">
          <h3 className="font-heading font-semibold text-base mb-3 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" /> Pensamento baseado em riscos
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A ISO 9001:2015 adota o pensamento baseado em riscos: em cada cláusula, a organização identifica riscos e oportunidades
            e planeja ações para tratá-los. Isso substitui a abordagem anterior de ações preventivas separadas — a prevenção agora
            está incorporada em todo o sistema, desde o planejamento (Cláusula 6) até a melhoria (Cláusula 10).
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-heading font-semibold text-base mb-4">Certificação passo a passo</h3>
          <ol className="space-y-2.5">
            {CERT_STEPS.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/5 border border-primary/10 text-xs font-semibold text-primary shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed pt-0.5">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PDCA diagram */}
      <section className="mb-14">
        <h2 className="font-heading text-sm uppercase tracking-wider font-semibold text-muted-foreground mb-4">Exemplo visual — PDCA</h2>
        <div className="rounded-xl border border-border bg-card p-6">
          <ToolDiagram tool="PDCA" />
        </div>
      </section>

      {/* Documentos */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-heading text-xl font-semibold tracking-tight mb-1">Documentos da ISO</h2>
            <p className="text-sm text-muted-foreground">Manual da qualidade, procedimentos e anexos</p>
          </div>
          {isAuthenticated && (
            <button
              onClick={() => setShowForm((s) => !s)}
              className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Upload className="h-4 w-4" /> Anexar documento
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6 mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold">Novo documento</h3>
              <button type="button" onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Título *</label>
                <input
                  required
                  value={newDoc.title}
                  onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="Ex.: Manual da Qualidade"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Cláusula relacionada</label>
                <select
                  value={newDoc.clause}
                  onChange={(e) => setNewDoc({ ...newDoc, clause: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  {CLAUSE_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Descrição</label>
              <textarea
                value={newDoc.description}
                onChange={(e) => setNewDoc({ ...newDoc, description: e.target.value })}
                rows={2}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Arquivo</label>
              {newDoc.file_url ? (
                <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-accent/40 px-3 py-2">
                  <span className="flex items-center gap-2 text-sm min-w-0">
                    <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{newDoc.title || "Documento"}</span>
                  </span>
                  <button type="button" onClick={() => setNewDoc({ ...newDoc, file_url: "" })} className="text-muted-foreground hover:text-destructive shrink-0">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="inline-flex items-center gap-2 rounded-lg border border-dashed border-border px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 cursor-pointer transition-colors">
                  {uploading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Enviando...</>
                  ) : (
                    <><Upload className="h-4 w-4" /> Selecionar arquivo (PDF, DOCX, XLSX)</>
                  )}
                  <input type="file" className="hidden" onChange={handleFile} accept=".pdf,.docx,.xlsx,.doc,.xls,.pptx,.ppt,.txt,.csv" disabled={uploading} />
                </label>
              )}
            </div>
            <button
              type="submit"
              disabled={saving || !newDoc.file_url}
              className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-50"
            >
              {saving ? "Salvando..." : "Salvar documento"}
            </button>
          </form>
        )}

        {loading ? (
          <div className="text-muted-foreground">Carregando documentos...</div>
        ) : docs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Nenhum documento anexado ainda.</p>
            {isAuthenticated && <p className="text-sm text-muted-foreground mt-1">Clique em "Anexar documento" para começar.</p>}
          </div>
        ) : (
          <div className="space-y-3">
            {docs.map((d) => (
              <div key={d.id} className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-sm transition-all">
                <a href={d.file_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 min-w-0 flex-1">
                  <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{d.title}</p>
                    {d.description && <p className="text-xs text-muted-foreground line-clamp-1">{d.description}</p>}
                  </div>
                </a>
                <div className="flex items-center gap-2 shrink-0">
                  {d.clause && d.clause !== "Geral" && (
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground border border-border rounded-full px-2 py-0.5">{d.clause}</span>
                  )}
                  {isAuthenticated && (
                    <button onClick={() => remove(d.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
