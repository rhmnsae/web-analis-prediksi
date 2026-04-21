/**
 * explain.js — Sistem penjelasan grafik & statistik
 * Menambahkan tombol "?" ke setiap card dengan data-explain,
 * hover = tooltip singkat, klik = modal penjelasan lengkap.
 */

const ExplainData = {

  /* ===================== DASHBOARD ===================== */
  'total-produksi': {
    title: 'Total Produksi',
    singkat: 'Jumlah total unit barang yang berhasil diproduksi dalam periode yang dipilih.',
    detail: `
      <p><strong>Apa artinya?</strong><br>
      Angka ini menunjukkan berapa banyak unit barang (kaos, kemeja, celana, dll.) yang berhasil selesai diproduksi dalam kurun waktu yang dipilih di filter tanggal.</p>
      <p><strong>Cara membacanya:</strong><br>
      Semakin besar angkanya, semakin banyak barang yang diproduksi. Bandingkan dengan periode sebelumnya untuk melihat apakah produksi meningkat atau turun.</p>
      <p><strong>Yang perlu diperhatikan:</strong></p>
      <ul>
        <li>Naik terus berarti produksi makin lancar</li>
        <li>Turun mendadak bisa berarti ada kendala yang perlu dicek</li>
        <li>Angka ini belum termasuk produk yang gagal atau reject</li>
      </ul>
    `
  },

  'pendapatan-penjualan': {
    title: 'Pendapatan Penjualan',
    singkat: 'Total uang yang masuk dari semua penjualan dalam periode terpilih.',
    detail: `
      <p><strong>Apa artinya?</strong><br>
      Ini adalah total uang Rupiah yang didapat dari semua penjualan barang. Dihitung dari: jumlah barang terjual dikali harga satuan masing-masing produk.</p>
      <p><strong>Cara membacanya:</strong><br>
      "Jt" berarti Juta Rupiah, "M" berarti Miliar Rupiah. Misalnya "2.5 Jt" artinya Rp 2.500.000.</p>
      <p><strong>Yang perlu diperhatikan:</strong></p>
      <ul>
        <li>Naik berarti bisnis berkembang dan penjualan bagus</li>
        <li>Produksi tinggi tapi pendapatan rendah berarti banyak barang tidak terjual</li>
        <li>Sinkronkan dengan Total Produksi untuk melihat efektivitas penjualan</li>
      </ul>
    `
  },

  'efisiensi-produksi': {
    title: 'Efisiensi Produksi',
    singkat: 'Seberapa dekat hasil produksi nyata dibandingkan dengan target yang sudah ditetapkan.',
    detail: `
      <p><strong>Apa artinya?</strong><br>
      Efisiensi dihitung dari persentase pencapaian target: <em>(Produksi Aktual dibagi Target) dikali 100%</em>. Semakin mendekati 100%, semakin bagus.</p>
      <p><strong>Cara membacanya:</strong><br>
      Bar biru di bawah angka menunjukkan secara visual seberapa penuh target tercapai.</p>
      <p><strong>Skala penilaian:</strong></p>
      <ul>
        <li>90 hingga 100 persen: Sangat Baik, target hampir atau sudah tercapai</li>
        <li>70 hingga 89 persen: Cukup Baik, perlu sedikit dorongan</li>
        <li>50 hingga 69 persen: Perlu Perhatian, ada hambatan di proses</li>
        <li>Di bawah 50 persen: Kritis, perlu evaluasi segera</li>
      </ul>
    `
  },

  'tren-produksi': {
    title: 'Grafik Tren Produksi Bulanan',
    singkat: 'Grafik garis yang menunjukkan naik-turunnya jumlah produksi setiap bulan.',
    detail: `
      <p><strong>Apa yang ditampilkan?</strong><br>
      Setiap garis mewakili satu jenis produk (T-Shirt, Kemeja, dll.). Sumbu horizontal (X) adalah bulan, sumbu vertikal (Y) adalah jumlah unit yang diproduksi.</p>
      <p><strong>Cara membacanya:</strong><br>
      Ikuti arah garis dari kiri ke kanan. Garis naik berarti produksi meningkat, garis turun berarti produksi berkurang di bulan itu.</p>
      <p><strong>Yang perlu diperhatikan:</strong></p>
      <ul>
        <li>Cari bulan dengan puncak tertinggi — itu waktu produksi paling sibuk</li>
        <li>Cari titik terendah — itu waktu produksi paling rendah, perlu dicek penyebabnya</li>
        <li>Filter satu produk saja untuk melihat trennya lebih jelas</li>
        <li>Arahkan kursor ke titik di grafik untuk melihat angka pastinya</li>
      </ul>
    `
  },

  'distribusi-produk': {
    title: 'Distribusi Produk (Donut Chart)',
    singkat: 'Diagram lingkaran yang menunjukkan pembagian porsi produksi tiap jenis produk.',
    detail: `
      <p><strong>Apa yang ditampilkan?</strong><br>
      Setiap potongan warna mewakili satu produk. Semakin besar potongannya, semakin besar kontribusi produk itu terhadap total produksi keseluruhan.</p>
      <p><strong>Cara membacanya:</strong><br>
      Bayangkan ini seperti kue yang dibagi-bagi. Produk dengan irisan terbesar adalah produk yang paling banyak diproduksi.</p>
      <p><strong>Yang perlu diperhatikan:</strong></p>
      <ul>
        <li>Distribusi merata berarti semua produk diproduksi secara seimbang</li>
        <li>Satu produk sangat dominan berarti ada risiko ketergantungan pada satu jenis barang</li>
        <li>Klik atau arahkan kursor ke tiap irisan untuk melihat persentase dan angkanya</li>
      </ul>
    `
  },

  'efisiensi-bar': {
    title: 'Efisiensi per Produk',
    singkat: 'Bar kemajuan yang menunjukkan seberapa dekat setiap produk mencapai targetnya.',
    detail: `
      <p><strong>Apa yang ditampilkan?</strong><br>
      Setiap baris adalah satu jenis produk. Bar berwarna menunjukkan persentase pencapaian — bar penuh berarti 100% target tercapai.</p>
      <p><strong>Cara membacanya:</strong><br>
      Angka persentase di kanan adalah nilainya. Di bawah bar tertulis "realisasi / target pcs" — misalnya "1.200 / 1.500 pcs" berarti dari target 1.500, yang tercapai baru 1.200.</p>
      <p><strong>Yang perlu diperhatikan:</strong></p>
      <ul>
        <li>Bar hampir penuh (di atas 90%) berarti produksi produk ini bagus</li>
        <li>Bar kurang dari setengah (di bawah 50%) berarti produksi tertinggal jauh dari target</li>
        <li>Bandingkan antar produk untuk memutuskan mana yang perlu diprioritaskan</li>
      </ul>
    `
  },

  'rekap-produk': {
    title: 'Rekap Total per Produk',
    singkat: 'Tabel ringkasan yang membandingkan total produksi dan penjualan untuk setiap produk.',
    detail: `
      <p><strong>Apa yang ditampilkan?</strong><br>
      Tabel ini merangkum data tiap produk dalam satu baris — berapa unit diproduksi, berapa terjual, dan rasio penjualannya.</p>
      <p><strong>Cara membaca kolom Rasio:</strong><br>
      Rasio adalah Penjualan dibagi Produksi dikali 100%. Rasio 80% berarti dari 100 unit yang dibuat, 80 berhasil dijual.</p>
      <p><strong>Yang perlu diperhatikan:</strong></p>
      <ul>
        <li>Rasio tinggi di atas 80% berarti produk laku keras, supply dan demand seimbang</li>
        <li>Rasio rendah di bawah 50% berarti banyak produk menumpuk di gudang dan tidak terjual</li>
        <li>Produk dengan rasio rendah perlu strategi penjualan atau promosi yang lebih aktif</li>
      </ul>
    `
  },

  'entri-terbaru': {
    title: 'Entri Data Terbaru',
    singkat: '10 catatan produksi terakhir yang dimasukkan ke dalam sistem.',
    detail: `
      <p><strong>Apa yang ditampilkan?</strong><br>
      Daftar 10 data produksi terbaru berurutan dari yang paling baru. Berisi tanggal, produk, jumlah aktual, target, dan status.</p>
      <p><strong>Cara membaca kolom Status:</strong><br>
      Status dihitung dari perbandingan jumlah aktual dengan target:</p>
      <ul>
        <li><strong>Tercapai</strong> berarti produksi memenuhi atau melampaui target</li>
        <li><strong>Kurang</strong> berarti produksi masih di bawah target</li>
      </ul>
      <p><strong>Gunanya:</strong> Untuk cepat mengecek apakah data terbaru sudah benar dimasukkan, dan melihat kondisi produksi harian secara ringkas.</p>
    `
  },

  /* ===================== STATISTIK ===================== */
  'stat-ringkasan': {
    title: 'Kartu Ringkasan Statistik',
    singkat: 'Angka-angka kunci yang meringkas keseluruhan data produksi secara matematis.',
    detail: `
      <p><strong>Penjelasan setiap angka:</strong></p>
      <ul>
        <li><strong>Jumlah Data (N)</strong> — Berapa banyak transaksi atau catatan produksi yang ada</li>
        <li><strong>Total</strong> — Gabungan semua unit yang diproduksi</li>
        <li><strong>Rata-rata (Mean)</strong> — Nilai tengah jika semua data dijumlah lalu dibagi jumlahnya. Ini ukuran produksi normal sehari-hari</li>
        <li><strong>Median</strong> — Nilai yang tepat di tengah jika data diurutkan. Lebih tahan terhadap data yang terlalu besar atau kecil (outlier)</li>
        <li><strong>Std. Deviasi</strong> — Seberapa fluktuatif data berubah-ubah. Kecil berarti stabil, besar berarti tidak konsisten</li>
        <li><strong>Min / Maks</strong> — Produksi terendah dan tertinggi yang pernah terjadi</li>
        <li><strong>Range</strong> — Selisih antara nilai tertinggi dan terendah</li>
        <li><strong>Q1 / Q3</strong> — Batas bawah (25%) dan atas (75%) dari distribusi data</li>
        <li><strong>IQR</strong> — Jarak antara Q1 dan Q3; ukuran keragaman data bagian tengah</li>
        <li><strong>Koef. Variasi</strong> — Persentase variasi relatif. Makin kecil makin stabil dan konsisten</li>
      </ul>
    `
  },

  'distribusi-frekuensi': {
    title: 'Histogram Distribusi Frekuensi',
    singkat: 'Grafik batang yang mengelompokkan data produksi berdasarkan rentang nilai.',
    detail: `
      <p><strong>Apa yang ditampilkan?</strong><br>
      Data produksi dibagi ke dalam beberapa kelompok (misalnya 0-500, 500-1000, dan seterusnya). Setiap batang menunjukkan seberapa sering nilai dalam kelompok itu muncul.</p>
      <p><strong>Cara membacanya:</strong><br>
      Batang tinggi berarti banyak data produksi yang jatuh di rentang nilai itu. Sumbu X adalah rentang nilai produksi, sumbu Y adalah berapa kali muncul.</p>
      <p><strong>Yang perlu diperhatikan:</strong></p>
      <ul>
        <li>Bentuk seperti gunung (simetris) berarti data normal dan konsisten — ini bagus</li>
        <li>Condong ke kiri berarti lebih sering produksi rendah</li>
        <li>Condong ke kanan berarti lebih sering ada lonjakan produksi tinggi</li>
        <li>Batang yang berdiri sendirian jauh dari yang lain adalah data anomali yang perlu dicek</li>
      </ul>
    `
  },

  'tren-bulanan-stat': {
    title: 'Tren Produksi Bulanan (Statistik)',
    singkat: 'Grafik garis yang memperlihatkan perubahan produksi dari bulan ke bulan.',
    detail: `
      <p><strong>Apa yang ditampilkan?</strong><br>
      Garis-garis ini menunjukkan total produksi per bulan untuk setiap produk. Setiap warna mewakili produk yang berbeda.</p>
      <p><strong>Cara membacanya:</strong><br>
      Ikuti arah garis dari bulan pertama ke bulan terakhir. Naik berarti meningkat, turun berarti berkurang, dan datar berarti stabil.</p>
      <p><strong>Yang perlu diperhatikan:</strong></p>
      <ul>
        <li>Bandingkan apakah semua produk naik bersamaan atau bergantian — ini petunjuk pola musiman</li>
        <li>Garis yang tiba-tiba anjlok bisa berarti ada masalah di bulan itu seperti bahan baku habis atau mesin rusak</li>
        <li>Arahkan kursor ke titik mana saja untuk melihat angka pastinya</li>
      </ul>
    `
  },

  'perbandingan-produk': {
    title: 'Perbandingan Total per Produk',
    singkat: 'Grafik batang yang membandingkan volume produksi total antar semua produk.',
    detail: `
      <p><strong>Apa yang ditampilkan?</strong><br>
      Setiap batang mewakili satu jenis produk. Tinggi batang menunjukkan total unit yang diproduksi selama periode yang dipilih.</p>
      <p><strong>Cara membacanya:</strong><br>
      Produk dengan batang tertinggi adalah produk yang paling banyak dibuat. Terlihat langsung siapa yang paling unggul dan siapa yang paling sedikit diproduksi.</p>
      <p><strong>Yang perlu diperhatikan:</strong></p>
      <ul>
        <li>Batang tinggi menunjukkan produk unggulan atau andalan perusahaan</li>
        <li>Batang sangat rendah perlu dievaluasi — mungkin permintaan rendah atau ada kendala produksi</li>
        <li>Bandingkan dengan data penjualan — produk yang banyak diproduksi seharusnya juga banyak terjual</li>
      </ul>
    `
  },

  'radar-performa': {
    title: 'Radar Chart — Performa Relatif Produk',
    singkat: 'Grafik jaring laba-laba yang membandingkan semua produk secara bersamaan dari berbagai sudut.',
    detail: `
      <p><strong>Apa yang ditampilkan?</strong><br>
      Ini adalah grafik berbentuk segi banyak (mirip jaring). Setiap sudut atau titik mewakili satu produk. Wilayah yang terisi warna menunjukkan area performa produk tersebut.</p>
      <p><strong>Cara membacanya:</strong><br>
      Semakin luas area yang tertutup warna, semakin tinggi performa relatifnya. Sudut yang menjorok ke luar berarti produk itu kuat di dimensi tersebut.</p>
      <p><strong>Yang perlu diperhatikan:</strong></p>
      <ul>
        <li>Area besar dan simetris berarti performa seimbang di semua produk</li>
        <li>Satu sudut menonjol jauh berarti satu produk sangat dominan sementara yang lain tertinggal</li>
        <li>Berguna untuk melihat peta kekuatan produk secara keseluruhan sekaligus</li>
      </ul>
    `
  },

  'matriks-korelasi': {
    title: 'Matriks Korelasi Pearson',
    singkat: 'Tabel yang menunjukkan seberapa kuat hubungan produksi antara dua produk berbeda.',
    detail: `
      <p><strong>Apa yang ditampilkan?</strong><br>
      Setiap kotak di tabel menunjukkan nilai korelasi antara dua produk (baris vs kolom). Nilainya antara -1 hingga +1.</p>
      <p><strong>Cara membaca nilai:</strong></p>
      <ul>
        <li><strong>Mendekati +1</strong> — Bila produksi produk A naik, produksi produk B juga cenderung naik (berjalan beriringan)</li>
        <li><strong>Mendekati -1</strong> — Bila produk A naik, produk B justru turun (mungkin bersaing dalam sumber daya)</li>
        <li><strong>Mendekati 0</strong> — Tidak ada hubungan yang jelas antara keduanya</li>
      </ul>
      <p><strong>Yang perlu diperhatikan:</strong></p>
      <ul>
        <li>Kotak diagonal (pojok ke pojok) selalu bernilai 1.00 karena itu produk dibandingkan dengan dirinya sendiri</li>
        <li>Korelasi tinggi di atas 0.7 bisa berarti produk tersebut sering diproduksi secara bersamaan</li>
      </ul>
    `
  },

  'stat-lengkap': {
    title: 'Tabel Statistik Deskriptif Lengkap',
    singkat: 'Ringkasan matematis lengkap untuk setiap produk dalam satu tabel.',
    detail: `
      <p><strong>Apa yang ditampilkan?</strong><br>
      Satu baris sama dengan satu produk. Kolom-kolomnya berisi ringkasan statistik yang sudah dihitung otomatis dari semua data di periode yang dipilih.</p>
      <p><strong>Penjelasan kolom:</strong></p>
      <ul>
        <li><strong>N</strong> — Jumlah catatan data</li>
        <li><strong>Rata-rata</strong> — Produksi rata-rata per transaksi</li>
        <li><strong>Median</strong> — Nilai tengah (lebih tahan dari data ekstrem)</li>
        <li><strong>Std Dev</strong> — Standar deviasi, menunjukkan seberapa konsisten produksinya</li>
        <li><strong>Min / Max</strong> — Produksi paling sedikit dan paling banyak</li>
        <li><strong>CV (%)</strong> — Koefisien variasi: kecil berarti konsisten, besar berarti tidak stabil</li>
        <li><strong>Skewness</strong> — Kemiringan data: angka mendekati 0 berarti distribusi seimbang</li>
      </ul>
    `
  },

  /* ===================== STATISTIK — TIAP KARTU ===================== */
  'stat-jumlah-data': {
    title: 'Jumlah Data (N)',
    singkat: 'Berapa banyak catatan produksi yang tercatat dalam periode yang dipilih.',
    detail: `
      <p><strong>Apa artinya?</strong><br>
      Ini adalah jumlah total baris data yang dianalisis. Setiap satu catatan produksi (satu transaksi input data) dihitung sebagai satu data.</p>
      <p><strong>Mengapa penting?</strong><br>
      Semakin banyak data, semakin akurat hasil analisis statistiknya. Data yang sedikit (misalnya hanya 3-5 catatan) membuat hasil seperti rata-rata dan standar deviasi kurang dapat diandalkan.</p>
    `
  },

  'stat-total': {
    title: 'Total Produksi',
    singkat: 'Gabungan semua unit barang yang diproduksi dalam seluruh periode terpilih.',
    detail: `
      <p><strong>Apa artinya?</strong><br>
      Total adalah penjumlahan dari semua catatan produksi yang masuk dalam filter yang digunakan.</p>
      <p><strong>Contoh:</strong><br>
      Jika ada 12 catatan produksi dan rata-rata masing-masing 1.000 unit, maka Total = 12.000 pcs.</p>
      <p><strong>Gunanya:</strong> Melihat kapasitas produksi keseluruhan dalam satu periode waktu.</p>
    `
  },

  'stat-rata-rata': {
    title: 'Rata-rata (Mean)',
    singkat: 'Nilai produksi rata-rata per catatan data dalam periode yang dipilih.',
    detail: `
      <p><strong>Apa artinya?</strong><br>
      Rata-rata dihitung dengan cara menjumlahkan semua data lalu dibagi total jumlah data. Ini mencerminkan angka normal produksi sehari-hari.</p>
      <p><strong>Contoh mudah:</strong><br>
      Jika dalam 3 hari produksi adalah 800, 1.000, dan 1.200 unit, maka rata-rata = (800 + 1.000 + 1.200) / 3 = 1.000 unit.</p>
      <p><strong>Perhatian:</strong> Rata-rata bisa menyesatkan jika ada satu data yang sangat besar atau sangat kecil. Bandingkan juga dengan Median untuk gambaran lebih lengkap.</p>
    `
  },

  'stat-median': {
    title: 'Median',
    singkat: 'Nilai yang tepat di tengah jika semua data produksi diurutkan dari terkecil ke terbesar.',
    detail: `
      <p><strong>Apa artinya?</strong><br>
      Median adalah nilai tengah dari sekumpulan data yang sudah diurutkan. Jika jumlah data genap, median adalah rata-rata dari dua nilai tengahnya.</p>
      <p><strong>Kapan lebih berguna dari rata-rata?</strong><br>
      Ketika ada data ekstrem (sangat tinggi atau sangat rendah), median lebih mencerminkan kondisi normal yang sesungguhnya. Jika ada lonjakan produksi besar di satu hari, rata-rata terdistorsi namun median tetap stabil.</p>
      <p><strong>Panduan simpel:</strong> Jika median jauh lebih kecil dari rata-rata, ada kemungkinan data produksi miring ke atas — ada lonjakan besar di beberapa periode.</p>
    `
  },

  'stat-stddev': {
    title: 'Standar Deviasi',
    singkat: 'Ukuran seberapa jauh data produksi menyimpang dari nilai rata-ratanya.',
    detail: `
      <p><strong>Apa artinya?</strong><br>
      Standar deviasi menunjukkan seberapa tidak konsistennya data produksi. Nilainya dalam satuan yang sama dengan data (pcs).</p>
      <p><strong>Cara membacanya:</strong><br>
      Misal rata-rata = 1.000 pcs dan Std Dev = 200 pcs, artinya produksi biasanya berada di kisaran 800 hingga 1.200 pcs.</p>
      <ul>
        <li>Std Dev kecil (mendekati 0) berarti produksi sangat konsisten dan stabil</li>
        <li>Std Dev besar berarti produksi berfluktuasi, tidak stabil</li>
      </ul>
    `
  },

  'stat-minimum': {
    title: 'Minimum',
    singkat: 'Nilai produksi paling rendah yang pernah tercatat dalam periode terpilih.',
    detail: `
      <p><strong>Apa artinya?</strong><br>
      Ini adalah catatan produksi terkecil — hari atau periode dengan produksi paling sedikit.</p>
      <p><strong>Gunanya:</strong></p>
      <ul>
        <li>Mendeteksi periode dengan kinerja sangat rendah</li>
        <li>Mengidentifikasi kemungkinan gangguan produksi seperti mesin rusak atau bahan baku habis</li>
        <li>Sebagai patokan kapasitas produksi minimum yang bisa diantisipasi</li>
      </ul>
    `
  },

  'stat-maksimum': {
    title: 'Maksimum',
    singkat: 'Nilai produksi tertinggi yang pernah tercatat dalam periode terpilih.',
    detail: `
      <p><strong>Apa artinya?</strong><br>
      Ini adalah catatan produksi terbesar yang pernah terjadi — hari atau periode dengan produksi paling banyak.</p>
      <p><strong>Gunanya:</strong></p>
      <ul>
        <li>Mengetahui batas kapasitas maksimal yang pernah dicapai</li>
        <li>Digunakan sebagai target produksi yang realistis</li>
        <li>Jika nilainya sangat jauh dari rata-rata, itu bisa momen luar biasa seperti lembur atau penambahan mesin</li>
      </ul>
    `
  },

  'stat-range': {
    title: 'Range',
    singkat: 'Selisih antara nilai produksi tertinggi dan terendah dalam satu periode.',
    detail: `
      <p><strong>Apa artinya?</strong><br>
      Range = Maksimum dikurangi Minimum. Ini adalah rentang total dari data produksi.</p>
      <p><strong>Contoh:</strong><br>
      Jika produksi tertinggi 2.000 pcs dan terendah 500 pcs, maka Range = 1.500 pcs.</p>
      <ul>
        <li>Range kecil berarti produksi relatif stabil dan tidak banyak naik turun</li>
        <li>Range besar berarti produksi sangat bervariasi — ada saat sangat tinggi dan sangat rendah</li>
      </ul>
    `
  },

  'stat-q1': {
    title: 'Q1 — Kuartil Pertama (25%)',
    singkat: '25% data produksi berada di bawah nilai ini. Batas bawah distribusi data.',
    detail: `
      <p><strong>Apa artinya?</strong><br>
      Q1 adalah nilai yang membagi 25% data terbawah dari sisa data. Artinya 25% catatan produksi memiliki nilai di bawah angka ini.</p>
      <p><strong>Contoh mudah:</strong><br>
      Bayangkan 100 data diurutkan dari terkecil ke terbesar. Q1 adalah nilai pada posisi ke-25. Sebanyak 24 data berada di bawahnya.</p>
      <p><strong>Gunanya:</strong> Mengetahui batas bawah kinerja yang masih normal sebelum dianggap rendah tidak biasa.</p>
    `
  },

  'stat-q3': {
    title: 'Q3 — Kuartil Ketiga (75%)',
    singkat: '75% data produksi berada di bawah nilai ini. Batas atas distribusi normal data.',
    detail: `
      <p><strong>Apa artinya?</strong><br>
      Q3 adalah nilai yang membagi 75% data terbawah dari 25% data teratas. Sebanyak 75% catatan produksi memiliki nilai di bawah angka ini.</p>
      <p><strong>Contoh mudah:</strong><br>
      Dari 100 data yang diurutkan, Q3 adalah nilai pada posisi ke-75. Data di atas Q3 adalah 25% produksi tertinggi.</p>
      <p><strong>Gunanya:</strong> Mengetahui batas atas kinerja yang masih normal — data di atas Q3 adalah periode produksi yang sangat bagus.</p>
    `
  },

  'stat-iqr': {
    title: 'IQR — Interquartile Range',
    singkat: 'Selisih antara Q3 dan Q1. Ukuran penyebaran 50% data bagian tengah.',
    detail: `
      <p><strong>Apa artinya?</strong><br>
      IQR = Q3 dikurangi Q1. Ini mengukur seberapa besar variasi dari 50% data yang berada di tengah, tidak terpengaruh oleh nilai ekstrem.</p>
      <p><strong>Keunggulan IQR dibanding Range:</strong><br>
      Jika ada satu hari produksi sangat tinggi atau sangat rendah, Range akan membesar tapi IQR tetap stabil karena hanya mengukur data tengah.</p>
      <p><strong>Gunanya:</strong> Mendeteksi data anomali — nilai yang sangat jauh dari IQR biasanya dianggap outlier atau data tidak wajar.</p>
    `
  },

  'stat-cv': {
    title: 'Koefisien Variasi (%)',
    singkat: 'Persentase tingkat variasi data relatif terhadap rata-ratanya. Ukuran konsistensi produksi.',
    detail: `
      <p><strong>Apa artinya?</strong><br>
      Koefisien Variasi (CV) = Standar Deviasi dibagi Rata-rata, dikali 100%. Mengukur seberapa konsisten produksi dibandingkan rata-ratanya sendiri.</p>
      <p><strong>Cara membacanya:</strong></p>
      <ul>
        <li>CV di bawah 15% berarti produksi sangat konsisten dan stabil</li>
        <li>CV antara 15 hingga 30% berarti variasi cukup normal</li>
        <li>CV di atas 30% berarti produksi tidak konsisten, banyak fluktuasi</li>
      </ul>
      <p><strong>Keunggulan CV:</strong> Bisa membandingkan konsistensi antar produk yang berbeda skala karena hasilnya dalam bentuk persentase.</p>
    `
  },

  /* ===================== PREDIKSI ===================== */
  'kartu-metode': {
    title: 'Metode Prediksi',
    singkat: 'Metode matematis yang digunakan untuk menghitung perkiraan produksi ke depan.',
    detail: `
      <p><strong>Pilihan metode yang tersedia:</strong></p>
      <ul>
        <li><strong>Moving Average (3 atau 6 Periode)</strong> — Menghitung rata-rata dari 3 atau 6 bulan terakhir sebagai prediksi bulan berikutnya. Simpel dan mudah dipahami. Cocok untuk data yang tidak terlalu naik-turun.</li>
        <li><strong>Regresi Linear</strong> — Mencari garis tren yang paling pas dengan data historis, lalu memperpanjangnya ke depan. Bagus jika ada tren naik atau turun yang konsisten.</li>
        <li><strong>Exponential Smoothing</strong> — Memberikan bobot lebih besar ke data terbaru, lalu mengecilkan bobot data lama. Cocok jika kondisi bisnis sering berubah karena lebih responsif terhadap perubahan terbaru.</li>
      </ul>
      <p><strong>Rekomendasi:</strong> Coba beberapa metode dan bandingkan nilai MAPE-nya, lalu pilih yang paling kecil.</p>
    `
  },

  'kartu-mae': {
    title: 'MAE — Mean Absolute Error',
    singkat: 'Rata-rata selisih (kesalahan) prediksi dibandingkan data aktual. Semakin kecil semakin bagus.',
    detail: `
      <p><strong>Apa artinya?</strong><br>
      MAE dihitung dari rata-rata selisih antara nilai yang diprediksi dengan yang terjadi sungguhan. Nilainya dalam satuan unit (pcs).</p>
      <p><strong>Contoh mudah:</strong><br>
      MAE = 150 artinya rata-rata prediksi meleset sekitar 150 unit dari angka sebenarnya. Jika produksi biasanya 1.500 unit, meleset 150 unit berarti kesalahan 10% — masih cukup baik.</p>
      <p><strong>Cara menilai:</strong></p>
      <ul>
        <li>MAE kecil relatif terhadap rata-rata produksi berarti prediksi akurat</li>
        <li>MAE lebih dari 20 hingga 30 persen dari rata-rata produksi berarti perlu metode lain atau lebih banyak data historis</li>
      </ul>
    `
  },

  'kartu-rmse': {
    title: 'RMSE — Root Mean Squared Error',
    singkat: 'Ukuran akurasi prediksi yang lebih sensitif terhadap kesalahan besar.',
    detail: `
      <p><strong>Apa artinya?</strong><br>
      RMSE mirip seperti MAE, tapi kesalahan besar dihitung dengan bobot lebih besar. Ini berarti RMSE lebih keras menghukum prediksi yang meleset jauh.</p>
      <p><strong>Perbandingan dengan MAE:</strong><br>
      Jika RMSE jauh lebih besar dari MAE, berarti ada beberapa prediksi yang meleset sangat jauh (outlier prediksi). Jika RMSE dan MAE hampir sama, berarti prediksi konsisten dalam tingkat ketepatannya.</p>
      <p><strong>Cara menilai:</strong></p>
      <ul>
        <li>RMSE mendekati MAE berarti tidak ada prediksi yang meleset secara ekstrem</li>
        <li>RMSE jauh lebih besar dari MAE berarti ada bulan tertentu yang diprediksi sangat meleset</li>
      </ul>
    `
  },

  'kartu-mape': {
    title: 'MAPE — Mean Absolute Percentage Error',
    singkat: 'Persentase rata-rata kesalahan prediksi. Metrik yang paling mudah dipahami.',
    detail: `
      <p><strong>Apa artinya?</strong><br>
      MAPE adalah persentase rata-rata seberapa salah prediksi. Misalnya MAPE = 8% artinya prediksi rata-rata meleset sekitar 8% dari nilai aktual.</p>
      <p><strong>Skala penilaian standar:</strong></p>
      <ul>
        <li><strong>Di bawah 10%</strong> — Sangat Akurat: prediksi sangat bisa diandalkan</li>
        <li><strong>10 hingga 20%</strong> — Baik: layak digunakan untuk perencanaan</li>
        <li><strong>20 hingga 50%</strong> — Cukup: bisa dipakai tapi dengan hati-hati</li>
        <li><strong>Di atas 50%</strong> — Kurang Akurat: prediksi tidak dapat diandalkan, coba metode lain atau tambah data historis</li>
      </ul>
      <p>Label di bawah angka (Sangat Akurat / Baik / Cukup / Kurang Akurat) adalah penilaian otomatis berdasarkan skala ini.</p>
    `
  },

  'grafik-prediksi': {
    title: 'Grafik Prediksi vs Aktual',
    singkat: 'Grafik garis yang menggabungkan data nyata masa lalu dengan perkiraan masa depan.',
    detail: `
      <p><strong>Apa yang ditampilkan?</strong><br>
      Grafik ini memiliki dua bagian:</p>
      <ul>
        <li><strong>Garis biru (Aktual)</strong> — Data produksi nyata yang sudah terjadi di masa lalu</li>
        <li><strong>Garis hijau putus-putus (Prediksi)</strong> — Perkiraan produksi untuk bulan-bulan ke depan</li>
      </ul>
      <p><strong>Cara membacanya:</strong><br>
      Di mana garis biru berakhir, garis hijau mulai mengambil alih. Angka-angka prediksi ini adalah proyeksi berdasarkan pola data yang sudah ada.</p>
      <p><strong>Yang perlu diperhatikan:</strong></p>
      <ul>
        <li>Semakin mulus transisi antara garis biru dan hijau, semakin natural prediksinya</li>
        <li>Bila garis hijau langsung melonjak atau anjlok drastis, evaluasi kembali metode atau data historisnya</li>
        <li>Gunakan grafik ini untuk perencanaan bahan baku, tenaga kerja, dan kapasitas produksi ke depan</li>
        <li>Arahkan kursor ke titik mana saja untuk melihat angka pastinya</li>
      </ul>
    `
  },

  'tabel-prediksi': {
    title: 'Tabel Hasil Prediksi',
    singkat: 'Ringkasan angka prediksi per bulan beserta batas bawah dan atas yang realistis.',
    detail: `
      <p><strong>Apa yang ditampilkan?</strong><br>
      Setiap baris adalah satu bulan prediksi ke depan. Kolom-kolomnya berisi:</p>
      <ul>
        <li><strong>Periode</strong> — Urutan bulan ke berapa dari sekarang (+1, +2, dan seterusnya)</li>
        <li><strong>Label</strong> — Nama bulan dan tahunnya (contoh: Jan 2026)</li>
        <li><strong>Nilai Prediksi</strong> — Angka perkiraan produksi hasil kalkulasi model</li>
        <li><strong>Batas Bawah (-10%)</strong> — Skenario pesimis: produksi bisa jadi serendah ini</li>
        <li><strong>Batas Atas (+10%)</strong> — Skenario optimis: produksi bisa setinggi ini</li>
        <li><strong>Keterangan</strong> — Naik, Turun, atau Stabil dibanding bulan prediksi sebelumnya</li>
      </ul>
      <p><strong>Tips penggunaan:</strong><br>
      Gunakan Batas Bawah untuk perencanaan yang lebih aman dan konservatif, dan Batas Atas untuk ekspektasi terbaik.</p>
    `
  }
};


/* ====================================================
   SISTEM TOOLTIP & MODAL
   ==================================================== */

(function() {
  // Buat elemen tooltip global
  const tooltip = document.createElement('div');
  tooltip.id = 'explain-tooltip';
  tooltip.style.cssText = `
    position: fixed;
    z-index: 9999;
    background: rgba(15,23,42,0.97);
    border: 1px solid rgba(59,130,246,0.35);
    border-radius: 10px;
    padding: 10px 14px;
    max-width: 260px;
    font-size: 0.78rem;
    color: #cbd5e1;
    line-height: 1.5;
    pointer-events: none;
    display: none;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    backdrop-filter: blur(8px);
  `;
  document.body.appendChild(tooltip);

  // Buat elemen modal global
  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'explain-modal-overlay';
  modalOverlay.style.cssText = `
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.65);
    backdrop-filter: blur(6px);
    z-index: 10000;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 24px;
  `;
  modalOverlay.innerHTML = `
    <div id="explain-modal" style="
      background: var(--bg-card, #1e293b);
      border: 1px solid rgba(59,130,246,0.3);
      border-radius: 16px;
      padding: 28px;
      width: 100%;
      max-width: 520px;
      max-height: 85vh;
      overflow-y: auto;
      box-shadow: 0 24px 64px rgba(0,0,0,0.6);
      position: relative;
      animation: explainModalIn 0.25s ease;
    ">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:18px;">
        <div id="explain-modal-title" style="font-size:1.05rem;font-weight:700;color:#f1f5f9;font-family:var(--font-head,'Outfit'),sans-serif;"></div>
        <button id="explain-modal-close" style="
          width:30px;height:30px;border-radius:8px;border:none;
          background:rgba(100,116,139,0.2);color:#94a3b8;
          cursor:pointer;display:flex;align-items:center;justify-content:center;
          flex-shrink:0;font-size:1rem;transition:all 0.15s;
        ">x</button>
      </div>
      <div id="explain-modal-body" style="
        font-size:0.85rem;color:#94a3b8;line-height:1.7;
      "></div>
      <div style="margin-top:18px;padding-top:14px;border-top:1px solid rgba(100,116,139,0.2);
        font-size:0.72rem;color:#475569;text-align:center;">
        Klik di luar atau tekan tombol X untuk menutup
      </div>
    </div>
  `;
  document.body.appendChild(modalOverlay);

  // CSS tambahan
  const style = document.createElement('style');
  style.textContent = `
    @keyframes explainModalIn {
      from { opacity:0; transform:scale(0.93) translateY(12px); }
      to   { opacity:1; transform:scale(1) translateY(0); }
    }
    .explain-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      min-width: 22px;
      min-height: 22px;
      border-radius: 50%;
      background: rgba(59,130,246,0.15);
      border: 1px solid rgba(59,130,246,0.3);
      color: #60a5fa;
      font-size: 0.7rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      flex-shrink: 0;
      line-height: 1;
      vertical-align: middle;
    }
    .explain-btn:hover {
      background: rgba(59,130,246,0.3);
      border-color: rgba(59,130,246,0.6);
      color: #93c5fd;
      transform: scale(1.15);
    }
    /* Pastikan card-header yang sudah ada explain-btn tidak wrap sehingga btn terdorong ke bawah */
    .card-header:has(.explain-btn) {
      flex-wrap: nowrap !important;
      gap: 8px;
    }
    /* Di mobile, batas card-actions jangan full-width jika ada explain-btn */
    @media (max-width: 900px) {
      .card-header:has(.explain-btn) .card-actions {
        width: auto !important;
        flex-wrap: wrap;
      }
    }
    @media (max-width: 480px) {
      .card-header:has(.explain-btn) {
        align-items: center !important;
      }
      .card-header:has(.explain-btn) > div:first-child {
        flex: 1;
        min-width: 0;
      }
    }
    #explain-modal-close:hover {
      background: rgba(239,68,68,0.2) !important;
      color: #fca5a5 !important;
    }
    #explain-modal-body p { margin-bottom: 10px; }
    #explain-modal-body ul { padding-left: 18px; margin-bottom:10px; }
    #explain-modal-body li { margin-bottom: 5px; }
    #explain-modal-body strong { color: #e2e8f0; }
    #explain-modal-body em { color: #7dd3fc; font-style: normal; }
  `;
  document.head.appendChild(style);

  // === Helper: baca nilai from DOM dan parse angka ===
  function readNum(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    const raw = el.textContent.replace(/[^0-9.,\-]/g, '').replace(',', '.');
    const n = parseFloat(raw);
    return isNaN(n) ? null : n;
  }

  // === Fungsi penilaian (assess) per metrik ===
  const Assess = {
    verdict(status, color, msg) {
      return { status, color, msg };
    },

    efisiensi() {
      const v = readNum('kpi-efisiensi');
      if (v === null) return null;
      if (v >= 90) return this.verdict('Sangat Baik', '#22c55e', `Efisiensi ${v.toFixed(1)}% — Target produksi hampir atau sudah terpenuhi. Kinerja produksi sangat memuaskan.`);
      if (v >= 70) return this.verdict('Baik', '#60a5fa', `Efisiensi ${v.toFixed(1)}% — Produksi berjalan dengan baik. Sedikit peningkatan sudah cukup untuk mencapai target.`);
      if (v >= 50) return this.verdict('Perlu Perhatian', '#f59e0b', `Efisiensi ${v.toFixed(1)}% — Masih jauh dari target. Identifikasi hambatan dan tingkatkan kapasitas produksi.`);
      return this.verdict('Kritis', '#ef4444', `Efisiensi ${v.toFixed(1)}% — Produksi sangat tertinggal dari target. Perlu evaluasi dan tindakan segera.`);
    },

    jumlahData() {
      const v = readNum('s-count');
      if (v === null) return null;
      if (v >= 30) return this.verdict('Data Mencukupi', '#22c55e', `${v} catatan data — Jumlah ini cukup untuk menghasilkan analisis statistik yang dapat diandalkan.`);
      if (v >= 10) return this.verdict('Data Terbatas', '#f59e0b', `${v} catatan data — Hasil analisis dapat digunakan namun kurang presisi. Tambahkan lebih banyak data untuk hasil yang lebih akurat.`);
      return this.verdict('Data Sangat Sedikit', '#ef4444', `${v} catatan data — Terlalu sedikit untuk analisis yang bermakna. Minimal 10 data disarankan.`);
    },

    meanVsMedian() {
      const mean = readNum('s-mean');
      const median = readNum('s-median');
      if (mean === null || median === null || mean === 0) return null;
      const gap = Math.abs(mean - median) / mean;
      if (gap < 0.10) return this.verdict('Distribusi Normal', '#22c55e', `Rata-rata ${mean.toFixed(1)} dan Median ${median.toFixed(1)} sangat berdekatan (selisih ${(gap*100).toFixed(1)}%). Data produksi terdistribusi seimbang tanpa lonjakan ekstrem.`);
      if (gap < 0.25) return this.verdict('Sedikit Asimetris', '#f59e0b', `Rata-rata ${mean.toFixed(1)} vs Median ${median.toFixed(1)} (selisih ${(gap*100).toFixed(1)}%). Ada beberapa nilai ekstrem yang sedikit mendistorsi rata-rata.`);
      return this.verdict('Distribusi Miring', '#ef4444', `Rata-rata ${mean.toFixed(1)} vs Median ${median.toFixed(1)} (selisih ${(gap*100).toFixed(1)}%). Ada lonjakan atau penurunan produksi yang besar. Gunakan median sebagai acuan yang lebih tepat.`);
    },

    stddev() {
      const std = readNum('s-stddev');
      const mean = readNum('s-mean');
      if (std === null || mean === null || mean === 0) return null;
      const cv = (std / mean) * 100;
      if (cv < 15) return this.verdict('Produksi Sangat Stabil', '#22c55e', `Standar deviasi ${std.toFixed(1)} pcs (CV: ${cv.toFixed(1)}%) — Variasi produksi sangat kecil. Proses produksi berjalan konsisten.`);
      if (cv < 30) return this.verdict('Produksi Cukup Stabil', '#60a5fa', `Standar deviasi ${std.toFixed(1)} pcs (CV: ${cv.toFixed(1)}%) — Variasi masih dalam batas wajar. Produksi relatif dapat diprediksi.`);
      if (cv < 50) return this.verdict('Kurang Konsisten', '#f59e0b', `Standar deviasi ${std.toFixed(1)} pcs (CV: ${cv.toFixed(1)}%) — Ada fluktuasi cukup besar. Cari penyebab ketidakstabilan produksi.`);
      return this.verdict('Sangat Tidak Konsisten', '#ef4444', `Standar deviasi ${std.toFixed(1)} pcs (CV: ${cv.toFixed(1)}%) — Produksi sangat berfluktuasi. Perlu standarisasi proses produksi segera.`);
    },

    minVal() {
      const min = readNum('s-min');
      const mean = readNum('s-mean');
      if (min === null || mean === null || mean === 0) return null;
      const ratio = min / mean;
      if (ratio >= 0.70) return this.verdict('Tidak Ada Penurunan Ekstrem', '#22c55e', `Nilai minimum ${min.toFixed(0)} pcs adalah ${(ratio*100).toFixed(0)}% dari rata-rata. Produksi tidak pernah turun terlalu jauh.`);
      if (ratio >= 0.40) return this.verdict('Ada Periode Rendah', '#f59e0b', `Nilai minimum ${min.toFixed(0)} pcs adalah ${(ratio*100).toFixed(0)}% dari rata-rata. Ada beberapa periode di mana produksi jauh di bawah normal.`);
      return this.verdict('Pernah Turun Drastis', '#ef4444', `Nilai minimum ${min.toFixed(0)} pcs hanya ${(ratio*100).toFixed(0)}% dari rata-rata. Pernah terjadi penurunan produksi yang sangat extrem — periksa data tersebut.`);
    },

    maxVal() {
      const max = readNum('s-max');
      const mean = readNum('s-mean');
      if (max === null || mean === null || mean === 0) return null;
      const ratio = max / mean;
      if (ratio <= 1.5) return this.verdict('Stabil di Puncak', '#22c55e', `Nilai maksimum ${max.toFixed(0)} pcs adalah ${(ratio*100).toFixed(0)}% dari rata-rata. Tidak ada lonjakan produksi yang mencurigakan.`);
      if (ratio <= 2.5) return this.verdict('Ada Lonjakan Produksi', '#f59e0b', `Nilai maksimum ${max.toFixed(0)} pcs adalah ${(ratio*100).toFixed(0)}% dari rata-rata. Ada beberapa periode dengan produksi jauh di atas normal.`);
      return this.verdict('Lonjakan Ekstrem', '#ef4444', `Nilai maksimum ${max.toFixed(0)} pcs adalah ${(ratio*100).toFixed(0)}% dari rata-rata. Terjadi lonjakan sangat besar — pastikan ini data valid, bukan kesalahan input.`);
    },

    range() {
      const range = readNum('s-range');
      const mean = readNum('s-mean');
      if (range === null || mean === null || mean === 0) return null;
      const ratio = range / mean;
      if (ratio < 0.5) return this.verdict('Rentang Sempit', '#22c55e', `Range ${range.toFixed(0)} pcs (${(ratio*100).toFixed(0)}% dari rata-rata) — Produksi sangat konsisten, variasi kecil.`);
      if (ratio < 1.5) return this.verdict('Rentang Normal', '#60a5fa', `Range ${range.toFixed(0)} pcs (${(ratio*100).toFixed(0)}% dari rata-rata) — Variasi produksi dalam batas yang dapat diterima.`);
      return this.verdict('Rentang Sangat Lebar', '#f59e0b', `Range ${range.toFixed(0)} pcs (${(ratio*100).toFixed(0)}% dari rata-rata) — Produksi sangat berfluktuasi antara terendah dan tertinggi.`);
    },

    cv() {
      const v = readNum('s-cv');
      if (v === null) return null;
      if (v < 15) return this.verdict('Sangat Konsisten', '#22c55e', `Koefisien Variasi ${v.toFixed(1)}% — Produksi sangat stabil. Proses berjalan dengan kualitas yang terkontrol dengan baik.`);
      if (v < 30) return this.verdict('Cukup Konsisten', '#60a5fa', `Koefisien Variasi ${v.toFixed(1)}% — Variasi masih dalam batas normal. Produksi dapat diprediksi dengan baik.`);
      if (v < 50) return this.verdict('Kurang Konsisten', '#f59e0b', `Koefisien Variasi ${v.toFixed(1)}% — Produksi cukup berfluktuasi. Identifikasi faktor-faktor penyebab ketidakstabilan.`);
      return this.verdict('Tidak Konsisten', '#ef4444', `Koefisien Variasi ${v.toFixed(1)}% — Tingkat variasi sangat tinggi. Standarisasi proses produksi perlu dilakukan segera.`);
    },

    q1q3() {
      const q1 = readNum('s-q1');
      const q3 = readNum('s-q3');
      const mean = readNum('s-mean');
      if (q1 === null || q3 === null) return null;
      const iqr = q3 - q1;
      const iqrRatio = mean ? (iqr / mean * 100) : null;
      if (iqrRatio !== null && iqrRatio < 30) return this.verdict('Distribusi Terkonsentrasi', '#22c55e', `Q1=${q1.toFixed(0)}, Q3=${q3.toFixed(0)} — 50% data tengah berada dalam rentang yang rapat. Produksi mayoritas sangat konsisten.`);
      if (iqrRatio !== null && iqrRatio < 60) return this.verdict('Distribusi Normal', '#60a5fa', `Q1=${q1.toFixed(0)}, Q3=${q3.toFixed(0)} — Penyebaran data tengah dalam batas wajar.`);
      return this.verdict('Distribusi Menyebar', '#f59e0b', `Q1=${q1.toFixed(0)}, Q3=${q3.toFixed(0)} — Data produksi cukup menyebar. Ada variasi signifikan dalam 50% data tengah.`);
    },

    iqr() {
      const iqr = readNum('s-iqr');
      const mean = readNum('s-mean');
      if (iqr === null || mean === null || mean === 0) return null;
      const ratio = (iqr / mean) * 100;
      if (ratio < 25) return this.verdict('Penyebaran Kecil', '#22c55e', `IQR ${iqr.toFixed(0)} pcs (${ratio.toFixed(0)}% dari rata-rata) — 50% data produksi tengah sangat terkonsentrasi. Data stabil.`);
      if (ratio < 60) return this.verdict('Penyebaran Normal', '#60a5fa', `IQR ${iqr.toFixed(0)} pcs (${ratio.toFixed(0)}% dari rata-rata) — Penyebaran dalam batas wajar.`);
      return this.verdict('Penyebaran Besar', '#f59e0b', `IQR ${iqr.toFixed(0)} pcs (${ratio.toFixed(0)}% dari rata-rata) — Data produksi bagian tengah cukup menyebar, menunjukkan inkonsistensi.`);
    },

    mape() {
      const v = readNum('m-mape');
      if (v === null) return null;
      if (v < 10) return this.verdict('Prediksi Sangat Akurat', '#22c55e', `MAPE ${v.toFixed(1)}% — Prediksi sangat bisa diandalkan. Gunakan hasil ini untuk perencanaan produksi ke depan.`);
      if (v < 20) return this.verdict('Prediksi Baik', '#60a5fa', `MAPE ${v.toFixed(1)}% — Prediksi layak digunakan untuk perencanaan dengan sedikit toleransi kesalahan.`);
      if (v < 50) return this.verdict('Prediksi Kurang Presisi', '#f59e0b', `MAPE ${v.toFixed(1)}% — Prediksi dapat digunakan sebagai panduan kasar. Pertimbangkan metode lain atau tambah data historis.`);
      return this.verdict('Prediksi Tidak Akurat', '#ef4444', `MAPE ${v.toFixed(1)}% — Prediksi kurang dapat diandalkan. Coba metode berbeda atau pastikan data historis cukup dan bersih.`);
    },

    mae() {
      const mae = readNum('m-mae');
      const mean = readNum('s-mean');
      if (mae === null) return null;
      return this.verdict('Kesalahan Rata-rata', '#60a5fa', `MAE = ${mae.toFixed(1)} unit — Rata-rata prediksi meleset sekitar ${mae.toFixed(0)} unit per bulan dari nilai aktual.`);
    },

    rmse() {
      const mae = readNum('m-mae');
      const rmse = readNum('m-rmse');
      if (rmse === null || mae === null) return null;
      const ratio = rmse / mae;
      if (ratio < 1.3) return this.verdict('Tidak Ada Error Besar', '#22c55e', `RMSE (${rmse.toFixed(1)}) hampir sama dengan MAE (${mae.toFixed(1)}) — Prediksi konsisten, tidak ada bulan yang meleset sangat jauh.`);
      if (ratio < 2.0) return this.verdict('Ada Beberapa Error Besar', '#f59e0b', `RMSE (${rmse.toFixed(1)}) lebih besar dari MAE (${mae.toFixed(1)}) — Ada beberapa bulan di mana prediksi meleset cukup jauh.`);
      return this.verdict('Error Tidak Merata', '#ef4444', `RMSE (${rmse.toFixed(1)}) jauh lebih besar dari MAE (${mae.toFixed(1)}) — Ada bulan-bulan tertentu di mana prediksi meleset sangat jauh. Periksa data historis bulan tersebut.`);
    },

    // ── DASHBOARD ──────────────────────────────────────────────────
    trenKpi(changeId) {
      const el = document.getElementById(changeId);
      if (!el) return null;
      const text = el.textContent || '';
      const numMatch = text.match(/[\d.]+/);
      if (!numMatch) return null;
      const pct = parseFloat(numMatch[0]);
      const isUp = el.classList.contains('up') || text.includes('+') || text.includes('↑');
      if (isUp) {
        if (pct >= 10) return this.verdict('Pertumbuhan Sangat Baik', '#22c55e', `Naik ${pct.toFixed(1)}% dibanding periode sebelumnya. Tren sangat positif, pertahankan momentum ini.`);
        if (pct >= 3)  return this.verdict('Pertumbuhan Baik', '#60a5fa', `Naik ${pct.toFixed(1)}% dibanding periode sebelumnya. Tren stabil dan mengarah ke atas.`);
        return this.verdict('Naik Tipis', '#94a3b8', `Naik ${pct.toFixed(1)}% dibanding periode sebelumnya. Peningkatan kecil, dorong lebih jauh.`);
      } else {
        if (pct >= 10) return this.verdict('Penurunan Signifikan', '#ef4444', `Turun ${pct.toFixed(1)}% dari periode sebelumnya. Perlu segera investigasi penyebabnya.`);
        if (pct >= 3)  return this.verdict('Penurunan Sedang', '#f59e0b', `Turun ${pct.toFixed(1)}% dari periode sebelumnya. Perhatikan faktor yang menyebabkan penurunan ini.`);
        return this.verdict('Turun Tipis', '#f59e0b', `Turun ${pct.toFixed(1)}% dari periode sebelumnya. Masih dalam batas toleransi, tapi perlu diwaspadai.`);
      }
    },

    rekapProduk() {
      // Baca tabel rekap — cari kolom rasio (biasanya kolom ke-4 atau yang ada '%')
      const rows = document.querySelectorAll('#rekap-table tbody tr, #rekap-table-body tr');
      if (!rows.length) return null;
      const ratios = [];
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 3) {
          const last = cells[cells.length - 1].textContent.replace(/[^0-9.]/g, '');
          const v = parseFloat(last);
          if (!isNaN(v) && v > 0 && v <= 200) ratios.push(v);
        }
      });
      if (!ratios.length) return null;
      const avg = ratios.reduce((a, b) => a + b, 0) / ratios.length;
      const low = ratios.filter(r => r < 50).length;
      if (avg >= 80 && low === 0) return this.verdict('Penjualan Sangat Baik', '#22c55e', `Rata-rata rasio penjualan ${avg.toFixed(0)}% — Hampir semua produk yang diproduksi berhasil terjual. Stok sangat efisien.`);
      if (avg >= 60) return this.verdict('Penjualan Cukup Baik', '#60a5fa', `Rata-rata rasio penjualan ${avg.toFixed(0)}% — Sebagian besar produksi berhasil terjual. ${low > 0 ? low + ' produk masih di bawah 50%.' : ''}`);
      if (avg >= 40) return this.verdict('Penjualan Kurang Optimal', '#f59e0b', `Rata-rata rasio penjualan ${avg.toFixed(0)}% — Cukup banyak produk tidak terjual. Perlu evaluasi strategi penjualan atau kurangi produksi.`);
      return this.verdict('Penjualan Bermasalah', '#ef4444', `Rata-rata rasio penjualan ${avg.toFixed(0)}% — Mayoritas produksi tidak berhasil dijual. Stok menumpuk dan perlu penanganan segera.`);
    },

    untukEntri() {
      // Hitung badge Tercapai vs Kurang di tabel entri terbaru
      const rows = document.querySelectorAll('#recent-table-body tr, #recent-tbody tr, #tabel-entri tbody tr');
      if (!rows.length) return null;
      let tercapai = 0, kurang = 0;
      rows.forEach(row => {
        const text = row.textContent;
        const hasBadgeGreen = row.querySelector('.badge-green, .badge.green');
        const hasBadgeRed   = row.querySelector('.badge-red, .badge.red');
        if (hasBadgeGreen) tercapai++;
        else if (hasBadgeRed) kurang++;
        else {
          if (text.includes('Tercapai')) tercapai++;
          else if (text.includes('Kurang') || text.includes('Tidak')) kurang++;
        }
      });
      const total = tercapai + kurang;
      if (!total) return null;
      const pct = (tercapai / total) * 100;
      if (pct >= 80) return this.verdict('Kinerja Terbaru Sangat Baik', '#22c55e', `${tercapai} dari ${total} entri terbaru mencapai target (${pct.toFixed(0)}%). Produksi berjalan sangat baik secara konsisten.`);
      if (pct >= 60) return this.verdict('Kinerja Terbaru Cukup Baik', '#60a5fa', `${tercapai} dari ${total} entri mencapai target (${pct.toFixed(0)}%). Ada ruang perbaikan di ${kurang} entri yang belum mencapai target.`);
      if (pct >= 40) return this.verdict('Kinerja Terbaru Kurang', '#f59e0b', `${tercapai} dari ${total} entri mencapai target (${pct.toFixed(0)}%). Lebih dari setengah catatan terbaru tidak memenuhi target.`);
      return this.verdict('Kinerja Terbaru Buruk', '#ef4444', `${tercapai} dari ${total} entri mencapai target (${pct.toFixed(0)}%). Mayoritas target tidak terpenuhi di periode terbaru ini.`);
    },

    distribusiProduk() {
      // Coba baca dari tabel rekap untuk mendapat porsi tiap produk
      const rows = document.querySelectorAll('#rekap-table tbody tr, #rekap-table-body tr');
      if (!rows.length) return null;
      const values = [];
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 2) {
          const v = parseFloat(cells[1].textContent.replace(/[^0-9.]/g, ''));
          if (!isNaN(v) && v > 0) values.push(v);
        }
      });
      if (values.length < 2) return null;
      const total = values.reduce((a, b) => a + b, 0);
      if (!total) return null;
      const maxShare = Math.max(...values) / total * 100;
      const minShare = Math.min(...values) / total * 100;
      const spread = maxShare - minShare;
      if (spread < 20) return this.verdict('Distribusi Sangat Merata', '#22c55e', `Produk terdistribusi seimbang — selisih antar produk hanya ${spread.toFixed(0)}%. Tidak ada produk yang terlalu mendominasi.`);
      if (maxShare < 50) return this.verdict('Distribusi Cukup Merata', '#60a5fa', `Produk terbesar menyumbang ${maxShare.toFixed(0)}% dari total. Distribusi masih tergolong seimbang dan sehat.`);
      if (maxShare < 70) return this.verdict('Ada Dominasi Sedang', '#f59e0b', `Satu produk menyumbang ${maxShare.toFixed(0)}% dari total produksi. Pertimbangkan diversifikasi lebih lanjut untuk mengurangi risiko ketergantungan.`);
      return this.verdict('Dominasi Sangat Tinggi', '#ef4444', `Satu produk mendominasi ${maxShare.toFixed(0)}% produksi. Risiko sangat tinggi jika produk ini mengalami masalah penjualan atau produksi.`);
    },

    // ── STATISTIK — CHART ──────────────────────────────────────────
    matriksKorelasi() {
      const cells = document.querySelectorAll('#korelasi-body td');
      if (!cells.length) return null;
      const values = [];
      cells.forEach(cell => {
        const v = parseFloat(cell.textContent);
        if (!isNaN(v) && v < 0.999) values.push(Math.abs(v)); // skip diagonal
      });
      if (!values.length) return null;
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      const highCount = values.filter(v => v > 0.7).length;
      const negCount  = values.filter(v => parseFloat('0') < 0).length;
      if (avg > 0.7) return this.verdict('Korelasi Antar Produk Tinggi', '#22c55e', `Rata-rata korelasi ${avg.toFixed(2)} — ${highCount} pasang produk bergerak beriringan. Produksi terkoordinasi dengan baik antar lini.`);
      if (avg > 0.4) return this.verdict('Korelasi Moderat', '#60a5fa', `Rata-rata korelasi ${avg.toFixed(2)} — Ada hubungan sedang antar produk. Beberapa produk bergerak independen satu sama lain.`);
      if (avg > 0.2) return this.verdict('Korelasi Lemah', '#f59e0b', `Rata-rata korelasi ${avg.toFixed(2)} — Produk-produk bergerak cukup independen. Masing-masing produk punya pola produksi tersendiri.`);
      return this.verdict('Tidak Ada Korelasi Signifikan', '#94a3b8', `Rata-rata korelasi ${avg.toFixed(2)} — Produk-produk bergerak benar-benar independen. Tidak ada pola bersama yang terdeteksi.`);
    },

    statLengkap() {
      const rows = document.querySelectorAll('#stat-full-table tr');
      if (!rows.length) return null;
      const cvValues = [];
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 7) {
          const v = parseFloat(cells[6].textContent);
          if (!isNaN(v)) cvValues.push(v);
        }
      });
      if (!cvValues.length) return null;
      const avg = cvValues.reduce((a, b) => a + b, 0) / cvValues.length;
      const unstable = cvValues.filter(v => v > 30).length;
      if (avg < 15) return this.verdict('Semua Produk Sangat Konsisten', '#22c55e', `Rata-rata CV keseluruhan ${avg.toFixed(1)}% — Seluruh lini produksi berjalan stabil dan dapat diprediksi.`);
      if (avg < 30 && unstable === 0) return this.verdict('Konsistensi Keseluruhan Baik', '#60a5fa', `Rata-rata CV ${avg.toFixed(1)}% — Produksi keseluruhan cukup stabil. Variasi masih dalam rentang yang dapat diterima.`);
      if (avg < 50) return this.verdict('Beberapa Produk Tidak Stabil', '#f59e0b', `Rata-rata CV ${avg.toFixed(1)}% — ${unstable > 0 ? unstable + ' produk' : 'Beberapa produk'} menunjukkan fluktuasi tinggi. Perlu perhatian khusus pada proses produksinya.`);
      return this.verdict('Konsistensi Keseluruhan Rendah', '#ef4444', `Rata-rata CV ${avg.toFixed(1)}% — Produksi sangat tidak stabil secara keseluruhan. Standarisasi proses menyeluruh sangat dibutuhkan.`);
    },

    perbandinganProduk() {
      // Gunakan data tabel rekap untuk perbandingan produk
      const rows = document.querySelectorAll('#rekap-table tbody tr, #rekap-table-body tr');
      if (!rows.length) return null;
      const values = [];
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 2) {
          const v = parseFloat(cells[1].textContent.replace(/[^0-9.]/g, ''));
          if (!isNaN(v) && v > 0) values.push(v);
        }
      });
      if (values.length < 2) return null;
      const max = Math.max(...values);
      const min = Math.min(...values);
      const ratio = max / min;
      if (ratio <= 1.5) return this.verdict('Sangat Seimbang', '#22c55e', `Produk terbanyak vs tersedikit hanya ${ratio.toFixed(1)}x lipat selisihnya. Semua produk diproduksi dalam volume yang sangat mirip.`);
      if (ratio <= 3.0) return this.verdict('Cukup Seimbang', '#60a5fa', `Produk terbanyak vs tersedikit ${ratio.toFixed(1)}x lipat selisihnya. Ada perbedaan wajar dalam fokus produksi.`);
      if (ratio <= 6.0) return this.verdict('Perbedaan Cukup Besar', '#f59e0b', `Produk terbanyak vs tersedikit ${ratio.toFixed(1)}x lipat selisihnya. Perlu dicek apakah ini sesuai rencana atau ada masalah produksi.`);
      return this.verdict('Perbedaan Sangat Besar', '#ef4444', `Produk terbanyak vs tersedikit ${ratio.toFixed(1)}x lipat selisihnya. Ketimpangan produksi sangat besar — ada produk yang jauh tertinggal.`);
    },

    // ── PREDIKSI — GRAFIK & TABEL ──────────────────────────────────
    grafikPrediksi() {
      const mape = readNum('m-mape');
      const rows = document.querySelectorAll('#forecast-tbody tr');
      let naik = 0, turun = 0, stabil = 0;
      rows.forEach(row => {
        const text = row.textContent;
        if (text.includes('Naik') || row.querySelector('.badge-green')) naik++;
        else if (text.includes('Turun') || row.querySelector('.badge-red')) turun++;
        else stabil++;
      });
      const total = naik + turun + stabil;
      const trendStr = naik > turun ? 'cenderung naik' : turun > naik ? 'cenderung turun' : 'relatif stabil';
      if (mape !== null) {
        const c = mape < 10 ? '#22c55e' : mape < 20 ? '#60a5fa' : '#f59e0b';
        const acc = mape < 10 ? 'sangat akurat' : mape < 20 ? 'cukup akurat' : 'kurang presisi';
        return this.verdict(`Prediksi ${acc.charAt(0).toUpperCase() + acc.slice(1)}, Tren ${trendStr.charAt(0).toUpperCase() + trendStr.slice(1)}`, c,
          `Model ${acc} (MAPE=${mape.toFixed(1)}%). Produksi ${total} periode ke depan diprediksi ${trendStr}. ${mape > 20 ? 'Pertimbangkan mengganti metode atau menambah data historis.' : 'Hasil ini sudah layak digunakan sebagai dasar perencanaan.'}`);
      }
      if (!total) return null;
      const c = naik > turun ? '#22c55e' : turun > naik ? '#ef4444' : '#60a5fa';
      return this.verdict(`Tren Prediksi ${trendStr.charAt(0).toUpperCase() + trendStr.slice(1)}`, c,
        `${total} periode prediksi: ${naik} naik, ${turun} turun, ${stabil} stabil. Secara keseluruhan produksi ${trendStr}.`);
    },

    tabelPrediksi() {
      const rows = document.querySelectorAll('#forecast-tbody tr');
      if (!rows.length) return null;
      let naik = 0, turun = 0, stabil = 0;
      rows.forEach(row => {
        const text = row.textContent;
        if (text.includes('Naik') || row.querySelector('.badge-green')) naik++;
        else if (text.includes('Turun') || row.querySelector('.badge-red')) turun++;
        else stabil++;
      });
      const total = naik + turun + stabil;
      if (!total) return null;
      if (naik > turun && naik > stabil)
        return this.verdict('Prediksi Pertumbuhan', '#22c55e', `${naik} dari ${total} periode diprediksi naik. Rencanakan peningkatan kapasitas: bahan baku, tenaga kerja, dan mesin.`);
      if (turun > naik && turun > stabil)
        return this.verdict('Prediksi Penurunan', '#ef4444', `${turun} dari ${total} periode diprediksi turun. Persiapkan langkah antisipasi: efisiensi biaya dan penyesuaian kapasitas.`);
      return this.verdict('Prediksi Stabil', '#60a5fa', `Produksi diprediksi relatif stabil dalam ${total} periode ke depan. Kondisi yang baik untuk perencanaan jangka menengah.`);
    },

    metodePrediksi() {
      const nameEl = document.getElementById('m-name');
      const mape = readNum('m-mape');
      if (!nameEl || mape === null) return null;
      const method = nameEl.textContent.trim();
      const c = mape < 10 ? '#22c55e' : mape < 20 ? '#60a5fa' : mape < 50 ? '#f59e0b' : '#ef4444';
      const verdict = mape < 10 ? 'sangat cocok' : mape < 20 ? 'cukup cocok' : 'kurang optimal';
      return this.verdict(`Metode ${verdict.charAt(0).toUpperCase() + verdict.slice(1)} untuk Data Ini`, c,
        `Metode "${method}" menghasilkan MAPE ${mape.toFixed(1)}% untuk produk ini. ${mape >= 20 ? 'Coba bandingkan dengan metode lain untuk menemukan yang lebih akurat.' : 'Metode ini sudah memberikan hasil yang baik.'}`);
    }
  };

  const AssessMap = {
    // Dashboard — KPI
    'total-produksi':      () => Assess.trenKpi('kpi-produksi-change'),
    'pendapatan-penjualan':() => Assess.trenKpi('kpi-penjualan-change'),
    'efisiensi-produksi':  () => Assess.efisiensi(),
    // Dashboard — Chart & Tabel
    'distribusi-produk':   () => Assess.distribusiProduk(),
    'tren-produksi':       () => Assess.trenKpi('kpi-produksi-change'),
    'rekap-produk':        () => Assess.rekapProduk(),
    'entri-terbaru':       () => Assess.untukEntri(),
    'efisiensi-bar':       () => Assess.efisiensi(),
    // Statistik — Kartu angka
    'stat-jumlah-data':    () => Assess.jumlahData(),
    'stat-rata-rata':      () => Assess.meanVsMedian(),
    'stat-median':         () => Assess.meanVsMedian(),
    'stat-stddev':         () => Assess.stddev(),
    'stat-minimum':        () => Assess.minVal(),
    'stat-maksimum':       () => Assess.maxVal(),
    'stat-range':          () => Assess.range(),
    'stat-cv':             () => Assess.cv(),
    'stat-q1':             () => Assess.q1q3(),
    'stat-q3':             () => Assess.q1q3(),
    'stat-iqr':            () => Assess.iqr(),
    // Statistik — Chart
    'distribusi-frekuensi':() => Assess.stddev(),
    'tren-bulanan-stat':   () => Assess.meanVsMedian(),
    'perbandingan-produk': () => Assess.perbandinganProduk(),
    'radar-performa':      () => Assess.perbandinganProduk(),
    'matriks-korelasi':    () => Assess.matriksKorelasi(),
    'stat-ringkasan':      () => Assess.jumlahData(),
    'stat-lengkap':        () => Assess.statLengkap(),
    // Prediksi — KPI
    'kartu-metode':        () => Assess.metodePrediksi(),
    'kartu-mae':           () => Assess.mae(),
    'kartu-rmse':          () => Assess.rmse(),
    'kartu-mape':          () => Assess.mape(),
    // Prediksi — Chart & Tabel
    'grafik-prediksi':     () => Assess.grafikPrediksi(),
    'tabel-prediksi':      () => Assess.tabelPrediksi(),
  };

  function buildAssessmentHtml(assessment) {
    if (!assessment) return '';
    const c = assessment.color;
    return `
      <div style="margin-top:16px;padding:14px 16px;border-radius:10px;
        background:${c}18;border:1px solid ${c}44;">
        <div style="font-size:0.68rem;font-weight:700;text-transform:uppercase;
          letter-spacing:0.07em;color:${c};margin-bottom:5px;">Penilaian Data Saat Ini</div>
        <div style="font-size:0.95rem;font-weight:700;color:${c};margin-bottom:5px;">${assessment.status}</div>
        <div style="font-size:0.82rem;color:#94a3b8;line-height:1.6;">${assessment.msg}</div>
      </div>`;
  }

  // Fungsi buka modal
  function openModal(key) {
    const d = ExplainData[key];
    if (!d) return;
    document.getElementById('explain-modal-title').textContent = d.title;

    // Ambil penilaian dinamis
    const assessFn = AssessMap[key];
    let assessHtml = '';
    if (assessFn) {
      try { assessHtml = buildAssessmentHtml(assessFn()); } catch(e) {}
    }

    document.getElementById('explain-modal-body').innerHTML = d.detail + assessHtml;
    modalOverlay.style.display = 'flex';
  }

  // Tutup modal
  document.getElementById('explain-modal-close').addEventListener('click', () => {
    modalOverlay.style.display = 'none';
  });
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.style.display = 'none';
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modalOverlay.style.display = 'none';
  });

  // Fungsi inisialisasi: scan semua elemen dengan data-explain
  function initExplainButtons() {
    document.querySelectorAll('[data-explain]').forEach(el => {
      if (el.dataset.explainInit) return;
      el.dataset.explainInit = '1';
      const key = el.dataset.explain;
      const d = ExplainData[key];
      if (!d) return;

      // Buat tombol help
      const btn = document.createElement('button');
      btn.className = 'explain-btn';
      btn.title = 'Klik untuk penjelasan lengkap';
      btn.innerHTML = '?';

      // Posisikan tombol — SEMUA ukuran layar menggunakan strategi yang sama
      const cardHeader = el.querySelector('.card-header');

      if (cardHeader) {
        // Pastikan card-header adalah flex row dengan space-between
        cardHeader.style.display = 'flex';
        cardHeader.style.alignItems = 'flex-start';
        cardHeader.style.justifyContent = 'space-between';
        cardHeader.style.flexWrap = 'nowrap';

        // Tempatkan tombol di akhir card-header, terdorong ke kanan
        btn.style.cssText += 'flex-shrink:0;margin-left:auto;align-self:center;';
        // Jika sudah ada .card-actions, sisipkan tombol sebelum card-actions
        const cardActions = cardHeader.querySelector('.card-actions');
        if (cardActions) {
          cardHeader.insertBefore(btn, cardActions);
          btn.style.marginRight = '6px';
        } else {
          cardHeader.appendChild(btn);
        }
      } else if (el.classList.contains('kpi-card')) {
        // KPI card: tempatkan tombol ? di samping kpi-icon (kanan atas)
        const kpiTop = el.querySelector('.kpi-top');
        const kpiIcon = el.querySelector('.kpi-icon');
        if (kpiTop && kpiIcon) {
          const wrapper = document.createElement('div');
          wrapper.style.cssText = 'display:flex;align-items:center;gap:4px;flex-shrink:0;';
          kpiIcon.parentNode.insertBefore(wrapper, kpiIcon);
          wrapper.appendChild(kpiIcon);
          btn.style.marginLeft = '0';
          wrapper.appendChild(btn);
        } else {
          el.style.position = 'relative';
          btn.style.cssText += 'position:absolute;top:12px;right:12px;z-index:10;';
          el.appendChild(btn);
        }
      } else if (el.classList.contains('stat-box')) {
        // Stat box: tempatkan ? di label
        const label = el.querySelector('.stat-box-label');
        if (label) {
          label.style.cssText += 'display:flex;align-items:center;justify-content:space-between;gap:4px;';
          btn.style.marginLeft = 'auto';
          btn.style.flexShrink = '0';
          label.appendChild(btn);
        }
      } else {
        // Fallback: posisi absolut di pojok kanan atas
        el.style.position = 'relative';
        btn.style.cssText += 'position:absolute;top:12px;right:12px;z-index:10;';
        el.appendChild(btn);
      }

      // Tooltip hover
      btn.addEventListener('mouseenter', (e) => {
        tooltip.innerHTML = `<strong style="color:#93c5fd;">${d.title}</strong><br>${d.singkat}<br><span style="color:#475569;font-size:0.7rem;margin-top:4px;display:block;">Klik untuk penjelasan lengkap</span>`;
        tooltip.style.display = 'block';
        positionTooltip(e);
      });
      btn.addEventListener('mousemove', positionTooltip);
      btn.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
      });

      // Klik buka modal
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        tooltip.style.display = 'none';
        openModal(key);
      });
    });
  }

  function positionTooltip(e) {
    const TW = tooltip.offsetWidth || 260;
    const TH = tooltip.offsetHeight || 80;
    let x = e.clientX + 14;
    let y = e.clientY - TH / 2;
    if (x + TW > window.innerWidth - 10) x = e.clientX - TW - 14;
    if (y < 8) y = 8;
    if (y + TH > window.innerHeight - 8) y = window.innerHeight - TH - 8;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
  }

  function tryInit() {
    initExplainButtons();
    setTimeout(initExplainButtons, 800);
    setTimeout(initExplainButtons, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit);
  } else {
    tryInit();
  }

  window.ExplainSystem = { init: initExplainButtons, open: openModal };
})();
