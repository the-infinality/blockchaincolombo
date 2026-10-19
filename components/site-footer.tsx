import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { mainNav } from "@/lib/nav";

const contact = {
  email: "blockchainsrilanka@gmail.com",
  phone: "+94 11 898-855-88",
};

const LABEL = "font-mono text-[11px] tracking-widest uppercase text-white/70";

// Tech-editorial footer on the site's own particle background, all in
// white: a large invitation line up top, then a
// ruled four-column strip — info, navigation (two sub-columns), contact
// details and the email-only newsletter signup — in small mono type.
export function SiteFooter() {
  return (
    <footer id="site-footer" className="mt-auto text-white">
      <div className="mx-auto max-w-[96rem] px-4 pt-20 pb-10 sm:px-8 sm:pt-28 lg:px-12">
        <RevealGroup className="grid gap-12 lg:grid-cols-2 lg:gap-10">
          <RevealItem>
            <p className="max-w-xl text-2xl leading-snug sm:text-3xl">
              Tell us what you are making, researching or trying to change. We
              read every thoughtful message and aim to reply within three
              working days.
            </p>
          </RevealItem>
        </RevealGroup>

        <Reveal className="mt-20 grid gap-10 border-t border-white pt-4 sm:grid-cols-2 lg:grid-cols-[1.3fr_1.1fr_0.7fr_0.7fr] lg:gap-8">
          <div>
            <p className={LABEL}>Info</p>
            <p className="mt-3 font-heading font-semibold">Blockchain Colombo</p>
            <p className="mt-1 max-w-xs font-mono text-xs leading-relaxed text-white/85">
              Sri Lanka&rsquo;s peak industry network for businesses
              implementing or evaluating blockchain and distributed ledger
              technology.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className={LABEL}>Navigate</p>
            <ul className="mt-3 grid max-w-xs grid-flow-col grid-rows-4 gap-x-6 gap-y-1 font-mono text-xs">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-opacity hover:opacity-70">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={LABEL}>Get in touch</p>
            <div className="mt-3 space-y-2 font-mono text-xs">
              <div>
                <p className="font-bold">Email:</p>
                <a href={`mailto:${contact.email}`} className="hover:underline">
                  {contact.email}
                </a>
              </div>
              <div>
                <p className="font-bold">Phone:</p>
                <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="hover:underline">
                  {contact.phone}
                </a>
              </div>
            </div>
          </div>

          <div>
            <p className={LABEL}>Stay in the loop</p>
            <div className="mt-3">
              <NewsletterForm />
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
