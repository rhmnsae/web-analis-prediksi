/**
 * data.js — Data Management & Seed Data
 * Data Analis Platform
 *
 * Struktur penyimpanan:
 *   smp_products    → array of product/item definitions (dynamic)
 *   smp_produksi    → array of produksi records
 *   smp_penjualan   → array of penjualan records
 *   smp_bahanbaku   → array of bahan baku records
 */

const DataManager = (() => {

  /* ─── PALETTE WARNA untuk produk baru ─── */
  const COLOR_PALETTE = [
    '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#06b6d4',
    '#ef4444', '#f97316', '#a855f7', '#14b8a6', '#84cc16',
    '#ec4899', '#6366f1', '#0ea5e9', '#d97706', '#65a30d',
  ];

  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
                  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  const KEYS = {
    products:  'smp_products',
    produksi:  'smp_produksi',
    penjualan: 'smp_penjualan',
    bahanbaku: 'smp_bahanbaku',
    seeded:    'smp_seeded',
  };

  /* ─── SEED PRODUCTS (default, bisa diubah user) ─── */
  const SEED_PRODUCTS = [
    { id: 'PROD-001', name: 'T-Shirt',  color: '#3b82f6', harga: 85000,  unit: 'pcs' },
    { id: 'PROD-002', name: 'Kemeja',   color: '#10b981', harga: 120000, unit: 'pcs' },
    { id: 'PROD-003', name: 'Celana',   color: '#8b5cf6', harga: 145000, unit: 'pcs' },
    { id: 'PROD-004', name: 'Sweater',  color: '#f59e0b', harga: 160000, unit: 'pcs' },
    { id: 'PROD-005', name: 'Jersey',   color: '#06b6d4', harga: 110000, unit: 'pcs' },
  ];

  /* ─── SEED DATA — Produksi (unit/bulan, Jan-Des 2024) ─── */
  const SEED_PRODUKSI = [
    // T-Shirt
    { id:'P-001', tanggal:'2024-01-31', produk:'T-Shirt', jumlah:1380, target:1400, satuan:'pcs', keterangan:'Produksi reguler' },
    { id:'P-002', tanggal:'2024-02-29', produk:'T-Shirt', jumlah:1250, target:1300, satuan:'pcs', keterangan:'Produksi reguler' },
    { id:'P-003', tanggal:'2024-03-31', produk:'T-Shirt', jumlah:1520, target:1500, satuan:'pcs', keterangan:'Produksi meningkat' },
    { id:'P-004', tanggal:'2024-04-30', produk:'T-Shirt', jumlah:1610, target:1600, satuan:'pcs', keterangan:'Permintaan meningkat' },
    { id:'P-005', tanggal:'2024-05-31', produk:'T-Shirt', jumlah:1740, target:1700, satuan:'pcs', keterangan:'Menjelang lebaran' },
    { id:'P-006', tanggal:'2024-06-30', produk:'T-Shirt', jumlah:1890, target:1800, satuan:'pcs', keterangan:'Peak season' },
    { id:'P-007', tanggal:'2024-07-31', produk:'T-Shirt', jumlah:1650, target:1700, satuan:'pcs', keterangan:'Post peak' },
    { id:'P-008', tanggal:'2024-08-31', produk:'T-Shirt', jumlah:1420, target:1400, satuan:'pcs', keterangan:'Normal' },
    { id:'P-009', tanggal:'2024-09-30', produk:'T-Shirt', jumlah:1480, target:1500, satuan:'pcs', keterangan:'Normal' },
    { id:'P-010', tanggal:'2024-10-31', produk:'T-Shirt', jumlah:1560, target:1550, satuan:'pcs', keterangan:'Meningkat' },
    { id:'P-011', tanggal:'2024-11-30', produk:'T-Shirt', jumlah:1720, target:1700, satuan:'pcs', keterangan:'Pre-year end' },
    { id:'P-012', tanggal:'2024-12-31', produk:'T-Shirt', jumlah:1950, target:2000, satuan:'pcs', keterangan:'Year-end promo' },
    // Kemeja
    { id:'P-013', tanggal:'2024-01-31', produk:'Kemeja', jumlah:840,  target:850, satuan:'pcs', keterangan:'Produksi reguler' },
    { id:'P-014', tanggal:'2024-02-29', produk:'Kemeja', jumlah:760,  target:800, satuan:'pcs', keterangan:'Produksi reguler' },
    { id:'P-015', tanggal:'2024-03-31', produk:'Kemeja', jumlah:910,  target:900, satuan:'pcs', keterangan:'Meningkat' },
    { id:'P-016', tanggal:'2024-04-30', produk:'Kemeja', jumlah:980,  target:950, satuan:'pcs', keterangan:'Permintaan bagus' },
    { id:'P-017', tanggal:'2024-05-31', produk:'Kemeja', jumlah:1050, target:1000, satuan:'pcs', keterangan:'Pra lebaran' },
    { id:'P-018', tanggal:'2024-06-30', produk:'Kemeja', jumlah:1130, target:1100, satuan:'pcs', keterangan:'Peak' },
    { id:'P-019', tanggal:'2024-07-31', produk:'Kemeja', jumlah:920,  target:950, satuan:'pcs', keterangan:'Normal' },
    { id:'P-020', tanggal:'2024-08-31', produk:'Kemeja', jumlah:840,  target:850, satuan:'pcs', keterangan:'Normal' },
    { id:'P-021', tanggal:'2024-09-30', produk:'Kemeja', jumlah:890,  target:900, satuan:'pcs', keterangan:'Normal' },
    { id:'P-022', tanggal:'2024-10-31', produk:'Kemeja', jumlah:940,  target:950, satuan:'pcs', keterangan:'Meningkat' },
    { id:'P-023', tanggal:'2024-11-30', produk:'Kemeja', jumlah:1020, target:1000, satuan:'pcs', keterangan:'Pre year-end' },
    { id:'P-024', tanggal:'2024-12-31', produk:'Kemeja', jumlah:1150, target:1200, satuan:'pcs', keterangan:'Year-end' },
    // Celana
    { id:'P-025', tanggal:'2024-01-31', produk:'Celana', jumlah:620,  target:650, satuan:'pcs', keterangan:'Produksi reguler' },
    { id:'P-026', tanggal:'2024-02-29', produk:'Celana', jumlah:580,  target:600, satuan:'pcs', keterangan:'Produksi reguler' },
    { id:'P-027', tanggal:'2024-03-31', produk:'Celana', jumlah:670,  target:650, satuan:'pcs', keterangan:'Normal' },
    { id:'P-028', tanggal:'2024-04-30', produk:'Celana', jumlah:710,  target:700, satuan:'pcs', keterangan:'Meningkat' },
    { id:'P-029', tanggal:'2024-05-31', produk:'Celana', jumlah:760,  target:750, satuan:'pcs', keterangan:'Bagus' },
    { id:'P-030', tanggal:'2024-06-30', produk:'Celana', jumlah:820,  target:800, satuan:'pcs', keterangan:'Peak' },
    { id:'P-031', tanggal:'2024-07-31', produk:'Celana', jumlah:690,  target:700, satuan:'pcs', keterangan:'Normal' },
    { id:'P-032', tanggal:'2024-08-31', produk:'Celana', jumlah:640,  target:650, satuan:'pcs', keterangan:'Normal' },
    { id:'P-033', tanggal:'2024-09-30', produk:'Celana', jumlah:660,  target:680, satuan:'pcs', keterangan:'Normal' },
    { id:'P-034', tanggal:'2024-10-31', produk:'Celana', jumlah:700,  target:700, satuan:'pcs', keterangan:'Stabil' },
    { id:'P-035', tanggal:'2024-11-30', produk:'Celana', jumlah:750,  target:750, satuan:'pcs', keterangan:'Meningkat' },
    { id:'P-036', tanggal:'2024-12-31', produk:'Celana', jumlah:830,  target:850, satuan:'pcs', keterangan:'Year-end' },
    // Sweater
    { id:'P-037', tanggal:'2024-01-31', produk:'Sweater', jumlah:480, target:450, satuan:'pcs', keterangan:'Musim hujan' },
    { id:'P-038', tanggal:'2024-02-29', produk:'Sweater', jumlah:510, target:500, satuan:'pcs', keterangan:'Musim hujan' },
    { id:'P-039', tanggal:'2024-03-31', produk:'Sweater', jumlah:390, target:400, satuan:'pcs', keterangan:'Normal' },
    { id:'P-040', tanggal:'2024-04-30', produk:'Sweater', jumlah:310, target:350, satuan:'pcs', keterangan:'Musim panas' },
    { id:'P-041', tanggal:'2024-05-31', produk:'Sweater', jumlah:260, target:300, satuan:'pcs', keterangan:'Rendah' },
    { id:'P-042', tanggal:'2024-06-30', produk:'Sweater', jumlah:220, target:250, satuan:'pcs', keterangan:'Terendah' },
    { id:'P-043', tanggal:'2024-07-31', produk:'Sweater', jumlah:290, target:300, satuan:'pcs', keterangan:'Mulai naik' },
    { id:'P-044', tanggal:'2024-08-31', produk:'Sweater', jumlah:350, target:350, satuan:'pcs', keterangan:'Normal' },
    { id:'P-045', tanggal:'2024-09-30', produk:'Sweater', jumlah:410, target:400, satuan:'pcs', keterangan:'Musim hujan' },
    { id:'P-046', tanggal:'2024-10-31', produk:'Sweater', jumlah:460, target:450, satuan:'pcs', keterangan:'Meningkat' },
    { id:'P-047', tanggal:'2024-11-30', produk:'Sweater', jumlah:520, target:500, satuan:'pcs', keterangan:'Musim hujan' },
    { id:'P-048', tanggal:'2024-12-31', produk:'Sweater', jumlah:580, target:560, satuan:'pcs', keterangan:'Peak musim dingin' },
    // Jersey
    { id:'P-049', tanggal:'2024-01-31', produk:'Jersey', jumlah:340, target:350, satuan:'pcs', keterangan:'Normal' },
    { id:'P-050', tanggal:'2024-02-29', produk:'Jersey', jumlah:310, target:320, satuan:'pcs', keterangan:'Normal' },
    { id:'P-051', tanggal:'2024-03-31', produk:'Jersey', jumlah:380, target:380, satuan:'pcs', keterangan:'Normal' },
    { id:'P-052', tanggal:'2024-04-30', produk:'Jersey', jumlah:420, target:400, satuan:'pcs', keterangan:'Kompetisi olahraga' },
    { id:'P-053', tanggal:'2024-05-31', produk:'Jersey', jumlah:460, target:450, satuan:'pcs', keterangan:'Musim kompetisi' },
    { id:'P-054', tanggal:'2024-06-30', produk:'Jersey', jumlah:500, target:480, satuan:'pcs', keterangan:'Puncak kompetisi' },
    { id:'P-055', tanggal:'2024-07-31', produk:'Jersey', jumlah:470, target:460, satuan:'pcs', keterangan:'Masih bagus' },
    { id:'P-056', tanggal:'2024-08-31', produk:'Jersey', jumlah:410, target:420, satuan:'pcs', keterangan:'Normal' },
    { id:'P-057', tanggal:'2024-09-30', produk:'Jersey', jumlah:390, target:400, satuan:'pcs', keterangan:'Normal' },
    { id:'P-058', tanggal:'2024-10-31', produk:'Jersey', jumlah:430, target:430, satuan:'pcs', keterangan:'Stabil' },
    { id:'P-059', tanggal:'2024-11-30', produk:'Jersey', jumlah:450, target:450, satuan:'pcs', keterangan:'Stabil' },
    { id:'P-060', tanggal:'2024-12-31', produk:'Jersey', jumlah:490, target:500, satuan:'pcs', keterangan:'Year-end order' },
    // DATA 2026 (Jan–Apr, data berjalan)
    { id:'P-061', tanggal:'2026-01-31', produk:'T-Shirt', jumlah:1480, target:1500, satuan:'pcs', keterangan:'Awal tahun 2026' },
    { id:'P-062', tanggal:'2026-02-28', produk:'T-Shirt', jumlah:1350, target:1400, satuan:'pcs', keterangan:'Normal Feb 2026' },
    { id:'P-063', tanggal:'2026-03-31', produk:'T-Shirt', jumlah:1640, target:1600, satuan:'pcs', keterangan:'Persiapan Ramadan' },
    { id:'P-064', tanggal:'2026-04-20', produk:'T-Shirt', jumlah:1820, target:1800, satuan:'pcs', keterangan:'Menjelang Lebaran' },
    { id:'P-065', tanggal:'2026-01-31', produk:'Kemeja',  jumlah:890,  target:900,  satuan:'pcs', keterangan:'Awal tahun 2026' },
    { id:'P-066', tanggal:'2026-02-28', produk:'Kemeja',  jumlah:820,  target:850,  satuan:'pcs', keterangan:'Normal Feb 2026' },
    { id:'P-067', tanggal:'2026-03-31', produk:'Kemeja',  jumlah:980,  target:950,  satuan:'pcs', keterangan:'Persiapan Ramadan' },
    { id:'P-068', tanggal:'2026-04-20', produk:'Kemeja',  jumlah:1150, target:1100, satuan:'pcs', keterangan:'Peak Lebaran' },
    { id:'P-069', tanggal:'2026-01-31', produk:'Celana',  jumlah:660,  target:680,  satuan:'pcs', keterangan:'Awal tahun 2026' },
    { id:'P-070', tanggal:'2026-02-28', produk:'Celana',  jumlah:610,  target:630,  satuan:'pcs', keterangan:'Normal Feb 2026' },
    { id:'P-071', tanggal:'2026-03-31', produk:'Celana',  jumlah:730,  target:700,  satuan:'pcs', keterangan:'Persiapan Ramadan' },
    { id:'P-072', tanggal:'2026-04-20', produk:'Celana',  jumlah:860,  target:850,  satuan:'pcs', keterangan:'Peak Lebaran' },
    { id:'P-073', tanggal:'2026-01-31', produk:'Sweater', jumlah:510,  target:500,  satuan:'pcs', keterangan:'Musim hujan 2026' },
    { id:'P-074', tanggal:'2026-02-28', produk:'Sweater', jumlah:540,  target:520,  satuan:'pcs', keterangan:'Musim hujan' },
    { id:'P-075', tanggal:'2026-03-31', produk:'Sweater', jumlah:420,  target:430,  satuan:'pcs', keterangan:'Mulai hangat' },
    { id:'P-076', tanggal:'2026-04-20', produk:'Sweater', jumlah:330,  target:360,  satuan:'pcs', keterangan:'Permintaan turun' },
    { id:'P-077', tanggal:'2026-01-31', produk:'Jersey',  jumlah:360,  target:370,  satuan:'pcs', keterangan:'Normal Jan 2026' },
    { id:'P-078', tanggal:'2026-02-28', produk:'Jersey',  jumlah:330,  target:340,  satuan:'pcs', keterangan:'Normal Feb 2026' },
    { id:'P-079', tanggal:'2026-03-31', produk:'Jersey',  jumlah:400,  target:400,  satuan:'pcs', keterangan:'Mulai naik' },
    { id:'P-080', tanggal:'2026-04-20', produk:'Jersey',  jumlah:440,  target:430,  satuan:'pcs', keterangan:'Pra kompetisi' },
  ];

  /* ─── SEED DATA — Penjualan (auto-generate dari produksi) ─── */
  const SEED_PENJUALAN = SEED_PRODUKSI.map((p, i) => ({
    id:         'S-' + String(i + 1).padStart(3, '0'),
    tanggal:    p.tanggal,
    produk:     p.produk,
    jumlah:     Math.floor(p.jumlah * (0.88 + Math.random() * 0.1)),
    hargaSatuan: getHargaSatuanFromSeed(p.produk),
    satuan:     'pcs',
    keterangan: 'Penjualan ' + p.produk,
  }));

  function getHargaSatuanFromSeed(nama) {
    const found = SEED_PRODUCTS.find(p => p.name === nama);
    return found ? found.harga : 100000;
  }

  /* ─── SEED DATA — Bahan Baku ─── */
  const SEED_BAHANBAKU = [
    { id:'BB-001', tanggal:'2024-01-05', material:'Kain Cotton',   masuk:5000, keluar:3800, stok:12600, satuan:'meter', supplier:'PT Textile Jaya' },
    { id:'BB-002', tanggal:'2024-01-05', material:'Benang Jahit',  masuk:200,  keluar:155,  stok:480,   satuan:'rol',   supplier:'CV Benang Mas' },
    { id:'BB-003', tanggal:'2024-01-05', material:'Kancing',       masuk:5000, keluar:3200, stok:9800,  satuan:'lusin', supplier:'UD Aksesoris Jaya' },
    { id:'BB-004', tanggal:'2024-02-05', material:'Kain Cotton',   masuk:4500, keluar:3600, stok:13500, satuan:'meter', supplier:'PT Textile Jaya' },
    { id:'BB-005', tanggal:'2024-02-05', material:'Kain Polyester', masuk:3000, keluar:2400, stok:7200, satuan:'meter', supplier:'PT Poly Textindo' },
    { id:'BB-006', tanggal:'2024-03-05', material:'Kain Cotton',   masuk:5500, keluar:4100, stok:14900, satuan:'meter', supplier:'PT Textile Jaya' },
    { id:'BB-007', tanggal:'2024-03-05', material:'Zipper',        masuk:1000, keluar:820,  stok:2350,  satuan:'pcs',   supplier:'PT Zipper Nusantara' },
    { id:'BB-008', tanggal:'2024-04-05', material:'Kain Cotton',   masuk:6000, keluar:4500, stok:16400, satuan:'meter', supplier:'PT Textile Jaya' },
    { id:'BB-009', tanggal:'2024-05-05', material:'Kain Cotton',   masuk:7000, keluar:5300, stok:18100, satuan:'meter', supplier:'PT Textile Jaya' },
    { id:'BB-010', tanggal:'2024-06-05', material:'Kain Fleece',   masuk:4000, keluar:2800, stok:8400,  satuan:'meter', supplier:'CV Fleece Indah' },

    // DATA 2026 (Jan–Apr)
    { id:'BB-011', tanggal:'2026-01-05', material:'Kain Cotton',   masuk:6500, keluar:4800, stok:19800, satuan:'meter', supplier:'PT Textile Jaya' },
    { id:'BB-012', tanggal:'2026-01-08', material:'Benang Jahit',  masuk:300,  keluar:210,  stok:570,   satuan:'rol',   supplier:'CV Benang Mas' },
    { id:'BB-013', tanggal:'2026-01-10', material:'Kancing',       masuk:6000, keluar:4500, stok:11300, satuan:'lusin', supplier:'UD Aksesoris Jaya' },
    { id:'BB-014', tanggal:'2026-01-15', material:'Zipper',        masuk:1200, keluar:950,  stok:2600,  satuan:'pcs',   supplier:'PT Zipper Nusantara' },
    { id:'BB-015', tanggal:'2026-02-05', material:'Kain Cotton',   masuk:5200, keluar:4100, stok:20900, satuan:'meter', supplier:'PT Textile Jaya' },
    { id:'BB-016', tanggal:'2026-02-12', material:'Kain Polyester', masuk:3500, keluar:2900, stok:7800, satuan:'meter', supplier:'PT Poly Textindo' },
    { id:'BB-017', tanggal:'2026-03-05', material:'Kain Cotton',   masuk:7200, keluar:5500, stok:22600, satuan:'meter', supplier:'PT Textile Jaya' },
    { id:'BB-018', tanggal:'2026-03-10', material:'Benang Jahit',  masuk:250,  keluar:200,  stok:620,   satuan:'rol',   supplier:'CV Benang Mas' },
    { id:'BB-019', tanggal:'2026-03-20', material:'Kancing',       masuk:5500, keluar:4800, stok:12000, satuan:'lusin', supplier:'UD Aksesoris Jaya' },
    { id:'BB-020', tanggal:'2026-04-05', material:'Kain Cotton',   masuk:8000, keluar:6200, stok:24400, satuan:'meter', supplier:'PT Textile Jaya' },
    { id:'BB-021', tanggal:'2026-04-10', material:'Kain Fleece',   masuk:4500, keluar:3100, stok:9800,  satuan:'meter', supplier:'CV Fleece Indah' },
    { id:'BB-022', tanggal:'2026-04-15', material:'Zipper',        masuk:1500, keluar:1100, stok:3000,  satuan:'pcs',   supplier:'PT Zipper Nusantara' },
  ];

  /* ─── Load/Save ke localStorage ─── */
  function loadData(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }

  function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /* ─── Inisialisasi seed data ─── */
  function init() {
    const SEED_VERSION = 'v4-products-dynamic';
    if (localStorage.getItem(KEYS.seeded) !== SEED_VERSION) {
      saveData(KEYS.products,  SEED_PRODUCTS);
      saveData(KEYS.produksi,  SEED_PRODUKSI);
      saveData(KEYS.penjualan, SEED_PENJUALAN);
      saveData(KEYS.bahanbaku, SEED_BAHANBAKU);
      localStorage.setItem(KEYS.seeded, SEED_VERSION);
    } else {
      // Patch injection for new 2026 Bahan Baku data without resetting the entire DB
      const currentBB = loadData(KEYS.bahanbaku);
      if (currentBB.length < SEED_BAHANBAKU.length) {
         saveData(KEYS.bahanbaku, SEED_BAHANBAKU);
      }
    }
  }

  /* =====================================================
     CRUD PRODUCTS (Dynamic — stored in localStorage)
     ===================================================== */

  /** Ambil semua produk dari localStorage */
  function getProducts() {
    const data = loadData(KEYS.products);
    if (!data || !data.length) return SEED_PRODUCTS;
    return data;
  }

  /** Hanya nama-nama produk */
  function getProductNames() {
    return getProducts().map(p => p.name);
  }

  /** Map nama → warna */
  function getProductColors() {
    const map = {};
    getProducts().forEach(p => { map[p.name] = p.color; });
    return map;
  }

  /** Harga satuan untuk nama produk tertentu */
  function getHargaSatuan(nama) {
    const found = getProducts().find(p => p.name === nama);
    return found ? found.harga : 0;
  }

  /** Satuan untuk nama produk tertentu */
  function getProductUnit(nama) {
    const found = getProducts().find(p => p.name === nama);
    return found ? found.unit : 'pcs';
  }

  /** Tambah produk baru */
  function addProduct({ name, color, harga = 0, unit = 'pcs' }) {
    const products = getProducts();
    if (products.find(p => p.name.toLowerCase() === name.toLowerCase())) {
      return { error: 'Produk dengan nama ini sudah ada.' };
    }
    // Pilih warna otomatis jika tidak disediakan
    const usedColors = products.map(p => p.color);
    const autoColor = color || COLOR_PALETTE.find(c => !usedColors.includes(c)) || COLOR_PALETTE[products.length % COLOR_PALETTE.length];
    const newProd = {
      id:    'PROD-' + String(Date.now()).slice(-6),
      name:  name.trim(),
      color: autoColor,
      harga: parseInt(harga) || 0,
      unit:  unit || 'pcs',
    };
    products.push(newProd);
    saveData(KEYS.products, products);
    return newProd;
  }

  /** Update produk yang sudah ada, termasuk cascade update ke riwayat if necessary */
  function updateProduct(id, updates) {
    const products = getProducts();
    const oldProd = products.find(p => p.id === id);
    if (!oldProd) return;

    // Simpan data lama untuk pencarian cascade
    const oldName = oldProd.name;

    // Update data produk ke versi baru
    const updatedProducts = products.map(p =>
      p.id === id ? { ...p, ...updates } : p
    );
    saveData(KEYS.products, updatedProducts);

    const newProd = updatedProducts.find(p => p.id === id);

    // CASCADE UPDATE: update semua histori Produksi & Penjualan jika harga/nama/satuan berubah
    if (oldName !== newProd.name || oldProd.harga !== newProd.harga || oldProd.unit !== newProd.unit) {
      
      // Update data Produksi (hanya nama dan satuan)
      const dataProduksi = loadData(KEYS.produksi);
      const updatedProduksi = dataProduksi.map(r => {
        if (r.produk === oldName) {
          return { ...r, produk: newProd.name, satuan: newProd.unit };
        }
        return r;
      });
      saveData(KEYS.produksi, updatedProduksi);

      // Update data Penjualan (nama, satuan, DAN harga)
      const dataPenjualan = loadData(KEYS.penjualan);
      const updatedPenjualan = dataPenjualan.map(r => {
        if (r.produk === oldName) {
          return { ...r, produk: newProd.name, satuan: newProd.unit, hargaSatuan: newProd.harga };
        }
        return r;
      });
      saveData(KEYS.penjualan, updatedPenjualan);
    }
  }

  /** Hapus produk */
  function deleteProduct(id) {
    const products = getProducts().filter(p => p.id !== id);
    saveData(KEYS.products, products);
  }

  /* ─── CRUD Produksi ─── */
  function getProduksi() { return loadData(KEYS.produksi); }

  function addProduksi(record) {
    const data = getProduksi();
    record.id = 'P-' + String(data.length + 1).padStart(3, '0');
    data.unshift(record);
    saveData(KEYS.produksi, data);
    return record;
  }

  function deleteProduksi(id) {
    saveData(KEYS.produksi, getProduksi().filter(r => r.id !== id));
  }

  function updateProduksi(id, updates) {
    saveData(KEYS.produksi, getProduksi().map(r => r.id === id ? { ...r, ...updates } : r));
  }

  /* ─── CRUD Penjualan ─── */
  function getPenjualan() { return loadData(KEYS.penjualan); }

  function addPenjualan(record) {
    const data = getPenjualan();
    record.id = 'S-' + String(data.length + 1).padStart(3, '0');
    data.unshift(record);
    saveData(KEYS.penjualan, data);
    return record;
  }

  function deletePenjualan(id) {
    saveData(KEYS.penjualan, getPenjualan().filter(r => r.id !== id));
  }

  function updatePenjualan(id, updates) {
    saveData(KEYS.penjualan, getPenjualan().map(r => r.id === id ? { ...r, ...updates } : r));
  }

  /* ─── CRUD Bahan Baku ─── */
  function getBahanBaku() { return loadData(KEYS.bahanbaku); }

  function addBahanBaku(record) {
    const data = getBahanBaku();
    record.id = 'BB-' + String(data.length + 1).padStart(3, '0');
    data.unshift(record);
    saveData(KEYS.bahanbaku, data);
    return record;
  }

  function deleteBahanBaku(id) {
    saveData(KEYS.bahanbaku, getBahanBaku().filter(r => r.id !== id));
  }

  function updateBahanBaku(id, updates) {
    saveData(KEYS.bahanbaku, getBahanBaku().map(r => r.id === id ? { ...r, ...updates } : r));
  }

  /* ─── Aggregate helpers ─── */

  /** Ringkasan produksi per bulan untuk tahun tertentu */
  function getProduksiByMonth(tahun = 2024) {
    const data    = getProduksi();
    const PRODS   = getProductNames();
    const result  = {};
    MONTHS.forEach(m => { result[m] = {}; PRODS.forEach(p => result[m][p] = 0); });
    data.forEach(r => {
      const d = new Date(r.tanggal);
      if (d.getFullYear() === tahun) {
        const month = MONTHS[d.getMonth()];
        if (result[month] !== undefined) {
          result[month][r.produk] = (result[month][r.produk] || 0) + r.jumlah;
        }
      }
    });
    return result;
  }

  /** Total produksi per produk untuk tahun tertentu */
  function getTotalProduksiPerProduk(tahun = 2024) {
    const byMonth = getProduksiByMonth(tahun);
    const PRODS   = getProductNames();
    const total   = {};
    PRODS.forEach(p => { total[p] = 0; });
    Object.values(byMonth).forEach(monthData => {
      Object.keys(monthData).forEach(p => { total[p] = (total[p] || 0) + (monthData[p] || 0); });
    });
    return total;
  }

  /** Total penjualan bulan tertentu */
  function getTotalPenjualanBulanIni() {
    const now = new Date();
    return getPenjualan().filter(r => {
      const d = new Date(r.tanggal);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    }).reduce((sum, r) => sum + (r.jumlah * r.hargaSatuan), 0);
  }

  /** Efisiensi produksi rata-rata */
  function getEfisiensiProduksi() {
    const data = getProduksi();
    if (!data.length) return 0;
    const withTarget = data.filter(r => r.target > 0);
    if (!withTarget.length) return 0;
    const rates = withTarget.map(r => Math.min((r.jumlah / r.target) * 100, 100));
    return rates.reduce((a, b) => a + b, 0) / rates.length;
  }

  /** Array penjualan per bulan (jumlah unit) untuk satu produk */
  function getPenjualanBulanan(produk, tahun = 2024) {
    const data = getPenjualan().filter(r => {
      const d = new Date(r.tanggal);
      return (!produk || r.produk === produk) && d.getFullYear() === tahun;
    });
    const monthly = Array(12).fill(0);
    data.forEach(r => { monthly[new Date(r.tanggal).getMonth()] += r.jumlah; });
    return monthly;
  }

  /** Array produksi per bulan untuk satu produk */
  function getProduksiBulanan(produk, tahun = 2024) {
    const data = getProduksi().filter(r => {
      const d = new Date(r.tanggal);
      return (!produk || r.produk === produk) && d.getFullYear() === tahun;
    });
    const monthly = Array(12).fill(0);
    data.forEach(r => { monthly[new Date(r.tanggal).getMonth()] += r.jumlah; });
    return monthly;
  }

  /** Reset semua data ke seed awal */
  function reset() {
    localStorage.removeItem(KEYS.seeded);
    init();
  }

  /** Pilih warna berikutnya yang belum dipakai */
  function getNextColor() {
    const used = getProducts().map(p => p.color);
    return COLOR_PALETTE.find(c => !used.includes(c)) || COLOR_PALETTE[getProducts().length % COLOR_PALETTE.length];
  }

  /* ─── Format helpers ─── */
  function formatNumber(n) {
    return new Intl.NumberFormat('id-ID').format(Math.round(n));
  }
  function formatCurrency(n) {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(n));
  }
  function formatDate(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  /* ─── Backward-compat helpers (PRODUCTS & PRODUCT_COLORS sebagai getter) ─── */
  // Diakses via DataManager.PRODUCTS → tetap kompatibel dengan kode lama yang pakai DataManager.PRODUCTS
  const proxyHandler = {
    get(target, prop) {
      if (prop === 'PRODUCTS')       return getProductNames();
      if (prop === 'PRODUCT_COLORS') return getProductColors();
      return target[prop];
    }
  };

  const publicAPI = {
    /* Constants (dynamic) */
    get PRODUCTS()       { return getProductNames(); },
    get PRODUCT_COLORS() { return getProductColors(); },
    MONTHS,
    COLOR_PALETTE,
    /* Init */
    init, reset,
    /* Products CRUD */
    getProducts, getProductNames, getProductColors, getNextColor,
    getProductUnit, addProduct, updateProduct, deleteProduct,
    /* Produksi CRUD */
    getProduksi, addProduksi, deleteProduksi, updateProduksi,
    /* Penjualan CRUD */
    getPenjualan, addPenjualan, deletePenjualan, updatePenjualan,
    /* Bahan Baku CRUD */
    getBahanBaku, addBahanBaku, deleteBahanBaku, updateBahanBaku,
    /* Aggregates */
    getProduksiByMonth, getTotalProduksiPerProduk,
    getTotalPenjualanBulanIni, getEfisiensiProduksi,
    getPenjualanBulanan, getProduksiBulanan,
    /* Helpers */
    getHargaSatuan, formatNumber, formatCurrency, formatDate,
  };

  return publicAPI;

})();
