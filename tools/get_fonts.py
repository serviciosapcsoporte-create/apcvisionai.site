# -*- coding: utf-8 -*-
"""Descarga Inter + JetBrains Mono (woff2 variables, subset latin) y genera el CSS @font-face."""
import io, os, re, sys, urllib.request, ssl, datetime
sys.stdout.reconfigure(encoding='utf-8')

OUT_DIR = r'Y:\APC\Hosting APC\apcvisionai.site\public\fonts'
CSS_OUT = r'Y:\APC\Hosting APC\apcvisionai.site\tools\fonts.css'
UA = ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36')
URL = ('https://fonts.googleapis.com/css2?'
       'family=Inter:wght@100..900&family=JetBrains+Mono:wght@100..800&display=swap')

ctx = ssl.create_default_context()


def get(url, binary=False):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=60, context=ctx) as r:
        data = r.read()
    return data if binary else data.decode('utf-8')


css = get(URL)
print('CSS de Google: %d bytes' % len(css))

# separa los bloques por comentario de subconjunto  /* latin */
blocks = re.split(r'/\*\s*([a-z0-9\-\[\]]+)\s*\*/', css)
# blocks = ['', 'cyrillic', '@font-face{...}', 'latin-ext', '@font-face{...}', 'latin', ...]
found = {}
for i in range(1, len(blocks) - 1, 2):
    subset = blocks[i].strip()
    body = blocks[i + 1]
    if subset != 'latin':
        continue
    fam = re.search(r"font-family:\s*'([^']+)'", body)
    url = re.search(r'src:\s*url\(([^)]+)\)', body)
    ur = re.search(r'unicode-range:\s*([^;]+);', body)
    style = re.search(r'font-style:\s*([^;]+);', body)
    if not (fam and url):
        continue
    found[fam.group(1)] = {
        'url': url.group(1).strip("'\""),
        'range': ur.group(1).strip() if ur else None,
        'style': (style.group(1).strip() if style else 'normal'),
    }

if not found:
    print('NO se encontraron bloques /* latin */')
    print(css[:800])
    sys.exit(1)

os.makedirs(OUT_DIR, exist_ok=True)
faces = []
for fam, info in sorted(found.items()):
    slug = fam.lower().replace(' ', '-')
    dest = os.path.join(OUT_DIR, slug + '-latin.woff2')
    data = get(info['url'], binary=True)
    with open(dest, 'wb') as f:
        f.write(data)
    print('  %-18s %7.0f KiB  -> %s' % (fam, len(data) / 1024, os.path.basename(dest)))
    faces.append((fam, slug, info['style'], info['range'], len(data)))

css_out = ['/* Fuentes auto-hospedadas (Google Fonts, subset latin, variables).',
           '   Generado por tools/get_fonts.py - NO editar a mano. */']
for fam, slug, style, rng, size in faces:
    css_out.append(
        "@font-face {\n"
        "  font-family: '%s';\n"
        "  font-style: %s;\n"
        "  font-weight: 100 900;\n"
        "  font-display: swap;\n"
        "  src: url('/fonts/%s-latin.woff2') format('woff2');\n"
        "%s\n}"
        % (fam, style, slug, ('  unicode-range: %s;' % rng) if rng else '')
    )
with io.open(CSS_OUT, 'w', encoding='utf-8', newline='\n') as f:
    f.write('\n\n'.join(css_out) + '\n')
print()
print('CSS @font-face -> tools/fonts.css (%d bytes)' % os.path.getsize(CSS_OUT))
print(open(CSS_OUT, encoding='utf-8').read())
