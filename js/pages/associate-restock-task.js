/**
 * SmartShelf - Logic Bổ sung kệ & AI-1 Restock Priority (associate-restock-task.html)
 * Phụ trách bởi: SV2 Nguyễn Quang Long (MSV: 2551170915)
 * Tính năng AI: AI-1 Restock Priority AI (Mô hình MDVM-v2, Failure UX & Chuyển trạng thái)
 */

document.addEventListener('DOMContentLoaded', () => {
  renderTasksTable();
  triggerAiPriority(false);

  const runAiBtn = document.getElementById('runAiPriorityBtn');
  const simErrorBtn = document.getElementById('simulateAiErrorBtn');
  const filterSelect = document.getElementById('taskStatusFilter');

  if (runAiBtn) runAiBtn.addEventListener('click', () => triggerAiPriority(false));
  if (simErrorBtn) simErrorBtn.addEventListener('click', () => triggerAiPriority(true));
  if (filterSelect) filterSelect.addEventListener('change', renderTasksTable);
});

async function triggerAiPriority(forceError = false) {
  const loading = document.getElementById('aiPriorityLoadingBox');
  const panel = document.getElementById('aiPriorityPanel');
  const errBox = document.getElementById('aiPriorityErrorBox');

  if (panel) panel.style.display = 'none';
  if (errBox) errBox.style.display = 'none';
  if (loading) loading.style.display = 'block';

  try {
    const res = await runRestockPriorityAI(forceError);
    if (loading) loading.style.display = 'none';

    if (res.status === 'empty' || res.items.length === 0) {
      showToast('Tất cả kệ đều đang đủ hàng!', 'info');
      return;
    }

    renderAiPriorityRows(res.items);
    if (panel) panel.style.display = 'block';
    showToast('AI đã hoàn tất xếp hạng ưu tiên bổ sung kệ!', 'ai');

  } catch (err) {
    if (loading) loading.style.display = 'none';
    if (errBox) errBox.style.display = 'block';
    const errMsg = document.getElementById('aiPriorityErrorMessage');
    if (errMsg) errMsg.textContent = err.message || 'Mô phỏng lỗi AI kích hoạt.';
    showToast('Đã kích hoạt trạng thái AI thất bại / không chắc chắn.', 'error');
  }
}

function renderAiPriorityRows(items) {
  const tbody = document.getElementById('aiPriorityTbody');
  if (!tbody) return;

  tbody.innerHTML = items.map(item => {
    let badgeCol = 'var(--primary)';
    if (item.score >= 85) badgeCol = 'var(--danger)';
    else if (item.score >= 70) badgeCol = '#d97706';

    return `
      <tr>
        <td>
          <span class="ai-priority-score-badge" style="background: ${badgeCol};">
            ${item.score}
          </span>
        </td>
        <td>
          <span class="badge ${item.score >= 85 ? 'badge-empty' : 'badge-low'}">${item.urgency}</span>
        </td>
        <td>
          <strong style="color: var(--text-main); font-size: 0.95rem;">${item.productName}</strong>
          <div style="font-size: 0.75rem; color: var(--text-muted);">Vị trí: <strong>${item.shelfId}</strong></div>
        </td>
        <td>
          <strong style="color: ${item.stockQty === 0 ? 'var(--danger)' : '#d97706'};">${item.stockQty}</strong> / Tối thiểu ${item.minQty}
        </td>
        <td style="font-size: 0.85rem; color: #4b5563; max-width: 320px;">
          ${item.reason}
        </td>
        <td style="text-align: right;">
          <button class="btn btn-ai btn-sm" onclick="acceptAiRestockItem('${item.shelfId}', '${item.productId}', '${item.productName.replace(/'/g, "\\'")}', ${item.suggestedQty}, '${item.urgency}', ${item.score}, '${item.reason.replace(/'/g, "\\'')}')">
            ✅ Duyệt và tạo việc
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function acceptAiRestockItem(shelfId, prodId, prodName, qty, urgency, score, reason) {
  const newTask = {
    shelfId: shelfId,
    shelfCode: shelfId,
    productId: prodId,
    productName: prodName,
    requestedQty: qty,
    priority: urgency,
    aiPriorityScore: score,
    aiReason: reason,
    status: 'pending',
    assignedTo: 'Nguyễn Quang Long (SV2)'
  };

  addRestockTask(newTask);
  showToast(`Đã tạo nhiệm vụ bổ sung cho ${prodName} từ gợi ý AI!`, 'success');
  renderTasksTable();
}

function renderTasksTable() {
  const tasks = getRestockTasks();
  const filterSelect = document.getElementById('taskStatusFilter');
  const filter = filterSelect ? filterSelect.value : 'ALL';
  const tbody = document.getElementById('tasksTableBody');
  if (!tbody) return;

  let list = tasks;
  if (filter !== 'ALL') {
    list = list.filter(t => t.status === filter);
  }

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:2rem; color:var(--text-muted);">Không có nhiệm vụ nào trong trạng thái này.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(t => {
    let statusBadge = '<span class="badge badge-pending">Chờ xử lý</span>';
    if (t.status === 'in-progress') statusBadge = '<span class="badge badge-in-progress">Đang lấy hàng</span>';
    else if (t.status === 'completed') statusBadge = '<span class="badge badge-completed">Đã hoàn tất</span>';

    return `
      <tr>
        <td><strong>${t.id}</strong></td>
        <td><strong style="color: var(--primary);">${t.shelfCode || t.shelfId}</strong></td>
        <td>
          <strong>${t.productName}</strong>
          ${t.aiPriorityScore ? `<div style="font-size:0.7rem; color:var(--accent-ai);">Điểm AI: ${t.aiPriorityScore}</div>` : ''}
        </td>
        <td><strong>${t.requestedQty}</strong> sp</td>
        <td><span class="badge ${t.priority === 'Cao' || t.priority === 'Rất Cao' ? 'badge-empty' : 'badge-low'}">${t.priority}</span></td>
        <td>${statusBadge}</td>
        <td style="font-size: 0.85rem;">${t.assignedTo || 'Chưa gán'}</td>
        <td style="text-align: right;">
          <div style="display: inline-flex; gap: 0.4rem;">
            ${t.status === 'pending' ? `
              <button class="btn btn-secondary btn-sm" onclick="advanceTaskStatus('${t.id}', 'in-progress')">
                ▶️ Bắt đầu
              </button>
            ` : ''}
            ${t.status === 'in-progress' ? `
              <button class="btn btn-success btn-sm" onclick="advanceTaskStatus('${t.id}', 'completed')">
                ✅ Đã xếp lên kệ
              </button>
            ` : ''}
            ${t.status === 'completed' ? `
              <span style="font-size:0.8rem; color:var(--success); font-weight:600;">✓ Hoàn thành</span>
            ` : `
              <button class="btn btn-secondary btn-sm" style="color:var(--danger);" onclick="handleDeleteTask('${t.id}')" title="Hủy việc">
                🗑️
              </button>
            `}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function advanceTaskStatus(taskId, nextStatus) {
  const task = getRestockTasks().find(t => t.id === taskId);
  if (!task) return;

  updateRestockTask(taskId, { status: nextStatus });

  if (nextStatus === 'completed') {
    const prod = getProductById(task.productId);
    if (prod) {
      const newQty = prod.stockQty + task.requestedQty;
      updateProduct(prod.id, { stockQty: newQty });
    }
    const shelf = getShelfById(task.shelfId);
    if (shelf) {
      const newCurrent = Math.min(shelf.maxCapacity, shelf.currentCount + task.requestedQty);
      updateShelf(shelf.id, { currentCount: newCurrent, status: 'normal' });
    }
    showToast(`Đã hoàn thành xếp hàng lên ${task.shelfCode}! Tồn kho và kệ đã được tự động cập nhật.`, 'success');
  } else {
    showToast(`Nhiệm vụ ${taskId} đã chuyển sang trạng thái: ${nextStatus}`, 'info');
  }

  renderTasksTable();
}

function handleDeleteTask(taskId) {
  if (confirm(`Bạn có chắc chắn muốn hủy nhiệm vụ ${taskId}?`)) {
    deleteRestockTask(taskId);
    showToast(`Đã hủy nhiệm vụ ${taskId}!`, 'info');
    renderTasksTable();
  }
}

// Window alias for cross-tab auto refresh
window.renderTasks = renderTasksTable;
