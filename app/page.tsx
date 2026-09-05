import Hero from "@/components/hero/Hero";
import EventInfoRail from "@/components/hero/EventInfoRail";
import WhyAttend from "@/components/quantum/WhyAttend";
import QuantumConcepts from "@/components/quantum/QuantumConcepts";
import OdysseyTimeline from "@/components/odyssey/OdysseyTimeline";
import SpeakerProfile from "@/components/speakers/SpeakerProfile";
import ScheduleSection from "@/components/schedule/ScheduleSection";
import ExperienceGrid from "@/components/experience/ExperienceGrid";
import FAQSection from "@/components/faq/FAQSection";
import Footer from "@/components/layout/Footer";
import Background3DElements from "@/components/visuals/Background3DElements";

export default function Home() {
  return (
    <main>
      <Hero />
      <EventInfoRail />

      {/* 3D background elements start right after the event details rail */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Background3DElements />
        <WhyAttend />
        <QuantumConcepts />
        <OdysseyTimeline />
        <SpeakerProfile />
        <ScheduleSection />
        <ExperienceGrid />
        <FAQSection />
        <Footer />
      </div>
    </main>
  );
}
