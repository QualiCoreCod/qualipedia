import Link from "next/link";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { LibraryExplorer } from "@/components/library-explorer";
import { SiteShell } from "@/components/site-shell";

export default function Home() {
  return (
    <SiteShell>
      <LibraryExplorer />
      <section className="border-t border-[#DFE3E8] bg-[#172033] text-white">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-12 sm:px-7 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#8DB5FF]"><ShieldCheck size={16} /> Acervo da autora</div>
            <h2 className="text-2xl font-extrabold tracking-[-0.025em]">Metodologias próprias ficam em uma área separada e protegida</h2>
            <p className="mt-3 text-sm leading-6 text-[#C7CEDA]">A parte pública explica ferramentas reconhecidas. A área privada preserva critérios, pesos, fórmulas, documentos e aplicações profissionais que formam o diferencial da metodologia.</p>
          </div>
          <Link href="/metodologias" className="inline-flex items-center justify-center gap-2 rounded-[5px] bg-[#2563EB] px-5 py-3 text-sm font-bold text-white hover:bg-[#1D55C8]">
            <LockKeyhole size={16} /> Acessar metodologias <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
