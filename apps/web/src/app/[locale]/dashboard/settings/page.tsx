'use client';

import { useTranslations } from 'next-intl';
import { Lock, Bell, Globe } from 'lucide-react';

export default function SettingsPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">
          {t('settings')}
        </h1>
        <p className="text-text-2">Manage your account settings and preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Security Section */}
        <div className="bg-white rounded-xl border border-border-primary p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lock size={24} className="text-primary" />
            <h2 className="text-xl font-bold text-text">Security</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
              <div>
                <p className="font-medium text-text">Change Password</p>
                <p className="text-sm text-text-2">Update your account password</p>
              </div>
              <button className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                Change
              </button>
            </div>
            <div className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
              <div>
                <p className="font-medium text-text">Two-Factor Authentication</p>
                <p className="text-sm text-text-2">Add an extra layer of security</p>
              </div>
              <button className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                Enable
              </button>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-xl border border-border-primary p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell size={24} className="text-primary" />
            <h2 className="text-xl font-bold text-text">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
              <div>
                <p className="font-medium text-text">Email Notifications</p>
                <p className="text-sm text-text-2">Receive updates about your bookings</p>
              </div>
              <input type="checkbox" className="w-6 h-6" defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
              <div>
                <p className="font-medium text-text">SMS Notifications</p>
                <p className="text-sm text-text-2">Get alerts on your phone</p>
              </div>
              <input type="checkbox" className="w-6 h-6" defaultChecked />
            </div>
          </div>
        </div>

        {/* Language & Region Section */}
        <div className="bg-white rounded-xl border border-border-primary p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe size={24} className="text-primary" />
            <h2 className="text-xl font-bold text-text">Language & Region</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-border-primary rounded-lg">
              <label className="block text-sm text-text-2 mb-2">Language</label>
              <select className="w-full p-3 border border-border-primary rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary">
                <option>English</option>
                <option>العربية (Arabic)</option>
                <option>中文 (Chinese)</option>
                <option>Swahili</option>
                <option>Français (French)</option>
              </select>
            </div>
            <div className="p-4 border border-border-primary rounded-lg">
              <label className="block text-sm text-text-2 mb-2">Currency</label>
              <select className="w-full p-3 border border-border-primary rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>DZD (د.ج)</option>
                <option>GBP (£)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8">
        <button className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
          Save Changes
        </button>
      </div>
    </div>
  );
}
