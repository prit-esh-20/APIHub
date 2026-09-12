'use client';

import { motion } from 'framer-motion';

export default function HeroVisual() {
  return (
    <div
      className="relative w-full aspect-square max-w-[600px] mx-auto"
      aria-hidden="true"
      role="img"
      aria-label="APIHub 3D visualization showing interconnected API nodes"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 via-transparent to-brand-cyan/10 rounded-3xl" aria-hidden="true" />

      <div className="relative z-10 w-full h-full" style={{ perspective: '1000px' }}>
        <motion.div
          className="absolute inset-0"
          animate={{
            rotateX: [0, 2, -2, 0],
            rotateY: [0, -3, 3, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d' }}
          aria-hidden="true"
        >
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-brand-purple/20 border border-brand-purple/30"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `translateZ(${Math.random() * 200 - 100}px)`,
                transformStyle: 'preserve-3d',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut',
              }}
              aria-hidden="true"
            />
          ))}

          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            style={{ transformStyle: 'preserve-3d', boxShadow: '0 0 60px #8B5CF680' }}
            aria-hidden="true"
          >
            <span className="text-white font-bold text-2xl">APIHub</span>
          </motion.div>

          {[
            { label: 'Build', color: '#22C55E', x: -140, y: -60, z: -40, delay: 0.5 },
            { label: 'Test', color: '#F59E0B', x: 140, y: -60, z: -40, delay: 0.6 },
            { label: 'Automate', color: '#A855F7', x: -140, y: 60, z: 40, delay: 0.7 },
            { label: 'Mock', color: '#14B8A6', x: 140, y: 60, z: 40, delay: 0.8 },
            { label: 'Document', color: '#3B82F6', x: -100, y: 0, z: 120, delay: 0.9 },
            { label: 'Monitor', color: '#F97316', x: 100, y: 0, z: -120, delay: 1.0 },
          ].map((node, i) => (
            <motion.div
              key={node.label}
              className="absolute flex flex-col items-center gap-2"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate3d(${node.x}px, ${node.y}px, ${node.z}px)`,
                transformStyle: 'preserve-3d',
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -8, 8, 0],
              }}
              transition={{
                duration: 0.6,
                delay: node.delay,
                ease: 'easeOut',
                y: { duration: 4, repeat: Infinity, delay: node.delay + i * 0.5, ease: 'easeInOut' },
              }}
            >
              <motion.div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-semibold text-sm"
                style={{ backgroundColor: node.color, boxShadow: `0 0 30px ${node.color}60` }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              >
                {node.label}
              </motion.div>
              <motion.div
                className="w-px h-24 bg-gradient-to-b from-transparent via-brand-purple/30 to-transparent"
                style={{ transformOrigin: 'top center' }}
                animate={{ scaleY: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}