import React from "react";
import { Link } from "react-router-dom";
import { SECTORS } from "@/lib/sectors";
import { ArrowLeft, ArrowRight, Building2 } from "lucide-react";

export default function SectorsList() {
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
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="h-4 w-4" /> Setores Econômicos
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Trilhas da Qualidade por Setor
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-3xl leading-relaxed">
            Consulte a aplicação prática da gestão da qualidade segundo o contexto específico de cada segmento de mercado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTORS.map((sector) => {
            const Icon = sector.icon;
            return (
              <Link
                key={sector.id}
                to={`/setor/${sector.id}`}
                className="group flex flex-col justify-between rounded-2xl border-2 border-slate-200 bg-white p-7 hover:border-destaque hover:shadow-md transition-all"
              >
                <div>
                  <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-slate-100 text-petroleo group-hover:bg-destaque group-hover:text-white transition-colors mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-destaque transition-colors mb-2">
                    {sector.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {sector.description}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-destaque pt-4 border-t border-slate-100 group-hover:gap-3 transition-all">
                  <span>Explorar conteúdo do setor</span>
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
