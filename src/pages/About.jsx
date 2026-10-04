import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, ShieldCheck, ArrowRight, Layers, Award, Target, Info } from "lucide-react";

export default function About() {
  return (
    <div className="w-full bg-slate-50 py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bloco de Apresentação */}
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-8 md:p-14 shadow-sm mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-800 rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="h-4 w-4 text-destaque" /> Enciclopédia Digital Pública
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Sobre a QualiPédia
          </h1>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-6">
            A <strong>QualiPédia</strong> é uma enciclopédia digital voltada à Gestão da Qualidade. Seu propósito é reunir conceitos, ferramentas, normas técnicas e métodos autorais em uma plataforma pública, estruturada e diretamente aplicável à prática operacional.
          </p>
          <p className="text-slate-600 text-base leading-relaxed">
            Diferente de glossários meramente teóricos ou materiais dispersos, cada tema na QualiPédia é tratado como uma <strong>ficha técnica de aplicação</strong>: contextualizando o conceito, orientando quando utilizar, detalhando o passo a passo metodológico e apresentando <strong>exemplos práticos e cenários fictícios de aplicação</strong>.
          </p>
        </div>

        {/* Nota Institucional de Escopo e Isenção */}
        <div className="rounded-2xl border-2 border-slate-200 bg-blue-50/60 p-6 md:p-7 mb-12 flex items-start gap-4">
          <Info className="h-5 w-5 text-destaque shrink-0 mt-0.5" />
          <div className="text-sm text-slate-700 leading-relaxed space-y-1">
            <strong className="block text-slate-900 font-semibold font-heading">
              Natureza pedagógica e informativa
            </strong>
            <p>
              A QualiPédia reúne pesquisa bibliográfica, referências técnicas consolidadas, curadoria técnica e cenários práticos de implementação. A plataforma possui finalidade pedagógica e de disseminação de conhecimento, não atuando como órgão certificador, entidade de acreditação ou autoridade normativa oficial.
            </p>
          </div>
        </div>

        {/* Pilares Editoriais */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-50 text-destaque font-bold mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
              Fundamentação Metodológica
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Conteúdo embasado na literatura técnica da gestão da qualidade, nos princípios da ISO 9001:2015 e em metodologias consagradas de melhoria contínua e gestão por processos.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 font-bold mb-4">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
              Orientação Prática
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Estruturação voltada para apoiar na solução de problemas reais: retrabalho, desvios de processo, falta de indicadores e rotinas de acompanhamento da qualidade.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-purple-50 text-purple-600 font-bold mb-4">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
              Conhecimento Acessível
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Conhecimento público, organizado e acessível para estudantes, analistas, lideranças e profissionais que buscam elevar a maturidade técnica de seus processos.
            </p>
          </div>
        </div>

        {/* Curadoria e Autoria */}
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-8 md:p-12 mb-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-destaque mb-2 block">
              Curadoria e Concepção
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              Pesquisa, Estruturação e Métodos Autorais
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-4">
              A QualiPédia foi concebida e organizada por <strong>Bruna Silva Ramos</strong> (Goiânia - GO), profissional dedicada à gestão da qualidade, processos e governança operacional.
            </p>
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              Além de estruturar os conceitos e métodos clássicos da qualidade, a plataforma documenta métodos autorais desenvolvidos por Bruna Silva Ramos voltados ao atendimento e suporte ao cliente, articulados nos quatro eixos: <strong>Qualidade Técnica (QA)</strong>, <strong>Experiência Percebida pelo Cliente (IEPC)</strong>, <strong>Gestão de Não Conformidades</strong> e <strong>Elogios</strong>.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/metodos-autorais"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-5 py-3 text-sm font-semibold hover:bg-destaque transition-colors"
              >
                <span>Conhecer Métodos Autorais</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/enciclopedia"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 bg-white text-slate-800 px-5 py-3 text-sm font-semibold hover:bg-slate-100 transition-colors"
              >
                <span>Explorar a Enciclopédia</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
