/**
 * SmartShelf - Main UI Interactions & Shell
 * Team 5 - 67KTPM1 (Trần Trọng Hoàng Anh, Nguyễn Quang Long, Nguyễn Văn Hân)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupHeaderRoleSwitcher();
  setupHeaderExtraActions();
  setupToastContainer();
  setupGlobalModalEsc();
  setupCrossTabAutoRefresh();
});

// ================= THEME (DARK / LIGHT MODE - BONUS 3) =================
function initTheme() {
  const savedTheme = localStorage.getItem('SMARTSHELF_THEME') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const target = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', target);
  localStorage.setItem('SMARTSHELF_THEME', target);
  updateThemeButtonLabel(target);
  showToast(`Đã chuyển sang ${target === 'dark' ? 'Giao diện Tối (Dark Mode)' : 'Giao diện Sáng (Light Mode)'}`, 'info');
}

function updateThemeButtonLabel(theme) {
  const btn = document.getElementById('globalThemeToggleBtn');
  if (btn) {
    btn.innerHTML = theme === 'dark' ? '☀️ Sáng' : '🌙 Tối';
    btn.setAttribute('aria-label', `Chuyển sang chế độ ${theme === 'dark' ? 'sáng' : 'tối'}`);
  }
}

// ================= HEADER ACTIONS & BONUS UTILITIES =================
function setupHeaderExtraActions() {
  const actionsContainer = document.querySelector('.header-actions');
  if (!actionsContainer) return;

  // Add Theme Toggle button if not present
  if (!document.getElementById('globalThemeToggleBtn')) {
    const themeBtn = document.createElement('button');
    themeBtn.type = 'button';
    themeBtn.id = 'globalThemeToggleBtn';
    themeBtn.className = 'btn btn-secondary btn-sm header-action-btn';
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    themeBtn.innerHTML = currentTheme === 'dark' ? '☀️ Sáng' : '🌙 Tối';
    themeBtn.title = 'Bật/tắt chế độ Sáng - Tối toàn hệ thống';
    themeBtn.addEventListener('click', toggleTheme);
    actionsContainer.prepend(themeBtn);
  }

  // Add AI Key Modal button (Bonus 2: Safe SessionStorage AI Key)
  if (!document.getElementById('globalAiConfigBtn')) {
    const aiBtn = document.createElement('button');
    aiBtn.type = 'button';
    aiBtn.id = 'globalAiConfigBtn';
    aiBtn.className = 'btn btn-secondary btn-sm header-action-btn';
    aiBtn.innerHTML = '⚙️ AI Key';
    aiBtn.title = 'Cấu hình API Key AI an toàn (sessionStorage)';
    aiBtn.addEventListener('click', openAiConfigModal);
    actionsContainer.prepend(aiBtn);
  }
}

// ================= ESCAPE KEY MODAL CLOSER (TIÊU CHÍ 3.3 A11Y) =================
function setupGlobalModalEsc() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      const openModals = document.querySelectorAll('.modal-overlay, .modal, #aiConfigModal, .shelf-modal-overlay, .admin-modal-overlay, .user-modal-overlay');
      openModals.forEach(m => {
        if (m.style.display !== 'none' && m.style.display !== '') {
          m.style.display = 'none';
        }
        m.classList.remove('active');
        m.classList.remove('show');
      });
      if (typeof closeModal === 'function') closeModal();
      if (typeof closeEditModal === 'function') closeEditModal();
      if (typeof closeProductModal === 'function') closeProductModal();
      if (typeof closeShelfModal === 'function') closeShelfModal();
      if (typeof closeUserModal === 'function') closeUserModal();
    }
  });
}

// ================= CROSS-TAB AUTO REFRESH (BONUS 1) =================
function setupCrossTabAutoRefresh() {
  window.addEventListener('smartshelf:sync', () => {
    if (typeof renderProducts === 'function') renderProducts();
    if (typeof renderShelves === 'function') renderShelves();
    if (typeof renderTasks === 'function') renderTasks();
    if (typeof renderBoard === 'function') renderBoard();
    if (typeof renderHealth === 'function') renderHealth();
    if (typeof renderVelocityTable === 'function') renderVelocityTable();
    if (typeof renderUsers === 'function') renderUsers();
  });
}

// ================= SAFE AI KEY MODAL (BONUS 2) =================
function openAiConfigModal() {
  let modal = document.getElementById('aiConfigModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'aiConfigModal';
    modal.className = 'ai-modal-overlay';

    modal.innerHTML = `
      <div class="ai-modal-card">
        <div class="ai-modal-header">
          <h3 class="ai-modal-title">⚙️ Cấu hình API Key AI (Mở rộng Bonus)</h3>
          <button type="button" class="ai-modal-close-btn" id="closeAiConfigCrossBtn">&times;</button>
        </div>
        <p class="ai-modal-desc">
          Hệ thống mặc định sử dụng <strong>bộ giải thuật AI suy luận nội bộ (MDVM-v2)</strong> cực nhanh và bảo mật tuyệt đối. Bạn có thể nhập API Key (Gemini/OpenAI) để thử nghiệm gọi LLM thời gian thực. Key được lưu tạm trong <code>sessionStorage</code> và tự hủy khi đóng tab.
        </p>
        <div class="form-group mb-125">
          <label class="form-label fw-semibold fs-sm" for="tempApiKeyInput">API Key tạm thời (SessionStorage):</label>
          <input type="password" id="tempApiKeyInput" class="form-control w-100" placeholder="sk-... hoặc AIzaSy..." />
          <div class="ai-modal-security">
            🔒 Bảo mật: Tuyệt đối không lưu vào mã nguồn, tránh lỗi VP-01.
          </div>
        </div>
        <div class="ai-modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" id="clearAiConfigBtn">Xóa Key</button>
          <button type="button" class="btn btn-primary btn-sm" id="saveAiConfigBtn">Lưu vào phiên làm việc</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = document.getElementById('closeAiConfigCrossBtn');
    const clearBtn = document.getElementById('clearAiConfigBtn');
    const saveBtn = document.getElementById('saveAiConfigBtn');

    if (closeBtn) closeBtn.addEventListener('click', closeAiConfigModal);
    if (clearBtn) clearBtn.addEventListener('click', clearAiConfigKey);
    if (saveBtn) saveBtn.addEventListener('click', saveAiConfigKey);
  }

  const input = document.getElementById('tempApiKeyInput');
  if (input) {
    input.value = typeof getCustomAIKey === 'function' ? getCustomAIKey() : (sessionStorage.getItem('SMARTSHELF_CUSTOM_AI_KEY') || '');
  }
  modal.classList.add('active');
}

function closeAiConfigModal() {
  const modal = document.getElementById('aiConfigModal');
  if (modal) modal.classList.remove('active');
}

function saveAiConfigKey() {
  const input = document.getElementById('tempApiKeyInput');
  const val = input ? input.value.trim() : '';
  if (typeof setCustomAIKey === 'function') {
    setCustomAIKey(val);
  } else {
    sessionStorage.setItem('SMARTSHELF_CUSTOM_AI_KEY', val);
  }
  closeAiConfigModal();
  showToast(val ? 'Đã lưu API Key AI vào phiên làm việc an toàn (sessionStorage)!' : 'Đã chuyển về chế độ AI cục bộ mặc định.', 'success');
}

function clearAiConfigKey() {
  if (typeof setCustomAIKey === 'function') {
    setCustomAIKey('');
  } else {
    sessionStorage.removeItem('SMARTSHELF_CUSTOM_AI_KEY');
  }
  const input = document.getElementById('tempApiKeyInput');
  if (input) input.value = '';
  closeAiConfigModal();
  showToast('Đã xóa Key. Hệ thống sử dụng mô hình suy luận nội bộ an toàn.', 'info');
}

// ================= TOAST SYSTEM =================
function showToast(message, type = 'info') {
  let container = document.getElementById('smart-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'smart-toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') { icon = '✅'; }
  else if (type === 'error') { icon = '⚠️'; }
  else if (type === 'ai') { icon = '✨'; }

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-hide');
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

// ================= ROLE SWITCHER =================
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

// ================= FORM VALIDATION UTILITY =================
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

// ================= EXPORT HELPERS (BONUS 4 & LIVE MOD ĐỀ D4) =================
function exportDataToJSON(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Đã xuất thành công tệp ${filename}!`, 'success');
}

function exportDataToCSV(filename, headers, rows) {
  const csvContent = '\uFEFF' + [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${String(cell || '').replace(/"/g, '""')}"`).join(','))
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Đã xuất thành công tệp ${filename}!`, 'success');
}
