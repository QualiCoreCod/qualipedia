import Link from "next/link";
import { BookOpen, Compass, LockKeyhole, Search, ShieldCheck } from "lucide-react";

type SiteShellProps = {
  children: React.ReactNode;
  active?: "biblioteca" | "guia" | "metodologias";
};

const navigation = [
  { label: "Biblioteca", href: "/#biblioteca", icon: BookOpen, key: "biblioteca" },
  { label: "Qual ferramenta usar", href: "/#guia", icon: Compass, key: "guia" },
  { label: "Metodologias", href: "/metodologias", icon: LockKeyhole, key: "metodologias" },
] as const;

export function SiteShell({ children, active = "biblioteca" }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-[#F4F6F8] text-[#172033]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-[#DFE3E8] bg-white lg:flex lg:flex-col">
        <Link href="/" className="flex h-18 items-center gap-3 border-b border-[#E7EAF0] px-6" aria-label="QualiPédia, início">
          <span className="grid size-9 place-items-center rounded-[4px] bg-[#172033] text-base font-extrabold text-white">Q</span>
          <span>
            <span className="block text-base font-extrabold tracking-[-0.02em]">QualiPédia</span>
            <span className="block text-xs font-medium text-[#7B8495]">Gestão da qualidade</span>
          </span>
        </Link>

        <nav className="flex-1 px-3 py-6" aria-label="Navegação principal">
          <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#929AA8]">Conhecimento</p>
          <div className="space-y-1">
            {navigation.map(({ label, href, icon: Icon, key }) => (
              <Link
                key={key}
                href={href}
                className={`flex items-center gap-3 rounded-[5px] px-3 py-2.5 text-sm font-semibold transition-colors ${
                  active === key ? "bg-[#EAF1FF] text-[#1D5FD1]" : "text-[#536071] hover:bg-[#F4F6F8] hover:text-[#172033]"
                }`}
              >
                <Icon size={17} strokeWidth={2} />
                <span>{label}</span>
                {key === "metodologias" ? <LockKeyhole className="ml-auto" size={13} /> : null}
              </Link>
            ))}
          </div>
        </nav>

        <div className="border-t border-[#E7EAF0] p-4">
          <div className="rounded-[6px] bg-[#F7F9FB] p-3">
            <div className="mb-1 flex items-center gap-2 text-xs font-bold text-[#435067]">
              <ShieldCheck size={15} className="text-[#1D5FD1]" />
              Conteúdo protegido
            </div>
            <p className="text-xs leading-5 text-[#7B8495]">Critérios, fórmulas e documentos internos ficam fora da biblioteca pública.</p>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-[#DFE3E8] bg-white/95 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-7 lg:px-10">
            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <span className="grid size-8 place-items-center rounded-[4px] bg-[#172033] text-sm font-extrabold text-white">Q</span>
              <span className="font-extrabold">QualiPédia</span>
            </Link>
            <div className="hidden items-center gap-2 text-sm text-[#7B8495] lg:flex">
              <Search size={16} />
              <span>Conhecimento aplicado à decisão</span>
            </div>
            <Link href="/metodologias" className="inline-flex items-center gap-2 rounded-[5px] border border-[#D8DDE5] bg-white px-3 py-2 text-sm font-semibold text-[#435067] hover:border-[#B8C2D1] hover:text-[#1D5FD1]">
              <LockKeyhole size={15} />
              Área privada
            </Link>
          </div>
          <nav className="flex gap-1 overflow-x-auto border-t border-[#EEF0F3] px-3 py-2 lg:hidden" aria-label="Navegação móvel">
            {navigation.map(({ label, href, key }) => (
              <Link key={key} href={href} className={`whitespace-nowrap rounded-[4px] px-3 py-2 text-xs font-semibold ${active === key ? "bg-[#EAF1FF] text-[#1D5FD1]" : "text-[#647083]"}`}>
                {label}
              </Link>
            ))}
          </nav>
        </header>
        {children}
        <footer className="border-t border-[#DFE3E8] bg-white px-5 py-8 text-center text-sm text-[#7B8495]">
          QualiPédia · conteúdo público educativo e acervo metodológico protegido
        </footer>
      </div>
    </div>
  );
}
