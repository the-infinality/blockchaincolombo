"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { ParticleField } from "@/components/particle-field";
import { MembershipEnquiryForm } from "@/components/forms/membership-enquiry-form";
import { GeneralEnquiryForm } from "@/components/forms/general-enquiry-form";

// c1.jpg as a full-section background with the ambient particle field
// layered on top of it (same treatment as the hero and Who We Are), and a
// tilt-up-from-below entrance — distinct from the wipe/flip/slide/skew/
// mask/zoom treatments used by every other section on the page.
export function ContactUsSection() {
  return (
    <section
      id="contact-us"
      className="relative scroll-mt-24 overflow-hidden py-16 [perspective:1500px]"
    >
      <Image src="/images/contact/c1.jpg" alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-[#050b1c]/78" />
      <ParticleField className="absolute inset-0 z-[1]" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#050b1c] via-transparent to-[#050b1c]/50" />

      <motion.div
        initial={{ opacity: 0, y: 80, rotateX: 12 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "center bottom" }}
        className="relative z-[2] mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-4xl font-bold">Contact</h2>
          <p className="mt-2 text-lg font-medium">
            For more information or enquiries please fill in the form below
          </p>
          <p className="mt-4 text-white/75">
            Blockchain Sri Lanka is Sri Lanka&rsquo;s premier industry member
            network for businesses implementing or evaluating blockchain or
            distributed ledger technology. We work collectively to advance
            the adoption of blockchain technology in Sri Lanka and in
            advocating for regulatory and policy settings.
          </p>
        </div>

        <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-2">
          <div className="flex h-full flex-col rounded-2xl border border-white/15 bg-white/8 p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl">
            <h3 className="font-heading text-2xl font-bold">
              <span className="text-primary">Membership </span>enquiries
            </h3>
            <div className="mt-8 flex-1">
              <MembershipEnquiryForm />
            </div>
          </div>

          <div className="flex h-full flex-col rounded-2xl border border-white/15 bg-white/8 p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl">
            <h3 className="font-heading text-2xl font-bold">General enquiries</h3>
            <div className="mt-8 flex-1">
              <GeneralEnquiryForm />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
