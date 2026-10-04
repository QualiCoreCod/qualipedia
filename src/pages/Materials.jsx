import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dataService } from "@/services/dataService";
import { FolderOpen, FileText, ArrowRight, Lock, TrendingUp, Award, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import AcervoSection from "@/components/AcervoSection";
import AdminOnly from "@/components/AdminOnly";

const PDCA_STEPS = [
  { phase: "PLAN", title: "Diagnóstico e Planejamento", desc: "Mapeamento da necessidade de governança, superação de análises puramente subjetivas, rastreabilidade dos registros e concepção de indicadores de percepção do cliente." },
  { phase: "DO", title: "Execução e Aplicação", desc: "Estruturação dos pilares avaliativos, cálculo amostral do IEPC, rotinas de monitoria da qualidade e parametrização das diretrizes operacionais." },
  { phase: "CHECK", title: "Verificação e Calibragem", desc: "Acompanhamento contínuo por meio de painéis, indicadores consolidados, calibragem entre avaliadores e avaliação do nível de serviço prestado." },
  { phase: "ACT", title: "Padronização e Ajuste", desc: "Revisão periódica de critérios, planos de desenvolvimento individual (PDI), atualização de procedimentos operacionais e melhoria contínua." },
];

const QA_PILLARS = [
  { name: "Gestão do Fluxo e Rastreabilidade do Atendimento", definition: "Organização operacional do chamado, rastreabilidade dos registros, adequação de etapas e aderência aos fluxos internos.", weight: 22 },
  { name: "Gestão da Tratativa da Demanda", definition: "Condução do atendimento, diagnóstico preciso da dor do cliente e foco na resolução eficaz da solicitação.", weight: 34 },
  { name: "Análise e Assertividade Técnica", definition: "Rigor técnico da informação prestada, validação das regras de negócio e prevenção contra dados divergentes.", weight: 18 },
  { name: "Qualidade da Comunicação", definition: "Clareza, objetividade, linguagem adequada ao perfil do usuário, cortesia e formatação funcional.", weight: 14 },
  { name: "Conduta Relacional", definition: "Postura profissional, escuta ativa, cordialidade, empatia e humanização do contato.", weight: 12 },
];

const IEPC_PILLARS = [
  { name: "Resolução Percebida", definition: "Sensação do cliente quanto à efetiva solução da sua demanda." },
  { name: "Compreensão e Segurança", definition: "Clareza das orientações fornecidas e confiança transmitida durante o atendimento." },
  { name: "Esforço do Cliente (CES)", definition: "Nível de esforço e etapas exigidas do cliente para obter a resolução necessária." },
  { name: "Tempo e Fluidez", definition: "Agilidade no tempo de resposta e ausência de atritos burocráticos durante o fluxo." },
  { name: "Experiência Relacional", definition: "Percepção de empatia, atenção, respeito e acolhimento durante a tratativa." },
];

const NC_CATEGORIES = [
  { name: "Conformidade de Registro e Rastreabilidade", penalty: -20 },
  { name: "Integridade do Fluxo Operacional", penalty: -20 },
  { name: "Acuracidade e Rigor Técnico", penalty: -20 },
  { name: "Segurança da Informação", penalty: -20 },
  { name: "Postura e Conduta Profissional", penalty: -20 },
];

const METHODOLOGY_AXES = [
  { label: "Qualidade Técnica (QA)", desc: "Avaliação manual estruturada nos cinco pilares com critérios objetivos." },
  { label: "Experiência Percebida (IEPC)", desc: "Eixo complementar focado na perspectiva e facilidade do usuário." },
  { label: "Gestão de Não Conformidades", desc: "Fluxo formal de tratamento e deduções parametrizadas." },
  { label: "Reconhecimento por Elogios", desc: "Valorização formal de entregas positivas e condutas destacadas." },
];

const SUPPORTED_OUTCOMES = [
  "Feedback estruturado e nivelamento técnico contínuo",
  "Acompanhamento da evolução técnica individual e da equipe",
  "Identificação clara de pontos fortes e competências consolidadas",
  "Mapeamento de oportunidades de desenvolvimento profissional",
  "Construção de Planos de Desenvolvimento Individual (PDI) direcionados",
  "Diagnóstico da saúde operacional e do clima de suporte",
  "Identificação antecipada de riscos de processo e desvios",
  "Execução de ações preventivas e mitigatórias",
  "Sustentação da cultura prática de melhoria contínua",
  "Padronização e rastreabilidade dos fluxos operacionais",
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
        <span className="text-xs uppercase tracking-wider font-medium">Acervo Técnico e Metodologias</span>
      </div>
      <h1 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-3">
        Aplicação Prática da Gestão da Qualidade
      </h1>
      <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-12">
        Estrutura de governança e avaliação da qualidade aplicável a operações de suporte técnico, atendimento e serviços.
      </p>

      {/* 1. Contexto Metodológico */}
      <AcervoSection id="contexto" num="1" title="Contexto Metodológico">
        <p className="text-[15px] leading-relaxed mb-4">
          Diretrizes para implantação de governança da qualidade em operações de suporte técnico e atendimento:
        </p>
        <div className="rounded-xl border border-border bg-accent/30 p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Desafios frequentes sem governança</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground shrink-0" /> Avaliações subjetivas, sem critérios padronizados</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground shrink-0" /> Ausência de rastreabilidade e histórico das análises</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground shrink-0" /> Falta de indicadores estruturados de experiência percebida</li>
          </ul>
        </div>
        <p className="text-[15px] leading-relaxed mt-4">
          <span className="font-medium">Objetivo:</span> estruturar processos, indicadores balanceados, calibragem avaliativa e monitorias orientadas por critérios objetivos.
        </p>
      </AcervoSection>

      {/* 2. Aplicação do PDCA */}
      <AcervoSection id="pdca" num="2" title="Aplicação do Ciclo PDCA" subtitle="Aplicação prática do ciclo para além da definição teórica">
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
      <AcervoSection id="metodologia" num="3" title="Metodologia Autoral de Atendimento">
        <p className="text-[15px] leading-relaxed mb-4">
          Metodologia desenvolvida por <strong>Bruna Silva Ramos</strong> (Goiânia - GO) para estruturar a qualidade no atendimento ao cliente, articulada em quatro eixos complementares:
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          {METHODOLOGY_AXES.map((axis) => (
            <div key={axis.label} className="p-4 rounded-xl border border-border bg-card">
              <h4 className="font-heading font-semibold text-sm text-foreground mb-1">{axis.label}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{axis.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
          QA e IEPC produzem avaliações complementares. Não conformidades podem gerar deduções conforme regras metodológicas padronizadas, enquanto elogios reconhecem comportamentos e entregas positivas.
        </p>
      </AcervoSection>

      {/* 4. Sistema de avaliação de qualidade (QA) */}
      <AcervoSection id="qa" num="4" title="Sistema de Avaliação de Qualidade (QA)" subtitle="QA estruturado em cinco pilares e critérios de avaliação">
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
      <AcervoSection id="iepc" num="5" title="IEPC — Índice de Experiência Percebida pelo Cliente" subtitle="5 dimensões complementares de percepção">
        <div className="grid md:grid-cols-2 gap-3">
          {IEPC_PILLARS.map((p) => (
            <PillarCard key={p.name} pillar={p} showWeight={false} />
          ))}
        </div>
      </AcervoSection>

      {/* 6. Gestão de não conformidades */}
      <AcervoSection id="nc" num="6" title="Gestão de Não Conformidades">
        <p className="text-[15px] leading-relaxed mb-4">
          Fluxo estruturado de identificação, tratamento e prevenção de desvios operacionais com categorias padronizadas de não conformidade:
        </p>
        <div className="space-y-2 mb-4">
          {NC_CATEGORIES.map((c) => (
            <div key={c.name} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
              <span className="text-sm font-medium">{c.name}</span>
              <span className="text-xs text-muted-foreground">Classificação normativa</span>
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
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Procedimento interno de referência</p>
              <p className="text-sm font-medium">PR-NC-001 — Procedimento de Gestão de Não Conformidades</p>
            </div>
          </div>
        </AdminOnly>
      </AcervoSection>

      {/* 7. O que é um elogio */}
      <AcervoSection id="elogios" num="7" title="O que é um elogio">
        <p className="text-[15px] leading-relaxed">
          Registro formal de reconhecimento de um atendimento que gerou valor destacado — comportamento, resolutividade ou entrega
          reconhecida pelo cliente ou pela liderança. Contribui para o desenvolvimento individual e para o clima da equipe.
        </p>
      </AcervoSection>

      {/* 8. Geração de notas e acompanhamento */}
      <AcervoSection id="gamificacao" num="8" title="Geração de Notas e Acompanhamento Formativo">
        <p className="text-[15px] leading-relaxed">
          As avaliações de QA e IEPC geram diagnósticos que alimentam rotinas de feedback, calibragem entre lideranças e acompanhamento da evolução dos analistas.
        </p>
        <AdminOnly label="Fórmulas de cálculo visíveis apenas para a administradora" />
      </AcervoSection>

      {/* 9. Documentação alinhada à ISO 9001:2015 */}
      <AcervoSection id="documentacao" num="9" title="Documentação alinhada à ISO 9001:2015">
        <p className="text-[15px] leading-relaxed mb-4">
          Estruturação conceitual alinhada aos requisitos da ISO 9001:2015: manuais de qualidade, diretrizes técnicas de avaliação e procedimento de gestão de não conformidades.
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

      {/* 10. Benefícios e Impactos Práticos */}
      <AcervoSection id="resultados" num="10" title="Benefícios e Apoio ao Desenvolvimento">
        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">Impactos da aplicação sistemática da metodologia</p>
        <div className="grid md:grid-cols-2 gap-2.5 mb-6">
          {SUPPORTED_OUTCOMES.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700 bg-card p-3 rounded-lg border border-border">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </AcervoSection>

      {/* 11. Projeto QualiVisão */}
      <AcervoSection id="qualivisao" num="11" title="Projeto QualiVisão">
        <p className="text-[15px] leading-relaxed">
          Conceito de plataforma de governança operacional desenhado para integrar avaliações QA, indicadores, painéis gerenciais,
          rastreabilidade, IEPC, tratamento de desvios e apoio aos planos de desenvolvimento individual.
        </p>
      </AcervoSection>

      {/* Prompt de acesso */}
      {!isAuthenticated && (
        <div className="mt-8 rounded-2xl border border-dashed border-border p-6 text-center">
          <Lock className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Modelos detalhados e documentação técnica avançada possuem acesso controlado.
          </p>
          <Link to="/login" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline mt-2">
            Entrar <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
