import { createFileRoute, Link, notFound, Outlet, useLocation } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, CheckCircle2, Sparkles, RotateCcw } from "lucide-react";

import {
  fetchClientCampaignBySlug,
  fetchClientCampaigns,
  type ClientCampaign,
} from "../../lib/client-campaigns-data";
import { CampaignFlowStepper } from "../../components/client-campaign-flow/CampaignFlowStepper";
import {
  CampaignFlowProvider,
  useCampaignFlow,
} from "../../components/client-campaign-flow/CampaignFlowContext";
import {
  stepSlideVariants,
  reducedMotionVariants,
  whileTapButton,
  whileHoverCard,
} from "../../lib/motion-tokens";

export const Route = createFileRoute("/campaigns/$slug")({
  loader: async ({ params }) => {
    const campaign = await fetchClientCampaignBySlug(params.slug);
    if (!campaign) throw notFound();
    return { campaign };
  },
  component: ClientCampaignLayout,
});

function ClientCampaignLayout() {
  const { slug } = Route.useParams();

  const { data: campaign, isLoading } = useQuery({
    queryKey: ["client-campaign", slug],
    queryFn: () => fetchClientCampaignBySlug(slug),
  });

  const { data: allCampaigns = [] } = useQuery({
    queryKey: ["client-campaigns"],
    queryFn: fetchClientCampaigns,
  });

  if (isLoading || !campaign) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-900 text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-emerald-400 border-t-transparent" />
          <p className="mt-4 text-sm font-semibold text-slate-300">
            Loading client campaign environment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <CampaignFlowProvider campaign={campaign}>
      <CampaignContent campaign={campaign} allCampaigns={allCampaigns} />
    </CampaignFlowProvider>
  );
}

function CampaignContent({
  campaign,
  allCampaigns,
}: {
  campaign: ClientCampaign;
  allCampaigns: ClientCampaign[];
}) {
  const theme = campaign.theme;
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const { currentStepId, restartFlow } = useCampaignFlow();
  const otherCampaigns = allCampaigns.filter((c) => c.slug !== campaign.slug).slice(0, 3);

  return (
    <div
      className="min-h-screen font-sans text-slate-100 transition-colors selection:bg-amber-400 selection:text-slate-950 overflow-hidden py-8 sm:py-12 px-3 sm:px-6"
      style={{
        backgroundColor: theme.background,
        color: theme.text,
      }}
    >
      {/* Top Announcement & Back Navigation */}
      <div className="mx-auto max-w-4xl mb-6 flex flex-wrap items-center justify-between gap-3 text-xs font-bold sm:px-2">
        <Link
          to="/campaigns"
          className="inline-flex items-center gap-1.5 font-bold opacity-85 transition-opacity hover:opacity-100"
          style={{ color: theme.textMuted }}
        >
          ← Back to All Client Campaigns
        </Link>

        <div className="flex items-center gap-3">
          <span
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider"
            style={{
              backgroundColor: theme.badgeBg,
              color: theme.badgeText,
            }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
            {campaign.status}
          </span>
          <button
            onClick={restartFlow}
            className="inline-flex cursor-pointer items-center gap-1 text-[11px] underline opacity-85 transition-opacity hover:opacity-100"
            style={{ color: theme.secondary }}
          >
            <RotateCcw className="h-3 w-3" />
            Restart Flow
          </button>
        </div>
      </div>

      {/* Main Structural Capsule Frame */}
      <div
        id="client-campaign-editorial-frame"
        className="mx-auto max-w-4xl rounded-[36px] sm:rounded-[44px] border shadow-2xl overflow-hidden p-6 sm:p-9 space-y-8"
        style={{
          backgroundColor: theme.surface,
          borderColor: theme.border,
          color: theme.text,
        }}
      >
        {/* 1. Header Bar inside Frame */}
        <div
          className="flex items-center justify-between border-b pb-4 text-xs font-bold"
          style={{ borderColor: theme.border }}
        >
          <div className="flex items-center gap-2">
            <span
              className="rounded px-2.5 py-1 text-[11px] font-black uppercase tracking-wider"
              style={{ backgroundColor: theme.primary, color: "#FFFFFF" }}
            >
              {campaign.logoText}
            </span>
            <span className="text-xs font-bold tracking-tight">{campaign.clientName}</span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider border"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.cardBg,
                color: theme.secondary,
              }}
            >
              {campaign.heroBadge}
            </span>
            <span
              className="rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider"
              style={{
                backgroundColor: theme.primary,
                color: "#FFFFFF",
              }}
            >
              {campaign.mechanicLabel}
            </span>
          </div>
        </div>

        {/* 2. Top Arch Aperture & Hero Headline */}
        <div className="text-center pt-2">
          <div
            className="relative mx-auto flex h-24 w-36 items-center justify-center overflow-hidden rounded-t-full rounded-b-2xl border p-2 shadow-inner"
            style={{
              borderColor: theme.border,
              background: `linear-gradient(180deg, ${theme.gradientFrom} 0%, ${theme.gradientTo} 100%)`,
            }}
          >
            <span className="text-lg font-black tracking-wider uppercase text-white shadow-xs">
              {campaign.logoText}
            </span>
          </div>

          <div
            className="mt-5 text-[11px] font-bold uppercase tracking-[0.22em] opacity-75"
            style={{ color: theme.secondary }}
          >
            {campaign.formType === "code" ? "On-Pack Code Entry" : "Open Public Access"}
          </div>

          <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {campaign.campaignName}
          </h1>

          <p
            className="mx-auto mt-3 max-w-2xl text-sm sm:text-base font-normal leading-relaxed"
            style={{ color: theme.textMuted }}
          >
            {campaign.tagline}
          </p>

          {/* Quick Metrics Bar inside Frame */}
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4 text-left">
            <div
              className="rounded-[16px] border p-3"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.border,
              }}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                Prize Value
              </div>
              <div className="mt-0.5 font-display text-sm font-bold text-amber-300 sm:text-base">
                {campaign.rewardValue}
              </div>
            </div>

            <div
              className="rounded-[16px] border p-3"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.border,
              }}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                Live Participation
              </div>
              <div className="mt-0.5 font-display text-sm font-bold sm:text-base">
                {campaign.participantsCount}
              </div>
            </div>

            <div
              className="rounded-[16px] border p-3"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.border,
              }}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                Reward Type
              </div>
              <div className="mt-0.5 font-display text-sm font-bold capitalize sm:text-base">
                {campaign.rewardType.replace("-", " ")}
              </div>
            </div>

            <div
              className="rounded-[16px] border p-3"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.border,
              }}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                Fulfillment
              </div>
              <div className="mt-0.5 font-display text-sm font-bold text-emerald-300 sm:text-base">
                Instant Automated
              </div>
            </div>
          </div>
        </div>

        {/* 3. Multi-Step Stepper & Dynamic Step Content inside Rounded Container */}
        <div
          className="rounded-[28px] border p-6 sm:p-7 shadow-lg space-y-6"
          style={{
            backgroundColor: theme.cardBg,
            borderColor: theme.border,
          }}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base sm:text-lg font-bold tracking-tight">
              Campaign Participation Flow
            </h2>
            <span
              className="rounded-full border px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.surface,
                color: theme.secondary,
              }}
            >
              Step-by-Step Route Architecture
            </span>
          </div>

          <CampaignFlowStepper campaign={campaign} currentStep={currentStepId} />

          {/* Dynamic Step Content from Nested Route Outlet with AnimatePresence */}
          <main className="w-full pt-2 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={prefersReducedMotion ? reducedMotionVariants : stepSlideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* 4. Highlights & Compliance Bento Blocks */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div
            className="space-y-4 rounded-[24px] border p-6 shadow-sm"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.border,
            }}
            id="campaign-highlights-box"
          >
            <div className="flex items-center gap-3">
              <div
                className="rounded-xl p-2.5 text-white shadow-xs"
                style={{ backgroundColor: theme.primary }}
              >
                <Sparkles className="h-4 w-4" />
              </div>
              <h3 className="font-display text-base font-bold">Campaign Highlights &amp; Engine</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm" style={{ color: theme.textMuted }}>
              {campaign.points.map((point: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: theme.secondary }}
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="space-y-4 rounded-[24px] border p-6 shadow-sm"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.border,
            }}
            id="campaign-terms-box"
          >
            <div className="flex items-center gap-3">
              <div
                className="rounded-xl p-2.5 text-white shadow-xs"
                style={{ backgroundColor: theme.primary }}
              >
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h3 className="font-display text-base font-bold">
                Terms, Eligibility &amp; Compliance
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm" style={{ color: theme.textMuted }}>
              {campaign.terms.map((term: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: theme.secondary }}
                  />
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 5. Footer Card inside Frame */}
        <div
          className="rounded-[24px] border p-6 text-center shadow-md space-y-2"
          style={{
            backgroundColor: theme.cardBg,
            borderColor: theme.border,
          }}
        >
          <div className="text-xs font-black tracking-widest uppercase">
            {campaign.clientName} &bull; POWERED BY E-REDEEM
          </div>
          <p className="text-xs opacity-75" style={{ color: theme.textMuted }}>
            100% fraud-proof Winning Code Iteration (WCI) cryptographic allocation engine.
          </p>
          <div className="pt-2">
            <motion.button
              whileTap={whileTapButton}
              onClick={restartFlow}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors hover:brightness-110"
              style={{ backgroundColor: theme.primary }}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Restart Demonstration
            </motion.button>
          </div>
        </div>

        {/* 6. Explore Other Live Client Campaigns */}
        {otherCampaigns.length > 0 && (
          <div className="space-y-4 border-t pt-6" style={{ borderColor: theme.border }}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span
                  className="rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                  style={{
                    backgroundColor: theme.cardBg,
                    color: theme.secondary,
                  }}
                >
                  More Deployments
                </span>
                <h3 className="mt-1 font-display text-lg font-bold tracking-tight">
                  Explore Other Live Brand Campaigns
                </h3>
              </div>
              <Link
                to="/campaigns"
                className="inline-flex items-center gap-1.5 text-xs font-bold opacity-90 transition-opacity hover:opacity-100"
                style={{ color: theme.secondary }}
              >
                View all client campaigns <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {otherCampaigns.map((other: ClientCampaign) => (
                <motion.div key={other.id} whileHover={whileHoverCard} className="h-full">
                  <Link
                    to="/campaigns/$slug"
                    params={{ slug: other.slug }}
                    className="group block h-full rounded-[20px] border p-4 transition-colors hover:shadow-md"
                    style={{
                      backgroundColor: other.theme.surface,
                      borderColor: other.theme.border,
                      color: other.theme.text,
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="rounded px-2 py-0.5 text-[10px] font-bold uppercase"
                        style={{
                          backgroundColor: other.theme.primary,
                          color: other.theme.secondary || "#FFFFFF",
                        }}
                      >
                        {other.logoText}
                      </span>
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                        style={{
                          backgroundColor: other.theme.badgeBg,
                          color: other.theme.badgeText,
                        }}
                      >
                        {other.status}
                      </span>
                    </div>

                    <h4 className="mt-2.5 line-clamp-1 font-display text-xs font-bold leading-tight group-hover:underline">
                      {other.campaignName}
                    </h4>
                    <p
                      className="mt-1 line-clamp-2 text-[11px]"
                      style={{ color: other.theme.textMuted }}
                    >
                      {other.tagline}
                    </p>
                    <div
                      className="mt-2.5 flex items-center justify-between border-t pt-2 text-[10px] font-bold"
                      style={{
                        borderColor: other.theme.border,
                        color: other.theme.secondary,
                      }}
                    >
                      <span>{other.mechanicLabel}</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
