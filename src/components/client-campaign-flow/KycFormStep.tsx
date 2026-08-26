import { useState } from "react";
import { UserCheck, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import type { ClientCampaign } from "@/lib/client-campaigns-data";
import type { KycFieldDefinition } from "./flow-types";

// Default schema that can later be replaced by an API call:
// e.g. const { data: kycSchema } = useQuery(['campaign-kyc-schema', campaignId], fetchKycSchema)
export const DEFAULT_KYC_SCHEMA: KycFieldDefinition[] = [
  {
    id: "fullName",
    label: "Full Legal Name",
    type: "text",
    placeholder: "e.g. Adebayo Ogunlesi",
    required: true,
    helperText: "As registered on your official government identification.",
  },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "name@example.com",
    required: true,
    helperText: "For digital receipts, vouchers, and claim confirmations.",
  },
  {
    id: "phone",
    label: "Mobile Phone Number",
    type: "tel",
    placeholder: "0801 234 5678",
    required: true,
    helperText: "Used for SMS OTP verification and airtime/data credit dispatches.",
  },
  {
    id: "ageConsent",
    label: "Age Verification & Eligibility",
    type: "select",
    required: true,
    options: [
      { value: "18_plus", label: "I am 18 years or older (Eligible)" },
      { value: "with_parent", label: "Youth with Parent/Guardian Consent" },
    ],
    helperText: "In compliance with National Lottery Regulatory Commission (NLRC).",
  },
];

interface KycFormStepProps {
  campaign: ClientCampaign;
  initialValues?: Record<string, string>;
  schema?: KycFieldDefinition[];
  onBack?: () => void;
  onSubmit: (formData: Record<string, string>) => void;
}

export function KycFormStep({
  campaign,
  initialValues = {},
  schema = DEFAULT_KYC_SCHEMA,
  onBack,
  onSubmit,
}: KycFormStepProps) {
  const theme = campaign.theme;

  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {
      fullName: initialValues.fullName || "Tunde Balogun",
      email: initialValues.email || "tunde.balogun@example.com",
      phone: initialValues.phone || "08031234567",
      ageConsent: initialValues.ageConsent || "18_plus",
    };
    schema.forEach((f) => {
      if (!initial[f.id] && f.options?.[0]) {
        initial[f.id] = f.options[0].value;
      }
    });
    return initial;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    schema.forEach((field) => {
      const val = formData[field.id]?.trim();
      if (field.required && !val) {
        newErrors[field.id] = `${field.label} is required.`;
      } else if (field.type === "email" && val && !/\S+@\S+\.\S+/.test(val)) {
        newErrors[field.id] = "Please enter a valid email address.";
      } else if (field.type === "tel" && val && val.replace(/\D/g, "").length < 10) {
        newErrors[field.id] = "Please enter a valid 11-digit phone number.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(formData);
    }, 400);
  };

  return (
    <div
      id="campaign-kyc-card"
      className="rounded-[12px] p-6 sm:p-8 shadow-md border transition-all"
      style={{
        backgroundColor: theme.surface || "#FFFFFF",
        borderColor: theme.border || "#E4E7E9",
        color: theme.text || "#14171A",
      }}
    >
      {/* Header */}
      <div
        className="flex flex-wrap items-center justify-between gap-4 border-b pb-4"
        style={{ borderColor: theme.border || "#E4E7E9" }}
      >
        <div>
          <span
            className="inline-block px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-full"
            style={{
              backgroundColor: theme.badgeBg || "#F7F8F5",
              color: theme.badgeText || "#14171A",
            }}
          >
            Participant Details
          </span>
          <h3
            className="mt-1.5 font-display text-xl sm:text-2xl font-bold tracking-tight"
            style={{ color: theme.text || "#14171A" }}
          >
            Participant Registration &amp; Verification
          </h3>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold"
          style={{
            borderColor: theme.border || "#E4E7E9",
            backgroundColor: theme.cardBg || "#FFFFFF",
            color: theme.textMuted || "#657786",
          }}
        >
          <UserCheck className="h-3.5 w-3.5" />
          <span>NLRC Regulatory Compliance</span>
        </div>
      </div>

      {/* Main Single Column Form & Context */}
      <div className="mt-6 space-y-6 max-w-2xl mx-auto">
        <p className="text-sm leading-relaxed" style={{ color: theme.textMuted || "#657786" }}>
          Provide your verification details below to register your entry on the{" "}
          {campaign.clientName} winners ledger and enable instant reward fulfillment.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {schema.map((field) => {
            const fieldError = errors[field.id];

            return (
              <div key={field.id} className="space-y-1.5">
                <label
                  htmlFor={field.id}
                  className="block text-sm font-semibold text-left"
                  style={{ color: theme.text || "#14171A" }}
                >
                  {field.label} {field.required && <span className="text-[#D64545]">*</span>}
                </label>

                {field.type === "select" ? (
                  <select
                    id={field.id}
                    value={formData[field.id] || ""}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="w-full px-4 py-3 rounded-[4px] border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5E3A] transition-colors cursor-pointer"
                    style={{
                      backgroundColor: theme.cardBg || "#FFFFFF",
                      borderColor: fieldError ? "#D64545" : theme.border || "#E4E7E9",
                      color: theme.text || "#14171A",
                    }}
                  >
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.id}
                    type={field.type}
                    value={formData[field.id] || ""}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-[4px] border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5E3A] transition-colors"
                    style={{
                      backgroundColor: theme.cardBg || "#FFFFFF",
                      borderColor: fieldError ? "#D64545" : theme.border || "#E4E7E9",
                      color: theme.text || "#14171A",
                    }}
                  />
                )}

                {field.helperText && !fieldError && (
                  <p className="text-xs" style={{ color: theme.textMuted || "#657786" }}>
                    {field.helperText}
                  </p>
                )}

                {fieldError && (
                  <p className="text-xs text-[#D64545] font-semibold flex items-center gap-1.5 mt-1">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{fieldError}</span>
                  </p>
                )}
              </div>
            );
          })}

          <div
            className="flex items-center justify-between gap-4 pt-4 border-t"
            style={{ borderColor: theme.border || "#E4E7E9" }}
          >
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                className="px-4 py-2.5 rounded-[8px] border text-xs font-bold uppercase tracking-wider transition-colors hover:bg-black/5 cursor-pointer"
                style={{
                  borderColor: theme.border || "#E4E7E9",
                  backgroundColor: "transparent",
                  color: theme.textMuted || "#657786",
                }}
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            <button
              id="campaign-kyc-submit-button"
              type="submit"
              className="px-6 py-3.5 rounded-[8px] font-bold text-sm uppercase tracking-wider text-white shadow-sm transition-all flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] cursor-pointer"
              style={{ backgroundColor: theme.primary || "#FF5E3A" }}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <>
                  <span>Next: Reward Claim Details</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Security Notice */}
        <div
          className="p-4 rounded-[8px] border flex items-center gap-3 text-xs"
          style={{
            backgroundColor: theme.cardBg || "#FFFFFF",
            borderColor: theme.border || "#E4E7E9",
            color: theme.textMuted || "#657786",
          }}
        >
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>
            Your data is protected under NDPR regulations and encrypted with AES-256 standards.
          </span>
        </div>
      </div>
    </div>
  );
}
