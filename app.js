let startTime;
let cancelId;
let currentMode = "stopwatch";
let countdownInterval;

let savedTime = 0; //stopwatch
// Stopwatch display values
let stopwatchMinutes = "00";
let stopwatchSeconds = "00";
let stopwatchHundredths = "00";

let totalTime = 0; //timer
// Timer display values
let countdownHours = "00";
let countdownMinutes = "00";
let countdownSeconds = "00";

let isMuted = true;

let stopwatchRunning = false;
let timerRunning = false;

const volumeButton = document.querySelector(".volume-button");
const icon = document.querySelector("#icon");
const mute = document.querySelector("#mute");
const maximizeButton = document.querySelector(".max-btn");

const displayHours = document.querySelector(".timer_minutes");
const displayMinutes = document.querySelector(".timer_seconds");
const displaySeconds = document.querySelector(".timer_milliseconds");

const buttons = document.querySelectorAll(".btn");
const modeButtons = document.querySelectorAll(".mode-btn");
const countdown = document.querySelectorAll(".countdown");
const timerDisplay = document.querySelector("#timer");
const timerButton = document.querySelector(".timer-button");

const setTime = document.querySelector(".setTime");
const stopwatchButton = document.querySelector(".stopwatch-button");

const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const resetButton = document.querySelector(".reset");

modeButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    modeButtons.forEach((b) => {
      b.classList.remove("active");
    });

    this.classList.add("active");
  });
});

timerButton.addEventListener("click", function () {
  currentMode = "timer";

  displayHours.contentEditable = true;
displayMinutes.contentEditable = true;
displaySeconds.contentEditable = true;

  renderTimer();
});

displayHours.addEventListener("input", validateTimerInput);
displayMinutes.addEventListener("input", validateTimerInput);
displaySeconds.addEventListener("input", validateTimerInput);

function validateTimerInput(event) {
  let value = event.target.textContent;

  // Remove letters
  value = value.replace(/\D/g, "");

  // Limit digits
  if (event.target === displayHours || event.target === displayMinutes) {
    value = value.slice(0, 2);
  }

  if (event.target === displaySeconds) {
    value = value.slice(0, 2);
  }

  // Seconds cannot exceed 59
  if (
    event.target === displayMinutes ||
    event.target === displaySeconds
  ) {
    let num = parseInt(value) || 0;

    if (num > 59) {
      value = "59";
    }
  }

  event.target.textContent = value;
}

function renderStopwatch() {
  displayHours.innerHTML = stopwatchMinutes;
  displayMinutes.innerHTML = stopwatchSeconds;
  displaySeconds.innerHTML = stopwatchHundredths;
}

function renderTimer() {
  displayHours.innerHTML = countdownHours;
  displayMinutes.innerHTML = countdownMinutes;
  displaySeconds.innerHTML = countdownSeconds;
}


stopwatchButton.addEventListener("click", function () {
  currentMode = "stopwatch";
  renderStopwatch();

  displayHours.contentEditable = false;
  displayMinutes.contentEditable = false;
  displaySeconds.contentEditable = false;
});

timerDisplay.addEventListener("blur", function () {
  if (currentMode !== "timer") return;

  const timeText = timerDisplay.textContent.trim().replace(/\s/g, "");

  const parts = timeText.split(":");

const hours = parseInt(parts[0]) || 0;
const minutes = parseInt(parts[1]) || 0;
const seconds = parseInt(parts[2]) || 0;

totalTime = hours * 3600 + minutes * 60 + seconds;
});

startButton.addEventListener("click", function () {
  if (currentMode === "stopwatch") {
    if (!stopwatchRunning) {
      stopwatchRunning = true;
      startTime = Date.now();
      cancelId = requestAnimationFrame(updateTimer);
    }
  } else if (currentMode === "timer") {
    if (timerRunning) return;
    timerRunning = true;

    displayHours.contentEditable = false;
    displayMinutes.contentEditable = false;
    displaySeconds.contentEditable = false;

    const timerParts = timerDisplay.textContent
      .trim()
      .replace(/\s/g, "")
      .split(":");

    const hours = parseInt(timerParts[0]) || 0;
    const minutes = parseInt(timerParts[1]) || 0;
    const seconds = parseInt(timerParts[2]) || 0;

    totalTime = hours * 3600 + minutes * 60 + seconds;

    clearInterval(countdownInterval);

    updateCountdown(); // update immediately

    countdownInterval = setInterval(updateCountdown, 1000);
  }
});

stopButton.addEventListener("click", function () {
  if (currentMode === "stopwatch") {
    savedTime = savedTime + (Date.now() - startTime);
    cancelAnimationFrame(cancelId);
    stopwatchRunning = false;
  } else if (currentMode === "timer") {
    clearInterval(countdownInterval);
    timerRunning = false;

    displayHours.contentEditable = true;
    displayMinutes.contentEditable = true;
    displaySeconds.contentEditable = true;
  }
});

resetButton.addEventListener("click", function () {

  if (currentMode === "stopwatch") {

    cancelAnimationFrame(cancelId);

    savedTime = 0;

    stopwatchMinutes = "00";
    stopwatchSeconds = "00";
    stopwatchHundredths = "00";

    stopwatchRunning = false;

    renderStopwatch();

  } else if (currentMode === "timer") {

    clearInterval(countdownInterval);

    totalTime = 0;

    countdownHours = "00";
    countdownMinutes = "00";
    countdownSeconds = "00";

    timerRunning = false;

    displayHours.contentEditable = true;
    displayMinutes.contentEditable = true;
    displaySeconds.contentEditable = true;

    renderTimer();
  }

});

function updateTimer() {
  let millisElapsed = savedTime + (Date.now() - startTime);

  let secondsElapsed = millisElapsed / 1000;
  let minutesElapsed = secondsElapsed / 60;

  let minutesText = Math.floor(minutesElapsed);
  let secondsText = Math.floor(secondsElapsed % 60);
  let hundredthsText = Math.floor((millisElapsed % 1000) / 10);

  minutesText = minutesText.toString().padStart(2, "0");
  secondsText = secondsText.toString().padStart(2, "0");
  hundredthsText = hundredthsText.toString().padStart(2, "0");

  stopwatchMinutes = minutesText;
  stopwatchSeconds = secondsText;
  stopwatchHundredths = hundredthsText;

  if (currentMode === "stopwatch") {
    renderStopwatch();
  }

  cancelId = requestAnimationFrame(updateTimer);
}

function updateCountdown() {
  let hours = Math.floor(totalTime / 3600);

  let minutes = Math.floor((totalTime % 3600) / 60);

  let seconds = totalTime % 60;

  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");

countdownHours = hours;
countdownMinutes = minutes;
countdownSeconds = seconds;

  if (currentMode === "timer") {
    renderTimer();
  }

  totalTime--;

  if (totalTime < 0) {
    clearInterval(countdownInterval);
    timerRunning = false;

countdownHours = "00";
countdownMinutes = "00";
countdownSeconds = "00";

renderTimer();

alert("Time is up!");

    renderTimer();
  }
}

mute.addEventListener("click", function () {
  if (isMuted) {
    volumeButton.classList.remove("active");
    icon.classList.remove("fa-volume-up");
    icon.classList.add("fa-volume-xmark");
    isMuted = false;
  } else {
    volumeButton.classList.add("active");
    icon.classList.remove("fa-volume-xmark");
    icon.classList.add("fa-volume-up");
    isMuted = true;
  }
});

maximizeButton.addEventListener("click", function () {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    maximizeButton.classList.add("active");
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      maximizeButton.classList.remove("active");
    }
  }
});
