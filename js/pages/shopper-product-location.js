/**
 * SmartShelf - Logic Bản đồ kệ hàng & Chỉ dẫn đường đi (shopper-product-location.html)
 * Phụ trách bởi: SV1 Trần Trọng Hoàng Anh (MSV: 2551170859)
 * Vertical Slice: Sơ đồ mặt bằng, hiển thị trực quan các kệ, chỉ đường và thông báo thiếu hàng
 */

let activeShelfId = null;

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const targetShelf = urlParams.get('shelf');

  renderShelfGrid();

  if (targetShelf) {
    selectShelf(targetShelf);
  } else {
    selectShelf('SH-A02');
  }

  const reportBtn = document.getElementById('reportEmptyShelfBtn');
  if (reportBtn) reportBtn.addEventListener('click', handleReportEmptyShelf);
});

function renderShelfGrid() {
  const shelves = getShelves();

  const zoneA = shelves.filter(s => s.zoneCode === 'Khu vực A');
  const zoneB = shelves.filter(s => s.zoneCode === 'Khu vực B');
  const zoneCD = shelves.filter(s => s.zoneCode === 'Khu vực C' || s.zoneCode === 'Khu vực D');

  const elA = document.getElementById('zoneAShelves');
  const elB = document.getElementById('zoneBShelves');
  const elCD = document.getElementById('zoneCDShelves');

  if (elA) elA.innerHTML = renderShelfListHtml(zoneA);
  if (elB) elB.innerHTML = renderShelfListHtml(zoneB);
  if (elCD) elCD.innerHTML = renderShelfListHtml(zoneCD);
}

function renderShelfListHtml(list) {
  return list.map(s => {
    let statusClass = 'status-normal';
    let statusBadge = '<span class="badge badge-normal">Đủ</span>';
    let barColor = 'var(--success)';

    if (s.status === 'low') {
      statusClass = 'status-low';
      statusBadge = '<span class="badge badge-low">Vơi</span>';
      barColor = 'var(--warning)';
    } else if (s.status === 'empty') {
      statusClass = 'status-empty';
      statusBadge = '<span class="badge badge-empty">Trống</span>';
      barColor = 'var(--danger)';
    } else if (s.status === 'anomaly') {
      statusClass = 'status-anomaly';
      statusBadge = '<span class="badge badge-anomaly">Lệch</span>';
      barColor = '#db2777';
    }

    const pct = Math.round((s.currentCount / s.maxCapacity) * 100);

    return `
      <div class="shelf-tile ${statusClass} ${activeShelfId === s.id ? 'active-shelf-target' : ''}" 
           id="shelf-tile-${s.id}" 
           onclick="selectShelf('${s.id}')">
        <div class="shelf-tile-header">
          <strong style="color: var(--text-main); font-size: 0.9rem;">${s.code}</strong>
          ${statusBadge}
        </div>
        <div style="font-size: 0.75rem; color: var(--text-muted);">${s.levelCount} tầng · ${s.currentCount}/${s.maxCapacity} sp</div>
        <div class="shelf-progress-bar">
          <div class="shelf-progress-fill" style="width: ${pct}%; background-color: ${barColor};"></div>
        </div>
      </div>
    `;
  }).join('');
}

function selectShelf(shelfId) {
  activeShelfId = shelfId;
  renderShelfGrid();

  const shelf = getShelfById(shelfId);
  if (!shelf) return;

  const titleEl = document.getElementById('shelfDetailTitle');
  if (titleEl) titleEl.textContent = `Chi tiết ${shelf.code}`;
  
  let badgeHtml = '<span class="badge badge-normal">Đủ hàng</span>';
  if (shelf.status === 'low') badgeHtml = '<span class="badge badge-low">Sắp hết hàng</span>';
  else if (shelf.status === 'empty') badgeHtml = '<span class="badge badge-empty">Trống kệ 100%</span>';
  else if (shelf.status === 'anomaly') badgeHtml = '<span class="badge badge-anomaly">Cảnh báo sai lệch</span>';
  
  const badgeEl = document.getElementById('shelfDetailBadge');
  if (badgeEl) badgeEl.innerHTML = badgeHtml;

  const allProds = getProducts();
  const prodsOnShelf = allProds.filter(p => p.shelfId === shelf.id || p.shelfId === shelf.code);

  let contentHtml = `
    <div style="margin-bottom: 0.75rem;">
      <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.2rem;">
        <strong>Khu vực:</strong> ${shelf.zoneCode}
      </div>
      <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.5rem;">
        <strong>Kiểm kê lần cuối:</strong> ${shelf.lastChecked || 'Gần đây'}
      </div>
      <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0.6rem 0;">
      <div style="font-weight: 700; font-size: 0.85rem; margin-bottom: 0.5rem; color: var(--text-main);">
        Hàng hóa trên kệ (${prodsOnShelf.length} loại):
      </div>
  `;

  if (prodsOnShelf.length === 0) {
    contentHtml += `<div class="state-box" style="padding: 1rem;"><small>Chưa có sản phẩm nào trên kệ này.</small></div>`;
  } else {
    contentHtml += `<div style="display: flex; flex-direction: column; gap: 0.45rem;">`;
    prodsOnShelf.forEach(p => {
      contentHtml += `
        <div style="background: var(--bg-page); padding: 0.6rem 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-main);">${p.name}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${p.shelfLevel || 'Tầng 2'} · Còn: <strong>${p.stockQty}</strong> sp</div>
          </div>
          <div>
            ${p.stockQty <= 0 ? 
              `<a href="shopper-product-alternatives.html?id=${p.id}" class="btn btn-ai btn-sm" style="font-size: 0.7rem; padding: 2px 8px;">Gợi ý AI</a>` :
              `<span style="color: var(--primary); font-weight: 800; font-size: 0.85rem;">${p.price.toLocaleString()}đ</span>`
            }
          </div>
        </div>
      `;
    });
    contentHtml += `</div>`;
  }

  contentHtml += `</div>`;
  const detailBox = document.getElementById('shelfDetailContent');
  if (detailBox) detailBox.innerHTML = contentHtml;

  const routeBox = document.getElementById('routeGuideBox');
  const routeText = document.getElementById('routeGuideText');
  if (routeBox && routeText) {
    routeBox.style.display = 'block';
    if (shelf.zoneCode === 'Khu vực A') {
      routeText.innerHTML = `Từ <strong>Cửa chính Tầng 1</strong> &rarr; Đi thẳng 10m &rarr; Rẽ vào <strong>Khu vực A (Đồ uống)</strong> &rarr; Tìm <strong>${shelf.code}</strong> ở dãy tay phải.`;
    } else if (shelf.zoneCode === 'Khu vực B') {
      routeText.innerHTML = `Từ <strong>Cửa chính Tầng 1</strong> &rarr; Đi qua quầy thu ngân &rarr; <strong>Khu vực B (Thực phẩm khô)</strong> &rarr; <strong>${shelf.code}</strong> ở hàng giữa.`;
    } else {
      routeText.innerHTML = `Từ Tầng 1 &rarr; Đi <strong>Thang cuốn lên Tầng 2</strong> &rarr; Rẽ trái sang <strong>${shelf.zoneCode}</strong> &rarr; Nhìn biển treo tìm <strong>${shelf.code}</strong>.`;
    }
  }

  const actionsBox = document.getElementById('shelfActionsBox');
  if (actionsBox) actionsBox.style.display = 'block';
}

function handleReportEmptyShelf() {
  if (!activeShelfId) return;
  const shelf = getShelfById(activeShelfId);
  showToast(`Đã gửi thông báo thiếu hàng tại ${shelf.code} tới nhân viên trực ca!`, 'success');
}
