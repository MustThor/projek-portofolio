import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

const PARTICLE_COUNT = 120;

const generateParticles = () =>
  Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 5 + 2,
    opacity: Math.random() * 0.4 + 0.15,
    speedX: (Math.random() - 0.5) * 0.7,
    speedY: (Math.random() - 0.5) * 0.7,
    hue: Math.floor(Math.random() * 60) + 200, // blue-purple range
  }));

const ParticleField = () => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: -1, y: -1, active: false });
  const particlesRef = useRef(generateParticles());
  const [particles, setParticles] = useState(particlesRef.current);
  const animFrameRef = useRef(null);
  const idleTimerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    };

    // Reset idle timer
    clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      mouseRef.current.active = false;
    }, 2000);
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
  }, []);

  useEffect(() => {
    const animate = () => {
      const { x: mx, y: my, active } = mouseRef.current;
      const updated = particlesRef.current.map((p) => {
        let { x, y, speedX, speedY } = p;

        if (active) {
          // Attract towards cursor
          const dx = mx - x;
          const dy = my - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const attraction = Math.max(0, 1 - dist / 40) * 0.8;
          speedX += dx * attraction * 0.01;
          speedY += dy * attraction * 0.01;
        } else {
          // Active drift when idle — spread out more
          speedX += (Math.random() - 0.5) * 0.06;
          speedY += (Math.random() - 0.5) * 0.06;
        }

        // Damping
        speedX *= 0.96;
        speedY *= 0.96;

        // Clamp speed
        const maxSpeed = 0.9;
        speedX = Math.max(-maxSpeed, Math.min(maxSpeed, speedX));
        speedY = Math.max(-maxSpeed, Math.min(maxSpeed, speedY));

        x += speedX;
        y += speedY;

        // Wrap around edges
        if (x < -2) x = 102;
        if (x > 102) x = -2;
        if (y < -2) y = 102;
        if (y > 102) y = -2;

        return { ...p, x, y, speedX, speedY };
      });

      particlesRef.current = updated;
      setParticles([...updated]);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      clearTimeout(idleTimerRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 overflow-hidden pointer-events-auto"
      style={{ zIndex: 1 }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            background: `radial-gradient(circle, hsla(${p.hue}, 80%, 65%, 0.8), hsla(${p.hue}, 80%, 65%, 0.1))`,
            boxShadow: `0 0 ${p.size * 2}px hsla(${p.hue}, 80%, 65%, 0.3)`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleField;
