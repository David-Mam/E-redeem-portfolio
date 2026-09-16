import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, LineChart, Trophy, ArrowRight, CheckCircle2, Play } from "lucide-react";

import { CORAL, LIME, features, brands, campaigns, useCases, caseStudies } from "../lib/site-data";
import {
  Eyebrow,
  CampaignCard,
  UseCaseCard,
  CaseStudyCard,
  ChannelChips,
} from "../components/site-sections";
import {
  ScrollSection,
  ScrollReveal,
  ScrollStaggerContainer,
  ScrollStaggerItem,
  ScrollScale,
  ScrollCounter,
} from "../components/scroll-animations";
import { HeroBackground } from "../components/hero-background";
import { Typewriter } from "../components/typewriter";
import {
  heroContainerVariants,
  heroChildVariants,
  whileTapButton,
  reducedMotionVariants,
} from "../lib/motion-tokens";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <SocialProof />
      <FeatureGrid />
      <CampaignsTeaser />
      <UseCasesTeaser />
      <ContactTeaser />
      <CaseStudiesTeaser />
      <BottomCTA />
    </>
  );
}

/* ---------------- HERO (Initial Load Staggered Sequence) ---------------- */

function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-[#14171A] overflow-hidden border-b border-[#E4E7E9]">
      {/* Background Media Layer */}
      <HeroBackground />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:items-center lg:px-8 lg:py-20">
        {/* Left Hero Content Sequence - Animates on Initial Load */}
        <motion.div
          className="flex flex-col justify-center lg:col-span-6 xl:col-span-7"
          variants={prefersReducedMotion ? reducedMotionVariants : heroContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={prefersReducedMotion ? reducedMotionVariants : heroChildVariants}
            className="inline-flex w-fit items-center gap-2 rounded-[4px] bg-white/10 border border-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs backdrop-blur-xs"
          >
            <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: LIME }} />
            Gen-AI Consumer Engagement Platform
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={prefersReducedMotion ? reducedMotionVariants : heroChildVariants}
            className="mt-6 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-5xl drop-shadow-sm"
          >
            <span className="block">
              Unlocking{" "}
              <Typewriter
                words={[
                  "Instant Rewards",
                  "Smart Redemptions",
                  "Customer Retention",
                ]}
                cursorColor={LIME}
              />
            </span>
            <span className="block mt-1 sm:mt-2">
              with <span style={{ color: CORAL }}>E-Redeem</span>
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={prefersReducedMotion ? reducedMotionVariants : heroChildVariants}
            className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-slate-200"
          >
            Engage, Reward &amp; Grow. Build digitalized, efficient, and authentic marketing
            campaigns.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={prefersReducedMotion ? reducedMotionVariants : heroChildVariants}
            className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
          >
            <motion.div whileTap={whileTapButton} className="w-full sm:w-auto">
              <Link
                to="/contacts"
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-[8px] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all hover:brightness-105 active:scale-[0.985]"
                style={{ background: CORAL }}
              >
                Launch a Campaign
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>

            <motion.div whileTap={whileTapButton} className="w-full sm:w-auto">
              <Link
                id="hero-simulate-mechanic-btn"
                to="/interactive-campaigns"
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-[8px] border border-white/25 bg-white/10 px-6 py-3 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-white/20 text-white shadow-xs backdrop-blur-xs"
              >
                <Play className="h-3.5 w-3.5 fill-current text-white" />
                Simulate a Mechanic
              </Link>
            </motion.div>
          </motion.div>

          {/* Value Badges */}
          <motion.div
            variants={prefersReducedMotion ? reducedMotionVariants : heroChildVariants}
            className="mt-8 flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-2.5 text-xs font-bold uppercase tracking-wider text-slate-300"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" style={{ color: LIME }} /> Fraud-proof
            </span>
            <span className="flex items-center gap-2">
              <LineChart className="h-4 w-4" style={{ color: LIME }} /> Real-time
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" style={{ color: LIME }} /> Compliant
            </span>
          </motion.div>
        </motion.div>

        {/* Live Operations Telemetry Dashboard Mockup */}
        <div className="flex items-center justify-center lg:col-span-6 xl:col-span-5">
          <ScrollScale
            fromScale={0.97}
            duration={0.35}
            delay={0.08}
            className="w-full max-w-xl rounded-[12px] border border-white/20 bg-white p-5 sm:p-6 shadow-panel relative overflow-hidden text-[#14171A]"
          >
            {/* Top telemetry status bar */}
            <div className="mb-4 flex items-center justify-between border-b border-[#E4E7E9] pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                <span className="ml-1 text-[10px] font-bold uppercase tracking-wider text-[#5B6470]">
                  Operations Console
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-[4px] bg-[#F7F8F5] border border-[#E4E7E9] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#14171A]">
                <span
                  className="inline-block h-2 w-2 rounded-full animate-pulse"
                  style={{ background: LIME }}
                />
                E-Redeem · Live
              </div>
            </div>

            {/* 4 KPI Metrics */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {[
                { k: "Entries", val: 3993, raw: "3,993" },
                { k: "Unique", val: 1276, raw: "1,276" },
                { k: "Winners", val: 495, raw: "495" },
                { k: "Conv.", suffix: "%", val: 3.59, raw: "3.59%" },
              ].map((s) => (
                <div key={s.k} className="rounded-[6px] border border-[#E4E7E9] p-3 bg-[#F7F8F5]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#5B6470]">
                    {s.k}
                  </div>
                  <div className="mt-1 font-display text-lg sm:text-xl font-semibold text-[#14171A]">
                    {typeof s.val === "number" && Number.isInteger(s.val) ? (
                      <ScrollCounter target={s.val} duration={0.6} />
                    ) : (
                      s.raw
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Revenue vs Target Chart */}
            <div className="mt-3.5 rounded-[8px] border border-[#E4E7E9] p-3.5 bg-white shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#14171A] font-display">Revenue vs Target</div>
                <div className="flex gap-3 text-[10px] font-bold uppercase tracking-wider text-[#5B6470]">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: CORAL }} />
                    Revenue
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#14171A]" /> Target
                  </span>
                </div>
              </div>
              <div className="mt-3 flex h-20 items-end gap-1.5 border-b border-[#E4E7E9] pb-1">
                {[
                  [55, 45],
                  [62, 50],
                  [70, 58],
                  [65, 62],
                  [78, 68],
                  [85, 72],
                  [92, 80],
                ].map(([a, b], i) => (
                  <div key={i} className="flex flex-1 items-end gap-1 group">
                    <div
                      className="flex-1 rounded-t-[2px] transition-all duration-150 group-hover:brightness-105"
                      style={{ height: `${a}%`, background: CORAL }}
                    />
                    <div
                      className="flex-1 rounded-t-[2px] bg-[#14171A] transition-all duration-150"
                      style={{ height: `${b}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Real-Time Winner Verification Strip */}
            <div className="mt-3 flex items-center justify-between rounded-[8px] bg-[#F7F8F5] border border-[#E4E7E9] p-3">
              <div className="flex items-center gap-2.5">
                <span
                  className="grid h-8 w-8 place-items-center rounded-[6px] shadow-2xs shrink-0"
                  style={{ background: LIME }}
                >
                  <Trophy className="h-4 w-4 text-[#14171A]" />
                </span>
                <div>
                  <div className="text-xs font-bold text-[#14171A]">
                    Winner Verified · WCI Entry #900
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-[#5B6470] font-medium">
                    ₦2,000 Airtime dispatched
                  </div>
                </div>
              </div>
              <span
                className="rounded-[4px] px-2 py-0.5 text-[10px] font-bold text-[#14171A] shadow-2xs uppercase tracking-wider shrink-0"
                style={{ background: LIME }}
              >
                LIVE
              </span>
            </div>
          </ScrollScale>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SOCIAL PROOF (Scroll Reveal) ---------------- */

function SocialProof() {
  return (
    <ScrollSection className="border-b border-[#E4E7E9] bg-[#F7F8F5]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ScrollReveal direction="none" duration={0.2}>
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-[#5B6470]">
            Deployed for leading consumer brands
          </p>
        </ScrollReveal>
        <ScrollStaggerContainer
          staggerDelay={0.04}
          className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 sm:gap-x-14"
        >
          {brands.map((b) => (
            <ScrollStaggerItem key={b} distance={6}>
              <span className="text-sm sm:text-base font-black tracking-[0.2em] text-[#5B6470]/70 grayscale transition-colors duration-150 hover:text-[#14171A] inline-block cursor-default">
                {b}
              </span>
            </ScrollStaggerItem>
          ))}
        </ScrollStaggerContainer>
      </div>
    </ScrollSection>
  );
}

/* ---------------- FEATURE GRID (Asymmetric Bento Composition) ---------------- */

function FeatureGrid() {
  const F0Icon = features[0].icon;
  const F1Icon = features[1].icon;
  const F2Icon = features[2].icon;
  const F3Icon = features[3].icon;
  const F4Icon = features[4].icon;
  const F5Icon = features[5].icon;

  return (
    <ScrollSection className="bg-white relative overflow-hidden border-b border-[#E4E7E9]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <ScrollReveal direction="up" distance={12} className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>Why E-Redeem</Eyebrow>
          </div>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#14171A]">
            A loyalty platform built for category leaders.
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#5B6470]">
            Fraud-proof mechanics, real-time visibility and end-to-end reward fulfilment — in one
            platform.
          </p>
        </ScrollReveal>

        <ScrollStaggerContainer
          staggerDelay={0.06}
          className="mt-12 grid gap-5 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Bento Tile 1 (Featured Hero Tile: WCI Engine) */}
          <ScrollStaggerItem distance={12} className="md:col-span-2 lg:col-span-2">
            <div className="group relative overflow-hidden h-full rounded-[12px] border border-[#E4E7E9] bg-[#F7F8F5] p-6 sm:p-8 transition-all duration-200 hover:border-[#CBD0D6] hover:shadow-card">
              <div className="flex items-center justify-between">
                <span
                  className="grid h-10 w-10 place-items-center rounded-[8px] shadow-xs shrink-0"
                  style={{ background: LIME }}
                >
                  <F0Icon className="h-5 w-5 text-[#14171A]" />
                </span>
                <span className="rounded-[4px] bg-white border border-[#E4E7E9] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#5B6470]">
                  Core Differentiator
                </span>
              </div>
              <div className="mt-5">
                <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-[#14171A] group-hover:text-coral transition-colors">
                  {features[0].title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5B6470] max-w-2xl">
                  {features[0].desc}
                </p>
              </div>
            </div>
          </ScrollStaggerItem>

          {/* Bento Tile 2: Multi-Channel */}
          <ScrollStaggerItem distance={12} className="md:col-span-1 lg:col-span-1">
            <div className="group relative overflow-hidden h-full rounded-[12px] border border-[#E4E7E9] bg-white p-6 transition-all duration-200 hover:border-[#CBD0D6] hover:shadow-card">
              <div className="flex items-center justify-between">
                <span
                  className="grid h-10 w-10 place-items-center rounded-[8px] shadow-xs"
                  style={{ background: `${LIME}33` }}
                >
                  <F1Icon className="h-5 w-5 text-[#14171A]" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B6470]">
                  Universal
                </span>
              </div>
              <h3 className="mt-5 font-display text-base font-semibold tracking-tight text-[#14171A] group-hover:text-coral transition-colors">
                {features[1].title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5B6470]">{features[1].desc}</p>
            </div>
          </ScrollStaggerItem>

          {/* Bento Tile 3: Real-Time Analytics */}
          <ScrollStaggerItem distance={12} className="md:col-span-1 lg:col-span-1">
            <div className="group relative overflow-hidden h-full rounded-[12px] border border-[#E4E7E9] bg-white p-6 transition-all duration-200 hover:border-[#CBD0D6] hover:shadow-card">
              <div className="flex items-center justify-between">
                <span
                  className="grid h-10 w-10 place-items-center rounded-[8px] shadow-xs"
                  style={{ background: `${LIME}33` }}
                >
                  <F2Icon className="h-5 w-5 text-[#14171A]" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B6470]">
                  Live KPIs
                </span>
              </div>
              <h3 className="mt-5 font-display text-base font-semibold tracking-tight text-[#14171A] group-hover:text-coral transition-colors">
                {features[2].title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5B6470]">{features[2].desc}</p>
            </div>
          </ScrollStaggerItem>

          {/* Bento Tile 4: Automated Reward Fulfilment */}
          <ScrollStaggerItem distance={12} className="md:col-span-1 lg:col-span-1">
            <div className="group relative overflow-hidden h-full rounded-[12px] border border-[#E4E7E9] bg-white p-6 transition-all duration-200 hover:border-[#CBD0D6] hover:shadow-card">
              <div className="flex items-center justify-between">
                <span
                  className="grid h-10 w-10 place-items-center rounded-[8px] shadow-xs"
                  style={{ background: `${CORAL}14` }}
                >
                  <F3Icon className="h-5 w-5" style={{ color: CORAL }} />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B6470]">
                  Instant
                </span>
              </div>
              <h3 className="mt-5 font-display text-base font-semibold tracking-tight text-[#14171A] group-hover:text-coral transition-colors">
                {features[3].title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5B6470]">{features[3].desc}</p>
            </div>
          </ScrollStaggerItem>

          {/* Bento Tile 5: Enterprise Compliance & SLA */}
          <ScrollStaggerItem distance={12} className="md:col-span-1 lg:col-span-1">
            <div className="group relative overflow-hidden h-full rounded-[12px] border border-[#E4E7E9] bg-white p-6 transition-all duration-200 hover:border-[#CBD0D6] hover:shadow-card">
              <div className="flex items-center justify-between">
                <span
                  className="grid h-10 w-10 place-items-center rounded-[8px] shadow-xs"
                  style={{ background: `${LIME}33` }}
                >
                  <F4Icon className="h-5 w-5 text-[#14171A]" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B6470]">
                  Verified
                </span>
              </div>
              <h3 className="mt-5 font-display text-base font-semibold tracking-tight text-[#14171A] group-hover:text-coral transition-colors">
                {features[4].title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5B6470]">{features[4].desc}</p>
            </div>
          </ScrollStaggerItem>

          {/* Bento Tile 6: In-Store & Interactive Screens */}
          <ScrollStaggerItem distance={12} className="md:col-span-2 lg:col-span-3">
            <div className="group relative overflow-hidden rounded-[12px] border border-[#E4E7E9] bg-[#14171A] text-white p-6 sm:p-7 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <span
                    className="grid h-10 w-10 place-items-center rounded-[8px] shrink-0"
                    style={{ background: LIME }}
                  >
                    <F5Icon className="h-5 w-5 text-[#14171A]" />
                  </span>
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-semibold tracking-tight text-white">
                      {features[5].title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-300 max-w-2xl">{features[5].desc}</p>
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <span className="rounded-[4px] bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    Touch &bull; QR &bull; Motion
                  </span>
                </div>
              </div>
            </div>
          </ScrollStaggerItem>
        </ScrollStaggerContainer>
      </div>
    </ScrollSection>
  );
}

/* ---------------- TEASER: shared heading ---------------- */

function TeaserHeading({
  eyebrow,
  title,
  body,
  to,
  cta,
}: {
  eyebrow: string;
  title: string;
  body: string;
  to: string;
  cta: string;
}) {
  return (
    <ScrollReveal
      direction="up"
      distance={12}
      className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
    >
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#14171A]">
          {title}
        </h2>
        <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#5B6470]">{body}</p>
      </div>
      <Link
        to={to}
        className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors hover:brightness-110"
        style={{ color: CORAL }}
      >
        {cta}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </ScrollReveal>
  );
}

/* ---------------- TEASER: campaigns ---------------- */

function CampaignsTeaser() {
  return (
    <ScrollSection className="border-b border-[#E4E7E9] bg-[#F7F8F5]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <TeaserHeading
          eyebrow="Interactive Campaigns"
          title="Campaign mechanics for every objective."
          body="From instant-win short codes to polls, votes, surveys and quizzes — deployed across every channel your consumers use."
          to="/interactive-campaigns"
          cta="View all mechanics"
        />
        <ScrollReveal direction="up" distance={8} delay={0.05} className="mt-5">
          <ChannelChips />
        </ScrollReveal>
        <ScrollStaggerContainer
          staggerDelay={0.05}
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {campaigns.map((c) => (
            <ScrollStaggerItem key={c.slug} distance={12}>
              <CampaignCard campaign={c} />
            </ScrollStaggerItem>
          ))}
        </ScrollStaggerContainer>
      </div>
    </ScrollSection>
  );
}

/* ---------------- TEASER: use cases ---------------- */

function UseCasesTeaser() {
  return (
    <ScrollSection className="bg-white border-b border-[#E4E7E9]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <TeaserHeading
          eyebrow="Use Cases"
          title="Three ways brands deploy E-Redeem."
          body="Drive footfall to an activation, grow basket size at the till, or nurture a specific segment — there's a mechanic for each."
          to="/use-cases"
          cta="Explore use cases"
        />
        <ScrollStaggerContainer staggerDelay={0.06} className="mt-8 grid gap-5 md:grid-cols-3">
          {useCases.map((u) => (
            <ScrollStaggerItem key={u.title} distance={12}>
              <UseCaseCard useCase={u} />
            </ScrollStaggerItem>
          ))}
        </ScrollStaggerContainer>
      </div>
    </ScrollSection>
  );
}

/* ---------------- TEASER: contact ---------------- */

function ContactTeaser() {
  return (
    <ScrollSection className="border-b border-[#E4E7E9] bg-[#F7F8F5]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ScrollReveal
          direction="up"
          distance={12}
          className="flex flex-col items-start gap-6 rounded-[12px] border border-[#E4E7E9] bg-white p-7 sm:p-9 sm:flex-row sm:items-center sm:justify-between shadow-xs"
        >
          <div className="max-w-2xl">
            <Eyebrow>Contacts</Eyebrow>
            <h2 className="mt-3 font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#14171A]">
              Ready to talk through your next campaign?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5B6470]">
              Reach the E-Redeem team for consumer engagement, reward and loyalty programmes.
            </p>
          </div>
          <motion.div whileTap={whileTapButton} className="shrink-0 w-full sm:w-auto">
            <Link
              to="/contacts"
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-[8px] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all hover:brightness-105"
              style={{ background: CORAL }}
            >
              Get in touch
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </ScrollReveal>
      </div>
    </ScrollSection>
  );
}

/* ---------------- TEASER: case studies ---------------- */

function CaseStudiesTeaser() {
  return (
    <ScrollSection className="border-b border-[#E4E7E9] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <TeaserHeading
          eyebrow="Case Studies"
          title="Proven campaigns for household brands."
          body="Eight years of consumer engagement expertise — deployed for FMCG, spirits and telco category leaders across Nigeria."
          to="/case-studies"
          cta="See case studies"
        />
        <ScrollStaggerContainer staggerDelay={0.06} className="mt-8 grid gap-5 md:grid-cols-3">
          {caseStudies.map((c) => (
            <ScrollStaggerItem key={c.brand} distance={12}>
              <CaseStudyCard caseStudy={c} />
            </ScrollStaggerItem>
          ))}
        </ScrollStaggerContainer>
      </div>
    </ScrollSection>
  );
}

/* ---------------- BOTTOM CTA ---------------- */

function BottomCTA() {
  return (
    <ScrollSection className="bg-[#14171A] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <ScrollReveal direction="up" distance={12} duration={0.25}>
          <h2 className="mx-auto max-w-3xl font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
            Ready to launch a fraud-proof, Gen-AI powered campaign?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            Talk to the E-Redeem team about your next consumer engagement, reward or loyalty
            programme.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3">
            <motion.div whileTap={whileTapButton} className="w-full sm:w-auto">
              <Link
                to="/contacts"
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-[8px] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#14171A] shadow-xs transition-all hover:brightness-105 active:scale-[0.985]"
                style={{ background: LIME }}
              >
                Launch a Campaign
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
            <motion.a
              whileTap={whileTapButton}
              href="mailto:abamgbala@excitepanacea.com"
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-[8px] border border-white/20 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
            >
              Email the team
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </ScrollSection>
  );
}
