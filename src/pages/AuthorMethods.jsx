import React from "react";
import { Link } from "react-router-dom";
import {
  Award,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Layers,
  Sparkles,
  AlertTriangle,
  HeartHandshake,
  TrendingUp
} from "lucide-react";

export default function AuthorMethods() {
  const METHODOLOGY_AXES = [
    {
      title: "Qualidade Técnica — QA",
      badge: "Avaliação Operacional",
      icon: ShieldCheck,
      color: "text-blue-600 bg-blue-50 border-blue-200",
      desc: "Avaliação técnica manual e calibrada, estruturada em cinco pilares fundamentais e critérios objetivos para aferição da conformidade operacional."
    },
    {
      title: "Experiência do Cliente — IEPC",
      badge: "Percepção do Usuário",
      icon: HeartHandshake,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
      desc: "Eixo complementar voltado a mensurar a experiência percebida pelo cliente durante o atendimento, avaliando esforço, clareza e resolutividade."
    },
    {
      title: "Gestão de Não Conformidades",
      badge: "Controle de Desvios",
      icon: AlertTriangle,
      color: "text-amber-600 bg-amber-50 border-amber-200",
      desc: "Identificação e tratamento formal de desvios operacionais. Não conformidades geram deduções pontuais conforme regras metodológicas padronizadas."
    },
    {
      title: "Reconhecimento por Elogios",
      badge: "Valor Positivo",
      icon: Sparkles,
      color: "text-purple-600 bg-purple-50 border-purple-200",
      desc: "Registro formal que reconhece comportamentos exemplares, cordialidade diferenciada e entregas positivas percebidas pelo cliente ou pela liderança."
    }
  ];

  const APPLICATION_SUPPORT = [
    "Feedback estruturado e nivelamento técnico contínuo",
    "Acompanhamento da evolução técnica individual e da equipe",
    "Identificação clara de pontos fortes e competências consolidadas",
    "Mapeamento de oportunidades de desenvolvimento profissional",
    "Construção de Planos de Desenvolvimento Individual (PDI) direcionados",
    "Diagnóstico da saúde operacional e do clima do suporte",
    "Identificação antecipada de riscos de processo",
    "Execução de ações preventivas e mitigatórias",
    "Sustentação da cultura prática de melhoria contínua"
  ];

  const QA_PILLARS = [
    {
      name: "Gestão do Fluxo e Rastreabilidade do Atendimento",
      weight: 22,
      desc: "Organização operacional do ticket, rastreabilidade dos registros, categorização adequada e aderência ao fluxo de atendimento.",
      deliverable: "Rastreabilidade completa e integridade das etapas operacionais."
    },
    {
      name: "Gestão da Tratativa da Demanda",
      weight: 34,
      desc: "Entendimento da real necessidade do cliente, assertividade na condução da resposta e foco na resolutividade da solicitação.",
      deliverable: "Direcionamento correto e resolução eficaz da demanda."
    },
    {
      name: "Análise e Assertividade Técnica",
      weight: 18,
      desc: "Rigor técnico das orientações, validação das regras operacionais e coerência das tratativas técnicas.",
      deliverable: "Prevenção de orientações divergentes ou inconsistentes."
    },
    {
      name: "Qualidade da Comunicação",
      weight: 14,
      desc: "Clareza, objetividade, adequação da linguagem ao perfil do usuário, cortesia e formatação funcional.",
      deliverable: "Compreensão fluida pelo cliente sem retrabalho ou ambiguidades."
    },
    {
      name: "Conduta Relacional",
      weight: 12,
      desc: "Postura profissional, empatia ativa, atenção às necessidades do contato e relacionamento humanizado.",
      deliverable: "Interação respeitosa, redução de fricção e segurança percebida."
    }
  ];

  const IEPC_DIMENSIONS = [
    { title: "Resolução Percebida", desc: "Sensação do cliente quanto à efetiva solução da demanda solicitada." },
    { title: "Compreensão e Segurança", desc: "Clareza das orientações fornecidas e confiança transmitida pela equipe." },
    { title: "Esforço do Cliente (CES)", desc: "Nível de esforço exigido do cliente para obter a informação ou solução necessária." },
    { title: "Tempo e Fluidez", desc: "Agilidade no tempo de resposta e ausência de burocracias desnecessárias na tratativa." },
    { title: "Experiência Relacional", desc: "Percepção de empatia, respeito, acolhimento e cordialidade no contato." }
  ];

  return (
    <div className="w-full bg-slate-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 mb-8 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar ao Início
        </Link>

        {/* Hero do Método */}
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-8 md:p-14 shadow-sm mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-destaque rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="h-4 w-4" /> Método Autoral • Bruna Silva Ramos (Goiânia - GO)
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Metodologia para Qualidade em Atendimento e Suporte ao Cliente
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-4xl leading-relaxed mb-6">
            Um sistema estruturado de governança, monitoria analítica e melhoria contínua, projetado para orientar equipes de atendimento operacional por meio de critérios claros, avaliação balanceada e acompanhamento formativo.
          </p>
          <div className="rounded-2xl bg-slate-50 border-2 border-slate-200 p-5 md:p-6 text-sm text-slate-700 leading-relaxed">
            <strong className="block text-slate-900 font-heading mb-1 text-base">
              Relação metodológica entre os eixos:
            </strong>
            QA e IEPC produzem avaliações complementares. Não conformidades podem gerar deduções conforme regras metodológicas padronizadas, enquanto elogios reconhecem comportamentos e entregas positivas da equipe.
          </div>
        </div>

        {/* Os Quatro Eixos da Metodologia */}
        <div className="mb-14">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-destaque block mb-1">
              Estrutura Metodológica
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Os Quatro Eixos da Governança
            </h2>
            <p className="text-slate-600 text-base mt-2">
              A metodologia articula quatro dimensões interligadas para fornecer uma visão completa da qualidade operacional:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {METHODOLOGY_AXES.map((axis) => {
              const Icon = axis.icon;
              return (
                <div key={axis.title} className="flex flex-col rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm justify-between">
                  <div>
                    <div className={`h-11 w-11 flex items-center justify-center rounded-xl border mb-4 ${axis.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      {axis.badge}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
                      {axis.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {axis.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Aplicação Prática e Apoio ao Desenvolvimento */}
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-8 md:p-12 mb-14">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-destaque block mb-1">
              Finalidade e Impacto
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Apoio ao Desenvolvimento e à Gestão Operacional
            </h2>
            <p className="text-slate-600 text-base mt-2 leading-relaxed">
              A aplicação sistemática dos eixos da metodologia fornece subsídios práticos para a liderança e para os analistas:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {APPLICATION_SUPPORT.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-800 leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Os 5 Pilares Avaliativos do QA */}
        <div className="mb-14">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-destaque block mb-1">
              Qualidade Técnica
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              QA Estruturado em Cinco Pilares e Critérios de Avaliação
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Pesos balanceados e critérios claros para eliminar a subjetividade das análises e assegurar coerência em cada avaliação:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {QA_PILLARS.map((p, idx) => (
              <div key={p.name} className="flex flex-col rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-petroleo text-white font-heading font-bold text-sm">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-destaque bg-blue-50 border border-blue-200 rounded-md px-2.5 py-0.5">
                    Peso {p.weight} pts
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
                  {p.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {p.desc}
                </p>
                <div className="mt-auto bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700">
                  <strong className="block text-slate-900 mb-0.5">Foco de Avaliação:</strong>
                  {p.deliverable}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Índice IEPC */}
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-8 md:p-12 mb-14">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-destaque mb-2 block">
                Eixo Complementar de Percepção
              </span>
              <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
                IEPC — Índice de Experiência Percebida pelo Cliente
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                O IEPC é um eixo complementar relacionado à experiência percebida pelo cliente, mensurando aspectos da percepção humana e da facilidade do contato que enriquecem o diagnóstico operacional. O índice avalia 5 dimensões estruturadas:
              </p>
              <div className="space-y-3">
                {IEPC_DIMENSIONS.map((dim) => (
                  <div key={dim.title} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sm text-slate-900 font-semibold">{dim.title}: </strong>
                      <span className="text-sm text-slate-600">{dim.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-8">
              <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">
                Ciclo de Governança e Aplicação Contínua
              </h3>
              <div className="space-y-4">
                {[
                  { phase: "PLAN", title: "Critérios e Calibragem", desc: "Definição formal de pesos, conceitos de conformidade e nivelamento técnico entre avaliadores e lideranças." },
                  { phase: "DO", title: "Avaliação Amostral e Feedback", desc: "Aplicação dos pilares do QA, apuração do IEPC, registro de Não Conformidades e condução de feedbacks estruturados." },
                  { phase: "CHECK", title: "Análise de Tendências e Riscos", desc: "Acompanhamento da evolução técnica, identificação de causas de desvios e verificação de indicadores." },
                  { phase: "ACT", title: "Ações Preventivas e PDI", desc: "Elaboração de planos individuais de desenvolvimento, atualização de procedimentos e correção de causas-raiz." }
                ].map((step) => (
                  <div key={step.phase} className="flex gap-4">
                    <span className="h-8 w-14 shrink-0 flex items-center justify-center rounded-lg bg-slate-900 text-white font-mono font-bold text-xs">
                      {step.phase}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA para o Acervo */}
        <div className="rounded-2xl bg-petroleo text-white p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-xl md:text-2xl font-bold mb-2">
              Deseja consultar os modelos estruturados desta metodologia?
            </h3>
            <p className="text-slate-200 text-sm max-w-2xl">
              No Acervo da QualiPédia você encontra referências conceituais, matrizes de desvio e cenários fictícios de aplicação prática.
            </p>
          </div>
          <Link
            to="/acervo"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-white text-petroleo px-6 py-3.5 text-sm font-bold hover:bg-slate-100 transition-colors shadow-sm"
          >
            <span>Ver no Acervo</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
