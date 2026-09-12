'use client';

import { motion } from 'framer-motion';
import { Code2, TestTube2, Zap, Box, FileText, Activity } from 'lucide-react';

const capabilities = [
  {
    id: 'build',
    title: 'Build',
    description: 'Design and construct APIs with an intuitive request builder. Organize requests into collections and folders.',
    icon: Code2,
    color: 'brand-purple',
    gradient: 'from-brand-purple/20 to-brand-cyan/20',
    border: 'border-brand-purple/30',
    hoverBorder: 'border-brand-purple/60',
    iconColor: 'text-brand-purple',
  },
  {
    id: 'test',
    title: 'Test',
    description: 'Validate API responses with assertions. Run test suites and view detailed reports for every endpoint.',
    icon: TestTube2,
    color: 'feature-testing',
    gradient: 'from-feature-testing/20 to-feature-testing/10',
    border: 'border-feature-testing/30',
    hoverBorder: 'border-feature-testing/60',
    iconColor: 'text-feature-testing',
  },
  {
    id: 'automate',
    title: 'Automate',
    description: 'Chain requests into workflows. Extract values from responses and pass them to subsequent requests automatically.',
    icon: Zap,
    color: 'brand-cyan',
    gradient: 'from-brand-cyan/20 to-brand-purple/20',
    border: 'border-brand-cyan/30',
    hoverBorder: 'border-brand-cyan/60',
    iconColor: 'text-brand-cyan',
  },
  {
    id: 'mock',
    title: 'Mock',
    description: 'Create mock servers with configurable responses. Simulate API behavior for frontend development and testing.',
    icon: Box,
    color: 'feature-mocking',
    gradient: 'from-feature-mocking/20 to-feature-mocking/10',
    border: 'border-feature-mocking/30',
    hoverBorder: 'border-feature-mocking/60',
    iconColor: 'text-feature-mocking',
  },
  {
    id: 'document',
    title: 'Document',
    description: 'Generate beautiful API documentation from your collections. Share with teams or publish publicly.',
    icon: FileText,
    color: 'feature-documentation',
    gradient: 'from-feature-documentation/20 to-feature-documentation/10',
    border: 'border-feature-documentation/30',
    hoverBorder: 'border-feature-documentation/60',
    iconColor: 'text-feature-documentation',
  },
  {
    id: 'monitor',
    title: 'Monitor',
    description: 'Schedule automated API checks. Track uptime, latency, and error rates with real-time alerts.',
    icon: Activity,
    color: 'feature-monitoring',
    gradient: 'from-feature-monitoring/20 to-feature-monitoring/10',
    border: 'border-feature-monitoring/30',
    hoverBorder: 'border-feature-monitoring/60',
    iconColor: 'text-feature-monitoring',
  },
];

export default function Capabilities() {
  return (
    <section id="features" className="relative py-16 lg:py-20" aria-labelledby="capabilities-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-10 lg:mb-12"
        >
          <span className="px-3 py-1 bg-brand-purple/15 text-brand-purple text-sm font-medium rounded-full border border-brand-purple/30 mb-4 inline-block">
            Core Capabilities
          </span>
          <h2 id="capabilities-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Everything you need for the{' '}
            <span className="text-gradient">complete API lifecycle</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Six integrated capabilities. One unified workspace. No more switching between tools.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability, index) => (
            <motion.article
              key={capability.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
              className={`relative p-6 rounded-2xl border transition-all duration-300 ${capability.gradient} ${capability.border} bg-panel/50 backdrop-blur-sm`}
            >
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${capability.iconColor} ${capability.gradient} ${capability.border}`}>
                  <capability.icon className="w-6 h-6" aria-hidden="true" />
                </div>

                <h3 className="text-xl font-semibold text-text-primary mb-3">{capability.title}</h3>
                <p className="text-text-secondary leading-relaxed">{capability.description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
          className="mt-10 lg:mt-12 text-center"
        >
          <p className="text-text-muted mb-6">
            Testing, Automation, Mocking, Documentation, and Monitoring are in active development.
          </p>
          <p className="text-text-secondary">
            <span className="font-medium text-text-primary">Build</span> and <span className="font-medium text-text-primary">Test</span> are available now in the beta.
          </p>
        </motion.div>
      </div>
    </section>
  );
}