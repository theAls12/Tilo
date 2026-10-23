# Tilo y la Estrella

Plataformas 2D de teatro de papel: Tilo recorre tres actos para recuperar la estrella.
Se juega en el navegador, con teclado o con controles táctiles en el móvil.

**Jugar online:** https://theals12.github.io/Tilo/
**Jugar offline:** descarga [`docs/index.html`](docs/index.html) (botón *Download raw file*) y ábrelo con doble clic. Lleva todo dentro: no necesita internet.

## Controles

| Tecla | Acción |
|---|---|
| ← → / A D | Moverse |
| ↑ / W / Z | Saltar |
| Espacio | Espadazo |
| Esc | Pausa |
| M | Sonido |
| F | Pantalla completa |

## Cómo está organizado

```
src/                 ← el juego, partido en archivos (aquí es donde se edita)
  index.html         ← la página: menús, botones táctiles y la lista de scripts
  css/
    fonts.css        ← tipografías (Lilita One y Nunito)
    style.css        ← estilos de menús, tarjetas, botones y controles táctiles
  js/                ← se cargan en este orden
    01-canvas.js       lienzo de 960×540 y escalado a la pantalla
    02-helpers.js      utilidades de dibujo, colores y textura de papel
    03-stickers.js     pegatinas: sprites con borde blanco recortado
    04-levels.js       temas visuales y mapas de los 3 actos
    05-scenery.js      cielo, colinas, árboles, terreno y telón
    06-characters.js   Tilo, enemigos, estrella y objetos
    07-audio.js        efectos y música (Web Audio, sin archivos de sonido)
    08-state.js        estado de la partida, guardado y carga de niveles
    09-input.js        teclado y controles táctiles
    10-flow.js         telón, menús, pausa, pantalla completa
    11-physics.js      física y colisiones
    12-particles.js    confeti, recortes y anillos
    13-update.js       lógica de cada fotograma
    14-render.js       dibujo de cada fotograma
    15-main.js         arranque y bucle principal
  assets/fonts/      ← archivos .woff2
build.mjs            ← empaquetador: junta src/ en un solo HTML
docs/index.html      ← resultado del build (lo que sirve GitHub Pages y el archivo offline)
```

## Editar y publicar

1. Cambia lo que necesites en `src/`. Para probarlo, abre `src/index.html` en el navegador.
2. Ejecuta `node build.mjs` (necesita [Node.js](https://nodejs.org) 18 o superior; no hay que instalar nada más).
3. Sube los cambios. GitHub Pages publica `docs/index.html` en un par de minutos.

Los mapas de los niveles están en `src/js/04-levels.js` y la física (gravedad, velocidad, salto) al principio de `src/js/13-update.js`.
