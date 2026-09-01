import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/campaigns/$slug/")({
  component: CampaignIndexRoute,
});

function CampaignIndexRoute() {
  return null;
}
