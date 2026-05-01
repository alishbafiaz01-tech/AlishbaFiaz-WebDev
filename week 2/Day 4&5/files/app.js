/* ── PRODUCTS DATA ── */
const PRODUCTS = [
  {
    id: 1,
    name: "Obsidian Ceramic Mug",
    price: 34,
    category: "Kitchen",
    image: "https://i.pinimg.com/1200x/52/e6/56/52e65644c0734b9d315af36a6b06337f.jpg",
    desc: "Hand-thrown ceramic mug with a deep obsidian glaze. Each piece is unique, fired in a wood kiln for subtle texture variations. Holds 12 oz and is microwave + dishwasher safe."
  },
  {
    id: 2,
    name: "Linen Throw Pillow",
    price: 52,
    category: "Home",
    image: "https://i.pinimg.com/1200x/bd/f0/89/bdf089d8cb57c296e825c7fc400235c6.jpg",
    desc: "Belgian linen pillow cover in a warm sandstone tone. Invisible zipper closure, 20×20 inches. Insert not included. Machine washable at 30°C."
  },
  {
    id: 3,
    name: "Amber Glass Vase",
    price: 68,
    category: "Decor",
    image: "https://i.pinimg.com/1200x/5f/cd/ae/5fcdae4fef930d54454ac65c18cc7f71.jpg",
    desc: "Blown glass vase in warm amber with organic imperfections that catch the light beautifully. 12 inches tall, 4-inch opening. Perfect for dried botanicals."
  },
  {
    id: 4,
    name: "Wooden Desk Organizer",
    price: 45,
    category: "Office",
    image: "https://i.pinimg.com/1200x/cb/ca/69/cbca69644e0aa9bd6960d0e860bddca4.jpg",
    desc: "Solid walnut desk organizer with 5 compartments. Oil-finished for water resistance. Dimensions: 12×8×3 inches. Made by hand in small batches."
  },
  {
    id: 5,
    name: "Soy Wax Candle",
    price: 28,
    category: "Lifestyle",
    image: "https://i.pinimg.com/736x/53/fc/b0/53fcb059d278410aff540f375f57f022.jpg",
    desc: "Clean-burning soy wax candle with a cotton wick. Scented with cedarwood, black pepper, and a hint of vetiver. 8 oz, 50+ hour burn time."
  },
  {
    id: 6,
    name: "Merino Wool Blanket",
    price: 120,
    category: "Home",
    image: "https://i.pinimg.com/1200x/2c/be/bc/2cbebcfc34c43da65caa1eb249188651.jpg",
    desc: "Extra-fine merino wool blanket, woven in Portugal. 140×200 cm. Naturally temperature-regulating, machine washable on wool cycle. Available in four earth tones."
  },
  {
    id: 7,
    name: "Marble Tray Set",
    price: 89,
    category: "Decor",
    image: "https://i.pinimg.com/1200x/3c/85/0b/3c850b84f485c68f895b2c7e5368c7fa.jpg",
    desc: "Set of two honed white marble trays with black veining. Small: 8×5 in. Large: 14×8 in. Natural material means every tray has a unique pattern."
  },
  {
    id: 8,
    name: "Cork Yoga Mat",
    price: 95,
    category: "Lifestyle",
    image: "https://i.pinimg.com/1200x/a5/c1/e6/a5c1e6baf25795dcaa743ac8d7ef2ccd.jpg",
    desc: "Natural cork surface over a 4mm rubber base. Self-cleaning, antimicrobial, and non-slip. 68×24 inches. Comes with a carry strap. Printed with a subtle mandala in plant-based ink."
  }
];

/* ── AUTH HELPERS ── */
function requireLogin() {
  if (!localStorage.getItem('aura_session')) {
    window.location.href = 'login.html';
    return null;
  }
  return JSON.parse(localStorage.getItem('aura_session'));
}

function logout() {
  localStorage.removeItem('aura_session');
  window.location.href = 'login.html';
}

/* ── CART HELPERS ── */
function getCart() {
  return JSON.parse(localStorage.getItem('aura_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('aura_cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId) {
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  saveCart(cart);
  showToast('Added to cart ✦');
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  const total = getCart().reduce((s, i) => s + i.qty, 0);
  badge.textContent = total;
  badge.style.display = total ? 'inline' : 'none';
}

function cartTotal() {
  return getCart().reduce((sum, item) => {
    const p = PRODUCTS.find(p => p.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}

/* ── TOAST ── */
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast'; toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 2500);
}

/* ── NAV RENDER ── */
function renderNav(activePage) {
  const session = JSON.parse(localStorage.getItem('aura_session') || 'null');
  const cartCount = getCart().reduce((s, i) => s + i.qty, 0);
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  nav.innerHTML = `
    <a class="nav-brand" href="index.html">✦ AURA</a>
    <div class="nav-links">
      <a href="index.html" class="${activePage==='home'?'active':''}">Shop</a>
      <a href="cart.html" class="${activePage==='cart'?'active':''}">
        Cart <span id="cartBadge" class="cart-badge" style="display:${cartCount?'inline':'none'}">${cartCount}</span>
      </a>
      ${session ? `<span style="color:var(--text-muted);font-size:.85rem">Hi, ${session.name.split(' ')[0]}</span>
        <button class="btn-logout" onclick="logout()">Logout</button>` : ''}
    </div>
  `;
}