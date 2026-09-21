import { StrictMode } from 'react';
import { renderToPipeableStream, renderToString } from 'react-dom/server';
import { Writable } from 'node:stream';
import App from './App';
import { LeadFollowUpAutomationPage } from './components/LeadFollowUpAutomationPage';

/**
 * Build-time renderer used by scripts/prerender.mjs.
 * Renders the app for a given path and resolves once every Suspense boundary
 * (including lazy routes) has produced markup, so crawlers that do not run
 * JavaScript receive the real page content.
 */
export function render(pathname: string): Promise<string> {
  (globalThis as { __SSR_PATH__?: string }).__SSR_PATH__ = pathname;

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

/** The lead follow-up service page is a separate entry point with its own mount node. */
export function renderLeadFollowUp(): string {
  return renderToString(
    <StrictMode>
      <LeadFollowUpAutomationPage />
    </StrictMode>
  );
}
