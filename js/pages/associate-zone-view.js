/**
 * SmartShelf - Logic Giám sát kệ theo khu vực (associate-zone-view.html)
 * Phụ trách bởi: SV2 Nguyễn Quang Long (MSV: 2551170859)
 * Vertical Slice: Giám sát 14 kệ, bộ lọc khu vực & trạng thái tồn, cập nhật thanh tỷ lệ lấp đầy
 * Tách biệt 3 tầng kiến trúc: 100% JS nằm trong file này
 */

document.addEventListener('DOMContentLoaded', () => {
  renderZoneView();

  const filterZone = document.getElementById('filterZone');
  const filterStatus = document.getElementById('filterStatus');

  if (filterZone) filterZone.addEventListener('change', renderZoneView);
  if (filterStatus) filterStatus.addEventListener('change', renderZoneView);
});

function renderZoneView() {
  const shelves = getShelves();
  const filterZone = document.getElementById('filterZone');
  const filterStatus = document.getElementById('filterStatus');

  const zoneFilter = filterZone ? filterZone.value : 'ALL';
  const statusFilter = filterStatus ? filterStatus.value : 'ALL';

  const statTotal = document.getElementById('statTotalShelves');
  const statLow = document.getElementById('statLowShelves');
  const statEmpty = document.getElementById('statEmptyShelves');
  const statAnomaly = document.getElementById('statAnomalyShelves');

  if (statTotal) statTotal.textContent = shelves.length;
  if (statLow) statLow.textContent = shelves.filter(s => s.status === 'low').length;
  if (statEmpty) statEmpty.textContent = shelves.filter(s => s.status === 'empty').length;
  if (statAnomaly) statAnomaly.textContent = shelves.filter(s => s.status === 'anomaly').length;

  let filtered = shelves;
  if (zoneFilter !== 'ALL') {
    filtered = filtered.filter(s => s.zoneCode === zoneFilter);
  }
  if (statusFilter !== 'ALL') {
    filtered = filtered.filter(s => s.status === statusFilter);
  }

  const countBadge = document.getElementById('shelfCountBadge');
  if (countBadge) countBadge.textContent = `${filtered.length} kệ`;

  const tbody = document.getElementById('shelfTableBody');
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="empty-filter-msg">Không tìm thấy kệ hàng nào theo bộ lọc.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(s => {
    let statusBadge = '<span class="badge badge-normal">Đủ</span>';
    let fillClass = 'progress-fill-normal';
    if (s.status === 'low') {
      statusBadge = '<span class="badge badge-low">Sắp hết</span>';
      fillClass = 'progress-fill-low';
    } else if (s.status === 'empty') {
      statusBadge = '<span class="badge badge-empty">Trống</span>';
      fillClass = 'progress-fill-empty';
    } else if (s.status === 'anomaly') {
      statusBadge = '<span class="badge badge-anomaly">Lệch</span>';
      fillClass = 'progress-fill-anomaly';
    }

    const pct = Math.round((s.currentCount / s.maxCapacity) * 100);

    return `
      <tr>
        <td>
          <strong class="shelf-code-tag">${s.code}</strong>
          <div class="shelf-level-tag">${s.levelCount} tầng</div>
        </td>
        <td>
          <strong>${s.zoneCode}</strong>
        </td>
        <td>
          <strong>${s.currentCount}</strong> / ${s.maxCapacity} sp
        </td>
        <td class="shelf-col-progress">
          <div class="shelf-progress-bar">
            <div class="shelf-progress-fill ${fillClass}" data-pct="${pct}"></div>
          </div>
          <small class="shelf-pct-label">${pct}%</small>
        </td>
        <td>${statusBadge}</td>
        <td class="fs-xs text-muted">${s.lastChecked || 'Chưa kiểm'}</td>
        <td class="text-right">
          <div class="shelf-actions-group">
            <a href="associate-shelf-check.html?shelf=${s.id}" class="btn btn-secondary btn-sm">
              🔍 Kiểm kê
            </a>
            <a href="associate-restock-task.html?shelf=${s.id}" class="btn btn-primary btn-sm">
              📦 Bổ sung
            </a>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('.shelf-progress-fill').forEach(fill => {
    const pct = fill.getAttribute('data-pct');
    if (pct) fill.style.width = pct + '%';
  });
}

// Window alias for cross-tab auto refresh
window.renderShelves = renderZoneView;
