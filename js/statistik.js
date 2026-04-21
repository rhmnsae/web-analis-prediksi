/**
 * statistik.js — Kalkulasi Statistik Deskriptif & Korelasi
 * Data Analis Platform
 */

const Statistik = (() => {

  /* ─── 1. Statistik Deskriptif Dasar ─── */

  function mean(arr) {
    if (!arr.length) return 0;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }

  function median(arr) {
    if (!arr.length) return 0;
    const sorted = [...arr].sort((a, b) => a - b);
    const mid    = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  }

  function mode(arr) {
    if (!arr.length) return 0;
    const freq = {};
    arr.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
    const maxFreq = Math.max(...Object.values(freq));
    const modes   = Object.keys(freq).filter(k => freq[k] === maxFreq).map(Number);
    return modes.length === arr.length ? null : modes[0]; // null = no mode
  }

  function variance(arr, population = false) {
    if (arr.length < 2) return 0;
    const avg  = mean(arr);
    const denom = population ? arr.length : arr.length - 1;
    return arr.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / denom;
  }

  function stdDev(arr, population = false) {
    return Math.sqrt(variance(arr, population));
  }

  function min(arr) { return arr.length ? Math.min(...arr) : 0; }
  function max(arr) { return arr.length ? Math.max(...arr) : 0; }
  function range(arr) { return max(arr) - min(arr); }

  function quartile(arr, q) {
    if (!arr.length) return 0;
    const sorted = [...arr].sort((a, b) => a - b);
    const pos    = (sorted.length - 1) * q;
    const base   = Math.floor(pos);
    const rest   = pos - base;
    if (sorted[base + 1] !== undefined) {
      return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    }
    return sorted[base];
  }

  function iqr(arr) {
    return quartile(arr, 0.75) - quartile(arr, 0.25);
  }

  function skewness(arr) {
    if (arr.length < 3) return 0;
    const avg  = mean(arr);
    const sd   = stdDev(arr);
    if (sd === 0) return 0;
    const n = arr.length;
    return (n / ((n-1)*(n-2))) * arr.reduce((s, v) => s + Math.pow((v-avg)/sd, 3), 0);
  }

  function kurtosis(arr) {
    if (arr.length < 4) return 0;
    const avg = mean(arr);
    const sd  = stdDev(arr);
    if (sd === 0) return 0;
    const n = arr.length;
    const k = arr.reduce((s, v) => s + Math.pow((v-avg)/sd, 4), 0) * (n*(n+1))/((n-1)*(n-2)*(n-3));
    const correction = 3*(n-1)*(n-1)/((n-2)*(n-3));
    return k - correction; // excess kurtosis
  }

  function cv(arr) {
    // Coefficient of Variation (%)
    const avg = mean(arr);
    return avg !== 0 ? (stdDev(arr) / avg) * 100 : 0;
  }

  function sum(arr) {
    return arr.reduce((a, b) => a + b, 0);
  }

  /* ─── 2. Ringkasan Statistik Lengkap ─── */
  function summarize(arr) {
    if (!arr.length) return null;
    const sorted = [...arr].sort((a, b) => a - b);
    return {
      count:  arr.length,
      sum:    sum(arr),
      mean:   mean(arr),
      median: median(arr),
      mode:   mode(arr),
      stdDev: stdDev(arr),
      variance: variance(arr),
      min:    min(arr),
      max:    max(arr),
      range:  range(arr),
      q1:     quartile(arr, 0.25),
      q3:     quartile(arr, 0.75),
      iqr:    iqr(arr),
      cv:     cv(arr),
      skewness: skewness(arr),
      kurtosis: kurtosis(arr),
    };
  }

  /* ─── 3. Korelasi Pearson ─── */
  function pearsonCorrelation(arrX, arrY) {
    if (arrX.length !== arrY.length || arrX.length < 2) return NaN;
    const n   = arrX.length;
    const mX  = mean(arrX);
    const mY  = mean(arrY);
    const num = arrX.reduce((s, x, i) => s + (x - mX) * (arrY[i] - mY), 0);
    const denX = Math.sqrt(arrX.reduce((s, x) => s + Math.pow(x - mX, 2), 0));
    const denY = Math.sqrt(arrY.reduce((s, y) => s + Math.pow(y - mY, 2), 0));
    return (denX * denY) === 0 ? 0 : num / (denX * denY);
  }

  /* ─── 4. Matriks Korelasi ─── */
  function correlationMatrix(datasets) {
    // datasets: { label: string, data: number[] }[]
    const n   = datasets.length;
    const mat = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        mat[i][j] = i === j ? 1 : pearsonCorrelation(datasets[i].data, datasets[j].data);
      }
    }
    return mat;
  }

  /* ─── 5. Histogram bins ─── */
  function histogramBins(arr, numBins = 10) {
    if (!arr.length) return [];
    const mn   = min(arr);
    const mx   = max(arr);
    const binW = (mx - mn) / numBins || 1;

    const bins = Array.from({ length: numBins }, (_, i) => ({
      from:  mn + i * binW,
      to:    mn + (i + 1) * binW,
      count: 0,
    }));

    arr.forEach(v => {
      let idx = Math.floor((v - mn) / binW);
      if (idx === numBins) idx = numBins - 1;
      if (bins[idx]) bins[idx].count++;
    });

    return bins;
  }

  /* ─── 6. Normalisasi (0–1) ─── */
  function normalize(arr) {
    const mn = min(arr);
    const mx = max(arr);
    const d  = mx - mn;
    return d === 0 ? arr.map(() => 0) : arr.map(v => (v - mn) / d);
  }

  /* ─── 7. Deteksi Outlier (IQR method) ─── */
  function detectOutliers(arr) {
    const q1 = quartile(arr, 0.25);
    const q3 = quartile(arr, 0.75);
    const iqrV = q3 - q1;
    const lower = q1 - 1.5 * iqrV;
    const upper = q3 + 1.5 * iqrV;
    return arr.filter(v => v < lower || v > upper);
  }

  /* ─── HTML Render Helpers ─── */

  function formatStat(value, decimals = 2) {
    if (value === null || isNaN(value)) return '<span style="color:var(--text-muted);">N/A</span>';
    return DataManager.formatNumber(Math.round(value));
  }

  function formatStatDec(value, decimals = 2) {
    if (value === null || isNaN(value)) return '<span style="color:var(--text-muted);">N/A</span>';
    return (+value).toFixed(decimals);
  }

  function corrColor(r) {
    if (isNaN(r)) return 'rgba(100,116,139,0.2)';
    const alpha = Math.abs(r);
    if (r >= 0) return `rgba(16,185,129,${0.15 + alpha * 0.6})`;
    else        return `rgba(239,68,68,${0.15 + alpha * 0.6})`;
  }

  function corrTextColor(r) {
    if (isNaN(r)) return 'var(--text-muted)';
    return Math.abs(r) > 0.5 ? '#fff' : 'var(--text-primary)';
  }

  return {
    mean, median, mode, variance, stdDev,
    min, max, range, quartile, iqr, skewness, kurtosis, cv, sum,
    summarize, pearsonCorrelation, correlationMatrix,
    histogramBins, normalize, detectOutliers,
    formatStat, formatStatDec, corrColor, corrTextColor,
  };

})();
