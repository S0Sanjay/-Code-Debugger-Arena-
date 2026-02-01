window.startAIChallenge = function (level) {

  const thinkingEl = document.getElementById("ai-thinking");
  const resultEl   = document.getElementById("ai-result");
  const vsEl       = document.getElementById("vs-indicator");
  const scoreEl    = document.getElementById("ai-score");
  const timeEl     = document.getElementById("ai-time-taken");

  // Base ranges for each level
  const aiRanges = {
    easy:   { min: 60, max: 75, time: "8s" },
    medium: { min: 76, max: 90, time: "12s" },
    hard:   { min: 91, max: 105, time: "18s" }
  };

  // Safety check
  if (!aiRanges[level]) return;

  // Generate RANDOM AI score
  const randomAIScore =
    Math.floor(Math.random() * (aiRanges[level].max - aiRanges[level].min + 1))
    + aiRanges[level].min;

  // RESET UI
  thinkingEl.classList.remove("ai-hidden");
  vsEl.classList.add("ai-hidden");
  resultEl.classList.add("ai-hidden");

  // EXACT 3 seconds AI thinking
  setTimeout(() => {

    thinkingEl.classList.add("ai-hidden");
    vsEl.classList.remove("ai-hidden");
    resultEl.classList.remove("ai-hidden");

    scoreEl.textContent = randomAIScore;
    timeEl.textContent  = aiRanges[level].time;

    // Notify Member 6 / scoring system
    window.onAIComplete({
      aiScore: randomAIScore,
      aiTime: aiRanges[level].time,
      level: level
    });

  }, 3000);
};
