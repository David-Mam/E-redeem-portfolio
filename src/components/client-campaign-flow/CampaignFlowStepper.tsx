import { Check, KeyRound, Sparkles, UserCheck, Gift, Award } from "lucide-react";
import type { ClientCampaign } from "@/lib/client-campaigns-data";
import { type FlowStepId, getCampaignSteps } from "./flow-types";

interface StepperProps {
  campaign: ClientCampaign;
  currentStep: FlowStepId;
}

const STEP_ICONS: Record<FlowStepId, typeof KeyRound> = {
  code: KeyRound,
  activity: Sparkles,
  kyc: UserCheck,
  requirement: Gift,
  result: Award,
};

export function CampaignFlowStepper({ campaign, currentStep }: StepperProps) {
  const theme = campaign.theme;
  const stepsConfig = getCampaignSteps(campaign);

  const currentIndex = stepsConfig.findIndex((s) => s.id === currentStep);

  return (
    <div
      id="campaign-flow-stepper"
      className="p-3 sm:p-4 rounded-[12px] border transition-all"
      style={{
        backgroundColor: theme.surface || "#FFFFFF",
        borderColor: theme.border || "#E4E7E9",
      }}
    >
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {stepsConfig.map((step, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const StepIcon = STEP_ICONS[step.id] || Sparkles;

          return (
            <div key={step.id} className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <div
                  className="h-7 w-7 rounded-[6px] flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    backgroundColor: isDone
                      ? "#14171A"
                      : isCurrent
                        ? theme.primary || "#FF5E3A"
                        : theme.cardBg || "#FFFFFF",
                    color: isDone || isCurrent ? "#FFFFFF" : theme.textMuted || "#657786",
                    border: `1px solid ${isCurrent ? theme.primary || "#FF5E3A" : isDone ? "#14171A" : theme.border || "#E4E7E9"}`,
                  }}
                >
                  {isDone ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <StepIcon className="h-3.5 w-3.5" />
                  )}
                </div>

                <div className="hidden md:block">
                  <div
                    className="text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      color: isCurrent ? theme.primary || "#FF5E3A" : theme.textMuted || "#657786",
                    }}
                  >
                    Step {idx + 1}
                  </div>
                  <div
                    className="text-xs font-semibold leading-tight"
                    style={{
                      color:
                        isCurrent || isDone
                          ? theme.text || "#14171A"
                          : theme.textMuted || "#657786",
                    }}
                  >
                    {step.label}
                  </div>
                </div>
              </div>

              {idx < stepsConfig.length - 1 && (
                <div
                  className="w-4 sm:w-8 h-0.5 mx-1 transition-colors"
                  style={{
                    backgroundColor: idx < currentIndex ? "#14171A" : theme.border || "#E4E7E9",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
