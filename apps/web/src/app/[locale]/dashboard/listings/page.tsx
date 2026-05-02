'use client';

import { useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';

export default function ListingsPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">
            {t('listings')}
          </h1>
          <p className="text-text-2">Manage your property listings</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          <Plus size={20} />
          Create New Listing
        </button>
      </div>

      <div className="bg-white rounded-xl border border-border-primary p-12 text-center">
        <p className="text-lg text-text-2 mb-4">You don't have any listings yet</p>
        <button className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
          Create Your First Listing
        </button>
      </div>
    </div>
  );
}
