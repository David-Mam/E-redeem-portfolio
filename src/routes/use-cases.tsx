import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { CORAL, useCases } from "../lib/site-data";
import { Eyebrow } from "../components/site-sections";
import {
  ScrollReveal,
  ScrollStaggerContainer,
  ScrollStaggerItem,
} from "../components/scroll-animations";

export const Route = createFileRoute("/use-cases")({
  component: UseCases,
});

function UseCases() {
  return (
    <section className="bg-[#F7F8F5] min-h-screen overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <ScrollReveal direction="up" distance={12} className="max-w-3xl">
          <Eyebrow>Use Cases</Eyebrow>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#14171A]">
            Three ways brands deploy E-Redeem.
          </h1>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#5B6470]">
            Whether you're driving footfall to an activation, growing basket size at the till, or
            nurturing a specific segment, E-Redeem gives you the mechanic.
          </p>
        </ScrollReveal>

        <ScrollStaggerContainer staggerDelay={0.06} className="mt-10 grid gap-6 lg:grid-cols-3">
          {useCases.map((u) => (
            <ScrollStaggerItem key={u.title} distance={14}>
              <div className="flex h-full flex-col justify-between rounded-[12px] border border-[#E4E7E9] bg-white p-6 sm:p-7 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#CBD0D6] hover:shadow-card">
                <div>
                  <span
                    className="grid h-11 w-11 place-items-center rounded-[8px] shadow-2xs"
                    style={{ background: u.tint }}
                  >
                    <u.icon
                      className="h-5 w-5"
                      style={{ color: u.tint === "#1a1a1a" || u.tint === "#14171A" ? "#fff" : "#14171A" }}
                    />
                  </span>
                  <h2 className="mt-5 font-display text-base font-semibold tracking-tight text-[#14171A]">{u.title}</h2>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#5B6470] mt-0.5">
                    Campaign mechanic
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5B6470]">{u.blurb}</p>
                </div>
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStaggerContainer>

        <ScrollReveal
          direction="up"
          distance={14}
          className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-[12px] border border-[#E4E7E9] bg-white p-7 sm:p-9 shadow-xs"
        >
          <div className="max-w-xl">
            <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#14171A]">
              Pick a mechanic, launch a campaign.
            </h2>
            <p className="mt-1.5 text-sm text-[#5B6470]">
              Explore the interactive campaign types that power each use case.
            </p>
          </div>
          <Link
            to="/campaigns"
            className="inline-flex items-center gap-2 rounded-[8px] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all hover:brightness-105"
            style={{ background: CORAL }}
          >
            View campaigns
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
