import { useState } from "react";
import { Sparkles, Check, BarChart3, ArrowRight } from "lucide-react";
import type { ClientCampaign, PollOptionItem } from "@/lib/client-campaigns-data";
import type { ActivityOutcome } from "./ClientQuizView";

interface ClientPollViewProps {
  campaign: ClientCampaign;
  onComplete?: (outcome: ActivityOutcome) => void;
  isStepFlow?: boolean;
}

export function ClientPollView({ campaign, onComplete, isStepFlow = false }: ClientPollViewProps) {
  const pollData = campaign.pollData;
  const theme = campaign.theme;
  const [options, setOptions] = useState<PollOptionItem[]>(pollData?.options || []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [phone, setPhone] = useState("");

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);
  const selectedOption = options.find((opt) => opt.id === selectedId);

  const handleVote = () => {
    if (!selectedId) return;
    if (!isStepFlow && !phone.trim()) return;

    setOptions((prev) =>
      prev.map((opt) => (opt.id === selectedId ? { ...opt, votes: opt.votes + 1 } : opt)),
    );
    setHasVoted(true);
  };

  const handleContinueFlow = () => {
    if (onComplete && selectedOption) {
      onComplete({
        success: true,
        data: {
          optionId: selectedOption.id,
          optionLabel: selectedOption.label,
        },
        message: `Voted for ${selectedOption.label}`,
      });
    }
  };

  const handleReset = () => {
    setSelectedId(null);
    setHasVoted(false);
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
            Live Consumer Flavor Poll
          </span>
          <h3
            className="mt-2 text-xl sm:text-2xl font-black tracking-tight"
            style={{ color: theme.text }}
          >
            {pollData?.question || "Which flavor should we launch next?"}
          </h3>
        </div>
        <div
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold"
          style={{
            borderColor: theme.border,
            backgroundColor: theme.cardBg,
            color: theme.secondary,
          }}
        >
          <BarChart3 className="h-3.5 w-3.5" />
          <span>{totalVotes.toLocaleString()} Responses</span>
        </div>
      </div>

      {!hasVoted ? (
        <div className="mt-8 space-y-6">
          <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
            Select your favorite recipe below. Every verified participant qualifies for guaranteed
            data bundle rewards upon registration.
          </p>

          <div className="space-y-3">
            {options.map((opt) => {
              const isSelected = selectedId === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedId(opt.id)}
                  className="w-full text-left p-5 rounded-2xl border transition-all flex items-start justify-between group cursor-pointer"
                  style={{
                    backgroundColor: isSelected ? theme.primary : theme.cardBg,
                    borderColor: isSelected ? theme.secondary : theme.border,
                    color: isSelected ? "#FFFFFF" : theme.text,
                  }}
                >
                  <div className="pr-4 space-y-1">
                    <div className="text-base font-bold">{opt.label}</div>
                    {opt.description && (
                      <p className="text-xs leading-relaxed opacity-80">{opt.description}</p>
                    )}
                  </div>
                  <div
                    className="shrink-0 h-6 w-6 rounded-full border flex items-center justify-center mt-1"
                    style={{ borderColor: isSelected ? theme.secondary : theme.border }}
                  >
                    {isSelected && (
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: theme.secondary }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div
            className="p-5 rounded-2xl border space-y-3"
            style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
          >
            <div
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: theme.secondary }}
            >
              Confirm Your Flavor Selection
            </div>
            {isStepFlow ? (
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="text-xs" style={{ color: theme.textMuted }}>
                  {selectedOption
                    ? `Selected: ${selectedOption.label}`
                    : "Please click on a flavor option above to select."}
                </div>
                <button
                  type="button"
                  onClick={handleVote}
                  disabled={!selectedId}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  style={{ backgroundColor: theme.secondary, color: theme.badgeText }}
                >
                  <span>Submit Flavor Choice</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="tel"
                  required
                  placeholder="Enter Telco Phone Number (e.g. 0812...)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border text-sm font-mono focus:outline-none"
                  style={{
                    backgroundColor: theme.background,
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                />
                <button
                  type="button"
                  onClick={handleVote}
                  disabled={!selectedId || !phone.trim()}
                  className="px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  style={{ backgroundColor: theme.secondary, color: theme.badgeText }}
                >
                  <span>Submit &amp; Claim 2GB</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Live Results Display */
        <div className="mt-8 space-y-6 animate-fadeIn">
          <div
            className="p-6 rounded-2xl border text-center space-y-2"
            style={{ backgroundColor: "rgba(255, 214, 0, 0.12)", borderColor: theme.secondary }}
          >
            <div
              className="inline-flex p-2 rounded-full mb-1"
              style={{ backgroundColor: theme.secondary }}
            >
              <Check className="h-5 w-5" style={{ color: theme.badgeText }} />
            </div>
            <h4 className="text-xl font-black" style={{ color: theme.secondary }}>
              Poll Response Recorded!
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              Thank you for sharing your flavor choice. Your response is saved.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
              <span>Audience Flavor Preferences</span>
              <span>{totalVotes.toLocaleString()} Total Votes</span>
            </div>

            {options.map((opt) => {
              const pct = Math.round((opt.votes / totalVotes) * 100);
              const isSelected = opt.id === selectedId;

              return (
                <div key={opt.id} className="space-y-1.5">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="flex items-center gap-2">
                      <span>{opt.label}</span>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-white text-slate-900">
                          Your Choice
                        </span>
                      )}
                    </span>
                    <span className="font-mono">{pct}%</span>
                  </div>

                  <div
                    className="h-3 w-full rounded-full overflow-hidden"
                    style={{ backgroundColor: theme.background }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: isSelected ? theme.secondary : "#A07040",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            {isStepFlow ? (
              <button
                type="button"
                onClick={handleContinueFlow}
                className="px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] cursor-pointer"
                style={{ backgroundColor: theme.secondary, color: theme.badgeText }}
              >
                <span>Continue to KYC Registration</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all hover:brightness-125 cursor-pointer"
                style={{
                  borderColor: theme.border,
                  backgroundColor: theme.cardBg,
                  color: theme.text,
                }}
              >
                Take Poll Again
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
