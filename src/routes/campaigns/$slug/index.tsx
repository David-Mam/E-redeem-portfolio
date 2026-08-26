import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCampaignFlow } from "../../../components/client-campaign-flow/CampaignFlowContext";

export const Route = createFileRoute("/campaigns/$slug/")({
  component: CampaignIndexRedirect,
});

function CampaignIndexRedirect() {
  const { campaign, state } = useCampaignFlow();
  const navigate = useNavigate();

  useEffect(() => {
    if (campaign.formType === "code") {
      // If code was already validated and activity is in progress, navigate to current step or code
      if (state.isCodeValid) {
        navigate({ to: `/campaigns/${campaign.slug}/activity` as string });
      } else {
        navigate({ to: `/campaigns/${campaign.slug}/code` as string });
      }
    } else {
      navigate({ to: `/campaigns/${campaign.slug}/activity` as string });
    }
  }, [campaign, state, navigate]);

  return (
    <div className="flex items-center justify-center p-12 text-center text-sm font-medium opacity-60">
      Initializing campaign flow...
    </div>
  );
}
