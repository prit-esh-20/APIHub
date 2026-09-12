'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface EndpointNode {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  label: string;
  angle: number;
  distance: number;
  delay: number;
}

const methodColors: Record<string, string> = {
  GET: '#22C55E',
  POST: '#F59E0B',
  PUT: '#3B82F6',
  PATCH: '#A855F7',
  DELETE: '#EF4444',
};

const endpointNodes: EndpointNode[] = [
  { id: 'users', method: 'GET', label: '/users', angle: -Math.PI / 2, distance: 160, delay: 0.2 },
  { id: 'posts', method: 'POST', label: '/posts', angle: -Math.PI / 4, distance: 180, delay: 0.3 },
  { id: 'comments', method: 'PUT', label: '/comments', angle: 0, distance: 170, delay: 0.4 },
  { id: 'albums', method: 'PATCH', label: '/albums', angle: Math.PI / 4, distance: 180, delay: 0.5 },
  { id: 'photos', method: 'DELETE', label: '/photos', angle: Math.PI / 2, distance: 160, delay: 0.6 },
  { id: 'auth', method: 'POST', label: '/auth', angle: Math.PI * 0.75, distance: 190, delay: 0.7 },
];

const BRAND_PURPLE = '#8B5CF6';
const BRAND_CYAN = '#22D3EE';

export default function HeroVisual() {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const drawConnections = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      endpointNodes.forEach((node) => {
        const nodeX = centerX + Math.cos(node.angle) * node.distance + mouseX * 0.08;
        const nodeY = centerY + Math.sin(node.angle) * node.distance + mouseY * 0.08;

        const gradient = ctx.createLinearGradient(centerX, centerY, nodeX, nodeY);
        gradient.addColorStop(0, `${BRAND_PURPLE}40`);
        gradient.addColorStop(0.5, `${BRAND_CYAN}30`);
        gradient.addColorStop(1, `${methodColors[node.method]}40`);

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.quadraticCurveTo(
          centerX + (nodeX - centerX) * 0.5 + Math.sin(Date.now() * 0.001 + node.angle) * 15,
          centerY + (nodeY - centerY) * 0.5 + Math.cos(Date.now() * 0.001 + node.angle) * 10,
          nodeX,
          nodeY
        );
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      const pulseRadius = 40 + Math.sin(Date.now() * 0.003) * 8;
      const pulseGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseRadius);
      pulseGradient.addColorStop(0, `${BRAND_PURPLE}20`);
      pulseGradient.addColorStop(0.5, `${BRAND_CYAN}10`);
      pulseGradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = pulseGradient;
      ctx.fill();
    };

    const animate = () => {
      if (prefersReducedMotion) return;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.08;
      drawConnections();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [prefersReducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    targetMouseRef.current.x = (e.clientX - rect.left - rect.width / 2) * 0.5;
    targetMouseRef.current.y = (e.clientY - rect.top - rect.height / 2) * 0.5;
  };

  if (!mounted) {
    return (
      <div
        className="relative w-full aspect-square max-w-[500px] mx-auto"
        aria-hidden="true"
        role="img"
        aria-label="APIHub API network visualization"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 via-transparent to-brand-cyan/10 rounded-3xl flex items-center justify-center" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        targetMouseRef.current = { x: 0, y: 0 };
      }}
      className="relative w-full aspect-square max-w-[600px] mx-auto"
      aria-hidden="true"
      role="img"
      aria-label="APIHub API network visualization showing connected endpoints"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 via-transparent to-brand-cyan/5 rounded-3xl" aria-hidden="true" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full h-full" style={{ perspective: '1000px' }}>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.03, 1],
            boxShadow: [
              '0 0 40px #8B5CF640, 0 0 80px #22D3EE20',
              '0 0 60px #8B5CF660, 0 0 100px #22D3EE30',
              '0 0 40px #8B5CF640, 0 0 80px #22D3EE20',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center relative">
            <span className="text-white font-bold text-2xl tracking-tight">API</span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-cyan opacity-30 blur-xl" />
          </div>
        </motion.div>

        {endpointNodes.map((node) => {
          const color = methodColors[node.method];
          const x = Math.cos(node.angle) * node.distance;
          const y = Math.sin(node.angle) * node.distance;

          return (
            <motion.div
              key={node.id}
              className="absolute flex flex-col items-center gap-1.5"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0)`,
                transformStyle: 'preserve-3d',
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: prefersReducedMotion ? 0 : [0, -6, 6, 0],
              }}
              transition={{
                duration: 0.6,
                delay: node.delay,
                ease: 'easeOut',
                y: prefersReducedMotion ? undefined : { duration: 3, repeat: Infinity, delay: node.delay, ease: 'easeInOut' },
              }}
            >
              <motion.div
                className="flex flex-col items-center gap-1"
                animate={prefersReducedMotion ? {} : { scale: [1, 1.04, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: node.delay }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center relative text-white font-semibold text-xs"
                  style={{ backgroundColor: color, boxShadow: `0 0 30px ${color}60` }}
                >
                  {node.method}
                </div>
                <span className="text-text-secondary text-xs font-mono whitespace-nowrap px-2 py-0.5 rounded bg-panel/80 backdrop-blur-sm border border-border/50">
                  {node.label}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}