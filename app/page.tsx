import { HeroSequence } from "@/components/hero-sequence";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { PurposeOfCommunity } from "@/components/sections/purpose-of-community";
import { Partnerships } from "@/components/sections/partnerships";
import { MemberStories } from "@/components/sections/member-stories";
import { WhoWeAreSection } from "@/components/page-sections/who-we-are-section";
import { OurMembersSection } from "@/components/page-sections/our-members-section";
import { MembershipTypesSection } from "@/components/page-sections/membership-types-section";
import { NewsSection } from "@/components/page-sections/news-section";
import { ScamAlertsSection } from "@/components/page-sections/scam-alerts-section";
import { BlogSection } from "@/components/page-sections/blog-section";
import { ContactUsSection } from "@/components/page-sections/contact-us-section";

// Single-page site: every item in the main nav (lib/nav.ts) is an in-page
// anchor to one of these <section id="..."> blocks. <HeroSequence> owns
// both the scroll-driven intro AND the persistent docked nav that follows
// it (see components/hero-sequence.tsx) — everything else below gets a
// left gutter on large screens so nothing ever sits behind that frozen
// column.
export default function Home() {
  return (
    <>
      <div id="top" />
      <HeroSequence />
      <div className="lg:pl-64 xl:pl-72">
        <section id="home" className="scroll-mt-24">
          <WhatWeDo />
          <PurposeOfCommunity />
          <Partnerships />
          <MemberStories />
        </section>
        <WhoWeAreSection />
        <OurMembersSection />
        <MembershipTypesSection />
        <NewsSection />
        <ScamAlertsSection />
        <BlogSection />
        <ContactUsSection />
      </div>
    </>
  );
}