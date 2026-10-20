/**
 * SmartShelf - Main UI Interactions & Shell
 * Team 5 - 67KTPM1 (Trần Trọng Hoàng Anh, Nguyễn Quang Long, Nguyễn Văn Hân)
 */

document.addEventListener('DOMContentLoaded', () => {
  setupHeaderRoleSwitcher();
  setupToastContainer();
});

function showToast(message, type = 'info') {
  let container = document.getElementById('smart-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'smart-toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let icon = 'ℹ️';
  let borderCol = 'var(--primary)';
  if (type === 'success') { icon = '✅'; borderCol = 'var(--success)'; }
  else if (type === 'error') { icon = '⚠️'; borderCol = 'var(--danger)'; }
  else if (type === 'ai') { icon = '✨'; borderCol = 'var(--accent-ai)'; }

  toast.style.borderLeftColor = borderCol;
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function setupToastContainer() {
  if (!document.getElementById('smart-toast-container')) {
    const container = document.createElement('div');
    container.id = 'smart-toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
}

function setupHeaderRoleSwitcher() {
  const select = document.getElementById('globalRoleSwitcher');
  if (!select) return;

  const currentRole = getCurrentRoleFromUrl();
  select.value = currentRole;

  select.addEventListener('change', (e) => {
    const role = e.target.value;
    const isPagesDir = window.location.pathname.includes('/pages/');
    const base = isPagesDir ? '' : 'pages/';

    switch (role) {
      case 'shopper':
        window.location.href = base + 'shopper-product-search.html';
        break;
      case 'associate':
        window.location.href = base + 'associate-zone-view.html';
        break;
      case 'manager':
        window.location.href = base + 'manager-store-dashboard.html';
        break;
      case 'admin':
        window.location.href = base + 'admin-product-management.html';
        break;
      default:
        window.location.href = isPagesDir ? '../index.html' : 'index.html';
    }
  });
}

function getCurrentRoleFromUrl() {
  const p = window.location.pathname.toLowerCase();
  if (p.includes('shopper-')) return 'shopper';
  if (p.includes('associate-')) return 'associate';
  if (p.includes('manager-')) return 'manager';
  if (p.includes('admin-')) return 'admin';
  return 'portal';
}

function validateField(inputElement, condition, errorMsg) {
  const errorContainer = inputElement.parentElement.querySelector('.invalid-feedback');
  if (!condition) {
    inputElement.classList.add('is-invalid');
    if (errorContainer) errorContainer.textContent = errorMsg;
    return false;
  } else {
    inputElement.classList.remove('is-invalid');
    return true;
  }
}
