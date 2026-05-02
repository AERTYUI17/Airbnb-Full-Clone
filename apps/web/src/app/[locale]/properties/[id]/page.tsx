'use client'

import { useRouter } from "next/navigation";
import { mockProperties, trendingProperties, nearbyProperties } from "@/data/mock-properties";
import { useLocale } from "next-intl";
import Image from "next/image";
import { Heart, Star, MapPin, Users, Calendar, Shield } from "lucide-react";
import { useState } from "react";

interface PropertyDetailPageProps {
    params: {
        id: string;
        locale: string;
    };
}

const PropertyDetailPage = ({ params }: PropertyDetailPageProps) => {
    const router = useRouter();
    const locale = useLocale();
    const [isSaved, setIsSaved] = useState(false);

    const allProperties = [...mockProperties, ...trendingProperties, ...nearbyProperties];
    const property = allProperties.find(p => p.id === params.id);

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-secondary mb-4">Propiedad no encontrada</h1>
                    <button
                        onClick={() => router.back()}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-[#3da59e]"
                    >
                        Volver
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-5xl mx-auto px-4 py-8">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="mb-6 text-primary hover:text-[#3da59e] font-semibold"
                >
                    ← Volver
                </button>

                {/* Image Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 rounded-xl overflow-hidden">
                    {property.images?.slice(0, 4).map((image, idx) => (
                        <div key={idx} className="relative aspect-square bg-gray-200">
                            <Image
                                src={image}
                                alt={`${property.title} ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Property Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        {/* Header */}
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h1 className="text-4xl font-bold text-secondary mb-2">
                                        {property.title}
                                    </h1>
                                    <div className="flex items-center gap-2 text-secondary">
                                        <MapPin className="w-5 h-5" />
                                        <span>{property.location}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsSaved(!isSaved)}
                                    className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl"
                                >
                                    <Heart 
                                        className={`w-6 h-6 transition-colors ${
                                            isSaved 
                                                ? 'fill-primary text-primary' 
                                                : 'text-gray-700'
                                        }`}
                                    />
                                </button>
                            </div>

                            {/* Badges */}
                            <div className="flex gap-2 flex-wrap">
                                {property.isGuestFavorite && (
                                    <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                                        ⭐ Favorito de huéspedes
                                    </div>
                                )}
                                {property.isSuperhost && (
                                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                        <Shield className="w-4 h-4" />
                                        Superhost
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                <span className="text-lg font-semibold text-secondary">{property.rating}</span>
                                <span className="text-gray-600">(127 reseñas)</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-secondary">Acerca de este lugar</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Hermosa propiedad ubicada en {property.location}. Perfecta para familias y grupos. 
                                Ofrece todas las comodidades modernas con un toque de encanto local. La propiedad cuenta 
                                con vistas espectaculares y está bien equipada para su comodidad.
                            </p>
                        </div>

                        {/* Amenities */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-secondary">Comodidades</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {['WiFi', 'Cocina', 'Aire acondicionado', 'Lavadora', 'Secadora', 'Piscina'].map((amenity) => (
                                    <div key={amenity} className="flex items-center gap-2 text-secondary">
                                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs">✓</span>
                                        </div>
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Card */}
                    <div className="md:col-span-1">
                        <div className="bg-white border border-gray-300 rounded-lg p-6 sticky top-24 shadow-lg">
                            <div className="mb-6">
                                <div className="text-3xl font-bold text-secondary mb-1">
                                    ${property.price}
                                    <span className="text-sm font-normal text-gray-600"> por noche</span>
                                </div>
                            </div>

                            <button 
                                onClick={() => router.push(`/${locale}/bookings`)}
                                className="w-full bg-primary hover:bg-[#3da59e] text-white font-bold py-3 rounded-lg mb-4 transition-colors"
                            >
                                Reservar ahora
                            </button>

                            <div className="space-y-4 text-sm text-gray-600 border-t border-gray-200 pt-4">
                                <div className="flex justify-between">
                                    <span>${property.price} x 1 noche</span>
                                    <span>${property.price}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tarifa de servicio</span>
                                    <span>${Math.round(property.price * 0.1)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-secondary text-base border-t border-gray-200 pt-4">
                                    <span>Total</span>
                                    <span>${Math.round(property.price * 1.1)}</span>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-600">
                                    Esta es una propiedad verificada por Ajir. Garantizamos la calidad y seguridad de tu estadía.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailPage;
