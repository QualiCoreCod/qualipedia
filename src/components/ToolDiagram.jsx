import React from "react";

// Definições de Estilo Vetorial Corporativo
const PALETTE = {
  line: "#1E293B",        // slate-800
  petroleo: "#172B3F",    // azul petróleo institucional
  destaque: "#2563EB",    // azul interação
  nodeBg: "#FFFFFF",
  nodeHeader: "#F1F5F9",
  textPrimary: "#0F172A",
  textMuted: "#475569",
  accentBg: "#EFF6FF",
  alertBg: "#FEF2F2",
  alertBorder: "#EF4444"
};

function DiagramDefs() {
  return (
    <defs>
      <marker
        id="diagram-arrow"
        viewBox="0 0 10 10"
        refX="6"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1E293B" />
      </marker>
      <marker
        id="diagram-arrow-blue"
        viewBox="0 0 10 10"
        refX="6"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563EB" />
      </marker>
    </defs>
  );
}

// 1. Diagrama de Ishikawa (Espinha de Peixe 6M)
function IshikawaDiagram() {
  const causes = [
    { label: "Método", x: 130, y: 50, branchX: 190, items: ["Procedimento desatualizado", "Falta de padrão operacional"] },
    { label: "Máquina", x: 280, y: 50, branchX: 340, items: ["Falta de calibração", "Desgaste preventivo"] },
    { label: "Material", x: 430, y: 50, branchX: 490, items: ["Lote divergente", "Especificação incorreta"] },
    { label: "Mão de Obra", x: 130, y: 270, branchX: 190, items: ["Treinamento insuficiente", "Sobrecarga de tarefas"] },
    { label: "Medição", x: 280, y: 270, branchX: 340, items: ["Instrumento inadequado", "Critério subjetivo"] },
    { label: "Meio Ambiente", x: 430, y: 270, branchX: 490, items: ["Ruído excessivo", "Temperatura e layout"] }
  ];

  return (
    <div className="w-full overflow-x-auto py-2">
      <svg viewBox="0 0 760 360" className="w-full min-w-[680px] bg-slate-50/50 rounded-2xl border-2 border-slate-200">
        <DiagramDefs />

        {/* Espinha Principal Central */}
        <line x1="50" y1="180" x2="570" y2="180" stroke={PALETTE.line} strokeWidth="3.5" markerEnd="url(#diagram-arrow)" />

        {/* Cabeça do Problema / Efeito */}
        <g transform="translate(580, 140)">
          <rect width="160" height="80" rx="12" fill={PALETTE.petroleo} stroke={PALETTE.line} strokeWidth="2" />
          <text x="80" y="34" fill="#FFFFFF" fontSize="13" fontWeight="800" textAnchor="middle" letterSpacing="0.05em">EFEITO / DESVIO</text>
          <text x="80" y="56" fill="#93C5FD" fontSize="12" fontWeight="600" textAnchor="middle">Problema a Analisar</text>
        </g>

        {/* Espinhas Secundárias (6M) */}
        {causes.map((c, i) => {
          const isTop = i < 3;
          return (
            <g key={c.label}>
              {/* Linha da espinha */}
              <line
                x1={c.x}
                y1={isTop ? c.y + 40 : c.y}
                x2={c.branchX}
                y2="180"
                stroke={PALETTE.destaque}
                strokeWidth="2.5"
                markerEnd="url(#diagram-arrow-blue)"
              />

              {/* Caixa de Categoria (6M) */}
              <rect
                x={c.x - 65}
                y={isTop ? c.y : c.y}
                width="130"
                height="36"
                rx="8"
                fill="#FFFFFF"
                stroke={PALETTE.destaque}
                strokeWidth="2"
              />
              <text
                x={c.x}
                y={isTop ? c.y + 23 : c.y + 23}
                fill={PALETTE.petroleo}
                fontSize="13"
                fontWeight="700"
                textAnchor="middle"
              >
                {c.label}
              </text>

              {/* Subcausas */}
              {c.items.map((item, idx) => {
                const subY = isTop ? c.y + 65 + idx * 26 : c.y - 45 + idx * 26;
                const subX = c.x + 10;
                return (
                  <g key={item}>
                    <line x1={subX} y1={subY} x2={subX + 45} y2={subY} stroke="#94A3B8" strokeWidth="1.5" />
                    <text x={subX + 48} y={subY + 4} fill={PALETTE.textMuted} fontSize="10.5" fontWeight="500">
                      {item}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// 2. Ciclo PDCA (Deming)
function PdcaDiagram() {
  const steps = [
    { letter: "P", name: "PLAN", label: "Planejar", desc: "Metas, plano de ação 5W2H e mapeamento de riscos", x: 60, y: 40, color: "#1D4ED8", bg: "#EFF6FF" },
    { letter: "D", name: "DO", label: "Executar", desc: "Capacitar equipes e executar o processo conforme padrão", x: 370, y: 40, color: "#0D9488", bg: "#F0FDFA" },
    { letter: "A", name: "ACT", label: "Agir Corretivamente", desc: "Padronizar sucessos ou reiniciar ciclo de melhoria", x: 60, y: 210, color: "#B45309", bg: "#FEF3C7" },
    { letter: "C", name: "CHECK", label: "Verificar", desc: "Monitorar indicadores, comparar resultados e auditar", x: 370, y: 210, color: "#4338CA", bg: "#EEF2FF" }
  ];

  return (
    <div className="w-full overflow-x-auto py-2">
      <svg viewBox="0 0 700 390" className="w-full min-w-[620px] bg-slate-50/50 rounded-2xl border-2 border-slate-200">
        <DiagramDefs />

        {/* Setas circulares direcionais */}
        <path d="M 330 90 L 360 90" stroke={PALETTE.line} strokeWidth="2.5" markerEnd="url(#diagram-arrow)" />
        <path d="M 500 170 L 500 200" stroke={PALETTE.line} strokeWidth="2.5" markerEnd="url(#diagram-arrow)" />
        <path d="M 360 270 L 330 270" stroke={PALETTE.line} strokeWidth="2.5" markerEnd="url(#diagram-arrow)" />
        <path d="M 190 200 L 190 170" stroke={PALETTE.line} strokeWidth="2.5" markerEnd="url(#diagram-arrow)" />

        {/* 4 Blocos do Quadrante */}
        {steps.map((s) => (
          <g key={s.letter} transform={`translate(${s.x}, ${s.y})`}>
            <rect width="260" height="120" rx="14" fill="#FFFFFF" stroke={s.color} strokeWidth="2.5" />
            <rect width="260" height="38" rx="12" fill={s.bg} />
            <rect y="26" width="260" height="12" fill={s.bg} />
            <line x1="0" y1="38" x2="260" y2="38" stroke={s.color} strokeWidth="1.5" />

            <circle cx="28" cy="20" r="13" fill={s.color} />
            <text x="28" y="25" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle">{s.letter}</text>

            <text x="50" y="25" fill={s.color} fontSize="14" fontWeight="800">{s.name}</text>
            <text x="100" y="25" fill={PALETTE.textMuted} fontSize="12" fontWeight="600">({s.label})</text>

            <text x="18" y="70" fill={PALETTE.textPrimary} fontSize="12" fontWeight="600" width="220">
              Objetivo da Fase:
            </text>
            <text x="18" y="90" fill={PALETTE.textMuted} fontSize="11" fontWeight="400">
              {s.desc}
            </text>
          </g>
        ))}

        {/* Núcleo Central */}
        <circle cx="345" cy="185" r="28" fill={PALETTE.petroleo} stroke="#FFFFFF" strokeWidth="4" />
        <text x="345" y="190" fill="#FFFFFF" fontSize="10.5" fontWeight="800" textAnchor="middle">MELHORIA</text>
      </svg>
    </div>
  );
}

// 3. Matriz GUT (Gravidade, Urgência e Tendência)
function GutMatrixDiagram() {
  return (
    <div className="w-full overflow-x-auto py-2">
      <svg viewBox="0 0 700 320" className="w-full min-w-[620px] bg-slate-50/50 rounded-2xl border-2 border-slate-200">
        {/* Título Header */}
        <rect x="30" y="25" width="640" height="42" rx="10" fill={PALETTE.petroleo} />
        <text x="350" y="52" fill="#FFFFFF" fontSize="14" fontWeight="800" textAnchor="middle" letterSpacing="0.05em">
          ESTRUTURA DE PRIORIZAÇÃO: MATRIZ G.U.T. (Score = G × U × T)
        </text>

        {/* 3 Colunas Principais */}
        {[
          { name: "G — Gravidade", desc: "Qual é o impacto no negócio se nada for feito?", scale: "1 (Sem dano) a 5 (Extremamente grave)", color: "#DC2626", bg: "#FEF2F2", x: 30 },
          { name: "U — Urgência", desc: "Qual é o tempo disponível antes do agravamento?", scale: "1 (Pode esperar) a 5 (Ação imediata)", color: "#D97706", bg: "#FFFBEB", x: 250 },
          { name: "T — Tendência", desc: "O problema vai piorar com o passar dos dias?", scale: "1 (Não vai mudar) a 5 (Piora rápida)", color: "#2563EB", bg: "#EFF6FF", x: 470 },
        ].map((col) => (
          <g key={col.name} transform={`translate(${col.x}, 85)`}>
            <rect width="200" height="150" rx="12" fill="#FFFFFF" stroke={col.color} strokeWidth="2.5" />
            <rect width="200" height="38" rx="10" fill={col.bg} />
            <rect y="26" width="200" height="12" fill={col.bg} />
            <line x1="0" y1="38" x2="200" y2="38" stroke={col.color} strokeWidth="1.5" />

            <text x="100" y="24" fill={col.color} fontSize="13" fontWeight="800" textAnchor="middle">{col.name}</text>
            <text x="15" y="65" fill={PALETTE.textPrimary} fontSize="11.5" fontWeight="600">Critério de Avaliação:</text>
            <text x="15" y="85" fill={PALETTE.textMuted} fontSize="11" width="170">{col.desc}</text>

            <rect x="15" y="110" width="170" height="26" rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
            <text x="100" y="127" fill={col.color} fontSize="10.5" fontWeight="700" textAnchor="middle">{col.scale}</text>
          </g>
        ))}

        {/* Barra de Ação de Resultado */}
        <g transform="translate(30, 255)">
          <rect width="640" height="42" rx="8" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
          <text x="320" y="26" fill={PALETTE.textPrimary} fontSize="12" fontWeight="700" textAnchor="middle">
            Regra Prática: Problemas com maior pontuação total (máx. 125) devem entrar imediatamente no Plano de Ação 5W2H.
          </text>
        </g>
      </svg>
    </div>
  );
}

// 4. SIPOC / Mapeamento de Processo
function SipocDiagram() {
  const columns = [
    { title: "S — Supplier", subtitle: "Fornecedores", desc: "Quem fornece entradas para a etapa", x: 30 },
    { title: "I — Input", subtitle: "Entradas", desc: "Materiais, dados ou solicitações necessárias", x: 160 },
    { title: "P — Process", subtitle: "Processo", desc: "4 a 7 etapas macro sequenciais", x: 290, isProcess: true },
    { title: "O — Output", subtitle: "Saídas", desc: "Produtos, relatórios ou serviços gerados", x: 420 },
    { title: "C — Customer", subtitle: "Clientes", desc: "Quem recebe o resultado final do fluxo", x: 550 },
  ];

  return (
    <div className="w-full overflow-x-auto py-2">
      <svg viewBox="0 0 700 260" className="w-full min-w-[640px] bg-slate-50/50 rounded-2xl border-2 border-slate-200">
        <DiagramDefs />

        {/* Setas Conectoras entre Etapas */}
        <line x1="145" y1="130" x2="160" y2="130" stroke={PALETTE.destaque} strokeWidth="2.5" markerEnd="url(#diagram-arrow-blue)" />
        <line x1="275" y1="130" x2="290" y2="130" stroke={PALETTE.destaque} strokeWidth="2.5" markerEnd="url(#diagram-arrow-blue)" />
        <line x1="405" y1="130" x2="420" y2="130" stroke={PALETTE.destaque} strokeWidth="2.5" markerEnd="url(#diagram-arrow-blue)" />
        <line x1="535" y1="130" x2="550" y2="130" stroke={PALETTE.destaque} strokeWidth="2.5" markerEnd="url(#diagram-arrow-blue)" />

        {columns.map((c) => (
          <g key={c.title} transform={`translate(${c.x}, 40)`}>
            <rect
              width="120"
              height="180"
              rx="12"
              fill={c.isProcess ? PALETTE.petroleo : "#FFFFFF"}
              stroke={c.isProcess ? PALETTE.line : "#CBD5E1"}
              strokeWidth="2.5"
            />
            <text
              x="60"
              y="32"
              fill={c.isProcess ? "#FFFFFF" : PALETTE.destaque}
              fontSize="13"
              fontWeight="900"
              textAnchor="middle"
            >
              {c.title.split(" — ")[0]}
            </text>
            <text
              x="60"
              y="52"
              fill={c.isProcess ? "#93C5FD" : PALETTE.textPrimary}
              fontSize="11.5"
              fontWeight="700"
              textAnchor="middle"
            >
              {c.subtitle}
            </text>
            <line x1="15" y1="64" x2="105" y2="64" stroke={c.isProcess ? "#3B82F6" : "#E2E8F0"} strokeWidth="1.5" />
            <text
              x="60"
              y="95"
              fill={c.isProcess ? "#E2E8F0" : PALETTE.textMuted}
              fontSize="10"
              fontWeight="500"
              textAnchor="middle"
              width="100"
            >
              {c.desc}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// 5. Plano de Ação 5W2H
function FiveWTwoHDiagram() {
  const questions = [
    { q: "What?", pt: "O quê?", desc: "Ação a ser executada", bg: "#EFF6FF" },
    { q: "Why?", pt: "Por quê?", desc: "Justificativa e benefício", bg: "#EFF6FF" },
    { q: "Where?", pt: "Onde?", desc: "Local ou departamento", bg: "#EFF6FF" },
    { q: "When?", pt: "Quando?", desc: "Prazo limite de entrega", bg: "#EFF6FF" },
    { q: "Who?", pt: "Quem?", desc: "Responsável direto único", bg: "#EFF6FF" },
    { q: "How?", pt: "Como?", desc: "Procedimento e etapas", bg: "#FEF3C7" },
    { q: "How much?", pt: "Quanto custa?", desc: "Custo ou orçamento", bg: "#FEF3C7" },
  ];

  return (
    <div className="w-full overflow-x-auto py-2">
      <svg viewBox="0 0 720 220" className="w-full min-w-[660px] bg-slate-50/50 rounded-2xl border-2 border-slate-200">
        <rect x="25" y="20" width="670" height="38" rx="8" fill={PALETTE.petroleo} />
        <text x="360" y="44" fill="#FFFFFF" fontSize="13.5" fontWeight="800" textAnchor="middle" letterSpacing="0.05em">
          METODOLOGIA 5W2H — DIRETRIZES DE EXECUÇÃO SEM AMBIGUIDADE
        </text>

        {questions.map((item, idx) => (
          <g key={item.q} transform={`translate(${25 + idx * 96}, 75)`}>
            <rect width="90" height="120" rx="10" fill="#FFFFFF" stroke={PALETTE.line} strokeWidth="2" />
            <rect width="90" height="32" rx="8" fill={item.bg} />
            <rect y="22" width="90" height="10" fill={item.bg} />
            <line x1="0" y1="32" x2="90" y2="32" stroke="#CBD5E1" strokeWidth="1" />

            <text x="45" y="21" fill={PALETTE.petroleo} fontSize="12" fontWeight="800" textAnchor="middle">{item.q}</text>
            <text x="45" y="52" fill={PALETTE.destaque} fontSize="11" fontWeight="700" textAnchor="middle">{item.pt}</text>
            <text x="45" y="80" fill={PALETTE.textMuted} fontSize="9.5" fontWeight="500" textAnchor="middle" width="80">
              {item.desc}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function getDiagramInfo(toolTitle) {
  if (!toolTitle) return null;
  const t = toolTitle.toLowerCase();
  if (t.includes("ishikawa") || t.includes("causa e efeito") || t.includes("espinha")) {
    return { name: "Diagrama de Ishikawa", component: IshikawaDiagram };
  }
  if (t.includes("pdca") || t.includes("deming")) {
    return { name: "Ciclo PDCA", component: PdcaDiagram };
  }
  if (t.includes("gut") || t.includes("priorizacao") || t.includes("gravidade")) {
    return { name: "Matriz GUT", component: GutMatrixDiagram };
  }
  if (t.includes("sipoc") || t.includes("fluxo") || t.includes("processo")) {
    return { name: "SIPOC", component: SipocDiagram };
  }
  if (t.includes("5w2h") || t.includes("plano de acao")) {
    return { name: "5W2H", component: FiveWTwoHDiagram };
  }
  return null;
}

export default function ToolDiagram({ tool }) {
  const info = getDiagramInfo(tool);
  if (!info) return null;
  const Comp = info.component;

  return (
    <section className="mt-8 rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-destaque block">
            Representação Técnica Vetorial
          </span>
          <h3 className="font-heading text-lg font-bold text-slate-900">
            Estrutura Visual: {info.name}
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 rounded-md px-2.5 py-1">
          SVG Alta Precisão
        </span>
      </div>
      <Comp />
    </section>
  );
}
