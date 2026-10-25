/**
 * SmartShelf - Logic Kiểm kê kệ & Phát hiện sai lệch (associate-shelf-check.html)
 * Phụ trách bởi: SV2 Nguyễn Quang Long (MSV: 2551170859)
 * Tính năng AI: AI-3 Shelf Anomaly Insight (Đối soát tồn máy tính & thực đếm hiện trường)
 * Tách biệt 3 tầng kiến trúc: 100% JS nằm trong file này
 */

let activeShelfProducts = [];

document.addEventListener('DOMContentLoaded', () => {
  populateShelfDropdown();
  renderAuditHistory();

  const urlParams = new URLSearchParams(window.location.search);
  const paramShelf = urlParams.get('shelf');
  if (paramShelf) {
    const shelfSelect = document.getElementById('shelfSelect');
    if (shelfSelect) shelfSelect.value = paramShelf;
  }
  loadShelfProducts();

  const shelfSelect = document.getElementById('shelfSelect');
  const scanAiBtn = document.getElementById('scanAnomalyAiBtn');
  const saveBtn = document.getElementById('saveCheckBtn');

  if (shelfSelect) shelfSelect.addEventListener('change', loadShelfProducts);
  if (scanAiBtn) scanAiBtn.addEventListener('click', triggerAiDiagnosis);
  if (saveBtn) saveBtn.addEventListener('click', handleSaveCheck);
});

function populateShelfDropdown() {
  const select = document.getElementById('shelfSelect');
  if (!select) return;
  const shelves = getShelves();
  select.innerHTML = shelves.map(s => {
    let statusText = 'Đầy đủ';
    if (s.status === 'empty') statusText = 'Hết hàng';
    else if (s.status === 'low') statusText = 'Sắp hết';
    else if (s.status === 'anomaly') statusText = 'Bất thường';
    return `
      <option value="${s.id}">[${s.zoneCode}] ${s.code} - Sức chứa ${s.currentCount}/${s.maxCapacity} sp (${statusText})</option>
    `;
  }).join('');
}

function loadShelfProducts() {
  const shelfSelect = document.getElementById('shelfSelect');
  if (!shelfSelect) return;
  const shelfId = shelfSelect.value;
  const shelf = getShelfById(shelfId);
  if (!shelf) return;

  const all = getProducts();
  activeShelfProducts = all.filter(p => p.shelfId === shelf.id || p.shelfId === shelf.code);

  const tbody = document.getElementById('auditProductsTbody');
  const aiBox = document.getElementById('aiAnomalyAlertBox');
  if (aiBox) aiBox.style.display = 'none';
  if (!tbody) return;

  if (activeShelfProducts.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="empty-shelf-msg">Kệ này hiện chưa được gán sản phẩm nào.</td></tr>`;
    return;
  }

  tbody.innerHTML = activeShelfProducts.map(p => {
    let defaultActual = p.stockQty;
    if (shelf.id === 'SH-B02' || shelf.code === 'Kệ B02') {
      defaultActual = Math.max(0, p.stockQty - 15);
    }

    return `
      <tr data-prod-id="${p.id}">
        <td>
          <strong>${p.name}</strong>
          <div class="fs-xs text-muted">${p.sku} · ${p.shelfLevel || 'Tầng 2'}</div>
        </td>
        <td>
          <span class="expected-stock-val expected-stock-num">${p.stockQty}</span> sp
        </td>
        <td>
          <input type="number" class="form-control actual-stock-input audit-prod-input" value="${defaultActual}" min="0" max="200">
        </td>
        <td>
          <span class="diff-badge badge ${defaultActual - p.stockQty === 0 ? 'badge-normal' : 'badge-empty'}">
            ${defaultActual - p.stockQty > 0 ? '+' : ''}${defaultActual - p.stockQty} sp
          </span>
        </td>
      </tr>
    `;
  }).join('');

  // Bind input events to actual stock inputs cleanly
  tbody.querySelectorAll('.actual-stock-input').forEach(input => {
    input.addEventListener('input', () => recalcDiscrepancy(input));
  });
}

function recalcDiscrepancy(input) {
  const row = input.closest('tr');
  const expected = parseInt(row.querySelector('.expected-stock-val').textContent);
  const actual = parseInt(input.value) || 0;
  const diff = actual - expected;

  const badge = row.querySelector('.diff-badge');
  badge.textContent = `${diff > 0 ? '+' : ''}${diff} sp`;
  badge.className = `diff-badge badge ${diff === 0 ? 'badge-normal' : (diff < -5 ? 'badge-empty' : 'badge-low')}`;
}

// Window export
window.recalcDiscrepancy = recalcDiscrepancy;

async function triggerAiDiagnosis() {
  const shelfSelect = document.getElementById('shelfSelect');
  if (!shelfSelect) return;
  const shelfId = shelfSelect.value;
  const box = document.getElementById('aiAnomalyAlertBox');

  showToast('Đang kết nối AI-3: Shelf Anomaly Insight...', 'ai');

  try {
    const res = await runShelfAnomalyInsight(shelfId);
    const badge = document.getElementById('aiAnomalyLevelBadge');
    const diagText = document.getElementById('aiDiagnosisText');
    const actionsUl = document.getElementById('aiActionsList');

    if (badge) badge.textContent = res.anomalyLevel;
    if (diagText) diagText.innerHTML = `<strong>Chẩn đoán:</strong> ${res.diagnosis}`;
    if (actionsUl) actionsUl.innerHTML = res.recommendedActions.map(act => `<li>${act}</li>`).join('');

    if (box) box.style.display = 'block';
    showToast('AI đã hoàn tất phân tích bất thường của kệ!', 'ai');
  } catch (err) {
    showToast('Lỗi AI: ' + err.message, 'error');
  }
}

// Window export
window.triggerAiDiagnosis = triggerAiDiagnosis;

function handleSaveCheck() {
  const shelfSelect = document.getElementById('shelfSelect');
  if (!shelfSelect) return;
  const shelfId = shelfSelect.value;
  const shelf = getShelfById(shelfId);
  const checkerName = document.getElementById('checkerNameInput').value;
  const note = document.getElementById('auditNoteInput').value;

  let totalSys = 0;
  let totalAct = 0;
  document.querySelectorAll('#auditProductsTbody tr').forEach(row => {
    const exp = parseInt(row.querySelector('.expected-stock-val')?.textContent || 0);
    const act = parseInt(row.querySelector('.actual-stock-input')?.value || 0);
    totalSys += exp;
    totalAct += act;
  });

  const diff = totalAct - totalSys;

  const newAudit = {
    id: 'AUD-' + Date.now().toString().slice(-4),
    shelfId: shelf.code,
    systemCount: totalSys,
    actualCount: totalAct,
    discrepancy: diff,
    auditor: checkerName || 'Nguyễn Quang Long',
    date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' hôm nay',
    note: note || (diff !== 0 ? 'Phát hiện chênh lệch' : 'Khớp 100% định mức')
  };

  addShelfCheck(newAudit);

  // Update shelf capacity
  updateShelf(shelf.id, {
    currentCount: totalAct,
    status: diff < -10 ? 'empty' : (diff < 0 ? 'low' : (diff > 10 ? 'anomaly' : 'normal')),
    lastChecked: 'Vừa kiểm tra xong'
  });

  showToast(`Đã lưu biên bản kiểm kê cho ${shelf.code}!`, 'success');
  renderAuditHistory();
  document.getElementById('auditNoteInput').value = '';
}

// Window export
window.handleSaveCheck = handleSaveCheck;

function renderAuditHistory() {
  const audits = getShelfChecks();
  const countBadge = document.getElementById('auditHistoryCount');
  if (countBadge) countBadge.textContent = `${audits.length} biên bản`;

  const tbody = document.getElementById('auditHistoryTbody');
  if (!tbody) return;

  if (audits.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="empty-shelf-msg">Chưa có lịch sử kiểm kê nào.</td></tr>`;
    return;
  }

  tbody.innerHTML = audits.map(a => {
    let diffBadge = `<span class="badge badge-normal">Khớp (0)</span>`;
    if (a.discrepancy < 0) {
      diffBadge = `<span class="badge badge-empty">${a.discrepancy} sp</span>`;
    } else if (a.discrepancy > 0) {
      diffBadge = `<span class="badge badge-low">+${a.discrepancy} sp</span>`;
    }

    return `
      <tr>
        <td><strong>${a.id}</strong></td>
        <td><strong class="text-primary">${a.shelfId}</strong></td>
        <td>${a.systemCount} / <strong>${a.actualCount}</strong> sp</td>
        <td>${diffBadge}</td>
        <td>${a.auditor}</td>
        <td class="fs-xs text-muted">${a.date}</td>
        <td class="fs-xs text-muted">${a.note}</td>
      </tr>
    `;
  }).join('');
}

// Window alias for cross-tab auto refresh
window.renderAuditHistory = renderAuditHistory;
