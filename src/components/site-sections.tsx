import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { type ReactNode } from "react";
import { motion } from "framer-motion";

import {
  CORAL,
  LIME,
  channels,
  type Campaign,
  type UseCase,
  type CaseStudy,
} from "../lib/site-data";
import { whileHoverCard, whileTapButton } from "../lib/motion-tokens";

/** Small uppercase eyebrow label with a lime accent, used above section titles. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#5B6470]">
      <span className="h-1.5 w-4 rounded-full" style={{ background: LIME }} />
      {children}
    </div>
  );
}

/** Card linking to a single interactive-campaign page. */
export function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <motion.div whileHover={whileHoverCard} className="h-full">
      <Link
        to="/interactive-campaigns/$campaign"
        params={{ campaign: campaign.slug }}
        className="group flex h-full flex-col rounded-[12px] border border-[#E4E7E9] bg-white p-6 transition-all duration-200 hover:border-[#CBD0D6] hover:shadow-card"
      >
        <span className="grid h-10 w-10 place-items-center rounded-[8px] shadow-xs" style={{ background: LIME }}>
          <campaign.icon className="h-5 w-5 text-[#14171A]" />
        </span>
        <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-[#14171A] group-hover:text-coral transition-colors">
          {campaign.label}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5B6470]">{campaign.summary}</p>
        <span
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
          style={{ color: CORAL }}
        >
          Learn more
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.div>
  );
}

/** Card describing a single use-case mechanic. */
export function UseCaseCard({ useCase }: { useCase: UseCase }) {
  return (
    <motion.div
      whileHover={whileHoverCard}
      className="flex items-start gap-4 rounded-[12px] border border-[#E4E7E9] bg-white p-6 shadow-xs transition-all duration-200 hover:border-[#CBD0D6] hover:shadow-card h-full"
    >
      <span
        className="grid h-11 w-11 shrink-0 place-items-center rounded-[8px] shadow-xs"
        style={{ background: useCase.tint }}
      >
        <useCase.icon
          className="h-5 w-5"
          style={{ color: useCase.tint === "#1a1a1a" || useCase.tint === "#14171A" ? "#fff" : "#14171A" }}
        />
      </span>
      <div>
        <div className="font-display text-base font-semibold text-[#14171A]">{useCase.title}</div>
        <p className="mt-1.5 text-sm leading-relaxed text-[#5B6470]">{useCase.blurb}</p>
      </div>
    </motion.div>
  );
}

/** Compact row summarising a case-study deployment. */
export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <motion.div
      whileHover={whileHoverCard}
      className="flex items-center justify-between gap-4 rounded-[12px] border border-[#E4E7E9] bg-white p-6 shadow-xs transition-all duration-200 hover:border-[#CBD0D6] hover:shadow-card h-full"
    >
      <div className="flex items-start gap-3.5">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px]"
          style={{ background: `${CORAL}14` }}
        >
          <caseStudy.icon className="h-5 w-5" style={{ color: CORAL }} />
        </span>
        <div>
          <div className="font-display text-base font-semibold text-[#14171A]">{caseStudy.brand}</div>
          <div className="text-xs font-medium text-[#5B6470] mt-0.5">{caseStudy.label}</div>
        </div>
      </div>
      <div className="font-display text-2xl font-semibold tracking-tight" style={{ color: CORAL }}>
        {caseStudy.stat}
      </div>
    </motion.div>
  );
}

/** Row of channel chips (Web / USSD / SMS / Screens). */
export function ChannelChips() {
  return (
    <div className="flex flex-wrap gap-2">
      {channels.map((ch) => (
        <motion.span
          key={ch.label}
          whileTap={whileTapButton}
          className="inline-flex items-center gap-2 rounded-[4px] border border-[#E4E7E9] bg-[#F7F8F5] px-3 py-1.5 text-xs font-semibold text-[#14171A] cursor-default"
        >
          <ch.icon className="h-3.5 w-3.5" style={{ color: CORAL }} />
          {ch.label}
        </motion.span>
      ))}
    </div>
  );
}
