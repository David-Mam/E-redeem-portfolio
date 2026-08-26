import { useState } from "react";
import { AlertCircle, ArrowRight } from "lucide-react";
import type { ClientCampaign } from "@/lib/client-campaigns-data";

interface CodeInputStepProps {
  campaign: ClientCampaign;
  initialCode?: string;
  onSuccess: (code: string) => void;
  onFail?: (reason: string) => void;
}

export function CodeInputStep({ campaign, initialCode = "", onSuccess }: CodeInputStepProps) {
  const theme = campaign.theme;
  const [code, setCode] = useState(initialCode);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const fallbackBanner =
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80";

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim().toUpperCase();

    if (!cleanCode) {
      setError("Please enter your code.");
      return;
    }

    setIsVerifying(true);
    setError(null);

    setTimeout(() => {
      setIsVerifying(false);
      if (cleanCode === "EXPIRED" || cleanCode === "INVALID" || cleanCode === "USED") {
        setError(
          `Code "${cleanCode}" is invalid, expired, or already used. Please check your pack and retry.`,
        );
        return;
      }

      if (cleanCode.length >= 4) {
        onSuccess(cleanCode);
      } else {
        setError("Invalid code format. Codes must be at least 4 alphanumeric characters.");
      }
    }, 400);
  };

  return (
    <div
      id="campaign-code-entry-card"
      className="overflow-hidden rounded-[12px] border shadow-md transition-all"
      style={{
        backgroundColor: theme.surface || "#FFFFFF",
        borderColor: theme.border || "#E4E7E9",
      }}
    >
      {/* Banner Section */}
      <div className="relative aspect-[21/9] w-full overflow-hidden bg-slate-900 sm:aspect-[24/9]">
        <img
          src={campaign.bannerUrl || fallbackBanner}
          alt={`${campaign.campaignName} Banner`}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Code Input Form - Single Column, Top-Aligned Label, Nothing Else */}
      <div className="p-6 sm:p-8">
        <form onSubmit={handleValidate} className="space-y-4 max-w-xl mx-auto">
          <div className="space-y-2">
            <label
              htmlFor="campaign-code-input"
              className="block text-sm font-semibold text-left"
              style={{ color: theme.text || "#14171A" }}
            >
              Enter your code
            </label>
            <input
              id="campaign-code-input"
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. MLO-2024-XXXX"
              className="w-full rounded-[4px] border px-4 py-3 font-mono text-base font-semibold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF5E3A]"
              style={{
                backgroundColor: theme.cardBg || "#FFFFFF",
                borderColor: error ? "#D64545" : theme.border || "#E4E7E9",
                color: theme.text || "#14171A",
              }}
              autoFocus
            />
          </div>

          {error && (
            <div
              id="campaign-code-error-message"
              className="flex items-center gap-2 rounded-[4px] border border-[#D64545]/40 bg-[#D64545]/10 p-3 text-xs font-medium text-[#D64545]"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            id="campaign-code-submit-button"
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:brightness-110 active:scale-[0.99]"
            style={{
              backgroundColor: theme.primary || "#FF5E3A",
            }}
          >
            {isVerifying ? (
              <span>Verifying...</span>
            ) : (
              <>
                <span>Submit Code</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
