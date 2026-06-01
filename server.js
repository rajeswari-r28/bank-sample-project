import express from 'express';
import { createReadStream, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { randomBytes } from 'crypto';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST   = join(__dirname, 'dist');
const PUBLIC = join(__dirname, 'public');

const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
  '.csv':  'text/csv',
  '.pdf':  'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xml':  'application/xml',
  '.txt':  'text/plain',
};

const app = express();

// Fresh ETag + Last-Modified on every response
app.use((req, res, next) => {
  res.set({
    'ETag':          `"${randomBytes(16).toString('hex')}"`,
    'Last-Modified': new Date().toUTCString(),
    'Cache-Control': 'no-cache',
  });
  next();
});

// Dynamic robots.txt — sitemap URL reflects the actual host
app.get('/robots.txt', (req, res) => {
  const base = `${req.protocol}://${req.get('host')}`;
  res.type('text/plain').send(
`User-agent: *
Allow: /
Allow: /calculators
Allow: /onboard
Disallow: /dashboard

Sitemap: ${base}/sitemap.xml`
  );
});

// Returns the most recent mtime among the given src files
function srcMtime(...files) {
  const times = files.map(f => {
    try { return statSync(join(__dirname, f)).mtimeMs; } catch { return 0; }
  });
  return new Date(Math.max(...times)).toISOString().replace(/\.\d{3}Z$/, '+00:00');
}

// Dynamic sitemap.xml — lastmod reflects actual source file change time
app.get('/sitemap.xml', (req, res) => {
  const base  = `${req.protocol}://${req.get('host')}`;
  const pages = [
    {
      path: '/',
      lastmod:    srcMtime('src/components/LandingPage.tsx', 'src/App.tsx'),
      changefreq: 'weekly',
      priority:   '1.0',
    },
    {
      path: '/calculators',
      lastmod:    srcMtime('src/components/EMICalculator.tsx', 'src/components/FDCalculator.tsx'),
      changefreq: 'monthly',
      priority:   '0.8',
    },
    {
      path: '/onboard',
      lastmod:    srcMtime('src/components/AccountOpeningWizard.tsx'),
      changefreq: 'monthly',
      priority:   '0.7',
    },
  ];

  const urls = pages.map(p => `
  <url>
    <loc>${base}${p.path}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('');

  res.type('application/xml').send(
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`
  );
});

// Serve static files — dist/ first, then public/ as fallback
app.use((req, res) => {
  let filePath = join(DIST, req.path === '/' ? 'index.html' : req.path);

  try {
    statSync(filePath);
  } catch {
    try {
      filePath = join(PUBLIC, req.path);
      statSync(filePath);
    } catch {
      filePath = join(DIST, 'index.html');
    }
  }

  const ext = extname(filePath);
  res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
  createReadStream(filePath).pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
