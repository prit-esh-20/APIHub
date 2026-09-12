'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderKanban,
  FileText,
  Plus,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  MoreVertical,
  Trash2,
  Copy,
  Edit2,
  FolderPlus,
  Search,
  ExternalLink,
} from 'lucide-react';
import RequestBuilder, { type HttpMethod } from '@/components/api-workspace/RequestBuilder';
import ResponseViewer from '@/components/api-workspace/ResponseViewer';
import CollectionsPanel from '@/components/api-workspace/CollectionsPanel';

const mockCollections = [
  {
    id: 'coll-1',
    name: 'Authentication',
    type: 'folder' as const,
    children: [
      { id: 'req-1', name: 'POST /login', method: 'POST', type: 'request' as const },
      { id: 'req-2', name: 'POST /register', method: 'POST', type: 'request' as const },
      { id: 'req-3', name: 'POST /refresh', method: 'POST', type: 'request' as const },
      { id: 'req-4', name: 'DELETE /logout', method: 'DELETE', type: 'request' as const },
    ],
  },
  {
    id: 'coll-2',
    name: 'Users',
    type: 'folder' as const,
    children: [
      { id: 'req-5', name: 'GET /users', method: 'GET', type: 'request' as const },
      { id: 'req-6', name: 'GET /users/:id', method: 'GET', type: 'request' as const },
      { id: 'req-7', name: 'PUT /users/:id', method: 'PUT', type: 'request' as const },
      { id: 'req-8', name: 'DELETE /users/:id', method: 'DELETE', type: 'request' as const },
    ],
  },
  {
    id: 'coll-3',
    name: 'Products',
    type: 'folder' as const,
    children: [
      { id: 'req-9', name: 'GET /products', method: 'GET', type: 'request' as const },
      { id: 'req-10', name: 'POST /products', method: 'POST', type: 'request' as const },
    ],
  },
  {
    id: 'req-11',
    name: 'GET /health',
    method: 'GET',
    type: 'request' as const,
  },
] as const;

const mockRequestData: Record<string, {
  method: HttpMethod;
  url: string;
  params: Array<{ key: string; value: string; enabled: boolean }>;
  headers: Array<{ key: string; value: string; enabled: boolean }>;
  body: { type: 'json' | 'form' | 'raw' | 'none'; content: string };
  auth: { type: 'none' | 'bearer' | 'basic'; token?: string; username?: string; password?: string };
}> = {
  'req-1': {
    method: 'POST' as HttpMethod,
    url: '{{BASE_URL}}/api/v1/auth/login',
    params: [],
    headers: [
      { key: 'Content-Type', value: 'application/json', enabled: true },
    ],
    body: {
      type: 'json',
      content: JSON.stringify({
        email: 'user@example.com',
        password: 'securePassword123',
      }, null, 2),
    },
    auth: { type: 'none' },
  },
  'req-5': {
    method: 'GET' as HttpMethod,
    url: '{{BASE_URL}}/api/v1/users',
    params: [
      { key: 'page', value: '1', enabled: true },
      { key: 'limit', value: '20', enabled: true },
    ],
    headers: [
      { key: 'Authorization', value: 'Bearer {{TOKEN}}', enabled: true },
      { key: 'Accept', value: 'application/json', enabled: true },
    ],
    body: { type: 'none', content: '' },
    auth: { type: 'bearer', token: '{{TOKEN}}' },
  },
};

const methodColors: Record<string, string> = {
  GET: 'bg-http-get/15 text-http-get border-http-get/30',
  POST: 'bg-http-post/15 text-http-post border-http-post/30',
  PUT: 'bg-http-put/15 text-http-put border-http-put/30',
  PATCH: 'bg-http-patch/15 text-http-patch border-http-patch/30',
  DELETE: 'bg-http-delete/15 text-http-delete border-http-delete/30',
};

export default function ProjectWorkspacePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeRequestId, setActiveRequestId] = useState<string | null>('req-1');
  const [requestTabs, setRequestTabs] = useState<Array<{ id: string; name: string; method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' }>>([
    { id: 'req-1', name: 'POST /login', method: 'POST' },
  ]);
  const [showResponse, setShowResponse] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(320);

  const activeRequest = requestTabs.find(t => t.id === activeRequestId);
  const requestData = activeRequest ? mockRequestData[activeRequest.id as keyof typeof mockRequestData] : null;

  const openRequest = (request: { id: string; name: string; method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' }) => {
    const existingTab = requestTabs.find(t => t.id === request.id);
    if (existingTab) {
      setActiveRequestId(request.id);
      return;
    }
    setRequestTabs(prev => [...prev, request]);
    setActiveRequestId(request.id);
  };

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRequestTabs(prev => prev.filter(t => t.id !== id));
    if (activeRequestId === id) {
      const remainingTabs = requestTabs.filter(t => t.id !== id);
      setActiveRequestId(remainingTabs[remainingTabs.length - 1]?.id || null);
    }
  };

  const toggleFolder = (folderId: string) => {
    // In a real app, this would toggle folder expansion state
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex h-full overflow-hidden">
        <aside
          className={`flex-shrink-0 bg-sidebar border-r border-border flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-[320px]' : 'w-16'}`}
          style={{ width: sidebarOpen ? sidebarWidth : 64 }}
        >
          <div className="flex items-center justify-between h-16 px-3 border-b border-border">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <FolderKanban className="w-6 h-6 text-brand-purple flex-shrink-0" aria-hidden="true" />
              {sidebarOpen && (
                <span className="font-semibold text-text-primary truncate">Collections</span>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-panel-elevated transition-colors"
              aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>

          <div className="p-3 border-b border-border flex gap-1">
            <button className="btn-ghost flex-1 text-xs gap-1 py-2" aria-label="New request">
              <Plus className="w-4 h-4" />
              {sidebarOpen && 'Request'}
            </button>
            <button className="btn-ghost flex-1 text-xs gap-1 py-2" aria-label="New folder">
              <FolderPlus className="w-4 h-4" />
              {sidebarOpen && 'Folder'}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            <CollectionsPanel
              collections={mockCollections}
              activeRequestId={activeRequestId}
              onRequestClick={openRequest}
              onFolderToggle={toggleFolder}
              sidebarOpen={sidebarOpen}
            />
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="flex items-center justify-between h-12 px-4 border-b border-border bg-panel/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 overflow-x-auto pb-1" role="tablist">
              {requestTabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeRequestId === tab.id}
                  onClick={() => setActiveRequestId(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeRequestId === tab.id
                      ? 'bg-brand-purple/15 text-brand-purple border border-brand-purple/30'
                      : 'text-text-secondary hover:text-text-primary hover:bg-panel-elevated'
                  }`}
                >
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-mono font-semibold ${methodColors[tab.method]}`}
                  >
                    {tab.method}
                  </span>
                  <span className="truncate max-w-[200px]">{tab.name}</span>
                  <button
                    onClick={(e) => closeTab(tab.id, e)}
                    className="p-1 rounded hover:bg-background hover:text-text-primary transition-colors opacity-0 hover:opacity-100"
                    aria-label={`Close ${tab.name}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </button>
              ))}
              <button className="btn-ghost p-2 ml-1" aria-label="New request tab">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-panel-elevated/50 border border-border/50 rounded-lg text-sm font-mono text-text-secondary">
                <span>Environment:</span>
                <select className="bg-transparent border-none outline-none text-text-primary font-medium cursor-pointer">
                  <option>Development</option>
                  <option>Staging</option>
                  <option>Production</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 flex flex-col min-w-0">
              {activeRequest && requestData ? (
                <RequestBuilder
                  requestId={activeRequest.id}
                  requestName={activeRequest.name}
                  method={activeRequest.method}
                  initialData={requestData}
                  onSend={async () => {
                    setShowResponse(true);
                  }}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex-1 flex items-center justify-center bg-panel/30"
                >
                  <div className="text-center p-8">
                    <FileText className="w-16 h-16 mx-auto text-text-muted mb-4" aria-hidden="true" />
                    <h3 className="text-lg font-medium text-text-primary mb-2">No request selected</h3>
                    <p className="text-text-secondary">Select a request from the sidebar or create a new one</p>
                  </div>
                </motion.div>
              )}
            </div>

            <AnimatePresence>
              {showResponse && activeRequest && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '400px', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="flex-shrink-0 border-l border-border bg-panel flex flex-col"
                  style={{ width: '400px' }}
                >
                  <div className="flex items-center justify-between h-12 px-4 border-b border-border">
                    <h3 className="font-medium text-text-primary">Response</h3>
                    <button
                      onClick={() => setShowResponse(false)}
                      className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-panel-elevated transition-colors"
                      aria-label="Close response"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-1 overflow-auto">
                      {requestData && (
                        <ResponseViewer
                          requestId={activeRequest.id}
                          requestData={requestData}
                        />
                      )}
                    </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}