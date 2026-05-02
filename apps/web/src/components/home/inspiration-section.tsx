"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

interface Destination {
  city: string;
  type: string;
  href: string;
}

interface Tab {
  id: string;
  label: string;
  destinations: Destination[];
}

const tabs: Tab[] = [
  {
    id: "trending",
    label: "Más buscados",
    destinations: [
      { city: "Argel", type: "Apartamentos en alquiler", href: "/properties" },
      { city: "Orán", type: "Villas en alquiler", href: "/properties" },
      { city: "Constantina", type: "Casas en alquiler", href: "/properties" },
      { city: "Ánaba", type: "Apartamentos en alquiler", href: "/properties" },
      { city: "Blida", type: "Villas en alquiler", href: "/properties" },
      { city: "Tlemecén", type: "Casas rurales en alquiler", href: "/properties" },
      { city: "Batna", type: "Apartamentos en alquiler", href: "/properties" },
      { city: "Sidi Bel Abbés", type: "Casas en alquiler", href: "/properties" },
      { city: "Medea", type: "Villas en alquiler", href: "/properties" },
      { city: "Tipasa", type: "Apartamentos en alquiler", href: "/properties" },
      { city: "Chercell", type: "Casas en alquiler", href: "/properties" },
      { city: "Bufarik", type: "Villas en alquiler", href: "/properties" },
    ],
  },
  {
    id: "beaches",
    label: "Playas",
    destinations: [
      { city: "Ánaba", type: "Villas en alquiler", href: "/properties" },
      { city: "Orán", type: "Apartamentos en alquiler", href: "/properties" },
      { city: "Tipasa", type: "Casas en alquiler", href: "/properties" },
      { city: "Argel", type: "Villas en alquiler", href: "/properties" },
      { city: "Chercell", type: "Casas en alquiler", href: "/properties" },
      { city: "Ghazaouet", type: "Apartamentos en alquiler", href: "/properties" },
      { city: "Collo", type: "Villas en alquiler", href: "/properties" },
      { city: "Beni Saf", type: "Casas en alquiler", href: "/properties" },
      { city: "Mers El Kébir", type: "Apartamentos en alquiler", href: "/properties" },
      { city: "Sidi Boumediene", type: "Villas en alquiler", href: "/properties" },
      { city: "Saïdia", type: "Apartamentos en alquiler", href: "/properties" },
      { city: "Djinet", type: "Casas en alquiler", href: "/properties" },
    ],
  },
  {
    id: "cities",
    label: "Ciudades",
    destinations: [
      { city: "Argel", type: "Apartamentos en alquiler", href: "/properties" },
      { city: "Orán", type: "Casas en alquiler", href: "/properties" },
      { city: "Constantina", type: "Apartamentos en alquiler", href: "/properties" },
      { city: "Annaba", type: "Casas flotantes en alquiler", href: "/properties" },
      { city: "Blida", type: "Apartamentos en alquiler", href: "/properties" },
      { city: "Tlemecén", type: "Lofts en alquiler", href: "/properties" },
      { city: "Batna", type: "Apartamentos en alquiler", href: "/properties" },
      { city: "Sidi Bel Abbés", type: "Casas en alquiler", href: "/properties" },
      { city: "M'Sila", type: "Apartamentos en alquiler", href: "/properties" },
      { city: "Tebessa", type: "Lofts en alquiler", href: "/properties" },
      { city: "Guelma", type: "Apartamentos en alquiler", href: "/properties" },
      { city: "Souk Ahras", type: "Casas en alquiler", href: "/properties" },
    ],
  },
  {
    id: "historic",
    label: "Con historia",
    destinations: [
      { city: "Constantina", type: "Casas en alquiler", href: "/properties" },
      { city: "Tlemecén", type: "Apartamentos en alquiler", href: "/properties" },
      { city: "Tipasa", type: "Casas en alquiler", href: "/properties" },
      { city: "Timgad", type: "Apartamentos en alquiler", href: "/properties" },
      { city: "Ávila", type: "Casas rurales en alquiler", href: "/s/avila/cottages" },
      { city: "Cuenca", type: "Casas en alquiler", href: "/s/cuenca/houses" },
      { city: "Cáceres", type: "Apartamentos en alquiler", href: "/s/caceres/apartments" },
      { city: "Mérida", type: "Casas en alquiler", href: "/s/merida/houses" },
      { city: "Ronda", type: "Villas en alquiler", href: "/s/ronda/villas" },
      { city: "Santiago de Compostela", type: "Apartamentos en alquiler", href: "/s/santiago/apartments" },
      { city: "Girona", type: "Casas en alquiler", href: "/s/girona/houses" },
      { city: "Úbeda", type: "Casas rurales en alquiler", href: "/s/ubeda/cottages" },
    ],
  },
  {
    id: "islands",
    label: "Islas",
    destinations: [
      { city: "Mallorca", type: "Villas en alquiler", href: "/s/mallorca/villas" },
      { city: "Ibiza", type: "Casas en alquiler", href: "/s/ibiza/houses" },
      { city: "Tenerife", type: "Apartamentos en alquiler", href: "/s/tenerife/apartments" },
      { city: "Gran Canaria", type: "Villas en alquiler", href: "/s/gran-canaria/villas" },
      { city: "Mostaganem", type: "Casas en alquiler", href: "/properties" },
      { city: "Skikda", type: "Apartamentos en alquiler", href: "/properties" },
      { city: "Chlef", type: "Villas en alquiler", href: "/properties" },
      { city: "Relizane", type: "Casas en alquiler", href: "/properties" },
      { city: "Arzew", type: "Apartamentos en alquiler", href: "/properties" },
      { city: "Dellys", type: "Casas rurales en alquiler", href: "/properties" },
      { city: "Boumerdès", type: "Villas en alquiler", href: "/properties" },
      { city: "Koléa", type: "Casas en alquiler", href: "/properties" },
    ],
  },
  {
    id: "mountains",
    label: "Montañas",
    destinations: [
      { city: "Montañas del Atlas", type: "Cabañas en alquiler", href: "/properties" },
      { city: "Chaîne du Telus", type: "Casas rurales en alquiler", href: "/properties" },
      { city: "Aurés", type: "Cabañas en alquiler", href: "/properties" },
      { city: "Batna", type: "Apartamentos en alquiler", href: "/properties" },
      { city: "Tebessa", type: "Casas en alquiler", href: "/properties" },
      { city: "Guelma", type: "Apartamentos en alquiler", href: "/properties" },
      { city: "Khenchela", type: "Casas rurales en alquiler", href: "/properties" },
      { city: "Sétif", type: "Cabañas en alquiler", href: "/properties" },
      { city: "Bordj Bou Arréridj", type: "Casas rurales en alquiler", href: "/properties" },
      { city: "Tamanrasset", type: "Apartamentos en alquiler", href: "/properties" },
      { city: "Ghardaïa", type: "Villas en alquiler", href: "/properties" },
      { city: "Dzair", type: "Casas en alquiler", href: "/properties" },
    ],
  },
  {
    id: "activities",
    label: "Actividades",
    destinations: [
      { city: "Senderismo en el Atlas", type: "Experiencias", href: "/properties" },
      { city: "Desierto del Sahara", type: "Experiencias", href: "/properties" },
      { city: "Playas de Orán", type: "Experiencias", href: "/properties" },
      { city: "Cultura en Argel", type: "Experiencias", href: "/properties" },
      { city: "Ruinas de Timgad", type: "Experiencias", href: "/properties" },
      { city: "Playas de Ánaba", type: "Experiencias", href: "/properties" },
      { city: "Gastronomía argelina", type: "Experiencias", href: "/properties" },
      { city: "Historia de Constantina", type: "Experiencias", href: "/properties" },
      { city: "Aventura en el desierto", type: "Experiencias", href: "/properties" },
      { city: "Tours por ciudades", type: "Experiencias", href: "/properties" },
      { city: "Trekking en montañas", type: "Experiencias", href: "/properties" },
      { city: "Excursiones locales", type: "Experiencias", href: "/properties" },
    ],
  },
];

const InspirationSection = () => {
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState("trending");
  const [showAll, setShowAll] = useState(false);

  const currentTab = tabs.find((tab) => tab.id === activeTab);
  const displayedDestinations = showAll 
    ? currentTab?.destinations 
    : currentTab?.destinations.slice(0, 12);

  return (
    <section className="w-full bg-gray-100 py-12">
      <div className="max-w-[1824px] mx-auto px-6 md:px-10 lg:px-12">
        <h2 className="text-[22px] font-semibold text-secondary mb-6">
          Inspiración para futuras escapadas
        </h2>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-border-primary overflow-x-auto scrollbar-hide pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setShowAll(false);
              }}
              className={`
                text-sm font-medium pb-3 whitespace-nowrap transition-colors cursor-pointer
                ${activeTab === tab.id 
                  ? "text-secondary border-b-2 border-secondary" 
                  : "text-tertiary hover:text-secondary hover:border-b-2 hover:border-gray-300"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
          {displayedDestinations?.map((destination, index) => (
        <Link
          href={`/${locale}${destination.href}`}
          className="block p-4 rounded-2xl border border-gray-200 bg-white hover:shadow-lg transition-shadow"
        >
              <p className="text-sm font-medium text-secondary group-hover:underline">
                {destination.city}
              </p>
              <p className="text-sm text-tertiary">
                {destination.type}
              </p>
            </Link>
          ))}
        </div>

        {/* Show More Button */}
        {currentTab && currentTab.destinations.length > 12 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-6 text-sm font-semibold text-secondary underline hover:no-underline cursor-pointer"
          >
            {showAll ? "Mostrar menos" : "Mostrar más"}
          </button>
        )}
      </div>
    </section>
  );
};

export default InspirationSection;
