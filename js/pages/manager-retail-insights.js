/**
 * SmartShelf - Logic Chẩn đoán sai lệch & Vận tốc bán hàng AI (manager-retail-insights.html)
 * Phụ trách bởi: SV3 Nguyễn Văn Hân (MSV: 2551170885)
 * Tính năng AI: AI-3 Deep Shelf Anomaly Matrix & Xuất dữ liệu CSV/JSON
 * Tách biệt 3 tầng kiến trúc: 100% JS nằm trong file này
 */

document.addEventListener('DOMContentLoaded', () => {
  renderVelocityTable();

  const scanBtn = document.getElementById('runBatchAnomalyBtn');
  const csvBtn = document.getElementById('exportVelocityCsvBtn');
  const jsonBtn = document.getElementById('exportVelocityJsonBtn');
  const printBtn = document.getElementById('printReportBtn');
  const camBtn = document.getElementById('actionCameraBtn');
  const lockBtn = document.getElementById('actionLockStockBtn');
  const reassignBtn = document.getElementById('actionReassignCheckBtn');

  if (scanBtn) {
    scanBtn.addEventListener('click', () => {
      showToast('AI đang quét lại 14 kệ hàng siêu thị... Không phát hiện thêm bất thường mới!', 'ai');
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }

  if (camBtn) {
    camBtn.addEventListener('click', () => showToast('Đã gửi yêu cầu rà soát Camera Khu vực B tới đội bảo vệ!', 'info'));
  }

  if (lockBtn) {
    lockBtn.addEventListener('click', () => showToast('Đã khóa tạm số liệu để tránh đơn hàng bị treo!', 'info'));
  }

  if (reassignBtn) {
    reassignBtn.addEventListener('click', () => showToast('Đã phân công lại cho NV Nguyễn Quang Long đi kiểm đếm lại Kệ B01 & B02!', 'success'));
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
    let rankBadge = `<span class="fw-bold text-muted">#${idx + 1}</span>`;
    if (idx === 0) rankBadge = `<span class="velocity-rank-badge velocity-rank-top1">🥇 TOP 1</span>`;
    else if (idx === 1) rankBadge = `<span class="velocity-rank-badge velocity-rank-top2">🥈 TOP 2</span>`;
    else if (idx === 2) rankBadge = `<span class="velocity-rank-badge velocity-rank-top3">🥉 TOP 3</span>`;

    let advice = 'Giữ nguyên vị trí tầng tiêu chuẩn.';
    if (p.salesVelocity >= 50) {
      advice = '<strong class="text-primary">Nên bố trí tại Tầng 2-3 (Ngang tầm mắt người mua)</strong>';
    } else if (p.salesVelocity <= 15) {
      advice = '<span class="text-muted">Có thể dời xuống Tầng 1 hoặc Tầng đáy</span>';
    }

    return `
      <tr>
        <td>${rankBadge}</td>
        <td>
          <strong class="text-main fs-sm">${p.name}</strong>
          <div class="fs-xs text-muted">${p.sku}</div>
        </td>
        <td>${p.category}</td>
        <td><strong>${p.shelfId}</strong> (${p.shelfLevel || 'Tầng 2'})</td>
        <td>
          <strong class="text-primary fs-sm">${p.salesVelocity || 20}</strong> sp/ngày
        </td>
        <td>
          <strong class="${p.stockQty <= p.minQty ? 'text-danger' : 'text-success'}">${p.stockQty}</strong> sp
        </td>
        <td class="fs-sm">${advice}</td>
      </tr>
    `;
  }).join('');
}

// Window alias for cross-tab auto refresh
window.renderVelocityTable = renderVelocityTable;
