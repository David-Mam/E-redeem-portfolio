import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { CORAL, LIME, caseStudies } from "../lib/site-data";
import { Eyebrow } from "../components/site-sections";

export const Route = createFileRoute("/case-studies")({
  component: CaseStudies,
});

function CaseStudies() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <Eyebrow>Case Studies</Eyebrow>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Proven campaigns for household brands.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Eight years of consumer engagement expertise — deployed for FMCG, spirits and telco
            category leaders across Nigeria.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((c) => (
            <div
              key={c.brand}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]"
            >
              <div className="flex items-center justify-between">
                <span
                  className="grid h-12 w-12 place-items-center rounded-xl"
                  style={{ background: `${CORAL}1a` }}
                >
                  <c.icon className="h-6 w-6" style={{ color: CORAL }} />
                </span>
                <span className="text-3xl font-bold tracking-tight" style={{ color: CORAL }}>
                  {c.stat}
                </span>
              </div>
              <h2 className="mt-6 text-lg font-bold tracking-tight text-slate-900">{c.brand}</h2>
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                {c.label}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{c.blurb}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-2 border-t border-dashed border-slate-200 pt-6">
          <span
            className="grid h-6 w-6 place-items-center rounded-full"
            style={{ background: LIME }}
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-slate-900" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-600">
            Verified deployments · 2019 – 2026
          </span>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-900 p-8 sm:p-10">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Want results like these?
            </h2>
            <p className="mt-2 text-slate-300">
              Talk to the E-Redeem team about your next consumer engagement campaign.
            </p>
          </div>
          <Link
            to="/contacts"
            className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:brightness-110"
            style={{ background: CORAL }}
          >
            Start a conversation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
