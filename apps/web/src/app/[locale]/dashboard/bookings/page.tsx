'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Calendar, MapPin, Users, MoreVertical } from 'lucide-react';

const mockBookings = [
  {
    id: 1,
    title: "Ático luminoso en el centro",
    location: "Argel, Argelia",
    checkIn: "2026-05-15",
    checkOut: "2026-05-20",
    guests: 2,
    price: 445,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80",
    status: "Confirmed"
  },
  {
    id: 2,
    title: "Villa con piscina privada",
    location: "Blida, Argelia",
    checkIn: "2026-06-10",
    checkOut: "2026-06-15",
    guests: 4,
    price: 780,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
    status: "Upcoming"
  },
];

export default function BookingsPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">
          {t('yourBookings')}
        </h1>
        <p className="text-text-2">View and manage all your reservations</p>
      </div>

      {/* Bookings List */}
      {mockBookings.length > 0 ? (
        <div className="space-y-4">
          {mockBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl border border-border-primary overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                  <Image
                    src={booking.image}
                    alt={booking.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-lg px-3 py-1 text-sm font-semibold text-text">
                    {booking.status}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-text mb-2">
                      {booking.title}
                    </h3>
                    <div className="space-y-2 text-text-2 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={18} />
                        <span>{booking.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <span>
                          {booking.checkIn} to {booking.checkOut}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={18} />
                        <span>{booking.guests} guests</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border-primary">
                    <div>
                      <p className="text-sm text-text-2 mb-1">Total price</p>
                      <p className="text-2xl font-bold text-text">
                        ${booking.price}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                        View Details
                      </button>
                      <button className="p-2 rounded-lg hover:bg-border-primary">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border-primary p-12 text-center">
          <p className="text-lg text-text-2 mb-4">{t('noBookings')}</p>
          <button className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
            Start Exploring
          </button>
        </div>
      )}
    </div>
  );
}
