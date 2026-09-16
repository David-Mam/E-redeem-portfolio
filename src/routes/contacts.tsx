import { createFileRoute } from "@tanstack/react-router";
import { type ChangeEvent, type FormEvent } from "react";
import { MapPin, Phone, Mail, Globe2, ArrowRight } from "lucide-react";

import { CORAL, LIME, contact } from "../lib/site-data";
import { Eyebrow } from "../components/site-sections";
import { DemoRequestForm } from "@/components/demo-request-form";
import { useDemoRequestForm } from "@/hooks/use-demo-request-form";
import {
  ScrollReveal,
  ScrollStaggerContainer,
  ScrollStaggerItem,
} from "../components/scroll-animations";

export const Route = createFileRoute("/contacts")({
  component: Contacts,
});

function Contacts() {
  const { formValues, submitted, handleChange, handleSubmit } = useDemoRequestForm();
  const details = [
    {
      icon: Phone,
      label: "Phone",
      value: contact.phoneDisplay,
      href: contact.phoneHref,
    },
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: Globe2,
      label: "Website",
      value: contact.website,
      href: contact.websiteHref,
    },
  ];

  return (
    <section className="bg-[#F7F8F5] min-h-screen overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
          <ScrollReveal direction="up" distance={12}>
            <Eyebrow>Contacts</Eyebrow>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#14171A]">
              Let's build your next campaign.
            </h1>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5B6470]">
              Talk to the E-Redeem team about consumer engagement, rewards and loyalty programmes.
              We'll help you pick the right mechanic and get you live.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 rounded-[8px] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all hover:brightness-105"
                style={{ background: CORAL }}
              >
                Email the team
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2 rounded-[8px] border border-[#FF5E3A] bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-slate-50"
                style={{ color: CORAL }}
              >
                Call us
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal
            direction="up"
            distance={12}
            delay={0.05}
            className="rounded-[12px] border border-[#E4E7E9] bg-white p-7 sm:p-9 w-full shadow-xs"
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B6470]">
              Get in touch
            </div>
            <ul className="mt-6 space-y-5">
              {details.map((d) => (
                <li key={d.label} className="flex items-start gap-4 group">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] shadow-2xs transition-transform duration-150 group-hover:scale-105"
                    style={{ background: LIME }}
                  >
                    <d.icon className="h-4 w-4 text-[#14171A]" />
                  </span>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#5B6470]">
                      {d.label}
                    </div>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="mt-0.5 block text-sm font-semibold text-[#14171A] hover:text-coral transition-colors"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <div className="mt-0.5 text-sm font-semibold leading-relaxed text-[#14171A]">
                        {d.value}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <ScrollReveal
          direction="up"
          distance={14}
          className="rounded-[12px] border border-[#E4E7E9] bg-white p-6 sm:p-10 shadow-card"
        >
          <div className="max-w-3xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B6470]">
              Request a demo
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#14171A]">
              Ready to launch your campaign?
            </h2>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#5B6470]">
              Fill out this form and our team will reach out to walk you through the next steps.
            </p>
          </div>

          <DemoRequestForm
            formValues={formValues}
            submitted={submitted}
            onChange={handleChange}
            onSubmit={handleSubmit}
            ctaLabel="Submit request"
            idPrefix="page"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
