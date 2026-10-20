import { BottomPromo } from "@/components/BottomPromo";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Ideas } from "@/components/Ideas";
import { QuickLinks } from "@/components/QuickLinks";
import { TrendingProducts } from "@/components/TrendingProducts";
import { TrustBadges } from "@/components/TrustBadges";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pb-4">
        <Hero />
        <QuickLinks />
        <TrendingProducts />
        <TrustBadges />
        <Ideas />
        <BottomPromo />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
