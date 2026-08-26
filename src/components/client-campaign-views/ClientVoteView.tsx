import { useState } from "react";
import { ShieldCheck, Trophy, Flame, ArrowRight, Check } from "lucide-react";
import type { ClientCampaign, VoteCandidateItem } from "@/lib/client-campaigns-data";
import type { ActivityOutcome } from "./ClientQuizView";

interface ClientVoteViewProps {
  campaign: ClientCampaign;
  onComplete?: (outcome: ActivityOutcome) => void;
  isStepFlow?: boolean;
}

export function ClientVoteView({ campaign, onComplete, isStepFlow = false }: ClientVoteViewProps) {
  const voteData = campaign.voteData;
  const theme = campaign.theme;
  const [candidates, setCandidates] = useState<VoteCandidateItem[]>(voteData?.candidates || []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [voterPhone, setVoterPhone] = useState("");

  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);
  const leader = [...candidates].sort((a, b) => b.votes - a.votes)[0];
  const selectedCandidate = candidates.find((c) => c.id === selectedId);

  const handleVote = () => {
    if (!selectedId) return;
    if (!isStepFlow && !voterPhone.trim()) return;

    setCandidates((prev) =>
      prev.map((c) => (c.id === selectedId ? { ...c, votes: c.votes + 1 } : c)),
    );
    setHasVoted(true);
  };

  const handleContinueFlow = () => {
    if (onComplete && selectedCandidate) {
      onComplete({
        success: true,
        data: {
          candidateId: selectedCandidate.id,
          candidateName: selectedCandidate.name,
          category: selectedCandidate.category,
        },
        message: `Voted for ${selectedCandidate.name}`,
      });
    }
  };

  const handleReset = () => {
    setSelectedId(null);
    setHasVoted(false);
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
            Matchday Showdown Arena
          </span>
          <h3
            className="mt-2 text-xl sm:text-2xl font-black tracking-tight"
            style={{ color: theme.text }}
          >
            {voteData?.categoryTitle || "Matchday MVP Vote"}
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
          <Flame className="h-3.5 w-3.5 text-amber-500" />
          <span>{totalVotes.toLocaleString()} Live Fan Votes</span>
        </div>
      </div>

      {!hasVoted ? (
        <div className="mt-8 space-y-6">
          <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
            Cast your vote for the ultimate player of the match. Your verified vote earns an instant
            ₦25,000 digital bar tab voucher and an entry to the London VIP Matchday draw.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {candidates.map((cand) => {
              const isSelected = selectedId === cand.id;
              return (
                <div
                  key={cand.id}
                  onClick={() => setSelectedId(cand.id)}
                  className="rounded-2xl border p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                  style={{
                    backgroundColor: isSelected ? theme.primary : theme.cardBg,
                    borderColor: isSelected ? theme.secondary : theme.border,
                    color: isSelected ? "#FFFFFF" : theme.text,
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider"
                        style={{
                          backgroundColor: isSelected ? theme.secondary : theme.surface,
                          color: isSelected ? theme.badgeText : theme.secondary,
                        }}
                      >
                        {cand.tag}
                      </span>
                      <span
                        className="h-5 w-5 rounded-full border flex items-center justify-center"
                        style={{ borderColor: isSelected ? theme.secondary : theme.border }}
                      >
                        {isSelected && (
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: theme.secondary }}
                          />
                        )}
                      </span>
                    </div>

                    {/* Candidate Badge Image */}
                    <div className="mt-4 mb-2">
                      <div
                        className="h-16 w-16 rounded-2xl grid place-items-center font-black text-xl shadow-md"
                        style={{
                          backgroundColor: isSelected ? "#FFFFFF" : theme.surface,
                          color: isSelected ? theme.primary : theme.secondary,
                        }}
                      >
                        {cand.imageText}
                      </div>
                    </div>

                    <h4 className="text-base font-black tracking-tight mt-3">{cand.name}</h4>
                    <p className="mt-1 text-xs leading-relaxed opacity-80">{cand.subtitle}</p>
                  </div>

                  <div
                    className="mt-4 pt-3 border-t text-xs font-bold opacity-70 flex justify-between"
                    style={{ borderColor: theme.border }}
                  >
                    <span>Category:</span>
                    <span>{cand.category}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="p-5 rounded-2xl border space-y-3"
            style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
          >
            <div
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: theme.secondary }}
            >
              Confirm Your MVP Selection
            </div>
            {isStepFlow ? (
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="text-xs" style={{ color: theme.textMuted }}>
                  {selectedCandidate
                    ? `Selected: ${selectedCandidate.name} (${selectedCandidate.tag})`
                    : "Please click on a player candidate card above to select."}
                </div>
                <button
                  type="button"
                  onClick={handleVote}
                  disabled={!selectedId}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  style={{ backgroundColor: theme.secondary, color: theme.badgeText }}
                >
                  <span>Submit Vote Selection</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="tel"
                  required
                  placeholder="Enter Mobile Number (080...)"
                  value={voterPhone}
                  onChange={(e) => setVoterPhone(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border text-sm font-mono focus:outline-none"
                  style={{
                    backgroundColor: theme.background,
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                />
                <button
                  type="button"
                  onClick={handleVote}
                  disabled={!selectedId || !voterPhone.trim()}
                  className="px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  style={{ backgroundColor: theme.secondary, color: theme.badgeText }}
                >
                  <span>Cast Official Vote</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="mt-8 space-y-6 animate-fadeIn">
          <div
            className="p-6 rounded-2xl border text-center space-y-2"
            style={{ backgroundColor: "rgba(200, 157, 71, 0.15)", borderColor: theme.secondary }}
          >
            <div
              className="inline-flex p-2 rounded-full mb-1"
              style={{ backgroundColor: theme.secondary }}
            >
              <Check className="h-5 w-5" style={{ color: theme.badgeText }} />
            </div>
            <h4 className="text-xl font-black" style={{ color: theme.secondary }}>
              Vote Successfully Recorded!
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              Your vote has been verified and registered in the live tally.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
              <span>Live Fan Standings</span>
              <span>{totalVotes.toLocaleString()} Votes Registered</span>
            </div>

            {candidates.map((c) => {
              const pct = Math.round((c.votes / totalVotes) * 100);
              const isUserChoice = c.id === selectedId;
              const isLeader = c.id === leader.id;

              return (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl border space-y-2"
                  style={{
                    backgroundColor: isUserChoice ? theme.primary : theme.cardBg,
                    borderColor: isUserChoice ? theme.secondary : theme.border,
                  }}
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold flex items-center gap-2">
                      <span>{c.name}</span>
                      {isUserChoice && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-white text-slate-900">
                          Your Choice
                        </span>
                      )}
                      {isLeader && (
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider"
                          style={{ backgroundColor: theme.secondary, color: theme.badgeText }}
                        >
                          👑 Leader
                        </span>
                      )}
                    </span>
                    <span className="font-mono font-bold">
                      {c.votes.toLocaleString()} ({pct}%)
                    </span>
                  </div>

                  <div
                    className="h-2.5 w-full rounded-full overflow-hidden"
                    style={{ backgroundColor: theme.background }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: isUserChoice ? theme.secondary : "#8E94A0",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            {isStepFlow ? (
              <button
                type="button"
                onClick={handleContinueFlow}
                className="px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] cursor-pointer"
                style={{ backgroundColor: theme.secondary, color: theme.badgeText }}
              >
                <span>Continue to KYC Registration</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all hover:brightness-125 cursor-pointer"
                style={{
                  borderColor: theme.border,
                  backgroundColor: theme.cardBg,
                  color: theme.text,
                }}
              >
                Back to Overview
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
