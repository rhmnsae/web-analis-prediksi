/**
 * prediksi.js — Algoritma Forecasting & Prediksi
 * Data Analis Platform
 */

const Prediksi = (() => {

  /* ─── 1. Moving Average (Simple) ─── */
  function movingAverage(data, period) {
    if (data.length < period) return [];
    const result = [];
    for (let i = period - 1; i < data.length; i++) {
      const window = data.slice(i - period + 1, i + 1);
      result.push(window.reduce((a, b) => a + b, 0) / period);
    }
    return result;
  }

  /* ─── 2. Exponential Smoothing ─── */
  function exponentialSmoothing(data, alpha = 0.3) {
    if (!data.length) return [];
    const result = [data[0]];
    for (let i = 1; i < data.length; i++) {
      result.push(alpha * data[i] + (1 - alpha) * result[i - 1]);
    }
    return result;
  }

  /* ─── 3. Linear Regression ─── */
  function linearRegression(data) {
    const n  = data.length;
    if (n < 2) return { slope: 0, intercept: data[0] || 0, r2: 0 };

    const xArr = Array.from({ length: n }, (_, i) => i + 1);
    const sumX  = xArr.reduce((a, b) => a + b, 0);
    const sumY  = data.reduce((a, b) => a + b, 0);
    const sumXY = xArr.reduce((s, x, i) => s + x * data[i], 0);
    const sumX2 = xArr.reduce((s, x) => s + x * x, 0);

    const slope     = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // R² (coefficient of determination)
    const meanY     = sumY / n;
    const ssTotal   = data.reduce((s, y) => s + Math.pow(y - meanY, 2), 0);
    const ssResidual = data.reduce((s, y, i) => s + Math.pow(y - (slope * (i + 1) + intercept), 2), 0);
    const r2        = ssTotal === 0 ? 1 : 1 - ssResidual / ssTotal;

    return { slope, intercept, r2 };
  }

  /* ─── 4. Forecast: Moving Average ─── */
  function forecastMA(data, period, horizon) {
    if (data.length < period) return Array(horizon).fill(null);
    const lastWindow = data.slice(-period);
    const lastMA     = lastWindow.reduce((a, b) => a + b, 0) / period;
    // Simple flat forecast after last MA
    return Array(horizon).fill(Math.max(0, Math.round(lastMA)));
  }

  /* ─── 5. Forecast: Linear Regression ─── */
  function forecastLR(data, horizon) {
    const { slope, intercept } = linearRegression(data);
    const n = data.length;
    return Array.from({ length: horizon }, (_, i) => {
      const x = n + i + 1;
      return Math.max(0, Math.round(slope * x + intercept));
    });
  }

  /* ─── 6. Forecast: Exponential Smoothing ─── */
  function forecastES(data, horizon, alpha = 0.3) {
    const smoothed = exponentialSmoothing(data, alpha);
    const lastVal  = smoothed[smoothed.length - 1] || 0;
    // Simple flat from last smoothed value
    return Array(horizon).fill(Math.max(0, Math.round(lastVal)));
  }

  /* ─── 7. Akurasi Metrics ─── */

  function mae(actual, predicted) {
    // Mean Absolute Error
    if (!actual.length || actual.length !== predicted.length) return NaN;
    const n = Math.min(actual.length, predicted.length);
    return actual.slice(0, n).reduce((s, a, i) => s + Math.abs(a - predicted[i]), 0) / n;
  }

  function rmse(actual, predicted) {
    // Root Mean Squared Error
    if (!actual.length || actual.length !== predicted.length) return NaN;
    const n = Math.min(actual.length, predicted.length);
    return Math.sqrt(actual.slice(0, n).reduce((s, a, i) => s + Math.pow(a - predicted[i], 2), 0) / n);
  }

  function mape(actual, predicted) {
    // Mean Absolute Percentage Error
    const n = Math.min(actual.length, predicted.length);
    const nonZero = actual.slice(0, n).filter(v => v !== 0);
    if (!nonZero.length) return NaN;
    return actual.slice(0, n).reduce((s, a, i) => {
      return a !== 0 ? s + Math.abs((a - predicted[i]) / a) : s;
    }, 0) / nonZero.length * 100;
  }

  /* ─── 8. Fitted values untuk in-sample accuracy ─── */
  function fittedLR(data) {
    const { slope, intercept } = linearRegression(data);
    return data.map((_, i) => Math.max(0, Math.round(slope * (i + 1) + intercept)));
  }

  function fittedMA(data, period) {
    if (data.length < period) return data.slice();
    const fitted = Array(period - 1).fill(null);
    for (let i = period - 1; i < data.length; i++) {
      const w = data.slice(i - period + 1, i + 1);
      fitted.push(Math.round(w.reduce((a, b) => a + b, 0) / period));
    }
    return fitted;
  }

  /* ─── 9. Generate forecast dengan semua metrics ─── */
  function generateForecast(data, method, horizon, period = 3) {
    let forecastValues = [];
    let fittedValues   = [];
    let modelInfo      = {};

    switch (method) {
      case 'ma3':
        forecastValues = forecastMA(data, 3, horizon);
        fittedValues   = fittedMA(data, 3).filter(v => v !== null);
        modelInfo      = { name: 'Moving Average (3 Periode)', period: 3 };
        break;
      case 'ma6':
        forecastValues = forecastMA(data, 6, horizon);
        fittedValues   = fittedMA(data, 6).filter(v => v !== null);
        modelInfo      = { name: 'Moving Average (6 Periode)', period: 6 };
        break;
      case 'lr':
        forecastValues = forecastLR(data, horizon);
        fittedValues   = fittedLR(data);
        modelInfo      = { ...linearRegression(data), name: 'Regresi Linear' };
        break;
      case 'es':
        forecastValues = forecastES(data, horizon, 0.3);
        fittedValues   = exponentialSmoothing(data, 0.3).map(v => Math.round(v));
        modelInfo      = { name: 'Exponential Smoothing (alpha=0.3)', alpha: 0.3 };
        break;
      default:
        forecastValues = forecastMA(data, 3, horizon);
    }

    // Compute accuracy only if we have enough data
    const actualForAccuracy = data.slice(data.length - fittedValues.length);
    const maeVal  = mae(actualForAccuracy, fittedValues);
    const rmseVal = rmse(actualForAccuracy, fittedValues);
    const mapeVal = mape(actualForAccuracy, fittedValues);

    return {
      forecast:    forecastValues,
      fitted:      fittedValues,
      mae:         isNaN(maeVal)  ? null : maeVal,
      rmse:        isNaN(rmseVal) ? null : rmseVal,
      mape:        isNaN(mapeVal) ? null : mapeVal,
      modelInfo,
    };
  }

  /* ─── Interpret MAPE ─── */
  function interpretMape(mapeVal) {
    if (mapeVal === null || isNaN(mapeVal)) return { label: 'N/A', color: 'badge-gray' };
    if (mapeVal < 5)  return { label: 'Sangat Akurat',   color: 'badge-green' };
    if (mapeVal < 10) return { label: 'Akurat',           color: 'badge-green' };
    if (mapeVal < 20) return { label: 'Cukup Akurat',     color: 'badge-amber' };
    if (mapeVal < 50) return { label: 'Kurang Akurat',    color: 'badge-amber' };
    return               { label: 'Tidak Akurat',         color: 'badge-red' };
  }

  return {
    movingAverage, exponentialSmoothing, linearRegression,
    forecastMA, forecastLR, forecastES,
    mae, rmse, mape,
    fittedLR, fittedMA,
    generateForecast, interpretMape,
  };

})();
