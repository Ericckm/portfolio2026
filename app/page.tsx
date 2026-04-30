import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Stack from "@/components/sections/Stack";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <Stack />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
