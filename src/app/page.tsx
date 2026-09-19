import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import TrustSection from "../components/home/TrustSection";
import PromoBanner from "../components/home/PromoBanner";

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