type Block = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

const blocks: Block[] = [
  {
    heading: "Introduction",
    paragraphs: [
      "Unfortunately scams and scammers exist in the cryptocurrency and blockchain sector.",
      "They prey on people’s insecurities, lack of knowledge and are opportunistic. The best defense to these fake opportunities is to be aware of the tactics used to deceive.",
      "Scams take a wide variety of forms from Ponzi schemes, fraudulent initial coin offerings (ICOs), pseudo exchange hacks, pump and dumps, identity theft, giveaways and exit scams.",
    ],
  },
  {
    heading: "Things to look out for",
    list: [
      "High returns over short periods of time",
      "Fake testimonials from Government Departments or celebrities.",
      "Unsolicited contact through social media channels.",
    ],
  },
  {
    heading: "The Golden Rule — Benefits",
    paragraphs: [
      "A reputable exchange or any private/public organization for that matter, will never solicit you to send cryptocurrency through an email, phone call, web advertisement or otherwise.",
    ],
  },
  {
    heading:
      "How can I spot an investment scam? Taking simple steps can help you protect yourself.",
    paragraphs: [
      "Scams can often feel legitimate. That’s deliberate. It’s why vigilance is key in identifying fake investment opportunities.",
      "Different tactics can be used but outcomes are often the same. Some investments are completely fake, some divert funds to different uses and others pretend to represent real world businesses.",
      "The adage that “if it sounds too good to be true, it probably is”, remains very relevant in the digital age. Fast returns, promised by strangers, should be considered highly suspicious.",
    ],
  },
  {
    heading: "Some tell tale signs?",
    paragraphs: [
      "Assurances of “no risk” or “low risk” despite a high investment return being promised.",
      "The ability to change your mind at any time and receive all your money back.",
      "Inside or special information being shared with you that others are not aware of.",
      "Always get independent financial advice before you invest.",
    ],
  },
  {
    heading: "Why is it difficult to shut these scams down?",
    paragraphs: [
      "The nature of scams is that they are fast moving and meant to deceive. For that reason it’s often difficult for regulators to provide absolute protection and for industries to protect consumers in all instances.",
      "In a digital world identifying an entity’s incorporated location and what laws apply to it can be difficult.",
      "Many scams are instigated overseas, delivered online and targeted online payment into offshore accounts. Some, utilize cryptocurrency as the lure or as a payment channel.",
      "Social media is not always social — Many scammers utilise social media channels to contact victims. They do so because it’s easy. They can pretend to be your friend, they may first gather information about you in order to create a sense of familiarity. They may impersonate others.",
      "Report fake accounts and block requests that don’t look real. Be careful and make sure your privacy settings are up to date on your social media accounts.",
      "High pressure tactics are common — Are you emailed or called often? Are the messages you’re receiving warning you about time running out? Don’t miss out… A once in a lifetime opportunity… This offer won’t last… You need to decide now, because others are waiting to take the opportunity… The signs are usually there early, if you look. Hang up, delete and block scammers.",
      "It’s important to report these scams too. Awareness saves others from making mistakes.",
      "Threats if you try to pull out — Threats are common once you’ve invested in a scam. The aim is to keep you quiet, or to give them more time to scam other investors. If you try to pull out of the deal, scammers may try to delay you by offering to swap investments to better performing options, telling you that your timing is wrong and that returns are just around the corner, or scaring you with threats of legal action, fines or withdrawal fees.",
    ],
  },
  {
    heading: "Phishing Scams",
    paragraphs: [
      "Phishing scams try to steal your personal information. Sometimes they pretend to be people you know or trust. They do that by impersonating them online or by creating fake profiles.",
    ],
    list: [
      "Email addresses that don’t match or come from non-company addresses.",
      "Information doesn’t make sense or is poorly written.",
      "You are asked to “verify” your personal information or to “update” your information.",
      "A request for immediate payment.",
      "It is also very common for fraudsters to impersonate customer service or tech support representatives.",
    ],
  },
  {
    heading: "Fake Websites",
    paragraphs: [
      "Fooling people requires effort and sometimes scammers will develop very professional looking websites to do so. They can include press releases, fake investment balances, or even Government department endorsements.",
    ],
  },
  {
    heading: "Foreign Investments",
    paragraphs: [
      "A common tactic used by scammers is to promise returns not generally available to local investors.",
      "Many investment scams originate overseas to avoid the consequences of their illegal behaviour. Making it more difficult for local enforcement agencies to prosecute them.",
    ],
  },
  {
    heading: "Pump and dump",
    paragraphs: [
      "Attempts to manipulate prices are a common scam strategy. There are a variety of ways that scammers achieve this. Sometimes they create fake tips, news or positive stories to drive interest. They buy low and get people to invest, then dump their investments.",
      "Activity is often driven through FOMO, the fear of missing out. Don’t be fooled.",
    ],
  },
  {
    heading: "What can you do to avoid an investment scam?",
    paragraphs: [
      "DYOR. Do. Your. Own. Research.",
      "It’s important to ask questions and to gather as much independent information as possible. Some basics for you to question or consider:",
    ],
  },
  {
    heading: "Who owns and runs the company?",
    list: [
      "What is the name of the representative? Can you contact them easily?",
      "Are their details easily found on search engines like Google?",
      "Is there a history of the business?",
      "Reviews of their service?",
      "Do they have a Sri Lankan office address?",
      "Are they a registered business? Can they provide the business registration number?",
      "Are answers being provided willingly?",
      "Can you verify these answers independently of the company representatives?",
      "Even if they can answer ALL these questions, remain wary. Your investment dollars are important to you and you should be protective in all instances.",
    ],
  },
  {
    heading: "You’ve been scammed. What next?",
    list: [
      "Report the scam to Police",
      "Report the scam to local regulatory bodies",
      "Do not send more money in hopes you get your initial investment back.",
    ],
  },
];

export function ScamArticle() {
  return (
    <div>
      <div className="space-y-10">
        {blocks.map((block) => (
          <div key={block.heading}>
            <h3 className="font-heading text-lg font-semibold">
              {block.heading}
            </h3>
            {block.paragraphs?.map((p, i) => (
              <p key={i} className="mt-3 text-muted-foreground">
                {p}
              </p>
            ))}
            {block.list && (
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted-foreground">
                {block.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
