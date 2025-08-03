let timerInterval;
let animationInterval;
let timeLeft = 0;
let isPaused = false;
let currentCoffeeFrame = 0;

const coffeeFrames = [
  document.getElementById("pastryFrame1"),

];
const staticCoffee = document.getElementById("staticCoffee");
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

  staticCoffee.hidden = true;
  coffeeFrames.forEach(frame => frame.hidden = true);

  animationInterval = setInterval(() => {
    coffeeFrames.forEach(frame => frame.hidden = true);
    coffeeFrames[currentCoffeeFrame].hidden = false;
    currentCoffeeFrame = (currentCoffeeFrame + 1) % coffeeFrames.length;
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
        staticCoffee.hidden = false;
        coffeeFrames.forEach(frame => frame.hidden = true);
        alert("Your pastry is ready! ☕");
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
      coffeeFrames.forEach(frame => frame.hidden = true);
      coffeeFrames[currentCoffeeFrame].hidden = false;
      currentCoffeeFrame = (currentCoffeeFrame + 1) % coffeeFrames.length;
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
  staticCoffee.hidden = false;
  coffeeFrames.forEach(frame => frame.hidden = true);
});

function updateDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  document.getElementById("timerDisplay").textContent = display;
}
