import {
  Sparkles,
  Gift,
  Ticket,
  ClipboardList,
  Trophy,
  Dice5,
  Hash,
  Vote,
  Brain,
  Globe2,
  Phone,
  MessageSquare,
  MonitorSmartphone,
  MapPin,
  CreditCard,
  Target,
  QrCode,
  ShieldCheck,
  Users,
  BarChart3,
  LineChart,
  type LucideIcon,
} from "lucide-react";

/* Brand colours reused across the site. */
export const CORAL = "#FF5E3A";
export const LIME = "#A8E10C";

/* ---------------- Interactive campaigns ---------------- */

/** Campaigns with a live, playable demo modal launched on their detail page. */
export type DemoKind = "code" | "quiz" | "raffle" | "poll" | "vote" | "survey";

export type Campaign = {
  slug: string;
  label: string;
  icon: LucideIcon;
  /** One-line teaser used in the nav dropdown, home page and cards. */
  summary: string;
  /** Longer intro shown on the campaign's own page. */
  description: string;
  /** Key selling points shown on the campaign's own page. */
  points: string[];
  /**
   * Set when this campaign has a playable demo modal available on its detail page.
   */
  demo?: DemoKind;
};

export const campaigns: Campaign[] = [
  {
    slug: "short-code-to-win",
    label: "Short Code to Win",
    icon: Hash,
    summary: "Consumers text a unique code to enter and win instantly.",
    description:
      "Short Code to Win turns any pack, receipt or on-air prompt into an instant entry. Consumers send a unique code via SMS or USSD, the Winning Code Iteration engine validates it in real time, and winners are rewarded on the spot — with no code pre-marked as winning, closing the door on stolen-code fraud.",
    points: [
      "Instant SMS / USSD entry from any printed or on-air code",
      "Fraud-proof Winning Code Iteration (WCI) winner allocation",
      "Real-time winner verification and reward dispatch",
    ],
    demo: "code",
  },
  {
    slug: "polls",
    label: "Polls",
    icon: BarChart3,
    summary: "Capture consumer opinion at scale and reward participation.",
    description:
      "Run branded polls across web, SMS and interactive in-store screens to capture consumer sentiment in the moment. Every response is an engagement touchpoint you can reward — turning lightweight market research into a loyalty driver.",
    points: [
      "Single-question or multi-step polls across every channel",
      "Reward respondents with airtime, data or gift cards",
      "Live results with demographic breakdowns",
    ],
    demo: "poll",
  },
  {
    slug: "vote",
    label: "Vote",
    icon: Vote,
    summary: "Drive mass participation with branded voting mechanics.",
    description:
      "Power fan votes, product choices and campaign showdowns with a voting mechanic built for scale. Consumers vote across every channel while you capture the audience data behind each vote.",
    points: [
      "High-volume voting across web, USSD and SMS",
      "Anti-fraud vote validation",
      "Real-time tallies and public leaderboards",
    ],
    demo: "vote",
  },
  {
    slug: "surveys",
    label: "Surveys",
    icon: ClipboardList,
    summary: "Deeper insight through rewarded, structured surveys.",
    description:
      "Go beyond a single question with multi-step surveys that enrich every consumer profile. Incentivise completion with instant rewards and feed the results straight into your segmentation.",
    points: [
      "Multi-step, branching survey flows",
      "Completion rewards that lift response rates",
      "Demographic, behavioural and geographic capture",
    ],
    demo: "survey",
  },
  {
    slug: "quizzes",
    label: "Quizzes",
    icon: Brain,
    summary: "Gamified quizzes that educate and reward.",
    description:
      "Engage consumers with branded quizzes that build product knowledge while they play. Correct answers unlock rewards, and every play deepens the relationship with your brand.",
    points: [
      "Timed, gamified quiz formats",
      "Instant rewards for correct answers",
      "Product education built into the play",
    ],
    demo: "quiz",
  },
  {
    slug: "raffle-draws",
    label: "Raffle Draws & Lucky Dips",
    icon: Dice5,
    summary: "Classic prize draws with fraud-proof winner selection.",
    description:
      "Run raffle draws and lucky dips where every entry counts. The Winning Code Iteration engine allocates winners transparently at set intervals, so instant wins and grand prizes are awarded fairly and verifiably.",
    points: [
      "Interval-based, transparent winner allocation",
      "Instant-win and grand-prize tiers",
      "Verifiable, auditable draw results",
    ],
    demo: "raffle",
  },
];

export function getCampaign(slug: string): Campaign | undefined {
  return campaigns.find((c) => c.slug === slug);
}

/* ---------------- Why E-Redeem (features) ---------------- */

export type Feature = { icon: LucideIcon; title: string; desc: string };

export const features: Feature[] = [
  {
    icon: ShieldCheck,
    title: "Fraud Elimination via Gen-AI",
    desc: "Winning Code Iteration (WCI) logic dynamically assigns winners based on entry intervals. No code is pre-marked as winning, eliminating vulnerability to stolen physical codes.",
  },
  {
    icon: Users,
    title: "Enhanced Brand-Consumer Engagement",
    desc: "Move beyond one-way advertising into two-way conversation across web, USSD, SMS and interactive screen displays.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics & Insights",
    desc: "Track entries, participants, winners and conversion the moment they happen — with customizable KPIs and exportable reports.",
  },
  {
    icon: Gift,
    title: "Streamlined Reward Tracking",
    desc: "Instant airtime, mobile data, shopping gift cards and physical gifts — fulfilled end-to-end from a single dashboard.",
  },
  {
    icon: Sparkles,
    title: "Enriched Customer Insights",
    desc: "Capture demographic, behavioural and geographic data with every entry to sharpen every follow-up campaign.",
  },
  {
    icon: LineChart,
    title: "Comprehensive Reporting Suite",
    desc: "Live entry tracking, demographic segmentation, revenue vs target dashboards and built-in fraud & compliance monitoring.",
  },
];

/* ---------------- Channels ---------------- */

export type Channel = { icon: LucideIcon; label: string };

export const channels: Channel[] = [
  { icon: Globe2, label: "Web" },
  { icon: Phone, label: "USSD" },
  { icon: MessageSquare, label: "SMS" },
  { icon: MonitorSmartphone, label: "Interactive Screen Displays" },
];

/* ---------------- Use cases ---------------- */

export type UseCase = { icon: LucideIcon; title: string; blurb: string; tint: string };

export const useCases: UseCase[] = [
  {
    icon: MapPin,
    title: "Location-Based",
    tint: LIME,
    blurb:
      "Ideal for live events and on-ground activations, this use case delivers personalized discounts or promotions to customers within a specific geographic area. By targeting consumers locally, it encourages immediate action which successfully boosts foot traffic and enhances overall customer engagement. Ultimately, this localized approach serves as a highly effective tool to drive immediate, localized sales.",
  },
  {
    icon: CreditCard,
    title: "Transaction-Based",
    tint: CORAL,
    blurb:
      "This campaign model delivers targeted promotions triggered directly by a customer's purchase history or past transactions. The system automatically generates personalized discounts, loyalty rewards, or bundle deals based on this specific buying behavior. This strategy is designed to encourage repeat purchases, significantly increase the average transaction value, and foster long-term brand loyalty.",
  },
  {
    icon: Target,
    title: "Segment-Based",
    tint: "#1a1a1a",
    blurb:
      "This approach allows brands to deliver tailored promotions to specific groups based on their unique demographics, buying behaviors, or personal preferences. It creates highly personalized discounts and incentives that resonate perfectly with each distinct customer segment. By personalizing the promotional experience, this model effectively boosts consumer engagement, builds lasting loyalty, and increases overall conversion rates.",
  },
];

/* ---------------- Case studies ---------------- */

export type CaseStudy = {
  icon: LucideIcon;
  brand: string;
  stat: string;
  label: string;
  blurb: string;
};

export const caseStudies: CaseStudy[] = [
  {
    icon: Ticket,
    brand: "Ribena",
    stat: "N100K",
    label: "Scholarships awarded",
    blurb:
      "For the Back to School with Ribena campaign, consumers purchased 150ml cartons to find special scratch-panel stickers. By texting the hidden code to 65432, participants entered to win free Berry Buddies stickers or a ₦100,000 educational scholarship. The platform automatically validated these codes and efficiently credited the cash prizes to the winners.",
  },
  {
    icon: QrCode,
    brand: "Rema Live",
    stat: "42K+",
    label: "QR scans processed",
    blurb:
      "During the Rema Live concert, Best Premium Spirits rewarded fans through a dynamic live-event campaign. Attendees scanned a QR code or entered a 7-digit voucher found on their drinks to instantly win airtime, mobile data, or an iPhone 15 Pro Max. All physical rewards were seamlessly redeemed on-site at the event venue.",
  },
  {
    icon: Trophy,
    brand: "Guinness",
    stat: "100%",
    label: "Guaranteed airtime",
    blurb:
      "Guinness engaged football fans with a live sports promotion offering guaranteed airtime rewards. Consumers found unique codes under the crown of their drinks and texted them alongside their live match predictions to 1759. Following the matches, the system processed the winning entries and instantly credited the users' mobile phones with airtime.",
  },
];

export const brands = ["RIBENA", "GUINNESS", "REMA LIVE", "MALTA GUINNESS", "RAZZLE"];

/* ---------------- Contact ---------------- */

export const contact = {
  phoneDisplay: "+234 705 659 2645",
  phoneHref: "tel:+2347056592645",
  email: "abamgbala@excitepanacea.com",
  website: "www.e-redeem.com",
  websiteHref: "https://e-redeem.com/",
};
