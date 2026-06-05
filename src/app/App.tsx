import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import CategoryQuickLinks from "./components/CategoryQuickLinks";
import TopBrandsCarousel from "./components/TopBrandsCarousel";
import FlashSaleSection from "./components/FlashSaleSection";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <CategoryQuickLinks />
        <TopBrandsCarousel />
        <FlashSaleSection />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}