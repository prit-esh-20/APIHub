'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  History,
  Settings,
  FlaskConical,
  GitBranch,
  FileText,
  Activity,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  User,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'History', href: '/history', icon: History },
];

const tools = [
  { name: 'Testing', href: '/testing', icon: FlaskConical, comingSoon: true },
  { name: 'Workflows', href: '/workflows', icon: GitBranch, comingSoon: true },
  { name: 'Mock APIs', href: '/mocks', icon: FileText, comingSoon: true },
  { name: 'Documentation', href: '/docs', icon: FileText, comingSoon: true },
  { name: 'Monitoring', href: '/monitoring', icon: Activity, comingSoon: true },
];

const settingsNav = [
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (href: string) => pathname === href || (href !== '/dashboard' && pathname.startsWith(href));

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background" aria-hidden="true">
        <div className="flex h-screen" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-border flex flex-col transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-20' : ''} ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-2" aria-label="APIHub Home">
            <svg className="w-8 h-8 text-brand-purple flex-shrink-0" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <rect width="32" height="32" rx="8" className="fill-brand-purple" />
              <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {!sidebarCollapsed && <span className="font-semibold text-xl text-text-primary">APIHub</span>}
          </Link>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-panel-elevated transition-colors lg:hidden"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!sidebarCollapsed}
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1" role="navigation" aria-label="Primary navigation">
          <div className="px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
            Navigation
          </div>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`sidebar-link ${isActive(item.href) ? 'sidebar-link-active' : ''} group`}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              {!sidebarCollapsed && <span>{item.name}</span>}
            </Link>
          ))}

          <div className="pt-4 mt-4 border-t border-border/50" />
          <div className="px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
            Tools
          </div>
          {tools.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`sidebar-link ${isActive(item.href) ? 'sidebar-link-active' : ''} ${item.comingSoon ? 'opacity-60' : ''} group`}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              {!sidebarCollapsed && (
                <>
                  <span>{item.name}</span>
                  {item.comingSoon && <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-warning/15 text-warning rounded-full">Soon</span>}
                </>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <Link
            href="/settings"
            className={`sidebar-link ${isActive('/settings') ? 'sidebar-link-active' : ''}`}
          >
            <Settings className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            {!sidebarCollapsed && <span>Settings</span>}
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-panel-elevated transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
            <h1 className="text-lg font-semibold text-text-primary truncate">
              {navigation.find(n => isActive(n.href))?.name || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search APIs, projects..."
                className="input pl-10 w-64 sm:w-80"
                aria-label="Global search"
              />
            </div>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-panel-elevated/50 border border-border/50 rounded-lg text-sm font-mono text-text-secondary">
              <span>Environment:</span>
              <select className="bg-transparent border-none outline-none text-text-primary font-medium cursor-pointer">
                <option>Development</option>
                <option>Staging</option>
                <option>Production</option>
              </select>
            </div>

            <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-panel-elevated transition-colors relative" aria-label="Notifications">
              <Bell className="w-5 h-5" aria-hidden="true" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" aria-hidden="true" />
            </button>

            <div className="relative">
              <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-panel-elevated transition-colors" aria-label="User menu" aria-expanded="false" aria-haspopup="true">
                <div className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-brand-purple" aria-hidden="true" />
                </div>
                <span className="hidden md:block text-sm font-medium text-text-primary">John Doe</span>
                <ChevronRight className="w-4 h-4 text-text-muted hidden md:block" aria-hidden="true" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}