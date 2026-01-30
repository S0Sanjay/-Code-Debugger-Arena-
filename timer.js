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
        timeLeft = timeLeft - 1;
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

    if (used <= cfg.p2) {
        el.style.color = "mediumspringgreen";
    } else if (used <= cfg.p3) {
        el.style.color = "gold";
    } else {
        el.style.color = "tomato";
    }
}

window.resetTimer = function() {
    if (activeMode) window.startTimer(activeMode);
};

window.autoSubmit = function() {
    console.log("ARENA_TIMEOUT");
};