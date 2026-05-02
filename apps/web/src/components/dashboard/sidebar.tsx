'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  BookOpen, 
  Heart, 
  Briefcase, 
  MessageCircle, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

export default function DashboardSidebar() {
  const t = useTranslations('dashboard');
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: `/${locale}/dashboard`, icon: Home, label: t('profile') },
    { href: `/${locale}/dashboard/bookings`, icon: BookOpen, label: t('bookings') },
    { href: `/${locale}/dashboard/saved`, icon: Heart, label: t('saved') },
    { href: `/${locale}/dashboard/listings`, icon: Briefcase, label: t('listings') },
    { href: `/${locale}/dashboard/reviews`, icon: MessageCircle, label: t('reviews') },
    { href: `/${locale}/dashboard/settings`, icon: Settings, label: t('settings') },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg hover:bg-border-primary"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-background border-r border-border-primary transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:border-r md:bg-background`}
      >
        <div className="p-6">
          <Link href={`/${locale}`} className="text-2xl font-bold text-primary">
            Ajir
          </Link>
        </div>

        <nav className="space-y-2 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.includes(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-text hover:bg-border-primary'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-text hover:bg-border-primary transition-colors">
            <LogOut size={20} />
            <span>{t('logout')}</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
