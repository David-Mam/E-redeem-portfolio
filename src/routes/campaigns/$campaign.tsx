import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";

import { CORAL, LIME, campaigns, getCampaign } from "../../lib/site-data";
import RedeemModal, { type RedeemSubmission } from "@/systems/redeem/components/RedeemModal";
import WinToast from "@/systems/redeem/components/WinToast";
import QuizModal from "@/campaigns/sites/QuizModal";
import RaffleModal from "@/campaigns/sites/RaffleModal";
import PollModal from "@/campaigns/sites/PollModal";
import VoteModal from "@/campaigns/sites/VoteModal";
import SurveyModal from "@/campaigns/sites/SurveyModal";

export const Route = createFileRoute("/campaigns/$campaign")({
  loader: ({ params }) => {
    // Validate the slug up front so unknown campaigns render the 404 shell.
    if (!getCampaign(params.campaign)) throw notFound();
  },
  component: CampaignPage,
});

function CampaignPage() {
  const { campaign: slug } = Route.useParams();
  // Guaranteed present by the loader's notFound guard above.
  const campaign = getCampaign(slug)!;
  const others = campaigns.filter((c) => c.slug !== campaign.slug);

  const [demoOpen, setDemoOpen] = useState(false);
  const [prize, setPrize] = useState<string | null>(null);

  useEffect(() => {
    if (!prize) return;
    const timer = setTimeout(() => setPrize(null), 4500);
    return () => clearTimeout(timer);
  }, [prize]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Link
          to="/campaigns"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          All campaigns
        </Link>

        <div className="mt-8 flex items-start gap-5">
          <span
            className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl"
            style={{ background: LIME }}
          >
            <campaign.icon className="h-8 w-8 text-slate-900" />
          </span>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Interactive Campaign
            </div>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {campaign.label}
            </h1>
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-slate-600">
          {campaign.description}
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {campaign.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <span
                className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full"
                style={{ background: LIME }}
              >
                <CheckCircle2 className="h-4 w-4 text-slate-900" />
              </span>
              <span className="text-sm leading-relaxed text-slate-700">{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Link
            to="/contacts"
            className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md hover:brightness-110"
            style={{ background: CORAL }}
          >
            Launch this campaign
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            id="see-in-action-btn"
            onClick={() => setDemoOpen(true)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-md border-2 bg-white px-6 py-3 text-sm font-semibold transition-all hover:bg-slate-50 hover:shadow-sm"
            style={{ borderColor: CORAL, color: CORAL }}
          >
            <Play className="h-4 w-4 fill-current" />
            See it in action
          </button>
        </div>

        <div className="mt-16 border-t border-slate-200 pt-10">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Other campaigns
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {others.map((c) => (
              <Link
                key={c.slug}
                to="/campaigns/$campaign"
                params={{ campaign: c.slug }}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                <c.icon className="h-4 w-4" style={{ color: CORAL }} />
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive campaign demo modals launched via 'See it in action' */}
      {campaign.demo === "code" && (
        <RedeemModal
          isOpen={demoOpen}
          onClose={() => setDemoOpen(false)}
          onSubmit={({ firstName, code }: RedeemSubmission) => {
            setDemoOpen(false);
            setPrize(`Thanks ${firstName} — code ${code} won ₦200 airtime.`);
          }}
        />
      )}
      {campaign.demo === "quiz" && (
        <QuizModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      )}
      {campaign.demo === "raffle" && (
        <RaffleModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      )}
      {campaign.demo === "poll" && (
        <PollModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      )}
      {campaign.demo === "vote" && (
        <VoteModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      )}
      {campaign.demo === "survey" && (
        <SurveyModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      )}

      <WinToast visible={!!prize} prizeName={prize} onClose={() => setPrize(null)} />
    </section>
  );
}
