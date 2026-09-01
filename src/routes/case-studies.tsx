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
    <section className="bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <ScrollReveal direction="up" distance={16} className="max-w-3xl">
          <Eyebrow>Case Studies</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Proven campaigns for household brands.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Eight years of consumer engagement expertise — deployed for FMCG, spirits and telco
            category leaders across Nigeria.
          </p>
        </ScrollReveal>

        <ScrollStaggerContainer staggerDelay={0.09} className="mt-12 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((c) => (
            <ScrollStaggerItem key={c.brand} distance={18}>
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-editorial transition-all duration-300 hover:border-slate-300 hover:shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `linear-gradient(90deg, ${CORAL}, ${LIME})` }} />
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-xl shadow-xs transition-transform duration-300 group-hover:scale-105"
                      style={{ background: `${CORAL}15` }}
                    >
                      <c.icon className="h-6 w-6" style={{ color: CORAL }} />
                    </span>
                    <span className="font-display text-3xl font-bold tracking-tight" style={{ color: CORAL }}>
                      {c.stat}
                    </span>
                  </div>
                  <h2 className="mt-6 font-display text-xl font-bold tracking-tight text-slate-900 group-hover:text-coral transition-colors">{c.brand}</h2>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    {c.label}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{c.blurb}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400">
                  <span>Verified FMCG Campaign</span>
                  <span className="font-semibold text-slate-700">WCI Engine</span>
                </div>
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStaggerContainer>

        <ScrollReveal
          direction="up"
          distance={12}
          delay={0.1}
          className="mt-12 flex items-center gap-2 border-t border-dashed border-slate-200 pt-6"
        >
          <span
            className="grid h-6 w-6 place-items-center rounded-full shadow-2xs"
            style={{ background: LIME }}
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-slate-900" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-600">
            Verified deployments · 2019 – 2026
          </span>
        </ScrollReveal>

        <ScrollReveal
          direction="up"
          distance={18}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-2xl bg-slate-900 p-8 sm:p-10 shadow-editorial"
        >
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white">
              Want results like these?
            </h2>
            <p className="mt-2 text-slate-300">
              Talk to the E-Redeem team about your next consumer engagement campaign.
            </p>
          </div>
          <Link
            to="/contacts"
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-md px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:brightness-110"
            style={{ background: CORAL }}
          >
            Start a conversation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
