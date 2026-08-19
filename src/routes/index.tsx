import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, LineChart, Trophy, ArrowRight, CheckCircle2 } from "lucide-react";

import { CORAL, LIME, features, brands, campaigns, useCases, caseStudies } from "../lib/site-data";
import {
  Eyebrow,
  CampaignCard,
  UseCaseCard,
  CaseStudyCard,
  ChannelChips,
} from "../components/site-sections";

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
      <CaseStudiesTeaser />
      <ContactTeaser />
      <BottomCTA />
    </>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: LIME }} />
            Gen-AI Consumer Engagement Platform
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Unlocking Consumer Loyalty with <span style={{ color: CORAL }}>E-Redeem</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            Engage, Reward &amp; Grow. Build digitalized, efficient, and authentic marketing
            campaigns.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contacts"
              className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md hover:brightness-110"
              style={{ background: CORAL }}
            >
              Launch a Campaign
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 rounded-md border-2 bg-white px-6 py-3 text-sm font-semibold transition-colors hover:bg-slate-50"
              style={{ borderColor: CORAL, color: CORAL }}
            >
              See Our Work
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" style={{ color: LIME }} /> Fraud-proof
            </span>
            <span className="flex items-center gap-2">
              <LineChart className="h-4 w-4" style={{ color: LIME }} /> Real-time
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" style={{ color: LIME }} /> Compliant
            </span>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                E-Redeem · Live
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { k: "Entries", v: "3,993" },
                { k: "Unique", v: "1,276" },
                { k: "Winners", v: "495" },
                { k: "Conv.", v: "3.59%" },
              ].map((s) => (
                <div key={s.k} className="rounded-lg border border-slate-200 p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    {s.k}
                  </div>
                  <div className="mt-1.5 text-xl font-bold text-slate-900">{s.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-lg border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Revenue vs Target</div>
                <div className="flex gap-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: CORAL }} />
                    Revenue
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-slate-900" /> Target
                  </span>
                </div>
              </div>
              <div className="mt-4 flex h-24 items-end gap-2">
                {[
                  [55, 45],
                  [62, 50],
                  [70, 58],
                  [65, 62],
                  [78, 68],
                  [85, 72],
                  [92, 80],
                ].map(([a, b], i) => (
                  <div key={i} className="flex flex-1 items-end gap-1">
                    <div
                      className="flex-1 rounded-t"
                      style={{ height: `${a}%`, background: CORAL }}
                    />
                    <div className="flex-1 rounded-t bg-slate-900" style={{ height: `${b}%` }} />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 p-3">
              <div className="flex items-center gap-2.5">
                <span
                  className="grid h-8 w-8 place-items-center rounded-full"
                  style={{ background: LIME }}
                >
                  <Trophy className="h-4 w-4 text-slate-900" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-slate-900">
                    Winner Verified · WCI Entry #900
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500">
                    ₦2,000 Airtime dispatched
                  </div>
                </div>
              </div>
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-bold text-slate-900"
                style={{ background: LIME }}
              >
                LIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SOCIAL PROOF ---------------- */

function SocialProof() {
  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          Deployed for leading consumer brands
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 sm:gap-x-16">
          {brands.map((b) => (
            <span
              key={b}
              className="text-lg font-black tracking-[0.2em] text-slate-400 grayscale transition-colors hover:text-slate-600"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FEATURE GRID ---------------- */

function FeatureGrid() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>Why E-Redeem</Eyebrow>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            A loyalty platform built for category leaders.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Fraud-proof mechanics, real-time visibility and end-to-end reward fulfilment — in one
            platform.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]"
            >
              <span
                className="grid h-12 w-12 place-items-center rounded-xl transition-colors"
                style={{ background: `${LIME}33` }}
              >
                <f.icon className="h-6 w-6" style={{ color: "#4d6b00" }} />
              </span>
              <h3 className="mt-6 text-lg font-bold tracking-tight text-slate-900">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
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
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-lg text-slate-600">{body}</p>
      </div>
      <Link
        to={to}
        className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold"
        style={{ color: CORAL }}
      >
        {cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

/* ---------------- TEASER: campaigns ---------------- */

function CampaignsTeaser() {
  return (
    <section className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <TeaserHeading
          eyebrow="Interactive Campaigns"
          title="Campaign mechanics for every objective."
          body="From instant-win short codes to polls, votes, surveys and quizzes — deployed across every channel your consumers use."
          to="/campaigns"
          cta="View all campaigns"
        />
        <div className="mt-6">
          <ChannelChips />
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c) => (
            <CampaignCard key={c.slug} campaign={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TEASER: use cases ---------------- */

function UseCasesTeaser() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <TeaserHeading
          eyebrow="Use Cases"
          title="Three ways brands deploy E-Redeem."
          body="Drive footfall to an activation, grow basket size at the till, or nurture a specific segment — there's a mechanic for each."
          to="/use-cases"
          cta="Explore use cases"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {useCases.map((u) => (
            <UseCaseCard key={u.title} useCase={u} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TEASER: case studies ---------------- */

function CaseStudiesTeaser() {
  return (
    <section className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <TeaserHeading
          eyebrow="Case Studies"
          title="Proven campaigns for household brands."
          body="Eight years of consumer engagement expertise — deployed for FMCG, spirits and telco category leaders across Nigeria."
          to="/case-studies"
          cta="See case studies"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {caseStudies.map((c) => (
            <CaseStudyCard key={c.brand} caseStudy={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TEASER: contact ---------------- */

function ContactTeaser() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-2xl">
            <Eyebrow>Contacts</Eyebrow>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Ready to talk through your next campaign?
            </h2>
            <p className="mt-3 text-slate-600">
              Reach the E-Redeem team for consumer engagement, reward and loyalty programmes.
            </p>
          </div>
          <Link
            to="/contacts"
            className="inline-flex shrink-0 items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md hover:brightness-110"
            style={{ background: CORAL }}
          >
            Get in touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- BOTTOM CTA ---------------- */

function BottomCTA() {
  return (
    <section className="bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Ready to launch a fraud-proof, Gen-AI powered campaign?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
          Talk to the E-Redeem team about your next consumer engagement, reward or loyalty
          programme.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/contacts"
            className="inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-bold text-slate-900 shadow-lg transition-all hover:brightness-110"
            style={{ background: LIME }}
          >
            Launch a Campaign
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="mailto:abamgbala@excitepanacea.com"
            className="inline-flex items-center gap-2 rounded-md border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Email the team
          </a>
        </div>
      </div>
    </section>
  );
}
