// Empaquetador: convierte src/ en un único HTML autocontenido (docs/index.html).
// Uso: node build.mjs        (no necesita instalar nada, solo Node 18+)
//
// Qué hace:
//  1. Lee src/index.html.
//  2. Sustituye cada <link rel="stylesheet" href="..."> local por un <style> con su CSS,
//     y mete fuentes/imágenes referenciadas con url(...) como data-URI.
//  3. Une los scripts del bloque <!-- build:scripts --> en un solo <script>, dentro de
//     (()=>{ 'use strict'; ... })(); — igual que estaba el juego original.
//  4. Escribe docs/index.html: es a la vez la web de GitHub Pages y el archivo para jugar offline.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = join(ROOT, 'src');
const OUT = join(ROOT, 'docs', 'index.html');

const MIME = { '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.gif': 'image/gif', '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg', '.wav': 'audio/wav', '.glb': 'model/gltf-binary' };

const isLocal = (p) => !/^(https?:|data:|\/\/)/.test(p);
const dataUri = (file) => {
  const mime = MIME[extname(file).toLowerCase()];
  if (!mime) throw new Error(`Tipo de archivo sin MIME conocido: ${file}`);
  return `data:${mime};base64,${readFileSync(file).toString('base64')}`;
};

function inlineCss(cssPath) {
  const css = readFileSync(cssPath, 'utf8');
  return css.replace(/url\((['"]?)([^'")]+)\1\)/g, (m, q, url) =>
    isLocal(url) ? `url(${dataUri(join(dirname(cssPath), url))})` : m);
}

let html = readFileSync(join(SRC, 'index.html'), 'utf8');

// CSS
html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (m, href) =>
  isLocal(href) ? `<style>\n${inlineCss(join(SRC, href)).trim()}\n</style>` : m);

// JS: el bloque marcado se une en un único script
html = html.replace(/<!-- build:scripts[^>]*-->([\s\S]*?)<!-- \/build:scripts -->/, (m, block) => {
  const files = [...block.matchAll(/<script src="([^"]+)"><\/script>/g)].map((x) => x[1]);
  if (!files.length) throw new Error('El bloque build:scripts está vacío');
  const body = files.map((f) => {
    const code = readFileSync(join(SRC, f), 'utf8').replace(/^'use strict';\n/m, '');
    return `// ---- ${f} ----\n${code.trim()}`;
  }).join('\n\n');
  return `<script>\n(()=>{\n'use strict';\n${body}\n})();\n</script>`;
});

// Cualquier otro <script src> local suelto (por ejemplo librerías en vendor/)
html = html.replace(/<script src="([^"]+)"><\/script>/g, (m, src) =>
  isLocal(src) ? `<script>\n${readFileSync(join(SRC, src), 'utf8').replace(/<\/script/gi, '<\\/script')}\n</script>` : m);

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html);
console.log(`OK → ${OUT} (${(html.length / 1024).toFixed(0)} KB)`);
