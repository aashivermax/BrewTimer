let timerInterval;
let timeLeft = 0;
let isPaused = false;


document.getElementById("startMilkTimerBtn").addEventListener("click", () => {
    const inputMinutes = parseInt(document.getElementById("timerMilkInput").value);
    
    if (isNaN(inputMinutes) || inputMinutes <= 0) {
        alert("Please enter a valid number of minutes!");
        return;
    }

    clearInterval(timerInterval); // Stop any previous timers
    timeLeft = inputMinutes * 60;
    updateDisplay(timeLeft);
    isPaused = false;

    startTimer();
});
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            updateDisplay(0);
            alert("Your coffee is ready! ☕");
            document.getElementById("pauseMilkTimerBtn").textContent = "Pause";
            isPaused = false;
        } else {
            updateDisplay(timeLeft);
        }
    }, 1000);
}


function startTimer() {
    timerInterval = setInterval(() => {
        if (!isPaused && timeLeft > 0) {
            timeLeft--;
            updateDisplay(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert("Your coffee is ready! ☕");
            }
        }
    }, 1000);
}

document.getElementById("pauseMilkTimerBtn").addEventListener("click", () => {
    const pauseBtn = document.getElementById("pauseMilkTimerBtn");

    if (timerInterval) {
        // Pause
        clearInterval(timerInterval);
        timerInterval = null;
        isPaused = true;
        pauseBtn.textContent = "Resume";
    } else if (isPaused && timeLeft > 0) {
        // Resume
        startTimer();
        isPaused = false;
        pauseBtn.textContent = "Pause";
    }
});



document.getElementById("stopMilkTimerBtn").addEventListener("click", () => {
    clearInterval(timerInterval);
    timeLeft = 0;
    isPaused = false;
    updateDisplay(0);
});

function updateDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const display = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    document.getElementById("timerMilkDisplay").textContent = display;
}
