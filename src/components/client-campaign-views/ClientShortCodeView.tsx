import { useState, useEffect } from "react";
import { Hash, Sparkles, CheckCircle2, AlertCircle, Phone, ArrowRight, Copy } from "lucide-react";
import type { ClientCampaign } from "@/lib/client-campaigns-data";
import type { ActivityOutcome } from "./ClientQuizView";

const TELCOS = [
  { id: "mtn", name: "MTN Nigeria", code: "0803" },
  { id: "airtel", name: "Airtel", code: "0802" },
  { id: "glo", name: "Glo Mobile", code: "0805" },
  { id: "9mobile", name: "9mobile", code: "0809" },
];

interface ClientShortCodeViewProps {
  campaign: ClientCampaign;
  onComplete?: (outcome: ActivityOutcome) => void;
  initialCode?: string;
  isStepFlow?: boolean;
}

export function ClientShortCodeView({
  campaign,
  onComplete,
  initialCode = "",
  isStepFlow = false,
}: ClientShortCodeViewProps) {
  const shortCode = campaign.shortCodeData;
  const theme = campaign.theme;

  const [code, setCode] = useState(initialCode);
  const [phone, setPhone] = useState("");
  const [selectedTelco, setSelectedTelco] = useState("mtn");
  const [isVerifying, setIsVerifying] = useState(false);
  const [redemptionResult, setRedemptionResult] = useState<{
    success: boolean;
    message: string;
    transactionId?: string;
    prize?: string;
  } | null>(null);

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode]);

  const handleUseSampleCode = (sample: string) => {
    setCode(sample);
    setRedemptionResult(null);
  };

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsVerifying(true);
    setRedemptionResult(null);

    setTimeout(() => {
      setIsVerifying(false);
      const cleanCode = code.trim().toUpperCase();
      const isWinner = cleanCode.startsWith("RB") || cleanCode.length >= 6;

      if (isWinner) {
        const result = {
          success: true,
          message: "Winning Code Iteration Verified & Confirmed!",
          prize: campaign.rewardName || "₦100,000 Direct Bank Scholarship Grant",
          transactionId: `WCI-RIB-${Math.floor(1000000 + Math.random() * 9000000)}`,
        };
        setRedemptionResult(result);
      } else {
        setRedemptionResult({
          success: false,
          message: "Invalid code format. Please check the 8-character pack code and try again.",
        });
      }
    }, 800);
  };

  const handleContinueFlow = () => {
    if (onComplete && redemptionResult) {
      onComplete({
        success: redemptionResult.success,
        data: {
          code: code.trim().toUpperCase(),
          telco: selectedTelco,
          transactionId: redemptionResult.transactionId,
          prize: redemptionResult.prize,
        },
        message: redemptionResult.message,
      });
    }
  };

  const handleReset = () => {
    setCode("");
    setRedemptionResult(null);
  };

  return (
    <div
      className="rounded-3xl p-6 sm:p-10 shadow-2xl border transition-all"
      style={{
        backgroundColor: theme.surface,
        borderColor: theme.border,
        color: theme.text,
      }}
    >
      <div
        className="flex flex-wrap items-center justify-between gap-4 border-b pb-6"
        style={{ borderColor: theme.border }}
      >
        <div>
          <span
            className="inline-block px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full"
            style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
          >
            Live Code Redemption Engine
          </span>
          <h3
            className="mt-2 text-xl sm:text-2xl font-black tracking-tight"
            style={{ color: theme.text }}
          >
            Enter Your {campaign.clientName} Pack Code
          </h3>
        </div>
        <div
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold font-mono"
          style={{
            borderColor: theme.border,
            backgroundColor: theme.cardBg,
            color: theme.secondary,
          }}
        >
          <span>SMS Short Code:</span>
          <span>{shortCode?.smsNumber || "65432"}</span>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* Left Form */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleRedeem} className="space-y-4">
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: theme.textMuted }}
              >
                Select Preferred Network
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TELCOS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTelco(t.id)}
                    className="p-3 rounded-xl border text-center transition-all cursor-pointer"
                    style={{
                      backgroundColor: selectedTelco === t.id ? theme.primary : theme.cardBg,
                      borderColor: selectedTelco === t.id ? theme.secondary : theme.border,
                      color: selectedTelco === t.id ? "#FFFFFF" : theme.text,
                    }}
                  >
                    <div className="text-xs font-bold">{t.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {!isStepFlow && (
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: theme.textMuted }}
                >
                  Your Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-slate-400">
                    <Phone className="h-4 w-4" />
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="0803 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border text-sm font-mono focus:outline-none"
                    style={{
                      backgroundColor: theme.background,
                      borderColor: theme.border,
                      color: theme.text,
                    }}
                  />
                </div>
              </div>
            )}

            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: theme.textMuted }}
              >
                Unique Pack Code
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-400">
                  <Hash className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="e.g. RB-7729-K8"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border text-sm font-mono font-bold tracking-widest uppercase focus:outline-none"
                  style={{
                    backgroundColor: theme.background,
                    borderColor: theme.border,
                    color: theme.secondary,
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isVerifying || !code.trim()}
              className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              style={{
                backgroundColor: theme.secondary,
                color: theme.badgeText,
              }}
            >
              {isVerifying ? (
                <>
                  <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Validating Code with WCI...</span>
                </>
              ) : (
                <>
                  <span>Verify Pack Code</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Sample test codes */}
          {shortCode?.sampleCodes && (
            <div
              className="p-4 rounded-2xl border text-xs space-y-2"
              style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
            >
              <div
                className="flex items-center gap-1.5 font-bold uppercase tracking-wider"
                style={{ color: theme.secondary }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Try Sample Promo Pack Codes:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {shortCode.sampleCodes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleUseSampleCode(s)}
                    className="px-2.5 py-1 rounded-lg border font-mono font-bold hover:brightness-125 transition-all flex items-center gap-1 cursor-pointer"
                    style={{
                      backgroundColor: theme.background,
                      borderColor: theme.border,
                      color: theme.text,
                    }}
                  >
                    <span>{s}</span>
                    <Copy className="h-3 w-3 opacity-60" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Status / Result Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {redemptionResult ? (
            <div
              className={`p-6 rounded-2xl border space-y-4 animate-fadeIn ${
                redemptionResult.success
                  ? "bg-emerald-950/40 border-emerald-500/50"
                  : "bg-rose-950/40 border-rose-500/50"
              }`}
            >
              <div className="flex items-start gap-3">
                {redemptionResult.success ? (
                  <CheckCircle2 className="h-7 w-7 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="h-7 w-7 text-rose-400 shrink-0" />
                )}
                <div>
                  <h4 className="text-base font-bold text-white">
                    {redemptionResult.success ? "Congratulations Winner!" : "Validation Notice"}
                  </h4>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                    {redemptionResult.message}
                  </p>
                </div>
              </div>

              {redemptionResult.success && (
                <div
                  className="p-4 rounded-xl border space-y-2 text-xs"
                  style={{ backgroundColor: theme.surface, borderColor: theme.border }}
                >
                  <div className="text-slate-400 font-medium">Reward Payout:</div>
                  <div className="text-sm font-bold" style={{ color: theme.secondary }}>
                    {redemptionResult.prize}
                  </div>
                  <div
                    className="pt-2 border-t flex justify-between text-slate-400 font-mono text-[11px]"
                    style={{ borderColor: theme.border }}
                  >
                    <span>Ref Code:</span>
                    <span className="text-white font-bold">{redemptionResult.transactionId}</span>
                  </div>
                </div>
              )}

              {isStepFlow && redemptionResult.success ? (
                <button
                  type="button"
                  onClick={handleContinueFlow}
                  className="w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] cursor-pointer"
                  style={{ backgroundColor: theme.secondary, color: theme.badgeText }}
                >
                  <span>Continue to KYC Registration</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all hover:brightness-125 cursor-pointer"
                  style={{
                    borderColor: theme.border,
                    backgroundColor: theme.cardBg,
                    color: theme.text,
                  }}
                >
                  Enter Another Code
                </button>
              )}
            </div>
          ) : (
            <div
              className="p-6 rounded-2xl border space-y-4 text-center"
              style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
            >
              <div
                className="h-12 w-12 mx-auto rounded-2xl grid place-items-center"
                style={{ backgroundColor: theme.background }}
              >
                <Sparkles className="h-6 w-6" style={{ color: theme.secondary }} />
              </div>
              <h4 className="text-base font-bold" style={{ color: theme.text }}>
                How WCI Protects Your Promo
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: theme.textMuted }}>
                No code printed on pack is pre-marked as a winning code. The Winning Code Iteration
                algorithm safely awards prizes on real-time intervals.
              </p>
              <div
                className="p-3 rounded-xl border text-left text-xs space-y-1 font-mono"
                style={{ backgroundColor: theme.background, borderColor: theme.border }}
              >
                <div className="text-slate-400">USSD Direct Entry:</div>
                <div className="font-bold" style={{ color: theme.secondary }}>
                  {shortCode?.ussdString || "*654*CODE#"}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
