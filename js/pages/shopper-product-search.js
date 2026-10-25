/**
 * SmartShelf - Logic Tìm kiếm & lọc sản phẩm (shopper-product-search.html)
 * Phụ trách bởi: SV1 Trần Trọng Hoàng Anh (MSV: 2551170859)
 * Vertical Slice: Tìm kiếm từ khóa, Lọc danh mục, Lọc tồn kệ, Empty State & Thêm giỏ hàng
 */

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartBadge();

  const searchInput = document.getElementById('searchInput');
  const catFilter = document.getElementById('categoryFilter');
  const stockFilter = document.getElementById('stockFilter');
  const resetBtn = document.getElementById('resetFiltersBtn');

  if (searchInput) searchInput.addEventListener('input', renderProducts);
  if (catFilter) catFilter.addEventListener('change', renderProducts);
  if (stockFilter) stockFilter.addEventListener('change', renderProducts);
  if (resetBtn) resetBtn.addEventListener('click', resetFilters);
});

function resetFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('categoryFilter').value = 'ALL';
  document.getElementById('stockFilter').value = 'ALL';
  renderProducts();
  showToast('Đã đặt lại toàn bộ bộ lọc về mặc định.', 'info');
}

function renderProducts() {
  const container = document.getElementById('productGrid');
  const emptyBox = document.getElementById('emptyState');
  if (!container || !emptyBox) return;

  const keyword = document.getElementById('searchInput').value.trim().toLowerCase();
  const cat = document.getElementById('categoryFilter').value;
  const stock = document.getElementById('stockFilter').value;

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
    emptyBox.style.display = 'block';
    return;
  }

  emptyBox.style.display = 'none';
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
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
            <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted);">${p.category}</span>
            ${badgeHtml}
          </div>
          
          <h3 style="font-size: 0.98rem; font-weight: 700; margin-bottom: 0.35rem; color: var(--text-main); line-height: 1.35; min-height: 2.7rem;">
            ${p.name}
          </h3>
          
          <div style="font-size: 1.2rem; font-weight: 800; color: var(--primary); margin-bottom: 0.75rem;">
            ${p.price.toLocaleString()}đ
          </div>

          <!-- Vị trí kệ -->
          <div class="shelf-location-chip">
            <div style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted);">Vị trí trên kệ:</div>
            <div style="font-weight: 700; font-size: 0.92rem; color: var(--text-main); margin-top: 1px;">
              📍 ${p.shelfId} &nbsp;·&nbsp; ${p.shelfLevel || 'Tầng 2'} (${p.zoneCode || 'Khu vực A'})
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 0.5rem; flex-direction: column;">
          ${isOutOfStock ? `
            <a href="shopper-product-alternatives.html?id=${p.id}" class="btn btn-ai" style="width: 100%;">
              ✨ Gợi ý thay thế bằng AI
            </a>
            <a href="shopper-product-location.html?shelf=${p.shelfId}" class="btn btn-secondary btn-sm" style="width: 100%;">
              📍 Xem vị trí kệ trống
            </a>
          ` : `
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-primary" style="flex: 1;" onclick="handleAddToCart('${p.id}')">
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
}

function handleAddToCart(productId) {
  addToCart(productId, 1);
  updateCartBadge();
  showToast('Đã thêm sản phẩm vào giỏ hàng!', 'success');
}

function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  const badge = document.getElementById('cartCount');
  if (badge) badge.textContent = count;
}
