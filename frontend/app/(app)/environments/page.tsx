'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
  Globe,
  Server,
  Database,
  Shield,
  ChevronDown,
  Download,
} from 'lucide-react';

const mockEnvironments = [
  {
    id: 'dev',
    name: 'Development',
    description: 'Local development environment',
    icon: Database,
    color: '#22C55E',
    variables: [
      { key: 'BASE_URL', value: 'http://localhost:4000', enabled: true, secret: false },
      { key: 'API_VERSION', value: 'v1', enabled: true, secret: false },
      { key: 'TOKEN', value: 'dev-token-abc123', enabled: true, secret: true },
      { key: 'DEBUG', value: 'true', enabled: true, secret: false },
    ],
    active: true,
  },
  {
    id: 'staging',
    name: 'Staging',
    description: 'Pre-production testing environment',
    icon: Server,
    color: '#F59E0B',
    variables: [
      { key: 'BASE_URL', value: 'https://staging.api.example.com', enabled: true, secret: false },
      { key: 'API_VERSION', value: 'v1', enabled: true, secret: false },
      { key: 'TOKEN', value: 'staging-token-xyz789', enabled: true, secret: true },
      { key: 'DEBUG', value: 'false', enabled: true, secret: false },
    ],
    active: false,
  },
  {
    id: 'prod',
    name: 'Production',
    description: 'Live production environment',
    icon: Globe,
    color: '#EF4444',
    variables: [
      { key: 'BASE_URL', value: 'https://api.example.com', enabled: true, secret: false },
      { key: 'API_VERSION', value: 'v1', enabled: true, secret: false },
      { key: 'TOKEN', value: 'prod-token-secret', enabled: true, secret: true },
      { key: 'DEBUG', value: 'false', enabled: true, secret: false },
    ],
    active: false,
  },
];

const initialVariable = { key: '', value: '', enabled: true, secret: false };

export default function EnvironmentsPage() {
  const [activeEnvId, setActiveEnvId] = useState<string>('dev');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEnvName, setNewEnvName] = useState('');
  const [newEnvDescription, setNewEnvDescription] = useState('');
  const [newEnvIcon, setNewEnvIcon] = useState<typeof Globe>(Globe);
  const [newEnvColor, setNewEnvColor] = useState('#8B5CF6');

  const activeEnv = mockEnvironments.find(e => e.id === activeEnvId);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});

  const icons = [
    { component: Globe, label: 'Globe' },
    { component: Server, label: 'Server' },
    { component: Database, label: 'Database' },
    { component: Shield, label: 'Shield' },
  ] as const;

  const colors = ['#8B5CF6', '#22C55E', '#F59E0B', '#EF4444', '#EC4899', '#14B8A6', '#3B82F6', '#F97316'];

  const handleAddVariable = (envId: string) => {
    const env = mockEnvironments.find(e => e.id === envId);
    if (env) {
      env.variables.push({ ...initialVariable });
    }
  };

  const handleRemoveVariable = (envId: string, index: number) => {
    const env = mockEnvironments.find(e => e.id === envId);
    if (env) {
      env.variables.splice(index, 1);
    }
  };

  const handleUpdateVariable = (envId: string, index: number, field: 'key' | 'value' | 'enabled' | 'secret', value: string | boolean) => {
    const env = mockEnvironments.find(e => e.id === envId);
    if (env) {
      (env.variables[index] as any)[field] = value;
    }
  };

  const handleCreateEnvironment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEnvName.trim()) return;
    const newEnv = {
      id: newEnvName.toLowerCase().replace(/\s+/g, '-'),
      name: newEnvName,
      description: newEnvDescription,
      icon: newEnvIcon,
      color: newEnvColor,
      variables: [],
      active: false,
    };
    mockEnvironments.push(newEnv);
    setActiveEnvId(newEnv.id);
    setShowCreateModal(false);
    setNewEnvName('');
    setNewEnvDescription('');
  };

  const handleSetActive = (envId: string) => {
    mockEnvironments.forEach(e => e.active = e.id === envId);
    setActiveEnvId(envId);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Environments</h1>
          <p className="text-text-secondary mt-1">Manage environment variables for your API requests</p>
        </div>
        <motion.button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary gap-2"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Plus className="w-4 h-4" />
          New Environment
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-1 space-y-4">
          <div className="card p-4">
            <h2 className="font-semibold text-text-primary mb-4">Environments</h2>
            <div className="space-y-2">
              {mockEnvironments.map((env) => (
                <motion.button
                  key={env.id}
                  onClick={() => handleSetActive(env.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left ${
                    activeEnvId === env.id
                      ? 'bg-brand-purple/10 border-brand-purple/30'
                      : 'border-border/50 hover:border-brand-purple/30 hover:bg-panel-elevated/50'
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${env.color}15` }}
                  >
                    <env.icon className="w-5 h-5" style={{ color: env.color }} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-text-primary truncate">{env.name}</span>
                      {env.active && (
                        <CheckCircle className="w-4 h-4 text-success flex-shrink-0" aria-hidden="true" />
                      )}
                    </div>
                    <p className="text-xs text-text-muted truncate">{env.description}</p>
                  </div>
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: env.color }} aria-hidden="true" />
                </motion.button>
              ))}
            </div>
          </div>

          <div className="card p-4">
            <h3 className="font-medium text-text-primary mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="btn-ghost w-full justify-start gap-2">
                <Copy className="w-4 h-4" />
                Duplicate Environment
              </button>
              <button className="btn-ghost w-full justify-start gap-2">
                <Database className="w-4 h-4" />
                Import from File
              </button>
              <button className="btn-ghost w-full justify-start gap-2">
                <Download className="w-4 h-4" />
                Export All Environments
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {activeEnv && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="card"
            >
              <div className="p-5 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${activeEnv.color}15` }}
                  >
                    <activeEnv.icon className="w-6 h-6" style={{ color: activeEnv.color }} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary">{activeEnv.name}</h2>
                    <p className="text-sm text-text-muted">{activeEnv.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-panel-elevated/50 border border-border/50 rounded-lg text-sm">
                    <Eye
                      className={showSecrets[activeEnv.id] ? 'text-brand-purple' : 'text-text-muted'}
                      onClick={() => setShowSecrets(prev => ({ ...prev, [activeEnv.id]: !prev[activeEnv.id] }))}
                    />
                    <span className="text-text-secondary">Show secrets</span>
                  </div>
                  <button className="btn-secondary gap-2">
                    <Plus className="w-4 h-4" />
                    Add Variable
                  </button>
                </div>
              </div>

              <div className="p-5">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="p-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider w-10">Enabled</th>
                        <th className="p-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Variable</th>
                        <th className="p-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Value</th>
                        <th className="p-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                        <th className="p-3 text-right"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {activeEnv.variables.map((variable, index) => (
                        <motion.tr
                          key={`${activeEnv.id}-${index}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-panel-elevated/50"
                        >
                          <td className="p-3">
                            <input
                              type="checkbox"
                              checked={variable.enabled}
                              onChange={(e) => handleUpdateVariable(activeEnv.id, index, 'enabled', e.target.checked)}
                              className="w-4 h-4 rounded border-border bg-panel-elevated text-brand-purple focus:ring-brand-purple"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={variable.key}
                              onChange={(e) => handleUpdateVariable(activeEnv.id, index, 'key', e.target.value)}
                              className="input font-mono text-sm w-full max-w-xs"
                              placeholder="Variable name"
                            />
                          </td>
                          <td className="p-3">
                            <div className="relative flex items-center">
                              <input
                                type={variable.secret && !showSecrets[activeEnv.id] ? 'password' : 'text'}
                                value={variable.value}
                                onChange={(e) => handleUpdateVariable(activeEnv.id, index, 'value', e.target.value)}
                                className="input font-mono text-sm pr-10"
                                placeholder="Variable value"
                              />
                              {variable.secret && (
                                <button
                                  onClick={() => setShowSecrets(prev => ({ ...prev, [activeEnv.id]: !prev[activeEnv.id] }))}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                                  aria-label={showSecrets[activeEnv.id] ? 'Hide value' : 'Show value'}
                                >
                                  {showSecrets[activeEnv.id] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="p-3">
                            <select
                              value={variable.secret ? 'secret' : 'plain'}
                              onChange={(e) => handleUpdateVariable(activeEnv.id, index, 'secret', e.target.value === 'secret')}
                              className="input w-auto font-mono text-sm"
                            >
                              <option value="plain">Plain Text</option>
                              <option value="secret">Secret</option>
                            </select>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleRemoveVariable(activeEnv.id, index)}
                              className="btn-ghost p-1.5 text-error hover:text-error"
                              aria-label="Remove variable"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                      <motion.tr
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <td className="p-3">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-4 h-4 rounded border-border bg-panel-elevated text-brand-purple focus:ring-brand-purple"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            className="input font-mono text-sm"
                            placeholder="New variable name"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            className="input font-mono text-sm"
                            placeholder="Variable value"
                          />
                        </td>
                        <td className="p-3">
                          <select className="input w-auto font-mono text-sm">
                            <option value="plain">Plain Text</option>
                            <option value="secret">Secret</option>
                          </select>
                        </td>
                        <td className="p-3 text-right">
                          <button className="btn-primary text-sm gap-1" onClick={() => handleAddVariable(activeEnv.id)}>
                            <Plus className="w-3 h-3" />
                            Add
                          </button>
                        </td>
                      </motion.tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-env-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-panel border border-border rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 id="create-env-title" className="text-lg font-semibold text-text-primary">Create Environment</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-panel-elevated transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleCreateEnvironment} className="space-y-4">
                <div>
                  <label htmlFor="env-name" className="label">Environment name</label>
                  <input
                    id="env-name"
                    type="text"
                    value={newEnvName}
                    onChange={(e) => setNewEnvName(e.target.value)}
                    className="input"
                    placeholder="e.g., Development, Staging, Production"
                    autoFocus
                    required
                  />
                </div>
                <div>
                  <label htmlFor="env-description" className="label">Description (optional)</label>
                  <input
                    id="env-description"
                    type="text"
                    value={newEnvDescription}
                    onChange={(e) => setNewEnvDescription(e.target.value)}
                    className="input"
                    placeholder="Brief description of this environment"
                  />
                </div>
                <div>
                  <label className="label">Icon</label>
                  <div className="flex gap-2">
                    {icons.map(({ component: Icon, label }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setNewEnvIcon(Icon)}
                        className={`p-2 rounded-lg border-2 flex-1 flex items-center justify-center transition-all ${
                          newEnvIcon === Icon
                            ? 'border-brand-purple bg-brand-purple/10'
                            : 'border-border hover:border-brand-purple/30'
                        }`}
                        aria-label={label}
                        aria-pressed={newEnvIcon === Icon}
                      >
                        <Icon className="w-5 h-5" style={{ color: newEnvColor }} aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="label">Color</label>
                  <div className="flex gap-2 flex-wrap">
                    {colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setNewEnvColor(color)}
                        className={`w-10 h-10 rounded-lg border-2 transition-all ${
                          newEnvColor === color ? 'border-brand-purple scale-110' : 'border-transparent hover:border-brand-purple/30'
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={color}
                        aria-pressed={newEnvColor === color}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1"
                  >
                    Create Environment
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}