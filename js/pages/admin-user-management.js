/**
 * SmartShelf - Logic Quản trị người dùng & Phân quyền (admin-user-management.html)
 * Phụ trách bởi: SV3 Nguyễn Văn Hân (MSV: 2551170885)
 * Vertical Slice: Cấp tài khoản mới, phân quyền 4 vai trò, reset mật khẩu
 */

document.addEventListener('DOMContentLoaded', () => {
  renderUsers();

  const addBtn = document.getElementById('openAddUserModalBtn');
  const cancelBtn = document.getElementById('cancelAddUserBtn');
  const form = document.getElementById('userForm');

  if (addBtn) addBtn.addEventListener('click', openAddUserModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeUserModal);
  if (form) form.addEventListener('submit', handleAddUser);
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
        <td><strong style="color:var(--text-main); font-size:0.95rem;">${u.fullName}</strong></td>
        <td><code>${u.username}</code></td>
        <td>${roleBadge}</td>
        <td>${u.email || 'Chưa cập nhật'}</td>
        <td><span class="badge badge-normal">${u.badge || 'Tài khoản thường'}</span></td>
        <td style="text-align: right;">
          <div style="display: inline-flex; gap: 0.3rem;">
            <button class="btn btn-secondary btn-sm" onclick="showToast('Đã cấp lại mật khẩu mặc định 123456 cho ${u.username}!', 'info')">
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
  if (modal) modal.style.display = 'flex';
}

function closeUserModal() {
  const modal = document.getElementById('userModal');
  if (modal) modal.style.display = 'none';
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

// Window alias for cross-tab auto refresh
window.renderUsers = renderUsers;
