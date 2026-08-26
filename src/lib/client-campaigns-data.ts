export type ClientMechanicType = "short-code" | "quiz" | "raffle" | "poll" | "vote" | "survey";

export type CampaignFormType = "code" | "codeless";

export type CampaignRewardType = "physical-gift" | "gift-card" | "airtime" | "data" | "cash";

export type CampaignStatus = "live" | "completed" | "upcoming";

export interface BrandTheme {
  primary: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  cardBg: string;
  text: string;
  textMuted: string;
  border: string;
  badgeBg: string;
  badgeText: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface QuizQuestionItem {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface WheelSegmentItem {
  label: string;
  type: "prize" | "no-win";
  color: string;
  textColor: string;
  rewardText?: string;
}

export interface PollOptionItem {
  id: string;
  label: string;
  votes: number;
  description?: string;
}

export interface VoteCandidateItem {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  votes: number;
  tag: string;
  imageText: string;
}

export interface SurveyStepItem {
  id: number;
  title: string;
  subtitle: string;
  options: string[];
}

export interface ClientCampaign {
  id: string;
  slug: string;
  clientName: string;
  campaignName: string;
  tagline: string;
  description: string;
  heroBadge: string;
  logoText: string;
  logoAccentColor: string;
  formType: CampaignFormType;
  rewardType: CampaignRewardType;
  mechanicType: ClientMechanicType;
  mechanicLabel: string;
  status: CampaignStatus;
  rewardSummary: string;
  rewardValue: string;
  rewardName: string;
  participantsCount: string;
  channelSupport: string[];
  sampleValidCodes?: string[];
  bannerUrl?: string;
  theme: BrandTheme;
  points: string[];
  terms: string[];
  // Mechanic-specific configuration
  quizData?: {
    timePerQuestion: number;
    passingScore: number;
    rewardMessage: string;
    questions: QuizQuestionItem[];
  };
  wheelData?: {
    segments: WheelSegmentItem[];
    grandPrizeText: string;
  };
  pollData?: {
    question: string;
    options: PollOptionItem[];
    rewardNotice: string;
  };
  voteData?: {
    categoryTitle: string;
    candidates: VoteCandidateItem[];
    grandPrizeEntry: string;
  };
  surveyData?: {
    rewardVoucher: string;
    steps: SurveyStepItem[];
  };
  shortCodeData?: {
    sampleCodes: string[];
    smsNumber: string;
    ussdString: string;
    instantReward: string;
  };
}

export const clientCampaigns: ClientCampaign[] = [
  {
    id: "milo-energy-quest",
    slug: "milo-energy-quest",
    clientName: "Nestlé Milo",
    campaignName: "Milo Champions Energy Quest",
    tagline: "Fuel your energy with everyday trivia, score goals & win instant sport scholarships!",
    description:
      "Nestlé Milo powers millions of future champions every morning. Enter your on-pack promo code, take the official Milo 3-question Sports & Nutrition Quest, test your athletic energy knowledge, and unlock guaranteed airtime rewards plus entries for full school sports kits.",
    heroBadge: "Active Back-To-School Activation",
    logoText: "MILO",
    logoAccentColor: "#F8B800",
    formType: "code",
    rewardType: "airtime",
    mechanicType: "quiz",
    mechanicLabel: "Interactive Brand Quiz",
    status: "live",
    rewardSummary: "₦1,000 Instant Airtime + Milo Sports Backpack Kits",
    rewardValue: "₦50M Prize Pool",
    rewardName: "₦1,000 Instant Mobile Airtime Top-Up",
    participantsCount: "184,200+ Players",
    channelSupport: ["Web Portal", "WhatsApp Chat", "In-Store QR"],
    sampleValidCodes: ["MILO-2026-X8", "MILO-CHAMP-01", "MILO-FUEL-99"],
    bannerUrl:
      "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80",
    theme: {
      primary: "#006B3F",
      primaryHover: "#005230",
      secondary: "#F8B800",
      accent: "#E65100",
      background: "#041F14",
      surface: "#0B2E20",
      cardBg: "#123D2B",
      text: "#F5FAF6",
      textMuted: "#A4C8B5",
      border: "#1F543C",
      badgeBg: "#F8B800",
      badgeText: "#004729",
      gradientFrom: "#041F14",
      gradientTo: "#0E3A28",
    },
    points: [
      "Promo code entry on 250g, 500g, and 1kg Milo promotional tins",
      "Timed 3-question trivia testing Milo nutrition & champion sports facts",
      "Instant ₦1,000 airtime validation sent straight to your mobile line",
      "Direct entry to the ₦50M National School Sports Grant raffle",
    ],
    terms: [
      "Open to all residents in Nigeria with a valid MTN, Airtel, Glo, or 9mobile number.",
      "One instant reward per phone number per week.",
      "Grand prize winners drawn live at the National Milo Basketball Championship.",
    ],
    quizData: {
      timePerQuestion: 20,
      passingScore: 2,
      rewardMessage: "Champion Verified! ₦1,000 Airtime Sent & Entered into Sports Kit Draw",
      questions: [
        {
          id: 1,
          question:
            "Which key mineral in Milo supports strong bones and energy release during sports?",
          options: [
            "Calcium, Iron & B-Vitamins",
            "Added Preservatives",
            "Artificial Colorants",
            "Carbonated Gas",
          ],
          correctIndex: 0,
          explanation:
            "Milo is fortified with ACTIV-GO — containing Calcium, Iron and essential B-vitamins for active vitality.",
        },
        {
          id: 2,
          question:
            "What is the iconic long-standing grassroots tournament sponsored by Milo across schools?",
          options: [
            "Milo Secondary Schools Basketball Championship",
            "Global Chess Invitational",
            "Formula One Cup",
            "Winter Skiing Derby",
          ],
          correctIndex: 0,
          explanation:
            "The Milo Secondary Schools Basketball Championship has nurtured Nigerian basketball champions for over 25 years.",
        },
        {
          id: 3,
          question: "What is the recommended best way to enjoy Milo for an active morning?",
          options: [
            "Mixed with warm or cold milk/water as part of a balanced breakfast",
            "Only dry powder",
            "Replaced with energy soda",
            "Skipping morning breakfast entirely",
          ],
          correctIndex: 0,
          explanation:
            "Milo combined with milk or warm water provides balanced nourishment to power your mornings.",
        },
      ],
    },
  },
  {
    id: "ribena-back-to-school",
    slug: "ribena-back-to-school",
    clientName: "Ribena (Suntory)",
    campaignName: "Ribena Back to School Gold Rush",
    tagline: "100% Vitamin C goodness. Text pack codes to win ₦100,000 educational grants!",
    description:
      "Ribena partners with E-Redeem Winning Code Iteration (WCI) to power a nationwide promotional redemption. Every pack code entered online or via SMS qualifies you for ₦100,000 direct bank scholarship grants — with zero pre-marked winning codes for 100% fraud immunity.",
    heroBadge: "Verified WCI Engine",
    logoText: "RIBENA",
    logoAccentColor: "#E91E63",
    formType: "code",
    rewardType: "cash",
    mechanicType: "short-code",
    mechanicLabel: "Instant Win Short Code",
    status: "live",
    rewardSummary: "₦100,000 Direct Bank Educational Scholarships",
    rewardValue: "₦100M Total Dispatched",
    rewardName: "₦100,000 Direct Bank Scholarship Transfer",
    participantsCount: "320,000+ Codes Verified",
    channelSupport: ["SMS (65432)", "USSD (*654*CODE#)", "Web Portal"],
    sampleValidCodes: ["RB-7729-K8", "RB-9941-X4", "RB-3312-W9", "RB-8854-Q2"],
    bannerUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    theme: {
      primary: "#5B116A",
      primaryHover: "#450952",
      secondary: "#E91E63",
      accent: "#FFD54F",
      background: "#23042A",
      surface: "#360940",
      cardBg: "#4A1155",
      text: "#FAF2FB",
      textMuted: "#D5A7DF",
      border: "#6B1C7C",
      badgeBg: "#E91E63",
      badgeText: "#FFFFFF",
      gradientFrom: "#1E0224",
      gradientTo: "#3C0747",
    },
    points: [
      "Instant SMS/Web code verification with Winning Code Iteration algorithm",
      "₦100,000 Back-to-School education cash grant disbursed straight to bank accounts",
      "Verified NIBSS instant electronic funds transfer",
      "No physical coupon handling required at retail stores",
    ],
    terms: [
      "Promo valid for 250ml tetra packs and 500ml PET bottles with yellow promotional caps.",
      "Standard SMS rates apply for SMS entries. Web portal entry is 100% free.",
      "Winners are audited by verified regulatory authorities.",
    ],
    shortCodeData: {
      sampleCodes: ["RB-7729-K8", "RB-9941-X4", "RB-3312-W9", "RB-8854-Q2"],
      smsNumber: "65432",
      ussdString: "*654*CODE#",
      instantReward: "₦100,000 Direct Bank Scholarship Transfer",
    },
  },
  {
    id: "coca-cola-summer-spin",
    slug: "coca-cola-summer-spin",
    clientName: "The Coca-Cola Company",
    campaignName: "Coca-Cola Summer Spin & Win",
    tagline: "Refresh your world & spin the golden wheel for iPhones, concert tickets and airtime!",
    description:
      "Feel the magic of ice-cold Coca-Cola this summer. Enter your under-the-crown code to spin the live physics prize wheel and win an Apple iPhone 16 Pro or exclusive concert VIP passes.",
    heroBadge: "Mass Market Consumer Activation",
    logoText: "Coca-Cola",
    logoAccentColor: "#FFFFFF",
    formType: "code",
    rewardType: "physical-gift",
    mechanicType: "raffle",
    mechanicLabel: "Interactive Raffle Wheel",
    status: "live",
    rewardSummary: "Apple iPhone 16 Pro & VIP Concert Pass Hospitality",
    rewardValue: "25,000+ Prizes",
    rewardName: "Apple iPhone 16 Pro (256GB Titanium Edition)",
    participantsCount: "450,000+ Spins",
    channelSupport: ["Web Portal", "QR Under Crown", "Interactive Screens"],
    sampleValidCodes: ["COKE-SUMMER-77", "COKE-GOLD-88", "COKE-WIN-12"],
    bannerUrl:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80",
    theme: {
      primary: "#E50914",
      primaryHover: "#B80710",
      secondary: "#FFFFFF",
      accent: "#FFD700",
      background: "#1A0204",
      surface: "#2D0407",
      cardBg: "#3F070C",
      text: "#FFF5F5",
      textMuted: "#F4B0B4",
      border: "#6B111A",
      badgeBg: "#E50914",
      badgeText: "#FFFFFF",
      gradientFrom: "#150002",
      gradientTo: "#330509",
    },
    points: [
      "Interactive canvas spinning wheel with physics deceleration",
      "Grand prize: Apple iPhone 16 Pro (256GB Titanium)",
      "Physical prize collection dispatched to verified regional logistics hub",
      "Live winner verification ticker nationwide",
    ],
    terms: [
      "Only genuine under-the-crown codes are accepted.",
      "Grand prize winners must present the winning crown cap for physical verification.",
      "Daily spin limit applies per verified device to ensure equitable distribution.",
    ],
    wheelData: {
      grandPrizeText: "iPhone 16 Pro (256GB Titanium)",
      segments: [
        {
          label: "iPhone 16 Pro",
          type: "prize",
          color: "#E50914",
          textColor: "#FFFFFF",
          rewardText: "Brand new Apple iPhone 16 Pro!",
        },
        {
          label: "VIP Tickets",
          type: "prize",
          color: "#FFD700",
          textColor: "#1A0204",
          rewardText: "2x VIP Access Passes to Lagos SuperFest",
        },
        { label: "Try Again", type: "no-win", color: "#1A0204", textColor: "#FFFFFF" },
        {
          label: "Coca-Cola Kit",
          type: "prize",
          color: "#E50914",
          textColor: "#FFFFFF",
          rewardText: "Exclusive Coca-Cola Summer Merchandise Kit",
        },
        {
          label: "Golden Pass",
          type: "prize",
          color: "#FFFFFF",
          textColor: "#E50914",
          rewardText: "VIP SuperFest Lounge Access Pass",
        },
        {
          label: "iPhone 16 Pro",
          type: "prize",
          color: "#E50914",
          textColor: "#FFFFFF",
          rewardText: "Brand new Apple iPhone 16 Pro!",
        },
        {
          label: "Headphones",
          type: "prize",
          color: "#FFD700",
          textColor: "#1A0204",
          rewardText: "Premium Wireless Noise-Cancelling Headphones",
        },
        { label: "Better Luck", type: "no-win", color: "#2D0407", textColor: "#FFFFFF" },
      ],
    },
  },
  {
    id: "guinness-matchday-showdown",
    slug: "guinness-matchday-showdown",
    clientName: "Guinness (Diageo)",
    campaignName: "Guinness Matchday Fan Showdown",
    tagline: "Back your team, vote for the Man of the Match & unlock matchday bar vouchers!",
    description:
      "Matchdays are made of more with Guinness. Cast your vote for the decisive player of the derby, predict the scoreline, and earn guaranteed digital beer tokens redeemable at over 800 partner bars across the country.",
    heroBadge: "Premier League Matchday Campaign",
    logoText: "GUINNESS",
    logoAccentColor: "#C89D47",
    formType: "codeless",
    rewardType: "gift-card",
    mechanicType: "vote",
    mechanicLabel: "Live Fan Vote Showdown",
    status: "live",
    rewardSummary: "Guinness VIP Lounge Hospitality & ₦25,000 Bar Tabs",
    rewardValue: "₦35M Bar Tokens",
    rewardName: "₦25,000 Digital Bar Tab Gift Voucher Code",
    participantsCount: "210,000+ Votes Cast",
    channelSupport: ["SMS (1759)", "USSD", "Web Match Hub"],
    bannerUrl:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
    theme: {
      primary: "#C89D47",
      primaryHover: "#B58B35",
      secondary: "#FFFFFF",
      accent: "#FF4500",
      background: "#0B0B0C",
      surface: "#151618",
      cardBg: "#1E2023",
      text: "#F5F5F7",
      textMuted: "#9FA2A8",
      border: "#2E3238",
      badgeBg: "#C89D47",
      badgeText: "#0B0B0C",
      gradientFrom: "#070708",
      gradientTo: "#17181B",
    },
    points: [
      "Open fan engagement — no pack code entry required",
      "Real-time anti-fraud voting engine preventing duplicate phone entries",
      "Instant digital bar token SMS voucher generated upon vote confirmation",
      "VIP Matchday viewing ticket allocation for top-engaged fans",
    ],
    terms: [
      "Strictly 18+. Drink responsibly.",
      "Bar vouchers valid at verified partner lounges listed in the redemption directory.",
      "Vote closes at kickoff of each scheduled weekend fixture.",
    ],
    voteData: {
      categoryTitle: "Super Matchday MVP Player of the Derby",
      grandPrizeEntry: "Entered in ₦250,000 London Stadium VIP Trip Draw",
      candidates: [
        {
          id: "v1",
          name: 'Victor "The Maestro" Cole',
          subtitle: "Striker · 14 Goals this campaign · Masterclass Finisher",
          category: "Forward",
          votes: 14280,
          tag: "Leader #1",
          imageText: "VC9",
        },
        {
          id: "v2",
          name: 'Bukayo "Electric" Mensah',
          subtitle: "Winger · 11 Assists · Unstoppable Pace",
          category: "Midfield",
          votes: 12940,
          tag: "Fan Favorite",
          imageText: "BM7",
        },
        {
          id: "v3",
          name: 'Taiwo "The Wall" Balogun',
          subtitle: "Goalkeeper · 8 Clean Sheets · Penalty Saver",
          category: "Goalkeeper",
          votes: 9810,
          tag: "Defensive Rock",
          imageText: "TB1",
        },
      ],
    },
  },
  {
    id: "indomie-flavor-pulse",
    slug: "indomie-flavor-pulse",
    clientName: "Indomie (Dufil)",
    campaignName: "Indomie Flavor Pulse 2026",
    tagline:
      "What is your dream seasoning recipe? Vote, share your recipe style & get instant data!",
    description:
      "Indomie is crafting its next limited-edition mega flavor pack and wants consumer tastebuds to lead the recipe. Share your spice preferences and cooking rituals to help shape the next pack, while scoring 2GB instant data rewards.",
    heroBadge: "FMCG Market Sentiment Poll",
    logoText: "INDOMIE",
    logoAccentColor: "#FFCC00",
    formType: "codeless",
    rewardType: "data",
    mechanicType: "poll",
    mechanicLabel: "Rewarded Consumer Poll",
    status: "live",
    rewardSummary: "2GB Instant High-Speed Data + 1 Year Free Indomie Carton Supply",
    rewardValue: "₦20M Free Data Dispatched",
    rewardName: "2GB High-Speed 30-Day Mobile Data Bundle",
    participantsCount: "290,000+ Responses",
    channelSupport: ["Web Portal", "Campus QR Stands", "USSD"],
    bannerUrl:
      "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=1200&q=80",
    theme: {
      primary: "#E65100",
      primaryHover: "#BF360C",
      secondary: "#FFD600",
      accent: "#D50000",
      background: "#240F00",
      surface: "#381A05",
      cardBg: "#4A2308",
      text: "#FFF9F0",
      textMuted: "#E0B594",
      border: "#6B3510",
      badgeBg: "#FFD600",
      badgeText: "#3E1C00",
      gradientFrom: "#1A0900",
      gradientTo: "#421E06",
    },
    points: [
      "Open public survey — direct one-click voting",
      "Interactive single-tap consumer sentiment polling",
      "Automated dispatch of 2GB data to registered Nigerian mobile lines",
      "Consumer demographic and flavor preference profiling",
    ],
    terms: [
      "Data bundles credited directly to MTN, Airtel, Glo, or 9mobile numbers within 60 seconds.",
      "One entry per participant per household per month.",
      "Winning recipe creators will be featured in the official Indomie TV commercial.",
    ],
    pollData: {
      question: "Which new exotic Indomie recipe flavor should we launch nationwide first?",
      rewardNotice: "2GB High-Speed Data Bundle Credited to Your Network",
      options: [
        {
          id: "p1",
          label: "Smoked Jollof Spice & Suya Crunch",
          votes: 41200,
          description: "Infused with authentic smoky firewood aroma & roasted suya pepper blend.",
        },
        {
          id: "p2",
          label: "Creamy Coconut Curry with Prawns",
          votes: 29800,
          description: "Rich coconut milk broth seasoned with mild yellow curry & seafood essence.",
        },
        {
          id: "p3",
          label: "Fiery Pepper Soup & Fresh Herbs",
          votes: 34500,
          description: "Traditional aromatic uziza and scent leaf notes with an invigorating kick.",
        },
        {
          id: "p4",
          label: "Sweet Chili & Golden Teriyaki Zing",
          votes: 14100,
          description: "Sweet-savory Asian fusion glazed with toasted sesame & ginger.",
        },
      ],
    },
  },
  {
    id: "air-peace-skywards-insight",
    slug: "air-peace-skywards-insight",
    clientName: "Air Peace Airlines",
    campaignName: "Air Peace Skywards Passenger Survey",
    tagline:
      "Help us elevate African aviation. Complete our 3-minute survey for ₦10,000 flight credit!",
    description:
      "Air Peace is committed to delivering world-class hospitality on domestic and international routes. Share your in-flight comfort, baggage, and check-in experiences to receive an instant ₦10,000 promotional voucher gift card for your next flight booking.",
    heroBadge: "Passenger Hospitality Survey",
    logoText: "AIR PEACE",
    logoAccentColor: "#00A3E0",
    formType: "codeless",
    rewardType: "gift-card",
    mechanicType: "survey",
    mechanicLabel: "Multi-Step Insight Survey",
    status: "live",
    rewardSummary: "₦10,000 Direct Flight Discount Vouchers + Free Business Class Upgrades",
    rewardValue: "₦75M Voucher Credits",
    rewardName: "₦10,000 Air Peace Flight Gift Card Promo Code",
    participantsCount: "95,000+ Completed Surveys",
    channelSupport: ["In-Flight Wi-Fi Portal", "Web Portal", "Boarding Pass QR"],
    bannerUrl:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    theme: {
      primary: "#0077B6",
      primaryHover: "#005F94",
      secondary: "#00B4D8",
      accent: "#03045E",
      background: "#031926",
      surface: "#0B2D44",
      cardBg: "#123D5C",
      text: "#F0F8FF",
      textMuted: "#9AC1D9",
      border: "#1F557D",
      badgeBg: "#00B4D8",
      badgeText: "#031926",
      gradientFrom: "#02121C",
      gradientTo: "#0C3550",
    },
    points: [
      "Seamless codeless entry for all passengers",
      "Dynamic multi-step survey with real-time completion tracking",
      "Instant generation of verifiable, tamper-proof flight promo gift vouchers",
      "Direct redemption on the official Air Peace booking portal",
    ],
    terms: [
      "Flight voucher valid for 6 months on all domestic and regional Air Peace flight bookings.",
      "Discount code must be entered during checkout on the official Air Peace booking portal.",
      "One voucher code per ticket PNR booking.",
    ],
    surveyData: {
      rewardVoucher: "PEACE-SKY-9942",
      steps: [
        {
          id: 1,
          title: "Which route do you fly most frequently with Air Peace?",
          subtitle: "Step 1 of 3 · Travel Route Pattern",
          options: [
            "Lagos ⇄ Abuja (Domestic Business Corridor)",
            "Lagos / Abuja ⇄ Port Harcourt / Enugu / Asaba",
            "Regional West Africa (Accra, Banjul, Dakar)",
            "International Long-Haul (London Gatwick / Dubai)",
          ],
        },
        {
          id: 2,
          title: "How would you rate the check-in and on-time departure experience?",
          subtitle: "Step 2 of 3 · Airport Ground Operations",
          options: [
            "⭐⭐⭐⭐⭐ Excellent & Seamless (Priority Speed)",
            "⭐⭐⭐⭐ Good & Efficient (Under 15 mins)",
            "⭐⭐⭐ Average (Moderate queues)",
            "⭐⭐ Needs faster baggage handling",
          ],
        },
        {
          id: 3,
          title: "Which in-flight enhancement would you love to see next?",
          subtitle: "Step 3 of 3 · Future Product Roadmap",
          options: [
            "Enhanced High-Speed In-Flight Wi-Fi & Streaming",
            "Expanded Local Gourmet Warm Meal Options",
            "Express Luggage Priority Delivery at Carousel",
            "Family & Student Flexible Baggage Allowance",
          ],
        },
      ],
    },
  },
];

/* ---------------- Mock API Fetchers for TanStack Query ---------------- */

/**
 * Simulates fetching all client showcase campaigns.
 * Uses a small mock delay (e.g. 50ms) to ensure TanStack Query state transitions work cleanly.
 */
export async function fetchClientCampaigns(): Promise<ClientCampaign[]> {
  await new Promise((resolve) => setTimeout(resolve, 60));
  return clientCampaigns;
}

/**
 * Simulates fetching a single client campaign by slug.
 */
export async function fetchClientCampaignBySlug(slug: string): Promise<ClientCampaign | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 60));
  return clientCampaigns.find((c) => c.slug === slug);
}
