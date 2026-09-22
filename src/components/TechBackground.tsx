import React, { useEffect, useRef } from 'react';

export const TechBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  // Direct DOM cursor spotlight tracking without React state re-renders
  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (spotlightRef.current) {
            spotlightRef.current.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let isVisible = true;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Optimized particle count based on screen size (drastically lower CPU footprint)
    const isMobile = width < 768;
    const nodeCount = isMobile ? 16 : Math.min(Math.floor((width * height) / 45000), 32);

    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }> = [];

    const colors = [
      'rgba(6, 182, 212, 0.6)',
      'rgba(16, 185, 129, 0.5)',
      'rgba(139, 92, 246, 0.5)'
    ];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 1,
        color: colors[i % colors.length]
      });
    }

    let lastTime = performance.now();

    const render = (now: number) => {
      if (!isVisible) return;

      // Cap to ~30-60fps smoothly without overloading main thread
      const delta = now - lastTime;
      if (delta < 24) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // Single batched path for matrix grid (10x faster than individual stroke calls)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = isMobile ? 64 : 48;

      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Update and draw network connections (single batched stroke)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
      ctx.lineWidth = 0.75;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 14400) { // 120^2
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
          }
        }
      }
      ctx.stroke();

      // Draw particle nodes without expensive shadowBlur
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Defer particle animation until CPU is completely idle and page has fully painted
    let timerId: any;
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        animationFrameId = requestAnimationFrame(render);
      }, { timeout: 800 });
    } else {
      timerId = setTimeout(() => {
        animationFrameId = requestAnimationFrame(render);
      }, 500);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#070a12] will-change-transform">
      {/* Interactive Cursor Spotlight Glow (GPU accelerated) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-1000px, -1000px, 0)' }}
      />

      {/* Ambient Static Glows */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[450px] h-[450px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/4 w-[500px] h-[400px] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Cyberpunk Grid Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full opacity-60" />

      {/* Radial Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#070a12]/50 to-[#070a12]" />
    </div>
  );
};
