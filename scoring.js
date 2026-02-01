// --- SCORING.JS ---

// Maximum time allowed per question
const MAX_TIME = 90; // seconds

// --- Calculate final score safely ---
function calculateFinalScore(inputs = {}) {
  // Safe defaults
  const timeUsed = typeof inputs.timeUsed === "number" ? inputs.timeUsed : 0;
  const errors = typeof inputs.errors === "number" ? inputs.errors : 0;
  const difficulty = typeof inputs.difficulty === "string" ? inputs.difficulty : "easy";
  const aiScore = inputs.aiResult?.aiScore || 50; // default AI score

  // Difficulty multiplier
  let difficultyMultiplier = 1.0;
  if (difficulty === "medium") difficultyMultiplier = 1.2;
  if (difficulty === "hard") difficultyMultiplier = 1.5;

  // Penalties
  const timePenalty = Math.min((timeUsed / MAX_TIME) * 20, 20); // max 20 points
  const errorPenalty = errors * 10;

  // Calculate raw score
  let rawScore = (100 - timePenalty - errorPenalty) * difficultyMultiplier;
  const userScore = Math.max(0, Math.round(rawScore)); // no negative scores

  // Determine winner
  let winner = "tie";
  if (userScore > aiScore) winner = "user";
  if (userScore < aiScore) winner = "ai";

  return { userScore, aiScore, winner };
}

// --- Display results on screen ---
function onGameComplete(result) {
  const finalResults = document.getElementById("final-results");
  const userScoreElem = document.getElementById("user-final-score");
  const aiScoreElem = document.getElementById("ai-final-score");
  const winMessage = document.getElementById("win-message");

  // Show results container
  finalResults.classList.remove("result-hidden");

  // Set scores
  userScoreElem.innerText = result.userScore;
  aiScoreElem.innerText = result.aiScore;

  // Reset previous classes
  winMessage.classList.remove("win", "lose");

  // Show win/lose/tie message
  if (result.winner === "user") {
    winMessage.innerText = `🏆 YOU WIN! ${result.userScore} vs AI ${result.aiScore}`;
    winMessage.classList.add("win");
  } else if (result.winner === "ai") {
    winMessage.innerText = `😤 TRY AGAIN! ${result.userScore} vs AI ${result.aiScore}`;
    winMessage.classList.add("lose");
  } else {
    winMessage.innerText = `🤝 PERFECT MATCH! Both ${result.userScore} points`;
  }
}

// --- Submit button handler ---
document.getElementById("submit").addEventListener("click", () => {
  // Collect inputs safely
  const userCode = document.getElementById("code-input")?.value || "";
  const buggyCode = document.getElementById("bug")?.value || "";

  if (userCode === buggyCode) {
    alert("Please fix the code before submitting!");
    return;
  }

  // Simple error count (line difference)
  const userLines = userCode.split("\n");
  const buggyLines = buggyCode.split("\n");
  let errors = 0;
  for (let i = 0; i < buggyLines.length; i++) {
    if (userLines[i] !== buggyLines[i]) errors++;
  }

  // Time used (needs startTime to be set globally)
  const timeUsed = typeof startTime === "number" ? (Date.now() - startTime) / 1000 : 0;

  // Difficulty (fallback to easy)
  const difficulty = currentLevel || "easy";

  // AI score from page or fallback
  const aiScore = parseInt(document.getElementById("ai-score")?.innerText) || 50;

  // Build inputs object
  const gameInputs = {
    timeUsed,
    errors,
    difficulty,
    aiResult: { aiScore }
  };

  // Calculate score and show results
  const result = calculateFinalScore(gameInputs);
  onGameComplete(result);
});

// --- Play again button ---
document.getElementById("play-again-btn").onclick = () => {
  location.reload();
};
