import type { ClientCampaign } from "@/lib/client-campaigns-data";
import type { ActivityOutcome } from "../client-campaign-views/ClientQuizView";

export type FlowStepId = "code" | "activity" | "kyc" | "requirement" | "result";

export interface FlowState {
  enteredCode: string;
  isCodeValid: boolean;
  activityOutcome: ActivityOutcome | null;
  kycData: Record<string, string>;
  isKycCompleted: boolean;
  requirementData: Record<string, string>;
  isRequirementCompleted: boolean;
  isSuccess: boolean;
  failureReason?: string;
  transactionRef: string;
}

export interface KycFieldDefinition {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "date" | "select";
  placeholder?: string;
  required: boolean;
  options?: { value: string; label: string }[];
  helperText?: string;
}

export function isRequirementApplicable(campaign: ClientCampaign): boolean {
  return (
    campaign.rewardType === "airtime" ||
    campaign.rewardType === "data" ||
    campaign.rewardType === "cash"
  );
}

export interface StepConfig {
  id: FlowStepId;
  label: string;
  path: string;
}

export function getCampaignSteps(campaign: ClientCampaign): StepConfig[] {
  const steps: StepConfig[] = [];

  if (campaign.formType === "code") {
    steps.push({
      id: "code",
      label: "Enter Code",
      path: `/campaigns/${campaign.slug}/code`,
    });
  }

  steps.push({
    id: "activity",
    label: "Campaign Activity",
    path: `/campaigns/${campaign.slug}/activity`,
  });

  steps.push({
    id: "kyc",
    label: "KYC Verification",
    path: `/campaigns/${campaign.slug}/kyc`,
  });

  if (isRequirementApplicable(campaign)) {
    steps.push({
      id: "requirement",
      label: "Reward Claim",
      path: `/campaigns/${campaign.slug}/requirement`,
    });
  }

  steps.push({
    id: "result",
    label: "Confirmation",
    path: `/campaigns/${campaign.slug}/result`,
  });

  return steps;
}
