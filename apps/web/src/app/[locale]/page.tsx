import { useTranslations } from 'next-intl';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PropertyCarousel from "@/components/home/property-carousel";
import InspirationSection from "@/components/home/inspiration-section";
import { 
  mockProperties, 
  trendingProperties, 
  nearbyProperties 
} from "@/data/mock-properties";

export default function Home() {
  const t = useTranslations();

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Header */}
      <div className="h-50" />

      <div className="space-y-10 py-8">
        <PropertyCarousel 
          properties={mockProperties} 
          title={t("inspiration.title")} 
        />

        <PropertyCarousel 
          properties={trendingProperties} 
          title={`${t("inspiration.title")} - ${t("locations.algeria")}`} 
        />

        <PropertyCarousel 
          properties={nearbyProperties} 
          title={`${t("inspiration.nearby")} - ${t("locations.algiers")}`} 
        />

        <PropertyCarousel 
          properties={mockProperties.slice().reverse()} 
          title={`${t("inspiration.uniqueStays")} - ${t("locations.constantine")}`} 
        />

        <PropertyCarousel 
          properties={trendingProperties.slice().reverse()} 
          title={`${t("inspiration.adventurous")} - ${t("locations.oran")}`} 
        />
      </div>

      <InspirationSection />

      <Footer />
    </main>
  );
}
