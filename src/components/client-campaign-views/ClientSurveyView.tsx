import { useState } from "react";
import { Sparkles, CheckCircle2, ArrowRight, Copy, Check } from "lucide-react";
import type { ClientCampaign, SurveyStepItem } from "@/lib/client-campaigns-data";
import type { ActivityOutcome } from "./ClientQuizView";

interface ClientSurveyViewProps {
  campaign: ClientCampaign;
  onComplete?: (outcome: ActivityOutcome) => void;
  isStepFlow?: boolean;
}

export function ClientSurveyView({
  campaign,
  onComplete,
  isStepFlow = false,
}: ClientSurveyViewProps) {
  const surveyData = campaign.surveyData;
  const theme = campaign.theme;
  const steps: SurveyStepItem[] = surveyData?.steps || [];

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const currentQ = steps[currentStep];
  const currentAnswer = answers[currentStep];

  const handleSelect = (opt: string) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: opt }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleContinueFlow = () => {
    if (onComplete) {
      onComplete({
        success: true,
        data: {
          surveyAnswers: answers,
          voucher: surveyData?.rewardVoucher || "PEACE-SKY-9942",
        },
        message: "Survey feedback successfully submitted",
      });
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
    setCopiedCode(false);
  };

  const handleCopy = () => {
    if (surveyData?.rewardVoucher) {
      navigator.clipboard.writeText(surveyData.rewardVoucher);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
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
            Passenger Hospitality Survey
          </span>
          <h3
            className="mt-2 text-xl sm:text-2xl font-black tracking-tight"
            style={{ color: theme.text }}
          >
            {isCompleted ? "Survey Completed — Flight Voucher Unlocked" : currentQ?.title}
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
          <span>
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
      </div>

      {!isCompleted && currentQ ? (
        <div className="mt-8 space-y-6">
          <div
            className="flex items-center justify-between text-xs font-bold"
            style={{ color: theme.textMuted }}
          >
            <span>{currentQ.subtitle}</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
          </div>

          <div
            className="h-2 w-full rounded-full overflow-hidden"
            style={{ backgroundColor: theme.background }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
                backgroundColor: theme.secondary,
              }}
            />
          </div>

          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt) => {
              const isSelected = currentAnswer === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className="w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer"
                  style={{
                    backgroundColor: isSelected ? theme.primary : theme.cardBg,
                    borderColor: isSelected ? theme.secondary : theme.border,
                    color: isSelected ? "#FFFFFF" : theme.text,
                  }}
                >
                  <span className="font-semibold text-sm sm:text-base pr-3">{opt}</span>
                  <div
                    className="shrink-0 h-6 w-6 rounded-full border flex items-center justify-center"
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
            className="flex items-center justify-between gap-4 pt-4 border-t"
            style={{ borderColor: theme.border }}
          >
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="px-5 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.cardBg,
                color: theme.textMuted,
              }}
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!currentAnswer}
              className="px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 hover:brightness-110 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              style={{ backgroundColor: theme.secondary, color: theme.badgeText }}
            >
              <span>
                {currentStep === steps.length - 1 ? "Finish Survey Questions" : "Next Question →"}
              </span>
            </button>
          </div>
        </div>
      ) : (
        /* Completion Display */
        <div className="mt-8 space-y-6 animate-fadeIn">
          <div
            className="p-8 rounded-3xl border text-center space-y-4 shadow-xl"
            style={{ backgroundColor: theme.cardBg, borderColor: theme.secondary }}
          >
            <div
              className="mx-auto h-16 w-16 rounded-2xl grid place-items-center"
              style={{ backgroundColor: theme.primary }}
            >
              <CheckCircle2 className="h-8 w-8" style={{ color: theme.secondary }} />
            </div>

            <div>
              <span
                className="inline-block px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full"
                style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
              >
                Survey Completed
              </span>
              <h4 className="mt-3 text-3xl font-black tracking-tight" style={{ color: theme.text }}>
                ₦10,000 Flight Discount Unlocked
              </h4>
              <p
                className="mt-2 text-xs sm:text-sm max-w-md mx-auto leading-relaxed"
                style={{ color: theme.textMuted }}
              >
                Thank you for rating our passenger experience. Proceed to complete your KYC
                registration to claim and receive this promotional flight voucher.
              </p>
            </div>

            {!isStepFlow && (
              <div className="flex items-center justify-center gap-2 pt-2">
                <div
                  className="px-6 py-3.5 rounded-2xl border tabular-nums font-black text-lg tracking-widest uppercase shadow-inner"
                  style={{
                    backgroundColor: theme.background,
                    borderColor: theme.secondary,
                    color: theme.secondary,
                  }}
                >
                  {surveyData?.rewardVoucher || "PEACE-SKY-9942"}
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-3.5 rounded-2xl border transition-all hover:brightness-125 cursor-pointer"
                  style={{
                    backgroundColor: theme.primary,
                    borderColor: theme.secondary,
                    color: "#FFFFFF",
                  }}
                >
                  {copiedCode ? (
                    <Check className="h-5 w-5 text-emerald-300" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
            )}
            {copiedCode && (
              <div className="text-xs font-bold text-emerald-400">Copied to clipboard!</div>
            )}
          </div>

          <div
            className="p-5 rounded-2xl border space-y-3 text-xs"
            style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
          >
            <div className="font-bold uppercase tracking-wider text-slate-300">
              Survey Answers Captured
            </div>
            {steps.map((st, idx) => (
              <div
                key={st.id}
                className="flex justify-between border-b pb-2 last:border-0 last:pb-0"
                style={{ borderColor: theme.border }}
              >
                <span className="text-slate-400">
                  Q{idx + 1}: {st.title.slice(0, 35)}...
                </span>
                <span className="font-bold" style={{ color: theme.secondary }}>
                  {answers[idx] || "—"}
                </span>
              </div>
            ))}
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
                Take Survey Again
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
