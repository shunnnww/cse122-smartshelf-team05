/**
 * SmartShelf - Logic Quản trị khu vực & Kệ hàng (admin-zone-management.html)
 * Phụ trách bởi: SV3 Nguyễn Văn Hân (MSV: 2551170885)
 * Vertical Slice: Cấu hình mặt bằng 4 Zone, Thêm kệ mới, Đổi trạng thái mô phỏng
 */

document.addEventListener('DOMContentLoaded', () => {
  renderZones();
  renderShelves();

  const addShelfBtn = document.getElementById('openAddShelfModalBtn');
  const cancelBtn = document.getElementById('cancelAddShelfBtn');
  const closeCrossBtn = document.getElementById('closeShelfModalCrossBtn');
  const form = document.getElementById('shelfForm') || document.getElementById('shelfCrudForm');
  const tbody = document.getElementById('shelvesAdminTbody');

  if (addShelfBtn) addShelfBtn.addEventListener('click', openAddShelfModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeShelfModal);
  if (closeCrossBtn) closeCrossBtn.addEventListener('click', closeShelfModal);
  if (form) form.addEventListener('submit', handleAddShelf);

  if (tbody) {
    tbody.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('.btn-toggle-shelf');
      if (toggleBtn) {
        const id = toggleBtn.getAttribute('data-id');
        if (id) toggleShelfStatus(id);
      }
    });
  }
});

function renderZones() {
  const zones = getZones();
  const container = document.getElementById('zonesCardsGrid');
  if (!container) return;

  container.innerHTML = zones.map(z => `
    <div class="card zone-admin-card">
      <div class="zone-admin-title">
        ${z.name}
      </div>
      <div class="zone-admin-sub">
        ${z.floor} · 4 kệ hoạt động
      </div>
      <p class="zone-admin-desc">
        ${z.description}
      </p>
    </div>
  `).join('');
}

function renderShelves() {
  const shelves = getShelves();
  const tbody = document.getElementById('shelvesAdminTbody');
  const badge = document.getElementById('shelvesCountBadge');
  if (badge) badge.textContent = `${shelves.length} kệ`;
  if (!tbody) return;

  tbody.innerHTML = shelves.map(s => {
    let badgeHtml = '<span class="badge badge-normal">Đủ hàng</span>';
    if (s.status === 'low') badgeHtml = '<span class="badge badge-low">Sắp hết</span>';
    else if (s.status === 'empty') badgeHtml = '<span class="badge badge-empty">Trống kệ</span>';
    else if (s.status === 'anomaly') badgeHtml = '<span class="badge badge-anomaly">Lệch kho</span>';

    return `
      <tr>
        <td><strong class="shelf-code-tag">${s.code}</strong></td>
        <td><strong>${s.zoneCode}</strong></td>
        <td>${s.levelCount} tầng</td>
        <td>${s.maxCapacity} sản phẩm</td>
        <td><strong>${s.currentCount}</strong> sp</td>
        <td>${badgeHtml}</td>
        <td class="text-right">
          <button type="button" class="btn btn-secondary btn-sm btn-toggle-shelf" data-id="${s.id}" title="Đổi trạng thái thử nghiệm">
            🔄 Đổi trạng thái
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function toggleShelfStatus(shelfId) {
  const s = getShelfById(shelfId);
  if (!s) return;
  const nextStatus = s.status === 'normal' ? 'low' : (s.status === 'low' ? 'empty' : (s.status === 'empty' ? 'anomaly' : 'normal'));
  updateShelf(shelfId, { status: nextStatus });
  showToast(`Đã chuyển trạng thái ${s.code} sang [${nextStatus}]!`, 'info');
  renderShelves();
}

function openAddShelfModal() {
  const modal = document.getElementById('shelfModal');
  if (modal) modal.classList.add('active');
}

function closeShelfModal() {
  const modal = document.getElementById('shelfModal');
  if (modal) modal.classList.remove('active');
}

function handleAddShelf(e) {
  e.preventDefault();
  const code = document.getElementById('shelfCodeInput').value.trim();
  const zone = document.getElementById('shelfZoneSelect').value;
  const levels = parseInt(document.getElementById('shelfLevelsInput').value) || 4;
  const cap = parseInt(document.getElementById('shelfCapacityInput').value) || 100;

  if (!code) {
    showToast('Vui lòng nhập mã kệ!', 'error');
    return;
  }

  const db = getDatabase();
  const newShelf = {
    id: 'SH-' + Date.now().toString().slice(-4),
    code: code,
    zoneCode: zone,
    levelCount: levels,
    maxCapacity: cap,
    currentCount: 0,
    status: 'empty',
    lastChecked: 'Vừa tạo mới'
  };
  db.shelves.push(newShelf);
  saveDatabase(db);

  showToast(`Đã thêm mới kệ hàng ${code} thành công!`, 'success');
  closeShelfModal();
  renderShelves();
}

// Window aliases for cross-tab auto refresh or compatibility
window.renderShelves = renderShelves;
window.openAddShelfModal = openAddShelfModal;
window.closeShelfModal = closeShelfModal;
window.toggleShelfStatus = toggleShelfStatus;
