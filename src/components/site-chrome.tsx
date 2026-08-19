import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  Globe2,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";

import { CORAL, campaigns, contact } from "../lib/site-data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DemoRequestForm } from "@/components/demo-request-form";
import { useDemoRequestForm } from "@/hooks/use-demo-request-form";

const navLinkClass = "text-sm font-medium text-slate-600 transition-colors hover:text-slate-900";
const navLinkActiveClass = "text-slate-900";

/* Shared by the desktop dropdown and the mobile menu so the two campaign lists
 * can't drift apart. */
function CampaignRowContent({ campaign }: { campaign: (typeof campaigns)[number] }) {
  const Icon = campaign.icon;
  return (
    <>
      <span
        className="grid h-7 w-7 shrink-0 place-items-center rounded-md"
        style={{ background: `${CORAL}1a` }}
      >
        <Icon className="h-4 w-4" style={{ color: CORAL }} />
      </span>
      {campaign.label}
    </>
  );
}

/* ---------------- Interactive campaigns dropdown ---------------- */

function CampaignsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const rowClass =
    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className={`inline-flex items-center gap-1 ${navLinkClass}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        Interactive campaigns
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.25)]"
        >
          {campaigns.map((c) => (
            <Link
              key={c.slug}
              to="/campaigns/$campaign"
              params={{ campaign: c.slug }}
              role="menuitem"
              className={rowClass}
              onClick={() => setOpen(false)}
            >
              <CampaignRowContent campaign={c} />
            </Link>
          ))}
          <Link
            to="/campaigns"
            role="menuitem"
            className="mt-1 flex items-center justify-between rounded-lg border-t border-slate-100 px-3 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            View all campaigns
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

/* ---------------- Nav ---------------- */

const primaryLinks = [
  { to: "/case-studies", label: "Case studies" },
  { to: "/use-cases", label: "Use cases" },
  { to: "/contacts", label: "Contacts" },
] as const;

const mobileLinkClass =
  "block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50";
const mobileLinkActiveClass =
  "block rounded-lg bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const { formValues, submitted, handleChange, handleSubmit, resetForm } = useDemoRequestForm();

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    if (!demoOpen) {
      resetForm();
    }
  }, [demoOpen, resetForm]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2" onClick={closeMobile}>
            <span
              className="grid h-8 w-8 place-items-center rounded-md font-black text-white"
              style={{ background: CORAL }}
            >
              E
            </span>
            <span className="text-lg font-bold tracking-tight">Excite</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              className={navLinkClass}
              activeProps={{ className: `${navLinkClass} ${navLinkActiveClass}` }}
            >
              Home
            </Link>
            <CampaignsDropdown />
            {primaryLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={navLinkClass}
                activeProps={{ className: `${navLinkClass} ${navLinkActiveClass}` }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hidden h-10 items-center rounded-md px-5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md hover:brightness-110 cursor-pointer md:inline-flex"
              style={{ background: CORAL }}
              onClick={() => setDemoOpen(true)}
            >
              Request a Demo
            </button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="border-t border-slate-200 bg-white md:hidden">
            <div className="space-y-1 px-4 py-4 sm:px-6">
              <Link
                to="/"
                activeOptions={{ exact: true }}
                className={mobileLinkClass}
                activeProps={{ className: mobileLinkActiveClass }}
                onClick={closeMobile}
              >
                Home
              </Link>

              <div className="pt-2">
                <div className="px-3 pb-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Interactive campaigns
                </div>
                {campaigns.map((c) => {
                  const mobileRowClass =
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50";
                  return (
                    <Link
                      key={c.slug}
                      to="/campaigns/$campaign"
                      params={{ campaign: c.slug }}
                      className={mobileRowClass}
                      onClick={closeMobile}
                    >
                      <CampaignRowContent campaign={c} />
                    </Link>
                  );
                })}
                <Link
                  to="/campaigns"
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                  onClick={closeMobile}
                >
                  View all campaigns
                </Link>
              </div>

              {primaryLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={mobileLinkClass}
                  activeProps={{ className: mobileLinkActiveClass }}
                  onClick={closeMobile}
                >
                  {l.label}
                </Link>
              ))}

              <button
                type="button"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-110 cursor-pointer"
                style={{ background: CORAL }}
                onClick={() => {
                  setDemoOpen(true);
                  closeMobile();
                }}
              >
                Request a Demo
              </button>
            </div>
          </nav>
        )}
      </header>

      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent className="max-w-3xl sm:max-w-4xl text-base">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold leading-tight text-slate-900">
              Request a demo
            </DialogTitle>
            <DialogDescription className="text-base text-slate-700">
              Share a few details and we’ll reach out to schedule your demo.
            </DialogDescription>
          </DialogHeader>

          <DemoRequestForm
            formValues={formValues}
            submitted={submitted}
            onChange={handleChange}
            onSubmit={handleSubmit}
            showCancel
            onCancel={() => setDemoOpen(false)}
            ctaLabel="Submit request"
            cancelLabel="Cancel"
            idPrefix="modal"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ---------------- Footer ---------------- */

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span
                className="grid h-8 w-8 place-items-center rounded-md font-black text-white"
                style={{ background: CORAL }}
              >
                E
              </span>
              <span className="text-lg font-bold tracking-tight text-slate-900">Excite</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
              E-Redeem is Excite Panacea's Gen-AI powered consumer engagement and loyalty platform.
            </p>
            <div className="mt-5 flex gap-2">
              {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-900">
              Platform
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              <li>
                <Link to="/" className="hover:text-slate-900">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/campaigns" className="hover:text-slate-900">
                  Interactive Campaigns
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="hover:text-slate-900">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/use-cases" className="hover:text-slate-900">
                  Use Cases
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-900">
              Contact
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" style={{ color: CORAL }} />
                <a href={contact.phoneHref} className="hover:text-slate-900">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" style={{ color: CORAL }} />
                <a href={`mailto:${contact.email}`} className="hover:text-slate-900">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe2 className="h-4 w-4 shrink-0" style={{ color: CORAL }} />
                <a href={contact.websiteHref} className="hover:text-slate-900">
                  {contact.website}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-900">Legal</div>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              <li>
                <a href="#" className="hover:text-slate-900">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Excite Panacea. All rights reserved.</span>
          <span>E-Redeem™ · Gen-AI Consumer Engagement Platform</span>
        </div>
      </div>
    </footer>
  );
}
