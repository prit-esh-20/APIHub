'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  FolderKanban,
  Plus,
  Search,
  Filter,
  Grid,
  List,
  MoreHorizontal,
  ExternalLink,
} from 'lucide-react';

const mockProjects = [
  {
    id: '1',
    name: 'E-commerce API',
    description: 'REST API for online store - products, orders, payments',
    requestCount: 42,
    collectionCount: 3,
    lastUpdated: '2 hours ago',
    color: '#3B82F6',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'User Management',
    description: 'Authentication, profiles, roles & permissions',
    requestCount: 28,
    collectionCount: 2,
    lastUpdated: '1 day ago',
    color: '#22C55E',
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    name: 'Payment Gateway',
    description: 'Stripe integration, webhooks, subscriptions',
    requestCount: 15,
    collectionCount: 1,
    lastUpdated: '3 days ago',
    color: '#F59E0B',
    createdAt: '2024-01-05',
  },
  {
    id: '4',
    name: 'Analytics Service',
    description: 'Event tracking, metrics, reporting endpoints',
    requestCount: 33,
    collectionCount: 2,
    lastUpdated: '1 week ago',
    color: '#8B5CF6',
    createdAt: '2024-01-01',
  },
  {
    id: '5',
    name: 'Notification Service',
    description: 'Email, SMS, push notifications API',
    requestCount: 19,
    collectionCount: 1,
    lastUpdated: '2 weeks ago',
    color: '#EC4899',
    createdAt: '2023-12-20',
  },
  {
    id: '6',
    name: 'File Storage API',
    description: 'Upload, download, manage files with signed URLs',
    requestCount: 24,
    collectionCount: 2,
    lastUpdated: '1 month ago',
    color: '#14B8A6',
    createdAt: '2023-12-10',
  },
];

export default function ProjectsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  const filteredProjects = mockProjects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    setShowCreateModal(false);
    setNewProjectName('');
    setNewProjectDescription('');
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
          <h1 className="text-2xl font-bold text-text-primary">Projects</h1>
          <p className="text-text-secondary mt-1">Manage your API projects and workspaces</p>
        </div>
        <motion.button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary gap-2"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Plus className="w-4 h-4" />
          New Project
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="input pl-10"
            aria-label="Search projects"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-brand-purple/15 text-brand-purple' : 'text-text-muted hover:text-text-primary hover:bg-panel-elevated'}`}
            aria-label="Grid view"
            aria-pressed={view === 'grid'}
          >
            <Grid className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-brand-purple/15 text-brand-purple' : 'text-text-muted hover:text-text-primary hover:bg-panel-elevated'}`}
            aria-label="List view"
            aria-pressed={view === 'list'}
          >
            <List className="w-5 h-5" aria-hidden="true" />
          </button>
          <Filter className="w-5 h-5 text-text-muted" aria-hidden="true" />
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((project) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="card-hover p-5 flex flex-col h-full group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${project.color}15` }}>
                      <FolderKanban className="w-6 h-6" style={{ color: project.color }} aria-hidden="true" />
                    </div>
                    <MoreHorizontal className="w-5 h-5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <Link href={`/projects/${project.id}`} className="group/link">
                      <h3 className="font-semibold text-text-primary group-hover/link:text-brand-purple transition-colors mb-1">{project.name}</h3>
                      <p className="text-sm text-text-secondary line-clamp-2">{project.description}</p>
                    </Link>
                  </div>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50 text-xs text-text-muted">
                    <span className="flex items-center gap-1">{project.requestCount} requests</span>
                    <span className="flex items-center gap-1">{project.collectionCount} collections</span>
                  </div>
                  <div className="mt-3 text-xs text-text-muted">{project.lastUpdated}</div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="p-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Project</th>
                      <th className="p-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider hidden md:table-cell">Description</th>
                      <th className="p-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider">Requests</th>
                      <th className="p-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider">Collections</th>
                      <th className="p-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider">Updated</th>
                      <th className="p-4 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {filteredProjects.map((project) => (
                      <motion.tr
                        key={project.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hover:bg-panel-elevated/50 transition-colors"
                      >
                        <td className="p-4">
                          <Link href={`/projects/${project.id}`} className="flex items-center gap-3 group/link">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${project.color}15` }}>
                              <FolderKanban className="w-5 h-5" style={{ color: project.color }} aria-hidden="true" />
                            </div>
                            <div>
                              <p className="font-medium text-text-primary group-hover/link:text-brand-purple transition-colors">{project.name}</p>
                              <p className="text-sm text-text-secondary truncate max-w-xs">{project.description}</p>
                            </div>
                          </Link>
                        </td>
                        <td className="p-4 hidden md:table-cell text-text-secondary">{project.description}</td>
                        <td className="p-4 text-right font-mono text-text-primary">{project.requestCount}</td>
                        <td className="p-4 text-right font-mono text-text-primary">{project.collectionCount}</td>
                        <td className="p-4 text-right text-text-muted">{project.lastUpdated}</td>
                        <td className="p-4 text-right">
                          <MoreHorizontal className="w-5 h-5 text-text-muted hover:text-text-primary transition-colors" aria-hidden="true" />
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-12 text-center"
        >
          <FolderKanban className="w-16 h-16 mx-auto text-text-muted mb-4" aria-hidden="true" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            {search ? 'No projects found' : 'No projects yet'}
          </h3>
          <p className="text-text-secondary mb-6">
            {search ? 'Try adjusting your search terms' : 'Create your first project to start building APIs'}
          </p>
          {!search && (
            <motion.button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary inline-flex gap-2"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Plus className="w-4 h-4" />
              Create Project
            </motion.button>
          )}
        </motion.div>
      )}

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
            aria-labelledby="create-project-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-panel border border-border rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 id="create-project-title" className="text-lg font-semibold text-text-primary">Create Project</h2>
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
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <label htmlFor="project-name" className="label">Project name</label>
                  <input
                    id="project-name"
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="input"
                    placeholder="My API Project"
                    autoFocus
                    required
                  />
                </div>
                <div>
                  <label htmlFor="project-description" className="label">Description (optional)</label>
                  <textarea
                    id="project-description"
                    value={newProjectDescription}
                    onChange={(e) => setNewProjectDescription(e.target.value)}
                    className="input min-h-[80px] resize-y"
                    placeholder="Brief description of your API project..."
                    rows={3}
                  />
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
                    Create Project
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