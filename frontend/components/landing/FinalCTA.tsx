'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Rocket } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="relative py-16 lg:py-20" aria-labelledby="cta-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/10 via-transparent to-brand-cyan/10 rounded-3xl blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="relative bg-panel/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 lg:p-14 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-purple/15 text-brand-purple rounded-full text-sm font-medium border border-brand-purple/30 mb-6"
            >
              <Rocket className="w-4 h-4" aria-hidden="true" />
              <span>Ready to transform your API workflow?</span>
            </motion.div>

            <motion.h2
              id="cta-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6"
            >
              Ready to take control of your APIs?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-text-secondary text-lg mb-8 max-w-xl mx-auto"
            >
              Build, test, automate, and manage your APIs from one unified workspace.
              Join developers who are shipping APIs with confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/signup"
                className="btn-primary text-lg px-10 py-4 group w-full sm:w-auto"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/login"
                className="btn-secondary text-lg px-10 py-4 w-full sm:w-auto"
              >
                Sign In
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 text-sm text-text-muted"
            >
              No credit card required · Free tier available · Cancel anytime
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-10 lg:mt-12 grid sm:grid-cols-3 grid-cols-1 gap-4 sm:gap-8 text-center overflow-hidden"
        >
          <div className="p-6 bg-panel/50 backdrop-blur-sm border border-border/50 rounded-2xl">
            <div className="text-3xl sm:text-4xl font-bold text-brand-purple mb-2">10K+</div>
            <div className="text-text-secondary">API Requests/Day</div>
          </div>
          <div className="p-6 bg-panel/50 backdrop-blur-sm border border-border/50 rounded-2xl">
            <div className="text-3xl sm:text-4xl font-bold text-brand-cyan mb-2">{'<50ms'}</div>
            <div className="text-text-secondary">Avg Response Time</div>
          </div>
          <div className="p-6 bg-panel/50 backdrop-blur-sm border border-border/50 rounded-2xl">
            <div className="text-3xl sm:text-4xl font-bold text-feature-testing mb-2">99.9%</div>
            <div className="text-text-secondary">Uptime SLA</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}