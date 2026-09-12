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
          className="text-center mb-10 lg:mb-12"
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

        <div className="relative mt-10 lg:mt-12">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-purple/30 to-transparent -translate-x-1/2" aria-hidden="true" />

          <div className="relative max-w-2xl mx-auto flex flex-col items-stretch gap-8 sm:gap-10">
            {stages.map((stage, index) => {
              const isLeft = index % 2 === 0;
              const delay = index * 0.1;

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay, ease: 'easeOut' }}
                  className={`relative px-8 ${isLeft ? 'lg:text-right' : ''}`}
                >
                  <div className="flex lg:flex-row items-start gap-6">
                    <div
                      className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${stage.bgColor} ${stage.borderColor}`}
                    >
                      <stage.icon className={`w-7 h-7 ${stage.textColor}`} aria-hidden="true" />
                    </div>

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
          className="mt-12 lg:mt-14 text-center"
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
          <div className="mt-10 max-w-2xl mx-auto">
            <TestComponent />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
