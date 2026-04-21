/**
 * app.js — Core Application Logic & UI Utilities
 * Data Analis Platform
 */

/* ─── Toast Notifications ─── */
const Toast = (() => {
  function show(message, type = 'info', duration = 3500) {
    const container = getOrCreateContainer();
    const icons = {
      success: `<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`,
      error:   `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
      info:    `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
      warning: `<svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <span class="toast-msg">${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s, transform 0.3s';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      setTimeout(() => toast.remove(), 320);
    }, duration);
  }

  function getOrCreateContainer() {
    let c = document.getElementById('toast-container');
    if (!c) {
      c = document.createElement('div');
      c.id = 'toast-container';
      c.className = 'toast-container';
      document.body.appendChild(c);
    }
    return c;
  }

  return { show };
})();

/* ─── Modal Utilities ─── */
const Modal = (() => {
  function open(id) {
    const overlay = document.getElementById(id);
    if (overlay) overlay.classList.add('open');
  }

  function close(id) {
    const overlay = document.getElementById(id);
    if (overlay) overlay.classList.remove('open');
  }

  function confirm(options = {}) {
    const {
      title   = 'Konfirmasi',
      message = 'Apakah Anda yakin?',
      onConfirm = () => {},
      onCancel = () => {},
      danger  = false,
    } = options;

    const existingModal = document.getElementById('global-confirm-modal');
    if (existingModal) existingModal.remove();

    const overlay = document.createElement('div');
    overlay.id = 'global-confirm-modal';
    overlay.className = 'modal-overlay open';
    overlay.innerHTML = `
      <div class="modal" style="max-width:400px;">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close" id="confirm-close-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6;">${message}</p>
        <div class="modal-footer">
          <button class="btn btn-ghost" id="confirm-cancel-btn">Batal</button>
          <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" id="confirm-ok-btn">Ya, Lanjutkan</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const remove = () => overlay.remove();
    document.getElementById('confirm-cancel-btn').onclick = () => { remove(); onCancel(); };
    document.getElementById('confirm-close-btn').onclick  = () => { remove(); onCancel(); };
    document.getElementById('confirm-ok-btn').onclick     = () => { remove(); onConfirm(); };
    overlay.addEventListener('click', e => { if (e.target === overlay) { remove(); onCancel(); } });
  }

  return { open, close, confirm };
})();

/* ─── UI Helper (Empty States) ─── */
const UIHelper = {
  emptyTable: function(colspan, title = 'Data Kosong', desc = 'Belum ada data yang tersedia atau tidak ditemukan pencarian yang cocok.') {
    return `<tr>
      <td colspan="${colspan}" style="text-align:center;padding:0;border:none;">
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:64px 24px;">
          <div style="width:72px;height:72px;background:var(--bg-tertiary);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--text-muted);margin-bottom:20px;">
            <svg viewBox="0 0 24 24" style="width:36px;height:36px;stroke:currentColor;stroke-width:1.5;fill:none;stroke-linecap:round;stroke-linejoin:round;">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <div style="font-family:var(--font-head);font-size:1.15rem;font-weight:600;color:var(--text-primary);margin-bottom:8px;">${title}</div>
          <div style="font-size:0.85rem;color:var(--text-secondary);max-width:320px;line-height:1.6;">${desc}</div>
        </div>
      </td>
    </tr>`;
  },
  emptyState: function(title = 'Data Kosong', desc = 'Belum ada data yang tersedia saat ini.') {
    return `<div style="grid-column:1/-1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:64px 24px;text-align:center;background:var(--bg-card);border:1px dashed var(--border-medium);border-radius:var(--radius-lg);">
      <div style="width:72px;height:72px;background:var(--bg-tertiary);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--text-muted);margin-bottom:20px;">
        <svg viewBox="0 0 24 24" style="width:36px;height:36px;stroke:currentColor;stroke-width:1.5;fill:none;stroke-linecap:round;stroke-linejoin:round;">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      </div>
      <div style="font-family:var(--font-head);font-size:1.15rem;font-weight:600;color:var(--text-primary);margin-bottom:8px;">${title}</div>
      <div style="font-size:0.85rem;color:var(--text-secondary);max-width:320px;line-height:1.6;">${desc}</div>
    </div>`;
  }
};

/* ─── Sidebar Toggle ─── */
function initSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const wrapper  = document.getElementById('main-wrapper');
  const toggle   = document.getElementById('sidebar-toggle');
  const overlay  = document.getElementById('sidebar-overlay');

  if (!sidebar || !toggle) return;

  const isMobile = () => window.innerWidth <= 900;

  toggle.addEventListener('click', () => {
    if (isMobile()) {
      sidebar.classList.toggle('mobile-open');
      overlay && overlay.classList.toggle('visible');
    } else {
      sidebar.classList.toggle('collapsed');
      wrapper && wrapper.classList.toggle('sidebar-collapsed');
    }
  });

  overlay && overlay.addEventListener('click', () => {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('visible');
  });
}

/* ─── Active Nav Highlight ─── */
function setActiveNav() {
  const pathSegment = location.pathname.split('/').pop().toLowerCase();
  const currentPage = pathSegment === '' ? 'index' : pathSegment.replace('.html', '');

  document.querySelectorAll('.nav-item').forEach(item => {
    const hrefValue = item.getAttribute('href');
    if (!hrefValue) return;
    const hrefBase = hrefValue.replace('.html', '').toLowerCase();
    item.classList.toggle('active', hrefBase === currentPage);
  });
}

/* ─── Tab UI ─── */
function initTabs(containerSelector) {
  const container = containerSelector
    ? document.querySelector(containerSelector)
    : document;

  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const allBtns     = container.querySelectorAll('.tab-btn');
      const allContents = container.querySelectorAll('.tab-content');

      allBtns.forEach(b => b.classList.remove('active'));
      allContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  const firstBtn = container.querySelector('.tab-btn');
  if (firstBtn && !container.querySelector('.tab-btn.active')) firstBtn.click();
}

/* ─── Format angka ─── */
function animateCounter(el, target, duration = 900) {
  const startTime = performance.now();
  function step(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    el.textContent = DataManager.formatNumber(Math.floor(ease * target));
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = DataManager.formatNumber(target);
  }
  requestAnimationFrame(step);
}

/* ─── Inisialisasi halaman ─── */
function initPage() {
  const session = Auth.requireLogin();
  if (!session) return null;

  const pathSegment = location.pathname.split('/').pop() || '';
  const currentPage = pathSegment.toLowerCase();

  if (session.role === 'admin' && !currentPage.includes('pengguna') && !currentPage.includes('index') && currentPage !== '') {
    window.location.replace('pengguna.html');
    return null;
  }

  DataManager.init();
  initSidebar();
  setActiveNav();
  Auth.populateUserUI(session);

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      Modal.confirm({
        title:     'Konfirmasi Logout',
        message:   'Apakah Anda yakin ingin keluar dari sistem?',
        onConfirm: () => Auth.logout(),
        danger:    true,
      });
    });
  }

  return session;
}

/* ─── Generate unique ID ─── */
function genId(prefix = 'ID') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
}

/* ─── Debounce ─── */
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/* ─── Download CSV ─── */
function downloadCSV(data, filename = 'export.csv') {
  if (!data.length) { Toast.show('Tidak ada data untuk diunduh.', 'warning'); return; }
  const headers = Object.keys(data[0]);
  const rows    = data.map(r => headers.map(h => `"${String(r[h] ?? '').replace(/"/g, '""')}"`).join(','));
  const csv     = [headers.join(','), ...rows].join('\n');
  const blob    = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url     = URL.createObjectURL(blob);
  const a       = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  Toast.show('Data berhasil diunduh.', 'success');
}

/* ─── Render product badge (DINAMIS) ─── */
function productBadge(nama) {
  if (!nama) return `<span class="badge badge-gray">-</span>`;
  // Cari warna dari database produk dinamis
  const products = DataManager.getProducts();
  const found    = products.find(p => p.name === nama);
  const color    = found ? found.color : null;

  if (color) {
    // Buat badge dengan warna custom via inline style
    return `<span class="badge" style="background:${color}22;color:${color};border:1px solid ${color}55;">${nama}</span>`;
  }
  return `<span class="badge badge-gray">${nama}</span>`;
}

/* ─── Isi dropdown produk secara dinamis ─── */
/**
 * Mengisi elemen <select> dengan daftar produk dari localStorage.
 * @param {HTMLSelectElement|string} selectElOrId — elemen select atau ID-nya
 * @param {boolean} withAll — tambahkan opsi "Semua Produk" di awal
 * @param {string} selectedValue — nilai yang harus dipilih (opsional)
 */
function populateProductDropdown(selectElOrId, withAll = false, selectedValue = '') {
  const el = typeof selectElOrId === 'string'
    ? document.getElementById(selectElOrId)
    : selectElOrId;
  if (!el) return;

  const products    = DataManager.getProducts();
  const currentVal  = selectedValue || el.value;

  el.innerHTML = '';

  if (withAll) {
    const optAll = document.createElement('option');
    optAll.value = '';
    optAll.textContent = 'Semua Item';
    el.appendChild(optAll);
  }

  products.forEach(p => {
    const opt = document.createElement('option');
    opt.value       = p.name;
    opt.textContent = p.name;
    if (p.name === currentVal) opt.selected = true;
    el.appendChild(opt);
  });

  // Jika nilai sebelumnya tidak ada di list, pilih pertama
  if (currentVal && !products.find(p => p.name === currentVal)) {
    el.selectedIndex = withAll ? 0 : 0;
  }
}

/* ─── Render action icon button ─── */
function iconBtn(icon, title, cls = 'btn-ghost btn-sm') {
  const icons = {
    edit:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    delete:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>`,
    eye:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    download:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  };
  return `<button class="btn btn-icon ${cls}" title="${title}" data-tip="${title}">${icons[icon] || ''}</button>`;
}
