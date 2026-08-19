import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { CORAL, useCases } from "../lib/site-data";
import { Eyebrow } from "../components/site-sections";

export const Route = createFileRoute("/use-cases")({
  component: UseCases,
});

function UseCases() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <Eyebrow>Use Cases</Eyebrow>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Three ways brands deploy E-Redeem.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Whether you're driving footfall to an activation, growing basket size at the till, or
            nurturing a specific segment, E-Redeem gives you the mechanic.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {useCases.map((u) => (
            <div
              key={u.title}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]"
            >
              <span
                className="grid h-14 w-14 place-items-center rounded-2xl"
                style={{ background: u.tint }}
              >
                <u.icon
                  className="h-7 w-7"
                  style={{ color: u.tint === "#1a1a1a" ? "#fff" : "#1a1a1a" }}
                />
              </span>
              <h2 className="mt-6 text-lg font-bold tracking-tight text-slate-900">{u.title}</h2>
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Campaign mechanic
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{u.blurb}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:p-10">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Pick a mechanic, launch a campaign.
            </h2>
            <p className="mt-2 text-slate-600">
              Explore the interactive campaign types that power each use case.
            </p>
          </div>
          <Link
            to="/campaigns"
            className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md hover:brightness-110"
            style={{ background: CORAL }}
          >
            View campaigns
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
