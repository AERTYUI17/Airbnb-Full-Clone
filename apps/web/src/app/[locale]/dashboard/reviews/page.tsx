'use client';

import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';

const mockReviews = [
  {
    id: 1,
    from: "Maria García",
    property: "Ático luminoso en el centro",
    rating: 5,
    date: "2026-05-20",
    comment: "Amazing experience! The apartment was clean and well-maintained. Highly recommended!",
  },
  {
    id: 2,
    from: "Ahmed Hassan",
    property: "Villa con piscina privada",
    rating: 4,
    date: "2026-04-15",
    comment: "Great stay overall. The pool was fantastic and the location was perfect.",
  },
];

export default function ReviewsPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-text mb-2">
          {t('reviews')}
        </h1>
        <p className="text-text-2">Reviews from your guests</p>
      </div>

      <div className="mt-8 space-y-4">
        {mockReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-xl border border-border-primary p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-text">{review.from}</h3>
                <p className="text-sm text-text-2">{review.property}</p>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < review.rating
                        ? 'text-primary fill-primary'
                        : 'text-border-primary'
                    }
                  />
                ))}
              </div>
            </div>
            <p className="text-text-2 mb-3">{review.comment}</p>
            <p className="text-sm text-text-2">{review.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
