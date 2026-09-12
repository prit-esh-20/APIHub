'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { ArrowRight, CheckCircle, Code2, TestTube2, Zap, Box, FileText, Activity } from 'lucide-react';

const stages = [
  {
    id: 'build',
    title: 'Build',
    description: 'Create requests, organize collections, define environments',
    icon: Code2,
    color: 'brand-purple',
    bgColor: 'bg-brand-purple/15',
    textColor: 'text-brand-purple',
    borderColor: 'border-brand-purple/30',
    comingSoon: false,
  },
  {
    id: 'test',
    title: 'Test',
    description: 'Write assertions, run test suites, validate responses',
    icon: TestTube2,
    color: 'feature-testing',
    bgColor: 'bg-feature-testing/15',
    textColor: 'text-feature-testing',
    borderColor: 'border-feature-testing/30',
    comingSoon: true,
  },
  {
    id: 'automate',
    title: 'Automate',
    description: 'Chain requests, extract variables, build workflows',
    icon: Zap,
    color: 'brand-cyan',
    bgColor: 'bg-brand-cyan/15',
    textColor: 'text-brand-cyan',
    borderColor: 'border-brand-cyan/30',
    comingSoon: true,
  },
  {
    id: 'mock',
    title: 'Mock',
    description: 'Create mock servers, simulate responses, test offline',
    icon: Box,
    color: 'feature-mocking',
    bgColor: 'bg-feature-mocking/15',
    textColor: 'text-feature-mocking',
    borderColor: 'border-feature-mocking/30',
    comingSoon: true,
  },
  {
    id: 'document',
    title: 'Document',
    description: 'Generate docs, share collections, publish references',
    icon: FileText,
    color: 'feature-documentation',
    bgColor: 'bg-feature-documentation/15',
    textColor: 'text-feature-documentation',
    borderColor: 'border-feature-documentation/30',
    comingSoon: true,
  },
  {
    id: 'monitor',
    title: 'Monitor',
    description: 'Schedule checks, track metrics, receive alerts',
    icon: Activity,
    color: 'feature-monitoring',
    bgColor: 'bg-feature-monitoring/15',
    textColor: 'text-feature-monitoring',
    borderColor: 'border-feature-monitoring/30',
    comingSoon: true,
  },
];

export default function Lifecycle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollY = useMotionValue(0);
  const scrollProgress = useSpring(scrollY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = 1 - Math.max(0, Math.min(1, rect.bottom / (windowHeight + rect.height)));
      scrollY.set(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  return (
    <section id="how-it-works" className="relative py-20 lg:py-28" aria-labelledby="lifecycle-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="px-3 py-1 bg-brand-purple/15 text-brand-purple text-sm font-medium rounded-full border border-brand-purple/30 mb-4 inline-block">
            API Lifecycle
          </span>
          <h2 id="lifecycle-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            One workspace for the <span className="text-gradient">entire API lifecycle</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            From writing your first request to monitoring production APIs — APIHub connects every stage.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative" style={{ height: '400px' }}>
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-purple/30 to-transparent -translate-x-1/2" aria-hidden="true" />

          <div className="relative flex flex-col items-center gap-16 lg:gap-20 h-full justify-center">
            {stages.map((stage, index) => {
              const isLeft = index % 2 === 0;
              const progressOffset = index / (stages.length - 1);
              const delay = index * 0.1;

              const x = useTransform(scrollProgress, [0, progressOffset, 1], [
                isLeft ? -60 : 60,
                0,
                isLeft ? 60 : -60,
              ]);
              const opacity = useTransform(scrollProgress, [progressOffset - 0.3, progressOffset, progressOffset + 0.3], [0, 1, 0]);
              const scale = useTransform(scrollProgress, [progressOffset - 0.2, progressOffset, progressOffset + 0.2], [0.9, 1, 0.9]);

              return (
                <motion.div
                  key={stage.id}
                  style={{ x, opacity, scale }}
                  className={`relative w-full max-w-md lg:max-w-lg px-8 ${isLeft ? 'lg:text-right' : ''}`}
                >
                  <div className="flex lg:flex-row items-start gap-6">
                    <motion.div
                      className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${stage.bgColor} ${stage.borderColor} transition-all duration-300`}
                      whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${stage.color.replace('#', '')}40` }}
                    >
                      <stage.icon className={`w-7 h-7 ${stage.textColor}`} aria-hidden="true" />
                    </motion.div>

                    <div className={`flex-1 ${isLeft ? 'text-right pr-4' : 'pl-4'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-text-primary">{stage.title}</h3>
                        {stage.comingSoon && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-warning/15 text-warning border border-warning/30 rounded-full">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <p className="text-text-secondary">{stage.description}</p>
                    </div>
                  </div>

                  {index < stages.length - 1 && (
                    <motion.div
                      className="absolute left-1/2 top-[100px] w-px h-[calc(100%_-_100px)] -translate-x-1/2 bg-gradient-to-b from-transparent via-brand-purple/20 to-transparent"
                      aria-hidden="true"
                    >
                      <motion.div
                        animate={{ scaleY: [0, 1, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ transformOrigin: 'top center' }}
                        className="w-px h-full bg-gradient-to-b from-brand-purple to-brand-cyan"
                        aria-hidden="true"
                      />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-text-muted mb-4">
            Each stage seamlessly connects to the next — the output of one becomes the input of another.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-mono text-text-muted">
            {stages.map((stage, index) => (
              <span key={stage.id} className={stage.textColor}>
                {stage.title}
                {index < stages.length - 1 && <ArrowRight className="w-4 h-4 inline-block mx-1 text-text-muted" aria-hidden="true" />}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}