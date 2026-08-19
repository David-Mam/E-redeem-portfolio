import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { type ReactNode } from "react";

import {
  CORAL,
  LIME,
  channels,
  type Campaign,
  type UseCase,
  type CaseStudy,
} from "../lib/site-data";

/** Small uppercase eyebrow label with a lime accent, used above section titles. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
      <span className="h-1.5 w-6 rounded-full" style={{ background: LIME }} />
      {children}
    </div>
  );
}

/** Card linking to a single interactive-campaign page. */
export function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <Link
      to="/campaigns/$campaign"
      params={{ campaign: campaign.slug }}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]"
    >
      <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: LIME }}>
        <campaign.icon className="h-5 w-5 text-slate-900" />
      </span>
      <h3 className="mt-5 text-base font-bold tracking-tight text-slate-900">{campaign.label}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{campaign.summary}</p>
      <span
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold"
        style={{ color: CORAL }}
      >
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

/** Card describing a single use-case mechanic. */
export function UseCaseCard({ useCase }: { useCase: UseCase }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <span
        className="grid h-12 w-12 shrink-0 place-items-center rounded-xl"
        style={{ background: useCase.tint }}
      >
        <useCase.icon
          className="h-6 w-6"
          style={{ color: useCase.tint === "#1a1a1a" ? "#fff" : "#1a1a1a" }}
        />
      </span>
      <div>
        <div className="text-base font-bold text-slate-900">{useCase.title}</div>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{useCase.blurb}</p>
      </div>
    </div>
  );
}

/** Compact row summarising a case-study deployment. */
export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start gap-3">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg"
          style={{ background: `${CORAL}1a` }}
        >
          <caseStudy.icon className="h-5 w-5" style={{ color: CORAL }} />
        </span>
        <div>
          <div className="text-sm font-bold text-slate-900">{caseStudy.brand}</div>
          <div className="text-xs text-slate-500">{caseStudy.label}</div>
        </div>
      </div>
      <div className="text-2xl font-bold tracking-tight" style={{ color: CORAL }}>
        {caseStudy.stat}
      </div>
    </div>
  );
}

/** Row of channel chips (Web / USSD / SMS / Screens). */
export function ChannelChips() {
  return (
    <div className="flex flex-wrap gap-2">
      {channels.map((ch) => (
        <span
          key={ch.label}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
        >
          <ch.icon className="h-3.5 w-3.5" style={{ color: CORAL }} />
          {ch.label}
        </span>
      ))}
    </div>
  );
}
