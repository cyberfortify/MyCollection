# 👑 My Collection: Men's Shirts Online Store

> **Your Style, Our Identity.**

A modern, mobile-first online store for men's shirts, built with plain **HTML, CSS and JavaScript** (no frameworks, no build step). Customers browse shirts, pick a color and size, and place the order directly through **WhatsApp** or **UPI**.

🔗 **Live Demo:** _add your link here_

![My Collection Preview](screenshots/home.png)


## ✨ Features

- **White + Gold + Royal Wine theme**, matched to the brand logo
- **Landing page** with hero section, shirt listing and a **See More / Show Less** button
- **Product details page** for every shirt, with:
  - Photo gallery with thumbnails
  - **Color selector that changes the shirt photo**
  - Size selector (M, L, XL, 2XL) and quantity selector
  - Price, discount percentage and product details
- **Order flow:** order form, UPI payment link and COD option, with the order sent to WhatsApp
- **Floating WhatsApp button** (bottom right) on every page, with a pre-filled message
- **Customer testimonials** section
- **Fully responsive**, designed mobile-first (2-column product grid on phones)
- **Easy to manage:** products, colors, prices and settings all live in one file (`data.js`)
- Automatic fallback drawing if a shirt photo is missing


## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (Grid, Flexbox, CSS variables) |
| Logic | Vanilla JavaScript (ES6) |
| Fonts | Google Fonts (Playfair Display, Poppins) |
| Ordering | WhatsApp Click-to-Chat API, UPI deep link |



## 📁 Project Structure

```
my-collection/
├── index.html        # Landing page (hero, shirts, testimonials, footer)
├── product.html      # Product details + order page
├── style.css         # All styles (theme, responsive layout)
├── data.js           # Store settings, colors, sizes, products, testimonials
├── home.js           # Landing page logic (listing, See More, reviews)
├── product.js        # Product page logic (gallery, color/size, order)
├── logo.jpg          # Brand logo
├── images/           # Shirt photos
│   ├── mc1-black-1.jpg
│   ├── mc1-navy-1.jpg
│   └── ...
└── screenshots/      # README screenshots (optional)
```



## 🚀 Getting Started

No installation needed.

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_NAME/my-collection.git

# 2. Open the folder
cd my-collection

# 3. Run it (any one of these)
# Option A: double-click index.html
# Option B: VS Code → "Live Server" extension → Go Live
# Option C: python -m http.server 5500   → open http://localhost:5500
```

> The product page uses `product.html?id=...`, so keep `index.html` and `product.html` in the same folder.



## ⚙️ Configuration

Open **`data.js`** and edit the settings at the top:

```js
const CONFIG = {
  STORE: "My Collection",
  WHATSAPP: "919999999999",   // country code + number, no "+" or spaces
  UPI_ID: "yourname@upi",     // your UPI ID
  CURRENCY: "₹",
  HOME_COUNT: 4,              // shirts shown on the landing page before "See More"
  INSTAGRAM: "https://instagram.com/yourhandle",
  EMAIL: "hello@mycollection.in",
  PHONE_DISPLAY: "+91 99999 99999"
};
```

### Sizes and colors

```js
const SIZES = ["M", "L", "XL", "2XL"];

const COLORS = [
  { name: "Midnight Black", hex: "#1a1a1a" },
  { name: "Ivory White",    hex: "#F2EEE3" },
  { name: "Navy Blue",      hex: "#1B2A49" },
  { name: "Olive Green",    hex: "#556B2F" }
];
```



## 👕 Adding a Product

Add a new object to the `PRODUCTS` array in `data.js`:

```js
{
  id: "MC-009",
  name: "Classic Formal Shirt",
  price: 899,
  old: 1299,
  tag: "Best Seller",              // optional badge, use "" for none
  variants: {                      // color name → photos
    "Midnight Black": ["images/mc9-black-1.jpg", "images/mc9-black-2.jpg"],
    "Navy Blue":      ["images/mc9-navy-1.jpg"]
  },
  desc: "Short product description.",
  info: ["Premium cotton", "Regular fit", "Full sleeve", "Machine washable"]
}
```

**Rules for photos**
- Color names in `variants` must **exactly match** the names in `COLORS`.
- Only colors listed in `variants` appear as swatches for that shirt.
- Use the same size for all photos (recommended **800×1000 px**, under 200 KB each).
- If a shirt has no color-wise photos, you can use a simple `images: ["images/shirt-1.jpg"]` list instead.


## 🛒 How Ordering Works

1. Customer opens a shirt and selects **color → size → quantity**.
2. Clicks **Buy Now** and fills in name, phone, address, city and pincode.
3. Chooses a payment method:
   - **UPI:** opens GPay / PhonePe / Paytm with the amount and order ID pre-filled, then the customer sends the order and payment screenshot on WhatsApp.
   - **Cash on Delivery:** the order details go straight to WhatsApp.
4. The store owner confirms the payment and ships the order.

> ⚠️ Current UPI payments are **not auto-verified**. The owner checks the screenshot manually. See the roadmap below for automatic payments.


## 🌐 Deployment

### GitHub Pages (free)
1. Push the project to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Source**, select the `main` branch and `/ (root)`, then **Save**.
4. Your site will be live at `https://YOUR_NAME.github.io/my-collection/`.

### Netlify / Vercel (free)
Drag and drop the project folder (or connect the repository). No build settings are needed.


## 🗺️ Roadmap

- [x] Responsive landing page and product listing
- [x] Product page with color-wise photos
- [x] WhatsApp ordering and UPI payment link
- [x] Testimonials and footer
- [ ] Razorpay Payment Links (semi-automatic payment confirmation)
- [ ] Full payment gateway integration (Razorpay / Cashfree) with a serverless backend and webhook verification
- [ ] Order storage (Google Sheets / Firebase / Supabase)
- [ ] Privacy Policy, Refund Policy, Terms and Contact pages
- [ ] Size guide
- [ ] Cart for multiple shirts in one order


## 🔒 Security Note

Never commit secret keys (payment gateway secrets, API tokens) to this repository. When payment gateways are added, keep all secrets in server-side environment variables, never in frontend JavaScript files.



## 🤝 Contributing

Suggestions and improvements are welcome.

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request



## 📄 License

This project is licensed under the **MIT License**. Add a `LICENSE` file if you want to open-source it, or remove this section for a private project.


## 👤 Author

**YOUR_NAME**
- GitHub: [@cyberfortify](https://github.com/cyberfortify)

Built for **My Collection** with a friend. 🛍️


⭐ If you like this project, give it a star on GitHub!