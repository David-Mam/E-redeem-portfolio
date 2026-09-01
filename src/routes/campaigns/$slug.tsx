import { useState } from "react";
import { createFileRoute, Link, notFound, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Zap, X, AlertCircle, RotateCcw } from "lucide-react";

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
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
          <p className="mt-4 text-sm font-semibold text-slate-300">
            Loading campaign...
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
}: {
  campaign: ClientCampaign;
  allCampaigns: ClientCampaign[];
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const { currentStepId, state, submitCode, failCode, restartFlow } = useCampaignFlow();

  const [heroInputCode, setHeroInputCode] = useState(state.enteredCode || "");
  const [heroInputError, setHeroInputError] = useState<string | null>(null);
  const [isSubmittingHeroCode, setIsSubmittingHeroCode] = useState(false);

  const fallbackBanner =
    "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1600&q=80";

  // Check if user is currently inside an active step flow (activity, kyc, requirement, result)
  const isInsideActiveStep =
    location.pathname.endsWith("/activity") ||
    location.pathname.endsWith("/kyc") ||
    location.pathname.endsWith("/requirement") ||
    location.pathname.endsWith("/result");

  const handleHeroCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = heroInputCode.trim().toUpperCase();

    if (!cleanCode) {
      setHeroInputError("Please enter your promotional code.");
      return;
    }

    setIsSubmittingHeroCode(true);
    setHeroInputError(null);

    setTimeout(() => {
      setIsSubmittingHeroCode(false);
      if (cleanCode === "EXPIRED" || cleanCode === "INVALID" || cleanCode === "USED") {
        setHeroInputError(
          `Code "${cleanCode}" is invalid or expired. Try a sample valid code.`,
        );
        failCode?.(`Code "${cleanCode}" is invalid`);
        return;
      }

      if (cleanCode.length >= 4) {
        submitCode(cleanCode);
      } else {
        setHeroInputError("Codes must be at least 4 alphanumeric characters.");
      }
    }, 350);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-slate-950 font-sans text-white select-none">
      {/* 1. Full-Screen Photographic Banner Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={campaign.bannerUrl || fallbackBanner}
          alt={`${campaign.campaignName} Background`}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center filter brightness-[0.85] contrast-[1.05]"
        />
        {/* Cinematic Dark Scrim Overlay */}
        <div className="absolute inset-0 bg-black/60 sm:bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/70" />
      </div>

      {/* 2. Top Header Bar: Company Logo (Top Left) & Close Exit Button */}
      <header className="relative z-20 flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8">
        {/* Top-Left Company Logo(s) & Brand Badge */}
        <div className="flex items-center gap-3">
          <span
            className="flex items-center gap-1.5 rounded-[6px] px-3 py-1.5 font-display text-sm font-black uppercase tracking-wider text-white shadow-lg"
            style={{ backgroundColor: campaign.theme.primary || "#E11D48" }}
          >
            {campaign.logoText}
          </span>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-extrabold tracking-tight text-white drop-shadow-sm">
              {campaign.clientName}
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-slate-300 uppercase">
              Official Sponsor &bull; E-Redeem
            </span>
          </div>
        </div>

        {/* Top Close (×) Exit Button to return to all campaigns */}
        <Link
          to="/campaigns"
          className="group grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-black/40 hover:bg-black/70 border border-white/25 backdrop-blur-md text-white transition-all shadow-lg active:scale-95"
          title="Exit Campaign"
        >
          <X className="h-5 w-5 transition-transform group-hover:scale-110" />
        </Link>
      </header>

      {/* 3. Main Center Content: Massive Headline, Subhead, and Rounded-Full Pill Input Bar */}
      <main className="relative z-10 mx-auto max-w-4xl px-4 text-center my-auto py-6 sm:py-10">
        {!isInsideActiveStep ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Big 3-Line Bold Headline */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow-lg uppercase leading-[1.08]">
                WIN{" "}
                {campaign.rewardType === "airtime"
                  ? "Free Airtime & Data"
                  : campaign.rewardType === "cash"
                    ? "Instant Cash Grants"
                    : "Exclusive Brand Prizes"}{" "}
                At
              </h1>
              <div className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight drop-shadow-lg uppercase text-[#22C55E] leading-[1.08]">
                {campaign.clientName}
              </div>
              <div className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight drop-shadow-lg uppercase text-[#FACC15] leading-[1.08]">
                2026
              </div>
            </div>

            {/* Subhead / Instructions */}
            <p className="mx-auto max-w-2xl text-sm sm:text-lg font-medium text-slate-100 drop-shadow-md leading-relaxed">
              {campaign.formType === "code"
                ? "Scan the QR code, Input your on-pack promo code and stand a chance to win instant rewards."
                : campaign.tagline}
            </p>

            {/* Rounded-Full Pill Bar: Input + Redeem Button Inside */}
            <form
              onSubmit={handleHeroCodeSubmit}
              className="mx-auto mt-6 sm:mt-8 max-w-xl"
            >
              <div className="flex items-center rounded-full bg-white p-1.5 sm:p-2 shadow-2xl border border-white/40 backdrop-blur-xs">
                <input
                  type="text"
                  value={heroInputCode}
                  onChange={(e) => {
                    setHeroInputCode(e.target.value);
                    if (heroInputError) setHeroInputError(null);
                  }}
                  placeholder={
                    campaign.formType === "code"
                      ? "Enter your 8-digit code"
                      : "Enter your phone number or code"
                  }
                  className="flex-1 rounded-full px-4 sm:px-6 py-2.5 sm:py-3.5 text-slate-900 font-bold placeholder:text-slate-400 bg-transparent text-sm sm:text-base font-mono uppercase focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={isSubmittingHeroCode}
                  className="cursor-pointer inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full px-6 sm:px-8 py-2.5 sm:py-3.5 font-black uppercase tracking-wider text-slate-950 text-xs sm:text-sm shadow-md transition-all hover:brightness-105 active:scale-95 shrink-0"
                  style={{
                    backgroundColor: campaign.theme.secondary || "#E8C288",
                  }}
                >
                  <Zap className="h-4 w-4 fill-current text-slate-950" />
                  <span>{isSubmittingHeroCode ? "Checking..." : "Redeem"}</span>
                </button>
              </div>

              {/* Error Message */}
              {heroInputError && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-rose-600/90 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-white shadow-lg"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{heroInputError}</span>
                </motion.div>
              )}

              {/* Quick Sample Code Chips */}
              {campaign.sampleValidCodes && campaign.sampleValidCodes.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-white/80">
                  <span className="font-semibold drop-shadow-sm">Demo Codes:</span>
                  {campaign.sampleValidCodes.map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => {
                        setHeroInputCode(code);
                        if (heroInputError) setHeroInputError(null);
                      }}
                      className="cursor-pointer rounded-full bg-black/40 hover:bg-black/60 border border-white/20 px-3 py-1 font-mono text-[11px] font-bold text-[#FACC15] backdrop-blur-sm transition-all hover:border-amber-400"
                    >
                      {code}
                    </button>
                  ))}
                </div>
              )}
            </form>
          </motion.div>
        ) : (
          /* When in active activity flow (Quiz, Wheel, KYC, Result), render inside a clean frosted modal */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-3xl rounded-[28px] border border-white/20 bg-black/75 backdrop-blur-xl p-5 sm:p-8 shadow-2xl space-y-6 text-left"
            style={{ borderColor: campaign.theme.border || "rgba(255,255,255,0.2)" }}
          >
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div>
                <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white">
                  {campaign.campaignName}
                </h2>
                <div className="text-xs text-slate-300 mt-0.5">
                  {campaign.rewardSummary}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={restartFlow}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-white/10 hover:bg-white/20 px-3 py-1 text-[11px] font-bold text-white transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  Restart
                </button>
                <button
                  onClick={() => navigate({ to: "/campaigns/$slug", params: { slug: campaign.slug } })}
                  className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Close step"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto pb-2 -mx-1 px-1">
              <CampaignFlowStepper campaign={campaign} currentStep={currentStepId} />
            </div>

            <main className="w-full pt-1 overflow-hidden">
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
          </motion.div>
        )}
      </main>

      {/* 4. Bottom Footer Note: Terms and Condition Apply */}
      <footer className="relative z-10 py-5 text-center text-xs font-semibold text-white/70 drop-shadow-sm">
        Terms and Condition Apply
      </footer>
    </div>
  );
}
