import { useState } from "react";
import {
  Gift,
  Building2,
  Smartphone,
  MapPin,
  Ticket,
  Percent,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import type { ClientCampaign, RewardType } from "@/lib/client-campaigns-data";

interface RewardRequirementStepProps {
  campaign: ClientCampaign;
  kycData: Record<string, string>;
  initialValues?: Record<string, string>;
  onBack: () => void;
  onSubmit: (rewardData: Record<string, string>) => void;
}

const NIGERIAN_BANKS = [
  "Access Bank",
  "Guaranty Trust Bank (GTBank)",
  "Zenith Bank",
  "First Bank of Nigeria",
  "United Bank for Africa (UBA)",
  "Kuda Bank",
  "OPay Digital Services",
  "Moniepoint MFB",
  "Stanbic IBTC Bank",
  "Fidelity Bank",
  "Sterling Bank",
  "Wema Bank / ALAT",
];

const TELCO_NETWORKS = ["MTN Nigeria", "Airtel Nigeria", "Glo Mobile", "9mobile"];

const NIGERIAN_STATES = [
  "Lagos",
  "Abuja (FCT)",
  "Rivers",
  "Oyo",
  "Kano",
  "Enugu",
  "Delta",
  "Kaduna",
  "Edo",
  "Ogun",
  "Anambra",
  "Ondo",
  "Akwa Ibom",
  "Plateau",
  "Other State",
];

export function RewardRequirementStep({
  campaign,
  kycData,
  initialValues = {},
  onBack,
  onSubmit,
}: RewardRequirementStepProps) {
  const theme = campaign.theme;
  const rewardType: RewardType = campaign.rewardType || "airtime";

  // Form states based on rewardType
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    return {
      // Cash fields
      bankName: initialValues.bankName || NIGERIAN_BANKS[0],
      accountNumber: initialValues.accountNumber || "0123456789",
      accountName: initialValues.accountName || kycData.fullName || "TUNDE BALOGUN",

      // Airtime / Data fields
      telcoNetwork: initialValues.telcoNetwork || TELCO_NETWORKS[0],
      recipientPhone: initialValues.recipientPhone || kycData.phone || "08031234567",

      // Physical fields
      deliveryAddress: initialValues.deliveryAddress || "Plot 12, Admiralty Way, Lekki Phase 1",
      deliveryState: initialValues.deliveryState || NIGERIAN_STATES[0],
      deliveryLga: initialValues.deliveryLga || "Eti-Osa LGA",
      deliveryNotes: initialValues.deliveryNotes || "Call recipient upon arrival.",

      // Ticket / Pass fields
      ticketHolderName: initialValues.ticketHolderName || kycData.fullName || "Tunde Balogun",
      ticketEmail: initialValues.ticketEmail || kycData.email || "tunde.balogun@example.com",
      vipSeatingZone: initialValues.vipSeatingZone || "VIP Hospitality Lounge A",

      // Voucher fields
      voucherRecipientEmail:
        initialValues.voucherRecipientEmail || kycData.email || "tunde.balogun@example.com",
      ...initialValues,
    };
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (rewardType === "cash") {
      if (!formData.accountNumber || formData.accountNumber.trim().length !== 10) {
        newErrors.accountNumber = "Please enter a valid 10-digit NUBAN account number.";
      }
      if (!formData.bankName) {
        newErrors.bankName = "Please select your receiving bank.";
      }
    } else if (rewardType === "airtime" || rewardType === "data") {
      if (!formData.recipientPhone || formData.recipientPhone.trim().length < 10) {
        newErrors.recipientPhone = "Please enter a valid recipient phone number.";
      }
      if (!formData.telcoNetwork) {
        newErrors.telcoNetwork = "Please select the telco network provider.";
      }
    } else if (rewardType === "physical") {
      if (!formData.deliveryAddress || formData.deliveryAddress.trim().length < 5) {
        newErrors.deliveryAddress = "Please provide your complete street delivery address.";
      }
      if (!formData.deliveryState) {
        newErrors.deliveryState = "Please select your state.";
      }
      if (!formData.deliveryLga) {
        newErrors.deliveryLga = "Please provide your Local Government Area (LGA).";
      }
    } else if (rewardType === "entry_ticket") {
      if (!formData.ticketEmail || !/\S+@\S+\.\S+/.test(formData.ticketEmail)) {
        newErrors.ticketEmail = "Please enter a valid email for ticket issuance.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(formData);
    }, 450);
  };

  return (
    <div
      id="campaign-reward-requirement-card"
      className="rounded-[12px] p-6 sm:p-8 shadow-md border transition-all"
      style={{
        backgroundColor: theme.surface || "#FFFFFF",
        borderColor: theme.border || "#E4E7E9",
        color: theme.text || "#14171A",
      }}
    >
      {/* Header with Style Scape Title & Subtitle */}
      <div className="border-b pb-4 text-left" style={{ borderColor: theme.border || "#E4E7E9" }}>
        <span
          className="inline-block px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-full"
          style={{
            backgroundColor: theme.badgeBg || "#F7F8F5",
            color: theme.badgeText || "#14171A",
          }}
        >
          Reward Fulfillment
        </span>
        <h3
          className="mt-1.5 font-display text-2xl sm:text-3xl font-bold tracking-tight"
          style={{ color: theme.text || "#14171A" }}
        >
          One last step
        </h3>
        <p className="mt-1 text-sm" style={{ color: theme.textMuted || "#657786" }}>
          We need this to send your{" "}
          {rewardType === "cash" ? "cash" : rewardType === "data" ? "data" : "airtime"} reward.
        </p>
      </div>

      {/* Main Single Column Form */}
      <div className="mt-6 space-y-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* CASH SPECIFIC FIELDS */}
          {rewardType === "cash" && (
            <>
              <div className="space-y-1.5">
                <label
                  htmlFor="bank-name-select"
                  className="block text-sm font-semibold text-left"
                  style={{ color: theme.text || "#14171A" }}
                >
                  Select Bank <span className="text-[#D64545]">*</span>
                </label>
                <select
                  id="bank-name-select"
                  value={formData.bankName}
                  onChange={(e) => handleChange("bankName", e.target.value)}
                  className="w-full px-4 py-3 rounded-[4px] border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5E3A] transition-colors cursor-pointer"
                  style={{
                    backgroundColor: theme.cardBg || "#FFFFFF",
                    borderColor: errors.bankName ? "#D64545" : theme.border || "#E4E7E9",
                    color: theme.text || "#14171A",
                  }}
                >
                  {NIGERIAN_BANKS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
                {errors.bankName && (
                  <p className="text-xs text-[#D64545] font-semibold flex items-center gap-1.5 mt-1">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.bankName}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="nuban-account-input"
                  className="block text-sm font-semibold text-left"
                  style={{ color: theme.text || "#14171A" }}
                >
                  Account Number (10 Digits) <span className="text-[#D64545]">*</span>
                </label>
                <input
                  id="nuban-account-input"
                  type="text"
                  maxLength={10}
                  value={formData.accountNumber}
                  onChange={(e) => handleChange("accountNumber", e.target.value.replace(/\D/g, ""))}
                  placeholder="0123456789"
                  className="w-full px-4 py-3 rounded-[4px] border text-base font-mono font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-[#FF5E3A] transition-colors"
                  style={{
                    backgroundColor: theme.cardBg || "#FFFFFF",
                    borderColor: errors.accountNumber ? "#D64545" : theme.border || "#E4E7E9",
                    color: theme.text || "#14171A",
                  }}
                />
                {errors.accountNumber && (
                  <p className="text-xs text-[#D64545] font-semibold flex items-center gap-1.5 mt-1">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.accountNumber}</span>
                  </p>
                )}
              </div>

              <div
                className="p-3.5 rounded-[4px] border flex items-center justify-between text-xs"
                style={{
                  backgroundColor: theme.cardBg || "#FFFFFF",
                  borderColor: theme.border || "#E4E7E9",
                }}
              >
                <span style={{ color: theme.textMuted || "#657786" }}>Verified Account Name:</span>
                <span className="font-mono font-bold" style={{ color: theme.text || "#14171A" }}>
                  {formData.accountName}
                </span>
              </div>
            </>
          )}

          {/* AIRTIME / DATA SPECIFIC FIELDS */}
          {(rewardType === "airtime" || rewardType === "data") && (
            <>
              <div className="space-y-1.5">
                <label
                  htmlFor="telco-carrier-select"
                  className="block text-sm font-semibold text-left"
                  style={{ color: theme.text || "#14171A" }}
                >
                  Mobile Network Carrier <span className="text-[#D64545]">*</span>
                </label>
                <select
                  id="telco-carrier-select"
                  value={formData.telcoNetwork}
                  onChange={(e) => handleChange("telcoNetwork", e.target.value)}
                  className="w-full px-4 py-3 rounded-[4px] border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5E3A] transition-colors cursor-pointer"
                  style={{
                    backgroundColor: theme.cardBg || "#FFFFFF",
                    borderColor: errors.telcoNetwork ? "#D64545" : theme.border || "#E4E7E9",
                    color: theme.text || "#14171A",
                  }}
                >
                  {TELCO_NETWORKS.map((net) => (
                    <option key={net} value={net}>
                      {net}
                    </option>
                  ))}
                </select>
                {errors.telcoNetwork && (
                  <p className="text-xs text-[#D64545] font-semibold flex items-center gap-1.5 mt-1">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.telcoNetwork}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="recipient-phone-input"
                  className="block text-sm font-semibold text-left"
                  style={{ color: theme.text || "#14171A" }}
                >
                  Phone Number <span className="text-[#D64545]">*</span>
                </label>
                <input
                  id="recipient-phone-input"
                  type="tel"
                  value={formData.recipientPhone}
                  onChange={(e) => handleChange("recipientPhone", e.target.value)}
                  placeholder="080X XXX XXXX"
                  className="w-full px-4 py-3 rounded-[4px] border text-base font-mono font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-[#FF5E3A] transition-colors"
                  style={{
                    backgroundColor: theme.cardBg || "#FFFFFF",
                    borderColor: errors.recipientPhone ? "#D64545" : theme.border || "#E4E7E9",
                    color: theme.text || "#14171A",
                  }}
                />
                {errors.recipientPhone && (
                  <p className="text-xs text-[#D64545] font-semibold flex items-center gap-1.5 mt-1">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.recipientPhone}</span>
                  </p>
                )}
              </div>

              <div
                className="p-3.5 rounded-[4px] border flex items-center justify-between text-xs"
                style={{
                  backgroundColor: theme.cardBg || "#FFFFFF",
                  borderColor: theme.border || "#E4E7E9",
                }}
              >
                <span style={{ color: theme.textMuted || "#657786" }}>Reward Value:</span>
                <span className="font-bold" style={{ color: theme.text || "#14171A" }}>
                  {campaign.rewardName || campaign.rewardValue}
                </span>
              </div>
            </>
          )}

          {/* PHYSICAL MERCH DELIVERY SPECIFIC FIELDS */}
          {rewardType === "physical" && (
            <>
              <div className="space-y-1.5">
                <label
                  htmlFor="delivery-address-input"
                  className="block text-sm font-semibold text-left"
                  style={{ color: theme.text || "#14171A" }}
                >
                  Street Delivery Address <span className="text-[#D64545]">*</span>
                </label>
                <input
                  id="delivery-address-input"
                  type="text"
                  value={formData.deliveryAddress}
                  onChange={(e) => handleChange("deliveryAddress", e.target.value)}
                  placeholder="e.g. 15 Marina Street, Lagos Island"
                  className="w-full px-4 py-3 rounded-[4px] border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5E3A] transition-colors"
                  style={{
                    backgroundColor: theme.cardBg || "#FFFFFF",
                    borderColor: errors.deliveryAddress ? "#D64545" : theme.border || "#E4E7E9",
                    color: theme.text || "#14171A",
                  }}
                />
                {errors.deliveryAddress && (
                  <p className="text-xs text-[#D64545] font-semibold flex items-center gap-1.5 mt-1">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.deliveryAddress}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="delivery-state-select"
                  className="block text-sm font-semibold text-left"
                  style={{ color: theme.text || "#14171A" }}
                >
                  State <span className="text-[#D64545]">*</span>
                </label>
                <select
                  id="delivery-state-select"
                  value={formData.deliveryState}
                  onChange={(e) => handleChange("deliveryState", e.target.value)}
                  className="w-full px-4 py-3 rounded-[4px] border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5E3A] transition-colors cursor-pointer"
                  style={{
                    backgroundColor: theme.cardBg || "#FFFFFF",
                    borderColor: errors.deliveryState ? "#D64545" : theme.border || "#E4E7E9",
                    color: theme.text || "#14171A",
                  }}
                >
                  {NIGERIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="delivery-lga-input"
                  className="block text-sm font-semibold text-left"
                  style={{ color: theme.text || "#14171A" }}
                >
                  Local Govt Area (LGA) <span className="text-[#D64545]">*</span>
                </label>
                <input
                  id="delivery-lga-input"
                  type="text"
                  value={formData.deliveryLga}
                  onChange={(e) => handleChange("deliveryLga", e.target.value)}
                  placeholder="e.g. Eti-Osa LGA"
                  className="w-full px-4 py-3 rounded-[4px] border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5E3A] transition-colors"
                  style={{
                    backgroundColor: theme.cardBg || "#FFFFFF",
                    borderColor: errors.deliveryLga ? "#D64545" : theme.border || "#E4E7E9",
                    color: theme.text || "#14171A",
                  }}
                />
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div
            className="flex items-center justify-between gap-4 pt-4 border-t"
            style={{ borderColor: theme.border || "#E4E7E9" }}
          >
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2.5 rounded-[8px] border text-xs font-bold uppercase tracking-wider transition-colors hover:bg-black/5 cursor-pointer"
              style={{
                borderColor: theme.border || "#E4E7E9",
                backgroundColor: "transparent",
                color: theme.textMuted || "#657786",
              }}
            >
              ← Back
            </button>

            <button
              id="campaign-reward-confirm-button"
              type="submit"
              className="px-6 py-3.5 rounded-[8px] font-bold text-sm uppercase tracking-wider text-white shadow-sm transition-all flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] cursor-pointer"
              style={{ backgroundColor: theme.primary || "#FF5E3A" }}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <>
                  <span>Confirm</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Security Notice */}
        <div
          className="p-4 rounded-[8px] border flex items-center gap-3 text-xs"
          style={{
            backgroundColor: theme.cardBg || "#FFFFFF",
            borderColor: theme.border || "#E4E7E9",
            color: theme.textMuted || "#657786",
          }}
        >
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>
            Automated settlement triggers directly upon confirmation with 0 transaction fees.
          </span>
        </div>
      </div>
    </div>
  );
}
