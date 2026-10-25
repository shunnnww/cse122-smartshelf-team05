/**
 * SmartShelf - Logic Quản trị người dùng & Phân quyền (admin-user-management.html)
 * Phụ trách bởi: SV3 Nguyễn Văn Hân (MSV: 2551170885)
 * Vertical Slice: Cấp tài khoản mới, phân quyền 4 vai trò, reset mật khẩu
 */

document.addEventListener('DOMContentLoaded', () => {
  renderUsers();

  const addBtn = document.getElementById('openAddUserModalBtn');
  const cancelBtn = document.getElementById('cancelAddUserBtn');
  const closeCrossBtn = document.getElementById('closeUserModalCrossBtn');
  const form = document.getElementById('userForm');
  const tbody = document.getElementById('usersTableBody');

  if (addBtn) addBtn.addEventListener('click', openAddUserModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeUserModal);
  if (closeCrossBtn) closeCrossBtn.addEventListener('click', closeUserModal);
  if (form) form.addEventListener('submit', handleAddUser);

  if (tbody) {
    tbody.addEventListener('click', (e) => {
      const resetBtn = e.target.closest('.btn-reset-pw');
      if (resetBtn) {
        const username = resetBtn.getAttribute('data-username');
        if (username) {
          showToast(`Đã cấp lại mật khẩu mặc định 123456 cho ${username}!`, 'info');
        }
      }
    });
  }
});

function renderUsers() {
  const users = getUsers();
  const tbody = document.getElementById('usersTableBody');
  const badge = document.getElementById('usersCountBadge');
  if (badge) badge.textContent = `${users.length} tài khoản`;
  if (!tbody) return;

  tbody.innerHTML = users.map(u => {
    let roleBadge = '<span class="role-badge-tag role-shopper">Khách hàng</span>';
    if (u.role === 'staff') roleBadge = '<span class="role-badge-tag role-associate">Nhân viên</span>';
    else if (u.role === 'manager') roleBadge = '<span class="role-badge-tag role-manager">Quản lý</span>';
    else if (u.role === 'admin') roleBadge = '<span class="role-badge-tag role-admin">Quản trị</span>';

    return `
      <tr>
        <td><code>${u.id}</code></td>
        <td><strong class="user-full-name">${u.fullName}</strong></td>
        <td><code>${u.username}</code></td>
        <td>${roleBadge}</td>
        <td>${u.email || 'Chưa cập nhật'}</td>
        <td><span class="badge badge-normal">${u.badge || 'Tài khoản thường'}</span></td>
        <td class="text-right">
          <div class="d-inline-flex gap-1">
            <button type="button" class="btn btn-secondary btn-sm btn-reset-pw" data-username="${u.username}">
              🔑 Đặt lại mật khẩu
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function openAddUserModal() {
  const form = document.getElementById('userForm');
  if (form) form.reset();
  const modal = document.getElementById('userModal');
  if (modal) modal.classList.add('active');
}

function closeUserModal() {
  const modal = document.getElementById('userModal');
  if (modal) modal.classList.remove('active');
}

function handleAddUser(e) {
  e.preventDefault();
  const name = document.getElementById('userNameInput').value.trim();
  const login = document.getElementById('userLoginInput').value.trim();
  const role = document.getElementById('userRoleSelect').value;
  const email = document.getElementById('userEmailInput').value.trim();

  if (!name || !login) {
    showToast('Vui lòng điền đầy đủ họ tên và tên đăng nhập!', 'error');
    return;
  }

  addUser({
    fullName: name,
    username: login,
    role: role,
    email: email || `${login}@smartshelf.vn`,
    badge: 'Thành viên mới'
  });

  showToast(`Đã thêm mới tài khoản ${login} thành công!`, 'success');
  closeUserModal();
  renderUsers();
}

// Window aliases for cross-tab auto refresh or compatibility
window.renderUsers = renderUsers;
window.openAddUserModal = openAddUserModal;
window.closeUserModal = closeUserModal;
