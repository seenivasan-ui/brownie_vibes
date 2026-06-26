// ==================== MENU DATA ====================
// Each item has an "image" field. Place your image files in the images/ folder
// and update the filename here. Example: "images/classic-fudge-brownie.jpg"
//
// To update prices/descriptions: edit this menuData array and save.
// Items auto-update on the website on next load.

let menuData = [
  {
    id: 1,
    name: "Classic Fudge Brownie",
    desc: "Original Brownie Vibes recipe — dense, gooey, and utterly addictive.",
    price: 10,
    category: "brownies",
    // ADD YOUR IMAGE HERE: place the image file in the images/ folder
    // and update the path below. Example: "images/classic-fudge-brownie.jpg"
    image: "images/classic-fudge-brownie.jpg",
    badge: "From ₹10"
  },
  {
    id: 2,
    name: "Dark Chocolate Brownie",
    desc: "Intense 70% dark chocolate brownie for the true chocoholic.",
    price: 30,
    category: "brownies",
    // ADD YOUR IMAGE HERE
    image: "images/dark-chocolate-brownie.jpg"
  },
  {
    id: 3,
    name: "Nutella Swirl Brownie",
    desc: "Fudgy brownie with a generous Nutella ribbon swirled through.",
    price: 45,
    category: "brownies",
    // ADD YOUR IMAGE HERE
    image: "images/nutella-swirl-brownie.jpg"
  },
  {
    id: 4,
    name: "Cream Cheese Brownie",
    desc: "Dense brownie with a silky cream cheese layer on top.",
    price: 50,
    category: "brownies",
    // ADD YOUR IMAGE HERE
    image: "images/cream-cheese-brownie.jpg"
  },
  {
    id: 5,
    name: "Custom Birthday Cake (0.5kg)",
    desc: "Fully personalized theme cake. DM for design options!",
    price: 450,
    category: "cakes",
    // ADD YOUR IMAGE HERE
    image: "images/custom-birthday-cake.jpg",
    badge: "Popular"
  },
  {
    id: 6,
    name: "Chocolate Truffle Cake (1kg)",
    desc: "Rich layers of chocolate sponge and truffle ganache.",
    price: 800,
    category: "cakes",
    // ADD YOUR IMAGE HERE
    image: "images/chocolate-truffle-cake.jpg"
  },
  {
    id: 7,
    name: "Butterscotch Cake (0.5kg)",
    desc: "Light, fluffy butterscotch sponge with crunchy praline.",
    price: 400,
    category: "cakes",
    // ADD YOUR IMAGE HERE
    image: "images/butterscotch-cake.jpg"
  },
  {
    id: 8,
    name: "Red Velvet Cake (1kg)",
    desc: "Classic red velvet with cream cheese frosting.",
    price: 850,
    category: "cakes",
    // ADD YOUR IMAGE HERE
    image: "images/red-velvet-cake.jpg"
  },
  {
    id: 9,
    name: "Choco-Chip Cookie",
    desc: "Loaded with chocolate chips, crispy edges, chewy centre.",
    price: 30,
    category: "cookies",
    // ADD YOUR IMAGE HERE
    image: "images/choco-chip-cookie.jpg"
  },
  {
    id: 10,
    name: "Glazed Donut",
    desc: "Soft fluffy donuts with sugar glaze. Pick your flavour!",
    price: 40,
    category: "cookies",
    // ADD YOUR IMAGE HERE
    image: "images/glazed-donut.jpg"
  },
  {
    id: 11,
    name: "Brownie Cookie Sandwich",
    desc: "Two cookies hugging a brownie centre. Pure joy.",
    price: 60,
    category: "cookies",
    // ADD YOUR IMAGE HERE
    image: "images/brownie-cookie-sandwich.jpg",
    badge: "New"
  },
  {
    id: 12,
    name: "Mini Burger (2 pcs)",
    desc: "Bite-sized burgers with juicy patty and fresh veggies.",
    price: 80,
    category: "savory",
    // ADD YOUR IMAGE HERE
    image: "images/mini-burger.jpg"
  },
  {
    id: 13,
    name: "Mini Pizza",
    desc: "Loaded mini pizzas with cheese pull guaranteed.",
    price: 120,
    category: "savory",
    // ADD YOUR IMAGE HERE
    image: "images/mini-pizza.jpg"
  },
  {
    id: 14,
    name: "Icecream Cake",
    desc: "Blend of creamy ice cream and soft cake.",
    price: 120,
    category: "cakes",
    // ADD YOUR IMAGE HERE
    image: "images/icecream.jpg"
  },
  {
    id: 15,
    name: "Blueberry Cake",
    desc: "Burst of fruity sweetness in every bite.",
    price: 120,
    category: "cakes",
    // ADD YOUR IMAGE HERE
    image: "images/blueberry.jpg"
  }
];

let cart = [];
let currentCategory = 'all';
let nextId = menuData.length + 1;

// ==================== RENDER MENU ====================
function renderMenu(category) {
  currentCategory = category;
  const grid = document.getElementById('menuGrid');
  const items = category === 'all' ? menuData : menuData.filter(i => i.category === category);

  grid.innerHTML = items.map(item => `
    <div class="menu-card reveal" data-id="${item.id}">
      ${item.badge ? `<div class="menu-card-badge">${item.badge}</div>` : ''}
      <div class="menu-card-img-wrapper">
        <!--
          ADD IMAGE: Place your image file in the images/ folder.
          The filename is set in menuData above for item id=${item.id}.
          Example: images/${item.id}-your-item-name.jpg
        -->
        <img
          src="${item.image}"
          alt="${item.name}"
          onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg, #F9E8E0 0%, #e8c9b8 100%)'"
        >
        <div class="menu-card-overlay">
          <button class="btn-primary" onclick="addToCart(${item.id})" style="transform:scale(0.9)"><span>+ Add to Cart</span></button>
        </div>
      </div>
      <div class="menu-card-body">
        <div class="menu-card-name">${item.name}</div>
        <div class="menu-card-desc">${item.desc}</div>
        <div class="menu-card-footer">
          <div class="menu-card-price">₹${item.price}</div>
          <button class="add-to-cart-btn" onclick="addToCart(${item.id})">+</button>
        </div>
      </div>
    </div>
  `).join('');

  setTimeout(triggerReveal, 50);
}

function filterMenu(cat, btn) {
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderMenu(cat);
}

// ==================== CART ====================
function addToCart(id) {
  const item = menuData.find(i => i.id === id);
  if (!item) return;
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...item, qty: 1 });
  updateCartUI();
  showToast(`🍫 ${item.name} added!`);
  const countEl = document.getElementById('cartCount');
  countEl.textContent = cart.reduce((s,i) => s + i.qty, 0);
  countEl.classList.add('bump');
  setTimeout(() => countEl.classList.remove('bump'), 500);
}

function updateCartUI() {
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
  document.getElementById('cartTotal').textContent = `₹${total}`;
  document.getElementById('cartCount').textContent = cart.reduce((s,i) => s + i.qty, 0);
  const container = document.getElementById('cartItems');
  if (cart.length === 0) {
    container.innerHTML = `<div class="cart-empty"><span>🍫</span><p>Your cart is empty.<br>Add something delicious!</p></div>`;
    return;
  }
  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">🍫</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price} × ${item.qty} = ₹${item.price * item.qty}</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
    </div>
  `).join('');
}

function changeQty(id, delta) {
  const idx = cart.findIndex(c => c.id === id);
  if (idx < 0) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  updateCartUI();
}

function toggleCart() {
  document.getElementById('cartOverlay').classList.toggle('open');
  document.getElementById('cartSidebar').classList.toggle('open');
}

function orderViaWhatsApp() {
  if (cart.length === 0) { showToast('Your cart is empty!'); return; }
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
  let msg = `Hello Brownie Vibes! 🍫 I'd like to order:\n\n`;
  cart.forEach(i => { msg += `• ${i.name} × ${i.qty} = ₹${i.price * i.qty}\n`; });
  msg += `\n*Total: ₹${total}*\nPlease confirm my order! 🙏`;
  window.open(`https://wa.me/919842916379?text=${encodeURIComponent(msg)}`, '_blank');
}

// ==================== OWNER LOGIN ====================
const OWNER_CREDS = { user: 'admin', pass: 'brownievibes2025' };

function openOwnerLogin() {
  document.getElementById('ownerLoginModal').classList.add('open');
  document.getElementById('loginError').style.display = 'none';
  document.getElementById('ownerUser').value = '';
  document.getElementById('ownerPass').value = '';
}

function closeOwnerLogin() {
  document.getElementById('ownerLoginModal').classList.remove('open');
}

function ownerLogin() {
  const u = document.getElementById('ownerUser').value.trim();
  const p = document.getElementById('ownerPass').value.trim();
  if (u === OWNER_CREDS.user && p === OWNER_CREDS.pass) {
    closeOwnerLogin();
    openDashboard();
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
}

function ownerLogout() {
  document.getElementById('ownerDashboard').classList.remove('open');
  showToast('✓ Logged out successfully');
}

// ==================== OWNER DASHBOARD ====================
function openDashboard() {
  document.getElementById('ownerDashboard').classList.add('open');
  renderOwnerGrid();
}

function renderOwnerGrid() {
  const grid = document.getElementById('ownerMenuGrid');
  grid.innerHTML = menuData.map(item => `
    <div class="owner-card" id="ownerCard_${item.id}">
      <div class="owner-card-head">
        <div class="owner-card-emoji">🍫</div>
        <div>
          <div class="owner-card-name">${item.name}</div>
          <div class="owner-card-category">${item.category}</div>
        </div>
      </div>
      <label style="font-size:0.78rem;font-weight:600;color:var(--text-mid);text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:6px;">Price (₹)</label>
      <input class="owner-price-input" id="price_${item.id}" value="${item.price}" type="number" min="0">
      <label style="font-size:0.78rem;font-weight:600;color:var(--text-mid);text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:6px;margin-top:8px;">Description</label>
      <input class="owner-price-input" id="desc_${item.id}" value="${item.desc}" style="font-size:0.85rem;color:var(--text-dark);font-weight:400;">
      <div class="owner-card-actions" style="margin-top:8px;">
        <button class="owner-save-btn" onclick="saveItem(${item.id})">💾 Save Changes</button>
        <button class="owner-delete-btn" onclick="deleteItem(${item.id})">🗑️</button>
      </div>
    </div>
  `).join('');
}

function saveItem(id) {
  const item = menuData.find(i => i.id === id);
  if (!item) return;
  const newPrice = parseFloat(document.getElementById(`price_${id}`).value);
  const newDesc = document.getElementById(`desc_${id}`).value;
  if (!isNaN(newPrice) && newPrice >= 0) item.price = newPrice;
  item.desc = newDesc;
  renderMenu(currentCategory);
  showToast(`✓ "${item.name}" updated!`);
}

function deleteItem(id) {
  const item = menuData.find(i => i.id === id);
  if (!item) return;
  if (!confirm(`Delete "${item.name}"?`)) return;
  menuData = menuData.filter(i => i.id !== id);
  renderOwnerGrid();
  renderMenu(currentCategory);
  showToast(`🗑️ "${item.name}" deleted`);
}

function addNewItem() {
  const name = document.getElementById('newItemName').value.trim();
  const price = parseFloat(document.getElementById('newItemPrice').value);
  const desc = document.getElementById('newItemDesc').value.trim();
  const category = document.getElementById('newItemCategory').value;
  const emoji = document.getElementById('newItemEmoji').value.trim() || '🍰';
  if (!name || isNaN(price)) { showToast('⚠️ Name and price required!'); return; }
  const newItem = {
    id: nextId++,
    name,
    price,
    desc: desc || 'Delicious homemade treat.',
    category,
    // ADD IMAGE PATH for new items in the images/ folder
    image: `images/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`
  };
  menuData.push(newItem);
  renderOwnerGrid();
  renderMenu(currentCategory);
  document.getElementById('newItemName').value = '';
  document.getElementById('newItemPrice').value = '';
  document.getElementById('newItemDesc').value = '';
  document.getElementById('newItemEmoji').value = '';
  showToast(`✓ "${name}" added to menu!`);
}

// ==================== ENQUIRY ====================
function sendWhatsAppEnquiry() {
  const name = document.getElementById('enquiryName').value.trim() || 'A customer';
  const type = document.getElementById('enquiryType').value;
  const msg = document.getElementById('enquiryMsg').value.trim();
  const text = `Hi Brownie Vibes! 🍫\n\nMy name is ${name}.\nI'm interested in: ${type || 'General enquiry'}\n\n${msg ? 'Details: ' + msg : ''}\n\nPlease get back to me. Thank you! 🙏`;
  window.open(`https://wa.me/919842916379?text=${encodeURIComponent(text)}`, '_blank');
}

// ==================== UTILS ====================
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

function triggerReveal() {
  const els = document.querySelectorAll('.reveal:not(.revealed)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
}

// Custom cursor
document.addEventListener('mousemove', e => {
  document.getElementById('cursor').style.left = e.clientX - 6 + 'px';
  document.getElementById('cursor').style.top = e.clientY - 6 + 'px';
  document.getElementById('cursorRing').style.left = e.clientX - 18 + 'px';
  document.getElementById('cursorRing').style.top = e.clientY - 18 + 'px';
});

// Nav scroll
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 60);
  triggerReveal();
});

// Mobile menu
function toggleMobileMenu() {
  const links = document.querySelector('.nav-links');
  if (links.style.display === 'flex') {
    links.style.display = 'none';
  } else {
    Object.assign(links.style, {
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: '72px',
      left: '0',
      right: '0',
      background: 'rgba(253,246,236,0.98)',
      padding: '2rem',
      gap: '1.5rem',
      backdropFilter: 'blur(20px)',
      zIndex: '999',
      borderBottom: '1px solid rgba(168,82,45,0.1)'
    });
  }
}

// Init
renderMenu('all');
setTimeout(triggerReveal, 300);
