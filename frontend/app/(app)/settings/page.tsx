'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, Bell, Palette, Keyboard, Moon, Sun, Monitor, Save, Loader2, Trash2 } from 'lucide-react';

const settingsSections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'shortcuts', label: 'Keyboard Shortcuts', icon: Keyboard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
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
          <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
          <p className="text-text-secondary mt-1">Manage your APIHub preferences and account settings</p>
        </div>
        <motion.button
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary gap-2"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Save className="w-4 h-4" />
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </motion.button>
      </motion.div>

      <div className="flex gap-6">
        <aside className="w-52 lg:w-64 flex-shrink-0">
          <nav className="card p-3 space-y-1" aria-label="Settings sections">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-brand-purple/15 text-brand-purple border border-brand-purple/30'
                    : 'text-text-secondary hover:text-text-primary hover:bg-panel-elevated'
                }`}
                aria-current={activeSection === section.id ? 'page' : undefined}
              >
                <section.icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="card p-6"
            >
              {activeSection === 'profile' && <ProfileSettings />}
              {activeSection === 'appearance' && <AppearanceSettings />}
              {activeSection === 'shortcuts' && <ShortcutsSettings />}
              {activeSection === 'notifications' && <NotificationsSettings />}
              {activeSection === 'security' && <SecuritySettings />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ProfileSettings() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [avatar, setAvatar] = useState('');

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-lg font-semibold text-text-primary">Profile</h2>
      <p className="text-text-secondary">Manage your account profile and public information</p>

      <div className="card p-6">
        <h3 className="font-medium text-text-primary mb-4">Basic Information</h3>
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-brand-purple/20 flex items-center justify-center overflow-hidden">
              {avatar ? (
                <img src={avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-brand-purple" aria-hidden="true" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 btn-primary p-2" htmlFor="avatar-upload">
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => setAvatar(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>
          <div>
            <h4 className="font-medium text-text-primary">Profile Picture</h4>
            <p className="text-sm text-text-muted">Click to upload a new avatar</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="label">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="label">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="bio" className="label">Bio</label>
          <textarea
            id="bio"
            className="input min-h-[100px] resize-y"
            placeholder="Tell us about yourself..."
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}

function AppearanceSettings() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const [density, setDensity] = useState<'compact' | 'comfortable' | 'spacious'>('comfortable');
  const [animations, setAnimations] = useState(true);

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-lg font-semibold text-text-primary">Appearance</h2>
      <p className="text-text-secondary">Customize how APIHub looks and feels</p>

      <div className="card p-6 space-y-6">
        <div>
          <h3 className="font-medium text-text-primary mb-4">Theme</h3>
          <div className="grid grid-cols-3 gap-3">
            {(['dark', 'light', 'system'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  theme === t
                    ? 'border-brand-purple bg-brand-purple/10'
                    : 'border-border hover:border-brand-purple/30'
                }`}
                aria-pressed={theme === t}
              >
                <div className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center" style={{
                  backgroundColor: t === 'dark' ? '#0B0F19' : t === 'light' ? '#F8FAFC' : 'linear-gradient(135deg, #0B0F19, #F8FAFC)',
                }}>
                  {t === 'dark' && <Moon className="w-5 h-5 text-brand-purple" />}
                  {t === 'light' && <Sun className="w-5 h-5 text-warning" />}
                  {t === 'system' && <Monitor className="w-5 h-5 text-brand-cyan" />}
                </div>
                <p className="text-center text-sm font-medium capitalize">{t}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-text-primary mb-4">Layout Density</h3>
          <div className="grid grid-cols-3 gap-3">
            {(['compact', 'comfortable', 'spacious'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDensity(d)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  density === d
                    ? 'border-brand-purple bg-brand-purple/10'
                    : 'border-border hover:border-brand-purple/30'
                }`}
                aria-pressed={density === d}
              >
                <div className="w-10 h-10 rounded-lg mx-auto mb-2 bg-panel-elevated border border-border" style={{
                  padding: d === 'compact' ? '8px' : d === 'comfortable' ? '12px' : '16px',
                }}>
                  <div className="w-full h-2 bg-brand-purple/30 rounded mb-1" />
                  <div className="w-full h-2 bg-brand-purple/30 rounded mb-1" />
                  <div className="w-full h-2 bg-brand-purple/30 rounded" />
                </div>
                <p className="text-center text-sm font-medium capitalize">{d}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-text-primary mb-4">Animations</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={animations}
              onChange={(e) => setAnimations(e.target.checked)}
              className="w-5 h-5 rounded border-border bg-panel-elevated text-brand-purple focus:ring-brand-purple"
            />
            <div>
              <p className="font-medium text-text-primary">Enable animations</p>
              <p className="text-sm text-text-muted">Disable motion effects and transitions</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

function ShortcutsSettings() {
  const shortcuts = [
    { action: 'New Request', keys: ['⌘', 'N'] },
    { action: 'Send Request', keys: ['⌘', 'Enter'] },
    { action: 'Toggle Sidebar', keys: ['⌘', 'B'] },
    { action: 'Focus URL Bar', keys: ['⌘', 'L'] },
    { action: 'Switch Tab', keys: ['⌘', '⇧', '[/]'] },
    { action: 'Close Tab', keys: ['⌘', 'W'] },
    { action: 'Open History', keys: ['⌘', 'H'] },
    { action: 'Open Environments', keys: ['⌘', 'E'] },
    { action: 'Open Settings', keys: ['⌘', ','] },
    { action: 'Search', keys: ['⌘', 'K'] },
    { action: 'Duplicate Request', keys: ['⌘', 'D'] },
    { action: 'Format JSON', keys: ['⌘', '⇧', 'F'] },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-lg font-semibold text-text-primary">Keyboard Shortcuts</h2>
      <p className="text-text-secondary">View and customize keyboard shortcuts for faster workflow</p>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="p-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Action</th>
                <th className="p-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider">Shortcut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {shortcuts.map((shortcut) => (
                <tr key={shortcut.action} className="hover:bg-panel-elevated/50">
                  <td className="p-4 text-text-primary">{shortcut.action}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {shortcut.keys.map((key, i) => (
                        <kbd key={i} className="px-2 py-1 text-xs font-mono bg-panel-elevated border border-border rounded">
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function NotificationsSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [requestFailures, setRequestFailures] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-lg font-semibold text-text-primary">Notifications</h2>
      <p className="text-text-secondary">Configure how you receive updates from APIHub</p>

      <div className="card p-6 space-y-6">
        <div>
          <h3 className="font-medium text-text-primary mb-4">Delivery Methods</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-5 h-5 rounded border-border bg-panel-elevated text-brand-purple focus:ring-brand-purple"
              />
              <div>
                <p className="font-medium text-text-primary">Email notifications</p>
                <p className="text-sm text-text-muted">Receive important updates via email</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={pushNotifications}
                onChange={(e) => setPushNotifications(e.target.checked)}
                className="w-5 h-5 rounded border-border bg-panel-elevated text-brand-purple focus:ring-brand-purple"
              />
              <div>
                <p className="font-medium text-text-primary">Push notifications</p>
                <p className="text-sm text-text-muted">Get real-time alerts in your browser</p>
              </div>
            </label>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="font-medium text-text-primary mb-4">Notification Types</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={requestFailures}
                onChange={(e) => setRequestFailures(e.target.checked)}
                className="w-5 h-5 rounded border-border bg-panel-elevated text-brand-purple focus:ring-brand-purple"
              />
              <div>
                <p className="font-medium text-text-primary">Request failures</p>
                <p className="text-sm text-text-muted">Notify me when API requests fail</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={weeklyDigest}
                onChange={(e) => setWeeklyDigest(e.target.checked)}
                className="w-5 h-5 rounded border-border bg-panel-elevated text-brand-purple focus:ring-brand-purple"
              />
              <div>
                <p className="font-medium text-text-primary">Weekly digest</p>
                <p className="text-sm text-text-muted">Receive a summary of your API activity every week</p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecuritySettings() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-lg font-semibold text-text-primary">Security</h2>
      <p className="text-text-secondary">Manage your account security settings</p>

      <div className="card p-6 space-y-6">
        <div>
          <h3 className="font-medium text-text-primary mb-4">Two-Factor Authentication</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactor}
              onChange={(e) => setTwoFactor(e.target.checked)}
              className="w-5 h-5 rounded border-border bg-panel-elevated text-brand-purple focus:ring-brand-purple"
            />
            <div>
              <p className="font-medium text-text-primary">Enable 2FA</p>
              <p className="text-sm text-text-muted">Add an extra layer of security to your account</p>
            </div>
          </label>
          {!twoFactor && (
            <motion.button
              className="btn-secondary mt-3 gap-2"
              whileHover={{ scale: 1.01 }}
            >
              <Shield className="w-4 h-4" />
              Set up 2FA
            </motion.button>
          )}
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="font-medium text-text-primary mb-4">Password</h3>
          <div className="space-y-4">
            <motion.button
              className="btn-secondary w-full sm:w-auto gap-2 justify-start"
              whileHover={{ scale: 1.01 }}
            >
              <Shield className="w-4 h-4" />
              Change Password
            </motion.button>
            <p className="text-sm text-text-muted">Last changed 3 months ago</p>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="font-medium text-text-primary mb-4">Session Management</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="session-timeout" className="label">Session timeout</label>
              <select
                id="session-timeout"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="input w-auto"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="240">4 hours</option>
                <option value="480">8 hours</option>
              </select>
            </div>
            <motion.button
              className="btn-secondary w-full sm:w-auto gap-2 justify-start"
              whileHover={{ scale: 1.01 }}
            >
              <Shield className="w-4 h-4" />
              Log out of all devices
            </motion.button>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="font-medium text-text-primary mb-4">Danger Zone</h3>
          <div className="p-4 bg-error/10 border border-error/30 rounded-lg">
            <p className="font-medium text-error mb-2">Delete Account</p>
            <p className="text-sm text-text-muted mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
            <motion.button className="btn-danger gap-2" whileHover={{ scale: 1.01 }}>
              <Trash2 className="w-4 h-4" />
              Delete Account
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}