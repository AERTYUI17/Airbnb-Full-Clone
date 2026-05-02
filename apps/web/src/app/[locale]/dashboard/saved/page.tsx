'use client';

export const dynamic = 'force-dynamic';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Heart, MapPin, Star, Trash2 } from 'lucide-react';

const mockSaved = [
  {
    id: 1,
    title: "Ático luminoso en el centro",
    location: "Argel, Argelia",
    price: 89,
    rating: 4.92,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80",
  },
  {
    id: 2,
    title: "Cabaña frente al mar",
    location: "Telmecén, Argelia",
    price: 112,
    rating: 4.91,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
  },
  {
    id: 3,
    title: "Villa con piscina privada",
    location: "Blida, Argelia",
    price: 156,
    rating: 4.94,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80",
  },
];

export default function SavedPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">
          {t('savedProperties')}
        </h1>
        <p className="text-text-2">Your favorite places to stay</p>
      </div>

      {/* Properties Grid */}
      {mockSaved.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSaved.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl border border-border-primary overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="relative w-full h-48 group">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                  <Heart size={20} fill="currentColor" />
                </button>
              </div>

              {/* Details */}
              <div className="p-4">
                <h3 className="font-bold text-text mb-2 line-clamp-2">
                  {property.title}
                </h3>

                <div className="flex items-center gap-2 text-text-2 text-sm mb-3">
                  <MapPin size={16} />
                  <span>{property.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-primary fill-primary" />
                    <span className="font-semibold text-text">
                      {property.rating}
                    </span>
                  </div>
                  <span className="font-bold text-text">
                    ${property.price}
                    <span className="text-sm text-text-2">/night</span>
                  </span>
                </div>

                <button className="w-full mt-4 p-2 text-red-500 hover:bg-red-50 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Trash2 size={18} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border-primary p-12 text-center">
          <p className="text-lg text-text-2 mb-4">{t('noSaved')}</p>
          <button className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
            Explore Properties
          </button>
        </div>
      )}
    </div>
  );
}
