/**
 * SmartShelf - Logic Gợi ý sản phẩm thay thế AI (shopper-product-alternatives.html)
 * Phụ trách bởi: SV1 Trần Trọng Hoàng Anh (MSV: 2551170859)
 * Tính năng AI: AI-2 Product Alternative AI (Matching theo Category, Price delta & Stock)
 * Tách biệt 3 tầng kiến trúc: 100% JS nằm trong file này
 */

document.addEventListener('DOMContentLoaded', () => {
  populateTargetSelect();
  updateCartCount();

  const urlParams = new URLSearchParams(window.location.search);
  const targetId = urlParams.get('id');
  if (targetId) {
    const sel = document.getElementById('targetProductSelect');
    if (sel) sel.value = targetId;
    runAiAnalysis(false);
  }

  const runBtn = document.getElementById('runAiBtn');
  const simFailBtn = document.getElementById('simulateFailureBtn');
  const resetBtn = document.getElementById('resetAiBtn');
  const retryBtn = document.getElementById('retryAiBtn');
  const recalcBtn = document.getElementById('recalcAiBtn');

  if (runBtn) runBtn.addEventListener('click', () => runAiAnalysis(false));
  if (simFailBtn) simFailBtn.addEventListener('click', () => runAiAnalysis(true));
  if (retryBtn) retryBtn.addEventListener('click', () => runAiAnalysis(false));
  if (recalcBtn) recalcBtn.addEventListener('click', () => runAiAnalysis(false));

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const panel = document.getElementById('aiResultPanel');
      const fail = document.getElementById('aiFailureBox');
      if (panel) panel.classList.add('d-none');
      if (fail) fail.classList.add('d-none');
      showToast('Đã đặt lại trạng thái AI.', 'info');
    });
  }
});

function populateTargetSelect() {
  const select = document.getElementById('targetProductSelect');
  if (!select) return;

  const all = getProducts();
  const emptyOrLow = all.filter(p => p.stockQty <= p.minQty);
  
  select.innerHTML = emptyOrLow.map(p => `
    <option value="${p.id}">
      [${p.stockQty === 0 ? 'Hết hàng' : 'Sắp hết'}] ${p.name} - ${p.price.toLocaleString()}đ (Kệ: ${p.shelfId})
    </option>
  `).join('');
}

async function runAiAnalysis(forceError = false) {
  const targetId = document.getElementById('targetProductSelect').value;
  const loadingBox = document.getElementById('aiLoadingBox');
  const resultPanel = document.getElementById('aiResultPanel');
  const failureBox = document.getElementById('aiFailureBox');

  if (resultPanel) resultPanel.classList.add('d-none');
  if (failureBox) failureBox.classList.add('d-none');
  if (loadingBox) loadingBox.classList.remove('d-none');

  try {
    const res = await runProductAlternativeAI(targetId, forceError);
    if (loadingBox) loadingBox.classList.add('d-none');

    if (res.status === 'empty' || res.recommendations.length === 0) {
      if (failureBox) failureBox.classList.remove('d-none');
      const failMsg = document.getElementById('aiFailureMessage');
      if (failMsg) failMsg.textContent = res.message || 'Không có sản phẩm thay thế cùng loại nào đang sẵn hàng.';
      return;
    }

    const outStockName = document.getElementById('outStockTargetName');
    const confidenceText = document.getElementById('aiConfidenceText');
    if (outStockName) outStockName.textContent = res.targetProduct.name;
    if (confidenceText) confidenceText.textContent = res.confidence;

    renderAlternatives(res.recommendations);
    if (resultPanel) resultPanel.classList.remove('d-none');
    showToast('✨ AI SmartShelf: Đã tìm thấy các sản phẩm thay thế tối ưu nhất!', 'ai');

  } catch (err) {
    if (loadingBox) loadingBox.classList.add('d-none');
    if (failureBox) failureBox.classList.remove('d-none');
    const failMsg = document.getElementById('aiFailureMessage');
    if (failMsg) failMsg.textContent = err.message || 'Lỗi xử lý mô hình AI.';
    showToast('Mô phỏng trạng thái AI thất bại kích hoạt.', 'error');
  }
}

// Window export
window.runAiAnalysis = runAiAnalysis;

function renderAlternatives(list) {
  const grid = document.getElementById('alternativesGrid');
  if (!grid) return;

  grid.innerHTML = list.map((item, idx) => {
    const p = item.product;
    return `
      <div class="card p-125 ${idx === 0 ? 'alternative-card-highlight' : ''}">
        <div class="d-flex justify-between align-center mb-05">
          <span class="badge ai-match-badge">Khớp ${item.matchRate}</span>
          <span class="badge badge-normal">Sẵn ${p.stockQty} sp</span>
        </div>

        <h3 class="ai-card-title">${p.name}</h3>
        <div class="ai-card-price">
          ${p.price.toLocaleString()}đ
        </div>

        <div class="fs-sm text-muted mb-05">
          📍 Vị trí: <strong>${p.shelfId}</strong> · ${p.shelfLevel || 'Tầng 2'}
        </div>

        <!-- Reason (Explainability) -->
        <div class="ai-reason-box">
          <strong class="text-primary">Lý do AI chọn:</strong><br>
          ${item.reason}
        </div>

        <div class="mt-1 d-flex gap-05">
          <button class="btn btn-primary btn-sm flex-1 btn-accept-alt" data-id="${p.id}">
            ✅ Thêm vào giỏ
          </button>
          <a href="shopper-product-location.html?shelf=${p.shelfId}" class="btn btn-secondary btn-sm" title="Xem vị trí kệ">
            📍 Dẫn đường
          </a>
        </div>
      </div>
    `;
  }).join('');

  // Bind buttons cleanly without inline onclick
  grid.querySelectorAll('.btn-accept-alt').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (id) acceptAlternative(id);
    });
  });
}

function acceptAlternative(prodId) {
  addToCart(prodId, 1);
  updateCartCount();
  showToast('Đã thêm sản phẩm thay thế vào giỏ hàng!', 'success');
}

// Window export
window.acceptAlternative = acceptAlternative;

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartBadge = document.getElementById('cartCount');
  if (cartBadge) cartBadge.textContent = count;
}
