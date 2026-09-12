'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FolderKanban,
  FileText,
  Clock,
  TrendingUp,
  Plus,
  FolderOpen,
  ExternalLink,
  MoreHorizontal,
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
  },
  {
    id: '2',
    name: 'User Management',
    description: 'Authentication, profiles, roles & permissions',
    requestCount: 28,
    collectionCount: 2,
    lastUpdated: '1 day ago',
    color: '#22C55E',
  },
  {
    id: '3',
    name: 'Payment Gateway',
    description: 'Stripe integration, webhooks, subscriptions',
    requestCount: 15,
    collectionCount: 1,
    lastUpdated: '3 days ago',
    color: '#F59E0B',
  },
  {
    id: '4',
    name: 'Analytics Service',
    description: 'Event tracking, metrics, reporting endpoints',
    requestCount: 33,
    collectionCount: 2,
    lastUpdated: '1 week ago',
    color: '#8B5CF6',
  },
];

const mockRecentRequests = [
  { id: '1', method: 'GET', url: '/api/v1/users', status: 200, time: '124ms', timestamp: '2 min ago' },
  { id: '2', method: 'POST', url: '/api/v1/orders', status: 201, time: '312ms', timestamp: '15 min ago' },
  { id: '3', method: 'GET', url: '/api/v1/products?page=1', status: 200, time: '89ms', timestamp: '1 hour ago' },
  { id: '4', method: 'PUT', url: '/api/v1/users/42', status: 400, time: '45ms', timestamp: '3 hours ago' },
  { id: '5', method: 'DELETE', url: '/api/v1/sessions/abc', status: 204, time: '67ms', timestamp: '5 hours ago' },
];

const stats = [
  { label: 'Projects', value: '4', icon: FolderKanban, color: 'bg-brand-purple/15 text-brand-purple' },
  { label: 'Total Requests', value: '118', icon: FileText, color: 'bg-brand-cyan/15 text-brand-cyan' },
  { label: 'Collections', value: '8', icon: FolderOpen, color: 'bg-feature-testing/15 text-feature-testing' },
  { label: 'This Week', value: '23', icon: TrendingUp, color: 'bg-success/15 text-success' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-text-secondary mt-1">Welcome back, John! Here's what's happening with your APIs.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/projects" className="btn-secondary gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </Link>
          <Link href="/projects/new" className="btn-primary gap-2">
            <FolderOpen className="w-4 h-4" />
            Create Request
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
            className="card-hover p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-text-primary mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="w-6 h-6" aria-hidden="true" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card"
        >
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text-primary">Your Projects</h2>
            <Link href="/projects" className="btn-ghost text-sm gap-1">
              View all
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-border/50">
            {mockProjects.length > 0 ? (
              mockProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="block p-5 hover:bg-panel-elevated/50 transition-colors flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${project.color}15` }}>
                    <FolderKanban className="w-6 h-6" style={{ color: project.color }} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-text-primary truncate">{project.name}</h3>
                    <p className="text-sm text-text-secondary truncate mt-0.5">{project.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-text-muted">
                      <span className="flex items-center gap-1">{project.requestCount} requests</span>
                      <span className="flex items-center gap-1">{project.collectionCount} collections</span>
                      <span>{project.lastUpdated}</span>
                    </div>
                  </div>
                  <MoreHorizontal className="w-5 h-5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                </Link>
              ))
            ) : (
              <div className="p-10 text-center">
                <FolderKanban className="w-12 h-12 mx-auto text-text-muted mb-4" aria-hidden="true" />
                <h3 className="text-lg font-medium text-text-primary mb-1">No projects yet</h3>
                <p className="text-text-secondary mb-4">Create your first project to start building APIs</p>
                <Link href="/projects/new" className="btn-primary inline-flex gap-2">
                  <Plus className="w-4 h-4" />
                  Create Project
                </Link>
              </div>
            )}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card"
        >
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text-primary">Recent Requests</h2>
            <Link href="/history" className="btn-ghost text-sm gap-1">
              View all
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-border/50">
            {mockRecentRequests.map((request) => (
              <div key={request.id} className="p-4 hover:bg-panel-elevated/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`method-badge method-${request.method.toLowerCase()}`}>{request.method}</span>
                    <div>
                      <p className="font-mono text-sm text-text-primary truncate max-w-[300px]">{request.url}</p>
                      <p className="text-xs text-text-muted">{request.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className={`status-badge status-${request.status >= 200 && request.status < 300 ? 'success' : request.status >= 400 ? 'error' : 'info'}`}>
                      {request.status}
                    </span>
                    <span className="text-text-muted font-mono">{request.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card"
      >
        <div className="p-5 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Quick Actions</h2>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/projects/new" className="p-4 rounded-xl border border-border hover:border-brand-purple/50 hover:bg-panel-elevated/50 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-brand-purple/15 text-brand-purple flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Plus className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-medium text-text-primary">New Request</h3>
            <p className="text-sm text-text-secondary mt-1">Create and send an API request</p>
          </Link>
          <Link href="/projects/new" className="p-4 rounded-xl border border-border hover:border-brand-purple/50 hover:bg-panel-elevated/50 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-brand-cyan/15 text-brand-cyan flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FolderKanban className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-medium text-text-primary">New Project</h3>
            <p className="text-sm text-text-secondary mt-1">Organize your API workspace</p>
          </Link>
          <Link href="/history" className="p-4 rounded-xl border border-border hover:border-brand-purple/50 hover:bg-panel-elevated/50 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-feature-testing/15 text-feature-testing flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Clock className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-medium text-text-primary">View History</h3>
            <p className="text-sm text-text-secondary mt-1">See your recent API calls</p>
          </Link>
          <Link href="/settings" className="p-4 rounded-xl border border-border hover:border-brand-purple/50 hover:bg-panel-elevated/50 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-warning/15 text-warning flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-medium text-text-primary">Import Collection</h3>
            <p className="text-sm text-text-secondary mt-1">Import from Postman, OpenAPI, etc.</p>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}