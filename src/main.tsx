// Ensure window.fetch can be assigned by third-party polyfills/harnesses without throwing
try {
  const originalFetch = window.fetch;
  let currentFetch = originalFetch;
  Object.defineProperty(window, 'fetch', {
    configurable: true,
    enumerable: true,
    get() {
      return currentFetch;
    },
    set(v) {
      currentFetch = v;
    },
  });
} catch {
  // Safe ignore if environment prohibits property redefinition
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
