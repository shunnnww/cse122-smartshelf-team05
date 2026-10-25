/**
 * SmartShelf - Logic Quản trị danh mục sản phẩm (admin-product-management.html)
 * Phụ trách bởi: SV3 Nguyễn Văn Hân (MSV: 2551170885)
 * Vertical Slice: Master CRUD sản phẩm (Thêm, Sửa, Xóa, Gán kệ, Validate form)
 */

document.addEventListener('DOMContentLoaded', () => {
  renderAdminProducts();

  const searchInput = document.getElementById('adminSearchInput');
  const catFilter = document.getElementById('adminCatFilter');
  const shelfFilter = document.getElementById('adminShelfFilter');
  const crudForm = document.getElementById('productCrudForm');
  const openBtn = document.getElementById('openAddProdModalBtn');
  const closeBtn = document.getElementById('closeProdModalBtn');
  const cancelBtn = document.getElementById('cancelProdModalBtn');
  const tbody = document.getElementById('adminProductsTbody');

  if (searchInput) searchInput.addEventListener('input', renderAdminProducts);
  if (catFilter) catFilter.addEventListener('change', renderAdminProducts);
  if (shelfFilter) shelfFilter.addEventListener('change', renderAdminProducts);
  if (crudForm) crudForm.addEventListener('submit', handleSaveProduct);
  if (openBtn) openBtn.addEventListener('click', openProductModal);
  if (closeBtn) closeBtn.addEventListener('click', closeProductModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeProductModal);

  if (tbody) {
    tbody.addEventListener('click', (e) => {
      const editBtn = e.target.closest('.btn-edit-prod');
      if (editBtn) {
        const id = editBtn.getAttribute('data-id');
        if (id) editProduct(id);
        return;
      }
      const deleteBtn = e.target.closest('.btn-delete-prod');
      if (deleteBtn) {
        const id = deleteBtn.getAttribute('data-id');
        if (id) deleteProductItem(id);
        return;
      }
    });
  }
});

function renderAdminProducts() {
  const prods = getProducts();
  const searchInput = document.getElementById('adminSearchInput');
  const catFilter = document.getElementById('adminCatFilter');
  const shelfFilter = document.getElementById('adminShelfFilter');

  const keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';
  const cat = catFilter ? catFilter.value : 'ALL';
  const shelf = shelfFilter ? shelfFilter.value : 'ALL';

  let list = prods;
  if (keyword) {
    list = list.filter(p => p.name.toLowerCase().includes(keyword) || p.sku.toLowerCase().includes(keyword));
  }
  if (cat !== 'ALL') {
    list = list.filter(p => p.category.includes(cat));
  }
  if (shelf !== 'ALL') {
    list = list.filter(p => p.shelfId === shelf);
  }

  const badge = document.getElementById('totalProdsBadge');
  if (badge) badge.textContent = `${list.length} sản phẩm`;

  const tbody = document.getElementById('adminProductsTbody');
  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center p-4 text-muted">Không có sản phẩm nào phù hợp.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(p => {
    let badgeHtml = '<span class="badge badge-normal">Đủ hàng</span>';
    if (p.stockQty <= 0) badgeHtml = '<span class="badge badge-empty">Hết hàng</span>';
    else if (p.stockQty <= p.minQty) badgeHtml = '<span class="badge badge-low">Sắp hết</span>';

    return `
      <tr>
        <td><code>${p.sku}</code></td>
        <td>
          <strong class="text-main fs-sm">${p.name}</strong>
        </td>
        <td>${p.category}</td>
        <td><strong>${p.price.toLocaleString()}đ</strong></td>
        <td>
          <strong class="text-primary">${p.shelfId}</strong> · ${p.shelfLevel || 'Tầng 2'}
        </td>
        <td><strong>${p.stockQty}</strong> / Tối thiểu ${p.minQty}</td>
        <td>${badgeHtml}</td>
        <td class="text-right">
          <div class="d-inline-flex gap-1">
            <button type="button" class="btn btn-secondary btn-sm btn-edit-prod" data-id="${p.id}">✏️ Sửa</button>
            <button type="button" class="btn btn-secondary btn-sm text-danger btn-delete-prod" data-id="${p.id}">🗑️ Xóa</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function openProductModal() {
  document.getElementById('editProdId').value = '';
  document.getElementById('productModalTitle').textContent = 'Thêm sản phẩm mới vào kệ';
  document.getElementById('productCrudForm').reset();
  const modal = document.getElementById('productModal');
  if (modal) modal.classList.add('active');
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) modal.classList.remove('active');
}

function editProduct(id) {
  const p = getProductById(id);
  if (!p) return;

  document.getElementById('editProdId').value = p.id;
  document.getElementById('productModalTitle').textContent = `Chỉnh sửa sản phẩm: ${p.sku}`;
  document.getElementById('prodNameInput').value = p.name;
  document.getElementById('prodSkuInput').value = p.sku;
  document.getElementById('prodCategorySelect').value = p.category;
  document.getElementById('prodPriceInput').value = p.price;
  document.getElementById('prodShelfSelect').value = p.shelfId;
  document.getElementById('prodShelfLevel').value = p.shelfLevel || 'Tầng 2';
  document.getElementById('prodStockInput').value = p.stockQty;
  document.getElementById('prodMinInput').value = p.minQty;
  document.getElementById('prodVelocityInput').value = p.salesVelocity || 20;
  document.getElementById('prodDescInput').value = p.description || '';

  const modal = document.getElementById('productModal');
  if (modal) modal.classList.add('active');
}

function handleSaveProduct(e) {
  e.preventDefault();
  const editId = document.getElementById('editProdId').value;
  const name = document.getElementById('prodNameInput').value.trim();
  const sku = document.getElementById('prodSkuInput').value.trim();

  if (!name || !sku) {
    showToast('Vui lòng điền đầy đủ Tên và Mã SKU!', 'error');
    return;
  }

  const payload = {
    name: name,
    sku: sku,
    category: document.getElementById('prodCategorySelect').value,
    price: parseInt(document.getElementById('prodPriceInput').value) || 10000,
    shelfId: document.getElementById('prodShelfSelect').value,
    shelfLevel: document.getElementById('prodShelfLevel').value,
    stockQty: parseInt(document.getElementById('prodStockInput').value) || 0,
    minQty: parseInt(document.getElementById('prodMinInput').value) || 20,
    salesVelocity: parseInt(document.getElementById('prodVelocityInput').value) || 20,
    description: document.getElementById('prodDescInput').value.trim()
  };

  if (editId) {
    updateProduct(editId, payload);
    showToast('Đã cập nhật thông tin sản phẩm!', 'success');
  } else {
    addProduct(payload);
    showToast('Đã thêm mới sản phẩm thành công!', 'success');
  }

  closeProductModal();
  renderAdminProducts();
}

function deleteProductItem(id) {
  const p = getProductById(id);
  if (!p) return;
  if (confirm(`Bạn có chắc chắn muốn xóa/lưu trữ sản phẩm: ${p.name}?`)) {
    deleteProduct(id);
    showToast(`Đã xóa sản phẩm ${p.sku}!`, 'info');
    renderAdminProducts();
  }
}

// Window aliases for cross-tab or inline compatibility
window.renderProducts = renderAdminProducts;
window.renderAdminProducts = renderAdminProducts;
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.editProduct = editProduct;
window.deleteProductItem = deleteProductItem;
