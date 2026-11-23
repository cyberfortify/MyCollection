const grid = document.getElementById("grid");
const moreBtn = document.getElementById("moreBtn");
let expanded = false;

function photo(p) {
  const src = p.variants ? Object.values(p.variants)[0][0] : (p.images && p.images[0]);
  return src
    ? `<img src="${src}" alt="${p.name}" loading="lazy" onerror="shirtFallback(this)" />`
    : `<div class="fallback">${shirtSVG(COLORS[0].hex)}</div>`;
}

function card(p) {
  const off = Math.round((1 - p.price / p.old) * 100);
  const colors = p.variants ? COLORS.filter(c => p.variants[c.name]) : COLORS;
  return `
  <a class="card" href="product.html?id=${p.id}">
    <div class="card__img">
      ${p.tag ? `<span class="tag">${p.tag}</span>` : ""}
      <span class="off">${off}% OFF</span>
      ${photo(p)}
    </div>
    <div class="card__body">
      <h3>${p.name}</h3>
      <div class="dots">${colors.map(c => `<i style="background:${c.hex}"></i>`).join("")}</div>
      <div class="price"><b>${CONFIG.CURRENCY}${p.price}</b><s>${CONFIG.CURRENCY}${p.old}</s></div>
    </div>
  </a>`;
}

function render() {
  const list = expanded ? PRODUCTS : PRODUCTS.slice(0, CONFIG.HOME_COUNT);
  grid.innerHTML = list.map(card).join("");
  moreBtn.textContent = expanded ? "Show Less" : "See More";
  moreBtn.parentElement.style.display = PRODUCTS.length > CONFIG.HOME_COUNT ? "" : "none";
}
moreBtn.addEventListener("click", () => { expanded = !expanded; render(); });
render();

/* testimonials */
document.getElementById("reviewList").innerHTML = TESTIMONIALS.map(t => `
  <article class="review">
    <div class="stars">${"★".repeat(t.stars)}${"☆".repeat(5 - t.stars)}</div>
    <p>“${t.text}”</p>
    <div class="who"><span class="av">${t.name[0]}</span><div><b>${t.name}</b><small>${t.city}</small></div></div>
  </article>`).join("");

/* footer + whatsapp */
const msg = "Hello My Collection! 👋 I'm interested in your shirts. Could you please share more details?";
const wa = document.getElementById("wa");
wa.innerHTML = WA_ICON; wa.href = waLink(msg);
document.getElementById("fWa").href = waLink(msg);
document.getElementById("fPhone").textContent = CONFIG.PHONE_DISPLAY;
document.getElementById("fPhone").href = "tel:+" + CONFIG.WHATSAPP;
document.getElementById("fMail").textContent = CONFIG.EMAIL;
document.getElementById("fMail").href = "mailto:" + CONFIG.EMAIL;
document.getElementById("fInsta").href = CONFIG.INSTAGRAM;
document.getElementById("year").textContent = new Date().getFullYear();