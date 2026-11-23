const CONFIG = {
  STORE: "My Collection",
  WHATSAPP: "917400229276",     // country code ke saath, + ke bina
  UPI_ID: "rupaliop576-3@okhdfcbank",  // apna UPI ID yahan daalo
  CURRENCY: "₹",
  HOME_COUNT: 4,
  INSTAGRAM: "https://instagram.com/mycollection",
  EMAIL: "mycollectionwear@gmail.com",
  PHONE_DISPLAY: "+91 74002 29276"
};

const SIZES = ["M", "L", "XL", "2XL"];

const COLORS = [
  { name: "Midnight Black", hex: "#1a1a1a" },
  { name: "Ivory White",    hex: "#F2EEE3" },
  { name: "Navy Blue",      hex: "#1B2A49" },
  { name: "Olive Green",    hex: "#556B2F" }
];

/* images: apni photos ke naam yahan likho (pehli photo listing me dikhegi)
   colorImages (optional): kisi color ki alag photo ho to
   colorImages: { "Navy Blue": "images/shirt-1-navy.jpg" } */
const PRODUCTS = [
  { id: "MC-001", name: "Classic Formal Shirt", price: 1, old: 1299, tag: "Best Seller",
    images: ["images/shirt-1.jpg", "images/shirt-1b.jpg"],
    desc: "Daily office aur formal events ke liye sharp aur comfortable shirt.",
    info: ["Premium cotton fabric", "Regular fit", "Full sleeve", "Machine washable"] },
  { id: "MC-002", name: "Slim Fit Casual Shirt", price: 799, old: 1099, tag: "New",
    images: ["images/shirt-2.jpg"],
    desc: "Casual outings ke liye slim fit shirt, soft aur breathable.",
    info: ["Cotton blend fabric", "Slim fit", "Full sleeve", "Easy to iron"] },
  { id: "MC-003", name: "Premium Cotton Shirt", price: 999, old: 1499, tag: "Premium",
    images: ["images/shirt-3.jpg"],
    desc: "Extra soft premium cotton, har wash ke baad fresh.",
    info: ["100% premium cotton", "Regular fit", "Full sleeve", "Low shrinkage"] },
  { id: "MC-004", name: "Signature Gold Edition", price: 1199, old: 1699, tag: "Limited",
    images: ["images/shirt-4.jpg"],
    desc: "Gold detailing ke saath limited edition shirt.",
    info: ["Premium fabric", "Gold button detail", "Slim fit", "Limited stock"] },
  { id: "MC-005", name: "Oxford Everyday Shirt", price: 849, old: 1199, tag: "",
    images: ["images/shirt-5.jpg"],
    desc: "Oxford weave wala durable shirt, roz pehenne ke liye.",
    info: ["Oxford cotton", "Regular fit", "Full sleeve", "Durable stitching"] },
  { id: "MC-006", name: "Urban Half Sleeve", price: 699, old: 999, tag: "Summer",
    images: ["images/shirt-6.jpg"],
    desc: "Garmi ke liye halka aur cool half sleeve shirt.",
    info: ["Light cotton", "Regular fit", "Half sleeve", "Breathable"] },
  { id: "MC-007", name: "Linen Touch Shirt", price: 1049, old: 1499, tag: "",
    images: ["images/shirt-7.jpg"],
    desc: "Linen jaisa feel, par zyada soft aur wrinkle kam.",
    info: ["Linen-touch fabric", "Relaxed fit", "Full sleeve", "Lightweight"] },
  { id: "MC-008", name: "Party Wear Shirt", price: 1299, old: 1799, tag: "Trending",
    images: ["images/shirt-8.jpg"],
    desc: "Parties aur functions ke liye stylish shirt.",
    info: ["Premium fabric", "Slim fit", "Full sleeve", "Smooth finish"] }
];

/* ⚠️ Ye sample reviews hain. Launch se pehle apne asli customers ke reviews daalo. */
const TESTIMONIALS = [
  { name: "Rahul S.",  city: "Pune",   stars: 5, text: "Fabric bahut soft hai aur fitting ekdam perfect. WhatsApp par order karna bahut easy tha." },
  { name: "Aman K.",   city: "Mumbai", stars: 5, text: "Photo jaisa hi shirt mila. Delivery fast thi aur packing bhi premium." },
  { name: "Siddharth P.", city: "Nashik", stars: 4, text: "Price ke hisaab se quality kaafi achhi hai. Friends ko bhi recommend kiya." }
];

/* Photo load na ho to shirt ki drawing dikhao */
function shirtSVG(hex) {
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Shirt">
  <path fill="${hex}" stroke="#C9A227" stroke-width="1.6" stroke-linejoin="round"
    d="M72 24 L40 38 L8 88 L38 104 L55 82 L55 182 Q100 190 145 182 L145 82 L162 104 L192 88 L160 38 L128 24 Q100 44 72 24Z"/>
  <path fill="rgba(255,255,255,.18)" stroke="#C9A227" stroke-width="1.2" d="M72 24 L100 62 L84 20Z"/>
  <path fill="rgba(255,255,255,.18)" stroke="#C9A227" stroke-width="1.2" d="M128 24 L100 62 L116 20Z"/>
  <line x1="100" y1="62" x2="100" y2="184" stroke="#C9A227" stroke-width="1.1"/>
  <g fill="#C9A227"><circle cx="100" cy="82" r="2.4"/><circle cx="100" cy="106" r="2.4"/><circle cx="100" cy="130" r="2.4"/><circle cx="100" cy="154" r="2.4"/></g>
</svg>`;
}
function shirtFallback(img) {
  img.outerHTML = `<div class="fallback">${shirtSVG(COLORS[0].hex)}</div>`;
}

const waLink = (msg) => `https://wa.me/${CONFIG.WHATSAPP}?text=${encodeURIComponent(msg)}`;
const WA_ICON = `<svg viewBox="0 0 32 32" width="28" height="28" fill="#fff"><path d="M16 3C9 3 3.4 8.6 3.4 15.5c0 2.3.6 4.4 1.7 6.3L3 29l7.4-2c1.8 1 3.8 1.5 5.8 1.5 6.9 0 12.5-5.6 12.5-12.5S22.9 3 16 3zm0 22.8c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-4.4 1.2 1.2-4.3-.3-.4a10.2 10.2 0 0 1-1.6-5.5C5.4 9.8 10.2 5.2 16 5.2s10.6 4.6 10.6 10.3S21.8 25.8 16 25.8zm5.7-7.6c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.6-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.300 1.400 3.500c.2.2 2.4 3.700 5.800 5.100.8.4 1.400.6 1.900.7.8.3 1.500.2 2.100.1.6-.1 1.900-.8 2.200-1.500.3-.7.3-1.400.2-1.500-.1-.2-.3-.2-.6-.4z"/></svg>`;