/**
 * SmartShelf - Logic Bảng Kanban điều phối bổ sung kệ (manager-restock-board.html)
 * Phụ trách bởi: SV3 Nguyễn Văn Hân (MSV: 2551170885)
 * Vertical Slice: Bảng Kanban 4 cột (Pending, In-Progress, Review, Completed), Tạo việc thủ công & Modal
 * Tách biệt 3 tầng kiến trúc: 100% JS nằm trong file này
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

  const pCol = document.getElementById('colPending');
  const ipCol = document.getElementById('colInProgress');
  const rCol = document.getElementById('colReview');
  const cCol = document.getElementById('colCompleted');

  if (!pCol || !ipCol || !rCol || !cCol) return;

  pCol.innerHTML = '';
  ipCol.innerHTML = '';
  rCol.innerHTML = '';
  cCol.innerHTML = '';

  let pCount = 0, ipCount = 0, rCount = 0, cCount = 0;

  tasks.forEach(t => {
    let borderClass = 'border-priority-normal';
    if (t.priority === 'Cao' || t.priority === 'Rất Cao') borderClass = 'border-priority-high';
    else if (t.priority === 'Trung bình') borderClass = 'border-priority-medium';

    const cardHtml = `
      <div class="kanban-card ${borderClass}">
        <div class="kanban-card-top">
          <span class="kanban-id">${t.id}</span>
          <span class="badge ${t.priority === 'Cao' || t.priority === 'Rất Cao' ? 'badge-empty' : 'badge-low'} kanban-badge-priority">
            ${t.priority}
          </span>
        </div>

        <div class="kanban-prod-title">${t.productName}</div>
        <div class="kanban-shelf-info">
          📍 ${t.shelfCode || t.shelfId} · Cần: ${t.requestedQty} sp
        </div>

        ${t.aiReason ? `
          <div class="kanban-ai-note">
            ${t.aiReason}
          </div>
        ` : ''}

        <div class="kanban-assignee">
          👤 ${t.assignedTo || 'Chưa gán'}
        </div>

        <div class="kanban-actions-row">
          ${t.status === 'pending' ? `
            <button class="btn btn-secondary btn-sm btn-kanban-sm btn-move-task" data-id="${t.id}" data-next="in-progress">
              Giao việc &rarr;
            </button>
          ` : ''}
          ${t.status === 'in-progress' ? `
            <button class="btn btn-secondary btn-sm btn-kanban-sm btn-move-task" data-id="${t.id}" data-next="review">
              Gửi duyệt &rarr;
            </button>
          ` : ''}
          ${t.status === 'review' ? `
            <button class="btn btn-success btn-sm btn-kanban-sm btn-move-task" data-id="${t.id}" data-next="completed">
              Duyệt hoàn thành ✓
            </button>
          ` : ''}
          ${t.status === 'completed' ? `
            <span class="fs-xs text-success fw-bold">Đã lên kệ</span>
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

  // Bind move buttons cleanly without inline onclick
  document.querySelectorAll('.btn-move-task').forEach(btn => {
    btn.addEventListener('click', () => {
      moveTask(btn.getAttribute('data-id'), btn.getAttribute('data-next'));
    });
  });
}

function moveTask(taskId, nextStatus) {
  updateRestockTask(taskId, { status: nextStatus });
  showToast(`Đã chuyển trạng thái sang [${nextStatus}]!`, 'info');
  renderKanban();
}

// Window export
window.moveTask = moveTask;

function openCreateModal() {
  const modal = document.getElementById('createTaskModal');
  if (modal) modal.style.display = 'flex';
}

// Window export
window.openCreateModal = openCreateModal;

function closeCreateModal() {
  const modal = document.getElementById('createTaskModal');
  if (modal) modal.style.display = 'none';
}

// Window export
window.closeCreateModal = closeCreateModal;

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

  const qty = parseInt(document.getElementById('taskQtyInput').value) || 30;
  const priority = document.getElementById('taskPrioritySelect').value;
  const assignee = document.getElementById('taskAssigneeSelect').value;

  const newTask = {
    shelfId: prod ? prod.shelfId : 'Kệ A01',
    shelfCode: prod ? prod.shelfId : 'Kệ A01',
    productId: prodId,
    productName: prod ? prod.name : 'Sản phẩm mới',
    requestedQty: qty,
    priority: priority,
    aiReason: 'Điều phối thủ công từ Quản lý',
    status: 'pending',
    assignedTo: assignee
  };

  addRestockTask(newTask);
  showToast(`Đã tạo nhiệm vụ cho ${prod ? prod.name : 'sản phẩm'}!`, 'success');
  closeCreateModal();
  renderKanban();
}

// Window export
window.handleCreateTask = handleCreateTask;

// Window alias for cross-tab auto refresh
window.renderKanban = renderKanban;
