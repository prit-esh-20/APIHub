'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Copy, CheckCircle, XCircle, Minus, Plus, Code2, Terminal } from 'lucide-react';

const methodColors = {
  GET: 'bg-http-get text-http-get border-http-get/30',
  POST: 'bg-http-post text-http-post border-http-post/30',
  PUT: 'bg-http-put text-http-put border-http-put/30',
  PATCH: 'bg-http-patch text-http-patch border-http-patch/30',
  DELETE: 'bg-http-delete text-http-delete border-http-delete/30',
};

const requestTabs = ['Params', 'Headers', 'Body', 'Auth'] as const;

export default function ProductPreview() {
  const [activeTab, setActiveTab] = useState<'Params' | 'Headers' | 'Body' | 'Auth'>('Params');
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'>('GET');

  return (
    <section id="product-preview" className="relative py-16 lg:py-20" aria-labelledby="preview-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-10 lg:mb-12"
        >
          <h2 id="preview-heading" className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            APIHub Workspace Preview
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            A realistic preview of the APIHub request builder — designed for developers who want clarity and control.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-purple/10 to-brand-cyan/10 rounded-3xl blur-3xl opacity-50 pointer-events-none" aria-hidden="true" />

          <div className="relative bg-panel/50 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-panel-elevated/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-error/60" aria-hidden="true" />
                <div className="w-3 h-3 rounded-full bg-warning/60" aria-hidden="true" />
                <div className="w-3 h-3 rounded-full bg-success/60" aria-hidden="true" />
              </div>
              <div className="flex-1 text-center text-sm font-mono text-text-muted">
                api.apihub.dev / request-builder
              </div>
              <div className="w-12" aria-hidden="true" />
            </div>

            <div className="p-6 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as typeof method)}
                  className={`px-3 py-2.5 rounded-lg border font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple appearance-none bg-panel-elevated text-text-primary ${methodColors[method]}`}
                  aria-label="HTTP Method"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="PATCH">PATCH</option>
                  <option value="DELETE">DELETE</option>
                </select>

                <div className="flex-1 min-w-[200px] relative">
                  <input
                    type="text"
                    value="https://{{BASE_URL}}/api/v1/users"
                    readOnly
                    className="input font-mono text-sm pl-10"
                    aria-label="Request URL"
                  />
                  <Code2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" aria-hidden="true" />
                </div>

                <button className="btn-primary px-6 py-2.5 gap-2 group">
                  <Terminal className="w-5 h-5" aria-hidden="true" />
                  <span>Send</span>
                </button>
              </div>

              <div className="border-t border-border/50 pt-4" role="tablist" aria-label="Request configuration tabs">
                <div className="flex gap-1 pb-4" role="tablist">
                  {requestTabs.map((tab) => (
                    <button
                      key={tab}
                      role="tab"
                      aria-selected={activeTab === tab}
                      aria-controls={`panel-${tab.toLowerCase()}`}
                      id={`tab-${tab.toLowerCase()}`}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeTab === tab
                          ? 'bg-brand-purple/15 text-brand-purple border border-brand-purple/30'
                          : 'text-text-secondary hover:text-text-primary hover:bg-panel-elevated'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div
                  role="tabpanel"
                  id={`panel-${activeTab.toLowerCase()}`}
                  aria-labelledby={`tab-${activeTab.toLowerCase()}`}
                  className="animate-in"
                >
                  {activeTab === 'Params' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-12 gap-3 text-sm font-mono text-text-muted px-1">
                        <span className="col-span-5">Key</span>
                        <span className="col-span-5">Value</span>
                        <span className="col-span-2">Enabled</span>
                      </div>
                      <ParamRow key="1" name="page" value="1" description="Page number" enabled />
                      <ParamRow key="2" name="limit" value="20" description="Results per page" enabled />
                      <ParamRow key="3" name="sort" value="created_at" description="Sort field" enabled={false} />
                      <button className="btn-ghost text-sm justify-start gap-2 mt-2">
                        <Plus className="w-4 h-4" aria-hidden="true" />
                        Add Parameter
                      </button>
                    </div>
                  )}

                  {activeTab === 'Headers' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-12 gap-3 text-sm font-mono text-text-muted px-1">
                        <span className="col-span-5">Key</span>
                        <span className="col-span-5">Value</span>
                        <span className="col-span-2">Enabled</span>
                      </div>
                      <HeaderRow key="1" name="Content-Type" value="application/json" enabled />
                      <HeaderRow key="2" name="Authorization" value="Bearer {{TOKEN}}" enabled />
                      <HeaderRow key="3" name="Accept" value="application/json" enabled />
                      <button className="btn-ghost text-sm justify-start gap-2 mt-2">
                        <Plus className="w-4 h-4" aria-hidden="true" />
                        Add Header
                      </button>
                    </div>
                  )}

                  {activeTab === 'Body' && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-text-muted">
                        <span>Body type:</span>
                        <select className="input w-auto font-mono text-sm py-1.5">
                          <option value="json">JSON</option>
                          <option value="form">Form Data</option>
                          <option value="raw">Raw</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                      <pre className="bg-background/50 border border-border rounded-lg p-4 overflow-x-auto max-h-64"><code className="font-mono text-sm text-text-primary">{`{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "developer",
  "metadata": {
    "source": "api",
    "version": "1.0"
  }
}`}</code></pre>
                    </div>
                  )}

                  {activeTab === 'Auth' && (
                    <div className="space-y-4">
                      <AuthOption type="none" label="No Auth" description="Send request without authentication" />
                      <AuthOption type="bearer" label="Bearer Token" description="Add Authorization header with token" />
                      <AuthOption type="basic" label="Basic Auth" description="Username and password authentication" />
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-border/50 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-text-primary">Response <span className="text-text-muted text-normal font-mono ml-2">(Preview)</span></h3>
                  <div className="flex items-center gap-3 text-sm text-text-muted font-mono">
                    <span className="flex items-center gap-1.5 text-success">
                      <CheckCircle className="w-4 h-4" aria-hidden="true" />
                      200 OK
                    </span>
                    <span className="border-l border-border/50 pl-3">124ms</span>
                    <span className="border-l border-border/50 pl-3">2.4 KB</span>
                  </div>
                </div>

                <div className="flex gap-2 mb-4" role="tablist" aria-label="Response tabs">
                  <button role="tab" aria-selected="true" className="btn-ghost text-sm px-3 py-1.5">Pretty</button>
                  <button role="tab" aria-selected="false" className="btn-ghost text-sm px-3 py-1.5">Raw</button>
                  <button role="tab" aria-selected="false" className="btn-ghost text-sm px-3 py-1.5">Headers</button>
                </div>

                <pre className="bg-background/50 border border-border rounded-lg p-4 overflow-x-auto max-h-80"><code className="font-mono text-sm text-text-primary">{`{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "developer",
      "created_at": "2024-01-15T10:30:00Z",
      "metadata": {
        "source": "api",
        "version": "1.0"
      }
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "admin",
      "created_at": "2024-01-14T08:15:00Z",
      "metadata": {
        "source": "api",
        "version": "1.0"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 2,
    "pages": 1
  }
}`}</code></pre>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute -bottom-8 left-1/2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 w-max max-w-[calc(100vw-2.5rem)] px-6 py-3 bg-panel/80 backdrop-blur-xl border border-border/50 rounded-xl shadow-lg"
          >
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <span className="px-2 py-1 bg-brand-purple/15 text-brand-purple rounded-full text-xs font-medium">Real-time</span>
              <span>Request executed • Response received • Ready to save</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border/50" aria-hidden="true" />
            <button className="btn-ghost text-sm gap-2">
              <Copy className="w-4 h-4" aria-hidden="true" />
              Save to Collection
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ParamRow({ name, value, description, enabled }: { name: string; value: string; description: string; enabled: boolean }) {
  return (
    <div className="grid grid-cols-12 gap-3 items-center px-1">
      <input type="text" value={name} readOnly className="col-span-5 input font-mono text-sm py-2 bg-background/50" />
      <input type="text" value={value} readOnly className="col-span-5 input font-mono text-sm py-2 bg-background/50" />
      <label className="col-span-2 flex items-center justify-center">
        <input type="checkbox" checked={enabled} readOnly className="w-4 h-4 rounded border-border bg-panel-elevated text-brand-purple focus:ring-brand-purple" />
      </label>
    </div>
  );
}

function HeaderRow({ name, value, enabled }: { name: string; value: string; enabled: boolean }) {
  return (
    <div className="grid grid-cols-12 gap-3 items-center px-1">
      <input type="text" value={name} readOnly className="col-span-5 input font-mono text-sm py-2 bg-background/50" />
      <input type="text" value={value} readOnly className="col-span-5 input font-mono text-sm py-2 bg-background/50" />
      <label className="col-span-2 flex items-center justify-center">
        <input type="checkbox" checked={enabled} readOnly className="w-4 h-4 rounded border-border bg-panel-elevated text-brand-purple focus:ring-brand-purple" />
      </label>
    </div>
  );
}

function AuthOption({ type, label, description }: { type: string; label: string; description: string }) {
  return (
    <label className="flex items-start gap-4 p-4 bg-panel-elevated/50 border border-border/50 rounded-lg cursor-pointer transition-all duration-200 hover:border-brand-purple/30 hover:bg-panel-elevated">
      <input type="radio" name="auth" value={type} className="mt-1 w-4 h-4 text-brand-purple border-border bg-panel-elevated focus:ring-brand-purple" />
      <div className="flex-1">
        <span className="font-medium text-text-primary">{label}</span>
        <p className="text-sm text-text-muted mt-0.5">{description}</p>
      </div>
    </label>
  );
}