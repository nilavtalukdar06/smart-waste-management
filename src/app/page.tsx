import BlogSection from "@/components/page/blog-section";
import CtaSection from "@/components/page/cta-section";
import FaqSection from "@/components/page/faq-section";
import FeatureSection from "@/components/page/feature-section";
import HeroSection from "@/components/page/hero-section";
import NewsLetterSection from "@/components/page/newsletter-section";
import Navbar from "@/components/shared/navbar";

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto">
      <Navbar />
      <HeroSection />
      <BlogSection />
      <FeatureSection />
      <FaqSection />
      <CtaSection />
      <NewsLetterSection />
    </section>
  );
}
