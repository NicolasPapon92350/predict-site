import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import TrustBanner from "@/components/TrustBanner";
import Services from "@/components/Services";
import Predicta from "@/components/Predicta";
import ProductFeatures from "@/components/ProductFeatures";
import HowItWorks from "@/components/HowItWorks";
import Formations from "@/components/Formations";
import GuideDownload from "@/components/GuideDownload";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Resources from "@/components/Resources";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import TrackedSection from "@/components/tracking/TrackedSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <TrackedSection sectionId="hero">
        <Hero />
      </TrackedSection>
      <TrackedSection sectionId="stats">
        <Stats />
      </TrackedSection>
      <TrackedSection sectionId="trust">
        <TrustBanner />
      </TrackedSection>
      <TrackedSection sectionId="services">
        <Services />
      </TrackedSection>
      <TrackedSection sectionId="predicta">
        <Predicta />
      </TrackedSection>
      <TrackedSection sectionId="produits">
        <ProductFeatures />
      </TrackedSection>
      <TrackedSection sectionId="howitworks">
        <HowItWorks />
      </TrackedSection>
      <TrackedSection sectionId="formations">
        <Formations />
      </TrackedSection>
      <TrackedSection sectionId="guide">
        <GuideDownload />
      </TrackedSection>
      <TrackedSection sectionId="testimonials">
        <Testimonials />
      </TrackedSection>
      <TrackedSection sectionId="blog">
        <Blog />
      </TrackedSection>
      <TrackedSection sectionId="ressources">
        <Resources />
      </TrackedSection>
      <TrackedSection sectionId="demo">
        <LeadForm />
      </TrackedSection>
      <Footer />
      <FloatingCTA />
    </>
  );
}
