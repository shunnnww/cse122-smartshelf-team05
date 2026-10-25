/**
 * SmartShelf - Logic Bản đồ kệ hàng & Chỉ dẫn đường đi (shopper-product-location.html)
 * Phụ trách bởi: SV1 Trần Trọng Hoàng Anh (MSV: 2551170859)
 * Vertical Slice: Sơ đồ mặt bằng, hiển thị trực quan các kệ, chỉ đường và thông báo thiếu hàng
 * Tách biệt 3 tầng kiến trúc: 100% JS nằm trong file này
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
  const reportBtn2 = document.getElementById('reportShelfEmptyBtn');
  if (reportBtn) reportBtn.addEventListener('click', handleReportEmptyShelf);
  if (reportBtn2) reportBtn2.addEventListener('click', handleReportEmptyShelf);
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

  // Update progress fills
  document.querySelectorAll('.shelf-progress-fill').forEach(fill => {
    const pct = fill.getAttribute('data-pct');
    if (pct) fill.style.width = pct + '%';
  });

  // Bind click event to shelf tiles
  document.querySelectorAll('.shelf-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      const shelfId = tile.getAttribute('data-shelf-id');
      if (shelfId) selectShelf(shelfId);
    });
  });
}

function renderShelfListHtml(list) {
  return list.map(s => {
    let statusClass = 'status-normal';
    let statusBadge = '<span class="badge badge-normal">Đủ</span>';
    let fillClass = 'progress-fill-normal';

    if (s.status === 'low') {
      statusClass = 'status-low';
      statusBadge = '<span class="badge badge-low">Vơi</span>';
      fillClass = 'progress-fill-low';
    } else if (s.status === 'empty') {
      statusClass = 'status-empty';
      statusBadge = '<span class="badge badge-empty">Trống</span>';
      fillClass = 'progress-fill-empty';
    } else if (s.status === 'anomaly') {
      statusClass = 'status-anomaly';
      statusBadge = '<span class="badge badge-anomaly">Lệch</span>';
      fillClass = 'progress-fill-anomaly';
    }

    const pct = Math.round((s.currentCount / s.maxCapacity) * 100);

    return `
      <div class="shelf-tile ${statusClass} ${activeShelfId === s.id ? 'active-shelf-target' : ''}" 
           id="shelf-tile-${s.id}" 
           data-shelf-id="${s.id}">
        <div class="shelf-tile-header">
          <strong class="text-main fs-sm">${s.code}</strong>
          ${statusBadge}
        </div>
        <div class="shelf-tile-body">
          <div class="fs-xs text-muted mb-025">${s.levelCount} tầng · ${s.currentCount}/${s.maxCapacity} sp</div>
          <div class="shelf-progress-bar">
            <div class="shelf-progress-fill ${fillClass}" data-pct="${pct}"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function selectShelf(shelfId) {
  const shelf = getShelfById(shelfId) || getShelves().find(s => s.code === shelfId);
  if (!shelf) return;

  activeShelfId = shelf.id;

  document.querySelectorAll('.shelf-tile').forEach(el => {
    el.classList.remove('active-shelf-target');
  });
  const activeTile = document.getElementById(`shelf-tile-${shelf.id}`);
  if (activeTile) {
    activeTile.classList.add('active-shelf-target');
  }

  const titleEl = document.getElementById('shelfDetailTitle');
  const badgeEl = document.getElementById('shelfDetailBadge');
  if (titleEl) titleEl.textContent = `📍 ${shelf.code} (${shelf.zoneCode})`;

  if (badgeEl) {
    let bClass = 'badge-normal';
    let bText = 'Đủ hàng';
    if (shelf.status === 'empty') { bClass = 'badge-empty'; bText = 'Trống hàng'; }
    else if (shelf.status === 'low') { bClass = 'badge-low'; bText = 'Sắp hết'; }
    else if (shelf.status === 'anomaly') { bClass = 'badge-anomaly'; bText = 'Bất thường'; }
    badgeEl.className = `badge ${bClass}`;
    badgeEl.textContent = bText;
  }

  const allProds = getProducts();
  const prodsOnShelf = allProds.filter(p => p.shelfId === shelf.id || p.shelfId === shelf.code);

  let contentHtml = `
    <div class="mb-1">
      <div class="fs-xs text-muted mb-05">
        Sức chứa: <strong>${shelf.currentCount}</strong> / ${shelf.maxCapacity} sản phẩm · Lần kiểm cuối: <strong>${shelf.lastChecked || 'Hôm nay 08:30'}</strong>
      </div>
      <div class="fw-bold fs-sm mb-05 text-main">
        Hàng hóa trên kệ (${prodsOnShelf.length} loại):
      </div>
  `;

  if (prodsOnShelf.length === 0) {
    contentHtml += `<div class="state-box p-1"><small>Chưa có sản phẩm nào trên kệ này.</small></div>`;
  } else {
    contentHtml += `<div class="d-flex flex-column gap-05">`;
    prodsOnShelf.forEach(p => {
      contentHtml += `
        <div class="shelf-item-card">
          <div>
            <div class="shelf-item-title">${p.name}</div>
            <div class="shelf-item-meta">${p.shelfLevel || 'Tầng 2'} · Còn: <strong>${p.stockQty}</strong> sp</div>
          </div>
          <div>
            ${p.stockQty <= 0 ? 
              `<a href="shopper-product-alternatives.html?id=${p.id}" class="btn btn-ai btn-sm btn-ai-compact">Gợi ý AI</a>` :
              `<span class="shelf-item-price">${p.price.toLocaleString()}đ</span>`
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
      routeText.innerHTML = `Từ <strong>Cửa chính Tầng 1</strong> &rarr; Đi thẳng 10m &rarr; Rẽ vào <strong>Khu vực A (Đồ uống giải khát - Dãy tay phải)</strong> &rarr; Tìm <strong>${shelf.code}</strong>.`;
    } else if (shelf.zoneCode === 'Khu vực B') {
      routeText.innerHTML = `Từ <strong>Cửa chính Tầng 1</strong> &rarr; Đi qua quầy thu ngân &rarr; <strong>Khu vực B (Thực phẩm khô)</strong> &rarr; <strong>${shelf.code}</strong> ở hàng giữa.`;
    } else {
      routeText.innerHTML = `Từ Tầng 1 &rarr; Đi <strong>Thang cuốn lên Tầng 2</strong> &rarr; Rẽ trái sang <strong>${shelf.zoneCode}</strong> &rarr; Nhìn biển treo tìm <strong>${shelf.code}</strong>.`;
    }
  }

  const actionsBox = document.getElementById('shelfActionsBox');
  if (actionsBox) actionsBox.style.display = 'block';
}

// Window export
window.selectShelf = selectShelf;

function handleReportEmptyShelf() {
  if (!activeShelfId) return;
  const shelf = getShelfById(activeShelfId);
  showToast(`Đã gửi thông báo thiếu hàng tại ${shelf.code} tới nhân viên trực ca!`, 'success');
}

// Window export
window.handleReportEmptyShelf = handleReportEmptyShelf;

// Window alias for cross-tab auto refresh
window.renderShelfGrid = renderShelfGrid;
