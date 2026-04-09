import { useEffect, useCallback, useRef } from 'react';

const PARTICLE_COUNT = 90;
const CONNECTION_DISTANCE = 120;
const CURSOR_ATTRACT_RADIUS = 150;

const ParticleField = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1, y: -1, active: false });
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const idleTimerRef = useRef(null);

  // Initialize particles
  const initParticles = useCallback((width, height) => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      speedX: (Math.random() - 0.5) * 1.8,
      speedY: (Math.random() - 0.5) * 1.8,
      hue: Math.floor(Math.random() * 60) + 200,
    }));
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
    clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      mouseRef.current.active = false;
    }, 2000);
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      if (particlesRef.current.length === 0) {
        particlesRef.current = initParticles(canvas.width, canvas.height);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const { x: mx, y: my, active } = mouseRef.current;
      const particles = particlesRef.current;

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (active) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CURSOR_ATTRACT_RADIUS) {
            const attraction = (1 - dist / CURSOR_ATTRACT_RADIUS) * 0.6;
            p.speedX += dx * attraction * 0.008;
            p.speedY += dy * attraction * 0.008;
          }
        } else {
          p.speedX += (Math.random() - 0.5) * 0.12;
          p.speedY += (Math.random() - 0.5) * 0.12;
        }

        // Damping
        p.speedX *= 0.985;
        p.speedY *= 0.985;

        // Clamp speed
        const maxSpd = 1.8;
        p.speedX = Math.max(-maxSpd, Math.min(maxSpd, p.speedX));
        p.speedY = Math.max(-maxSpd, Math.min(maxSpd, p.speedY));

        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.15;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(139, 146, 255, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw cursor connections
      if (active) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CURSOR_ATTRACT_RADIUS) {
            const opacity = (1 - dist / CURSOR_ATTRACT_RADIUS) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(99, 179, 255, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 75%, 65%, ${p.opacity})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 75%, 65%, ${p.opacity * 0.15})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      clearTimeout(idleTimerRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 pointer-events-auto"
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticleField;
