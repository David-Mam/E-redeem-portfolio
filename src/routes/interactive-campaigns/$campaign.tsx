import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Play,
  Sparkles,
  ShieldCheck,
  Trophy,
} from "lucide-react";

import { CORAL, LIME, campaigns, getCampaign } from "../../lib/site-data";
import { Eyebrow, ChannelChips, CampaignCard } from "../../components/site-sections";
import {
  ScrollReveal,
  ScrollStaggerContainer,
  ScrollStaggerItem,
} from "../../components/scroll-animations";
import { whileTapButton } from "../../lib/motion-tokens";

import RedeemModal, { type RedeemSubmission } from "@/systems/redeem/components/RedeemModal";
import WinToast from "@/systems/redeem/components/WinToast";
import QuizModal from "@/campaigns/sites/QuizModal";
import RaffleModal from "@/campaigns/sites/RaffleModal";
import PollModal from "@/campaigns/sites/PollModal";
import VoteModal from "@/campaigns/sites/VoteModal";
import SurveyModal from "@/campaigns/sites/SurveyModal";

export const Route = createFileRoute("/interactive-campaigns/$campaign")({
  loader: ({ params }) => {
    // Validate the slug up front so unknown campaigns render the 404 shell.
    if (!getCampaign(params.campaign)) throw notFound();
  },
  component: InteractiveCampaignPage,
});

function InteractiveCampaignPage() {
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
    <section className="bg-white overflow-hidden py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <ScrollReveal direction="up" distance={12}>
          <Link
            to="/interactive-campaigns"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            All campaign mechanics
          </Link>
        </ScrollReveal>

        {/* Hero Section */}
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center">
          <ScrollReveal direction="up" distance={18} className="lg:col-span-7">
            <Eyebrow>Campaign Mechanic</Eyebrow>
            <div className="mt-4 flex items-center gap-4">
              <span
                className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl shadow-sm"
                style={{ background: LIME }}
              >
                <campaign.icon className="h-7 w-7 text-slate-900" />
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                {campaign.label}
              </h1>
            </div>
            <p className="mt-6 text-lg leading-relaxed text-slate-600 max-w-2xl">
              {campaign.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <motion.button
                type="button"
                id="see-in-action-btn"
                whileTap={whileTapButton}
                onClick={() => setDemoOpen(true)}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-slate-900 shadow-md transition-colors hover:bg-slate-100 uppercase tracking-wider"
                style={{ background: LIME }}
              >
                <Play className="h-4 w-4 fill-current" />
                See it in action
              </motion.button>

              <motion.div whileTap={whileTapButton}>
                <Link
                  to="/contacts"
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white shadow-md transition-colors hover:brightness-110"
                  style={{ background: CORAL }}
                >
                  Launch this campaign
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Right Column Feature Card */}
          <ScrollReveal direction="up" distance={20} className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Interactive Demo Preview
                </span>
                <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-[11px] font-bold text-slate-700">
                  Ready to test
                </span>
              </div>

              <h2 className="mt-4 text-xl font-bold text-slate-900">
                Experience the {campaign.label} Mechanic
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Click below to launch an interactive simulation of how your consumers will
                experience this promotional mechanic in real time.
              </p>

              <div className="mt-6 border-t border-slate-200 pt-6">
                <motion.button
                  type="button"
                  whileTap={whileTapButton}
                  onClick={() => setDemoOpen(true)}
                  className="w-full inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white py-3 text-sm font-bold text-slate-900 shadow-sm transition-colors hover:bg-slate-50"
                >
                  <Sparkles className="h-4 w-4" style={{ color: CORAL }} />
                  Launch Interactive Simulator
                </motion.button>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Mechanics and Channel Details */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {/* Key Capabilities */}
          <ScrollReveal
            direction="up"
            distance={16}
            className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm"
          >
            <h2 className="text-lg font-bold tracking-tight text-slate-900">
              Key Mechanics &amp; Capabilities
            </h2>
            <ul className="mt-6 space-y-4">
              {campaign.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                    style={{ background: `${LIME}4D` }}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-900" />
                  </span>
                  <span className="text-sm font-medium text-slate-700 leading-snug">{point}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Omnichannel Deployment */}
          <ScrollReveal
            direction="up"
            distance={16}
            className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm"
          >
            <h2 className="text-lg font-bold tracking-tight text-slate-900">
              Omnichannel Deployment
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Deploy this mechanic across the touchpoints that best suit your target market and
              connectivity requirements.
            </p>
            <div className="mt-6">
              <ChannelChips />
            </div>

            <div className="mt-6 border-t border-slate-100 pt-6 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0" style={{ color: CORAL }} />
              <p className="text-xs text-slate-500 leading-relaxed">
                Backed by real-time Winning Code Iteration (WCI) cryptographic allocation to ensure
                100% fraud-proof execution.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Fraud Elimination & Winner Allocation Banner */}
        <ScrollReveal
          direction="up"
          distance={18}
          className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-slate-900 p-8 sm:p-10 text-white"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Trophy className="h-4 w-4" style={{ color: LIME }} />
              <span>Fraud-Proof Architecture</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Winning Code Iteration Engine
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Winning entries are allocated dynamically across real-time intervals. No physical code
              is ever pre-marked as winning, eliminating insider theft and supply-chain code leaks.
            </p>
          </div>

          <motion.div whileTap={whileTapButton}>
            <Link
              to="/contacts"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:brightness-110"
              style={{ background: CORAL }}
            >
              Talk to our team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </ScrollReveal>

        {/* Other Mechanics Grid */}
        <div className="mt-20">
          <ScrollReveal direction="up" distance={14}>
            <div className="flex items-center justify-between">
              <div>
                <Eyebrow>More Mechanics</Eyebrow>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                  Explore other interactive campaign mechanics
                </h2>
              </div>
              <Link
                to="/interactive-campaigns"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold"
                style={{ color: CORAL }}
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollStaggerContainer
            staggerDelay={0.06}
            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {others.slice(0, 3).map((c) => (
              <ScrollStaggerItem key={c.slug} distance={16}>
                <CampaignCard campaign={c} />
              </ScrollStaggerItem>
            ))}
          </ScrollStaggerContainer>
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
