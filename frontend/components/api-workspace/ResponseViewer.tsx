'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Copy, ChevronDown, ChevronRight, FileText, Clock, Database, Download } from 'lucide-react';

interface ResponseViewerProps {
  requestId: string;
  requestData: {
    method: string;
    url: string;
    params: Array<{ key: string; value: string; enabled: boolean }>;
    headers: Array<{ key: string; value: string; enabled: boolean }>;
    body: { type: string; content: string };
    auth: { type: string; token?: string };
  };
}

const mockResponse = {
  status: 200,
  statusText: 'OK',
  time: '124ms',
  size: '2.4 KB',
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-cache',
    'x-powered-by': 'Express',
    'etag': 'W/"1234-abcdef"',
    'date': new Date().toUTCString(),
    'connection': 'keep-alive',
  },
  body: {
    success: true,
    data: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'developer',
        created_at: '2024-01-15T10:30:00Z',
        metadata: {
          source: 'api',
          version: '1.0',
        },
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'admin',
        created_at: '2024-01-14T08:15:00Z',
        metadata: {
          source: 'api',
          version: '1.0',
        },
      },
    ],
    pagination: {
      page: 1,
      limit: 20,
      total: 2,
      pages: 1,
    },
  },
};

const getStatusColor = (status: number) => {
  if (status >= 200 && status < 300) return 'text-success';
  if (status >= 300 && status < 400) return 'text-info';
  if (status >= 400 && status < 500) return 'text-warning';
  return 'text-error';
};

const getStatusBadgeColor = (status: number) => {
  if (status >= 200 && status < 300) return 'bg-success/15 text-success border-success/30';
  if (status >= 300 && status < 400) return 'bg-info/15 text-info border-info/30';
  if (status >= 400 && status < 500) return 'bg-warning/15 text-warning border-warning/30';
  return 'bg-error/15 text-error border-error/30';
};

function JsonViewer({ data, level = 0 }: { data: any; level?: number }) {
  const [expanded, setExpanded] = useState(true);

  if (data === null) {
    return <span className="text-text-muted">null</span>;
  }

  if (typeof data === 'string') {
    return <span className="text-success">"{data}"</span>;
  }

  if (typeof data === 'number' || typeof data === 'boolean') {
    return <span className="text-info">{String(data)}</span>;
  }

  if (Array.isArray(data)) {
    if (data.length === 0) return <span className="text-text-muted">[]</span>;

    return (
      <span className="inline-block">
        <span className="text-text-muted">[</span>
        <span className="block ml-4">
          {data.map((item, index) => (
            <div key={index} className="flex">
              <span className="text-text-muted">{index}: </span>
              <JsonViewer data={item} level={level + 1} />
              <span className="text-text-muted">{index < data.length - 1 ? ',' : ''}</span>
            </div>
          ))}
        </span>
        <span className="text-text-muted">]</span>
      </span>
    );
  }

  if (typeof data === 'object') {
    const keys = Object.keys(data);
    if (keys.length === 0) return <span className="text-text-muted">{}</span>;

    return (
      <span className="inline-block">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-text-muted hover:text-text-primary transition-colors p-0.5"
          aria-label={expanded ? 'Collapse object' : 'Expand object'}
          aria-expanded={expanded}
        >
          {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          <span>{}</span>
        </button>
        {expanded && (
          <span className="block ml-4">
            {keys.map((key) => (
              <div key={key} className="flex">
                <span className="text-info">{key}</span>
                <span className="text-text-muted">: </span>
                <JsonViewer data={data[key]} level={level + 1} />
                <span className="text-text-muted">{key !== keys[keys.length - 1] ? ',' : ''}</span>
              </div>
            ))}
          </span>
        )}
      </span>
    );
  }

  return <span>{String(data)}</span>;
}

export default function ResponseViewer({ requestId, requestData }: ResponseViewerProps) {
  const [activeTab, setActiveTab] = useState<'Pretty' | 'Raw' | 'Headers'>('Pretty');

  const response = mockResponse;

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span
              className={`badge font-mono ${getStatusBadgeColor(response.status)}`}
            >
              {response.status} {response.statusText}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-text-muted font-mono">
              <Clock className="w-4 h-4" aria-hidden="true" />
              {response.time}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-text-muted font-mono">
              <Database className="w-4 h-4" aria-hidden="true" />
              {response.size}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-ghost p-2" aria-label="Copy response">
              <Copy className="w-5 h-5" />
            </button>
            <button className="btn-ghost p-2" aria-label="Download response">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex gap-2" role="tablist" aria-label="Response view">
          {(['Pretty', 'Raw', 'Headers'] as const).map((tab) => (
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
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div
          role="tabpanel"
          id={`panel-${activeTab.toLowerCase()}`}
          aria-labelledby={`tab-${activeTab.toLowerCase()}`}
          className="animate-in"
        >
          {activeTab === 'Pretty' && (
            <div className="font-mono text-sm bg-background/50 border border-border rounded-lg p-4 overflow-auto">
              <JsonViewer data={response.body} />
            </div>
          )}

          {activeTab === 'Raw' && (
            <pre className="font-mono text-sm bg-background/50 border border-border rounded-lg p-4 overflow-auto max-h-[500px]">
              <code>{JSON.stringify(response.body, null, 2)}</code>
            </pre>
          )}

          {activeTab === 'Headers' && (
            <div className="space-y-2">
              {Object.entries(response.headers).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center gap-3 p-3 bg-panel-elevated/50 border border-border/50 rounded-lg"
                >
                  <span className="font-mono text-sm text-text-primary min-w-[180px]">{key}</span>
                  <span className="font-mono text-sm text-text-secondary flex-1 truncate">{value}</span>
                  <button
                    className="btn-ghost p-1.5 opacity-0 group-hover:opacity-100"
                    aria-label={`Copy ${key}`}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}