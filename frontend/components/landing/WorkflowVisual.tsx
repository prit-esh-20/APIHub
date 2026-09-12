'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Server, Database } from 'lucide-react';

const workflowSteps = [
  {
    id: 'request-a',
    label: 'POST /login',
    description: 'Authenticate user',
    icon: Shield,
    color: '#3B82F6',
    outputs: ['access_token', 'refresh_token'],
  },
  {
    id: 'extract-token',
    label: 'Extract Token',
    description: 'Parse JWT from response',
    icon: Zap,
    color: '#8B5CF6',
    inputs: ['access_token'],
    outputs: ['token'],
  },
  {
    id: 'request-b',
    label: 'GET /profile',
    description: 'Fetch user profile',
    icon: Server,
    color: '#22C55E',
    inputs: ['token'],
    outputs: ['user_id', 'email'],
  },
  {
    id: 'request-c',
    label: 'GET /users/{{user_id}}',
    description: 'Get user details',
    icon: Database,
    color: '#F59E0B',
    inputs: ['user_id'],
    outputs: ['user_data'],
  },
];

const connections = [
  { from: 'request-a', to: 'extract-token', label: 'access_token' },
  { from: 'extract-token', to: 'request-b', label: 'Authorization: Bearer {{token}}' },
  { from: 'request-b', to: 'request-c', label: 'user_id' },
];

export default function WorkflowVisual() {
  return (
    <div
      className="relative w-full aspect-[4/3] max-w-4xl mx-auto"
      aria-hidden="true"
      role="img"
      aria-label="Visual API workflow showing request chaining and variable extraction"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 via-transparent to-brand-cyan/5 rounded-3xl" aria-hidden="true" />

      <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
        <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px' }}>
          <motion.div
            className="absolute inset-0"
            animate={{
              rotateX: [0, 1, -1, 0],
              rotateY: [0, -2, 2, 0],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ transformStyle: 'preserve-3d' }}
            aria-hidden="true"
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-brand-purple/10 border border-brand-purple/20"
                style={{
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `translateZ(${Math.random() * 100 - 50}px)`,
                  transformStyle: 'preserve-3d',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.7, 1.3, 0.7] }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
                aria-hidden="true"
              />
            ))}
          </motion.div>

          <div className="relative flex items-center gap-4" style={{ transformStyle: 'preserve-3d' }}>
            {workflowSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative flex flex-col items-center"
                style={{ transformStyle: 'preserve-3d' }}
                initial={{ opacity: 0, y: 30, rotateX: -30 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
              >
                <motion.div
                  className="relative w-72"
                  animate={{ y: [0, -6, 6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div
                    className="relative bg-panel/95 backdrop-blur-xl border border-border/50 rounded-xl p-5 text-left shadow-2xl"
                    style={{
                      backgroundColor: `${step.color}10`,
                      borderColor: `${step.color}40`,
                      boxShadow: `0 20px 60px ${step.color}20`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${step.color}20` }}
                      >
                        <step.icon className="w-5 h-5" style={{ color: step.color }} aria-hidden="true" />
                      </div>
                      <span className="font-mono font-semibold text-text-primary" style={{ color: step.color }}>
                        {step.label}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary mb-4">{step.description}</p>

                    {(step.inputs && step.inputs.length > 0) && (
                      <div className="mb-3">
                        <p className="text-xs text-text-muted mb-2">Inputs</p>
                        <div className="flex flex-wrap gap-1">
                          {step.inputs.map((input) => (
                            <span
                              key={input}
                              className="px-2 py-0.5 text-xs font-mono rounded"
                              style={{
                                backgroundColor: `${step.color}15`,
                                color: step.color,
                                borderColor: `${step.color}40`,
                              }}
                            >
                              {'{{' + input + '}}'}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {(step.outputs && step.outputs.length > 0) && (
                      <div>
                        <p className="text-xs text-text-muted mb-2">Outputs</p>
                        <div className="flex flex-wrap gap-1">
                          {step.outputs.map((output) => (
                            <span
                              key={output}
                              className="px-2 py-0.5 text-xs font-mono rounded"
                              style={{
                                backgroundColor: '#22D3EE15',
                                color: '#22D3EE',
                                borderColor: '#22D3EE40',
                              }}
                            >
                              {'{{' + output + '}}'}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

                {index < workflowSteps.length - 1 && (
                  <motion.div
                    className="absolute left-full top-1/2 -translate-y-1/2 w-16 flex items-center justify-center"
                    style={{ transformStyle: 'preserve-3d', transform: 'translateX(-8px)' }}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.3, ease: 'easeOut' }}
                  >
                    <motion.div
                      className="relative flex items-center"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <motion.div
                        className="absolute top-1/2 left-0 right-0 h-px"
                        style={{
                          background: `linear-gradient(90deg, ${step.color}, ${workflowSteps[index + 1].color})`,
                          transformOrigin: 'center',
                        }}
                        animate={{ scaleX: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        aria-hidden="true"
                      />
                      <motion.div
                        className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-mono"
                        style={{
                          background: `linear-gradient(135deg, ${step.color}, ${workflowSteps[index + 1].color})`,
                          boxShadow: `0 0 20px ${step.color}60`,
                        }}
                        animate={{
                          rotateZ: [0, 180, 360],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        aria-hidden="true"
                      >
                        \u2192
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-mono rounded bg-background/95 backdrop-blur-sm border border-border/50 whitespace-nowrap shadow-lg"
                      style={{ color: step.color }}
                    >
                      {connections[index]?.label}
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
    </div>
  );
}