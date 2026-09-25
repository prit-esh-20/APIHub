'use client';

import { motion } from 'framer-motion';

export default function TestComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-brand-purple/10 border border-brand-purple/30 rounded-xl p-5 text-center"
    >
      <h2 className="text-lg font-bold text-text-primary mb-1.5">Test Component</h2>
      <p className="text-sm text-text-secondary">If you can see this, the build works!</p>
    </motion.div>
  );
}