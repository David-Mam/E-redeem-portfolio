import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Play,
  Sparkles,
  ShieldCheck,
  Trophy,
  Share2,
} from "lucide-react";

import { CORAL, LIME, campaigns, getCampaign } from "../../lib/site-data";
import RedeemModal, { type RedeemSubmission } from "@/systems/redeem/components/RedeemModal";
import WinToast from "@/systems/redeem/components/WinToast";
import QuizModal from "@/campaigns/sites/QuizModal";
import RaffleModal from "@/campaigns/sites/RaffleModal";
import PollModal from "@/campaigns/sites/PollModal";
import VoteModal from "@/campaigns/sites/VoteModal";
import SurveyModal from "@/campaigns/sites/SurveyModal";
import {
  whileTapButton,
  whileHoverCard,
  stepSlideVariants,
  reducedMotionVariants,
} from "../../lib/motion-tokens";

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
  const prefersReducedMotion = useReducedMotion();

  const [demoOpen, setDemoOpen] = useState(false);
  const [prize, setPrize] = useState<string | null>(null);

  useEffect(() => {
    if (!prize) return;
    const timer = setTimeout(() => setPrize(null), 4500);
    return () => clearTimeout(timer);
  }, [prize]);

  return (
    <section className="min-h-screen bg-[#FDF6F3] py-10 sm:py-16 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Top breadcrumb navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/interactive-campaigns"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 transition-colors hover:text-slate-950"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-180" />
            All campaign mechanics
          </Link>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
            Simulation Preview
          </span>
        </div>

        {/* Outer Editorial Mobile / Presentation Frame */}
        <motion.div
          id="campaign-editorial-frame"
          variants={prefersReducedMotion ? reducedMotionVariants : stepSlideVariants}
          initial="initial"
          animate="animate"
          className="relative overflow-hidden rounded-[36px] sm:rounded-[44px] bg-[#14171A] text-white p-6 sm:p-9 shadow-2xl border border-slate-800"
        >
          {/* 1. Header Bar inside Frame */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-5">
            <span className="text-sm font-black tracking-widest uppercase text-white">
              E-REDEEM
            </span>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/15 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                FEATURED
              </span>
              <span
                className="rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-900"
                style={{ backgroundColor: LIME }}
              >
                MECHANIC
              </span>
            </div>
          </div>

          {/* 2. Top Arch / Capsule Aperture */}
          <div className="relative z-10 mt-8 text-center">
            <div className="relative mx-auto flex h-28 w-44 items-center justify-center overflow-hidden rounded-t-full rounded-b-3xl border border-white/20 bg-white/5 p-2 shadow-inner">
              <span
                className="relative grid h-16 w-16 place-items-center rounded-2xl shadow-lg"
                style={{ background: LIME }}
              >
                <campaign.icon className="h-8 w-8 text-slate-900" />
              </span>
            </div>

            {/* Eyebrow & Main Display Headline */}
            <div className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Interactive Campaign Mechanic
            </div>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {campaign.label}
            </h1>

            {/* Description Narrative */}
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-300">
              {campaign.description}
            </p>

            {/* Centered High-Contrast Pill CTA */}
            <div className="mt-6 flex justify-center">
              <motion.button
                type="button"
                id="see-in-action-btn"
                whileTap={whileTapButton}
                onClick={() => setDemoOpen(true)}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-xs font-bold text-slate-900 shadow-md transition-colors hover:bg-slate-100 hover:shadow-lg uppercase tracking-wider"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                See it in action
              </motion.button>
            </div>
          </div>

          {/* 3. Bento Card Structure (Light Inner Container with Split Points & Visual Action) */}
          <div className="relative z-10 mt-8 rounded-[28px] bg-white p-6 sm:p-7 text-slate-900 shadow-xl">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              {/* Left Column: Points List */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Key Mechanics &amp; Capabilities
                </div>
                <ul className="mt-4 space-y-3">
                  {campaign.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700 leading-snug"
                    >
                      <span
                        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                        style={{ background: `${LIME}4D` }}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-slate-900" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Visual Aperture with Embedded Action */}
              <div className="relative flex min-h-[170px] flex-col justify-between overflow-hidden rounded-2xl bg-slate-900 p-5 text-white shadow-inner border border-slate-800">
                <div className="relative z-10 flex items-center justify-between">
                  <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Live Engine
                  </span>
                  <Sparkles className="h-4 w-4" style={{ color: LIME }} />
                </div>

                <div className="relative z-10 my-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Simulation Ready
                  </div>
                  <div className="text-base font-bold text-white">
                    Instant Win &amp; Verification
                  </div>
                </div>

                <div className="relative z-10">
                  <motion.button
                    type="button"
                    whileTap={whileTapButton}
                    onClick={() => setDemoOpen(true)}
                    className="w-full rounded-full py-2 text-center text-xs font-bold text-white shadow-sm transition-colors hover:brightness-110 cursor-pointer"
                    style={{ background: CORAL }}
                  >
                    Launch Interactive Demo
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Highlight & Urgency Section */}
          <div className="relative z-10 mt-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              100% Fraud-Proof Winner Allocation
            </h2>
            <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-slate-400">
              Winning Code Iteration dynamically validates every entry in real-time. No physical
              code is pre-marked as winning.
            </p>

            {/* Visual Aperture Banner */}
            <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-5 text-left">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                    style={{ background: `${LIME}33` }}
                  >
                    <Trophy className="h-5 w-5" style={{ color: LIME }} />
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white">Automated Instant Payouts</div>
                    <div className="text-[11px] text-slate-400">
                      Airtime, Mobile Data, Gift Cards &amp; Cash
                    </div>
                  </div>
                </div>

                <motion.div whileTap={whileTapButton}>
                  <Link
                    to="/contacts"
                    className="inline-block rounded-full px-5 py-2 text-xs font-bold text-white shadow-md transition-colors hover:brightness-110"
                    style={{ background: CORAL }}
                  >
                    Launch this campaign
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          {/* 5. Footer Card inside Frame */}
          <div className="relative z-10 mt-8 rounded-[24px] bg-white p-6 text-center text-slate-900 shadow-md">
            <div className="text-xs font-black tracking-widest uppercase text-slate-900">
              E-REDEEM
            </div>
            <p className="mt-1 text-xs text-slate-500 font-medium">
              Your next promotional campaign starts here.
            </p>
            <div className="mt-3 flex justify-center gap-4 text-slate-600">
              <ShieldCheck className="h-4 w-4" style={{ color: CORAL }} />
              <Sparkles className="h-4 w-4" style={{ color: LIME }} />
              <Share2 className="h-4 w-4 text-slate-600" />
            </div>
            <p className="mt-3 text-[10px] text-slate-400 leading-normal">
              You are exploring a live interactive mechanic demonstration. Launch your own campaign
              anytime with custom branding.
            </p>
          </div>

          {/* 6. Other Mechanics Navigation */}
          <div className="relative z-10 mt-8 border-t border-white/10 pt-6">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Other mechanics
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {others.map((c) => (
                <motion.div key={c.slug} whileHover={whileHoverCard} whileTap={whileTapButton}>
                  <Link
                    to="/interactive-campaigns/$campaign"
                    params={{ campaign: c.slug }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-white/30 hover:bg-white/10"
                  >
                    <c.icon className="h-3.5 w-3.5" style={{ color: CORAL }} />
                    {c.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
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
