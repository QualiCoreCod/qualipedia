// QualiPédia — renderização e busca
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function fichaHTML(f) {
  const passos = f.como.map(p => `<li>${esc(p)}</li>`).join("");
  const onde = f.onde ? `<div class="label">Onde já usei</div><div class="onde">${esc(f.onde)}</div>` : "";
  return `<article class="card" data-search="${esc(f.titulo + ' ' + f.categoria + ' ' + f.conceito + ' ' + f.exemplos + ' ' + f.onde).toLowerCase()}">
    <span class="tag">${esc(f.categoria)}</span>
    <h3>${esc(f.titulo)}</h3>
    <p>${esc(f.conceito)}</p>
    <div class="label">Como aplicar</div><ol>${passos}</ol>
    <div class="label">Exemplos de uso</div><p>${esc(f.exemplos)}</p>
    ${onde}
  </article>`;
}

function guiaHTML(g) {
  return `<article class="card" data-search="${esc(g.problema + ' ' + g.ferramenta).toLowerCase()}">
    <h3><span class="arrow">→</span> ${esc(g.problema)}</h3>
    <p><span class="sol">${esc(g.ferramenta)}</span></p>
  </article>`;
}

function acervoHTML(a) {
  return `<article class="card wide" data-search="${esc(a.titulo + ' ' + a.descricao).toLowerCase()}">
    <span class="tag g">Acervo</span>
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
count.textContent = `${cards.length} fichas disponíveis`;

document.getElementById("q").addEventListener("input", e => {
  const q = e.target.value.trim().toLowerCase();
  let visiveis = 0;
  cards.forEach(c => {
    const ok = !q || c.dataset.search.includes(q);
    c.style.display = ok ? "" : "none";
    if (ok) visiveis++;
  });
  count.textContent = q ? `${visiveis} resultado(s) para “${e.target.value.trim()}”` : `${cards.length} fichas disponíveis`;
});
