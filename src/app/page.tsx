import BlogSection from "@/components/page/blog-section";
import HeroSection from "@/components/page/hero-section";
import Navbar from "@/components/shared/navbar";

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto">
      <Navbar />
      <HeroSection />
      <BlogSection />
    </section>
  );
}
