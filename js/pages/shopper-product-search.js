/**
 * SmartShelf - Logic Tìm kiếm & lọc sản phẩm (shopper-product-search.html)
 * Phụ trách bởi: SV1 Trần Trọng Hoàng Anh (MSV: 2551170859)
 * Vertical Slice: Tìm kiếm từ khóa, Lọc danh mục, Lọc tồn kệ, Empty State & Thêm giỏ hàng
 * Tách biệt 3 tầng kiến trúc: 100% JS nằm trong file này
 */

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartBadge();

  const searchInput = document.getElementById('searchInput');
  const catFilter = document.getElementById('categoryFilter');
  const stockFilter = document.getElementById('stockFilter');
  const resetBtn = document.getElementById('resetFiltersBtn');
  const emptyResetBtn = document.getElementById('emptyStateResetBtn');

  if (searchInput) searchInput.addEventListener('input', renderProducts);
  if (catFilter) catFilter.addEventListener('change', renderProducts);
  if (stockFilter) stockFilter.addEventListener('change', renderProducts);
  if (resetBtn) resetBtn.addEventListener('click', resetFilters);
  if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetFilters);
});

function resetFilters() {
  const searchInput = document.getElementById('searchInput');
  const catFilter = document.getElementById('categoryFilter');
  const stockFilter = document.getElementById('stockFilter');

  if (searchInput) searchInput.value = '';
  if (catFilter) catFilter.value = 'ALL';
  if (stockFilter) stockFilter.value = 'ALL';

  renderProducts();
  showToast('Đã đặt lại toàn bộ bộ lọc về mặc định.', 'info');
}

// Window export for backward compatibility
window.resetFilters = resetFilters;

function renderProducts() {
  const container = document.getElementById('productGrid');
  const emptyBox = document.getElementById('emptyState');
  if (!container || !emptyBox) return;

  const searchInput = document.getElementById('searchInput');
  const catFilter = document.getElementById('categoryFilter');
  const stockFilter = document.getElementById('stockFilter');

  const keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';
  const cat = catFilter ? catFilter.value : 'ALL';
  const stock = stockFilter ? stockFilter.value : 'ALL';

  let list = getProducts();

  if (keyword) {
    list = list.filter(p => 
      p.name.toLowerCase().includes(keyword) || 
      p.sku.toLowerCase().includes(keyword) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(keyword)))
    );
  }
  if (cat !== 'ALL') {
    list = list.filter(p => p.category.includes(cat) || cat.includes(p.category));
  }
  if (stock === 'IN_STOCK') {
    list = list.filter(p => p.stockQty > 0);
  } else if (stock === 'EMPTY') {
    list = list.filter(p => p.stockQty <= 0);
  }

  if (list.length === 0) {
    container.innerHTML = '';
    emptyBox.classList.remove('d-none');
    return;
  }

  emptyBox.classList.add('d-none');
  container.innerHTML = list.map(p => {
    const isOutOfStock = p.stockQty <= 0;
    let badgeHtml = '';
    if (isOutOfStock) {
      badgeHtml = '<span class="badge badge-empty">Hết hàng</span>';
    } else if (p.stockQty <= p.minQty) {
      badgeHtml = `<span class="badge badge-low">Còn ít (${p.stockQty} sp)</span>`;
    } else {
      badgeHtml = `<span class="badge badge-normal">Sẵn hàng (${p.stockQty} sp)</span>`;
    }

    return `
      <div class="card product-item-card">
        <div>
          <div class="product-card-top">
            <span class="product-category-tag">${p.category}</span>
            ${badgeHtml}
          </div>
          
          <h3 class="product-name-title">
            ${p.name}
          </h3>
          
          <div class="product-price-tag">
            ${p.price.toLocaleString()}đ
          </div>

          <!-- Vị trí kệ -->
          <div class="shelf-location-chip">
            <div class="shelf-location-label">Vị trí trên kệ:</div>
            <div class="shelf-location-val">
              📍 ${p.shelfId} &nbsp;·&nbsp; ${p.shelfLevel || 'Tầng 2'} (${p.zoneCode || 'Khu vực A'})
            </div>
          </div>
        </div>

        <div class="product-card-actions">
          ${isOutOfStock ? `
            <a href="shopper-product-alternatives.html?id=${p.id}" class="btn btn-ai w-100">
              ✨ Gợi ý thay thế bằng AI
            </a>
            <a href="shopper-product-location.html?shelf=${p.shelfId}" class="btn btn-secondary btn-sm w-100">
              📍 Xem vị trí kệ trống
            </a>
          ` : `
            <div class="d-flex gap-05">
              <button class="btn btn-primary flex-1 btn-add-cart" data-id="${p.id}">
                + Thêm vào giỏ
              </button>
              <a href="shopper-product-location.html?shelf=${p.shelfId}&prod=${p.id}" class="btn btn-secondary" title="Dẫn đường tới kệ">
                📍 Chỉ đường
              </a>
            </div>
          `}
        </div>
      </div>
    `;
  }).join('');

  // Bind cart buttons cleanly without inline onclick
  container.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (id) handleAddToCart(id);
    });
  });
}

function handleAddToCart(productId) {
  addToCart(productId, 1);
  updateCartBadge();
  showToast('🛒 Tuyệt vời! Đã thêm sản phẩm vào giỏ hàng thành công!', 'success');
}

// Window export
window.handleAddToCart = handleAddToCart;

function updateCartBadge() {
  const badge = document.getElementById('cartCount');
  if (!badge) return;
  const cart = getCart();
  const total = cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = total;
}

// Window alias for cross-tab auto refresh
window.renderProducts = renderProducts;
