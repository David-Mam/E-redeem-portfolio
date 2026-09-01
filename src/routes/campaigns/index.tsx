import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Sparkles, Users, ShieldCheck, Trophy } from "lucide-react";

import { CORAL, LIME } from "../../lib/site-data";
import { fetchClientCampaigns, type ClientMechanicType } from "../../lib/client-campaigns-data";
import { Eyebrow } from "../../components/site-sections";
import {
  ScrollReveal,
  ScrollStaggerContainer,
  ScrollStaggerItem,
} from "../../components/scroll-animations";

export const Route = createFileRoute("/campaigns/")({
  component: ClientCampaignsIndex,
});

const MECHANIC_FILTERS: { id: string; label: string; type?: ClientMechanicType }[] = [
  { id: "all", label: "All Campaigns" },
  { id: "quiz", label: "Quiz", type: "quiz" },
  { id: "short-code", label: "Short Code", type: "short-code" },
  { id: "raffle", label: "Raffle & Spin", type: "raffle" },
  { id: "vote", label: "Vote Showdown", type: "vote" },
  { id: "poll", label: "Consumer Poll", type: "poll" },
  { id: "survey", label: "Surveys", type: "survey" },
];

function ClientCampaignsIndex() {
  const [filter, setFilter] = useState("all");

  const {
    data: campaigns = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["client-campaigns"],
    queryFn: fetchClientCampaigns,
  });

  const filteredCampaigns = campaigns.filter((c) => {
    if (filter === "all") return true;
    return c.mechanicType === filter;
  });

  return (
    <section className="bg-[#F7F8F5] min-h-screen overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Header section */}
        <ScrollReveal
          direction="up"
          distance={16}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <Eyebrow>Client Deployments</Eyebrow>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#14171A]">
              Live Campaigns
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#5B6470]">
              Explore live, fraud-proof consumer promotions built for leading brands — powered by
              E-Redeem's Gen-AI Winning Code Iteration (WCI) engine.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 rounded-[12px] border border-[#E4E7E9] bg-white p-4">
            <div className="flex items-center gap-2.5 pr-4 border-r border-[#E4E7E9]">
              <span
                className="grid h-8 w-8 place-items-center rounded-[8px]"
                style={{ background: `${LIME}33` }}
              >
                <ShieldCheck className="h-4 w-4 text-[#14171A]" />
              </span>
              <div>
                <div className="text-xs font-bold text-[#14171A]">100% Fraud-Proof</div>
                <div className="text-[11px] text-[#5B6470]">WCI Cryptographic Engine</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 pl-2">
              <span
                className="grid h-8 w-8 place-items-center rounded-[8px]"
                style={{ background: `${CORAL}1A` }}
              >
                <Trophy className="h-4 w-4" style={{ color: CORAL }} />
              </span>
              <div>
                <div className="text-xs font-bold text-[#14171A]">₦250M+ Dispatched</div>
                <div className="text-[11px] text-[#5B6470]">Instant Automated Payouts</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Filter chips */}
        <ScrollReveal
          direction="up"
          distance={10}
          delay={0.05}
          className="mt-8 flex flex-wrap items-center gap-2 border-b border-[#E4E7E9] pb-6"
        >
          {MECHANIC_FILTERS.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`rounded-[8px] px-4 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#FF5E3A] text-white shadow-sm"
                    : "bg-white border border-[#E4E7E9] text-[#5B6470] hover:text-[#14171A] hover:bg-[#F7F8F5]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </ScrollReveal>

        {/* Loading state */}
        {isLoading && (
          <div className="py-20 text-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#E4E7E9] border-t-transparent"
              style={{ borderTopColor: CORAL }}
            />
            <p className="mt-4 text-sm font-medium text-[#5B6470]">Loading client campaigns...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="my-10 rounded-[12px] border border-[#D64545]/30 bg-[#D64545]/10 p-6 text-center text-[#D64545]">
            <p className="text-sm font-medium">Failed to load campaigns. Please try again.</p>
          </div>
        )}

        {/* Grid of client campaigns - strictly uniform cards */}
        {!isLoading && !error && (
          filteredCampaigns.length > 0 ? (
            <ScrollStaggerContainer
              key={filter}
              staggerDelay={0.07}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredCampaigns.map((c) => {
                return (
                  <ScrollStaggerItem key={c.id} distance={16}>
                    <Link
                      to="/campaigns/$slug"
                      params={{ slug: c.slug }}
                      className="group flex h-full flex-col justify-between rounded-[12px] border border-[#E4E7E9] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#CBD0D5] hover:shadow-md"
                    >
                      <div>
                        {/* Top row with client badge & status */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="rounded-[4px] bg-[#14171A] px-2 py-0.5 text-[11px] font-bold text-white uppercase tracking-wider">
                              {c.logoText}
                            </span>
                            <span className="text-xs font-semibold text-[#5B6470]">
                              {c.clientName}
                            </span>
                          </div>

                          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E7E9] bg-[#F7F8F5] px-2.5 py-0.5 text-[11px] font-semibold text-[#14171A]">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: LIME }}
                            />
                            {c.status}
                          </span>
                        </div>

                        {/* Campaign title & headline */}
                        <h3 className="mt-4 text-lg font-bold tracking-tight text-[#14171A] group-hover:text-[#FF5E3A] transition-colors">
                          {c.campaignName}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#5B6470] line-clamp-2">
                          {c.tagline}
                        </p>

                        {/* Reward callout pill */}
                        <div className="mt-4 rounded-[8px] border border-[#E4E7E9] bg-[#F7F8F5] p-3">
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#5B6470]">
                            Reward Pool
                          </div>
                          <div className="mt-0.5 text-xs font-bold text-[#14171A]">
                            {c.rewardSummary}
                          </div>
                        </div>
                      </div>

                      {/* Bottom metrics & CTA */}
                      <div className="mt-5 border-t border-[#E4E7E9] pt-4">
                        <div className="flex items-center justify-between text-xs text-[#5B6470]">
                          <span className="flex items-center gap-1.5 font-medium">
                            <Users className="h-3.5 w-3.5 text-[#5B6470]" />
                            {c.participantsCount} entries
                          </span>
                          <span
                            className="inline-flex items-center gap-1 font-semibold transition-transform group-hover:translate-x-1"
                            style={{ color: CORAL }}
                          >
                            Launch Client Page
                            <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </ScrollStaggerItem>
                );
              })}
            </ScrollStaggerContainer>
          ) : (
            <div className="my-12 rounded-[12px] border border-[#E4E7E9] bg-white p-10 text-center">
              <p className="text-sm font-semibold text-[#14171A]">
                No campaigns found in this category
              </p>
              <p className="mt-1 text-xs text-[#5B6470]">
                Try selecting another filter or choose &quot;All Campaigns&quot;.
              </p>
              <button
                type="button"
                onClick={() => setFilter("all")}
                className="mt-4 inline-flex cursor-pointer items-center gap-1.5 rounded-[8px] bg-[#FF5E3A] px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:brightness-110"
              >
                View All Campaigns
              </button>
            </div>
          )
        )}

        {/* Bottom CTA to build custom client campaign */}
        <ScrollReveal
          direction="up"
          distance={18}
          className="mt-16 rounded-[12px] bg-[#14171A] p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              <Sparkles className="h-3.5 w-3.5" style={{ color: LIME }} />
              Bespoke Enterprise Deployments
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Ready to launch a custom branded campaign?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
              We design, develop, and integrate fraud-proof interactive campaigns tailored with your
              brand colors, custom reward APIs, and instant multi-channel fulfillment.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/contacts"
              className="inline-flex items-center gap-2 rounded-[8px] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-110"
              style={{ background: CORAL }}
            >
              Request Custom Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/interactive-campaigns"
              className="inline-flex items-center gap-2 rounded-[8px] border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
            >
              Explore Mechanics
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
