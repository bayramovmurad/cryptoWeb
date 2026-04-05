# 🚀 Crypto Ticker & Converter

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square) ![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?style=flat-square) ![License](https://img.shields.io/badge/License-Educational-lightgrey?style=flat-square)

A **real-time cryptocurrency dashboard and converter** built with **Next.js**. Track live crypto prices, search/filter coins, and instantly convert amounts to USD. Optimized for performance, responsive design, and clean architecture.  

---

## 🖥 Features

- 🔹 **Live crypto prices** from CoinGecko API
- 🔹 **Real-time USD converter** for selected coins
- 🔹 **Search & filter coins** by name or symbol
- 🔹 **Error handling** with retry options
- 🔹 **Performance optimized**
  - `useMemo`, `useCallback`, and `memo` to reduce re-renders
  - Polling with cleanup (`AbortController` + `setInterval`)
- 🔹 **Responsive design** for mobile, tablet, and desktop
- 🔹 **Clean architecture** with separation of concerns

---

## 📂 Project Structure

## ⚡ Getting Started

### 1. Install dependencies

```bash
npm install
npm run dev
