'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronDown,
  MoreVertical,
  FileText,
  Plus,
  Trash2,
  Edit2,
  Copy,
  FolderKanban,
  FolderOpen,
} from 'lucide-react';

interface CollectionItem {
  id: string;
  name: string;
  type: 'folder' | 'request';
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  children?: readonly CollectionItem[];
}

interface CollectionsPanelProps {
  collections: readonly CollectionItem[];
  activeRequestId: string | null;
  onRequestClick: (request: { id: string; name: string; method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' }) => void;
  onFolderToggle: (folderId: string) => void;
  sidebarOpen: boolean;
}

const methodColors: Record<string, string> = {
  GET: 'bg-http-get/15 text-http-get border-http-get/30',
  POST: 'bg-http-post/15 text-http-post border-http-post/30',
  PUT: 'bg-http-put/15 text-http-put border-http-put/30',
  PATCH: 'bg-http-patch/15 text-http-patch border-http-patch/30',
  DELETE: 'bg-http-delete/15 text-http-delete border-http-delete/30',
};

function CollectionItem({
  item,
  depth = 0,
  activeRequestId,
  onRequestClick,
  onFolderToggle,
  sidebarOpen,
}: {
  item: CollectionItem;
  depth?: number;
  activeRequestId: string | null;
  onRequestClick: (request: { id: string; name: string; method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' }) => void;
  onFolderToggle: (folderId: string) => void;
  sidebarOpen: boolean;
}) {
  const [expanded, setExpanded] = useState(true);

  if (item.type === 'request') {
    const isActive = activeRequestId === item.id;
    return (
      <motion.button
        key={item.id}
        onClick={() => onRequestClick({ id: item.id!, name: item.name, method: item.method! })}
        className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-all duration-200 ${
          isActive
            ? 'bg-brand-purple/15 text-brand-purple'
            : 'text-text-secondary hover:text-text-primary hover:bg-panel-elevated'
        }`}
        aria-current={isActive ? 'page' : undefined}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        {sidebarOpen && (
          <span
            className={`px-1.5 py-0.5 rounded text-xs font-mono font-semibold ${methodColors[item.method!]}`}
          >
            {item.method}
          </span>
        )}
        {sidebarOpen && (
          <span className="truncate flex-1">{item.name}</span>
        )}
        {!sidebarOpen && (
          <span className="text-center w-full" title={item.name}>
            <FileText className="w-5 h-5 mx-auto" aria-hidden="true" />
          </span>
        )}
      </motion.button>
    );
  }

  return (
    <div key={item.id}>
      <button
        onClick={() => {
          setExpanded(!expanded);
          onFolderToggle(item.id);
        }}
        className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-all duration-200 text-text-secondary hover:text-text-primary hover:bg-panel-elevated`}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
        aria-expanded={expanded}
      >
        {sidebarOpen && (
          <motion.div
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-5 h-5 flex items-center justify-center text-text-muted"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        )}
        {sidebarOpen && (
          <>
            <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--folder-color, #8B5CF6)20' }}>
              <FolderKanban className="w-4 h-4" style={{ color: 'var(--folder-color, #8B5CF6)' }} aria-hidden="true" />
            </div>
            <span className="truncate flex-1 font-medium">{item.name}</span>
          </>
        )}
        {!sidebarOpen && (
          <span className="text-center w-full" title={item.name}>
            <FolderOpen className="w-5 h-5 mx-auto" aria-hidden="true" />
          </span>
        )}
      </button>

      <AnimatePresence>
        {expanded && item.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {item.children.map((child) => (
              <CollectionItem
                key={child.id}
                item={child}
                depth={depth + 1}
                activeRequestId={activeRequestId}
                onRequestClick={onRequestClick}
                onFolderToggle={onFolderToggle}
                sidebarOpen={sidebarOpen}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState } from 'react';

export default function CollectionsPanel({
  collections,
  activeRequestId,
  onRequestClick,
  onFolderToggle,
  sidebarOpen,
}: CollectionsPanelProps) {
  return (
    <div className="space-y-1">
      {collections.map((item) => (
        <CollectionItem
          key={item.id}
          item={item}
          activeRequestId={activeRequestId}
          onRequestClick={onRequestClick}
          onFolderToggle={onFolderToggle}
          sidebarOpen={sidebarOpen}
        />
      ))}
    </div>
  );
}