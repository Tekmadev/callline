import { TopBar } from "@/components/layout/TopBar";
import { Hero } from "@/components/hero/Hero";
import { MobileBridge } from "@/components/cta/MobileBridge";
import { WowSection } from "@/components/wow/WowSection";
import { NumbersSection } from "@/components/numbers/NumbersSection";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";
import { LiveDemoCta } from "@/components/cta/LiveDemoCta";
import { PricingSection } from "@/components/pricing/PricingSection";
import { FaqSection } from "@/components/faq/FaqSection";
import { Footer } from "@/components/footer/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { homePageGraph } from "@/lib/seo/jsonld";

export default function Home() {
  return (
    <>
      <JsonLd data={homePageGraph()} />
      <main className="relative">
        <TopBar />
        <Hero />
        <MobileBridge />
        <WowSection />
        <NumbersSection />
        <HowItWorks />
        <LiveDemoCta />
        <PricingSection />
        <FaqSection />
        <Footer />
      </main>
    </>
  );
}
