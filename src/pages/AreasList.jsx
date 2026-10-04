import React from "react";
import { Link } from "react-router-dom";
import { AREAS } from "@/lib/areas";
import { ArrowLeft, ArrowRight, Layers } from "lucide-react";

export default function AreasList() {
  return (
    <div className="w-full bg-slate-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 mb-8 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar ao Início
        </Link>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-destaque rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="h-4 w-4" /> Trilhas Especializadas
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Trilhas da Qualidade por Área de Atuação
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-3xl leading-relaxed">
            Selecione a sua área profissional para consultar as ferramentas, normas, metodologias e indicadores recomendados especificamente para o seu departamento.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AREAS.map((area) => {
            const Icon = area.icon;
            return (
              <Link
                key={area.id}
                to={`/area/${area.id}`}
                className="group flex flex-col justify-between rounded-2xl border-2 border-slate-200 bg-white p-7 hover:border-destaque hover:shadow-md transition-all"
              >
                <div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-slate-100 text-petroleo group-hover:bg-destaque group-hover:text-white transition-colors mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-destaque transition-colors mb-2">
                    {area.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {area.description}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-destaque pt-4 border-t border-slate-100 group-hover:gap-3 transition-all">
                  <span>Acessar trilha de ferramentas</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
