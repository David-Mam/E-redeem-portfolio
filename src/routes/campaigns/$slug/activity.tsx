import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  useCampaignFlow,
  useRouteGuard,
} from "../../../components/client-campaign-flow/CampaignFlowContext";
import { ClientQuizView } from "../../../components/client-campaign-views/ClientQuizView";
import { ClientShortCodeView } from "../../../components/client-campaign-views/ClientShortCodeView";
import { ClientRaffleWheelView } from "../../../components/client-campaign-views/ClientRaffleWheelView";
import { ClientVoteView } from "../../../components/client-campaign-views/ClientVoteView";
import { ClientPollView } from "../../../components/client-campaign-views/ClientPollView";
import { ClientSurveyView } from "../../../components/client-campaign-views/ClientSurveyView";

export const Route = createFileRoute("/campaigns/$slug/activity")({
  component: CampaignActivityRoute,
});

function CampaignActivityRoute() {
  const { isChecking } = useRouteGuard("activity");
  const { campaign, submitActivity } = useCampaignFlow();
  const theme = campaign.theme;

  // Codeless campaigns start on the minimal entry view (banner + "Try for Reward" button)
  // Code campaigns directly render their mechanic since the code was entered on /code
  const [hasStarted, setHasStarted] = useState(campaign.formType === "code");

  const fallbackBanner =
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80";

  if (isChecking) {
    return (
      <div className="flex items-center justify-center p-12 text-center text-sm font-medium opacity-60">
        Loading campaign activity...
      </div>
    );
  }

  // Minimal entry page for codeless campaigns before starting
  if (campaign.formType === "codeless" && !hasStarted) {
    return (
      <div
        id="codeless-campaign-entry-card"
        className="overflow-hidden rounded-[12px] border shadow-md transition-all"
        style={{
          backgroundColor: theme.surface || "#FFFFFF",
          borderColor: theme.border || "#E4E7E9",
        }}
      >
        {/* Banner Section */}
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-slate-900 sm:aspect-[24/9]">
          <img
            src={campaign.bannerUrl || fallbackBanner}
            alt={`${campaign.campaignName} Banner`}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Single Interaction Element: "Try for Reward" Button */}
        <div className="p-6 sm:p-8 max-w-xl mx-auto">
          <button
            id="campaign-try-for-reward-button"
            type="button"
            onClick={() => setHasStarted(true)}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] px-6 py-3.5 text-center text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:brightness-110 active:scale-[0.99]"
            style={{
              backgroundColor: theme.primary || "#FF5E3A",
            }}
          >
            <span>Try for Reward</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  const renderMechanic = () => {
    switch (campaign.mechanicType) {
      case "quiz":
        return <ClientQuizView campaign={campaign} onComplete={submitActivity} isStepFlow={true} />;
      case "short-code":
        return <ClientShortCodeView campaign={campaign} onComplete={submitActivity} isStepFlow={true} />;
      case "raffle":
        return <ClientRaffleWheelView campaign={campaign} onComplete={submitActivity} isStepFlow={true} />;
      case "vote":
        return <ClientVoteView campaign={campaign} onComplete={submitActivity} isStepFlow={true} />;
      case "poll":
        return <ClientPollView campaign={campaign} onComplete={submitActivity} isStepFlow={true} />;
      case "survey":
        return <ClientSurveyView campaign={campaign} onComplete={submitActivity} isStepFlow={true} />;
      default:
        return <ClientQuizView campaign={campaign} onComplete={submitActivity} isStepFlow={true} />;
    }
  };

  return <div className="w-full">{renderMechanic()}</div>;
}
