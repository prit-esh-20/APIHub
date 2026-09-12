'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trash2,
  Filter,
  Search,
  ChevronDown,
  ExternalLink,
  Clock,
  Database,
  Download,
} from 'lucide-react';

const mockHistory = [
  { id: '1', method: 'GET', url: '/api/v1/users', status: 200, time: '124ms', size: '2.4 KB', timestamp: '2 minutes ago' },
  { id: '2', method: 'POST', url: '/api/v1/orders', status: 201, time: '312ms', size: '1.2 KB', timestamp: '15 minutes ago' },
  { id: '3', method: 'GET', url: '/api/v1/products?page=1', status: 200, time: '89ms', size: '5.6 KB', timestamp: '1 hour ago' },
  { id: '4', method: 'PUT', url: '/api/v1/users/42', status: 400, time: '45ms', size: '0.8 KB', timestamp: '3 hours ago' },
  { id: '5', method: 'DELETE', url: '/api/v1/sessions/abc', status: 204, time: '67ms', size: '0 KB', timestamp: '5 hours ago' },
  { id: '6', method: 'GET', url: '/api/v1/health', status: 200, time: '23ms', size: '0.3 KB', timestamp: '1 day ago' },
  { id: '7', method: 'POST', url: '/api/v1/auth/login', status: 200, time: '156ms', size: '1.1 KB', timestamp: '2 days ago' },
  { id: '8', method: 'GET', url: '/api/v1/analytics/events', status: 500, time: '2.3s', size: '3.2 KB', timestamp: '3 days ago' },
  { id: '9', method: 'PATCH', url: '/api/v1/products/123', status: 200, time: '189ms', size: '1.5 KB', timestamp: '4 days ago' },
  { id: '10', method: 'GET', url: '/api/v1/reports/monthly', status: 200, time: '567ms', size: '12.4 KB', timestamp: '1 week ago' },
];

const methodColors: Record<string, string> = {
  GET: 'bg-http-get/15 text-http-get border-http-get/30',
  POST: 'bg-http-post/15 text-http-post border-http-post/30',
  PUT: 'bg-http-put/15 text-http-put border-http-put/30',
  PATCH: 'bg-http-patch/15 text-http-patch border-http-patch/30',
  DELETE: 'bg-http-delete/15 text-http-delete border-http-delete/30',
};

export default function HistoryPage() {
  const [search, setSearch] = useState('');
  const [filterMethod, setFilterMethod] = useState<string | null>(null);
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);

  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const;

  const filteredHistory = mockHistory.filter((entry) => {
    const matchesSearch = entry.url.toLowerCase().includes(search.toLowerCase());
    const matchesMethod = !filterMethod || entry.method === filterMethod;
    return matchesSearch && matchesMethod;
  });

  const handleToggleSelect = (id: string) => {
    setSelectedEntries(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedEntries.length === filteredHistory.length) {
      setSelectedEntries([]);
    } else {
      setSelectedEntries(filteredHistory.map(e => e.id));
    }
  };

  const handleClearHistory = () => {
    // In a real app, this would clear the history
    console.log('Clear history');
  };

  const handleReRun = (entry: typeof mockHistory[0]) => {
    // In a real app, this would navigate to the request builder with the entry data
    console.log('Re-run:', entry);
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
          <h1 className="text-2xl font-bold text-text-primary">History</h1>
          <p className="text-text-secondary mt-1">View and manage your API request history</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleClearHistory}
            className="btn-danger gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear History
          </button>
        </div>
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
            placeholder="Search history..."
            className="input pl-10"
            aria-label="Search history"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" aria-hidden="true" />
            <select
              value={filterMethod || ''}
              onChange={(e) => setFilterMethod(e.target.value || null)}
              className="input pl-9 pr-8 w-auto appearance-none"
              aria-label="Filter by method"
            >
              <option value="">All Methods</option>
              {methods.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" aria-hidden="true" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card overflow-hidden"
      >
        {filteredHistory.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="p-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedEntries.length === filteredHistory.length && filteredHistory.length > 0}
                        onChange={handleSelectAll}
                        className="w-4 h-4 rounded border-border bg-panel-elevated text-brand-purple focus:ring-brand-purple"
                        aria-label="Select all"
                      />
                    </th>
                    <th className="p-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Request</th>
                    <th className="p-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider hidden md:table-cell">URL</th>
                    <th className="p-4 text-center text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                    <th className="p-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider">Time</th>
                    <th className="p-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider">Size</th>
                    <th className="p-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider">Timestamp</th>
                    <th className="p-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  <AnimatePresence>
                    {filteredHistory.map((entry, index) => (
                      <motion.tr
                        key={entry.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                        className={`hover:bg-panel-elevated/50 transition-colors ${selectedEntries.includes(entry.id) ? 'bg-brand-purple/5' : ''}`}
                      >
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedEntries.includes(entry.id)}
                            onChange={() => handleToggleSelect(entry.id)}
                            className="w-4 h-4 rounded border-border bg-panel-elevated text-brand-purple focus:ring-brand-purple"
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <span className={`badge font-mono ${methodColors[entry.method]}`}>{entry.method}</span>
                            <ExternalLink className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100" aria-hidden="true" />
                          </div>
                        </td>
                        <td className="p-4 hidden md:table-cell font-mono text-sm text-text-primary truncate max-w-[300px]">{entry.url}</td>
                        <td className="p-4 text-center">
                          <span className={`badge font-mono ${entry.status >= 200 && entry.status < 300 ? 'status-success' : entry.status >= 400 && entry.status < 500 ? 'status-error' : entry.status >= 500 ? 'status-error' : 'status-info'}`}>
                            {entry.status}
                          </span>
                        </td>
                        <td className="p-4 text-right font-mono text-sm text-text-secondary">{entry.time}</td>
                        <td className="p-4 text-right font-mono text-sm text-text-muted">{entry.size}</td>
                        <td className="p-4 text-right text-sm text-text-muted whitespace-nowrap">{entry.timestamp}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleReRun(entry)}
                            className="btn-ghost p-1.5 text-text-muted hover:text-text-primary"
                            aria-label={`Re-run ${entry.method} ${entry.url}`}
                          >
                            <Clock className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {selectedEntries.length > 0 && (
              <div className="p-4 border-t border-border bg-panel-elevated/30 flex items-center justify-between">
                <span className="text-sm text-text-secondary">
                  {selectedEntries.length} selected
                </span>
                <button className="btn-danger text-sm gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete Selected
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="p-12 text-center">
            <Clock className="w-16 h-16 mx-auto text-text-muted mb-4" aria-hidden="true" />
            <h3 className="text-lg font-medium text-text-primary mb-2">
              {search || filterMethod ? 'No matching requests' : 'No history yet'}
            </h3>
            <p className="text-text-secondary mb-6">
              {search || filterMethod
                ? 'Try adjusting your search or filter'
                : 'Your API request history will appear here'}
            </p>
            {!search && !filterMethod && (
              <span className="text-text-muted text-sm">Execute requests from the request builder to see them here</span>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}