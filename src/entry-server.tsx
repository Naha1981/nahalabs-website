import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { Writable } from 'node:stream';
import App from './App';
import type { Bundle } from './components/GeneratedInsightPage';

/**
 * Build-time renderer used by scripts/prerender.mjs.
 * Renders the app for a given path and resolves once every Suspense boundary
 * (including lazy routes) has produced markup, so crawlers that do not run
 * JavaScript receive the real page content.
 */
export function render(pathname: string, bundle: Bundle | null = null): Promise<string> {
  (globalThis as { __SSR_PATH__?: string }).__SSR_PATH__ = pathname;
  (globalThis as { __SSR_BUNDLE__?: Bundle | null }).__SSR_BUNDLE__ = bundle;

  return new Promise((resolve, reject) => {
    let html = '';
    const sink = new Writable({
      write(chunk, _enc, cb) {
        html += chunk.toString();
        cb();
      },
    });
    sink.on('finish', () => resolve(html));

    const { pipe } = renderToPipeableStream(
      <StrictMode>
        <App />
      </StrictMode>,
      {
        onAllReady() {
          pipe(sink);
        },
        onShellError: reject,
        onError(err) {
          console.warn('[prerender] render warning:', err);
        },
      }
    );
  });
}
