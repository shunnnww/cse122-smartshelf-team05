/**
 * SmartShelf - Logic Bổ sung kệ & AI-1 Restock Priority (associate-restock-task.html)
 * Phụ trách bởi: SV2 Nguyễn Quang Long (MSV: 2551170915)
 * Tính năng AI: AI-1 Restock Priority AI (Mô hình MDVM-v2, Failure UX & Chuyển trạng thái)
 * Tách biệt 3 tầng kiến trúc: 100% JS nằm trong file này
 */

document.addEventListener('DOMContentLoaded', () => {
  renderTasksTable();
  triggerAiPriority(false);

  const runAiBtn = document.getElementById('runAiPriorityBtn');
  const simErrorBtn = document.getElementById('simulateAiErrorBtn');
  const filterSelect = document.getElementById('taskStatusFilter');
  const retryBtn = document.getElementById('retryAiPriorityBtn');
  const manualBtn = document.getElementById('manualCreateTaskBtn');
  const hidePanelBtn = document.getElementById('hideAiPanelBtn');

  if (runAiBtn) runAiBtn.addEventListener('click', () => triggerAiPriority(false));
  if (simErrorBtn) simErrorBtn.addEventListener('click', () => triggerAiPriority(true));
  if (filterSelect) filterSelect.addEventListener('change', renderTasksTable);
  if (retryBtn) retryBtn.addEventListener('click', () => triggerAiPriority(false));
  if (manualBtn) manualBtn.addEventListener('click', () => showToast('Chế độ tạo nhiệm vụ thủ công đã kích hoạt', 'info'));
  if (hidePanelBtn) {
    hidePanelBtn.addEventListener('click', () => {
      const panel = document.getElementById('aiPriorityPanel');
      if (panel) panel.classList.add('d-none');
    });
  }
});

async function triggerAiPriority(forceError = false) {
  const loading = document.getElementById('aiPriorityLoadingBox');
  const panel = document.getElementById('aiPriorityPanel');
  const errBox = document.getElementById('aiPriorityErrorBox');

  if (panel) panel.classList.add('d-none');
  if (errBox) errBox.classList.add('d-none');
  if (loading) loading.classList.remove('d-none');

  try {
    const res = await runRestockPriorityAI(forceError);
    if (loading) loading.classList.add('d-none');

    if (res.status === 'empty' || res.items.length === 0) {
      showToast('Tất cả kệ đều đang đủ hàng!', 'info');
      return;
    }

    renderAiPriorityRows(res.items);
    if (panel) panel.classList.remove('d-none');
    showToast('AI đã hoàn tất xếp hạng ưu tiên bổ sung kệ!', 'ai');

  } catch (err) {
    if (loading) loading.classList.add('d-none');
    if (errBox) errBox.classList.remove('d-none');
    const errMsg = document.getElementById('aiPriorityErrorMessage');
    if (errMsg) errMsg.textContent = err.message || 'Mô phỏng lỗi AI kích hoạt.';
    showToast('Đã kích hoạt trạng thái AI thất bại / không chắc chắn.', 'error');
  }
}

// Window export
window.triggerAiPriority = triggerAiPriority;

function renderAiPriorityRows(items) {
  const tbody = document.getElementById('aiPriorityTbody');
  if (!tbody) return;

  tbody.innerHTML = items.map(item => {
    let urgencyClass = 'task-urgency-normal';
    if (item.score >= 85) urgencyClass = 'task-urgency-high';
    else if (item.score >= 70) urgencyClass = 'task-urgency-medium';

    return `
      <tr>
        <td>
          <span class="ai-priority-score-badge ${urgencyClass}">
            ${item.score}
          </span>
        </td>
        <td>
          <span class="badge ${item.score >= 85 ? 'badge-empty' : 'badge-low'}">${item.urgency}</span>
        </td>
        <td>
          <strong class="text-main fs-sm">${item.productName}</strong>
          <div class="fs-xs text-muted">Vị trí: <strong>${item.shelfId}</strong></div>
        </td>
        <td>
          <strong class="${item.stockQty === 0 ? 'text-danger' : 'text-warning'}">${item.stockQty}</strong> / Tối thiểu ${item.minQty}
        </td>
        <td class="fs-sm text-body">
          ${item.reason}
        </td>
        <td class="text-right">
          <button class="btn btn-ai btn-sm btn-accept-ai-task" 
                  data-shelf="${item.shelfId}" 
                  data-prod-id="${item.productId}" 
                  data-prod-name="${item.productName.replace(/"/g, '&quot;')}" 
                  data-qty="${item.suggestedQty}" 
                  data-urgency="${item.urgency}" 
                  data-score="${item.score}" 
                  data-reason="${item.reason.replace(/"/g, '&quot;')}">
            ✅ Duyệt và tạo việc
          </button>
        </td>
      </tr>
    `;
  }).join('');

  // Bind approval buttons cleanly without inline onclick
  tbody.querySelectorAll('.btn-accept-ai-task').forEach(btn => {
    btn.addEventListener('click', () => {
      acceptAiRestockItem(
        btn.getAttribute('data-shelf'),
        btn.getAttribute('data-prod-id'),
        btn.getAttribute('data-prod-name'),
        parseInt(btn.getAttribute('data-qty')) || 20,
        btn.getAttribute('data-urgency'),
        parseInt(btn.getAttribute('data-score')) || 80,
        btn.getAttribute('data-reason')
      );
    });
  });
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

// Window export
window.acceptAiRestockItem = acceptAiRestockItem;

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
    tbody.innerHTML = `<tr><td colspan="8" class="empty-task-msg">Không có nhiệm vụ nào trong trạng thái này.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(t => {
    let statusBadge = '<span class="badge badge-pending">Chờ xử lý</span>';
    if (t.status === 'in-progress') statusBadge = '<span class="badge badge-in-progress">Đang lấy hàng</span>';
    else if (t.status === 'completed') statusBadge = '<span class="badge badge-completed">Đã hoàn tất</span>';

    return `
      <tr>
        <td><strong>${t.id}</strong></td>
        <td><strong class="text-primary">${t.shelfCode || t.shelfId}</strong></td>
        <td>
          <strong>${t.productName}</strong>
          ${t.aiPriorityScore ? `<div class="fs-xs text-ai">Điểm AI: ${t.aiPriorityScore}</div>` : ''}
        </td>
        <td><strong>${t.requestedQty}</strong> sp</td>
        <td><span class="badge ${t.priority === 'Cao' || t.priority === 'Rất Cao' ? 'badge-empty' : 'badge-low'}">${t.priority}</span></td>
        <td>${statusBadge}</td>
        <td class="fs-sm">${t.assignedTo || 'Chưa gán'}</td>
        <td class="text-right">
          <div class="d-inline-flex gap-025">
            ${t.status === 'pending' ? `
              <button class="btn btn-secondary btn-sm btn-advance-task" data-id="${t.id}" data-next="in-progress">
                ▶️ Bắt đầu
              </button>
            ` : ''}
            ${t.status === 'in-progress' ? `
              <button class="btn btn-success btn-sm btn-advance-task" data-id="${t.id}" data-next="completed">
                ✅ Đã xếp lên kệ
              </button>
            ` : ''}
            ${t.status === 'completed' ? `
              <span class="fs-xs text-success fw-semibold">✓ Hoàn thành</span>
            ` : `
              <button class="btn btn-secondary btn-sm text-danger btn-delete-task" data-id="${t.id}" title="Hủy việc">
                🗑️
              </button>
            `}
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Bind actions cleanly without inline onclick
  tbody.querySelectorAll('.btn-advance-task').forEach(btn => {
    btn.addEventListener('click', () => {
      advanceTaskStatus(btn.getAttribute('data-id'), btn.getAttribute('data-next'));
    });
  });

  tbody.querySelectorAll('.btn-delete-task').forEach(btn => {
    btn.addEventListener('click', () => {
      handleDeleteTask(btn.getAttribute('data-id'));
    });
  });
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

    const shelf = getShelfById(task.shelfId) || getShelves().find(s => s.code === task.shelfCode);
    if (shelf) {
      updateShelf(shelf.id, {
        currentCount: Math.min(shelf.maxCapacity, shelf.currentCount + task.requestedQty),
        status: 'normal',
        lastChecked: 'Vừa bổ sung hàng'
      });
    }

    showToast(`Đã bổ sung ${task.requestedQty} sp cho ${task.productName}! Toàn hệ thống đã cập nhật số lượng tồn.`, 'success');
  } else {
    showToast(`Đã chuyển trạng thái nhiệm vụ [${task.id}] sang: ${nextStatus}!`, 'info');
  }

  renderTasksTable();
}

// Window export
window.advanceTaskStatus = advanceTaskStatus;

function handleDeleteTask(taskId) {
  deleteRestockTask(taskId);
  showToast('Đã xóa nhiệm vụ!', 'info');
  renderTasksTable();
}

// Window export
window.handleDeleteTask = handleDeleteTask;

// Window alias for cross-tab auto refresh
window.renderTasks = renderTasksTable;
