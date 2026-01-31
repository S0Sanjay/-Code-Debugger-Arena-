window.judgeCode = function (code) {
  const result = {
    success: false,
    errors: 0,
    output: "",
    message: "",
    errorType: "",
  };

  const oldConsole = console.log;
  const output = [];

  try {
    console.log = (...args) => {
      output.push(args.map(String).join(" "));
    };

    new Function(code)();

    result.success = true;
    result.output = output.join("; ") || "No output (code ran successfully)";
    result.message = "✅ Code executed perfectly!";
  } catch (error) {
    result.errors = 1;
    result.errorType = error.name;

    if (error.message.includes("Unexpected")) {
      result.message = "Missing quote, bracket, or semicolon";
    } else if (error.message.includes("is not defined")) {
      result.message = "Variable or function not defined";
    } else if (error.message.includes("Cannot read")) {
      result.message = "Trying to use undefined variable";
    } else {
      result.message = `${error.message}`;
    }
  } finally {
    console.log = oldConsole;
  }

  return result;
};

window.showSuccess = function (result) {
  const resultsArea = document.getElementById("results-area");
  const resultDiv = document.getElementById("result-display");
  resultDiv.innerHTML = `
    <div class="bg-gradient-to-r from-green-400 to-green-500 text-white p-8 rounded-3xl shadow-2xl text-center">
      <div class="text-5xl mb-4">🎉</div>
      <h2 class="text-3xl font-black mb-4">${result.message}</h2>
      <div class="bg-green-900 p-6 rounded-2xl">
        Output: <span class="font-bold">${result.output}</span>
      </div>
    </div>
  `;
  resultsArea.classList.remove("hidden");
};

window.showError = function (result) {
  const resultsArea = document.getElementById("results-area");
  const resultDiv = document.getElementById("result-display");

  resultDiv.innerHTML = `
    <div class="bg-gradient-to-r from-red-400 to-red-500 text-white p-8 rounded-3xl shadow-2xl text-center">
      <div class="text-5xl mb-4">❌</div>
      <h2 class="text-3xl font-black mb-4">${result.message}</h2>
    </div>
  `;
  resultsArea.classList.remove("hidden");
};

document.getElementById("close-result").onclick = function () {
  document.getElementById("results-area").classList.add("hidden");
};

function testCode() {
  const code = document.getElementById("code-input").value;
  const result = window.judgeCode(code);
  if (code.trim() === "") {
    alert("Please write some code first!");
  } else {
    console.log("TEAM API RESULT:", result);

    if (result.success) {
      window.showSuccess(result);
      currentQuestionIndex++;

      if (currentQuestionIndex < questions[currentLevel].length) {
        loadQuestion();
      } else {
        alert("🎉 Level Completed!");
        code.value = "";
      }
    } else {
      window.showError(result);
    }
  }
}