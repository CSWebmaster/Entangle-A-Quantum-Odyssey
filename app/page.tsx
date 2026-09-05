import Hero from "@/components/hero/Hero";
import EventInfoRail from "@/components/hero/EventInfoRail";
import WhyAttend from "@/components/quantum/WhyAttend";
import QuantumConcepts from "@/components/quantum/QuantumConcepts";
import OdysseyTimeline from "@/components/odyssey/OdysseyTimeline";
import SpeakerProfile from "@/components/speakers/SpeakerProfile";
import ScheduleSection from "@/components/schedule/ScheduleSection";
import FAQSection from "@/components/faq/FAQSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <EventInfoRail />
      <WhyAttend />
      <QuantumConcepts />
      <OdysseyTimeline />
      <SpeakerProfile />
      <ScheduleSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
