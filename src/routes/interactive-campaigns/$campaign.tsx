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
    <section className="bg-[#F7F8F5] min-h-screen overflow-hidden py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <ScrollReveal direction="up" distance={10}>
          <Link
            to="/interactive-campaigns"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5B6470] transition-colors hover:text-[#14171A]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All campaign mechanics
          </Link>
        </ScrollReveal>

        {/* Hero Section */}
        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-center">
          <ScrollReveal direction="up" distance={12} className="lg:col-span-7">
            <Eyebrow>Campaign Mechanic</Eyebrow>
            <div className="mt-3 flex items-center gap-3.5">
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-[8px] shadow-xs"
                style={{ background: LIME }}
              >
                <campaign.icon className="h-6 w-6 text-[#14171A]" />
              </span>
              <h1 className="font-display text-3xl font-semibold tracking-tight text-[#14171A] sm:text-4xl lg:text-5xl">
                {campaign.label}
              </h1>
            </div>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5B6470] max-w-2xl">
              {campaign.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <motion.button
                type="button"
                id="see-in-action-btn"
                whileTap={whileTapButton}
                onClick={() => setDemoOpen(true)}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-[8px] px-6 py-3 text-xs font-bold text-[#14171A] shadow-xs transition-colors hover:brightness-105 uppercase tracking-wider"
                style={{ background: LIME }}
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                See it in action
              </motion.button>

              <motion.div whileTap={whileTapButton}>
                <Link
                  to="/contacts"
                  className="inline-flex items-center gap-2 rounded-[8px] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all hover:brightness-105"
                  style={{ background: CORAL }}
                >
                  Launch this campaign
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Right Column Feature Card */}
          <ScrollReveal direction="up" distance={14} className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[12px] border border-[#E4E7E9] bg-white p-6 sm:p-7 shadow-card">
              <div className="flex items-center justify-between border-b border-[#E4E7E9] pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B6470]">
                  Interactive Demo Preview
                </span>
                <span className="rounded-[4px] bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  Ready to test
                </span>
              </div>

              <h2 className="mt-4 font-display text-lg font-semibold text-[#14171A]">
                Experience the {campaign.label} Mechanic
              </h2>
              <p className="mt-1.5 text-xs text-[#5B6470] leading-relaxed">
                Click below to launch an interactive simulation of how your consumers will
                experience this promotional mechanic in real time.
              </p>

              <div className="mt-5 border-t border-[#E4E7E9] pt-4">
                <motion.button
                  type="button"
                  whileTap={whileTapButton}
                  onClick={() => setDemoOpen(true)}
                  className="w-full inline-flex cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#E4E7E9] bg-[#F7F8F5] py-3 text-xs font-bold uppercase tracking-wider text-[#14171A] shadow-xs transition-all hover:bg-white hover:border-[#CBD0D6]"
                >
                  <Sparkles className="h-3.5 w-3.5" style={{ color: CORAL }} />
                  Launch Interactive Simulator
                </motion.button>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Mechanics and Channel Details */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Key Capabilities */}
          <ScrollReveal
            direction="up"
            distance={12}
            className="rounded-[12px] border border-[#E4E7E9] bg-white p-6 sm:p-7 shadow-xs"
          >
            <h2 className="font-display text-base font-semibold tracking-tight text-[#14171A]">
              Key Mechanics &amp; Capabilities
            </h2>
            <ul className="mt-5 space-y-3">
              {campaign.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <span
                    className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-[4px]"
                    style={{ background: `${LIME}4D` }}
                  >
                    <CheckCircle2 className="h-3 w-3 text-[#14171A]" />
                  </span>
                  <span className="text-xs font-medium text-[#14171A] leading-snug">{point}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Omnichannel Deployment */}
          <ScrollReveal
            direction="up"
            distance={12}
            className="rounded-[12px] border border-[#E4E7E9] bg-white p-6 sm:p-7 shadow-xs"
          >
            <h2 className="font-display text-base font-semibold tracking-tight text-[#14171A]">
              Omnichannel Deployment
            </h2>
            <p className="mt-1.5 text-xs text-[#5B6470] leading-relaxed">
              Deploy this mechanic across the touchpoints that best suit your target market and
              connectivity requirements.
            </p>
            <div className="mt-5">
              <ChannelChips />
            </div>

            <div className="mt-5 border-t border-[#E4E7E9] pt-4 flex items-start gap-2.5">
              <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" style={{ color: CORAL }} />
              <p className="text-xs text-[#5B6470] leading-relaxed">
                Backed by real-time Winning Code Iteration (WCI) cryptographic allocation to ensure
                100% fraud-proof execution.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Fraud Elimination & Winner Allocation Banner */}
        <ScrollReveal
          direction="up"
          distance={14}
          className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-[12px] bg-[#14171A] p-7 sm:p-9 text-white shadow-panel"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <Trophy className="h-3.5 w-3.5" style={{ color: LIME }} />
              <span>Fraud-Proof Architecture</span>
            </div>
            <h2 className="mt-2 font-display text-xl sm:text-2xl font-semibold tracking-tight text-white">
              Winning Code Iteration Engine
            </h2>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
              Winning entries are allocated dynamically across real-time intervals. No physical code
              is ever pre-marked as winning, eliminating insider theft and supply-chain code leaks.
            </p>
          </div>

          <motion.div whileTap={whileTapButton}>
            <Link
              to="/contacts"
              className="inline-flex items-center gap-2 rounded-[8px] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all hover:brightness-105"
              style={{ background: CORAL }}
            >
              Talk to our team
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </ScrollReveal>

        {/* Other Mechanics Grid */}
        <div className="mt-14">
          <ScrollReveal direction="up" distance={12}>
            <div className="flex items-center justify-between">
              <div>
                <Eyebrow>More Mechanics</Eyebrow>
                <h2 className="mt-2 font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#14171A]">
                  Explore other interactive campaign mechanics
                </h2>
              </div>
              <Link
                to="/interactive-campaigns"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider transition-colors hover:brightness-110"
                style={{ color: CORAL }}
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollStaggerContainer
            staggerDelay={0.05}
            className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {others.slice(0, 3).map((c) => (
              <ScrollStaggerItem key={c.slug} distance={12}>
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
