'use client';

import { motion } from 'framer-motion';

export default function TestComponent() {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-brand-purple/10 border border-brand-purple/30 rounded-xl p-8 text-center"
      >
        <h2 className="text-2xl font-bold text-text-primary mb-4">Test Component</h2>
        <p className="text-text-secondary">If you can see this, the build works!</p>
      </motion.div>
    </div>
  );
}