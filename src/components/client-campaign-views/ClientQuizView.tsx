import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Trophy, RotateCcw, Sparkles, ArrowRight } from "lucide-react";
import type { ClientCampaign } from "@/lib/client-campaigns-data";

export interface ActivityOutcome {
  success: boolean;
  data?: Record<string, unknown>;
  message?: string;
}

interface ClientQuizViewProps {
  campaign: ClientCampaign;
  onComplete?: (outcome: ActivityOutcome) => void;
  isStepFlow?: boolean;
}

export function ClientQuizView({ campaign, onComplete, isStepFlow = false }: ClientQuizViewProps) {
  const quiz = campaign.quizData;
  const theme = campaign.theme;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz?.timePerQuestion || 20);
  const [userPhone, setUserPhone] = useState("");
  const [claimedReward, setClaimedReward] = useState(false);

  const questions = quiz?.questions || [];
  const currentQ = questions[currentIdx];

  // Timer countdown
  useEffect(() => {
    if (isFinished || showFeedback || !currentQ) return;
    if (timeLeft <= 0) {
      // Auto-advance if timeout
      setShowFeedback(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished, showFeedback, currentQ]);

  const handleSelect = (optIndex: number) => {
    if (showFeedback || isFinished) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: optIndex }));
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setTimeLeft(quiz?.timePerQuestion || 20);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowFeedback(false);
    setIsFinished(false);
    setTimeLeft(quiz?.timePerQuestion || 20);
    setClaimedReward(false);
    setUserPhone("");
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctIndex) score++;
    });
    return score;
  };

  const score = calculateScore();
  const hasPassed = score >= (quiz?.passingScore || 2);

  const handleContinueFlow = () => {
    if (onComplete) {
      onComplete({
        success: hasPassed,
        data: {
          score,
          totalQuestions: questions.length,
          passed: hasPassed,
        },
        message: hasPassed
          ? `Quiz Passed: ${score}/${questions.length} Correct Answers!`
          : `Score: ${score}/${questions.length} (Passing score is ${quiz?.passingScore || 2})`,
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
      {!isFinished && currentQ ? (
        <div className="space-y-6">
          {/* Header row */}
          <div
            className="flex flex-wrap items-center justify-between gap-4 border-b pb-5"
            style={{ borderColor: theme.border }}
          >
            <div>
              <span
                className="inline-block px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full"
                style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
              >
                Question {currentIdx + 1} of {questions.length}
              </span>
              <h3
                className="mt-2 text-xl sm:text-2xl font-black tracking-tight"
                style={{ color: theme.text }}
              >
                {campaign.clientName} Knowledge Arena
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold font-mono"
                style={{
                  borderColor: theme.border,
                  backgroundColor: theme.cardBg,
                  color: theme.secondary,
                }}
              >
                <span>⏱️</span>
                <span>{timeLeft}s</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div
            className="h-2 w-full overflow-hidden rounded-full"
            style={{ backgroundColor: theme.background }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${((currentIdx + 1) / questions.length) * 100}%`,
                backgroundColor: theme.secondary,
              }}
            />
          </div>

          {/* Question text */}
          <div className="py-2">
            <h4 className="text-lg sm:text-xl font-bold leading-snug" style={{ color: theme.text }}>
              {currentQ.question}
            </h4>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentIdx] === optIdx;
              const isCorrect = currentQ.correctIndex === optIdx;
              let optionBg = theme.cardBg;
              let optionBorder = theme.border;
              let optionColor = theme.text;

              if (showFeedback) {
                if (isCorrect) {
                  optionBg = "rgba(168, 225, 12, 0.18)";
                  optionBorder = "#A8E10C";
                  optionColor = "#A8E10C";
                } else if (isSelected && !isCorrect) {
                  optionBg = "rgba(239, 68, 68, 0.18)";
                  optionBorder = "#EF4444";
                  optionColor = "#FCA5A5";
                }
              } else if (isSelected) {
                optionBg = theme.primary;
                optionBorder = theme.secondary;
                optionColor = "#FFFFFF";
              }

              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelect(optIdx)}
                  disabled={showFeedback}
                  className="w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between group cursor-pointer disabled:cursor-default"
                  style={{
                    backgroundColor: optionBg,
                    borderColor: optionBorder,
                    color: optionColor,
                  }}
                >
                  <span className="font-semibold text-sm sm:text-base pr-3">{opt}</span>
                  <div className="shrink-0 flex items-center">
                    {showFeedback && isCorrect && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    )}
                    {showFeedback && isSelected && !isCorrect && (
                      <XCircle className="h-5 w-5 text-rose-400" />
                    )}
                    {!showFeedback && (
                      <span
                        className="h-6 w-6 rounded-full border flex items-center justify-center text-xs font-bold group-hover:scale-105 transition-transform"
                        style={{ borderColor: theme.border, backgroundColor: theme.background }}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation if show feedback */}
          {showFeedback && (
            <div
              className="p-4 rounded-2xl border animate-fadeIn"
              style={{
                backgroundColor: theme.background,
                borderColor: theme.border,
              }}
            >
              <div className="flex items-start gap-2">
                <Sparkles className="h-5 w-5 shrink-0 mt-0.5" style={{ color: theme.secondary }} />
                <div>
                  <div
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: theme.secondary }}
                  >
                    Brand Insight
                  </div>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                    {currentQ.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          {showFeedback && (
            <button
              type="button"
              onClick={handleNext}
              className="w-full py-4 rounded-2xl font-black text-sm sm:text-base uppercase tracking-wider shadow-lg transition-all hover:brightness-110 active:scale-[0.99] cursor-pointer"
              style={{
                backgroundColor: theme.secondary,
                color: theme.badgeText,
              }}
            >
              {currentIdx < questions.length - 1 ? "Next Question →" : "View Champion Results →"}
            </button>
          )}
        </div>
      ) : (
        /* Results Screen */
        <div className="text-center py-6 sm:py-8 space-y-6">
          <div
            className="mx-auto grid h-20 w-20 place-items-center rounded-3xl shadow-xl"
            style={{ backgroundColor: hasPassed ? theme.secondary : theme.cardBg }}
          >
            {hasPassed ? (
              <Trophy className="h-10 w-10" style={{ color: theme.badgeText }} />
            ) : (
              <RotateCcw className="h-10 w-10" style={{ color: theme.secondary }} />
            )}
          </div>

          <div>
            <span
              className="inline-block px-3 py-1 text-xs font-black uppercase tracking-widest rounded-full"
              style={{ backgroundColor: theme.cardBg, color: theme.secondary }}
            >
              Final Score
            </span>
            <h3
              className="mt-2 text-3xl sm:text-4xl font-black tracking-tight"
              style={{ color: theme.text }}
            >
              {score} / {questions.length} Correct
            </h3>
            <p
              className="mt-2 max-w-md mx-auto text-sm sm:text-base leading-relaxed"
              style={{ color: theme.textMuted }}
            >
              {hasPassed
                ? "Congratulations! You qualified for the Milo Champions instant airtime drop and school sports kit grand raffle."
                : "Good effort! You need at least 2 correct answers to claim the reward. Try again to power up your score!"}
            </p>
          </div>

          {/* In Step Flow Mode: CTA to continue to KYC Form */}
          {isStepFlow && (
            <div className="max-w-md mx-auto pt-2">
              {hasPassed ? (
                <button
                  type="button"
                  onClick={handleContinueFlow}
                  className="w-full py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] cursor-pointer"
                  style={{ backgroundColor: theme.secondary, color: theme.badgeText }}
                >
                  <span>Continue to KYC Registration</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="w-full py-3.5 px-6 rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 hover:brightness-110 cursor-pointer"
                    style={{ backgroundColor: theme.secondary, color: theme.badgeText }}
                  >
                    <span>Retry Quiz for Passing Score</span>
                    <RotateCcw className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleContinueFlow}
                    className="text-xs underline font-semibold transition-opacity opacity-75 hover:opacity-100"
                    style={{ color: theme.textMuted }}
                  >
                    Continue with current score anyway →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Standalone mode instant airtime claim */}
          {!isStepFlow && hasPassed && !claimedReward && (
            <div
              className="max-w-md mx-auto p-5 sm:p-6 rounded-2xl border text-left space-y-3"
              style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
            >
              <div
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: theme.secondary }}
              >
                Claim Instant Airtime Payout
              </div>
              <p className="text-xs" style={{ color: theme.textMuted }}>
                Enter your mobile number to receive ₦1,000 instant airtime via automated telco API:
              </p>
              <div className="flex gap-2">
                <input
                  type="tel"
                  placeholder="0803 123 4567"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: theme.background,
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setClaimedReward(true)}
                  disabled={!userPhone.trim()}
                  className="px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 cursor-pointer"
                  style={{ backgroundColor: theme.secondary, color: theme.badgeText }}
                >
                  Claim
                </button>
              </div>
            </div>
          )}

          {!isStepFlow && claimedReward && (
            <div
              className="max-w-md mx-auto p-5 rounded-2xl border animate-fadeIn"
              style={{ backgroundColor: "rgba(168, 225, 12, 0.15)", borderColor: "#A8E10C" }}
            >
              <div className="text-sm font-bold text-emerald-300">
                ✅ Airtime Dispatched to {userPhone}!
              </div>
              <div className="mt-1 text-xs text-slate-300">
                Transaction ID:{" "}
                <strong>WCI-MILO-{Math.floor(100000 + Math.random() * 900000)}</strong>
              </div>
            </div>
          )}

          <div className="flex justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleRestart}
              className="px-6 py-3 rounded-xl border text-xs sm:text-sm font-bold uppercase tracking-wider transition-all hover:brightness-125 cursor-pointer"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.cardBg,
                color: theme.text,
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
