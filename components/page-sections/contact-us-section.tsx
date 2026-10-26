import { MembershipEnquiryForm } from "@/components/forms/membership-enquiry-form";
import { GeneralEnquiryForm } from "@/components/forms/general-enquiry-form";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

const LABEL = "font-mono text-[11px] tracking-widest uppercase";

export function ContactUsSection() {
  return (
    <section
      id="contact-us"
      className="mx-auto max-w-[96rem] scroll-mt-16 px-4 pt-24 pb-16 sm:px-8 sm:pt-32 lg:px-12"
    >
      <RevealGroup>
        <RevealItem>
          <h2 className="font-heading text-[clamp(3.25rem,11.5vw,11rem)] leading-[0.85] font-bold tracking-tight uppercase">
            <span className="block text-[#796753]">Stay in</span>
            <span className="block text-white">The current</span>
          </h2>
        </RevealItem>
      </RevealGroup>

      <RevealGroup className="mt-14 grid gap-12 md:grid-cols-2 xl:grid-cols-[1.25fr_0.85fr_1fr_1fr] xl:gap-10">
        <RevealItem>
          <p className="text-xl leading-snug text-[#796753] sm:text-2xl">
            Blockchain Sri Lanka is Sri Lanka&rsquo;s premier industry member
            network for businesses implementing or evaluating blockchain or
            distributed ledger technology. We work collectively to advance the
            adoption of blockchain technology in Sri Lanka and in advocating for
            regulatory and policy settings.
          </p>
        </RevealItem>

        <RevealItem>
          <p className={`${LABEL} text-white`}>Contact</p>
          <p className="mt-3 text-xl leading-snug text-[#796753] sm:text-2xl">
            For more information or enquiries please fill in the form below.
          </p>
        </RevealItem>

        <RevealItem>
          <h3 className={`${LABEL} mb-4 text-white`}>Membership Enquiries</h3>
          <MembershipEnquiryForm />
        </RevealItem>

        <RevealItem>
          <h3 className={`${LABEL} mb-4 text-white`}>General Enquiries</h3>
          <GeneralEnquiryForm />
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
