const id = new URLSearchParams(location.search).get("id");
const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];
const money = n => CONFIG.CURRENCY + n.toLocaleString("en-IN");
const $ = s => document.querySelector(s);

/* is shirt ke available colors aur unki photos */
let colorList = p.variants ? COLORS.filter(c => p.variants[c.name]) : COLORS;
if (!colorList.length) colorList = COLORS;
const imagesFor = c => (p.variants && p.variants[c.name]) || p.images || [];

const state = { color: colorList[0], size: null, qty: 1, img: null };
state.img = imagesFor(state.color)[0];

document.title = p.name + " | My Collection";

function mainImage() {
  return state.img
    ? `<img src="${state.img}" alt="${p.name} - ${state.color.name}" onerror="shirtFallback(this)" />`
    : `<div class="fallback">${shirtSVG(state.color.hex)}</div>`;
}

function thumbsHTML() {
  const list = imagesFor(state.color);
  if (list.length < 2) return "";
  return list.map(s => `
    <button class="thumb ${s === state.img ? "active" : ""}" data-src="${s}">
      <img src="${s}" alt="" onerror="this.parentElement.remove()" />
    </button>`).join("");
}

function bindThumbs() {
  document.querySelectorAll(".thumb").forEach(t => t.onclick = () => {
    state.img = t.dataset.src;
    $("#pImg").innerHTML = mainImage();
    document.querySelectorAll(".thumb").forEach(x => x.classList.toggle("active", x === t));
  });
}

$("#pdp").innerHTML = `
  <div class="pdp__media">
    <div class="pdp__img" id="pImg">${mainImage()}</div>
    <div class="thumbs" id="thumbs">${thumbsHTML()}</div>
  </div>
  <div class="pdp__info">
    ${p.tag ? `<span class="tag tag--static">${p.tag}</span>` : ""}
    <h1>${p.name}</h1>
    <div class="price price--lg"><b>${money(p.price)}</b><s>${money(p.old)}</s>
      <em>${Math.round((1 - p.price / p.old) * 100)}% OFF</em></div>
    <p class="muted">${p.desc}</p>

    <p class="label">Color: <b id="cName">${state.color.name}</b></p>
    <div class="swatches">${colorList.map((c, i) =>
      `<button class="swatch ${i === 0 ? "active" : ""}" data-i="${i}" style="background:${c.hex}" aria-label="${c.name}" title="${c.name}"></button>`).join("")}</div>

    <p class="label">Size</p>
    <div class="sizes">${SIZES.map(s => `<button class="size" data-s="${s}">${s}</button>`).join("")}</div>

    <p class="label">Quantity</p>
    <div class="qty"><button id="minus">−</button><span id="qv">1</span><button id="plus">+</button></div>

    <p class="err" id="pErr"></p>
    <button class="btn btn--wine btn--full" id="buy">Buy Now</button>

    <ul class="details">${p.info.map(i => `<li>${i}</li>`).join("")}</ul>
  </div>`;

bindThumbs();

/* color click → photo + thumbnails badal jaye */
document.querySelectorAll(".swatch").forEach(b => b.onclick = () => {
  document.querySelectorAll(".swatch").forEach(x => x.classList.remove("active"));
  b.classList.add("active");
  state.color = colorList[b.dataset.i];
  state.img = imagesFor(state.color)[0];
  $("#cName").textContent = state.color.name;
  $("#pImg").innerHTML = mainImage();
  $("#thumbs").innerHTML = thumbsHTML();
  bindThumbs();
  updateSummary();
});

/* size, qty */

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