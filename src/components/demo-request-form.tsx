import { type ChangeEvent, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type DemoRequestFormValues = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export const initialDemoRequestFormValues: DemoRequestFormValues = {
  name: "",
  email: "",
  company: "",
  message: "",
};

type DemoRequestFormProps = {
  formValues: DemoRequestFormValues;
  submitted: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  ctaLabel?: string;
  cancelLabel?: string;
  showCancel?: boolean;
  onCancel?: () => void;
  idPrefix?: string;
};

export function DemoRequestForm({
  formValues,
  submitted,
  onChange,
  onSubmit,
  ctaLabel = "Submit request",
  cancelLabel = "Cancel",
  showCancel = false,
  onCancel,
  idPrefix = "",
}: DemoRequestFormProps) {
  // This component renders the shared demo request fields.
  // Submission is handled by the hook in `src/hooks/use-demo-request-form.ts`.
  const prefix = idPrefix ? `${idPrefix}-` : "";

  return submitted ? (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-xl font-semibold text-slate-900">Thank you — your request is in.</p>
      <p className="mt-3 text-base text-slate-600">We’ll be in touch soon to schedule your demo.</p>
    </div>
  ) : (
    <form
      className="mt-10 grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_30px_60px_-32px_rgba(15,23,42,0.18)]"
      onSubmit={onSubmit}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-3">
          <Label htmlFor={`${prefix}demo-name`} className="text-base font-semibold text-slate-900">
            Name
          </Label>
          <Input
            id={`${prefix}demo-name`}
            name="name"
            value={formValues.name}
            onChange={onChange}
            placeholder="Your name"
            className="rounded-2xl border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-base h-14 px-4 py-3 shadow-sm transition focus:border-coral focus:ring-4 focus:ring-coral/10"
            required
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor={`${prefix}demo-email`} className="text-base font-semibold text-slate-900">
            Email
          </Label>
          <Input
            id={`${prefix}demo-email`}
            name="email"
            type="email"
            value={formValues.email}
            onChange={onChange}
            placeholder="name@example.com"
            className="rounded-2xl border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-base h-14 px-4 py-3 shadow-sm transition focus:border-coral focus:ring-4 focus:ring-coral/10"
            required
          />
        </div>
      </div>

      <div className="space-y-3 sm:col-span-2">
        <Label htmlFor={`${prefix}demo-company`} className="text-base font-semibold text-slate-900">
          Company
        </Label>
        <Input
          id={`${prefix}demo-company`}
          name="company"
          value={formValues.company}
          onChange={onChange}
          placeholder="Company name"
          className="rounded-2xl border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-base h-14 px-4 py-3 shadow-sm transition focus:border-coral focus:ring-4 focus:ring-coral/10"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor={`${prefix}demo-message`} className="text-base font-semibold text-slate-900">
          What are you looking for?
        </Label>
        <Textarea
          id={`${prefix}demo-message`}
          name="message"
          value={formValues.message}
          onChange={onChange}
          placeholder="Tell us about your goals or challenges"
          rows={6}
          className="rounded-2xl border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-base min-h-[140px] px-4 py-3 shadow-sm transition focus:border-coral focus:ring-4 focus:ring-coral/10"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {showCancel && onCancel ? (
            <button
              type="button"
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
          ) : null}
          <button
            type="submit"
            className="inline-flex h-12 min-w-[10rem] items-center justify-center rounded-2xl bg-coral px-6 text-sm font-semibold text-white shadow-lg shadow-coral/20 transition hover:bg-coral/90"
            style={{ background: "#FC766AFF" }}
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
