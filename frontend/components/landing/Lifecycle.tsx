'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Code2, TestTube2, Zap, Box, FileText, Activity } from 'lucide-react';
import TestComponent from './TestComponent';

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
  return (
    <section id="how-it-works" className="relative py-16 lg:py-20" aria-labelledby="lifecycle-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-8 lg:mb-10"
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

        {/* Timeline — dedicated visual area. Spine aligns with the icon column center:
            left-8 (2rem) matches the 4rem icon chip center on mobile, and the middle
            grid column is centered on desktop. */}
        <div className="relative">
          <div
            className="absolute left-8 lg:left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brand-purple/30 to-transparent"
            aria-hidden="true"
          />

          <ol className="relative max-w-2xl mx-auto space-y-5 lg:space-y-0">
            {stages.map((stage, index) => {
              const isLeft = index % 2 === 0;
              const delay = index * 0.08;

              return (
                <motion.li
                  key={stage.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay, ease: 'easeOut' }}
                  className="relative flex items-start gap-5 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-x-8 lg:py-3"
                >
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${stage.bgColor} lg:col-start-2 lg:row-start-1 lg:justify-self-center`}
                  >
                    <stage.icon className={`w-7 h-7 ${stage.textColor}`} aria-hidden="true" />
                  </div>

                  <div
                    className={`flex-1 min-w-0 ${
                      isLeft
                        ? 'lg:col-start-1 lg:row-start-1 lg:text-right'
                        : 'lg:col-start-3 lg:row-start-1 lg:text-left'
                    }`}
                  >
                    <div className={`flex items-center gap-2 mb-1.5 ${isLeft ? 'lg:justify-end' : ''}`}>
                      <h3 className="text-xl font-semibold text-text-primary">{stage.title}</h3>
                      {stage.comingSoon && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-warning/15 text-warning border border-warning/30 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-text-secondary">{stage.description}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
          className="mt-10 lg:mt-12 text-center"
        >
          <p className="text-text-muted mb-4 max-w-2xl mx-auto">
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
          <div className="mt-6 lg:mt-8 max-w-xl mx-auto">
            <TestComponent />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
