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
    <section className="bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal direction="up" distance={18}>
            <Eyebrow>Contacts</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Let's build your next campaign.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Talk to the E-Redeem team about consumer engagement, rewards and loyalty programmes.
              We'll help you pick the right mechanic and get you live.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md hover:brightness-110"
                style={{ background: CORAL }}
              >
                Email the team
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2 rounded-md border-2 bg-white px-6 py-3 text-sm font-semibold transition-colors hover:bg-slate-50"
                style={{ borderColor: CORAL, color: CORAL }}
              >
                Call us
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal
            direction="up"
            distance={18}
            delay={0.1}
            className="rounded-2xl border border-slate-200 bg-slate-50/80 p-8 sm:p-10 w-full shadow-editorial"
          >
            <div className="text-base font-semibold uppercase tracking-[0.24em] text-slate-500">
              Get in touch
            </div>
            <ul className="mt-8 space-y-6">
              {details.map((d) => (
                <li key={d.label} className="flex items-start gap-5 sm:gap-6 group">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-xl shadow-xs transition-transform duration-200 group-hover:scale-105"
                    style={{ background: LIME }}
                  >
                    <d.icon className="h-5 w-5 text-slate-900" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-widest text-slate-500">
                      {d.label}
                    </div>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="mt-1 block text-base font-medium text-slate-800 hover:text-coral transition-colors"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <div className="mt-1 text-base font-medium leading-relaxed text-slate-800">
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

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <ScrollReveal
          direction="up"
          distance={20}
          className="rounded-2xl border border-slate-200 bg-slate-50/80 p-8 shadow-editorial sm:p-12"
        >
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Request a demo
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Ready to launch your campaign?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
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
