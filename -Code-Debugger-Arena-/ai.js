window.startAIChallenge = function (level) {

  const thinkingEl = document.getElementById("ai-thinking");
  const resultEl = document.getElementById("ai-result");
  const scoreEl = document.getElementById("ai-score");
  const timeEl = document.getElementById("ai-time-taken");

  const aiData = {
    easy:   { aiScore: 75, aiTime: "8s" },
    medium: { aiScore: 85, aiTime: "12s" },
    hard:   { aiScore: 95, aiTime: "18s" }
  };

  // Show thinking
  thinkingEl.style.display = "block";
  resultEl.style.display = "none";

  // EXACT 3 seconds delay
  setTimeout(() => {

    thinkingEl.style.display = "none";
    resultEl.style.display = "block";

    scoreEl.textContent = aiData[level].aiScore;
    timeEl.textContent = aiData[level].aiTime;

    // Send data to Member 6
    window.onAIComplete({
      aiScore: aiData[level].aiScore,
      aiTime: aiData[level].aiTime,
      level: level
    });

  }, 3000);
};
