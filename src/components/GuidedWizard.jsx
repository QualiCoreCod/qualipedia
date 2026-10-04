import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Target,
  Layers,
  Clock,
  Wrench,
  BookOpen,
  Compass,
  Briefcase,
  ExternalLink
} from "lucide-react";

const FREQUENT_PROBLEMS = [
  { id: "falhas", label: "Reduzir falhas, erros e retrabalho operacional", searchKey: "defeito retrabalho falha causa" },
  { id: "atendimento", label: "Melhorar atendimento ao cliente e diminuir reclamações", searchKey: "atendimento cliente suporte reclamacao" },
  { id: "processos", label: "Mapear e padronizar processos desorganizados", searchKey: "processo mapeamento fluxo padronizacao pop" },
  { id: "indicadores", label: "Estruturar indicadores e medir desempenho (KPIs)", searchKey: "indicador medicao kpi controle monitoramento" },
  { id: "riscos", label: "Tratar não conformidades e riscos operacionais", searchKey: "risco conformidade nao conformidade fmea" },
  { id: "desperdicios", label: "Eliminar desperdícios e aplicar melhoria contínua (Lean)", searchKey: "lean desperdicio kaizen melhoria 5s" },
  { id: "priorizacao", label: "Priorizar problemas e gargalos mais críticos", searchKey: "priorizacao gut pareto criticidade gravidade" },
  { id: "auditoria", label: "Preparar a organização para auditoria ou ISO 9001", searchKey: "auditoria iso conformidade certificado norma" },
];

const AREAS = [
  { id: "atendimento", name: "Atendimento e Suporte", icon: Briefcase },
  { id: "operacoes", name: "Operações e Produção", icon: Layers },
  { id: "qualidade", name: "Qualidade e Conformidade", icon: Target },
  { id: "gestao", name: "Gestão e Liderança", icon: Sparkles },
  { id: "projetos", name: "Projetos e Engenharia", icon: Wrench },
  { id: "vendas", name: "Comercial e Vendas", icon: Compass },
];

const SECTORS = [
  { id: "servicos", name: "Serviços e Consultoria" },
  { id: "industria", name: "Indústria e Manufatura" },
  { id: "tecnologia", name: "Tecnologia e Software" },
  { id: "saude", name: "Saúde e Clínicas" },
  { id: "varejo", name: "Varejo e E-commerce" },
  { id: "geral", name: "Geral / Corporativo" },
];

const MOMENTS = [
  { id: "entender", title: "Entender o problema", desc: "Investigar sintomas, ouvir partes interessadas e definir o problema real", tools: ["SIPOC", "5W2H", "Diagrama de Ishikawa"] },
  { id: "causa", title: "Encontrar a causa raiz", desc: "Descobrir o motivo fundamental que causou o desvio", tools: ["Diagrama de Ishikawa", "5 Porquês", "PFMEA"] },
  { id: "priorizar", title: "Priorizar o que atacar", desc: "Decidir quais ações ou problemas geram mais impacto imediato", tools: ["Matriz GUT", "Princípio de Pareto", "Matriz de Risco"] },
  { id: "planejar", title: "Planejar ações e soluções", desc: "Definir metas, responsáveis, cronogramas e recursos", tools: ["5W2H", "Kaizen A3", "Plano de Ação"] },
  { id: "executar", title: "Executar e implementar", desc: "Colocar em prática melhorias à prova de erro na operação", tools: ["Poka-Yoke", "Kanban", "Procedimentos"] },
  { id: "medir", title: "Medir e monitorar", desc: "Acompanhar dados estatísticos e tendências de processos", tools: ["Carta de Controle", "Folha de Verificação", "Historigrama"] },
  { id: "controlar", title: "Controlar e auditar", desc: "Verificar se o processo segue os padrões e normas", tools: ["Auditoria da Qualidade", "Checklist ISO", "MSA"] },
  { id: "padronizar", title: "Padronizar e consolidar", desc: "Garantir que os ganhos obtidos permaneçam estáveis", tools: ["Ciclo PDCA", "POP (Procedimento Padrão)", "Lições Aprendidas"] },
];

const CONTENT_TYPES = [
  { id: "ferramenta", label: "Ferramenta Prática", desc: "Matrizes, gráficos, planilhas e formulários rápidos" },
  { id: "metodologia", label: "Metodologia de Melhoria", desc: "Ciclos completos e metodologias estruturadas passo a passo" },
  { id: "norma", label: "Norma Técnica ou Sistema", desc: "Requisitos da ISO 9001 e normas de conformidade" },
  { id: "indicador", label: "Indicador ou Métrica", desc: "Fórmulas de medição, metas e SLAs da qualidade" },
  { id: "processo", label: "Processo ou Procedimento", desc: "Fluxos de trabalho e padronização operacional" },
  { id: "template", label: "Template ou Material de Apoio", desc: "Modelos editáveis e referências do Acervo" },
];

export default function GuidedWizard({ themes = [], guides = [], materials = [] }) {
  const [step, setStep] = useState(0);
  const [selectedProblem, setSelectedProblem] = useState("");
  const [customDescription, setCustomDescription] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedMoment, setSelectedMoment] = useState("");
  const [selectedContentType, setSelectedContentType] = useState("");

  const reset = () => {
    setStep(0);
    setSelectedProblem("");
    setCustomDescription("");
    setSelectedArea("");
    setSelectedSector("");
    setSelectedMoment("");
    setSelectedContentType("");
  };

  const canAdvance = () => {
    if (step === 0) return selectedProblem || customDescription.trim().length > 0;
    if (step === 1) return !!selectedArea || !!selectedSector;
    if (step === 2) return !!selectedMoment;
    if (step === 3) return !!selectedContentType;
    return true;
  };

  // Computa recomendações
  const computeRecommendations = () => {
    const query = [
      selectedProblem,
      customDescription,
      selectedArea,
      selectedSector,
      selectedMoment,
      selectedContentType
    ].join(" ").toLowerCase();

    const terms = query.split(/\s+/).filter((t) => t.length > 2);

    const scoredThemes = (themes || []).map((t) => {
      let score = 0;
      const titleLower = (t.title || "").toLowerCase();
      const conceptLower = (t.concept || "").toLowerCase();
      const whenLower = (t.when_to_use || "").toLowerCase();
      const howLower = (t.how_to_apply || "").toLowerCase();
      const catLower = (t.category || "").toLowerCase();
      const ctxStr = Array.isArray(t.contexts) ? t.contexts.join(" ").toLowerCase() : "";

      // Match do momento selecionado
      if (selectedMoment) {
        const momObj = MOMENTS.find((m) => m.id === selectedMoment);
        if (momObj && momObj.tools.some((tool) => titleLower.includes(tool.toLowerCase()))) {
          score += 40;
        }
      }

      // Match do tipo de conteúdo
      if (selectedContentType && catLower.includes(selectedContentType)) {
        score += 25;
      }

      // Match de termos
      terms.forEach((term) => {
        if (titleLower.includes(term)) score += 15;
        if (whenLower.includes(term)) score += 10;
        if (ctxStr.includes(term)) score += 8;
        if (conceptLower.includes(term)) score += 5;
        if (howLower.includes(term)) score += 3;
      });

      return {
        item: t,
        score,
        reason: t.when_to_use
          ? t.when_to_use.split("\n")[0].slice(0, 140)
          : `Recomendado para estruturação na fase de ${selectedMoment || "melhoria"}.`,
        effort: t.category === "Ferramenta" ? "Rápido (2 a 4 horas)" : "Médio (1 a 2 semanas)",
        prerequisites: Array.isArray(t.contexts) && t.contexts.length > 0 ? t.contexts.slice(0, 3).join(", ") : "Equipe do processo e dados históricos",
      };
    });

    const sorted = scoredThemes.sort((a, b) => b.score - a.score).filter((r) => r.score > 0);
    return sorted.slice(0, 6);
  };

  const results = step === 4 ? computeRecommendations() : [];

  return (
    <div className="w-full rounded-2xl border-2 border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Barra de Progresso Superior */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 md:px-8">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <span>Busca Guiada da Qualidade</span>
          <span>Etapa {step + 1} de 5</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {["Problema", "Local", "Momento", "Conteúdo", "Resultados"].map((label, idx) => (
            <div key={label} className="space-y-1">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx < step
                    ? "bg-petroleo"
                    : idx === step
                    ? "bg-destaque ring-2 ring-destaque/30"
                    : "bg-slate-200"
                }`}
              />
              <span className={`hidden sm:block text-[11px] font-medium truncate ${idx === step ? "text-slate-900 font-semibold" : "text-slate-400"}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Conteúdo Principal da Etapa */}
      <div className="p-6 md:p-10">
        {/* ETAPA 1: O que você quer resolver? */}
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-2xl font-bold text-slate-900 tracking-tight mb-2">
                1. O que você precisa resolver agora?
              </h3>
              <p className="text-slate-600 text-base">
                Selecione uma das situações operacionais frequentes ou descreva com suas próprias palavras o desafio enfrentado.
              </p>
            </div>

            {/* Chips de situações frequentes */}
            <div className="grid sm:grid-cols-2 gap-3">
              {FREQUENT_PROBLEMS.map((prob) => {
                const isSelected = selectedProblem === prob.searchKey;
                return (
                  <button
                    key={prob.id}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setSelectedProblem("");
                      } else {
                        setSelectedProblem(prob.searchKey);
                      }
                    }}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? "border-destaque bg-blue-50/60 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70"
                    }`}
                  >
                    <CheckCircle2
                      className={`h-5 w-5 shrink-0 mt-0.5 transition-colors ${
                        isSelected ? "text-destaque" : "text-slate-300"
                      }`}
                    />
                    <span className={`text-sm font-medium leading-snug ${isSelected ? "text-slate-900 font-semibold" : "text-slate-700"}`}>
                      {prob.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Campo aberto de texto com digitação natural da esquerda para a direita */}
            <div className="pt-2">
              <label htmlFor="guided-need-input" className="block text-sm font-semibold text-slate-800 mb-2">
                Ou descreva outra situação com suas palavras:
              </label>
              <textarea
                id="guided-need-input"
                dir="ltr"
                rows={3}
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                placeholder="Exemplo: Os chamados de suporte dos clientes estão demorando muito para serem resolvidos e não sabemos exatamente em qual etapa ocorre o gargalo..."
                className="w-full rounded-xl border-2 border-slate-200 bg-slate-50/50 p-4 text-base text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-destaque focus:bg-white focus:ring-4 focus:ring-destaque/10"
              />
              <span className="block text-xs text-slate-500 mt-1.5">
                Você pode digitar normalmente, usar acentos, apagar ou detalhar quanto preferir.
              </span>
            </div>
          </div>
        )}

        {/* ETAPA 2: Onde o problema acontece? */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-2xl font-bold text-slate-900 tracking-tight mb-2">
                2. Onde este problema se manifesta?
              </h3>
              <p className="text-slate-600 text-base">
                Identificar a área funcional e o setor ajuda a refinar ferramentas com exemplos diretamente aplicáveis à sua realidade.
              </p>
            </div>

            {/* Áreas de Atuação */}
            <div>
              <span className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                Área de Atuação Principal
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {AREAS.map((area) => {
                  const Icon = area.icon;
                  const isSelected = selectedArea === area.name;
                  return (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => setSelectedArea(isSelected ? "" : area.name)}
                      className={`flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? "border-destaque bg-blue-50/60 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <Icon className={`h-5 w-5 mb-2 ${isSelected ? "text-destaque" : "text-slate-500"}`} />
                      <span className={`text-sm ${isSelected ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}>
                        {area.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Setor */}
            <div className="pt-2">
              <span className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                Setor da Organização
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SECTORS.map((s) => {
                  const isSelected = selectedSector === s.name;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSector(isSelected ? "" : s.name)}
                      className={`p-3.5 rounded-xl border-2 text-center text-sm font-medium transition-all ${
                        isSelected
                          ? "border-petroleo bg-slate-100 text-petroleo font-bold shadow-sm"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ETAPA 3: Em qual momento você está? */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-2xl font-bold text-slate-900 tracking-tight mb-2">
                3. Em qual fase da jornada você está?
              </h3>
              <p className="text-slate-600 text-base">
                Cada fase da gestão exige uma abordagem metodológica específica, desde a descoberta da causa até a auditoria final.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {MOMENTS.map((m) => {
                const isSelected = selectedMoment === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMoment(m.id)}
                    className={`flex flex-col p-4 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? "border-destaque bg-blue-50/60 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-base font-bold ${isSelected ? "text-destaque" : "text-slate-900"}`}>
                        {m.title}
                      </span>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-destaque" />}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {m.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {m.tools.map((t) => (
                        <span key={t} className="text-[10px] font-semibold bg-slate-100 text-slate-600 rounded px-2 py-0.5 border border-slate-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ETAPA 4: Que tipo de conteúdo você procura? */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-2xl font-bold text-slate-900 tracking-tight mb-2">
                4. Que formato de conteúdo você prefere?
              </h3>
              <p className="text-slate-600 text-base">
                Escolha o nível de profundidade que melhor atende à sua necessidade neste momento.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {CONTENT_TYPES.map((ct) => {
                const isSelected = selectedContentType === ct.id;
                return (
                  <button
                    key={ct.id}
                    type="button"
                    onClick={() => setSelectedContentType(ct.id)}
                    className={`flex flex-col p-5 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? "border-destaque bg-blue-50/60 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <span className={`text-base font-bold mb-1 ${isSelected ? "text-destaque" : "text-slate-900"}`}>
                      {ct.label}
                    </span>
                    <span className="text-xs text-slate-600 leading-relaxed">
                      {ct.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ETAPA 5: Resultados e Recomendações */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="font-heading text-2xl font-bold text-slate-900 tracking-tight">
                  Recomendações Personalizadas
                </h3>
                <p className="text-slate-600 text-sm mt-1">
                  Baseado no seu diagnóstico ({results.length} conteúdos técnicos selecionados):
                </p>
              </div>
              <button
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg px-3.5 py-2 transition-colors shrink-0"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Fazer novo diagnóstico
              </button>
            </div>

            {results.length === 0 ? (
              <div className="rounded-xl border-2 border-dashed border-slate-200 p-10 text-center">
                <p className="text-slate-600 font-medium text-base">
                  Nenhuma recomendação exata para essa combinação específica.
                </p>
                <p className="text-slate-500 text-sm mt-1 mb-4">
                  Tente ampliar os critérios ou navegue na enciclopédia completa.
                </p>
                <Link
                  to="/enciclopedia"
                  className="inline-flex items-center gap-2 rounded-lg bg-petroleo text-white px-5 py-2.5 text-sm font-semibold hover:opacity-90"
                >
                  <BookOpen className="h-4 w-4" /> Abrir Enciclopédia Completa
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {results.map(({ item, reason, effort, prerequisites }, i) => (
                  <div
                    key={item.id || i}
                    className="flex flex-col rounded-xl border-2 border-slate-200 bg-white p-5 hover:border-destaque hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-destaque bg-blue-50 border border-blue-200 rounded-md px-2.5 py-0.5">
                        {item.category || "Ferramenta"}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Match #{i + 1}
                      </span>
                    </div>

                    <h4 className="font-heading text-lg font-bold text-slate-900 group-hover:text-destaque transition-colors mb-2">
                      {item.title}
                    </h4>

                    {/* Por que foi recomendado */}
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 mb-3">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Por que usar neste caso:
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {reason}
                      </p>
                    </div>

                    {/* Metadados práticos de esforço */}
                    <div className="space-y-1.5 text-xs text-slate-600 mb-4 mt-auto">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span><strong>Esforço:</strong> {effort}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wrench className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="truncate"><strong>Necessário:</strong> {prerequisites}</span>
                      </div>
                    </div>

                    <Link
                      to={`/tema/${item.id}`}
                      className="inline-flex items-center justify-between w-full rounded-lg bg-slate-900 text-white px-4 py-2.5 text-xs font-semibold hover:bg-destaque transition-colors"
                    >
                      <span>Acessar ficha completa com passo a passo</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Botões de Navegação Inferiores */}
      <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 md:px-8 flex items-center justify-between">
        {step > 0 && step < 4 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="inline-flex items-center gap-1.5 rounded-lg border-2 border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" /> Voltar etapa
          </button>
        ) : (
          <div />
        )}

        {step < 4 && (
          <button
            type="button"
            onClick={() => canAdvance() && setStep(step + 1)}
            disabled={!canAdvance()}
            className="inline-flex items-center gap-2 rounded-lg bg-destaque text-white px-6 py-2.5 text-sm font-bold shadow-sm hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {step === 3 ? "Gerar recomendações" : "Avançar"}
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
