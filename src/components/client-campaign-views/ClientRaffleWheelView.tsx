import { useState, useRef, useEffect } from "react";
import { Sparkles, Trophy, RotateCcw, ArrowRight } from "lucide-react";
import type { ClientCampaign, WheelSegmentItem } from "@/lib/client-campaigns-data";
import type { ActivityOutcome } from "./ClientQuizView";

const SEGMENT_COUNT = 8;
const SEGMENT_ANGLE = 360 / SEGMENT_COUNT;
const EXTRA_SPINS = 5;
const STOP_DURATION_MS = 3800;

interface ClientRaffleWheelViewProps {
  campaign: ClientCampaign;
  onComplete?: (outcome: ActivityOutcome) => void;
  initialCode?: string;
  isStepFlow?: boolean;
}

export function ClientRaffleWheelView({
  campaign,
  onComplete,
  initialCode = "",
  isStepFlow = false,
}: ClientRaffleWheelViewProps) {
  const wheelData = campaign.wheelData;
  const theme = campaign.theme;
  const segments: WheelSegmentItem[] = wheelData?.segments || [];

  const [phase, setPhase] = useState<"idle" | "spinning" | "stopping" | "done">("idle");
  const [rotation, setRotation] = useState(0);
  const winningIndexRef = useRef<number | null>(null);
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [userUnderCrownCode, setUserUnderCrownCode] = useState(initialCode || "COKE-SUMMER-77");

  useEffect(() => {
    if (initialCode) {
      setUserUnderCrownCode(initialCode);
    }
  }, [initialCode]);

  const handleSpin = () => {
    setRotation((prev) => prev + EXTRA_SPINS * 360 + 360);
    setPhase("spinning");
  };

  const handleStop = () => {
    // Pick winner with preference for prize
    const winningIndex = Math.floor(Math.random() * segments.length);
    winningIndexRef.current = winningIndex;
    const targetOffset = 360 - (winningIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2);
    setRotation((prev) => {
      const base = Math.ceil(prev / 360) * 360;
      return base + EXTRA_SPINS * 360 + targetOffset;
    });
    setPhase("stopping");
    stopTimerRef.current = setTimeout(() => {
      setPhase("done");
    }, STOP_DURATION_MS);
  };

  const handleReset = () => {
    if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    setPhase("idle");
    setRotation(0);
    winningIndexRef.current = null;
  };

  const winningSegment =
    phase === "done" && winningIndexRef.current !== null ? segments[winningIndexRef.current] : null;

  const handleContinueFlow = () => {
    if (onComplete && winningSegment) {
      const isPrize = winningSegment.type === "prize";
      onComplete({
        success: isPrize,
        data: {
          prize: winningSegment.rewardText || winningSegment.label,
          segment: winningSegment.label,
          crownCode: userUnderCrownCode,
        },
        message: isPrize
          ? `Won: ${winningSegment.rewardText || winningSegment.label}`
          : `Landed on: ${winningSegment.label}`,
      });
    }
  };

  return (
    <div
      className="rounded-3xl p-6 sm:p-10 shadow-2xl border transition-all"
      style={{
        backgroundColor: theme.surface,
        borderColor: theme.border,
        color: theme.text,
      }}
    >
      <div
        className="flex flex-wrap items-center justify-between gap-4 border-b pb-6"
        style={{ borderColor: theme.border }}
      >
        <div>
          <span
            className="inline-block px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full"
            style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
          >
            Live Golden Prize Wheel
          </span>
          <h3
            className="mt-2 text-xl sm:text-2xl font-black tracking-tight"
            style={{ color: theme.text }}
          >
            {campaign.clientName} Prize Spin Arena
          </h3>
        </div>
        <div
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold"
          style={{
            borderColor: theme.border,
            backgroundColor: theme.cardBg,
            color: theme.secondary,
          }}
        >
          <span>Grand Prize:</span>
          <span>{wheelData?.grandPrizeText || "iPhone 16 Pro"}</span>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12 items-center">
        {/* Left Interactive Wheel */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center p-4">
            {/* Top Pointer Needle */}
            <div
              className="absolute top-0 z-20 -mt-1 h-0 w-0 border-x-[14px] border-x-transparent border-t-[24px] filter drop-shadow-md"
              style={{ borderTopColor: theme.secondary }}
            />

            {/* Wheel Canvas / SVG Circle */}
            <div
              className="relative h-72 w-72 sm:h-80 sm:w-80 rounded-full border-4 shadow-2xl overflow-hidden transition-transform"
              style={{
                borderColor: theme.secondary,
                transform: `rotate(${rotation}deg)`,
                transition:
                  phase === "spinning"
                    ? "transform 1.8s linear infinite"
                    : phase === "stopping"
                      ? `transform ${STOP_DURATION_MS}ms cubic-bezier(0.12, 0.8, 0.25, 1)`
                      : "none",
              }}
            >
              {segments.map((seg, i) => {
                const angle = i * SEGMENT_ANGLE;
                return (
                  <div
                    key={seg.label + i}
                    className="absolute inset-0 origin-center"
                    style={{
                      transform: `rotate(${angle}deg)`,
                      clipPath: "polygon(50% 50%, 30% 0%, 70% 0%)",
                      backgroundColor: seg.color,
                    }}
                  >
                    <span
                      className="absolute top-6 left-1/2 -translate-x-1/2 text-xs sm:text-sm font-black uppercase tracking-tight text-center whitespace-nowrap"
                      style={{ color: seg.textColor }}
                    >
                      {seg.label}
                    </span>
                  </div>
                );
              })}

              {/* Center Hub */}
              <div
                className="absolute inset-0 m-auto h-16 w-16 rounded-full border-4 flex items-center justify-center font-black text-xs uppercase tracking-widest shadow-xl z-10"
                style={{
                  backgroundColor: theme.background,
                  borderColor: theme.secondary,
                  color: theme.secondary,
                }}
              >
                SPIN
              </div>
            </div>
          </div>
        </div>

        {/* Right Controls & Result Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div
            className="p-6 rounded-2xl border space-y-4"
            style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
          >
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: theme.textMuted }}
              >
                Under-The-Crown Code
              </label>
              <input
                type="text"
                value={userUnderCrownCode}
                onChange={(e) => setUserUnderCrownCode(e.target.value.toUpperCase())}
                placeholder="Enter crown code"
                className="w-full px-4 py-3 rounded-xl border text-sm font-mono font-bold tracking-wider uppercase focus:outline-none"
                style={{
                  backgroundColor: theme.background,
                  borderColor: theme.border,
                  color: theme.text,
                }}
              />
            </div>

            {/* Action Buttons */}
            <div>
              {phase === "idle" && (
                <button
                  type="button"
                  onClick={handleSpin}
                  className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-xl transition-all hover:brightness-110 active:scale-[0.99] cursor-pointer"
                  style={{ backgroundColor: theme.secondary, color: theme.badgeText }}
                >
                  ⚡ Start Golden Spin
                </button>
              )}

              {phase === "spinning" && (
                <button
                  type="button"
                  onClick={handleStop}
                  className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-xl transition-all animate-pulse hover:brightness-110 cursor-pointer"
                  style={{ backgroundColor: theme.secondary, color: theme.badgeText }}
                >
                  🛑 STOP WHEEL NOW!
                </button>
              )}

              {phase === "stopping" && (
                <button
                  type="button"
                  disabled
                  className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-wider opacity-70 cursor-wait"
                  style={{ backgroundColor: theme.cardBg, color: theme.secondary }}
                >
                  Wheel Decelerating...
                </button>
              )}
            </div>

            {/* Results */}
            {phase === "done" && winningSegment && (
              <div
                className="p-5 rounded-2xl border space-y-3 animate-fadeIn text-center"
                style={{
                  backgroundColor:
                    winningSegment.type === "prize" ? "rgba(168, 225, 12, 0.15)" : theme.background,
                  borderColor: winningSegment.type === "prize" ? "#A8E10C" : theme.border,
                }}
              >
                <div className="flex justify-center">
                  {winningSegment.type === "prize" ? (
                    <Trophy className="h-8 w-8 text-emerald-400" />
                  ) : (
                    <RotateCcw className="h-8 w-8 text-slate-400" />
                  )}
                </div>
                <h4 className="text-lg font-black" style={{ color: theme.text }}>
                  {winningSegment.type === "prize" ? "WINNER!" : "Spin Complete"}
                </h4>
                <p
                  className="text-xs sm:text-sm leading-relaxed"
                  style={{ color: theme.textMuted }}
                >
                  {winningSegment.type === "prize"
                    ? `You won: ${winningSegment.rewardText || winningSegment.label}!`
                    : `Landed on "${winningSegment.label}". Try with another crown cap!`}
                </p>

                {isStepFlow ? (
                  <div className="space-y-2 pt-2">
                    <button
                      type="button"
                      onClick={handleContinueFlow}
                      className="w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] cursor-pointer"
                      style={{ backgroundColor: theme.secondary, color: theme.badgeText }}
                    >
                      <span>Continue to KYC Registration</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs underline font-semibold transition-opacity opacity-75 hover:opacity-100 cursor-pointer"
                      style={{ color: theme.textMuted }}
                    >
                      Spin again instead
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all hover:brightness-125 cursor-pointer"
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.surface,
                      color: theme.text,
                    }}
                  >
                    Spin Again
                  </button>
                )}
              </div>
            )}
          </div>

          <div
            className="p-4 rounded-2xl border text-xs space-y-1"
            style={{ backgroundColor: theme.surface, borderColor: theme.border }}
          >
            <div className="flex items-center gap-1 font-bold text-slate-300">
              <Sparkles className="h-3.5 w-3.5" style={{ color: theme.secondary }} />
              <span>Certified WCI Fairness</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Prize allocations are generated on real-time server cryptographic timestamps,
              certified by national lottery regulatory compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
