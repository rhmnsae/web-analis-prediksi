/**
 * prediksi.js — Algoritma Forecasting & Prediksi
 * Data Analis Platform
 */

const Prediksi = (() => {

  /* ─── 1. Moving Average (Simple) ─── */
  function movingAverage(data, period) {
    const p = Math.min(period, data.length);
    if (p === 0) return [];
    const result = [];
    for (let i = p - 1; i < data.length; i++) {
      const window = data.slice(i - p + 1, i + 1);
      result.push(window.reduce((a, b) => a + b, 0) / p);
    }
    return result;
  }

  /* ─── 1b. Weighted Moving Average (WMA) ─── */
  function weightedMovingAverage(data, period) {
    const p = Math.min(period, data.length);
    if (p === 0) return [];
    const result = [];
    const weightSum = (p * (p + 1)) / 2;
    for (let i = p - 1; i < data.length; i++) {
      const window = data.slice(i - p + 1, i + 1);
      let wma = 0;
      window.forEach((val, idx) => { wma += val * (idx + 1); });
      result.push(wma / weightSum);
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

  /* ─── 2b. Double Exponential Smoothing (Holt's Linear Trend) ─── */
  function doubleExponentialSmoothing(data, alpha = 0.3, beta = 0.2) {
    if (data.length < 2) return { level: data.slice(), trend: data.map(()=>0), fitted: data.slice() };
    const L = [data[0]];
    const T = [data[1] - data[0]];
    const F = [data[0]]; 
    
    for (let i = 1; i < data.length; i++) {
      const Lt = alpha * data[i] + (1 - alpha) * (L[i-1] + T[i-1]);
      const Tt = beta * (Lt - L[i-1]) + (1 - beta) * T[i-1];
      L.push(Lt);
      T.push(Tt);
      F.push(Math.max(0, Math.round(Lt + Tt)));
    }
    return { level: L, trend: T, fitted: F };
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
    const p = Math.min(period, data.length);
    if (p === 0) return Array(horizon).fill(0);
    const lastWindow = data.slice(-p);
    const lastMA     = lastWindow.reduce((a, b) => a + b, 0) / p;
    return Array(horizon).fill(Math.max(0, Math.round(lastMA)));
  }

  function forecastWMA(data, period, horizon) {
    const p = Math.min(period, data.length);
    if (p === 0) return Array(horizon).fill(0);
    const lastWindow = data.slice(-p);
    const weightSum = (p * (p + 1)) / 2;
    let wma = 0;
    lastWindow.forEach((val, idx) => { wma += val * (idx + 1); });
    const lastWMA = wma / weightSum;
    return Array(horizon).fill(Math.max(0, Math.round(lastWMA)));
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
    return Array(horizon).fill(Math.max(0, Math.round(lastVal)));
  }

  function forecastDES(data, horizon, alpha = 0.3, beta = 0.2) {
    if (data.length < 2) {
       if (data.length === 1) return Array(horizon).fill(data[0]);
       return Array(horizon).fill(0);
    }
    const res = doubleExponentialSmoothing(data, alpha, beta);
    const L_last = res.level[res.level.length - 1];
    const T_last = res.trend[res.trend.length - 1];
    
    const forecast = [];
    for(let h = 1; h <= horizon; h++) {
       forecast.push(Math.max(0, Math.round(L_last + h * T_last)));
    }
    return forecast;
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
    const p = Math.min(period, data.length);
    if (p === 0) return data.slice();
    const fitted = Array(p - 1).fill(null);
    for (let i = p - 1; i < data.length; i++) {
        const w = data.slice(i - p + 1, i + 1);
        fitted.push(Math.round(w.reduce((a, b) => a + b, 0) / p));
    }
    return fitted;
  }

  function fittedWMA(data, period) {
    const p = Math.min(period, data.length);
    if (p === 0) return data.slice();
    const fitted = Array(p - 1).fill(null);
    const weightSum = (p * (p + 1)) / 2;
    for (let i = p - 1; i < data.length; i++) {
      const w = data.slice(i - p + 1, i + 1);
      let wma = 0;
      w.forEach((val, idx) => { wma += val * (idx + 1); });
      fitted.push(Math.round(wma / weightSum));
    }
    return fitted;
  }

  function fittedDES(data, alpha = 0.3, beta = 0.2) {
    if (data.length < 2) return data.slice();
    // For arrays, the fitted values match closely with data length
    return doubleExponentialSmoothing(data, alpha, beta).fitted;
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
      case 'wma3':
        forecastValues = forecastWMA(data, 3, horizon);
        fittedValues   = fittedWMA(data, 3).filter(v => v !== null);
        modelInfo      = { name: 'Weighted Moving Average (3)', period: 3 };
        break;
      case 'wma6':
        forecastValues = forecastWMA(data, 6, horizon);
        fittedValues   = fittedWMA(data, 6).filter(v => v !== null);
        modelInfo      = { name: 'Weighted Moving Average (6)', period: 6 };
        break;
      case 'lr':
        forecastValues = forecastLR(data, horizon);
        fittedValues   = fittedLR(data);
        modelInfo      = { ...linearRegression(data), name: 'Regresi Linear' };
        break;
      case 'es':
        forecastValues = forecastES(data, horizon, 0.3);
        fittedValues   = exponentialSmoothing(data, 0.3).map(v => Math.round(v));
        modelInfo      = { name: 'Exponential Smoothing (α=0.3)', alpha: 0.3 };
        break;
      case 'des':
        forecastValues = forecastDES(data, horizon, 0.3, 0.2);
        fittedValues   = fittedDES(data, 0.3, 0.2);
        modelInfo      = { name: "Double Exponential Smoothing (Holt's)", alpha: 0.3, beta: 0.2 };
        break;
      default:
        forecastValues = forecastMA(data, 3, horizon);
        fittedValues   = fittedMA(data, 3).filter(v => v !== null);
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
