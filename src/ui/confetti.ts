interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  s: number;
  c: string;
  r: number;
  vr: number;
  life: number;
}

export function createConfetti(canvas: HTMLCanvasElement): { burst: (count: number) => void } {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("El canvas de confeti no tiene contexto 2D");
  let parts: Particle[] = [];
  let anim: number | null = null;

  function burst(count: number): void {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const colors = ["#ff9900", "#ec7211", "#38bdf8", "#22c55e", "#fbbf24", "#ffffff"];
    for (let i = 0; i < count; i++) {
      parts.push({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
        y: window.innerHeight * 0.45,
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 16 - 4,
        s: Math.random() * 7 + 4,
        c: colors[i % colors.length],
        r: Math.random() * 6,
        vr: (Math.random() - 0.5) * 0.3,
        life: 160 + Math.random() * 60,
      });
    }
    if (!anim) loop();
  }

  function loop(): void {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    parts.forEach((p) => {
      p.vy += 0.35;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      p.life--;
      ctx!.save();
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.r);
      ctx!.fillStyle = p.c;
      ctx!.globalAlpha = Math.max(0, Math.min(1, p.life / 40));
      ctx!.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      ctx!.restore();
    });
    parts = parts.filter((p) => p.life > 0 && p.y < canvas.height + 40);
    if (parts.length) anim = requestAnimationFrame(loop);
    else {
      anim = null;
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  return { burst };
}
