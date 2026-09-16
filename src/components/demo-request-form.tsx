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
    <div className="rounded-[12px] border border-[#E4E7E9] bg-[#F7F8F5] p-6 sm:p-8 text-center shadow-xs">
      <p className="font-display text-xl font-semibold text-[#14171A]">Thank you — your request is in.</p>
      <p className="mt-2 text-sm text-[#5B6470]">We’ll be in touch soon to schedule your demo.</p>
    </div>
  ) : (
    <form
      className="mt-6 sm:mt-8 grid gap-5 sm:gap-6 rounded-[12px] border border-[#E4E7E9] bg-white p-5 sm:p-7 shadow-xs"
      onSubmit={onSubmit}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${prefix}demo-name`} className="text-xs font-bold uppercase tracking-wider text-[#14171A]">
            Name
          </Label>
          <Input
            id={`${prefix}demo-name`}
            name="name"
            value={formValues.name}
            onChange={onChange}
            placeholder="Your name"
            className="rounded-[4px] border-[#E4E7E9] bg-[#F7F8F5] text-[#14171A] placeholder:text-[#5B6470]/60 text-sm h-11 px-3.5 shadow-xs transition focus:border-[#FF5E3A] focus:ring-1 focus:ring-[#FF5E3A] focus:bg-white"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${prefix}demo-email`} className="text-xs font-bold uppercase tracking-wider text-[#14171A]">
            Email
          </Label>
          <Input
            id={`${prefix}demo-email`}
            name="email"
            type="email"
            value={formValues.email}
            onChange={onChange}
            placeholder="name@example.com"
            className="rounded-[4px] border-[#E4E7E9] bg-[#F7F8F5] text-[#14171A] placeholder:text-[#5B6470]/60 text-sm h-11 px-3.5 shadow-xs transition focus:border-[#FF5E3A] focus:ring-1 focus:ring-[#FF5E3A] focus:bg-white"
            required
          />
        </div>
      </div>

      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor={`${prefix}demo-company`} className="text-xs font-bold uppercase tracking-wider text-[#14171A]">
          Company
        </Label>
        <Input
          id={`${prefix}demo-company`}
          name="company"
          value={formValues.company}
          onChange={onChange}
          placeholder="Company name"
          className="rounded-[4px] border-[#E4E7E9] bg-[#F7F8F5] text-[#14171A] placeholder:text-[#5B6470]/60 text-sm h-11 px-3.5 shadow-xs transition focus:border-[#FF5E3A] focus:ring-1 focus:ring-[#FF5E3A] focus:bg-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${prefix}demo-message`} className="text-xs font-bold uppercase tracking-wider text-[#14171A]">
          What are you looking for?
        </Label>
        <Textarea
          id={`${prefix}demo-message`}
          name="message"
          value={formValues.message}
          onChange={onChange}
          placeholder="Tell us about your goals or challenges"
          rows={4}
          className="rounded-[4px] border-[#E4E7E9] bg-[#F7F8F5] text-[#14171A] placeholder:text-[#5B6470]/60 text-sm min-h-[100px] p-3.5 shadow-xs transition focus:border-[#FF5E3A] focus:ring-1 focus:ring-[#FF5E3A] focus:bg-white leading-relaxed"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end pt-2 border-t border-[#E4E7E9]">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full sm:w-auto">
          {showCancel && onCancel ? (
            <button
              type="button"
              className="inline-flex h-10 w-full sm:w-auto items-center justify-center rounded-[8px] border border-[#E4E7E9] bg-white px-5 text-xs font-bold text-[#14171A] transition-colors hover:bg-[#F7F8F5] cursor-pointer uppercase tracking-wider"
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
          ) : null}
          <button
            type="submit"
            className="inline-flex h-10 w-full sm:min-w-[10rem] items-center justify-center rounded-[8px] px-6 text-xs font-bold text-white shadow-xs transition-all hover:brightness-105 active:scale-[0.985] cursor-pointer uppercase tracking-wider"
            style={{ background: "#FF5E3A" }}
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
