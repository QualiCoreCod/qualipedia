import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookLock, CheckCircle2, LockKeyhole, ShieldAlert, ShieldCheck } from "lucide-react";
import { requireChatGPTUser, chatGPTSignOutPath } from "@/app/chatgpt-auth";
import { SiteShell } from "@/components/site-shell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Metodologias protegidas",
  description: "Área privada do acervo metodológico da QualiPédia.",
  robots: { index: false, follow: false },
};

const axes = [
  { title: "Qualidade técnica", text: "Avalia a correção e a consistência da orientação prestada no atendimento." },
  { title: "Experiência do cliente", text: "Observa como o cliente percebe clareza, esforço, segurança e resolução." },
  { title: "Riscos e não conformidades", text: "Registra desvios relevantes e orienta tratamento, prevenção e acompanhamento." },
  { title: "Elogios", text: "Reconhece comportamentos e entregas que geram valor e merecem ser reforçados." },
];

export default async function MethodologiesPage() {
  const user = await requireChatGPTUser("/metodologias");
  const ownerEmail = process.env.OWNER_EMAIL?.trim().toLowerCase();
  const hasOwnerAccess = Boolean(ownerEmail && user.email.toLowerCase() === ownerEmail);

  return (
    <SiteShell active="metodologias">
      <main className="mx-auto max-w-[1180px] px-4 py-10 sm:px-7 lg:px-10 lg:py-14">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#1D5FD1] hover:underline"><ArrowLeft size={16} /> Voltar à biblioteca</Link>

        {!hasOwnerAccess ? (
          <section className="mt-8 max-w-2xl rounded-[6px] border border-[#E6C9C5] bg-white p-6 sm:p-8">
            <div className="grid size-11 place-items-center rounded-[5px] bg-[#FFF0EE] text-[#C43224]"><ShieldAlert size={22} /></div>
            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#C43224]">Acesso restrito</p>
            <h1 className="mt-2 text-2xl font-extrabold tracking-[-0.025em]">Esta conta não está autorizada a abrir o acervo metodológico</h1>
            <p className="mt-3 text-base leading-7 text-[#647083]">A autenticação confirma quem entrou. A autorização da proprietária determina quem pode ver o conteúdo privado. Sua conta está conectada, mas não recebeu essa permissão.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/" className="rounded-[5px] bg-[#2563EB] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#1D55C8]">Ir para a área pública</Link>
              <a href={chatGPTSignOutPath("/metodologias")} className="rounded-[5px] border border-[#C9D0DB] px-4 py-2.5 text-sm font-bold text-[#435067] hover:border-[#98A1AF]">Entrar com outra conta</a>
            </div>
          </section>
        ) : (
          <>
            <section className="mt-8 border-b border-[#DFE3E8] pb-9">
              <div className="mb-4 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#1D5FD1]"><ShieldCheck size={17} /> Sessão protegida</div>
              <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-end">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">Metodologias próprias</h1>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-[#647083]">Este espaço guarda métodos criados a partir da experiência profissional. A primeira estrutura aplica gestão da qualidade ao atendimento técnico e ao relacionamento com o cliente.</p>
                </div>
                <div className="rounded-[6px] border border-[#D9E2F2] bg-[#F5F8FF] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#7B8495]">Conta autorizada</p>
                  <p className="mt-1 break-all text-sm font-bold text-[#263248]">{user.email}</p>
                </div>
              </div>
            </section>

            <section className="py-10" aria-labelledby="method-title">
              <div className="flex items-start gap-4">
                <div className="grid size-11 shrink-0 place-items-center rounded-[5px] bg-[#172033] text-white"><BookLock size={21} /></div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#1D5FD1]">Metodologia 01</p>
                  <h2 id="method-title" className="mt-1 text-2xl font-extrabold tracking-[-0.025em]">Qualidade aplicada ao atendimento</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-[#647083]">Estrutura adaptável a atendimento técnico, suporte e relacionamento com clientes. Esta tela apresenta somente os eixos. Os critérios, pesos, cálculos, documentos e exemplos internos entram em módulos protegidos posteriores.</p>
                </div>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {axes.map((axis, index) => (
                  <article key={axis.title} className="rounded-[6px] border border-[#DFE3E8] bg-white p-5">
                    <div className="flex items-start gap-3">
                      <span className="grid size-8 shrink-0 place-items-center rounded-[4px] bg-[#EAF1FF] text-sm font-extrabold text-[#1D5FD1]">{index + 1}</span>
                      <div>
                        <h3 className="font-extrabold text-[#263248]">{axis.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-[#647083]">{axis.text}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[6px] border border-[#C9D8F2] bg-[#F5F8FF] p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <LockKeyhole className="mt-0.5 shrink-0 text-[#1D5FD1]" size={20} />
                <div>
                  <h2 className="font-extrabold">Proteção por camadas</h2>
                  <ul className="mt-3 space-y-2">
                    <li className="flex gap-2 text-sm leading-6 text-[#536071]"><CheckCircle2 size={16} className="mt-1 shrink-0 text-[#1D5FD1]" />Login obrigatório para abrir esta rota.</li>
                    <li className="flex gap-2 text-sm leading-6 text-[#536071]"><CheckCircle2 size={16} className="mt-1 shrink-0 text-[#1D5FD1]" />Autorização conferida no servidor pela conta da proprietária.</li>
                    <li className="flex gap-2 text-sm leading-6 text-[#536071]"><CheckCircle2 size={16} className="mt-1 shrink-0 text-[#1D5FD1]" />Nenhum critério confidencial foi incluído no código público desta versão.</li>
                  </ul>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </SiteShell>
  );
}
