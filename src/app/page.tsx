import BlogSection from "@/components/page/blog-section";
import CtaSection from "@/components/page/cta-section";
import FaqSection from "@/components/page/faq-section";
import FeatureSection from "@/components/page/feature-section";
import HeroSection from "@/components/page/hero-section";
import NewsLetterSection from "@/components/page/newsletter-section";
import Navbar from "@/components/shared/navbar";
import { Copyright } from "lucide-react";

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
      <footer className="my-6">
        <p className="text-neutral-500 text-start sm:text-center flex justify-start sm:justify-center items-center gap-x-4 font-light">
          <Copyright className="text-green-500 animate-pulse" />{" "}
          {new Date().getFullYear()} Eco Swachh. All rights reserved.
        </p>
      </footer>
    </section>
  );
}
