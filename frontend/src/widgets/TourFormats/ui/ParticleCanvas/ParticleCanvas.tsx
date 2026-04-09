import { useEffect, useRef } from "react";
import type { ParticleType } from "../../model/tourFormats";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: ParticleType;
  rotation: number;
  vr: number;
  life: number;
  maxLife: number;
};

type Props = {
  active: boolean;
  particles: ParticleType[];
  accentColor: string;
};

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle, accentColor: string) {
  const { r, g, b } = hexToRgb(accentColor);
  const alpha = p.opacity * (1 - p.life / p.maxLife);

  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = alpha;

  switch (p.type) {
    case "lotus":
    case "light":
    case "gold_dust":
    case "neon_dots":
    case "city_lights":
    case "sparks":
    case "spark": {
      const g1 = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
      g1.addColorStop(0, `rgba(${r},${g},${b},1)`);
      g1.addColorStop(0.5, `rgba(${r},${g},${b},0.5)`);
      g1.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = g1;
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "snow": {
      ctx.strokeStyle = `rgba(220,240,255,${alpha})`;
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * p.size, Math.sin(angle) * p.size);
        ctx.stroke();
      }
      break;
    }
    case "leaf": {
      ctx.fillStyle = `rgba(60,120,50,${alpha})`;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.35, p.size, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "water_drops":
    case "fog": {
      ctx.fillStyle = `rgba(180,220,255,${alpha * 0.5})`;
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "dust":
    case "wind":
    case "trail": {
      const g2 = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
      g2.addColorStop(0, `rgba(180,140,80,${alpha})`);
      g2.addColorStop(1, `rgba(180,140,80,0)`);
      ctx.fillStyle = g2;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 1.8, p.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "rocks": {
      ctx.fillStyle = `rgba(120,110,100,${alpha})`;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const rr = p.size * (0.7 + (i % 2) * 0.3);
        if (i === 0) ctx.moveTo(Math.cos(angle) * rr, Math.sin(angle) * rr);
        else ctx.lineTo(Math.cos(angle) * rr, Math.sin(angle) * rr);
      }
      ctx.closePath();
      ctx.fill();
      break;
    }
    case "mud": {
      ctx.fillStyle = `rgba(100,70,30,${alpha})`;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.7, p.size, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "lantern":
    case "confetti":
    case "prayer_flags":
    case "incense": {
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.fillRect(-p.size * 0.25, -p.size * 0.5, p.size * 0.5, p.size);
      break;
    }
    default: {
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

export function ParticleCanvas({ active, particles, accentColor }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ active, particles, accentColor });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const timerRef = useRef(0);

  useEffect(() => {
    stateRef.current = { active, particles, accentColor };
    if (!active) particlesRef.current = [];
  }, [active, particles, accentColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (): Particle => {
      const { particles } = stateRef.current;
      const type = particles[Math.floor(Math.random() * particles.length)];
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -(Math.random() * 1.8 + 0.6),
        size: Math.random() * 12 + 5,
        opacity: Math.random() * 0.5 + 0.4,
        type,
        rotation: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.05,
        life: 0,
        maxLife: Math.random() * 100 + 80,
      };
    };

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { active, accentColor } = stateRef.current;

      if (active) {
        timerRef.current++;
        if (timerRef.current % 3 === 0) particlesRef.current.push(spawn());
      }

      particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vr;
        p.life++;
        drawParticle(ctx, p, accentColor);
      }
    };

    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 4,
        borderRadius: "inherit",
      }}
    />
  );
}