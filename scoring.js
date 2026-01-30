// --- Calculate score ---
function calculateFinalScore(inputs) {
  var totalTime = 90; // max seconds

  // Difficulty multiplier
  var difficultyMultiplier = 1.0;
  if (inputs.difficulty === "medium") difficultyMultiplier = 1.2;
  if (inputs.difficulty === "hard") difficultyMultiplier = 1.5;

  // Penalties
  var timePenalty = (inputs.timeUsed / totalTime) * 20;
  var errorPenalty = inputs.errors * 10;

  // Final score
  var rawScore = (100 - timePenalty - errorPenalty) * difficultyMultiplier;
  var userScore = Math.round(rawScore);

  var aiScore = inputs.aiResult.aiScore;

  // Determine winner
  var winner = "tie";
  if (userScore > aiScore) winner = "user";
  if (userScore < aiScore) winner = "ai";

  return { userScore: userScore, aiScore: aiScore, winner: winner };
}

// --- Show results on screen ---
function onGameComplete(result) {
  var finalResults = document.getElementById("final-results");
  var sessionStats = document.getElementById("session-stats");
  finalResults.classList.remove("result-hidden");
  sessionStats.classList.remove("result-hidden");

  document.getElementById("user-final-score").innerHTML = result.userScore;
  document.getElementById("ai-final-score").innerHTML = result.aiScore;

  var winMessage = document.getElementById("win-message");
  winMessage.classList.remove("win");
  winMessage.classList.remove("lose");

  if (result.winner === "user") {
    winMessage.innerHTML = "🏆 YOU WIN! " + result.userScore + " vs AI " + result.aiScore;
    winMessage.classList.add("win");
  } else if (result.winner === "ai") {
    winMessage.innerHTML = "😤 TRY AGAIN! " + result.userScore + " vs AI " + result.aiScore;
    winMessage.classList.add("lose");
  } else {
    winMessage.innerHTML = "🤝 PERFECT MATCH! Both " + result.userScore + " points";
  }
}

// --- Play again button ---
document.getElementById("play-again-btn").onclick = function() {
  location.reload();
};



