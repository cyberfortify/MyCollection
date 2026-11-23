const id = new URLSearchParams(location.search).get("id");
const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];
const state = { color: COLORS[0], size: null, qty: 1, img: p.images && p.images[0] };
const money = n => CONFIG.CURRENCY + n.toLocaleString("en-IN");
const $ = s => document.querySelector(s);

document.title = p.name + " | My Collection";

function mainImage() {
  return state.img
    ? `<img src="${state.img}" alt="${p.name}" onerror="shirtFallback(this)" />`
    : `<div class="fallback">${shirtSVG(state.color.hex)}</div>`;
}

const thumbs = (p.images || []).length > 1
  ? `<div class="thumbs">${p.images.map((s, i) =>
      `<button class="thumb ${i === 0 ? "active" : ""}" data-src="${s}"><img src="${s}" alt="" onerror="this.parentElement.remove()" /></button>`).join("")}</div>`
  : "";

$("#pdp").innerHTML = `
  <div class="pdp__media">
    <div class="pdp__img" id="pImg">${mainImage()}</div>
    ${thumbs}
  </div>
  <div class="pdp__info">
    ${p.tag ? `<span class="tag tag--static">${p.tag}</span>` : ""}
    <h1>${p.name}</h1>
    <div class="price price--lg"><b>${money(p.price)}</b><s>${money(p.old)}</s>
      <em>${Math.round((1 - p.price / p.old) * 100)}% OFF</em></div>
    <p class="muted">${p.desc}</p>

    <p class="label">Color: <b id="cName">${state.color.name}</b></p>
    <div class="swatches">${COLORS.map((c, i) =>
      `<button class="swatch ${i === 0 ? "active" : ""}" data-i="${i}" style="background:${c.hex}" aria-label="${c.name}"></button>`).join("")}</div>

    <p class="label">Size</p>
    <div class="sizes">${SIZES.map(s => `<button class="size" data-s="${s}">${s}</button>`).join("")}</div>

    <p class="label">Quantity</p>
    <div class="qty"><button id="minus">−</button><span id="qv">1</span><button id="plus">+</button></div>

    <p class="err" id="pErr"></p>
    <button class="btn btn--wine btn--full" id="buy">Buy Now</button>

    <ul class="details">${p.info.map(i => `<li>${i}</li>`).join("")}</ul>
  </div>`;

/* gallery */
document.querySelectorAll(".thumb").forEach(t => t.onclick = () => {
  document.querySelectorAll(".thumb").forEach(x => x.classList.remove("active"));
  t.classList.add("active");
  state.img = t.dataset.src;
  $("#pImg").innerHTML = mainImage();
});

/* color */
document.querySelectorAll(".swatch").forEach(b => b.onclick = () => {
  document.querySelectorAll(".swatch").forEach(x => x.classList.remove("active"));
  b.classList.add("active");
  state.color = COLORS[b.dataset.i];
  $("#cName").textContent = state.color.name;
  if (p.colorImages && p.colorImages[state.color.name]) state.img = p.colorImages[state.color.name];
  $("#pImg").innerHTML = mainImage();
  updateSummary();
});

/* size, qty */
document.querySelectorAll(".size").forEach(b => b.onclick = () => {
  document.querySelectorAll(".size").forEach(x => x.classList.remove("active"));
  b.classList.add("active");
  state.size = b.dataset.s;
  $("#pErr").textContent = "";
  updateSummary();
});
$("#minus").onclick = () => { if (state.qty > 1) { state.qty--; qtyUpdate(); } };
$("#plus").onclick  = () => { if (state.qty < 10) { state.qty++; qtyUpdate(); } };
function qtyUpdate() { $("#qv").textContent = state.qty; updateSummary(); }

function updateSummary() {
  $("#summary").innerHTML = `
    <div class="sum__row"><span>${p.name}</span><b>${money(p.price)}</b></div>
    <div class="sum__row muted"><span>Color / Size / Qty</span><span>${state.color.name} / ${state.size || "-"} / ${state.qty}</span></div>
    <div class="sum__row sum__total"><span>Total</span><b>${money(p.price * state.qty)}</b></div>`;
}

/* Buy now */
$("#buy").onclick = () => {
  if (!state.size) { $("#pErr").textContent = "Pehle size select karo."; return; }
  updateSummary();
  $("#checkout").hidden = false;
  $("#checkout").scrollIntoView({ behavior: "smooth" });
};

/* Place order */
$("#orderForm").addEventListener("submit", e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target).entries());
  const err = $("#err");

  if (!d.name.trim() || !d.address.trim() || !d.city.trim()) return err.textContent = "Saari details bharo.";
  if (!/^\d{10}$/.test(d.phone.replace(/\D/g, "").slice(-10))) return err.textContent = "Sahi 10 digit mobile number daalo.";
  if (!/^\d{6}$/.test(d.pin)) return err.textContent = "Sahi 6 digit pincode daalo.";
  err.textContent = "";

  const orderId = "MC" + Date.now().toString().slice(-7);
  const total = p.price * state.qty;

  const msg =
`🛍️ *New Order – ${CONFIG.STORE}*
Order ID: ${orderId}

*Product:* ${p.name} (${p.id})
*Color:* ${state.color.name}
*Size:* ${state.size}
*Qty:* ${state.qty}
*Total:* ${money(total)}
*Payment:* ${d.pay}

*Name:* ${d.name}
*Phone:* ${d.phone}
*Address:* ${d.address}, ${d.city} - ${d.pin}`;

  const upi = `upi://pay?pa=${CONFIG.UPI_ID}&pn=${encodeURIComponent(CONFIG.STORE)}&am=${total}&cu=INR&tn=${orderId}`;

  $("#orderForm").hidden = true;
  $("#summary").hidden = true;
  const s = $("#success");
  s.hidden = false;
  s.innerHTML = `
    <div class="ok">✓</div>
    <h3>Order Ready!</h3>
    <p class="muted">Order ID: <b>${orderId}</b></p>
    ${d.pay === "UPI" ? `
      <p>Step 1: ${money(total)} ka payment karo</p>
      <a class="btn btn--wine btn--full" href="${upi}">Pay ${money(total)} via UPI</a>
      <p class="muted small">UPI ID: ${CONFIG.UPI_ID}</p>
      <p>Step 2: Order aur payment screenshot WhatsApp par bhejo</p>` :
      `<p>Order confirm karne ke liye WhatsApp par bhejo. Delivery par payment karna hai.</p>`}
    <a class="btn btn--wa btn--full" target="_blank" rel="noopener" href="${waLink(msg)}">Send Order on WhatsApp</a>
    <a class="back-link" href="index.html">← Continue Shopping</a>`;
  s.scrollIntoView({ behavior: "smooth" });
});

$("#wa").innerHTML = WA_ICON;
$("#wa").href = waLink(`Hello! Mujhe "${p.name}" ke baare me puchna hai.`);
updateSummary();