'use client'

import { useRouter, useLocale } from "next-intl";
import { mockProperties, trendingProperties, nearbyProperties } from "@/data/mock-properties";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { useState } from "react";

const PropertiesPage = () => {
    const router = useRouter();
    const locale = useLocale();
    const [savedProperties, setSavedProperties] = useState<string[]>([]);

    const allProperties = [...mockProperties, ...trendingProperties, ...nearbyProperties];

    const toggleSave = (propertyId: string) => {
        setSavedProperties(prev => 
            prev.includes(propertyId) 
                ? prev.filter(id => id !== propertyId)
                : [...prev, propertyId]
        );
    };

    const handlePropertyClick = (propertyId: string) => {
        router.push(`/${locale}/properties/${propertyId}`);
    };

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-secondary mb-8">Todas las propiedades</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {allProperties.map((property) => (
                        <div 
                            key={property.id} 
                            className="group cursor-pointer"
                            onClick={() => handlePropertyClick(property.id)}
                        >
                            <div className="relative mb-3 overflow-hidden rounded-xl bg-gray-200 aspect-square">
                                <Image
                                    src={property.images?.[0] || '/placeholder.png'}
                                    alt={property.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleSave(property.id);
                                    }}
                                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <Heart 
                                        className={`w-5 h-5 transition-colors ${
                                            savedProperties.includes(property.id)
                                                ? 'fill-primary text-primary'
                                                : 'text-gray-700'
                                        }`}
                                    />
                                </button>

                                {property.isGuestFavorite && (
                                    <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 text-xs font-semibold text-secondary">
                                        Favorito
                                    </div>
                                )}

                                {property.isSuperhost && (
                                    <div className="absolute bottom-3 left-3 bg-white rounded-full px-3 py-1 text-xs font-semibold text-secondary">
                                        Superhost
                                    </div>
                                )}
                            </div>

                            <div className="space-y-1">
                                <h3 className="font-semibold text-secondary line-clamp-2">
                                    {property.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {property.location}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {property.distance}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {property.dates}
                                </p>
                                <div className="flex justify-between items-center pt-2">
                                    <div>
                                        <span className="font-semibold text-secondary">${property.price}</span>
                                        <span className="text-sm text-gray-600"> por noche</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-semibold text-secondary">
                                            {property.rating}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PropertiesPage;
