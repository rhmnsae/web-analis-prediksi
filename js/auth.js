/**
 * auth.js — Autentikasi & Session Management
 * Data Analis Platform
 */

const Auth = (() => {

  /* ─── Daftar pengguna (seed data) ─── */
  const SEED_USERS = [
    {
      id: 'USR-001',
      username: 'admin',
      password: 'admin123',
      fullName: 'Administrator',
      role: 'admin',
      email: 'admin@perusahaan.com',
      initials: 'AD',
    },
    {
      id: 'USR-002',
      username: 'demo',
      password: 'demo123',
      fullName: 'Demo Akun',
      role: 'analis',
      email: 'demo@perusahaan.com',
      initials: 'DM',
    }
  ];

  const SESSION_KEY = 'smp_session';
  const USERS_KEY   = 'smp_users';

  /* ─── Inisialisasi Data Pengguna ─── */
  function initUsers() {
    if (!localStorage.getItem(USERS_KEY)) {
      localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
    }
  }
  // Jalankan saat script dimuat
  initUsers();

  function loadUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      return SEED_USERS;
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  /* ─── Login ─── */
  function login(username, password) {
    const users = loadUsers();
    const user = users.find(
      u => u.username === username.trim() && u.password === password
    );
    if (!user) return { success: false, message: 'Username atau password salah.' };

    const session = {
      userId:    user.id,
      username:  user.username,
      fullName:  user.fullName,
      role:      user.role,
      email:     user.email,
      initials:  user.initials,
      loginAt:   new Date().toISOString(),
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { success: true, session };
  }

  /* ─── Logout ─── */
  function logout() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'index.html';
  }

  /* ─── Ambil session aktif ─── */
  function getSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  /* ─── Cek login — redirect ke index jika belum login ─── */
  function requireLogin() {
    const session = getSession();
    if (!session) {
      window.location.href = 'index.html';
      return null;
    }
    return session;
  }

  /* ─── Cek role ─── */
  function hasRole(roles) {
    const session = getSession();
    if (!session) return false;
    return roles.includes(session.role);
  }

  /* ─── Update UI dengan info user ─── */
  function populateUserUI(session) {
    if (!session) return;

    // Sidebar nama
    const sidebarUserName = document.getElementById('sidebar-user-name');
    const sidebarUserRole = document.getElementById('sidebar-user-role');
    const sidebarInitials = document.getElementById('sidebar-initials');
    const navbarUserName  = document.getElementById('navbar-user-name');
    const navbarInitials  = document.getElementById('navbar-initials');

    const roleLabel = {
      admin:     'Administrator',
      analis:    'Data Analis',
    };

    if (sidebarUserName) sidebarUserName.textContent = session.fullName;
    if (sidebarUserRole) sidebarUserRole.textContent = roleLabel[session.role] || session.role;
    if (sidebarInitials) sidebarInitials.textContent = session.initials;
    if (navbarUserName)  navbarUserName.textContent  = session.fullName;
    if (navbarInitials)  navbarInitials.textContent  = session.initials;

    // Sembunyikan item admin jika bukan admin, dan item biasa jika admin
    const adminItems = document.querySelectorAll('.admin-only');
    const normalNavs = document.querySelectorAll('.sidebar-nav > *:not(.admin-only)');

    if (session.role === 'admin') {
      adminItems.forEach(el => el.style.display = '');
      normalNavs.forEach(el => el.style.display = 'none');
    } else {
      adminItems.forEach(el => el.style.display = 'none');
      normalNavs.forEach(el => el.style.display = '');
    }
  }

  /* ─── Pengaturan Pengguna (CRUD) ─── */
  
  function getAllUsers() {
    return loadUsers().map(u => ({
      id:       u.id,
      username: u.username,
      fullName: u.fullName,
      role:     u.role,
      email:    u.email,
      initials: u.initials,
      password: u.password // Butuh password agar bisa diedit di modal
    }));
  }

  function addUser(user) {
    const users = loadUsers();
    // Validasi username unik
    if (users.some(u => u.username === user.username)) {
      return { success: false, message: 'Username sudah digunakan.' };
    }
    
    // Generate Initials
    const names = user.fullName.trim().split(' ');
    user.initials = names.length > 1 ? (names[0][0] + names[1][0]).toUpperCase() : user.fullName.substring(0, 2).toUpperCase();
    
    // Auto-generate ID if empty
    user.id = user.id || 'USR-' + String(users.length + 1).padStart(3, '0');
    
    users.push(user);
    saveUsers(users);
    return { success: true };
  }

  function updateUser(userId, newData) {
    const users = loadUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) return { success: false, message: 'User tidak ditemukan.' };

    // Validasi username unik (mengabaikan dirinya sendiri)
    if (newData.username && users.some(u => u.username === newData.username && u.id !== userId)) {
      return { success: false, message: 'Username sudah digunakan.' };
    }

    if (newData.fullName) {
      const names = newData.fullName.trim().split(' ');
      newData.initials = names.length > 1 ? (names[0][0] + names[1][0]).toUpperCase() : newData.fullName.substring(0, 2).toUpperCase();
    }

    users[index] = { ...users[index], ...newData };
    saveUsers(users);

    // Update sesi aktif jika mengubah profile sendiri
    const session = getSession();
    if (session && session.userId === userId) {
      session.username = users[index].username;
      session.fullName = users[index].fullName;
      session.role = users[index].role;
      session.email = users[index].email;
      session.initials = users[index].initials;
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
    return { success: true };
  }

  function deleteUser(userId) {
    let users = loadUsers();
    
    // Mencegah admin menghapus dirinya sendiri
    const session = getSession();
    if (session && session.userId === userId) {
      return { success: false, message: 'Tidak dapat menghapus akun Anda sendiri secara langsung saat digunakan.' };
    }

    const index = users.findIndex(u => u.id === userId);
    if (index === -1) return { success: false, message: 'User tidak ditemukan.' };

    users.splice(index, 1);
    saveUsers(users);
    return { success: true };
  }

  return { 
    login, logout, getSession, requireLogin, hasRole, populateUserUI, 
    getAllUsers, addUser, updateUser, deleteUser
  };

})();
