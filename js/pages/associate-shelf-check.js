/**
 * SmartShelf - Logic Kiểm kê kệ & Phát hiện sai lệch (associate-shelf-check.html)
 * Phụ trách bởi: SV2 Nguyễn Quang Long (MSV: 2551170915)
 * Tính năng AI: AI-3 Shelf Anomaly Insight (Đối soát tồn máy tính & thực đếm hiện trường)
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
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:1.5rem; color:var(--text-muted);">Kệ này hiện chưa được gán sản phẩm nào.</td></tr>`;
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
          <div style="font-size:0.75rem; color:var(--text-muted);">${p.sku} · ${p.shelfLevel || 'Tầng 2'}</div>
        </td>
        <td>
          <span class="expected-stock-val" style="font-weight:700; font-size:1rem;">${p.stockQty}</span> sp
        </td>
        <td>
          <input type="number" class="form-control actual-stock-input" value="${defaultActual}" min="0" max="200" style="width: 100px;" oninput="recalcDiscrepancy(this)">
        </td>
        <td>
          <span class="diff-badge badge ${defaultActual - p.stockQty === 0 ? 'badge-normal' : 'badge-empty'}">
            ${defaultActual - p.stockQty > 0 ? '+' : ''}${defaultActual - p.stockQty} sp
          </span>
        </td>
      </tr>
    `;
  }).join('');
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

  const discrepancy = totalAct - totalSys;
  const status = Math.abs(discrepancy) >= 10 ? 'anomaly' : (totalAct <= 5 ? 'empty' : (totalAct <= 15 ? 'low' : 'normal'));

  const checkRecord = {
    shelfId: shelf.id,
    shelfCode: shelf.code,
    zoneCode: shelf.zoneCode,
    checkerName: checkerName,
    systemStock: totalSys,
    actualStock: totalAct,
    discrepancy: discrepancy,
    status: status,
    note: note || (status === 'anomaly' ? 'Phát hiện sai số kiểm đếm cao' : 'Kiểm kê định kỳ bình thường')
  };

  addShelfCheck(checkRecord);
  updateShelf(shelf.id, { currentCount: totalAct, lastChecked: new Date().toISOString().substring(0, 16).replace('T', ' ') });

  showToast(`Đã lưu biên bản kiểm kê cho ${shelf.code}!`, 'success');
  renderAuditHistory();
}

function renderAuditHistory() {
  const checks = getShelfChecks();
  const tbody = document.getElementById('auditHistoryTbody');
  const countBadge = document.getElementById('auditHistoryCount');
  if (countBadge) countBadge.textContent = `${checks.length} biên bản`;
  if (!tbody) return;

  tbody.innerHTML = checks.map(c => {
    let badgeHtml = '<span class="badge badge-normal">Khớp số liệu</span>';
    if (c.status === 'anomaly') badgeHtml = '<span class="badge badge-anomaly">Bất thường</span>';
    else if (c.status === 'empty') badgeHtml = '<span class="badge badge-empty">Kệ rỗng</span>';
    else if (c.status === 'low') badgeHtml = '<span class="badge badge-low">Sắp hết</span>';

    return `
      <tr>
        <td><strong>${c.id}</strong></td>
        <td><strong>${c.shelfCode}</strong></td>
        <td>${c.systemStock} / <strong>${c.actualStock}</strong> sp</td>
        <td>
          <span style="font-weight:700; color: ${c.discrepancy < 0 ? 'var(--danger)' : 'var(--success)'};">
            ${c.discrepancy > 0 ? '+' : ''}${c.discrepancy}
          </span>
        </td>
        <td>${badgeHtml}</td>
        <td style="font-size:0.75rem; color:var(--text-muted);">${c.checkedAt || 'Vừa xong'}</td>
      </tr>
    `;
  }).join('');
}
