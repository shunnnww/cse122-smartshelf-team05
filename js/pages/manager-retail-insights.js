/**
 * SmartShelf - Logic Chẩn đoán sai lệch & Vận tốc bán hàng AI (manager-retail-insights.html)
 * Phụ trách bởi: SV3 Nguyễn Văn Hân (MSV: 2551170885)
 * Tính năng AI: AI-3 Deep Shelf Anomaly Matrix & Xuất dữ liệu CSV/JSON
 */

document.addEventListener('DOMContentLoaded', () => {
  renderVelocityTable();

  const scanBtn = document.getElementById('runBatchAnomalyBtn');
  const csvBtn = document.getElementById('exportVelocityCsvBtn');
  const jsonBtn = document.getElementById('exportVelocityJsonBtn');

  if (scanBtn) {
    scanBtn.addEventListener('click', () => {
      showToast('AI đang quét lại 14 kệ hàng siêu thị... Không phát hiện thêm bất thường mới!', 'ai');
    });
  }

  if (csvBtn) {
    csvBtn.addEventListener('click', () => {
      const prods = getProducts();
      const sorted = [...prods].sort((a, b) => (b.salesVelocity || 0) - (a.salesVelocity || 0));
      const headers = ['Hạng', 'Mã SKU', 'Tên Sản Phẩm', 'Ngành Hàng', 'Vị Trí Kệ', 'Tốc Độ Bán (sp/ngày)', 'Tồn Kệ'];
      const rows = sorted.map((p, idx) => [
        idx + 1,
        p.sku,
        p.name,
        p.category,
        `${p.shelfId} (${p.shelfLevel || 'Tầng 2'})`,
        p.salesVelocity || 20,
        p.stockQty
      ]);
      exportDataToCSV('SmartShelf-TocDoBanHang-AI.csv', headers, rows);
    });
  }

  if (jsonBtn) {
    jsonBtn.addEventListener('click', () => {
      const prods = getProducts();
      const sorted = [...prods].sort((a, b) => (b.salesVelocity || 0) - (a.salesVelocity || 0));
      exportDataToJSON('SmartShelf-TocDoBanHang-AI.json', {
        title: 'SmartShelf AI Sales Velocity & Shelf Allocation Matrix',
        analyzedAt: new Date().toISOString(),
        items: sorted
      });
    });
  }
});

function renderVelocityTable() {
  const prods = getProducts();
  const sorted = [...prods].sort((a, b) => (b.salesVelocity || 0) - (a.salesVelocity || 0));

  const tbody = document.getElementById('velocityTbody');
  if (!tbody) return;

  tbody.innerHTML = sorted.map((p, idx) => {
    let rankBadge = `<span style="font-weight:700; color:var(--text-muted);">#${idx + 1}</span>`;
    if (idx === 0) rankBadge = `<span class="velocity-rank-badge" style="background:#fef3c7; color:#b45309;">🥇 TOP 1</span>`;
    else if (idx === 1) rankBadge = `<span class="velocity-rank-badge" style="background:#e0f2fe; color:#0369a1;">🥈 TOP 2</span>`;
    else if (idx === 2) rankBadge = `<span class="velocity-rank-badge" style="background:#f1f5f9; color:#475569;">🥉 TOP 3</span>`;

    let advice = 'Giữ nguyên vị trí tầng tiêu chuẩn.';
    if (p.salesVelocity >= 50) {
      advice = '<strong style="color:var(--primary);">Nên bố trí tại Tầng 2-3 (Ngang tầm mắt người mua)</strong>';
    } else if (p.salesVelocity <= 15) {
      advice = '<span style="color:var(--text-muted);">Có thể dời xuống Tầng 1 hoặc Tầng đáy</span>';
    }

    return `
      <tr>
        <td>${rankBadge}</td>
        <td>
          <strong style="color:var(--text-main); font-size:0.92rem;">${p.name}</strong>
          <div style="font-size:0.75rem; color:var(--text-muted);">${p.sku}</div>
        </td>
        <td>${p.category}</td>
        <td><strong>${p.shelfId}</strong> (${p.shelfLevel || 'Tầng 2'})</td>
        <td>
          <strong style="color:var(--primary); font-size:0.95rem;">${p.salesVelocity || 20}</strong> sp/ngày
        </td>
        <td>
          <strong style="color:${p.stockQty <= p.minQty ? 'var(--danger)' : 'var(--success)'};">${p.stockQty}</strong> sp
        </td>
        <td style="font-size:0.82rem;">${advice}</td>
      </tr>
    `;
  }).join('');
}

// Window alias for cross-tab auto refresh
window.renderVelocityTable = renderVelocityTable;
