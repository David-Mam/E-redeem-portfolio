import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { XCircle, Trophy, Copy, Check, Share2, RotateCcw, ArrowRight, Clock } from "lucide-react";
import type { ClientCampaign } from "@/lib/client-campaigns-data";
import type { FlowState } from "./flow-types";
import {
  resultRevealVariants,
  reducedMotionVariants,
  whileTapButton,
} from "../../lib/motion-tokens";

interface SuccessFailureStepProps {
  campaign: ClientCampaign;
  flowState: FlowState;
  onRestart: () => void;
}

export function SuccessFailureStep({ campaign, flowState, onRestart }: SuccessFailureStepProps) {
  const theme = campaign.theme;
  const isSuccess = flowState.isSuccess;
  const [copiedRef, setCopiedRef] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleCopyRef = () => {
    navigator.clipboard.writeText(flowState.transactionRef);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleShare = () => {
    const shareText = `I just participated in ${campaign.clientName}'s ${campaign.campaignName} on E-Redeem! Check it out.`;
    if (navigator.share) {
      navigator
        .share({
          title: campaign.campaignName,
          text: shareText,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const getFulfillmentTimeline = () => {
    switch (campaign.rewardType) {
      case "airtime":
      case "data":
        return "Instant Direct Provisioning (Credited within 60 seconds)";
      case "cash":
        return "Instant NIBSS Settlement (Reflected within 2-5 minutes)";
      case "physical":
        return "Courier Dispatch in 3 to 5 business days with tracking via SMS";
      case "voucher":
        return "Instant Digital Voucher active immediately for checkout";
      case "entry_ticket":
        return "Digital Access Pass delivered to email with QR gate pass";
      default:
        return "Automated fulfillment within 24 hours";
    }
  };

  if (!isSuccess) {
    return (
      <motion.div
        id="campaign-failure-card"
        variants={prefersReducedMotion ? reducedMotionVariants : resultRevealVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="rounded-[12px] p-6 sm:p-10 shadow-md border text-center space-y-6 max-w-2xl mx-auto"
        style={{
          backgroundColor: theme.surface || "#FFFFFF",
          borderColor: theme.border || "#E4E7E9",
          color: theme.text || "#14171A",
        }}
      >
        <div className="mx-auto h-16 w-16 rounded-full bg-[#D64545]/10 border border-[#D64545]/30 grid place-items-center">
          <XCircle className="h-8 w-8 text-[#D64545]" />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-full bg-[#D64545]/10 text-[#D64545]">
            Activity Incomplete
          </span>
          <h3
            className="font-display text-2xl sm:text-3xl font-semibold tracking-tight"
            style={{ color: theme.text || "#14171A" }}
          >
            Entry Not Qualified For Reward
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: theme.textMuted || "#657786" }}>
            {flowState.failureReason ||
              "Your score was below the required threshold or the promotional code was not eligible for instant payout. You can try again with a new code or explore more live client activations."}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <motion.button
            id="campaign-retry-button"
            type="button"
            onClick={onRestart}
            whileTap={whileTapButton}
            className="px-6 py-3 rounded-[8px] font-bold text-sm uppercase tracking-wider text-white shadow-sm transition-colors flex items-center justify-center gap-2 hover:brightness-110 cursor-pointer"
            style={{ backgroundColor: theme.primary || "#FF5E3A" }}
          >
            <RotateCcw className="h-4 w-4" />
            <span>Try Campaign Again</span>
          </motion.button>

          <motion.div whileTap={whileTapButton}>
            <Link
              to="/campaigns"
              className="px-5 py-3 rounded-[8px] border text-xs font-bold uppercase tracking-wider transition-colors hover:bg-black/5 flex items-center gap-1.5"
              style={{
                borderColor: theme.border || "#E4E7E9",
                backgroundColor: "transparent",
                color: theme.text || "#14171A",
              }}
            >
              <span>Explore Other Brand Campaigns</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      id="campaign-success-card"
      variants={prefersReducedMotion ? reducedMotionVariants : resultRevealVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="rounded-[12px] p-6 sm:p-10 shadow-md border space-y-6 max-w-2xl mx-auto"
      style={{
        backgroundColor: theme.surface || "#FFFFFF",
        borderColor: theme.border || "#E4E7E9",
        color: theme.text || "#14171A",
      }}
    >
      {/* Top Banner */}
      <div className="text-center space-y-3">
        <div
          className="mx-auto h-16 w-16 rounded-full grid place-items-center shadow-sm"
          style={{ backgroundColor: theme.primary || "#FF5E3A", color: "#FFFFFF" }}
        >
          <Trophy className="h-8 w-8" />
        </div>

        <div className="space-y-1.5">
          <span
            className="inline-block px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-full"
            style={{
              backgroundColor: theme.badgeBg || "#F7F8F5",
              color: theme.badgeText || "#14171A",
            }}
          >
            Official Reward Verified
          </span>
          <h2
            className="font-display text-2xl sm:text-3xl font-semibold tracking-tight"
            style={{ color: theme.text || "#14171A" }}
          >
            Congratulations, {flowState.kycData.fullName || "Winner"}!
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: theme.textMuted || "#657786" }}>
            Your participation in <strong>{campaign.campaignName}</strong> has been verified.
          </p>
        </div>
      </div>

      {/* Main Confirmation Receipt Card */}
      <div
        className="p-5 rounded-[8px] border space-y-5 shadow-xs"
        style={{
          backgroundColor: theme.cardBg || "#FFFFFF",
          borderColor: theme.border || "#E4E7E9",
        }}
      >
        <div
          className="flex flex-wrap items-center justify-between gap-4 border-b pb-3"
          style={{ borderColor: theme.border || "#E4E7E9" }}
        >
          <div>
            <div
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: theme.textMuted || "#657786" }}
            >
              Prize Reward
            </div>
            <div
              className="font-display text-xl font-semibold"
              style={{ color: theme.primary || "#FF5E3A" }}
            >
              {campaign.rewardName || campaign.rewardValue}
            </div>
          </div>

          <div className="text-right">
            <div
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: theme.textMuted || "#657786" }}
            >
              Verification Ref #
            </div>
            <div
              className="flex items-center gap-1.5 tabular-nums text-sm font-bold"
              style={{ color: theme.text || "#14171A" }}
            >
              <span>{flowState.transactionRef}</span>
              <button
                type="button"
                onClick={handleCopyRef}
                className="p-1 rounded hover:opacity-75 transition-opacity cursor-pointer"
                title="Copy Reference"
              >
                {copiedRef ? (
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5 opacity-60" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Claim Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="space-y-0.5">
            <span style={{ color: theme.textMuted || "#657786" }}>Beneficiary:</span>
            <div className="font-semibold" style={{ color: theme.text || "#14171A" }}>
              {flowState.kycData.fullName || "Tunde Balogun"}
            </div>
          </div>

          <div className="space-y-0.5">
            <span style={{ color: theme.textMuted || "#657786" }}>Contact / Telco:</span>
            <div className="font-semibold" style={{ color: theme.text || "#14171A" }}>
              {flowState.kycData.phone || "08031234567"}
            </div>
          </div>

          {flowState.enteredCode && (
            <div className="space-y-0.5">
              <span style={{ color: theme.textMuted || "#657786" }}>Code Used:</span>
              <div
                className="tabular-nums font-bold uppercase"
                style={{ color: theme.primary || "#FF5E3A" }}
              >
                {flowState.enteredCode}
              </div>
            </div>
          )}

          <div className="space-y-0.5">
            <span style={{ color: theme.textMuted || "#657786" }}>Client Partner:</span>
            <div className="font-semibold" style={{ color: theme.text || "#14171A" }}>
              {campaign.clientName}
            </div>
          </div>
        </div>

        {/* Fulfillment Timeline Notice */}
        <div
          className="p-3.5 rounded-[4px] border flex items-start gap-2.5 text-xs"
          style={{
            backgroundColor: theme.surface || "#F7F8F5",
            borderColor: theme.border || "#E4E7E9",
          }}
        >
          <Clock
            className="h-4 w-4 mt-0.5 shrink-0"
            style={{ color: theme.primary || "#FF5E3A" }}
          />
          <div className="space-y-0.5">
            <div className="font-semibold" style={{ color: theme.text || "#14171A" }}>
              Fulfillment Timeline
            </div>
            <p style={{ color: theme.textMuted || "#657786" }}>{getFulfillmentTimeline()}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <motion.button
          type="button"
          onClick={handleShare}
          whileTap={whileTapButton}
          className="px-5 py-3 rounded-[8px] font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 border hover:bg-black/5 cursor-pointer"
          style={{
            borderColor: theme.border || "#E4E7E9",
            backgroundColor: "transparent",
            color: theme.text || "#14171A",
          }}
        >
          {copiedShare ? (
            <>
              <Check className="h-4 w-4 text-emerald-600" />
              <span>Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              <span>Share Victory</span>
            </>
          )}
        </motion.button>

        <motion.button
          type="button"
          onClick={onRestart}
          whileTap={whileTapButton}
          className="px-6 py-3 rounded-[8px] font-bold text-sm uppercase tracking-wider text-white shadow-sm transition-colors flex items-center gap-2 hover:brightness-110 cursor-pointer"
          style={{ backgroundColor: theme.primary || "#FF5E3A" }}
        >
          <RotateCcw className="h-4 w-4" />
          <span>Participate Again</span>
        </motion.button>

        <motion.div whileTap={whileTapButton}>
          <Link
            to="/campaigns"
            className="px-5 py-3 rounded-[8px] border text-xs font-bold uppercase tracking-wider transition-colors hover:bg-black/5 flex items-center gap-1.5"
            style={{
              borderColor: theme.border || "#E4E7E9",
              backgroundColor: "transparent",
              color: theme.text || "#14171A",
            }}
          >
            <span>Explore More Campaigns</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
