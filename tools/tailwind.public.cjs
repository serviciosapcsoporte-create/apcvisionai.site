/** Tailwind v3 config compartido para las paginas estaticas (public/ + index.html).
 *  Mismo contenido que ejecuta hoy el Play CDN (v3.4.17) -> paridad visual.
 *  Nota: apc-cyan se deja #22D3EE (los archivos con #D4FF32 en su config
 *  jamas usan la clase *-apc-cyan, asi que no hay cambio visual). */
module.exports = {
  content: [
    './index.html',
    './Apc-Visionia.html',
    './public/**/*.html',
    './public/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'apc-lime': '#D4FF32',
        'apc-lime-hover': '#e2ff6b',
        'apc-green': '#22FF44',
        'apc-cyan': '#22D3EE',
        'apc-dark': '#070A12',
        'apc-dark2': '#0A0F1E',
        'apc-card': '#101728',
        'apc-navy': '#0F172A',
        'apc-teal': '#111C1A',
        'apc-footer': '#050812',
      },
    },
  },
  plugins: [],
}
