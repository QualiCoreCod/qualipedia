// QualiPédia — renderização, cards e busca
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Ícones line-art por categoria (lucide-style, traço fino)
const ICONS = {
  classic: '<svg viewBox="0 0 24 24"><path d="M3 12h14M17 12l-4-4m4 4l-4 4M8 12l2-6h3M10 6l2 6M6 12l2 6h3M8 18l2-6"/></svg>', // Ishikawa
  cycle: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 7 4M19 8l-1-3m1 3l-3-1M12 20a8 8 0 0 1-7-4M5 16l1 3m-1-3l3 1"/></svg>', // PDCA
  plan: '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v2h6V3M9 9h6M9 13h6M9 17h3"/></svg>', // plano
  shield: '<svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>', // norma/conformidade
  gauge: '<svg viewBox="0 0 24 24"><path d="M4 18a8 8 0 0 1 16 0"/><path d="M12 18l5-7"/><circle cx="12" cy="18" r="1"/></svg>', // medição
  target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>', // estratégia
  trend: '<svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-9"/><path d="M15 6h6v6"/></svg>', // melhoria contínua
  book: '<svg viewBox="0 0 24 24"><path d="M12 6c-2-1.5-5-2-9-2v16c4 0 7 .5 9 2 2-1.5 5-2 9-2V4c-4 0-7 .5-9 2z"/><path d="M12 6v16"/></svg>', // fundamentos
  flow: '<svg viewBox="0 0 24 24"><rect x="3" y="10" width="6" height="5" rx="2"/><path d="M9 12h3m0 0l-2-2m2 2l-2 2"/><rect x="12" y="4" width="6" height="5" rx="2"/><path d="M15 9v6"/><circle cx="15" cy="17" r="2.5"/></svg>', // processos
  route: '<svg viewBox="0 0 24 24"><circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M6 16V9a3 3 0 0 1 3-3h6"/></svg>', // guia de decisão
  star: '<svg viewBox="0 0 24 24"><path d="M12 3l2.7 5.8 6.3.8-4.6 4.3 1.2 6.1-5.6-3-5.6 3 1.2-6.1L3 9.6l6.3-.8z"/></svg>', // acervo
};

function iconFor(f) {
  const c = (f.categoria || "").toLowerCase();
  if (c.includes("clássicas") || c.includes("classic")) return ICONS.classic;
  if (c.includes("ciclo") || c.includes("melhoria cont")) return ICONS.cycle;
  if (c.includes("planejamento")) return ICONS.plan;
  if (c.includes("norma")) return ICONS.shield;
  if (c.includes("medi") || c.includes("indicadores")) return ICONS.gauge;
  if (c.includes("estratégia") || c.includes("estrategia")) return ICONS.target;
  if (c.includes("fundamento")) return ICONS.book;
  if (c.includes("processo")) return ICONS.flow;
  return ICONS.trend;
}

function fichaHTML(f) {
  const passos = f.como.map(p => `<li>${esc(p)}</li>`).join("");
  const onde = f.onde ? `<div class="label">Onde já usei</div><div class="onde">${esc(f.onde)}</div>` : "";
  return `<article class="card" data-search="${esc(f.titulo + ' ' + f.categoria + ' ' + f.conceito + ' ' + f.exemplos + ' ' + f.onde).toLowerCase()}">
    <div class="card-head"><span class="card-icon">${iconFor(f)}</span><span class="tag">${esc(f.categoria)}</span></div>
    <h3>${esc(f.titulo)}</h3>
    <p>${esc(f.conceito)}</p>
    <div class="label">Como aplicar</div><ol>${passos}</ol>
    <div class="label">Exemplos de uso</div><p>${esc(f.exemplos)}</p>
    ${onde}
  </article>`;
}

function guiaHTML(g) {
  return `<article class="card" data-search="${esc(g.problema + ' ' + g.ferramenta).toLowerCase()}">
    <div class="card-head"><span class="card-icon">${ICONS.route}</span></div>
    <h3><span class="arrow">→</span> ${esc(g.problema)}</h3>
    <p><span class="sol">${esc(g.ferramenta)}</span></p>
  </article>`;
}

function acervoHTML(a) {
  return `<article class="card wide" data-search="${esc(a.titulo + ' ' + a.descricao).toLowerCase()}">
    <div class="card-head"><span class="card-icon">${ICONS.star}</span><span class="tag g">Acervo</span></div>
    <h3>${esc(a.titulo)}</h3>
    <p>${esc(a.descricao)}</p>
  </article>`;
}

document.getElementById("enc-cards").innerHTML = QUALIPEDIA.enciclopedia.map(fichaHTML).join("");
document.getElementById("guia-cards").innerHTML = QUALIPEDIA.guia.map(guiaHTML).join("");
document.getElementById("acervo-cards").innerHTML = QUALIPEDIA.acervo.map(acervoHTML).join("");
document.getElementById("ano").textContent = new Date().getFullYear();

const cards = [...document.querySelectorAll("[data-search]")];
const count = document.getElementById("count");
const input = document.getElementById("q");
count.textContent = `${cards.length} fichas disponíveis`;

function buscar(termo) {
  input.value = termo;
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

input.addEventListener("input", e => {
  const q = e.target.value.trim().toLowerCase();
  let visiveis = 0;
  cards.forEach(c => {
    const ok = !q || c.dataset.search.includes(q);
    c.style.display = ok ? "" : "none";
    if (ok) visiveis++;
  });
  count.textContent = q ? `${visiveis} resultado(s) para “${e.target.value.trim()}”` : `${cards.length} fichas disponíveis`;
});

// Chips de exemplo e itens de menu que disparam busca
document.querySelectorAll(".chip, .nav-search").forEach(el => {
  el.addEventListener("click", () => buscar(el.dataset.term));
});
