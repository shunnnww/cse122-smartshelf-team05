/**
 * SmartShelf - Logic Gợi ý sản phẩm thay thế AI (shopper-product-alternatives.html)
 * Phụ trách bởi: SV1 Trần Trọng Hoàng Anh (MSV: 2551170859)
 * Tính năng AI: AI-2 Product Alternative AI (Chuẩn 6 bước AI UX & Failure UX)
 */

document.addEventListener('DOMContentLoaded', () => {
  populateTargetSelect();
  updateCartCount();

  const urlParams = new URLSearchParams(window.location.search);
  const queryId = urlParams.get('id');
  if (queryId) {
    const targetSelect = document.getElementById('targetProductSelect');
    if (targetSelect) targetSelect.value = queryId;
  }
  runAiAnalysis(false);

  const runBtn = document.getElementById('runAiBtn');
  const simFailBtn = document.getElementById('simulateFailureBtn');
  const resetBtn = document.getElementById('resetAiBtn');

  if (runBtn) runBtn.addEventListener('click', () => runAiAnalysis(false));
  if (simFailBtn) simFailBtn.addEventListener('click', () => runAiAnalysis(true));
  if (resetBtn) resetBtn.addEventListener('click', () => {
    document.getElementById('aiResultPanel').style.display = 'none';
    document.getElementById('aiFailureBox').style.display = 'none';
    document.getElementById('aiLoadingBox').style.display = 'none';
  });
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

  if (resultPanel) resultPanel.style.display = 'none';
  if (failureBox) failureBox.style.display = 'none';
  if (loadingBox) loadingBox.style.display = 'block';

  try {
    const res = await runProductAlternativeAI(targetId, forceError);
    if (loadingBox) loadingBox.style.display = 'none';

    if (res.status === 'empty' || res.recommendations.length === 0) {
      if (failureBox) failureBox.style.display = 'block';
      const failMsg = document.getElementById('aiFailureMessage');
      if (failMsg) failMsg.textContent = res.message || 'Không có sản phẩm thay thế cùng loại nào đang sẵn hàng.';
      return;
    }

    const outStockName = document.getElementById('outStockTargetName');
    const confidenceText = document.getElementById('aiConfidenceText');
    if (outStockName) outStockName.textContent = res.targetProduct.name;
    if (confidenceText) confidenceText.textContent = res.confidence;

    renderAlternatives(res.recommendations);
    if (resultPanel) resultPanel.style.display = 'block';
    showToast('AI đã hoàn tất gợi ý sản phẩm thay thế!', 'ai');

  } catch (err) {
    if (loadingBox) loadingBox.style.display = 'none';
    if (failureBox) failureBox.style.display = 'block';
    const failMsg = document.getElementById('aiFailureMessage');
    if (failMsg) failMsg.textContent = err.message || 'Lỗi xử lý mô hình AI.';
    showToast('Mô phỏng trạng thái AI thất bại kích hoạt.', 'error');
  }
}

function renderAlternatives(list) {
  const grid = document.getElementById('alternativesGrid');
  if (!grid) return;

  grid.innerHTML = list.map((item, idx) => {
    const p = item.product;
    return `
      <div class="card ${idx === 0 ? 'alternative-card-highlight' : ''}" style="background: var(--bg-card); padding: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span class="badge" style="background: #ede9fe; color: #6d28d9; font-weight: 700;">Khớp ${item.matchRate}</span>
          <span class="badge badge-normal">Sẵn ${p.stockQty} sp</span>
        </div>

        <h3 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.25rem; min-height: 2.5rem; color: var(--text-main);">${p.name}</h3>
        <div style="font-size: 1.15rem; font-weight: 800; color: var(--primary); margin-bottom: 0.5rem;">
          ${p.price.toLocaleString()}đ
        </div>

        <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">
          📍 Vị trí: <strong>${p.shelfId}</strong> · ${p.shelfLevel || 'Tầng 2'}
        </div>

        <!-- Reason (Explainability) -->
        <div class="ai-reason-box">
          <strong style="color: var(--accent-ai);">Lý do AI chọn:</strong><br>
          ${item.reason}
        </div>

        <div style="margin-top: 1rem; display: flex; gap: 0.4rem;">
          <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="acceptAlternative('${p.id}')">
            ✅ Thêm vào giỏ
          </button>
          <a href="shopper-product-location.html?shelf=${p.shelfId}" class="btn btn-secondary btn-sm" title="Xem vị trí kệ">
            📍 Dẫn đường
          </a>
        </div>
      </div>
    `;
  }).join('');
}

function acceptAlternative(prodId) {
  addToCart(prodId, 1);
  updateCartCount();
  showToast('Đã thêm sản phẩm thay thế vào giỏ hàng!', 'success');
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartBadge = document.getElementById('cartCount');
  if (cartBadge) cartBadge.textContent = count;
}
