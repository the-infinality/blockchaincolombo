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

const BAND = "bg-brand-navy-deep";

export default function Home() {
  return (
    <>
      <div id="top" />
      <HeroSequence />
      <section id="home" className="scroll-mt-24">
        <WhatWeDo />
        <div className={BAND}>
          <PurposeOfCommunity />
        </div>
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
    </>
  );
}
