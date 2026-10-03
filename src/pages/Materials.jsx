import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dataService } from "@/services/dataService";
import { FolderOpen, FileText, ArrowRight, Lock, TrendingUp, Award } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import AcervoSection from "@/components/AcervoSection";
import AdminOnly from "@/components/AdminOnly";

const PDCA_STEPS = [
  { phase: "PLAN", title: "Diagnóstico do cenário", desc: "Identificação da ausência de governança, subjetividade nas análises, falta de rastreabilidade das avaliações e ausência de indicadores de experiência do cliente." },
  { phase: "DO", title: "Execução", desc: "Criação dos pilares avaliativos, desenvolvimento do IEPC, implantação das monitorias QA, criação dos dashboards e estruturação do sistema de governança operacional." },
  { phase: "CHECK", title: "Verificação contínua", desc: "Acompanhamento via dashboards, indicadores, monitorias e avaliações de desempenho dos atendentes e dos processos." },
  { phase: "ACT", title: "Ajuste contínuo", desc: "Revisão de critérios, fluxos e metodologias, buscando maior aderência e melhoria contínua do sistema." },
];

const QA_PILLARS = [
  { name: "Gestão do Fluxo e Rastreabilidade", definition: "Organização operacional do atendimento, rastreabilidade das informações, aderência aos fluxos internos.", weight: 22 },
  { name: "Gestão da Tratativa da Demanda", definition: "Condução do atendimento, entendimento da necessidade do cliente, direcionamento adequado.", weight: 34 },
  { name: "Análise e Assertividade Técnica", definition: "Qualidade técnica, assertividade das ações, coerência das tratativas.", weight: 18 },
  { name: "Qualidade da Comunicação", definition: "Clareza das informações, capacidade de orientação, qualidade da comunicação.", weight: 14 },
  { name: "Conduta Relacional", definition: "Postura profissional, cordialidade, empatia, relacionamento com o cliente.", weight: 12 },
];

const IEPC_PILLARS = [
  { name: "Resolução Percebida", definition: "Sensação de resolução da demanda pelo cliente." },
  { name: "Compreensão e Segurança Percebida", definition: "Clareza das informações e segurança transmitida durante o atendimento." },
  { name: "Esforço Percebido pelo Cliente", definition: "Nível de esforço exigido do cliente para obter a solução." },
  { name: "Tempo e Fluidez", definition: "Agilidade e ausência de atritos na interação." },
  { name: "Experiência Relacional", definition: "Empatia, cordialidade e percepção humana da experiência." },
];

const NC_CATEGORIES = [
  { name: "Conformidade de Registro e Rastreabilidade", penalty: -20, occurrences: 61 },
  { name: "Integridade do Fluxo Operacional", penalty: -20, occurrences: 21 },
  { name: "Acuracidade e Rigor Técnico", penalty: -20, occurrences: 12 },
  { name: "Segurança da Informação", penalty: -20, occurrences: 3 },
];

const QUALITATIVE_RESULTS = [
  "Maior padronização operacional",
  "Aumento da rastreabilidade das avaliações",
  "Melhoria na visibilidade gerencial",
  "Acompanhamento mais estratégico dos indicadores",
  "Fortalecimento da governança da qualidade",
  "Melhoria nos processos de feedback e desenvolvimento das equipes",
  "Maior capacidade de identificação de gargalos",
  "Integração entre qualidade, operação e liderança",
  "Fortalecimento da cultura de melhoria contínua",
  "Evolução da análise de experiência do cliente",
];

const QUANTITATIVE_RESULTS = [
  { label: "Evolução do índice QA", value: "75,0 → 83,8 pontos" },
  { label: "Evolução do IEPC", value: "76,8 → 85,0" },
  { label: "Avaliações realizadas", value: "175" },
  { label: "Elogios registrados", value: "112" },
  { label: "Não conformidades registradas", value: "119" },
];

function PillarCard({ pillar, showWeight }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between gap-2 mb-2">
        <h4 className="font-heading font-semibold text-sm">{pillar.name}</h4>
        {showWeight && pillar.weight && (
          <span className="text-xs font-medium text-primary border border-primary/20 bg-primary/5 rounded-full px-2 py-0.5 shrink-0">{pillar.weight} pts</span>
        )}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{pillar.definition}</p>
    </div>
  );
}

export default function Materials() {
  const { isAuthenticated } = useAuth();
  const [docs, setDocs] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(true);

  useEffect(() => {
    dataService.listIsoDocuments()
      .then((d) => { setDocs(d || []); setLoadingDocs(false); })
      .catch(() => setLoadingDocs(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-12 md:py-16">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowRight className="h-4 w-4 rotate-180" /> Início
      </Link>

      <div className="flex items-center gap-2 text-primary mb-3">
        <FolderOpen className="h-5 w-5" />
        <span className="text-xs uppercase tracking-wider font-medium">Acervo pessoal</span>
      </div>
      <h1 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-3">
        Aplicação prática da gestão da qualidade
      </h1>
      <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-12">
        Como a governança da qualidade foi estruturada e aplicada em uma operação real de suporte técnico.
      </p>

      {/* 1. Contexto do projeto */}
      <AcervoSection id="contexto" num="1" title="Contexto do projeto">
        <p className="text-[15px] leading-relaxed mb-4">
          Implantação da governança da qualidade em uma operação de suporte técnico, com início em janeiro de 2026.
        </p>
        <div className="rounded-xl border border-border bg-accent/30 p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Antes da implantação</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground shrink-0" /> Avaliações subjetivas, sem critérios padronizados</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground shrink-0" /> Sem rastreabilidade das análises</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground shrink-0" /> Sem indicadores de experiência do cliente</li>
          </ul>
        </div>
        <p className="text-[15px] leading-relaxed mt-4">
          <span className="font-medium">Objetivo:</span> estruturar processos, indicadores, monitorias e métricas orientadas por dados.
        </p>
      </AcervoSection>

      {/* 2. Como usei o PDCA */}
      <AcervoSection id="pdca" num="2" title="Como usei o PDCA" subtitle="Aplicação real do ciclo, não apenas a definição teórica">
        <div className="space-y-4">
          {PDCA_STEPS.map((s, i) => (
            <div key={i} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
              <div className="flex flex-col items-center shrink-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-heading font-semibold">
                  {s.phase}
                </span>
                {i < PDCA_STEPS.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm mb-1">{s.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </AcervoSection>

      {/* 3. Metodologia de qualidade criada */}
      <AcervoSection id="metodologia" num="3" title="Metodologia de qualidade criada">
        <p className="text-[15px] leading-relaxed">
          Metodologia própria criada para estruturar a qualidade no atendimento ao cliente, combinando avaliação técnica (QA)
          e percepção do cliente (IEPC), com gestão de não conformidades e reconhecimento por elogios.
        </p>
      </AcervoSection>

      {/* 4. Sistema de avaliação de qualidade (QA) */}
      <AcervoSection id="qa" num="4" title="Sistema de avaliação de qualidade (QA)" subtitle="5 pilares avaliativos">
        <div className="grid md:grid-cols-2 gap-3">
          {QA_PILLARS.map((p) => (
            <PillarCard key={p.name} pillar={p} showWeight={isAuthenticated} />
          ))}
        </div>
        <AdminOnly label="Pesos e pontuação de cada pilar visíveis apenas para a administradora">
          <p className="text-xs text-muted-foreground mt-3">Soma total: 100 pontos</p>
        </AdminOnly>
      </AcervoSection>

      {/* 5. IEPC */}
      <AcervoSection id="iepc" num="5" title="IEPC — Índice de Experiência Percebida pelo Cliente" subtitle="5 pilares de percepção">
        <div className="grid md:grid-cols-2 gap-3">
          {IEPC_PILLARS.map((p) => (
            <PillarCard key={p.name} pillar={p} showWeight={false} />
          ))}
        </div>
      </AcervoSection>

      {/* 6. Gestão de não conformidades */}
      <AcervoSection id="nc" num="6" title="Gestão de não conformidades">
        <p className="text-[15px] leading-relaxed mb-4">
          Fluxo estruturado de identificação, tratamento e prevenção de desvios no atendimento, com categorias específicas de não conformidade.
        </p>
        <div className="space-y-2 mb-4">
          {NC_CATEGORIES.map((c) => (
            <div key={c.name} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
              <span className="text-sm font-medium">{c.name}</span>
              <span className="text-xs text-muted-foreground">{c.occurrences} ocorrência(s)</span>
            </div>
          ))}
        </div>
        <AdminOnly label="Peso das penalidades e procedimento interno visíveis apenas para a administradora">
          <div className="mt-4 rounded-xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">Penalidade por ocorrência</p>
            <div className="space-y-2">
              {NC_CATEGORIES.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-sm">
                  <span>{c.name}</span>
                  <span className="font-medium text-destructive">{c.penalty} pts</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Procedimento interno</p>
              <p className="text-sm font-medium">PR-NC-001 — Procedimento de Gestão de Não Conformidades</p>
            </div>
          </div>
        </AdminOnly>
      </AcervoSection>

      {/* 7. O que é um elogio */}
      <AcervoSection id="elogios" num="7" title="O que é um elogio">
        <p className="text-[15px] leading-relaxed">
          Registro formal de reconhecimento de um atendimento que gerou valor além do esperado — comportamento ou entrega
          destacada pelo cliente ou pela liderança. Contribui para o desenvolvimento individual e para a gamificação.
        </p>
      </AcervoSection>

      {/* 8. Geração de notas e gamificação */}
      <AcervoSection id="gamificacao" num="8" title="Geração de notas e gamificação">
        <p className="text-[15px] leading-relaxed">
          As avaliações de QA e IEPC geram notas que alimentam rankings e mecânicas de reconhecimento entre as equipes,
          incentivando a melhoria contínua.
        </p>
        <AdminOnly label="Fórmulas de cálculo visíveis apenas para a administradora" />
      </AcervoSection>

      {/* 9. Documentação alinhada à ISO 9001:2015 */}
      <AcervoSection id="documentacao" num="9" title="Documentação alinhada à ISO 9001:2015">
        <p className="text-[15px] leading-relaxed mb-4">
          Documentação estruturada conforme a ISO 9001:2015: manual da qualidade, manual técnico de QA e IEPC,
          procedimento de gestão de não conformidades.
        </p>
        <AdminOnly label="Anexos para download visíveis apenas para a administradora">
          {loadingDocs ? (
            <p className="text-sm text-muted-foreground">Carregando documentos...</p>
          ) : docs.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum documento anexado ainda.</p>
          ) : (
            <div className="space-y-2">
              {docs.map((d) => (
                <a key={d.id} href={d.file_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm hover:border-primary/40 hover:shadow-sm transition-all">
                  <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="truncate">{d.title}</span>
                  {d.clause && d.clause !== "Geral" && <span className="text-[10px] uppercase tracking-wide text-muted-foreground border border-border rounded-full px-2 py-0.5 shrink-0">{d.clause}</span>}
                </a>
              ))}
            </div>
          )}
          <Link to="/iso" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all mt-3">
            Gerenciar documentos na página ISO <ArrowRight className="h-4 w-4" />
          </Link>
        </AdminOnly>
      </AcervoSection>

      {/* 10. Resultados observados */}
      <AcervoSection id="resultados" num="10" title="Resultados observados">
        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">Resultados quantitativos</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {QUANTITATIVE_RESULTS.map((r, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-1.5 text-primary mb-2">
                <TrendingUp className="h-4 w-4" />
              </div>
              <p className="font-heading text-lg font-semibold tracking-tight">{r.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{r.label}</p>
            </div>
          ))}
        </div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">Resultados qualitativos</p>
        <div className="grid md:grid-cols-2 gap-2">
          {QUALITATIVE_RESULTS.map((r, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
              {r}
            </div>
          ))}
        </div>
      </AcervoSection>

      {/* 11. Projeto QualiVisão */}
      <AcervoSection id="qualivisao" num="11" title="Projeto QualiVisão">
        <p className="text-[15px] leading-relaxed">
          Plataforma de governança operacional que centraliza avaliações QA, indicadores, dashboards executivos,
          rastreabilidade, IEPC, não conformidades, elogios e desenvolvimento individual.
        </p>
      </AcervoSection>

      {/* Login prompt for non-authenticated users */}
      {!isAuthenticated && (
        <div className="mt-8 rounded-2xl border border-dashed border-border p-6 text-center">
          <Lock className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Conteúdo detalhado (pesos, pontuações, fórmulas e documentos) é restrito à administradora.
          </p>
          <Link to="/login" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline mt-2">
            Entrar <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
