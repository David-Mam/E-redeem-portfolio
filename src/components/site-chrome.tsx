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

const navLinkClass = "text-sm font-medium text-[#5B6470] transition-colors hover:text-[#14171A]";
const navLinkActiveClass = "text-[#14171A] font-semibold";

/* Shared by the desktop dropdown and the mobile menu so the two campaign lists
 * can't drift apart. */
function CampaignRowContent({ campaign }: { campaign: (typeof campaigns)[number] }) {
  const Icon = campaign.icon;
  return (
    <>
      <span
        className="grid h-7 w-7 shrink-0 place-items-center rounded-[6px]"
        style={{ background: `${CORAL}14` }}
      >
        <Icon className="h-3.5 w-3.5" style={{ color: CORAL }} />
      </span>
      <span className="font-medium text-sm text-[#14171A]">{campaign.label}</span>
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
    "flex w-full items-center gap-3 rounded-[6px] px-3 py-2 text-left text-sm font-medium text-[#5B6470] transition-colors hover:bg-[#F7F8F5] hover:text-[#14171A]";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className={`inline-flex items-center gap-1.5 cursor-pointer ${navLinkClass}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        Interactive campaigns
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-[12px] border border-[#E4E7E9] bg-white p-2 shadow-panel"
        >
          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#5B6470]">
            Mechanic Catalog
          </div>
          {campaigns.map((c) => (
            <Link
              key={c.slug}
              to="/interactive-campaigns/$campaign"
              params={{ campaign: c.slug }}
              role="menuitem"
              className={rowClass}
              onClick={() => setOpen(false)}
            >
              <CampaignRowContent campaign={c} />
            </Link>
          ))}
          <Link
            to="/interactive-campaigns"
            role="menuitem"
            className="mt-1 flex items-center justify-between rounded-[6px] border-t border-[#E4E7E9] px-3 py-2 text-xs font-bold text-[#14171A] transition-colors hover:bg-[#F7F8F5]"
            onClick={() => setOpen(false)}
          >
            View all mechanics
            <ArrowRight className="h-3.5 w-3.5" style={{ color: CORAL }} />
          </Link>
        </div>
      )}
    </div>
  );
}

/* ---------------- Nav ---------------- */

const primaryLinks = [
  { to: "/campaigns", label: "Campaigns" },
  { to: "/case-studies", label: "Case studies" },
  { to: "/use-cases", label: "Use cases" },
  { to: "/contacts", label: "Contacts" },
] as const;

const mobileLinkClass =
  "block rounded-[6px] px-3.5 py-2.5 text-sm font-medium text-[#5B6470] hover:bg-[#F7F8F5] hover:text-[#14171A] transition-colors";
const mobileLinkActiveClass =
  "block rounded-[6px] bg-[#F7F8F5] px-3.5 py-2.5 text-sm font-bold text-[#14171A]";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { formValues, submitted, handleChange, handleSubmit, resetForm } = useDemoRequestForm();

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!demoOpen) {
      resetForm();
    }
  }, [demoOpen, resetForm]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          isScrolled
            ? "border-b border-[#E4E7E9] bg-white/95 backdrop-blur-md shadow-subtle"
            : "border-b border-[#E4E7E9] bg-white"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5" onClick={closeMobile}>
            <span
              className="grid h-8 w-8 place-items-center rounded-[6px] font-black text-white text-base shadow-xs"
              style={{ background: CORAL }}
            >
              E
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-[#14171A]">Excite</span>
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

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden h-9 items-center rounded-[8px] px-4 text-xs font-bold text-white shadow-xs transition-all hover:brightness-105 active:scale-[0.985] cursor-pointer md:inline-flex uppercase tracking-wider"
              style={{ background: CORAL }}
              onClick={() => setDemoOpen(true)}
            >
              Request a Demo
            </button>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-[6px] border border-[#E4E7E9] text-[#14171A] transition-colors hover:bg-[#F7F8F5] md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="border-t border-[#E4E7E9] bg-white md:hidden shadow-panel">
            <div className="space-y-1 px-4 py-4 sm:px-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
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
                <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#5B6470]">
                  Interactive campaigns
                </div>
                {campaigns.map((c) => {
                  const mobileRowClass =
                    "flex w-full items-center gap-3 rounded-[6px] px-3.5 py-2 text-left text-sm font-medium text-[#5B6470] hover:bg-[#F7F8F5] hover:text-[#14171A]";
                  return (
                    <Link
                      key={c.slug}
                      to="/interactive-campaigns/$campaign"
                      params={{ campaign: c.slug }}
                      className={mobileRowClass}
                      onClick={closeMobile}
                    >
                      <CampaignRowContent campaign={c} />
                    </Link>
                  );
                })}
                <Link
                  to="/interactive-campaigns"
                  className="block rounded-[6px] px-3.5 py-2 text-xs font-bold text-[#14171A] hover:bg-[#F7F8F5]"
                  onClick={closeMobile}
                >
                  View all mechanics
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
                className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[8px] px-5 text-xs font-bold text-white shadow-xs transition-all hover:brightness-105 active:scale-[0.985] cursor-pointer uppercase tracking-wider"
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
        <DialogContent className="max-w-3xl sm:max-w-4xl max-h-[90vh] overflow-y-auto text-base p-6 sm:p-8 rounded-[20px] border border-[#E4E7E9] bg-white shadow-panel">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-semibold leading-tight text-[#14171A]">
              Request a demo
            </DialogTitle>
            <DialogDescription className="text-sm text-[#5B6470] mt-1">
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
    <footer className="border-t border-[#E4E7E9] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span
                className="grid h-8 w-8 place-items-center rounded-[6px] font-black text-white text-base shadow-xs"
                style={{ background: CORAL }}
              >
                E
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-[#14171A]">Excite</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#5B6470]">
              E-Redeem is Excite Panacea's Gen-AI powered consumer engagement and loyalty platform.
            </p>
            <div className="mt-5 flex gap-2">
              {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-8 w-8 place-items-center rounded-[6px] border border-[#E4E7E9] text-[#5B6470] transition-colors hover:border-[#14171A] hover:text-[#14171A]"
                  aria-label="Social link"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#14171A]">
              Platform
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-[#5B6470]">
              <li>
                <Link to="/" className="hover:text-[#14171A] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/campaigns" className="hover:text-[#14171A] transition-colors">
                  Client Campaigns
                </Link>
              </li>
              <li>
                <Link to="/interactive-campaigns" className="hover:text-[#14171A] transition-colors">
                  Interactive Mechanics
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="hover:text-[#14171A] transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/use-cases" className="hover:text-[#14171A] transition-colors">
                  Use Cases
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#14171A]">
              Contact
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-[#5B6470]">
              <li className="flex items-center gap-2.5">
                <Phone className="h-3.5 w-3.5 shrink-0" style={{ color: CORAL }} />
                <a href={contact.phoneHref} className="hover:text-[#14171A] transition-colors">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-3.5 w-3.5 shrink-0" style={{ color: CORAL }} />
                <a href={`mailto:${contact.email}`} className="hover:text-[#14171A] transition-colors">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe2 className="h-3.5 w-3.5 shrink-0" style={{ color: CORAL }} />
                <a href={contact.websiteHref} className="hover:text-[#14171A] transition-colors">
                  {contact.website}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#14171A]">Legal</div>
            <ul className="mt-4 space-y-2.5 text-sm text-[#5B6470]">
              <li>
                <Link to="/privacy-policy" className="hover:text-[#14171A] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-[#14171A] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-[#E4E7E9] pt-6 text-xs text-[#5B6470]">
          <span>© {new Date().getFullYear()} Excite Panacea. All rights reserved.</span>
          <span className="font-medium">E-Redeem™ · Gen-AI Consumer Engagement Platform</span>
        </div>
      </div>
    </footer>
  );
}
