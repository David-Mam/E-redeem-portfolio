import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { CORAL, LIME, caseStudies } from "../lib/site-data";
import { Eyebrow } from "../components/site-sections";
import {
  ScrollReveal,
  ScrollStaggerContainer,
  ScrollStaggerItem,
} from "../components/scroll-animations";

export const Route = createFileRoute("/case-studies")({
  component: CaseStudies,
});

function CaseStudies() {
  return (
    <section className="bg-[#F7F8F5] min-h-screen overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <ScrollReveal direction="up" distance={12} className="max-w-3xl">
          <Eyebrow>Case Studies</Eyebrow>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#14171A]">
            Proven campaigns for household brands.
          </h1>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#5B6470]">
            Eight years of consumer engagement expertise — deployed for FMCG, spirits and telco
            category leaders across Nigeria.
          </p>
        </ScrollReveal>

        <ScrollStaggerContainer staggerDelay={0.06} className="mt-10 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((c) => (
            <ScrollStaggerItem key={c.brand} distance={14}>
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[12px] border border-[#E4E7E9] bg-white p-6 sm:p-7 shadow-xs transition-all duration-200 hover:border-[#CBD0D6] hover:shadow-card hover:-translate-y-0.5">
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-[8px] shadow-2xs"
                      style={{ background: `${CORAL}14` }}
                    >
                      <c.icon className="h-5 w-5" style={{ color: CORAL }} />
                    </span>
                    <span className="font-display text-2xl sm:text-3xl font-semibold tracking-tight" style={{ color: CORAL }}>
                      {c.stat}
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-lg font-semibold tracking-tight text-[#14171A] group-hover:text-coral transition-colors">{c.brand}</h2>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#5B6470] mt-0.5">
                    {c.label}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#5B6470]">{c.blurb}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E4E7E9] flex items-center justify-between text-[11px] font-medium text-[#5B6470]">
                  <span>Verified FMCG Campaign</span>
                  <span className="font-bold text-[#14171A]">WCI Engine</span>
                </div>
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStaggerContainer>

        <ScrollReveal
          direction="up"
          distance={10}
          delay={0.05}
          className="mt-10 flex items-center gap-2 border-t border-[#E4E7E9] pt-5"
        >
          <span
            className="grid h-5 w-5 place-items-center rounded-full shadow-2xs"
            style={{ background: LIME }}
          >
            <CheckCircle2 className="h-3 w-3 text-[#14171A]" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6470]">
            Verified deployments · 2019 – 2026
          </span>
        </ScrollReveal>

        <ScrollReveal
          direction="up"
          distance={14}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-[12px] bg-[#14171A] p-7 sm:p-9 shadow-panel text-white"
        >
          <div className="max-w-xl">
            <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-white">
              Want results like these?
            </h2>
            <p className="mt-1.5 text-sm text-slate-300">
              Talk to the E-Redeem team about your next consumer engagement campaign.
            </p>
          </div>
          <Link
            to="/contacts"
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-[8px] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all hover:brightness-105"
            style={{ background: CORAL }}
          >
            Start a conversation
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
