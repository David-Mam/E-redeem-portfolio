import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  useCampaignFlow,
  useRouteGuard,
} from "../../../components/client-campaign-flow/CampaignFlowContext";
import { RewardRequirementStep } from "../../../components/client-campaign-flow/RewardRequirementStep";

export const Route = createFileRoute("/campaigns/$slug/requirement")({
  component: CampaignRequirementRoute,
});

function CampaignRequirementRoute() {
  const { isChecking } = useRouteGuard("requirement");
  const { campaign, state, submitRequirement } = useCampaignFlow();
  const navigate = useNavigate();

  if (isChecking) {
    return (
      <div className="flex items-center justify-center p-12 text-center text-sm font-medium opacity-60">
        Verifying reward options...
      </div>
    );
  }

  const handleBack = () => {
    navigate({ to: `/campaigns/${campaign.slug}/kyc` as string });
  };

  return (
    <RewardRequirementStep
      campaign={campaign}
      kycData={state.kycData}
      initialValues={state.requirementData}
      onBack={handleBack}
      onSubmit={submitRequirement}
    />
  );
}
