import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dataService } from "@/services/dataService";
import {
  Search,
  BookOpen,
  Compass,
  ArrowRight,
  Layers,
  Award,
  CheckCircle2,
  AlertTriangle,
  Users,
  Briefcase,
  TrendingDown,
  Wrench,
  ShieldCheck,
  BarChart3,
  Clock,
  Sparkles,
  ChevronRight,
  Workflow,
  Factory,
  Building2,
  FileText
} from "lucide-react";
import GuidedWizard from "@/components/GuidedWizard";
import SmartSearch from "@/components/SmartSearch";
import { AREAS } from "@/lib/areas";
import { SECTORS } from "@/lib/sectors";

// 12 Problemas Práticos com ferramentas reais
const PROBLEMS = [
  {
    id: "falhas-retrabalho",
    title: "Falhas e Retrabalho",
    desc: "Erros reincidentes em etapas operacionais e desperdício de retrabalho.",
    tool: "Diagrama de Ishikawa + 5 Porquês",
    link: "/decisao",
    badge: "Operações",
    icon: Wrench,
  },
  {
    id: "reclamacoes-clientes",
    title: "Reclamações e Perda de Clientes",
    desc: "Aumento de churn, atrito no suporte e insatisfação no pós-venda.",
    tool: "Metodologia de Atendimento QA",
    link: "/metodos-autorais",
    badge: "Atendimento",
    icon: Users,
  },
  {
    id: "processos-desorganizados",
    title: "Processos Desorganizados",
    desc: "Falta de padrão, cada profissional executa de uma maneira diferente.",
    tool: "SIPOC e POP (Procedimento Padrão)",
    link: "/enciclopedia?categoria=Processo",
    badge: "Processos",
    icon: Workflow,
  },
  {
    id: "falta-indicadores",
    title: "Falta de Indicadores",
    desc: "Gestão sem métricas confiáveis, impossibilidade de medir avanços reais.",
    tool: "Cartas de Controle e KPIs da Qualidade",
    link: "/enciclopedia?categoria=Indicador",
    badge: "Medição",
    icon: BarChart3,
  },
  {
    id: "riscos-nao-conformidades",
    title: "Riscos e Não Conformidades",
    desc: "Desvios frequentes, vulnerabilidade a auditorias e quebra de regras.",
    tool: "Matriz de Risco e PFMEA",
    link: "/decisao",
    badge: "Conformidade",
    icon: AlertTriangle,
  },
  {
    id: "desperdicios",
    title: "Desperdícios Operacionais",
    desc: "Tempo de espera excessivo, excesso de etapas e perda de produtividade.",
    tool: "Kaizen A3 e Lean 5S",
    link: "/enciclopedia?categoria=Metodologia",
    badge: "Melhoria",
    icon: TrendingDown,
  },
  {
    id: "dificuldade-priorizacao",
    title: "Dificuldade de Priorização",
    desc: "Muitos problemas simultâneos sem saber qual resolver primeiro.",
    tool: "Matriz GUT e Princípio de Pareto",
    link: "/decisao",
    badge: "Decisão",
    icon: Compass,
  },
  {
    id: "auditoria-conformidade",
    title: "Auditoria e Conformidade",
    desc: "Insegurança quanto aos requisitos normativos e evidências documentadas.",
    tool: "Checklist ISO 9001 e Auditoria Interna",
    link: "/iso",
    badge: "Normas",
    icon: ShieldCheck,
  },
  {
    id: "qualidade-atendimento",
    title: "Qualidade no Atendimento",
    desc: "Atendimento heterogêneo, respostas evasivas e falta de assertividade.",
    tool: "Índice IEPC e Monitoria de Qualidade",
    link: "/metodos-autorais",
    badge: "Suporte",
    icon: Briefcase,
  },
  {
    id: "vendas-ecommerce",
    title: "Vendas e E-commerce",
    desc: "Altas taxas de devolução, ruído em pedidos e insatisfação na entrega.",
    tool: "Mapeamento da Jornada e SLA de Pedidos",
    link: "/area/vendas-ecommerce",
    badge: "Comercial",
    icon: Factory,
  },
  {
    id: "desenvolvimento-pessoas",
    title: "Desenvolvimento de Pessoas",
    desc: "Falta de nivelamento técnico, turnover alto e curva de aprendizado lenta.",
    tool: "Matriz de Polivalência e Feedback QA",
    link: "/area/gestao-pessoas",
    badge: "Gestão",
    icon: Users,
  },
  {
    id: "gestao-projetos",
    title: "Gestão de Projetos",
    desc: "Prazos estourados, falta de donos de ações e planos não executados.",
    tool: "Plano de Ação 5W2H e Ciclo PDCA",
    link: "/enciclopedia?categoria=Ferramenta",
    badge: "Projetos",
    icon: Layers,
  },
];

// 10 Categorias da Biblioteca de Conhecimento
const CATEGORIES_LIBRARY = [
  { name: "Ferramentas da Qualidade", desc: "Matrizes, gráficos, diagramas e formulários práticos.", count: "18 ferramentas", link: "/enciclopedia?categoria=Ferramenta" },
  { name: "Métodos de Melhoria", desc: "PDCA, Lean, Kaizen, Six Sigma e frameworks de evolução contínua.", count: "12 metodologias", link: "/enciclopedia?categoria=Metodologia" },
  { name: "Normas e Sistemas de Gestão", desc: "Requisitos técnicos, ciclo de conformidade e auditoria ISO 9001:2015.", count: "Normas e Guias", link: "/iso" },
  { name: "Indicadores e Medição", desc: "Métricas de qualidade, SLAs, FCR, índices amostrais e controle estatístico.", count: "8 indicadores", link: "/enciclopedia?categoria=Indicador" },
  { name: "Processos e Operações", desc: "Mapeamento de fluxo, SIPOC, fluxogramas e procedimentos padrão (POP).", count: "9 processos", link: "/enciclopedia?categoria=Processo" },
  { name: "Auditoria e Conformidade", desc: "Roteiros de auditoria interna, evidências, tratativa de Não Conformidades.", count: "Guias Práticos", link: "/decisao" },
  { name: "Riscos e Prevenção", desc: "Identificação antecipada de falhas, FMEA, PFMEA e Matriz de Riscos.", count: "Ferramentas de Risco", link: "/enciclopedia?q=risco" },
  { name: "Experiência e Atendimento", desc: "Metodologia dos 5 pilares avaliativos e índice IEPC para suporte ao cliente.", count: "Método Autoral", link: "/metodos-autorais" },
  { name: "Estratégia e Governança", desc: "Alinhamento com a alta direção, política da qualidade e metas corporativas.", count: "Modelos de Gestão", link: "/enciclopedia?q=estrategia" },
  { name: "Qualidade 4.0 e Tecnologia", desc: "Automação, rastreabilidade digital e processos em ambientes de software.", count: "Trilhas Tech", link: "/setor/tecnologia-software" },
];

// Poucas fichas selecionadas de alto impacto (Destaques)
const FEATURED_THEMES = [
  {
    id: "6ab04a45cfb9b24abd18b6c0",
    title: "Ciclo PDCA (Deming)",
    type: "Metodologia",
    summary: "Ciclo de 4 fases (Plan, Do, Check, Act) para estruturar a melhoria contínua e garantir que as soluções sejam consolidadas.",
    whenToUse: "Quando você precisa planejar uma mudança, testar em pequena escala, verificar os dados e padronizar o que deu certo.",
    complexity: "Intermediário",
    timeEstimate: "Ciclo Contínuo",
  },
  {
    id: "6aae9912830b0be6e6f338fa",
    title: "Diagrama de Ishikawa (6M)",
    type: "Ferramenta",
    summary: "Espinha de peixe estruturada para mapear e categorizar todas as causas potenciais de um problema operacional.",
    whenToUse: "Quando um defeito ou reclamação recorrente acontece e a causa raiz precisa ser identificada e analisada.",
    complexity: "Iniciante",
    timeEstimate: "2 a 4 horas",
  },
  {
    id: "6ab04a45cfb9b24abd18b6c3",
    title: "Kaizen A3",
    type: "Metodologia",
    summary: "Relatório visual de uma única folha que sintetiza contexto, análise de causa raiz, plano de ação e acompanhamento dos resultados.",
    whenToUse: "Quando a equipe precisa alinhar uma melhoria com a diretoria de forma concisa e sem relatórios extensos.",
    complexity: "Intermediário",
    timeEstimate: "1 a 2 semanas",
  },
  {
    id: "6aae9912830b0be6e6f338fc",
    title: "Plano de Ação 5W2H",
    type: "Ferramenta",
    summary: "Estrutura as 7 diretrizes de qualquer projeto para eliminar ambiguidade de prazos, custos e donos de tarefas.",
    whenToUse: "Quando uma solução foi aprovada e precisa ser executada com clareza total de quem faz o quê e quando.",
    complexity: "Iniciante",
    timeEstimate: "1 a 2 horas",
  },
  {
    id: "6ab04a45cfb9b24abd18b6c1",
    title: "PFMEA (Análise de Modos de Falha)",
    type: "Ferramenta",
    summary: "Calcula a prioridade de risco (RPN) cruzando Severidade, Ocorrência e Detecção antes que a falha atinja o cliente.",
    whenToUse: "Quando se projeta um novo processo ou quando se deseja blindar uma operação contra riscos críticos.",
    complexity: "Avançado",
    timeEstimate: "2 a 3 dias",
  },
  {
    id: "6aae9912830b0be6e6f338ff",
    title: "Auditoria da Qualidade",
    type: "Processo",
    summary: "Exame sistemático e independente para averiguar se as atividades atendem às disposições planejadas e à ISO 9001.",
    whenToUse: "Periodicamente para verificar conformidade legal, eficácia dos processos e oportunidades de melhoria.",
    complexity: "Intermediário",
    timeEstimate: "1 a 2 semanas",
  },
];

export default function Home() {
  const [themes, setThemes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [guides, setGuides] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  useEffect(() => {
    Promise.all([
      dataService.listQualityThemes(),
      dataService.listMaterials(),
      dataService.listDecisionGuides(),
    ])
      .then(([t, m, g]) => {
        setThemes(t || []);
        setMaterials(m || []);
        setGuides(g || []);
      })
      .catch(() => {
        setThemes([]);
        setMaterials([]);
        setGuides([]);
      });
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/enciclopedia?q=${encodeURIComponent(query.trim())}`);
  };

  const focusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* ========================================================= */}
      {/* SEÇÃO A: Cabeçalho e Apresentação (Hero Centralizado com Marca) */}
      {/* ========================================================= */}
      <section className="w-full bg-gradient-to-b from-[#F5F7FA] via-white to-slate-50 border-b border-slate-200 py-16 md:py-24 text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge Suave */}
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-700 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Enciclopédia Digital Pública de Gestão da Qualidade
          </div>

          {/* O NOME QUALIPÉDIA EM GRANDE DESTAQUE CENTRAL */}
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-3">
            Quali<span className="text-petroleo">Pédia</span>
          </h1>

          {/* Subtítulo da Identidade Oficial */}
          <p className="text-xl sm:text-2xl font-bold text-petroleo mb-3">
            Sua enciclopédia de gestão da qualidade.
          </p>

          {/* Frase Editorial e Apresentação */}
          <p className="text-lg sm:text-xl font-medium text-slate-800 max-w-3xl mx-auto mb-2">
            Conhecimento em qualidade para entender, decidir e aplicar.
          </p>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8">
            Explore ferramentas, normas, métodos, indicadores e exemplos práticos organizados em uma única enciclopédia digital.
          </p>

          {/* Campo de Busca Rápida no Centro */}
          <div className="max-w-2xl mx-auto rounded-2xl bg-white border border-slate-200 shadow-sm p-3.5 mb-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Descreva uma situação, problema, área ou ferramenta (ex.: Ishikawa, PDCA, 5W2H)..."
                className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-24 text-sm text-slate-900 outline-none focus:border-petroleo focus:bg-white focus:ring-1 focus:ring-petroleo/20"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-4 rounded-lg bg-petroleo text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Buscar
              </button>
            </form>

            {/* Chips de atalhos rápidos */}
            <div className="flex flex-wrap gap-1.5 justify-center mt-2.5 pt-2.5 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 font-semibold self-center mr-1">Exemplos:</span>
              {["Ishikawa", "PDCA", "Matriz GUT", "Atendimento e Suporte", "ISO 9001", "Não Conformidades"].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => {
                    setQuery(chip);
                    navigate(`/enciclopedia?q=${encodeURIComponent(chip)}`);
                  }}
                  className="text-[11px] text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-full px-2.5 py-0.5 transition-colors font-medium"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Três Ações Principais Conforme Requisito A */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={focusSearch}
              className="inline-flex items-center gap-2 rounded-xl bg-petroleo text-white px-5 py-3 text-sm font-bold shadow-xs hover:bg-slate-800 transition-all cursor-pointer"
            >
              <Search className="h-4 w-4" />
              <span>Pesquisar na QualiPédia</span>
            </button>

            <Link
              to="/decisao"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-slate-800 border border-slate-300 px-5 py-3 text-sm font-bold hover:bg-slate-50 transition-all shadow-xs"
            >
              <Compass className="h-4 w-4 text-petroleo" />
              <span>Encontrar uma ferramenta</span>
            </Link>

            <Link
              to="/enciclopedia"
              className="inline-flex items-center gap-2 rounded-xl bg-transparent text-slate-700 hover:text-slate-900 px-4 py-3 text-sm font-bold hover:underline transition-all"
            >
              <span>Explorar a enciclopédia</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SEÇÃO B: Formas de Começar (3 Entradas Visuais Distintas) */}
      {/* ========================================================= */}
      <section className="w-full bg-white border-b-2 border-slate-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-destaque block mb-1">
              Como Navegar
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Escolha por onde deseja começar
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Entrada 1: Já sei o que procuro */}
            <div className="flex flex-col justify-between rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 md:p-8 hover:border-destaque hover:shadow-md transition-all">
              <div>
                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-blue-100 text-destaque mb-5">
                  <Search className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Opção 01
                </span>
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">
                  Já sei o que procuro
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Pesquise direto por nome de ferramentas (ex: <em>Ishikawa</em>, <em>5W2H</em>, <em>GUT</em>), termos técnicos ou siglas.
                </p>
              </div>

              <form onSubmit={handleSearchSubmit} className="space-y-3">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Digitar nome da ferramenta..."
                  className="w-full h-12 rounded-xl border-2 border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-destaque focus:ring-2 focus:ring-destaque/10"
                />
                <button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-destaque transition-colors flex items-center justify-center gap-2"
                >
                  <span>Buscar na base</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>

            {/* Entrada 2: Tenho um problema para resolver */}
            <div className="flex flex-col justify-between rounded-2xl border-2 border-petroleo/30 bg-blue-50/40 p-6 md:p-8 hover:border-destaque hover:shadow-md transition-all">
              <div>
                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-petroleo text-white mb-5">
                  <Compass className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-destaque block mb-1">
                  Opção 02 • Recomendado
                </span>
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">
                  Tenho um problema para resolver
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Utilize o diagnóstico rápido ou a <strong>Busca Guiada</strong> para identificar qual ferramenta resolve exatamente a sua situação.
                </p>
              </div>

              <a
                href="#busca-guiada-section"
                className="w-full h-11 rounded-xl bg-petroleo text-white text-xs font-bold hover:bg-slate-900 transition-colors flex items-center justify-center gap-2"
              >
                <span>Ir para Busca Guiada</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Entrada 3: Quero aprender por assunto */}
            <div className="flex flex-col justify-between rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 md:p-8 hover:border-destaque hover:shadow-md transition-all">
              <div>
                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 mb-5">
                  <BookOpen className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Opção 03
                </span>
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">
                  Quero aprender por assunto
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Explore o acervo navegando pelas 10 categorias técnicas, cláusulas da norma ISO 9001 ou trilhas por área de trabalho.
                </p>
              </div>

              <Link
                to="/enciclopedia"
                className="w-full h-11 rounded-xl border-2 border-slate-300 bg-white text-slate-800 text-xs font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
              >
                <span>Abrir Categorias e Trilhas</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SEÇÃO C: Problemas que a Qualidade Ajuda a Resolver */}
      {/* ========================================================= */}
      <section className="w-full bg-slate-100/60 border-b-2 border-slate-200 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-destaque block mb-1">
                Aplicações Práticas
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Problemas que a qualidade ajuda a resolver
              </h2>
              <p className="text-slate-600 text-base md:text-lg mt-2 max-w-3xl">
                Selecione um dos desafios operacionais reais para visualizar a abordagem técnica e as ferramentas indicadas para a solução:
              </p>
            </div>

            <Link
              to="/decisao"
              className="inline-flex items-center gap-2 text-sm font-bold text-destaque hover:underline shrink-0"
            >
              <span>Ver todas as 20 situações no Guia</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Grid com os 12 Problemas Reais do Requisito C */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {PROBLEMS.map((prob) => {
              const Icon = prob.icon;
              return (
                <Link
                  key={prob.id}
                  to={prob.link}
                  className="group flex flex-col rounded-2xl border-2 border-slate-200 bg-white p-5 hover:border-destaque hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 rounded-md px-2 py-0.5">
                      {prob.badge}
                    </span>
                    <Icon className="h-4 w-4 text-slate-400 group-hover:text-destaque transition-colors" />
                  </div>

                  <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-destaque transition-colors mb-2">
                    {prob.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {prob.desc}
                  </p>

                  <div className="mt-auto pt-3 border-t border-slate-100">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                      Ferramenta Indicada:
                    </span>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-destaque transition-colors flex items-center justify-between">
                      <span className="truncate">{prob.tool}</span>
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SEÇÃO: Busca Guiada Redesenhada (Requisito 5) */}
      {/* ========================================================= */}
      <section id="busca-guiada-section" className="w-full bg-white border-b-2 border-slate-200 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-destaque block mb-2">
              Orientação Passo a Passo
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Busca Guiada da Qualidade
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              Responda em 4 etapas estruturadas para encontrar o método exato para o seu momento operacional.
            </p>
          </div>

          <GuidedWizard themes={themes} guides={guides} materials={materials} />
        </div>
      </section>

      {/* ========================================================= */}
      {/* SEÇÃO D: Biblioteca de Conhecimento (10 Categorias) */}
      {/* ========================================================= */}
      <section className="w-full bg-slate-50 border-b-2 border-slate-200 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-destaque block mb-1">
              Catálogo Estruturado
            </span>
            <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Biblioteca de Conhecimento em Qualidade
            </h2>
            <p className="text-slate-600 text-base md:text-lg mt-2">
              Navegue pelos temas organizados segundo as grandes áreas da gestão da qualidade moderna:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {CATEGORIES_LIBRARY.map((cat, idx) => (
              <Link
                key={cat.name}
                to={cat.link}
                className="group flex flex-col justify-between rounded-2xl border-2 border-slate-200 bg-white p-5 hover:border-destaque hover:shadow-sm transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="h-6 w-6 rounded-md bg-slate-100 text-slate-600 font-mono text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {cat.count}
                    </span>
                  </div>

                  <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-destaque transition-colors mb-1.5 leading-snug">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-destaque">
                  <span>Acessar</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SEÇÃO E: Conteúdos em Destaque (Poucas Fichas Selecionadas) */}
      {/* ========================================================= */}
      <section className="w-full bg-white border-b-2 border-slate-200 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-destaque block mb-1">
                Fichas Técnicas Essenciais
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Conteúdos em Destaque
              </h2>
              <p className="text-slate-600 text-base md:text-lg mt-2">
                Conheça em profundidade as metodologias e ferramentas mais fundamentais para operações da qualidade:
              </p>
            </div>

            <Link
              to="/enciclopedia"
              className="inline-flex items-center gap-2 text-sm font-bold text-destaque hover:underline shrink-0"
            >
              <span>Ver todas as {themes.length > 0 ? `${themes.length} fichas` : "fichas"}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_THEMES.map((theme) => (
              <div
                key={theme.title}
                className="flex flex-col rounded-2xl border-2 border-slate-200 bg-white p-6 hover:border-destaque hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-destaque bg-blue-50 border border-blue-200 rounded-md px-2.5 py-0.5">
                    {theme.type}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>{theme.timeEstimate}</span>
                  </div>
                </div>

                <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-destaque transition-colors mb-2">
                  {theme.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {theme.summary}
                </p>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 mb-5">
                  <strong className="block text-[11px] uppercase tracking-wider text-slate-500 mb-1">
                    Quando usar na prática:
                  </strong>
                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    {theme.whenToUse}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    Nível: <strong className="text-slate-900">{theme.complexity}</strong>
                  </span>

                  <Link
                    to={`/tema/${theme.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-destaque transition-colors"
                  >
                    <span>Ficha completa</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SEÇÃO F: Métodos Autorais (Bruna Silva Ramos) */}
      {/* ========================================================= */}
      <section className="w-full bg-slate-50/80 border-b border-slate-200 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-8 md:p-12 shadow-sm">
            <div className="max-w-4xl mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-petroleo rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
                <Award className="h-4 w-4" /> Métodos Autorais • Bruna Silva Ramos (Goiânia - GO)
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                Metodologia para Qualidade em Atendimento e Suporte ao Cliente
              </h2>

              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                Desenvolvida por <strong>Bruna Silva Ramos</strong>, esta metodologia consolida um sistema prático de governança e monitoria operacional para equipes de atendimento e suporte, articulado em quatro indicadores e acompanhamento por ciclo mensal:
              </p>
            </div>

            {/* Os 4 Indicadores da Metodologia */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-petroleo block mb-1">
                    Indicador Técnico (0–100)
                  </span>
                  <h3 className="font-heading font-bold text-slate-900 text-base mb-2">
                    Avaliação Técnica QA
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Avaliação mensal estruturada em cinco pilares (comunicação, aspectos técnicos, ferramentas e processos operacionais), compondo nota até 100 pontos.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                    Experiência do Cliente (0–100)
                  </span>
                  <h3 className="font-heading font-bold text-slate-900 text-base mb-2">
                    Índice IEPC
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Medição mensal da percepção e facilidade do cliente na interação, apurada em conjunto com a avaliação técnica (nota até 100 pontos).
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                    Riscos do Setor
                  </span>
                  <h3 className="font-heading font-bold text-slate-900 text-base mb-2">
                    Não Conformidades
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Verificação e tratamento formal de riscos do setor mapeados em todas as amostras analisadas durante o mês.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 block mb-1">
                    Reconhecimento
                  </span>
                  <h3 className="font-heading font-bold text-slate-900 text-base mb-2">
                    Elogios do Ciclo
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Registro formal de elogios, entregas positivas e condutas de destaque reconhecidas no atendimento.
                  </p>
                </div>
              </div>
            </div>

            {/* Como o sistema funciona na prática (Gamificação, Feedback, PDI) */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 mb-8">
              <h4 className="font-heading font-bold text-slate-900 text-sm mb-3">
                Para que serve na prática operacional:
              </h4>
              <div className="grid sm:grid-cols-3 gap-4 text-xs text-slate-700">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <strong className="block text-slate-900 font-semibold mb-1 text-sm">Pontuação e Gamificação</strong>
                  Os indicadores alimentam ranking e pontuação motivacional para desenvolvimento da equipe.
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <strong className="block text-slate-900 font-semibold mb-1 text-sm">Feedbacks Presenciais e PDI</strong>
                  Relatório com critérios aderidos, não aderidos, evolução técnica, comportamental, comunicação e PDI.
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <strong className="block text-slate-900 font-semibold mb-1 text-sm">Acompanhamento Contínuo</strong>
                  Monitoramento mês a mês ou ciclo a ciclo para garantir crescimento dos analistas e saúde do setor.
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/metodos-autorais"
                className="rounded-xl bg-petroleo text-white py-3 px-5 text-sm font-bold shadow-xs hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
              >
                <span>Conhecer Metodologia Completa</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/acervo"
                className="rounded-xl bg-white text-slate-800 border border-slate-300 py-3 px-5 text-sm font-bold hover:bg-slate-50 transition-colors"
              >
                Consultar Modelos no Acervo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SEÇÃO G: Normas e Trilhas (ISO 9001 e Setores) */}
      {/* ========================================================= */}
      <section className="w-full bg-white border-b-2 border-slate-200 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-destaque block mb-1">
              Estruturação e Contextos
            </span>
            <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Normas Internacionais e Trilhas de Aplicação
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Bloco ISO 9001 */}
            <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-7 flex flex-col justify-between hover:border-destaque hover:shadow-md transition-all">
              <div>
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-petroleo text-white mb-4">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">
                  ISO 9001:2015 Descomplicada
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  As cláusulas da principal norma mundial de gestão da qualidade traduzidas em linguagem operacional clara: Contexto, Liderança, Planejamento, Apoio, Operação, Avaliação e Melhoria.
                </p>
              </div>

              <Link
                to="/iso"
                className="inline-flex items-center gap-2 text-xs font-bold text-destaque hover:gap-3 transition-all pt-4 border-t border-slate-200"
              >
                <span>Acessar Guia Completo da ISO 9001</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Bloco Trilhas por Área */}
            <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-7 flex flex-col justify-between hover:border-destaque hover:shadow-md transition-all">
              <div>
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-100 text-destaque mb-4">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">
                  Trilhas por Área de Atuação
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Encontre o conjunto ideal de ferramentas para o seu departamento: Atendimento, Vendas, Operações, Riscos ou Recursos Humanos.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {AREAS.slice(0, 4).map((a) => (
                    <span key={a.id} className="text-[11px] font-semibold bg-white border border-slate-200 rounded px-2 py-0.5 text-slate-700">
                      {a.name}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to="/areas"
                className="inline-flex items-center gap-2 text-xs font-bold text-destaque hover:gap-3 transition-all pt-4 border-t border-slate-200"
              >
                <span>Ver todas as trilhas por área</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Bloco Acervo e Materiais */}
            <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-7 flex flex-col justify-between hover:border-destaque hover:shadow-md transition-all">
              <div>
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 mb-4">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">
                  Acervo e Modelos Práticos
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Acesse planilhas, frameworks avaliativos e matrizes de desvio prontas para utilização na governança de processos e operações.
                </p>
              </div>

              <Link
                to="/acervo"
                className="inline-flex items-center gap-2 text-xs font-bold text-destaque hover:gap-3 transition-all pt-4 border-t border-slate-200"
              >
                <span>Acessar Acervo de Materiais</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SEÇÃO H: Curadoria e Rigor Técnico (Requisito H) */}
      {/* ========================================================= */}
      <section className="w-full bg-slate-100/70 border-b-2 border-slate-200 py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-600 mb-4">
            <ShieldCheck className="h-4 w-4 text-emerald-600" /> Curadoria e Fundamentação Técnica
          </div>

          <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            Pesquisa, referências técnicas e aplicação prática
          </h2>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-8">
            A QualiPédia reúne pesquisa bibliográfica, literatura consagrada em gestão da qualidade e cenários práticos de implementação. O projeto foi idealizado e estruturado por <strong>Bruna Silva Ramos</strong> (Goiânia - GO) com o objetivo de oferecer à comunidade um repositório confiável, estruturado e acessível para consulta e aplicação no dia a dia.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-4 py-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Conhecimento público, organizado e acessível
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-4 py-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Fundamentação Metodológica
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-4 py-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Cenários Práticos de Aplicação
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
