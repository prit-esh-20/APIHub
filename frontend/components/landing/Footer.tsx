import Link from 'next/link';
import { Github, Twitter, Mail, ArrowRight } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Documentation', href: '#documentation' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Changelog', href: '#changelog' },
  ],
  company: [
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Careers', href: '#careers' },
    { label: 'Contact', href: '#contact' },
    { label: 'Press', href: '#press' },
  ],
  resources: [
    { label: 'Community', href: '#community' },
    { label: 'Help Center', href: '#help' },
    { label: 'API Reference', href: '#api-reference' },
    { label: 'Status', href: '#status' },
    { label: 'Security', href: '#security' },
  ],
  legal: [
    { label: 'Privacy', href: '#privacy' },
    { label: 'Terms', href: '#terms' },
    { label: 'Cookie Policy', href: '#cookies' },
    { label: 'DPA', href: '#dpa' },
  ],
};

const socialLinks = [
  { icon: Github, href: 'https://github.com/prit-esh-20/APIHub', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/apihub', label: 'Twitter' },
  { icon: Mail, href: 'mailto:hello@apihub.dev', label: 'Email' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sidebar/50 border-t border-border/50" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10 lg:mb-12">
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-text-primary hover:opacity-80 transition-opacity mb-4" aria-label="APIHub Home">
              <svg className="w-8 h-8 text-brand-purple" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <rect width="32" height="32" rx="8" className="fill-brand-purple" />
                <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-semibold text-xl tracking-tight">APIHub</span>
            </Link>
            <p className="text-text-muted text-sm mb-6">
              Your APIs. One Hub. Build, test, automate, mock, document, and monitor APIs in one unified workspace.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-panel-elevated transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Product links">
            <h3 className="font-semibold text-text-primary mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company links">
            <h3 className="font-semibold text-text-primary mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources links">
            <h3 className="font-semibold text-text-primary mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal links">
            <h3 className="font-semibold text-text-primary mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-muted">
              © {currentYear} APIHub. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="/login"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="btn-primary text-sm px-4 py-2"
              >
                Get Started
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}