/**
 * atmosphere — la capa atmosférica compartida del sitio.
 *
 * startDust(canvas, { density }) pinta el polvo dorado: motas que
 * ascienden y titilan, con una fracción de destellos con glow. Corre en
 * su propio rAF (el navegador lo pausa en background) y pinta un primer
 * frame síncrono para que nunca arranque vacío. Devuelve el cleanup.
 *
 * GRAIN es el grano de película (feTurbulence embebido, sin requests):
 * usar como backgroundImage con opacidad ~0.05 y mix-blend overlay.
 */

export const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

export function startDust(canvas, { density = 16000 } = {}) {
  const ctx = canvas.getContext('2d');
  let W = 0;
  let H = 0;
  let parts = [];

  const spawn = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(90, (W * H) / density));
    parts = Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.6 + Math.random() * 1.5,
      vy: 5 + Math.random() * 14,
      sway: 4 + Math.random() * 10,
      ph: Math.random() * Math.PI * 2,
      tw: 0.4 + Math.random() * 1.4,
      spark: Math.random() < 0.18,
    }));
  };

  let last = performance.now();
  const draw = (now) => {
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    const t = now / 1000;
    ctx.clearRect(0, 0, W, H);
    for (const p of parts) {
      p.y -= p.vy * dt;
      if (p.y < -4) {
        p.y = H + 4;
        p.x = Math.random() * W;
      }
      const x = p.x + Math.sin(t * p.tw + p.ph) * p.sway;
      const a = (p.spark ? 0.75 : 0.4) * (0.55 + 0.45 * Math.sin(t * p.tw * 2 + p.ph));
      ctx.beginPath();
      ctx.arc(x, p.y, p.spark ? p.r * 1.4 : p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(214,181,140,${Math.max(a, 0)})`;
      ctx.shadowBlur = p.spark ? 12 : 0;
      ctx.shadowColor = 'rgba(198,164,126,0.9)';
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  };

  spawn();
  draw(performance.now());

  let raf;
  const loop = (now) => {
    raf = requestAnimationFrame(loop);
    draw(now);
  };
  raf = requestAnimationFrame(loop);
  window.addEventListener('resize', spawn);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', spawn);
  };
}
