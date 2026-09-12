'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  Key,
  Loader2,
  ChevronDown,
  Plus,
  Trash2,
  Copy,
  Code2,
  Terminal,
} from 'lucide-react';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type AuthType = 'none' | 'bearer' | 'basic';
export type BodyType = 'json' | 'form' | 'raw' | 'none';

interface RequestData {
  method: HttpMethod;
  url: string;
  params: Array<{ key: string; value: string; enabled: boolean }>;
  headers: Array<{ key: string; value: string; enabled: boolean }>;
  body: { type: BodyType; content: string };
  auth: { type: AuthType; token?: string; username?: string; password?: string };
}

interface RequestBuilderProps {
  requestId: string;
  requestName: string;
  method: HttpMethod;
  initialData: RequestData;
  onSend: () => void;
}

const methods: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
const methodColors: Record<HttpMethod, string> = {
  GET: 'bg-http-get text-http-get border-http-get/30',
  POST: 'bg-http-post text-http-post border-http-post/30',
  PUT: 'bg-http-put text-http-put border-http-put/30',
  PATCH: 'bg-http-patch text-http-patch border-http-patch/30',
  DELETE: 'bg-http-delete text-http-delete border-http-delete/30',
};

const authTypes: Array<{ value: AuthType; label: string }> = [
  { value: 'none', label: 'No Auth' },
  { value: 'bearer', label: 'Bearer Token' },
  { value: 'basic', label: 'Basic Auth' },
];

const bodyTypes: Array<{ value: BodyType; label: string }> = [
  { value: 'none', label: 'None' },
  { value: 'json', label: 'JSON' },
  { value: 'form', label: 'Form Data' },
  { value: 'raw', label: 'Raw' },
];

export default function RequestBuilder({
  requestId,
  requestName,
  method: initialMethod,
  initialData,
  onSend,
}: RequestBuilderProps) {
  const [method, setMethod] = useState<HttpMethod>(initialMethod);
  const [url, setUrl] = useState(initialData.url);
  const [params, setParams] = useState(initialData.params);
  const [headers, setHeaders] = useState(initialData.headers);
  const [bodyType, setBodyType] = useState<BodyType>(initialData.body.type);
  const [bodyContent, setBodyContent] = useState(initialData.body.content);
  const [authType, setAuthType] = useState<AuthType>(initialData.auth.type);
  const [authToken, setAuthToken] = useState(initialData.auth.token || '');
  const [authUsername, setAuthUsername] = useState(initialData.auth.username || '');
  const [authPassword, setAuthPassword] = useState(initialData.auth.password || '');
  const [activeTab, setActiveTab] = useState<'Params' | 'Headers' | 'Body' | 'Auth'>('Params');
  const [isSending, setIsSending] = useState(false);

  const addRow = (arr: Array<{ key: string; value: string; enabled: boolean }>) => {
    setParams(prev => [...prev, { key: '', value: '', enabled: true }]);
  };

  const removeRow = (arr: Array<{ key: string; value: string; enabled: boolean }>, index: number) => {
    setParams(prev => prev.filter((_, i) => i !== index));
  };

  const updateRow = (
    arr: Array<{ key: string; value: string; enabled: boolean }>,
    index: number,
    field: 'key' | 'value' | 'enabled',
    value: string | boolean
  ) => {
    if (field === 'key') {
      setParams(prev => prev.map((row, i) => i === index ? { ...row, key: value as string } : row));
    } else if (field === 'value') {
      setParams(prev => prev.map((row, i) => i === index ? { ...row, value: value as string } : row));
    } else {
      setParams(prev => prev.map((row, i) => i === index ? { ...row, enabled: value as boolean } : row));
    }
  };

  const handleSend = async () => {
    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSending(false);
    onSend();
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-border bg-panel/50 backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as HttpMethod)}
            className={`px-3 py-2 rounded-lg border font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple appearance-none bg-panel-elevated text-text-primary ${methodColors[method]}`}
            aria-label="HTTP Method"
          >
            {methods.map(m => <option key={m} value={m}>{m}</option>)}
          </select>

          <div className="flex-1 min-w-[200px] relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input font-mono text-sm pl-10"
              placeholder="Enter request URL (e.g., https://api.example.com/users)"
              aria-label="Request URL"
            />
            <Code2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" aria-hidden="true" />
          </div>

          <motion.button
            onClick={handleSend}
            disabled={isSending}
            className="btn-primary px-6 py-2.5 gap-2 group"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            aria-busy={isSending}
          >
            <Terminal className="w-5 h-5" aria-hidden="true" />
            <span>{isSending ? 'Sending...' : 'Send'}</span>
            {isSending && <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />}
          </motion.button>
        </div>

        <div className="flex gap-1 pb-4" role="tablist" aria-label="Request configuration">
          {(['Params', 'Headers', 'Body', 'Auth'] as const).map((tab) => (
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
          {activeTab === 'Params' && (
            <div className="space-y-3">
              <div className="grid grid-cols-12 gap-3 text-sm font-mono text-text-muted px-1 mb-2">
                <span className="col-span-5">Key</span>
                <span className="col-span-5">Value</span>
                <span className="col-span-2">Enabled</span>
              </div>
              {params.map((param, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 items-center px-1">
                  <input
                    type="text"
                    value={param.key}
                    onChange={(e) => updateRow(params, index, 'key', e.target.value)}
                    className="col-span-5 input font-mono text-sm py-2"
                    placeholder="Key"
                  />
                  <input
                    type="text"
                    value={param.value}
                    onChange={(e) => updateRow(params, index, 'value', e.target.value)}
                    className="col-span-5 input font-mono text-sm py-2"
                    placeholder="Value"
                  />
                  <label className="col-span-2 flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={param.enabled}
                      onChange={(e) => updateRow(params, index, 'enabled', e.target.checked)}
                      className="w-4 h-4 rounded border-border bg-panel-elevated text-brand-purple focus:ring-brand-purple"
                    />
                  </label>
                </div>
              ))}
              <button
                onClick={() => setParams(prev => [...prev, { key: '', value: '', enabled: true }])}
                className="btn-ghost text-sm justify-start gap-2 mt-2"
              >
                <Plus className="w-4 h-4" />
                Add Parameter
              </button>
            </div>
          )}

          {activeTab === 'Headers' && (
            <div className="space-y-3">
              <div className="grid grid-cols-12 gap-3 text-sm font-mono text-text-muted px-1 mb-2">
                <span className="col-span-5">Key</span>
                <span className="col-span-5">Value</span>
                <span className="col-span-2">Enabled</span>
              </div>
              {headers.map((header, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 items-center px-1">
                  <input
                    type="text"
                    value={header.key}
                    onChange={(e) => setHeaders(prev => prev.map((h, i) => i === index ? { ...h, key: e.target.value } : h))}
                    className="col-span-5 input font-mono text-sm py-2"
                    placeholder="Key"
                  />
                  <input
                    type="text"
                    value={header.value}
                    onChange={(e) => setHeaders(prev => prev.map((h, i) => i === index ? { ...h, value: e.target.value } : h))}
                    className="col-span-5 input font-mono text-sm py-2"
                    placeholder="Value"
                  />
                  <label className="col-span-2 flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={header.enabled}
                      onChange={(e) => setHeaders(prev => prev.map((h, i) => i === index ? { ...h, enabled: e.target.checked } : h))}
                      className="w-4 h-4 rounded border-border bg-panel-elevated text-brand-purple focus:ring-brand-purple"
                    />
                  </label>
                </div>
              ))}
              <button
                onClick={() => setHeaders(prev => [...prev, { key: '', value: '', enabled: true }])}
                className="btn-ghost text-sm justify-start gap-2 mt-2"
              >
                <Plus className="w-4 h-4" />
                Add Header
              </button>
            </div>
          )}

          {activeTab === 'Body' && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-text-muted">Body type:</span>
                <select
                  value={bodyType}
                  onChange={(e) => setBodyType(e.target.value as BodyType)}
                  className="input w-auto font-mono text-sm py-1.5"
                >
                  {bodyTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>

              {bodyType === 'json' && (
                <div className="relative">
                  <textarea
                    value={bodyContent}
                    onChange={(e) => setBodyContent(e.target.value)}
                    className="input font-mono text-sm min-h-[200px] resize-y"
                    placeholder='{\n  "key": "value"\n}'
                    spellCheck={false}
                  />
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <button className="btn-ghost p-1.5" aria-label="Format JSON">
                      <Code2 className="w-4 h-4" />
                    </button>
                    <button className="btn-ghost p-1.5" aria-label="Copy JSON">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {bodyType === 'form' && (
                <div className="space-y-3">
                  <p className="text-sm text-text-muted">Form data implementation coming soon</p>
                </div>
              )}

              {bodyType === 'raw' && (
                <textarea
                  value={bodyContent}
                  onChange={(e) => setBodyContent(e.target.value)}
                  className="input font-mono text-sm min-h-[200px] resize-y"
                  placeholder="Raw body content..."
                  spellCheck={false}
                />
              )}

              {bodyType === 'none' && (
                <div className="text-center py-12 text-text-muted">
                  <Code2 className="w-12 h-12 mx-auto mb-3 opacity-50" aria-hidden="true" />
                  <p>No request body</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'Auth' && (
            <div className="space-y-4">
              {authTypes.map((type) => (
                <label
                  key={type.value}
                  className={`flex items-start gap-4 p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                    authType === type.value
                      ? 'bg-brand-purple/10 border-brand-purple/30'
                      : 'bg-panel-elevated/50 border-border/50 hover:border-brand-purple/30'
                  }`}
                >
                  <input
                    type="radio"
                    name={`auth-${requestId}`}
                    value={type.value}
                    checked={authType === type.value}
                    onChange={() => setAuthType(type.value)}
                    className="mt-1 w-4 h-4 text-brand-purple border-border bg-panel-elevated focus:ring-brand-purple"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-text-primary">{type.label}</span>
                    <p className="text-sm text-text-muted mt-0.5">
                      {type.value === 'none' && 'Send request without authentication'}
                      {type.value === 'bearer' && 'Add Authorization header with bearer token'}
                      {type.value === 'basic' && 'Username and password authentication'}
                    </p>
                  </div>
                </label>
              ))}

              {authType === 'bearer' && (
                <div className="p-4 bg-panel-elevated/50 border border-border/50 rounded-lg">
                  <label className="label">Bearer Token</label>
                  <input
                    type="password"
                    value={authToken}
                    onChange={(e) => setAuthToken(e.target.value)}
                    className="input font-mono"
                    placeholder="Enter your bearer token"
                  />
                </div>
              )}

              {authType === 'basic' && (
                <div className="p-4 bg-panel-elevated/50 border border-border/50 rounded-lg space-y-4">
                  <div>
                    <label className="label">Username</label>
                    <input
                      type="text"
                      value={authUsername}
                      onChange={(e) => setAuthUsername(e.target.value)}
                      className="input"
                      placeholder="Username"
                    />
                  </div>
                  <div>
                    <label className="label">Password</label>
                    <input
                      type="password"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="input"
                      placeholder="Password"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}