/**
 * SmartShelf - Logic Đăng nhập phân quyền (login.html)
 * Phụ trách bởi: SV1 Trần Trọng Hoàng Anh (MSV: 2551170859)
 * Vertical Slice: Cổng xác thực người dùng & điều hướng vai trò
 * Tách biệt 3 tầng kiến trúc: 100% JS nằm trong file này
 */

function quickFill(user, role) {
  const userInput = document.getElementById('usernameInput');
  const passInput = document.getElementById('passwordInput');
  const roleSelect = document.getElementById('targetRoleSelect');

  if (userInput) {
    userInput.value = user;
    userInput.classList.remove('is-invalid');
  }
  if (passInput) {
    passInput.value = '123456';
    passInput.classList.remove('is-invalid');
  }
  if (roleSelect) {
    roleSelect.value = role;
  }
}

// Window export for backward compatibility
window.quickFill = quickFill;

document.addEventListener('DOMContentLoaded', () => {
  // Bind quick role pickers
  document.querySelectorAll('.btn-quick-role').forEach(btn => {
    btn.addEventListener('click', () => {
      const u = btn.getAttribute('data-user');
      const r = btn.getAttribute('data-role');
      if (u && r) quickFill(u, r);
    });
  });

  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = document.getElementById('usernameInput');
    const passInput = document.getElementById('passwordInput');
    const role = document.getElementById('targetRoleSelect').value;
    const btn = document.getElementById('loginBtn');

    let isValid = true;
    if (!userInput.value.trim()) {
      userInput.classList.add('is-invalid');
      isValid = false;
    } else {
      userInput.classList.remove('is-invalid');
    }

    if (!passInput.value || passInput.value.length < 4) {
      passInput.classList.add('is-invalid');
      isValid = false;
    } else {
      passInput.classList.remove('is-invalid');
    }

    if (!isValid) return;

    btn.disabled = true;
    btn.innerHTML = 'Đang xác thực...';

    setTimeout(() => {
      const dbUsers = getUsers();
      const matched = dbUsers.find(u => u.username.toLowerCase() === userInput.value.trim().toLowerCase()) || {
        id: 'USR-TEMP',
        username: userInput.value.trim(),
        fullName: userInput.value.trim(),
        role: role,
        badge: role.toUpperCase()
      };
      matched.role = role;
      setCurrentUser(matched);

      showToast('Đăng nhập thành công! Đang chuyển hướng...', 'success');

      setTimeout(() => {
        if (role === 'shopper') window.location.href = 'shopper-product-search.html';
        else if (role === 'associate') window.location.href = 'associate-zone-view.html';
        else if (role === 'manager') window.location.href = 'manager-store-dashboard.html';
        else window.location.href = 'admin-product-management.html';
      }, 500);
    }, 500);
  });
});
