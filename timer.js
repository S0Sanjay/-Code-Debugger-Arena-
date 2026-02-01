var config = {
    easy: { total: 90, p2: 60, p3: 75 },
    medium: { total: 120, p2: 80, p3: 100 },
    hard: { total: 180, p2: 120, p3: 150 }
};

var timeLeft;
var timerLoop;
var activeMode;

window.startTimer = function(mode) {
    clearInterval(timerLoop);
    activeMode = mode;
    timeLeft = config[mode].total;
    
    updateDisplay();
    timerLoop = setInterval(function() {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerLoop);
            window.autoSubmit();
        }
    }, 1000);
};

function updateDisplay() {
    var el = document.getElementById('timer-display');
    var cfg = config[activeMode];
    var used = cfg.total - timeLeft;

    el.textContent = timeLeft + "s";
}

window.resetTimer = function() {
    if (activeMode) window.startTimer(activeMode);
};

window.autoSubmit = function() {
    console.log("ARENA_TIMEOUT");
};

document.addEventListener('DOMContentLoaded', function() {
    // Connect level buttons BEFORE toggle logic runs
    const easyBtn = document.getElementById('easyBtn');
    const mediumBtn = document.getElementById('mediumBtn'); 
    const hardBtn = document.getElementById('hardBtn');
    
    easyBtn.addEventListener('click', function(e) {
        window.startTimer('easy');
    });
    
    mediumBtn.addEventListener('click', function(e) {
        window.startTimer('medium');
    });
    
    hardBtn.addEventListener('click', function(e) {
        window.startTimer('hard');
    });
});
