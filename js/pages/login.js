/**
 * SmartShelf - Logic Đăng nhập phân quyền (login.html)
 * Phụ trách bởi: SV1 Trần Trọng Hoàng Anh (MSV: 2551170859)
 * Vertical Slice: Cổng xác thực người dùng & điều hướng vai trò
 */

function quickFill(user, role) {
  document.getElementById('usernameInput').value = user;
  document.getElementById('passwordInput').value = '123456';
  document.getElementById('targetRoleSelect').value = role;
  document.getElementById('usernameInput').classList.remove('is-invalid');
}

document.addEventListener('DOMContentLoaded', () => {
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
