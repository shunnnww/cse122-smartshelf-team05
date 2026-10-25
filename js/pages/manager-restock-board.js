/**
 * SmartShelf - Logic Bảng Kanban điều phối bổ sung kệ (manager-restock-board.html)
 * Phụ trách bởi: SV3 Nguyễn Văn Hân (MSV: 2551170885)
 * Vertical Slice: Bảng Kanban 4 cột (Pending, In-Progress, Review, Completed), Tạo việc thủ công & Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  renderKanban();
  populateTaskModal();

  const openModalBtn = document.getElementById('openCreateTaskModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const form = document.getElementById('createTaskForm');

  if (openModalBtn) openModalBtn.addEventListener('click', openCreateModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeCreateModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeCreateModal);
  if (form) form.addEventListener('submit', handleCreateTask);
});

function renderKanban() {
  const tasks = getRestockTasks();

  const pCol = document.getElementById('col-pending');
  const ipCol = document.getElementById('col-in-progress');
  const rCol = document.getElementById('col-review');
  const cCol = document.getElementById('col-completed');

  if (!pCol || !ipCol || !rCol || !cCol) return;

  pCol.innerHTML = '';
  ipCol.innerHTML = '';
  rCol.innerHTML = '';
  cCol.innerHTML = '';

  let pCount = 0, ipCount = 0, rCount = 0, cCount = 0;

  tasks.forEach(t => {
    let borderCol = 'var(--primary)';
    if (t.priority === 'Cao' || t.priority === 'Rất Cao') borderCol = 'var(--danger)';
    else if (t.priority === 'Trung bình') borderCol = 'var(--warning)';

    const cardHtml = `
      <div class="kanban-card" style="border-left-color: ${borderCol};">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem;">
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">${t.id}</span>
          <span class="badge ${t.priority === 'Cao' || t.priority === 'Rất Cao' ? 'badge-empty' : 'badge-low'}" style="font-size: 0.65rem;">
            ${t.priority}
          </span>
        </div>

        <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.25rem;">${t.productName}</div>
        <div style="font-size: 0.8rem; color: var(--primary); font-weight: 700; margin-bottom: 0.5rem;">
          📍 ${t.shelfCode || t.shelfId} · Cần: ${t.requestedQty} sp
        </div>

        ${t.aiReason ? `
          <div style="font-size: 0.72rem; color: var(--text-muted); background: var(--accent-ai-light); padding: 4px 6px; border-radius: 4px; margin-bottom: 0.5rem; border-left: 2px solid var(--accent-ai);">
            ${t.aiReason}
          </div>
        ` : ''}

        <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.5rem;">
          👤 ${t.assignedTo || 'Chưa gán'}
        </div>

        <div style="display: flex; gap: 0.3rem; justify-content: flex-end; border-top: 1px solid var(--border-light); padding-top: 0.4rem;">
          ${t.status === 'pending' ? `
            <button class="btn btn-secondary btn-sm" style="font-size: 0.7rem; padding: 2px 6px;" onclick="moveTask('${t.id}', 'in-progress')">
              Giao việc &rarr;
            </button>
          ` : ''}
          ${t.status === 'in-progress' ? `
            <button class="btn btn-secondary btn-sm" style="font-size: 0.7rem; padding: 2px 6px;" onclick="moveTask('${t.id}', 'review')">
              Gửi duyệt &rarr;
            </button>
          ` : ''}
          ${t.status === 'review' ? `
            <button class="btn btn-success btn-sm" style="font-size: 0.7rem; padding: 2px 6px;" onclick="moveTask('${t.id}', 'completed')">
              Duyệt hoàn thành ✓
            </button>
          ` : ''}
          ${t.status === 'completed' ? `
            <span style="font-size: 0.7rem; color: var(--success); font-weight: 700;">Đã lên kệ</span>
          ` : ''}
        </div>
      </div>
    `;

    if (t.status === 'pending') { pCol.innerHTML += cardHtml; pCount++; }
    else if (t.status === 'in-progress') { ipCol.innerHTML += cardHtml; ipCount++; }
    else if (t.status === 'review') { rCol.innerHTML += cardHtml; rCount++; }
    else if (t.status === 'completed') { cCol.innerHTML += cardHtml; cCount++; }
  });

  const elP = document.getElementById('countPending');
  const elIP = document.getElementById('countInProgress');
  const elR = document.getElementById('countReview');
  const elC = document.getElementById('countCompleted');

  if (elP) elP.textContent = pCount;
  if (elIP) elIP.textContent = ipCount;
  if (elR) elR.textContent = rCount;
  if (elC) elC.textContent = cCount;
}

function moveTask(taskId, nextStatus) {
  updateRestockTask(taskId, { status: nextStatus });
  showToast(`Đã chuyển trạng thái sang [${nextStatus}]!`, 'info');
  renderKanban();
}

function openCreateModal() {
  const modal = document.getElementById('createTaskModal');
  if (modal) modal.style.display = 'flex';
}

function closeCreateModal() {
  const modal = document.getElementById('createTaskModal');
  if (modal) modal.style.display = 'none';
}

function populateTaskModal() {
  const select = document.getElementById('taskProductSelect');
  if (!select) return;
  const products = getProducts();
  select.innerHTML = products.map(p => `
    <option value="${p.id}" data-shelf="${p.shelfId}">
      ${p.name} (Kệ: ${p.shelfId} - Còn ${p.stockQty} sp)
    </option>
  `).join('');
}

function handleCreateTask(e) {
  e.preventDefault();
  const select = document.getElementById('taskProductSelect');
  if (!select) return;
  const prodId = select.value;
  const prod = getProductById(prodId);
  if (!prod) return;

  const qty = parseInt(document.getElementById('taskQtyInput').value) || 20;
  const priority = document.getElementById('taskPrioritySelect').value;
  const assignee = document.getElementById('taskAssigneeSelect').value;

  const newTask = {
    shelfId: prod.shelfId,
    shelfCode: prod.shelfId,
    productId: prod.id,
    productName: prod.name,
    requestedQty: qty,
    priority: priority,
    status: 'pending',
    assignedTo: assignee,
    aiReason: 'Nhiệm vụ được tạo thủ công bởi Quản lý cửa hàng (SV3).'
  };

  addRestockTask(newTask);
  showToast('Đã thêm nhiệm vụ mới vào cột Chờ phân công!', 'success');
  closeCreateModal();
  renderKanban();
}

// Window alias for cross-tab auto refresh
window.renderBoard = renderKanban;
