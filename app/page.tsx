import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Waitlist from "@/components/Waitlist";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Features />
        <Waitlist />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
