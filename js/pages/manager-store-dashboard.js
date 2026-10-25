/**
 * SmartShelf - Logic Bảng điều hành cửa hàng (manager-store-dashboard.html)
 * Phụ trách bởi: SV3 Nguyễn Văn Hân (MSV: 2551170885)
 * Vertical Slice: Dashboard 4 KPI, thanh tỷ lệ lấp đầy theo Zone, bộ lọc thời gian & xuất báo cáo CSV/JSON
 */

let currentPeriod = 'today';

document.addEventListener('DOMContentLoaded', () => {
  renderZoneHealth();
  setupTimeFilters();
  setupExportButtons();
});

function setupTimeFilters() {
  const bToday = document.getElementById('timeFilterToday');
  const bWeek = document.getElementById('timeFilterWeek');
  const bMonth = document.getElementById('timeFilterMonth');

  function setFilter(period, btn) {
    currentPeriod = period;
    [bToday, bWeek, bMonth].forEach(b => {
      if (b) {
        b.classList.remove('btn-primary');
        b.classList.add('btn-secondary');
      }
    });
    if (btn) {
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');
    }
    renderZoneHealth();
    showToast(`Đã chuyển bộ lọc thời gian: ${period === 'today' ? 'Hôm nay' : (period === 'week' ? '7 ngày qua' : 'Tháng này')}`, 'info');
  }

  if (bToday) bToday.addEventListener('click', () => setFilter('today', bToday));
  if (bWeek) bWeek.addEventListener('click', () => setFilter('week', bWeek));
  if (bMonth) bMonth.addEventListener('click', () => setFilter('month', bMonth));
}

function setupExportButtons() {
  const btnCsv = document.getElementById('exportDashboardCsvBtn');
  const btnJson = document.getElementById('exportDashboardJsonBtn');

  if (btnCsv) {
    btnCsv.addEventListener('click', () => {
      const zones = getZones();
      const shelves = getShelves();
      const headers = ['Mã Zone', 'Tên Zone', 'Số Kệ', 'Tồn Thực Tế', 'Sức Chứa Tối Đa', 'Tỷ Lệ Lấp Đầy (%)'];
      const rows = zones.map(z => {
        const zShelves = shelves.filter(s => s.zoneCode === z.code || s.zoneId === z.id);
        const cap = zShelves.reduce((acc, s) => acc + s.maxCapacity, 0) || 100;
        const curr = zShelves.reduce((acc, s) => acc + s.currentCount, 0);
        return [z.id, z.name, zShelves.length, curr, cap, Math.round((curr / cap) * 100) + '%'];
      });
      exportDataToCSV(`SmartShelf-BaoCao-KhuVuc-${currentPeriod}.csv`, headers, rows);
    });
  }

  if (btnJson) {
    btnJson.addEventListener('click', () => {
      const zones = getZones();
      const shelves = getShelves();
      const exportObj = {
        reportType: 'Manager Dashboard Store Health',
        period: currentPeriod,
        exportedAt: new Date().toISOString(),
        zones: zones.map(z => {
          const zShelves = shelves.filter(s => s.zoneCode === z.code || s.zoneId === z.id);
          const cap = zShelves.reduce((acc, s) => acc + s.maxCapacity, 0) || 100;
          const curr = zShelves.reduce((acc, s) => acc + s.currentCount, 0);
          return {
            id: z.id,
            name: z.name,
            totalShelves: zShelves.length,
            currentStock: curr,
            maxCapacity: cap,
            fillRatePercent: Math.round((curr / cap) * 100)
          };
        })
      };
      exportDataToJSON(`SmartShelf-StoreHealth-${currentPeriod}.json`, exportObj);
    });
  }
}

function renderZoneHealth() {
  const zones = getZones();
  const shelves = getShelves();
  const container = document.getElementById('zoneHealthBars');
  if (!container) return;

  container.innerHTML = zones.map(z => {
    const zoneShelves = shelves.filter(s => s.zoneCode === z.code || s.zoneId === z.id);
    const totalCapacity = zoneShelves.reduce((acc, s) => acc + s.maxCapacity, 0) || 100;
    let totalCurrent = zoneShelves.reduce((acc, s) => acc + s.currentCount, 0);

    if (currentPeriod === 'week') totalCurrent = Math.min(totalCapacity, Math.round(totalCurrent * 1.1));
    if (currentPeriod === 'month') totalCurrent = Math.min(totalCapacity, Math.round(totalCurrent * 0.95));

    const pct = Math.round((totalCurrent / totalCapacity) * 100);

    let barCol = 'var(--success)';
    if (pct < 50) barCol = 'var(--danger)';
    else if (pct < 75) barCol = 'var(--warning)';

    return `
      <div>
        <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 0.2rem;">
          <strong>${z.name}</strong>
          <span style="font-weight: 700; color: ${barCol};">${totalCurrent}/${totalCapacity} sp (${pct}%)</span>
        </div>
        <div class="shelf-progress-bar">
          <div class="shelf-progress-fill" style="width: ${pct}%; background-color: ${barCol}; transition: width 0.4s ease;"></div>
        </div>
      </div>
    `;
  }).join('');
}

// Window alias for cross-tab auto refresh
window.renderHealth = renderZoneHealth;
