window.judgeCode = function (code) {
  const result = {
    success: false,
    errors: 0,
    output: '',
    message: '',
    errorType: ''
  };

  const oldConsole = console.log;
  const output = [];

  try {
    console.log = (...args) => {
      output.push(args.map(String).join(' '));
    };

    new Function(code)();

    result.success = true;
    result.output = output.join('; ') || 'No output (code ran successfully)';
    result.message = '✅ Code executed perfectly!';
  } catch (error) {
    result.errors = 1;
    result.errorType = error.name;

    if (error.message.includes('Unexpected')) {
      result.message = '❌ Missing quote, bracket, or semicolon';
    } else if (error.message.includes('is not defined')) {
      result.message = '❌ Variable or function not defined';
    } else if (error.message.includes('Cannot read')) {
      result.message = '❌ Trying to use undefined variable';
    } else {
      result.message = `❌ ${error.message}`;
    }
  } finally {
    console.log = oldConsole;
  }

  return result;
};


// UI Display Functions (Member 1 calls these)
window.showSuccess = function(result) {
  const resultDiv = document.getElementById('result-display');
  resultDiv.innerHTML = `
    <div class="bg-gradient-to-r from-green-400 to-green-500 text-white p-8 rounded-3xl shadow-2xl text-center">
      <div class="text-5xl mb-4">🎉</div>
      <h2 class="text-3xl font-black mb-4">${result.message}</h2>
      <div class="bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
        <div class="text-lg mb-2">Errors: <span class="font-bold text-green-200">${result.errors}</span></div>
        <div class="font-mono bg-white/50 p-4 rounded-xl text-lg">
          Output: <span class="font-bold">${result.output}</span>
        </div>
        <div class="text-xl font-bold text-green-700 mb-2">
  Errors Found: <span class="text-2xl">${result.errors}</span>
</div>
      </div>
    </div>
  `;
};

window.showError = function(result) {
  const resultDiv = document.getElementById('result-display');
  resultDiv.innerHTML = `
    <div class="bg-gradient-to-r from-red-400 to-red-500 text-white p-8 rounded-3xl shadow-2xl text-center">
      <div class="text-5xl mb-4">❌</div>
      <h2 class="text-3xl font-black mb-4">${result.message}</h2>
      <div class="text-xl font-bold text-red-700 mb-2">
  Total Errors: <span class="text-2xl">${result.errors}</span>
</div>
      <div class="bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
        <div class="text-lg mb-2">
          Type: <span class="font-bold">${result.errorType}</span> | 
          Errors: <span class="font-bold text-red-200">${result.errors}</span>
        </div>
      </div>
    </div>
  `;
};

// Main test function (for your test page)
function testCode() {
  const code = document.getElementById('code-input').value;
  const result = window.judgeCode(code);
  
  console.log('TEAM API RESULT:', result);
  
  if (result.success) {
    window.showSuccess(result);
  } else {
    window.showError(result);
  }
}

// Team Integration API
window.onJudgeComplete = function(result) {
  // Member 6 calls this after scoring
  console.log('Member 6 received:', result);
};
