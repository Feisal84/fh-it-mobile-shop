import Hero from "../../components/home/Hero";
import Categories from "../../components/home/Categories";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import TrustSection from "../../components/home/TrustSection";
import PromoBanner from "../../components/home/PromoBanner";

// Revalidate every 5 minutes so product changes from Supabase appear without a rebuild.
export const revalidate = 300;

export default function HomePage() {
  return (
    <>
      <Hero />

      <TrustSection />

      <Categories />

      <FeaturedProducts />

      <PromoBanner />
    </>
  );
}