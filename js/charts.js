/**
 * charts.js — Chart.js Configurations & Renderers
 * Data Analis Platform
 */

/* ─── Chart.js Global Defaults ─── */
function initChartDefaults() {
  if (typeof Chart === 'undefined') return;
  Chart.defaults.color            = '#94a3b8';
  Chart.defaults.borderColor      = 'rgba(255,255,255,0.06)';
  Chart.defaults.font.family      = "'Inter', sans-serif";
  Chart.defaults.font.size        = 12;
  Chart.defaults.plugins.legend.labels.usePointStyle    = true;
  Chart.defaults.plugins.legend.labels.pointStyle       = 'circle';
  Chart.defaults.plugins.legend.labels.boxWidth         = 10;
  Chart.defaults.plugins.legend.labels.boxHeight        = 10;
  Chart.defaults.plugins.legend.labels.padding          = 20;

  Chart.defaults.plugins.tooltip.backgroundColor = '#1e2d45';
  Chart.defaults.plugins.tooltip.borderColor      = 'rgba(255,255,255,0.1)';
  Chart.defaults.plugins.tooltip.borderWidth      = 1;
  Chart.defaults.plugins.tooltip.padding          = { x:12, y:10 };
  Chart.defaults.plugins.tooltip.cornerRadius     = 8;
  Chart.defaults.plugins.tooltip.titleColor       = '#f1f5f9';
  Chart.defaults.plugins.tooltip.bodyColor        = '#94a3b8';
  Chart.defaults.plugins.tooltip.titleFont        = { size:13, weight:'600' };
}

/* ─── Color palette (matches CSS vars) ─── */
const CHART_COLORS = {
  blue:   '#3b82f6',
  green:  '#10b981',
  purple: '#8b5cf6',
  amber:  '#f59e0b',
  cyan:   '#06b6d4',
  red:    '#ef4444',
  pink:   '#ec4899',
};

const PRODUCT_CHART_COLORS = {
  'T-Shirt': '#3b82f6',
  'Kemeja':  '#10b981',
  'Celana':  '#8b5cf6',
  'Sweater': '#f59e0b',
  'Jersey':  '#06b6d4',
};

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* ─── Line Chart — Tren Produksi ─── */
function createTrenProduksiChart(canvasId, labels, datasets) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const chartDatasets = datasets.map(ds => ({
    label: ds.label,
    data:  ds.data,
    borderColor: ds.color,
    backgroundColor: hexToRgba(ds.color, 0.08),
    borderWidth: 2.5,
    pointBackgroundColor: ds.color,
    pointRadius: 4,
    pointHoverRadius: 6,
    pointBorderColor: '#0d1120',
    pointBorderWidth: 2,
    tension: 0.4,
    fill: datasets.length === 1,
  }));

  return new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: chartDatasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: true, position: 'top' },
        tooltip: {
          callbacks: {
            label: ctx => `  ${ctx.dataset.label}: ${DataManager.formatNumber(ctx.raw)} pcs`,
          },
        },
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#64748b' },
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: {
            color: '#64748b',
            callback: v => DataManager.formatNumber(v),
          },
          beginAtZero: true,
        },
      },
    },
  });
}

/* ─── Donut Chart — Distribusi Produk ─── */
function createDistribusiChart(canvasId, labels, data) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const colors = labels.map(l => PRODUCT_CHART_COLORS[l] || '#64748b');

  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: colors.map(c => hexToRgba(c, 0.85)),
        borderColor:     colors,
        borderWidth: 2,
        hoverOffset: 8,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: { position: 'right' },
        tooltip: {
          callbacks: {
            label: ctx => {
              const total = ctx.dataset.data.reduce((a,b)=>a+b,0);
              const pct   = ((ctx.raw / total)*100).toFixed(1);
              return `  ${ctx.label}: ${DataManager.formatNumber(ctx.raw)} pcs (${pct}%)`;
            },
          },
        },
      },
    },
  });
}

/* ─── Bar Chart — Horizontal ─── */
function createHBarChart(canvasId, labels, data, colorKey = 'blue') {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const color = CHART_COLORS[colorKey] || CHART_COLORS.blue;

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Nilai',
        data,
        backgroundColor: labels.map((l, i) =>
          hexToRgba(Object.values(PRODUCT_CHART_COLORS)[i] || color, 0.75)
        ),
        borderColor: labels.map((l, i) =>
          Object.values(PRODUCT_CHART_COLORS)[i] || color
        ),
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => `  ${DataManager.formatNumber(ctx.raw)} pcs`,
          },
        },
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#64748b', callback: v => DataManager.formatNumber(v) },
          beginAtZero: true,
        },
        y: {
          grid: { display: false },
          ticks: { color: '#94a3b8' },
        },
      },
    },
  });
}

/* ─── Bar Chart — Vertikal ─── */
function createVBarChart(canvasId, labels, datasets, stacked = false) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const chartDatasets = datasets.map(ds => ({
    label: ds.label,
    data:  ds.data,
    backgroundColor: hexToRgba(ds.color, 0.75),
    borderColor: ds.color,
    borderWidth: 1.5,
    borderRadius: 4,
    borderSkipped: false,
  }));

  return new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: chartDatasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: datasets.length > 1, position: 'top' },
        tooltip: {
          callbacks: {
            label: ctx => `  ${ctx.dataset.label}: ${DataManager.formatNumber(ctx.raw)} pcs`,
          },
        },
      },
      scales: {
        x: {
          stacked,
          grid: { display: false },
          ticks: { color: '#64748b' },
        },
        y: {
          stacked,
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#64748b', callback: v => DataManager.formatNumber(v) },
          beginAtZero: true,
        },
      },
    },
  });
}

/* ─── Area Chart — Forecast ─── */
function createForecastChart(canvasId, labels, actualData, forecastData, forecastStart) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const actualDataset = {
    label: 'Aktual',
    data: actualData.concat(Array(forecastData.length).fill(null)),
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59,130,246,0.08)',
    borderWidth: 2.5,
    pointRadius: 4,
    pointBackgroundColor: '#3b82f6',
    pointBorderColor: '#0d1120',
    pointBorderWidth: 2,
    tension: 0.4,
    fill: true,
  };

  const forecastDataset = {
    label: 'Prediksi',
    data: Array(actualData.length - 1).fill(null).concat([actualData[actualData.length-1]]).concat(forecastData),
    borderColor: '#10b981',
    backgroundColor: 'rgba(16,185,129,0.06)',
    borderWidth: 2.5,
    borderDash: [6, 4],
    pointRadius: (ctx) => ctx.dataIndex >= actualData.length ? 4 : 0,
    pointBackgroundColor: '#10b981',
    pointBorderColor: '#0d1120',
    pointBorderWidth: 2,
    tension: 0.4,
    fill: true,
  };

  return new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: [actualDataset, forecastDataset] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: true, position: 'top' },
        tooltip: {
          callbacks: {
            label: ctx => {
              if (ctx.raw === null) return null;
              return `  ${ctx.dataset.label}: ${DataManager.formatNumber(ctx.raw)} pcs`;
            },
          },
          filter: item => item.raw !== null,
        },
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#64748b' },
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#64748b', callback: v => DataManager.formatNumber(v) },
          beginAtZero: false,
        },
      },
    },
  });
}

/* ─── Scatter Chart — Korelasi visualisasi ─── */
function createScatterChart(canvasId, label, data, xLabel = 'X', yLabel = 'Y') {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  return new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label,
        data,
        backgroundColor: hexToRgba('#3b82f6', 0.6),
        borderColor: '#3b82f6',
        pointRadius: 5,
        pointHoverRadius: 7,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          title: { display: true, text: xLabel, color: '#64748b' },
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#64748b' },
        },
        y: {
          title: { display: true, text: yLabel, color: '#64748b' },
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#64748b' },
        },
      },
    },
  });
}

/* ─── Radar Chart ─── */
function createRadarChart(canvasId, labels, datasets) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const chartDatasets = datasets.map(ds => ({
    label: ds.label,
    data: ds.data,
    borderColor: ds.color,
    backgroundColor: hexToRgba(ds.color, 0.12),
    borderWidth: 2,
    pointBackgroundColor: ds.color,
    pointRadius: 4,
  }));

  return new Chart(ctx, {
    type: 'radar',
    data: { labels, datasets: chartDatasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' },
      },
      scales: {
        r: {
          grid: { color: 'rgba(255,255,255,0.07)' },
          angleLines: { color: 'rgba(255,255,255,0.05)' },
          pointLabels: { color: '#94a3b8', font: { size: 11 } },
          ticks: { color: '#64748b', backdropColor: 'transparent' },
        },
      },
    },
  });
}

/* ─── Destroy chart safely ─── */
function destroyChart(chartRef) {
  if (chartRef && typeof chartRef.destroy === 'function') {
    chartRef.destroy();
  }
  return null;
}
