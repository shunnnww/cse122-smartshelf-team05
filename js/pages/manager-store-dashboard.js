/**
 * SmartShelf - Logic Bảng điều hành cửa hàng (manager-store-dashboard.html)
 * Phụ trách bởi: SV3 Nguyễn Văn Hân (MSV: 2551170885)
 * Vertical Slice: Dashboard 4 KPI, thanh tỷ lệ lấp đầy theo Zone, bộ lọc thời gian & xuất báo cáo CSV/JSON
 * Tách biệt 3 tầng kiến trúc: 100% JS nằm trong file này
 */

let currentPeriod = 'today';

document.addEventListener('DOMContentLoaded', () => {
  renderZoneHealth();
  setupTimeFilters();
  setupExportButtons();

  const printBtn = document.getElementById('printReportBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }
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

    let statusColClass = 'text-success';
    let progressColClass = 'progress-fill-normal';
    if (pct < 50) {
      statusColClass = 'text-danger';
      progressColClass = 'progress-fill-empty';
    } else if (pct < 75) {
      statusColClass = 'text-warning';
      progressColClass = 'progress-fill-low';
    }

    return `
      <div>
        <div class="zone-health-row-header">
          <strong>${z.name}</strong>
          <span class="fw-bold ${statusColClass}">${totalCurrent}/${totalCapacity} sp (${pct}%)</span>
        </div>
        <div class="shelf-progress-bar">
          <div class="shelf-progress-fill ${progressColClass}" data-pct="${pct}"></div>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.shelf-progress-fill').forEach(fill => {
    const pct = fill.getAttribute('data-pct');
    if (pct) fill.style.width = pct + '%';
  });
}

// Window alias for cross-tab auto refresh
window.renderHealth = renderZoneHealth;
