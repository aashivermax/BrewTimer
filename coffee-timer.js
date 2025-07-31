let timerInterval;

document.getElementById("startTimerBtn").addEventListener("click", () => {
    const inputMinutes = parseInt(document.getElementById("timerInput").value);
    
    if (isNaN(inputMinutes) || inputMinutes <= 0) {
        alert("Please enter a valid number of minutes! lolll");
        return;
    }

    let timeLeft = inputMinutes * 60; // convert to seconds

    updateDisplay(timeLeft); // immediately show the full time
    clearInterval(timerInterval); // clear any existing timer
    timerInterval = setInterval(() => {
        timeLeft--;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            updateDisplay(0);
            alert("Your coffee is ready! ☕");
        } else {
            updateDisplay(timeLeft);
        }
    }, 1000);
});

document.getElementById("stopTimerBtn").addEventListener("click", () => {
    clearInterval(timerInterval);
});

function updateDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const display = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    document.getElementById("timerDisplay").textContent = display;
}
