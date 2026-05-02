'use client';

import { useTranslations } from 'next-intl';
import { User, Mail, Phone, MapPin } from 'lucide-react';

export default function ProfilePage() {
  const t = useTranslations('dashboard');

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">
          {t('welcomeBack')}
        </h1>
        <p className="text-text-2">Manage your profile and account settings</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-border-primary p-8 mb-8">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
              <User size={48} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text">John Doe</h2>
              <p className="text-text-2">Member since 2024</p>
            </div>
          </div>
          <button className="px-6 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-colors">
            {t('editProfile')}
          </button>
        </div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-border-primary pt-8">
          <div className="flex items-center gap-4">
            <Mail className="text-primary" size={24} />
            <div>
              <p className="text-sm text-text-2 mb-1">Email</p>
              <p className="text-text font-medium">john.doe@example.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="text-primary" size={24} />
            <div>
              <p className="text-sm text-text-2 mb-1">Phone</p>
              <p className="text-text font-medium">+213 550 123 456</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <MapPin className="text-primary" size={24} />
            <div>
              <p className="text-sm text-text-2 mb-1">Location</p>
              <p className="text-text font-medium">Algiers, Algeria</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded bg-primary" />
            <div>
              <p className="text-sm text-text-2 mb-1">Status</p>
              <p className="text-text font-medium">Verified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Preferences */}
      <div className="bg-white rounded-xl border border-border-primary p-8">
        <h3 className="text-xl font-bold text-text mb-6">{t('preferences')}</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
            <div>
              <p className="font-medium text-text">Email notifications</p>
              <p className="text-sm text-text-2">Receive updates about bookings and messages</p>
            </div>
            <input type="checkbox" className="w-6 h-6" defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
            <div>
              <p className="font-medium text-text">SMS notifications</p>
              <p className="text-sm text-text-2">Get instant alerts on your phone</p>
            </div>
            <input type="checkbox" className="w-6 h-6" defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
            <div>
              <p className="font-medium text-text">Marketing emails</p>
              <p className="text-sm text-text-2">Learn about new features and promotions</p>
            </div>
            <input type="checkbox" className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
