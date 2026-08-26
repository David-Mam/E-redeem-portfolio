import { createFileRoute } from "@tanstack/react-router";
import {
  useCampaignFlow,
  useRouteGuard,
} from "../../../components/client-campaign-flow/CampaignFlowContext";
import { SuccessFailureStep } from "../../../components/client-campaign-flow/SuccessFailureStep";

export const Route = createFileRoute("/campaigns/$slug/result")({
  component: CampaignResultRoute,
});

function CampaignResultRoute() {
  const { isChecking } = useRouteGuard("result");
  const { campaign, state, restartFlow } = useCampaignFlow();

  if (isChecking) {
    return (
      <div className="flex items-center justify-center p-12 text-center text-sm font-medium opacity-60">
        Preparing transaction confirmation...
      </div>
    );
  }

  return <SuccessFailureStep campaign={campaign} flowState={state} onRestart={restartFlow} />;
}
