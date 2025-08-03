let timerInterval;
let animationInterval;
let timeLeft = 0;
let isPaused = false;
let currentTeaFrame = 0;

const teaFrames = [document.getElementById("teaFrame1"), document.getElementById("teaFrame2")];
const staticTea = document.getElementById("staticTea");
const pauseBtn = document.getElementById("pauseTimerBtn");


document.getElementById("startTimerBtn").addEventListener("click", () => {
    const inputMinutes = parseInt(document.getElementById("timerInput").value);

    if (isNaN(inputMinutes) || inputMinutes <= 0) {
        alert("Please enter a valid number of minutes!");
        return;
    }

    clearInterval(timerInterval);
    clearInterval(animationInterval);

    timeLeft = inputMinutes * 60;
    updateDisplay(timeLeft);
    isPaused = false;
    pauseBtn.textContent = "Pause";

    staticTea.hidden = true;
    teaFrames.forEach(frame => frame.hidden = true);

    animationInterval = setInterval(() => {
        teaFrames.forEach(frame => frame.hidden = true);
        teaFrames[currentTeaFrame].hidden = false;
        currentTeaFrame = (currentTeaFrame + 1) % teaFrames.length;
    }, 500);

    startTimer();
});


function startTimer() {
    timerInterval = setInterval(() => {
        if (!isPaused && timeLeft > 0) {
            timeLeft--;
            updateDisplay(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                clearInterval(animationInterval);
                staticTea.hidden = false;
                teaFrames.forEach(frame => frame.hidden = true);
                alert("Your coffee is ready! ☕");
                pauseBtn.textContent = "Pause";
                isPaused = false;
            }
        }
    }, 1000);
}


pauseBtn.addEventListener("click", () => {
    if (timerInterval && !isPaused) {
        isPaused = true;
        clearInterval(timerInterval);
        clearInterval(animationInterval);
        pauseBtn.textContent = "Resume";
    } else if (isPaused && timeLeft > 0) {
        isPaused = false;
        pauseBtn.textContent = "Pause";

        animationInterval = setInterval(() => {
            teaFrames.forEach(frame => frame.hidden = true);
            teaFrames[currentTeaFrame].hidden = false;
            currentTeaFrame = (currentTeaFrame + 1) % teaFrames.length;
        }, 500);

        startTimer();
    }
});


document.getElementById("stopTimerBtn").addEventListener("click", () => {
    clearInterval(timerInterval);
    clearInterval(animationInterval);
    timeLeft = 0;
    isPaused = false;
    updateDisplay(0);
    pauseBtn.textContent = "Pause";
    staticTea.hidden = false;
    teaFrames.forEach(frame => frame.hidden = true);
});


function updateDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const display = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    document.getElementById("timerDisplay").textContent = display;
}
