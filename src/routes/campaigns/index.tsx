import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { CORAL, campaigns } from "../../lib/site-data";
import { Eyebrow, CampaignCard, ChannelChips } from "../../components/site-sections";

export const Route = createFileRoute("/campaigns/")({
  component: CampaignsIndex,
});

function CampaignsIndex() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <Eyebrow>Interactive Campaigns</Eyebrow>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Reach every consumer, on every channel they use.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            E-Redeem runs across the channels your consumers already live on — from mass-market USSD
            and SMS to web and interactive in-store screens. Pick the mechanic that fits your
            objective.
          </p>
          <div className="mt-6">
            <ChannelChips />
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c) => (
            <CampaignCard key={c.slug} campaign={c} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-900 p-8 sm:p-10">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Not sure which mechanic fits?
            </h2>
            <p className="mt-2 text-slate-300">
              Tell us your objective and we'll recommend the right interactive campaign.
            </p>
          </div>
          <Link
            to="/contacts"
            className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-bold text-slate-900 shadow-lg transition-all hover:brightness-110"
            style={{ background: CORAL, color: "#fff" }}
          >
            Talk to the team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
