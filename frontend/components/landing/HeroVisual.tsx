'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface EndpointNode {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  label: string;
  x: number;
  y: number;
  delay: number;
}

const methodColors: Record<EndpointNode['method'], string> = {
  GET: '#22C55E',
  POST: '#F59E0B',
  PUT: '#3B82F6',
  PATCH: '#A855F7',
  DELETE: '#EF4444',
};

const BRAND_PURPLE = '#8B5CF6';
const BRAND_CYAN = '#22D3EE';

/*
 * Five API endpoints arranged evenly around the center.
 *
 * The SVG uses a 600 × 600 coordinate system.
 * Center = (300, 300)
 *
 * The nodes are positioned around the center with
 * equal angular spacing and approximately equal radius.
 */
const endpointNodes: EndpointNode[] = [
  {
    id: 'users',
    method: 'GET',
    label: '/users',
    x: 300,
    y: 80,
    delay: 0.15,
  },
  {
    id: 'posts',
    method: 'POST',
    label: '/posts',
    x: 510,
    y: 232,
    delay: 0.25,
  },
  {
    id: 'comments',
    method: 'PUT',
    label: '/comments',
    x: 430,
    y: 475,
    delay: 0.35,
  },
  {
    id: 'albums',
    method: 'PATCH',
    label: '/albums',
    x: 170,
    y: 475,
    delay: 0.45,
  },
  {
    id: 'photos',
    method: 'DELETE',
    label: '/photos',
    x: 90,
    y: 232,
    delay: 0.55,
  },
];

export default function HeroVisual() {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  /*
   * Lightweight loading state.
   */
  if (!mounted) {
    return (
      <div
        className="relative w-full aspect-square max-w-[600px] mx-auto"
        aria-hidden="true"
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-purple/5 via-transparent to-brand-cyan/5" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-cyan opacity-80" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full aspect-square max-w-[600px] mx-auto"
      role="img"
      aria-label="APIHub API network visualization showing connected API endpoints"
    >
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-purple/5 via-transparent to-brand-cyan/5"
        aria-hidden="true"
      />

      {/* Ambient purple glow */}
      <div
        className="
          absolute left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          w-72 h-72
          rounded-full
          bg-brand-purple/10
          blur-3xl
        "
        aria-hidden="true"
      />

      {/* Ambient cyan glow */}
      <div
        className="
          absolute left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          w-56 h-56
          rounded-full
          bg-brand-cyan/5
          blur-3xl
        "
        aria-hidden="true"
      />

      {/* =========================================================
          SVG CONNECTION NETWORK
      ========================================================= */}

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          {/* Connection gradient */}
          <linearGradient
            id="connectionGradient"
            x1="300"
            y1="300"
            x2="500"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0"
              stopColor={BRAND_PURPLE}
              stopOpacity="0.55"
            />

            <stop
              offset="0.5"
              stopColor={BRAND_CYAN}
              stopOpacity="0.3"
            />

            <stop
              offset="1"
              stopColor={BRAND_CYAN}
              stopOpacity="0.12"
            />
          </linearGradient>

          {/* Center glow */}
          <radialGradient id="centerGlow">
            <stop
              offset="0"
              stopColor={BRAND_PURPLE}
              stopOpacity="0.22"
            />

            <stop
              offset="0.5"
              stopColor={BRAND_CYAN}
              stopOpacity="0.08"
            />

            <stop
              offset="1"
              stopColor={BRAND_CYAN}
              stopOpacity="0"
            />
          </radialGradient>
        </defs>

        {/* =====================================================
            CENTRAL GLOW
        ===================================================== */}

        <circle
          cx="300"
          cy="300"
          r="120"
          fill="url(#centerGlow)"
        />

        {/* =====================================================
            CONNECTION LINES
        ===================================================== */}

        {endpointNodes.map((node) => {
          const controlX = (300 + node.x) / 2;
          const controlY = (300 + node.y) / 2;

          return (
            <motion.path
              key={`connection-${node.id}`}
              d={`
                M 300 300
                Q ${controlX} ${controlY}
                ${node.x} ${node.y}
              `}
              stroke="url(#connectionGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{
                pathLength: 0,
                opacity: 0,
              }}
              animate={{
                pathLength: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                delay: node.delay,
                ease: 'easeOut',
              }}
            />
          );
        })}

        {/* =====================================================
            CONNECTION DOTS
        ===================================================== */}

        {endpointNodes.map((node) => (
          <circle
            key={`dot-${node.id}`}
            cx={node.x}
            cy={node.y}
            r="3"
            fill={methodColors[node.method]}
            opacity="0.5"
          />
        ))}
      </svg>

      {/* =========================================================
          CENTRAL APIHUB CORE
      ========================================================= */}

      <div
        className="absolute left-1/2 top-1/2"
        style={{
          transform: 'translate(-50%, -50%)',
          perspective: '1000px',
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: prefersReducedMotion
              ? 1
              : [1, 1.025, 1],
          }}
          transition={
            prefersReducedMotion
              ? {
                  duration: 0.5,
                }
              : {
                  opacity: {
                    duration: 0.6,
                  },
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }
          }
          className="relative"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Outer glow */}
          <div
            className="absolute -inset-8 rounded-[2rem] blur-2xl opacity-30"
            style={{
              background: `linear-gradient(135deg, ${BRAND_PURPLE}, ${BRAND_CYAN})`,
            }}
            aria-hidden="true"
          />

          {/* Core */}
          <div
            className="
              relative
              w-28 h-28
              rounded-2xl
              border border-white/10
              bg-gradient-to-br from-brand-purple to-brand-cyan
              flex items-center justify-center
              shadow-2xl
            "
            style={{
              boxShadow: `
                0 0 35px ${BRAND_PURPLE}45,
                0 0 70px ${BRAND_CYAN}20
              `,
            }}
          >
            {/* Inner glass layer */}
            <div
              className="
                absolute inset-[2px]
                rounded-[14px]
                bg-[#111827]/20
                backdrop-blur-sm
              "
            />

            <div className="relative z-10 flex flex-col items-center">
              <span className="text-white text-2xl font-bold tracking-tight">
                API
              </span>

              <span className="text-white/70 text-[10px] font-medium tracking-[0.2em] uppercase mt-1">
                Hub
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          ENDPOINT NODES
      ========================================================= */}

      {endpointNodes.map((node) => {
        const color = methodColors[node.method];

        /*
         * IMPORTANT:
         *
         * This outer div controls the exact position.
         * Framer Motion does not control positioning.
         *
         * This avoids transform conflicts.
         */

        return (
          <div
            key={node.id}
            className="absolute"
            style={{
              left: `${(node.x / 600) * 100}%`,
              top: `${(node.y / 600) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Entrance animation */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.65,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.55,
                delay: node.delay,
                ease: 'easeOut',
              }}
            >
              {/* Floating animation */}
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        y: [0, -5, 0, 5, 0],
                      }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: node.delay,
                  ease: 'easeInOut',
                }}
                className="flex flex-col items-center gap-2"
              >
                {/* =================================================
                    METHOD CARD
                ================================================= */}

                <motion.div
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          scale: 1.08,
                          y: -2,
                        }
                  }
                  transition={{
                    duration: 0.18,
                  }}
                  className="relative"
                >
                  {/* Glow */}
                  <div
                    className="absolute inset-0 rounded-xl blur-lg opacity-30"
                    style={{
                      backgroundColor: color,
                    }}
                    aria-hidden="true"
                  />

                  {/* Method */}
                  <div
                    className="
                      relative
                      w-14 h-14
                      rounded-xl
                      flex items-center justify-center
                      text-white text-xs font-bold
                      border border-white/10
                      backdrop-blur-sm
                    "
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 0 25px ${color}35`,
                    }}
                  >
                    {node.method}
                  </div>
                </motion.div>

                {/* =================================================
                    ENDPOINT LABEL
                ================================================= */}

                <div
                  className="
                    px-2.5 py-1
                    rounded-md
                    bg-[#111827]/80
                    border border-[#263247]
                    backdrop-blur-md
                    whitespace-nowrap
                  "
                >
                  <span
                    className="
                      text-[#94A3B8]
                      text-[11px]
                      font-mono
                      tracking-tight
                    "
                  >
                    {node.label}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        );
      })}

      {/* =========================================================
          DECORATIVE MICRO DOTS
      ========================================================= */}

      <div
        className="absolute top-[17%] left-[17%] w-1.5 h-1.5 rounded-full bg-brand-purple/40"
        aria-hidden="true"
      />

      <div
        className="absolute top-[27%] right-[15%] w-1 h-1 rounded-full bg-brand-cyan/50"
        aria-hidden="true"
      />

      <div
        className="absolute bottom-[22%] right-[20%] w-1.5 h-1.5 rounded-full bg-brand-purple/30"
        aria-hidden="true"
      />

      <div
        className="absolute bottom-[17%] left-[28%] w-1 h-1 rounded-full bg-brand-cyan/40"
        aria-hidden="true"
      />

      {/* =========================================================
          SUBTLE VIGNETTE
      ========================================================= */}

      <div
        className="
          absolute inset-0
          rounded-3xl
          bg-gradient-to-t
          from-[#0B0F19]/35
          via-transparent
          to-transparent
          pointer-events-none
        "
        aria-hidden="true"
      />
    </div>
  );
}