import React from "react";
import { Link } from "react-router-dom";
import { Award, ArrowLeft, ArrowRight, CheckCircle2, TrendingUp, ShieldCheck, Users, BarChart3, FileText, Layers, Target } from "lucide-react";

export default function AuthorMethods() {
  const PILLARS = [
    {
      name: "Gestão do Fluxo e Rastreabilidade",
      weight: 22,
      desc: "Organização operacional do ticket ou chamado, histórico completo, categorização precisa e conformidade com os fluxos internos.",
      deliverable: "Rastreabilidade total das etapas de suporte e auditoria de registros."
    },
    {
      name: "Gestão da Tratativa da Demanda",
      weight: 34,
      desc: "Diagnóstico profundo da real dor do cliente, assertividade na solução na primeira interação (FCR) e eliminação de idas e vindas.",
      deliverable: "Aumento de resolução e redução direta de tempo de resposta."
    },
    {
      name: "Análise e Assertividade Técnica",
      weight: 18,
      desc: "Rigor técnico da informação prestada, validação de regras de negócio e prevenção contra informações divergentes ou incorretas.",
      deliverable: "Redução de reaberturas por orientação errada."
    },
    {
      name: "Qualidade da Comunicação",
      weight: 14,
      desc: "Clareza, objetividade, adequação da linguagem ao perfil do usuário, ausência de jargões herméticos e formatação amigável.",
      deliverable: "Compreensão imediata pelo cliente sem retrabalho de dúvidas."
    },
    {
      name: "Conduta Relacional e Empatia",
      weight: 12,
      desc: "Postura profissional, escuta ativa, cordialidade, humanização da interação e condução segura do contato.",
      deliverable: "Experiência humana positiva e redução de fricção com a marca."
    }
  ];

  const IEPC_DIMENSIONS = [
    { title: "Resolução Percebida", desc: "Se o cliente sentiu que o problema foi efetivamente sanado ou apenas postergado." },
    { title: "Compreensão e Segurança", desc: "Nível de clareza transmitido pelas explicações e segurança da equipe." },
    { title: "Esforço do Cliente (CES)", desc: "Quão fácil ou desgastante foi para o cliente obter a solução necessária." },
    { title: "Tempo e Fluidez", desc: "Agilidade no tempo de espera e ausência de atritos burocráticos durante o fluxo." },
    { title: "Experiência Relacional", desc: "Percepção de empatia, atenção e respeito durante a tratativa." }
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
            <Award className="h-4 w-4" /> Método Autoral • Bruna Silva Ramos Sousa
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Metodologia para Qualidade em Atendimento e Suporte ao Cliente
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-4xl leading-relaxed mb-8">
            Um sistema estruturado de governança, monitoria analítica e melhoria contínua projetado para transformar áreas de atendimento operacional em centros de excelência, reduzindo retrabalho e elevando a satisfação real do cliente.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="block text-2xl font-extrabold text-petroleo font-heading">5</span>
              <span className="text-xs font-semibold text-slate-600">Pilares Avaliativos Ponderados</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="block text-2xl font-extrabold text-destaque font-heading">IEPC</span>
              <span className="text-xs font-semibold text-slate-600">Índice de Experiência Percebida</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="block text-2xl font-extrabold text-emerald-600 font-heading">+22%</span>
              <span className="text-xs font-semibold text-slate-600">Assertividade Operacional</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="block text-2xl font-extrabold text-slate-900 font-heading">-35%</span>
              <span className="text-xs font-semibold text-slate-600">Reincidência de Reclamações</span>
            </div>
          </div>
        </div>

        {/* Os 5 Pilares Avaliativos */}
        <div className="mb-14">
          <div className="mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Os 5 Pilares da Avaliação Operacional QA
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Diferente de monitorias subjetivas, a metodologia distribui pesos técnicos calibrados para avaliar a consistência de cada interação:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PILLARS.map((p, idx) => (
              <div key={p.name} className="flex flex-col rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-petroleo text-white font-heading font-bold text-sm">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-destaque bg-blue-50 border border-blue-200 rounded-md px-2.5 py-0.5">
                    Peso {p.weight}%
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
                  {p.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {p.desc}
                </p>
                <div className="mt-auto bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700">
                  <strong className="block text-slate-900 mb-0.5">Impacto Prático:</strong>
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
                Métrica Autoral de Satisfação
              </span>
              <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
                O que é o IEPC (Índice de Experiência Percebida pelo Cliente)?
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                O IEPC foi desenvolvido para superar as limitações do CSAT e do NPS tradicionais, que frequentemente refletem a opinião sobre a marca ou produto em vez da qualidade real do suporte recebido. O índice avalia 5 dimensões objetivas da experiência:
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
                Ciclo de Governança e Ação (PDCA)
              </h3>
              <div className="space-y-4">
                {[
                  { phase: "PLAN", title: "Diagnóstico e Calibragem", desc: "Definição dos critérios de conformidade e nivelamento técnico com as lideranças." },
                  { phase: "DO", title: "Monitoria Amostral e Feedback", desc: "Aplicação dos 5 pilares, registro de desvios e planos de desenvolvimento individual." },
                  { phase: "CHECK", title: "Painéis e Análise de Tendências", desc: "Cruzamento do IEPC com causas de Não Conformidade e SLA operacional." },
                  { phase: "ACT", title: "Correção de Causa Raiz", desc: "Ajuste em fluxos internos, atualização de POPs e treinamento direcionado." }
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
              Deseja consultar os templates e dados reais desta metodologia?
            </h3>
            <p className="text-slate-200 text-sm max-w-2xl">
              No Acervo da QualiPédia você encontra os dados consolidados, tabelas de não conformidades e materiais práticos de aplicação.
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
