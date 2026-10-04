import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, ShieldCheck, CheckCircle2, ArrowRight, Layers, Award, Target, FileText } from "lucide-react";

export default function About() {
  return (
    <div className="w-full bg-slate-50 py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-8 md:p-14 shadow-sm mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-800 rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="h-4 w-4 text-destaque" /> Enciclopédia Digital Pública
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Sobre a QualiPédia
          </h1>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-6">
            A <strong>QualiPédia</strong> é uma enciclopédia digital pública dedicada à Gestão da Qualidade. Seu propósito é centralizar ferramentas clássicas, metodologias consolidadas, normas técnicas internacionais e métodos autorais em uma plataforma aberta, estruturada e diretamente aplicável à prática operacional.
          </p>
          <p className="text-slate-600 text-base leading-relaxed">
            Diferente de glossários acadêmicos teóricos ou conteúdos fragmentados, cada tema na QualiPédia é tratado como uma <strong>ficha técnica de trabalho</strong>: explicando a origem do conceito, quando utilizá-lo, o passo a passo de como aplicar, exemplos práticos e o nível de esforço requerido.
          </p>
        </div>

        {/* Pilares Editoriais */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-50 text-destaque font-bold mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
              Rigor Metodológico
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Conceitos fundamentados em padrões internacionais como ISO 9001:2015, diretrizes da ASQ (American Society for Quality) e referências da Toyota Production System (TPS).
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
              Conteúdo formatado para resolver problemas cotidianos: retrabalho, lentidão em suporte, desvios operacionais, falta de indicadores e preparação para auditorias.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-purple-50 text-purple-600 font-bold mb-4">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
              Acesso Universal
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Uma base de conhecimento 100% pública e gratuita para estudantes, analistas, auditores e líderes que buscam elevar a maturidade de suas operações.
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
              A QualiPédia foi concebida e organizada por <strong>Bruna Silva Ramos Sousa</strong>, profissional com atuação dedicada à gestão da qualidade, governança operacional e melhoria de processos em ambientes de atendimento, tecnologia e serviços.
            </p>
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              Além de organizar as ferramentas e normas do acervo mundial, o projeto reúne métodos autorais criados a partir da vivência prática em operações complexas — como a metodologia de governança com os 5 pilares operacionais e o Índice IEPC para qualidade em suporte ao cliente.
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
