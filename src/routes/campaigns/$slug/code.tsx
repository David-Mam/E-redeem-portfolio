import { createFileRoute } from "@tanstack/react-router";
import {
  useCampaignFlow,
  useRouteGuard,
} from "../../../components/client-campaign-flow/CampaignFlowContext";
import { CodeInputStep } from "../../../components/client-campaign-flow/CodeInputStep";

export const Route = createFileRoute("/campaigns/$slug/code")({
  component: CampaignCodeRoute,
});

function CampaignCodeRoute() {
  const { isChecking } = useRouteGuard("code");
  const { campaign, state, submitCode, failCode } = useCampaignFlow();

  if (isChecking) {
    return (
      <div className="flex items-center justify-center p-12 text-center text-sm font-medium opacity-60">
        Verifying eligibility...
      </div>
    );
  }

  return (
    <CodeInputStep
      campaign={campaign}
      initialCode={state.enteredCode}
      onSuccess={submitCode}
      onFail={failCode}
    />
  );
}
