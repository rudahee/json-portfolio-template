/**
 * Where the content lives (text, works and images).
 *
 * Empty REMOTE_BASE  → uses what ships inside the site itself (public/assets).
 *                      Publishing a new work requires a redeploy.
 *
 * REMOTE_BASE with a URL → JSON and images are read at runtime from another
 *                      repository: upload the image, edit works.json, push,
 *                      done. If the remote doesn't respond, local JSON is
 *                      used instead. That repo needs two folders: data/ and
 *                      media/.
 *
 * Example: 'https://raw.githubusercontent.com/username/portfolio-content/main'
 * (the server needs to send CORS headers; GitHub raw does).
 */
const REMOTE_BASE = '';

// Relative (no leading slash) so it resolves against <base href>, which
// matters when the site is served from a subpath (e.g. GitHub Pages
// project sites at username.github.io/repo-name/).
const LOCAL_BASE = 'assets';

export const API_CONFIG = {
  remoteData: REMOTE_BASE ? `${REMOTE_BASE}/data` : null,
  localData: `${LOCAL_BASE}/data`,
  mediaBase: `${REMOTE_BASE || LOCAL_BASE}/media`,
  timeoutMs: 5000,
} as const;
