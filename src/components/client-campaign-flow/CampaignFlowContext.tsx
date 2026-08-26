import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import type { ClientCampaign } from "@/lib/client-campaigns-data";
import type { ActivityOutcome } from "../client-campaign-views/ClientQuizView";
import {
  type FlowStepId,
  type FlowState,
  isRequirementApplicable,
  getCampaignSteps,
} from "./flow-types";

function generateTransactionRef(slug: string) {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `ERD-${slug.toUpperCase().slice(0, 4)}-${randomDigits}`;
}

function getStorageKey(slug: string) {
  return `eredeem_flow_state_${slug}`;
}

function getInitialState(campaign: ClientCampaign): FlowState {
  if (typeof window !== "undefined") {
    try {
      const stored = sessionStorage.getItem(getStorageKey(campaign.slug));
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore storage errors
    }
  }

  return {
    enteredCode: campaign.sampleValidCodes?.[0] || "",
    isCodeValid: false,
    activityOutcome: null,
    kycData: {},
    isKycCompleted: false,
    requirementData: {},
    isRequirementCompleted: false,
    isSuccess: true,
    failureReason: undefined,
    transactionRef: generateTransactionRef(campaign.slug),
  };
}

interface CampaignFlowContextType {
  campaign: ClientCampaign;
  state: FlowState;
  currentStepId: FlowStepId;
  submitCode: (code: string) => void;
  failCode: (reason: string) => void;
  submitActivity: (outcome: ActivityOutcome) => void;
  submitKyc: (formData: Record<string, string>) => void;
  submitRequirement: (data: Record<string, string>) => void;
  restartFlow: () => void;
  validateAccess: (step: FlowStepId) => { allowed: boolean; redirectTo?: string };
}

const CampaignFlowContext = createContext<CampaignFlowContextType | null>(null);

export function CampaignFlowProvider({
  campaign,
  children,
}: {
  campaign: ClientCampaign;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState<FlowState>(() => getInitialState(campaign));

  // Determine current step based on URL path
  const currentStepId: FlowStepId = (() => {
    const path = location.pathname;
    if (path.endsWith("/code")) return "code";
    if (path.endsWith("/activity")) return "activity";
    if (path.endsWith("/kyc")) return "kyc";
    if (path.endsWith("/requirement")) return "requirement";
    if (path.endsWith("/result")) return "result";
    return campaign.formType === "code" ? "code" : "activity";
  })();

  // Persist to sessionStorage whenever state changes
  useEffect(() => {
    try {
      sessionStorage.setItem(getStorageKey(campaign.slug), JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [campaign.slug, state]);

  const validateAccess = useCallback(
    (step: FlowStepId): { allowed: boolean; redirectTo?: string } => {
      // Step: CODE
      if (step === "code") {
        if (campaign.formType === "codeless") {
          return { allowed: false, redirectTo: `/campaigns/${campaign.slug}/activity` };
        }
        return { allowed: true };
      }

      // Step: ACTIVITY
      if (step === "activity") {
        if (campaign.formType === "code" && !state.isCodeValid) {
          return { allowed: false, redirectTo: `/campaigns/${campaign.slug}/code` };
        }
        return { allowed: true };
      }

      // Step: KYC
      if (step === "kyc") {
        if (campaign.formType === "code" && !state.isCodeValid) {
          return { allowed: false, redirectTo: `/campaigns/${campaign.slug}/code` };
        }
        if (!state.activityOutcome) {
          return { allowed: false, redirectTo: `/campaigns/${campaign.slug}/activity` };
        }
        if (!state.activityOutcome.success) {
          return { allowed: false, redirectTo: `/campaigns/${campaign.slug}/result` };
        }
        return { allowed: true };
      }

      // Step: REQUIREMENT
      if (step === "requirement") {
        if (!isRequirementApplicable(campaign)) {
          // Skip requirement if not applicable (physical-gift or gift-card)
          return { allowed: false, redirectTo: `/campaigns/${campaign.slug}/result` };
        }
        if (campaign.formType === "code" && !state.isCodeValid) {
          return { allowed: false, redirectTo: `/campaigns/${campaign.slug}/code` };
        }
        if (!state.activityOutcome) {
          return { allowed: false, redirectTo: `/campaigns/${campaign.slug}/activity` };
        }
        if (!state.activityOutcome.success) {
          return { allowed: false, redirectTo: `/campaigns/${campaign.slug}/result` };
        }
        if (!state.isKycCompleted) {
          return { allowed: false, redirectTo: `/campaigns/${campaign.slug}/kyc` };
        }
        return { allowed: true };
      }

      // Step: RESULT
      if (step === "result") {
        // If activity was attempted and failed, or code was failed, result is always accessible
        if (state.activityOutcome && !state.activityOutcome.success) {
          return { allowed: true };
        }
        if (!state.isSuccess && state.failureReason) {
          return { allowed: true };
        }
        if (campaign.formType === "code" && !state.isCodeValid) {
          return { allowed: false, redirectTo: `/campaigns/${campaign.slug}/code` };
        }
        if (!state.activityOutcome) {
          return { allowed: false, redirectTo: `/campaigns/${campaign.slug}/activity` };
        }
        if (!state.isKycCompleted) {
          return { allowed: false, redirectTo: `/campaigns/${campaign.slug}/kyc` };
        }
        if (isRequirementApplicable(campaign) && !state.isRequirementCompleted) {
          return { allowed: false, redirectTo: `/campaigns/${campaign.slug}/requirement` };
        }
        return { allowed: true };
      }

      return { allowed: true };
    },
    [campaign, state],
  );

  const submitCode = useCallback(
    (code: string) => {
      setState((prev) => ({
        ...prev,
        enteredCode: code,
        isCodeValid: true,
        isSuccess: true,
        failureReason: undefined,
      }));
      navigate({ to: `/campaigns/${campaign.slug}/activity` as string });
    },
    [campaign.slug, navigate],
  );

  const failCode = useCallback(
    (reason: string) => {
      setState((prev) => ({
        ...prev,
        isCodeValid: false,
        isSuccess: false,
        failureReason: reason,
      }));
      navigate({ to: `/campaigns/${campaign.slug}/result` as string });
    },
    [campaign.slug, navigate],
  );

  const submitActivity = useCallback(
    (outcome: ActivityOutcome) => {
      if (outcome.success) {
        setState((prev) => ({
          ...prev,
          activityOutcome: outcome,
          isSuccess: true,
          failureReason: undefined,
        }));
        navigate({ to: `/campaigns/${campaign.slug}/kyc` as string });
      } else {
        setState((prev) => ({
          ...prev,
          activityOutcome: outcome,
          isSuccess: false,
          failureReason:
            outcome.message ||
            "Activity requirement not met. Score was below the qualification threshold.",
        }));
        navigate({ to: `/campaigns/${campaign.slug}/result` as string });
      }
    },
    [campaign.slug, navigate],
  );

  const submitKyc = useCallback(
    (formData: Record<string, string>) => {
      const needsRequirement = isRequirementApplicable(campaign);
      setState((prev) => ({
        ...prev,
        kycData: formData,
        isKycCompleted: true,
        isSuccess: true,
      }));

      if (needsRequirement) {
        navigate({ to: `/campaigns/${campaign.slug}/requirement` as string });
      } else {
        navigate({ to: `/campaigns/${campaign.slug}/result` as string });
      }
    },
    [campaign, navigate],
  );

  const submitRequirement = useCallback(
    (data: Record<string, string>) => {
      setState((prev) => ({
        ...prev,
        requirementData: data,
        isRequirementCompleted: true,
        isSuccess: true,
      }));
      navigate({ to: `/campaigns/${campaign.slug}/result` as string });
    },
    [campaign.slug, navigate],
  );

  const restartFlow = useCallback(() => {
    const freshState: FlowState = {
      enteredCode: campaign.sampleValidCodes?.[0] || "",
      isCodeValid: false,
      activityOutcome: null,
      kycData: {},
      isKycCompleted: false,
      requirementData: {},
      isRequirementCompleted: false,
      isSuccess: true,
      failureReason: undefined,
      transactionRef: generateTransactionRef(campaign.slug),
    };
    setState(freshState);
    try {
      sessionStorage.removeItem(getStorageKey(campaign.slug));
    } catch {
      // ignore
    }

    const initialRoute =
      campaign.formType === "code"
        ? `/campaigns/${campaign.slug}/code`
        : `/campaigns/${campaign.slug}/activity`;
    navigate({ to: initialRoute as string });
  }, [campaign, navigate]);

  return (
    <CampaignFlowContext.Provider
      value={{
        campaign,
        state,
        currentStepId,
        submitCode,
        failCode,
        submitActivity,
        submitKyc,
        submitRequirement,
        restartFlow,
        validateAccess,
      }}
    >
      {children}
    </CampaignFlowContext.Provider>
  );
}

export function useCampaignFlow() {
  const context = useContext(CampaignFlowContext);
  if (!context) {
    throw new Error("useCampaignFlow must be used within a CampaignFlowProvider");
  }
  return context;
}

/**
 * Route guard hook: checks if current route step is allowed.
 * If not allowed, redirects automatically to the proper step.
 */
export function useRouteGuard(step: FlowStepId) {
  const { validateAccess } = useCampaignFlow();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const check = validateAccess(step);
    if (!check.allowed && check.redirectTo) {
      navigate({ to: check.redirectTo as string });
    } else {
      setIsChecking(false);
    }
  }, [step, validateAccess, navigate]);

  return { isChecking };
}
