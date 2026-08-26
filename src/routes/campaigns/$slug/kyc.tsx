import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  useCampaignFlow,
  useRouteGuard,
} from "../../../components/client-campaign-flow/CampaignFlowContext";
import { KycFormStep } from "../../../components/client-campaign-flow/KycFormStep";

export const Route = createFileRoute("/campaigns/$slug/kyc")({
  component: CampaignKycRoute,
});

function CampaignKycRoute() {
  const { isChecking } = useRouteGuard("kyc");
  const { campaign, state, submitKyc } = useCampaignFlow();
  const navigate = useNavigate();

  if (isChecking) {
    return (
      <div className="flex items-center justify-center p-12 text-center text-sm font-medium opacity-60">
        Verifying step status...
      </div>
    );
  }

  const handleBack = () => {
    navigate({ to: `/campaigns/${campaign.slug}/activity` as string });
  };

  return (
    <KycFormStep
      campaign={campaign}
      initialValues={state.kycData}
      onBack={handleBack}
      onSubmit={submitKyc}
    />
  );
}
