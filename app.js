let startTime;
let cancelId;
let savedTime = 0; //stopwatch 
let currentMode = "stopwatch";
let countdownInterval;
let totalTime = 0; //timer 

let timerMinutesSaved = "00";
let timerSecondsSaved = "00";
let timerMillisecondsSaved = "00";

let isMuted = true;

const volumeButton = document.querySelector(".volume-button");
const icon = document.querySelector("#icon");
const mute = document.querySelector("#mute");
const maximizeButton = document.querySelector(".max-btn");

const timerMilliseconds = document.querySelector(".timer_milliseconds");
const timerSeconds = document.querySelector(".timer_seconds");
const timerMinutes = document.querySelector(".timer_minutes");

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

  cancelAnimationFrame(cancelId);

  timerMinutes.contentEditable = true;
  timerSeconds.contentEditable = true;
  timerMilliseconds.contentEditable = true;

  timerMinutes.innerHTML = timerMinutesSaved;
  timerSeconds.innerHTML = timerSecondsSaved;
  timerMilliseconds.innerHTML = timerMillisecondsSaved;
});

timerMinutes.addEventListener("input", validateTimerInput);
timerSeconds.addEventListener("input", validateTimerInput);
timerMilliseconds.addEventListener("input", validateTimerInput);

function validateTimerInput(event) {
  let value = event.target.textContent;

  // Remove letters
  value = value.replace(/\D/g, "");

  // Limit digits
  if (
    event.target === timerMinutes ||
    event.target === timerSeconds
  ) {
    value = value.slice(0, 2);
  }

  if (event.target === timerMilliseconds) {
    value = value.slice(0, 2);
  }

  // Seconds cannot exceed 59
if (
  event.target === timerSeconds ||
  event.target === timerMilliseconds
) {
  let num = parseInt(value) || 0;

  if (num > 59) {
    value = "59";
  }
}

  event.target.textContent = value;
}

stopwatchButton.addEventListener("click", function () {
  currentMode = "stopwatch";

  timerMinutesSaved = timerMinutes.textContent;
  timerSecondsSaved = timerSeconds.textContent;
  timerMillisecondsSaved = timerMilliseconds.textContent;

  timerMinutes.contentEditable = false;
  timerSeconds.contentEditable = false;
  timerMilliseconds.contentEditable = false;
let hundredthsText = Math.floor((millisElapsed % 1000) / 10);
  clearInterval(countdownInterval);

  displayStopwatchTime();
});

timerDisplay.addEventListener("blur", function () {
  if (currentMode !== "timer") return;

  const timeText = timerDisplay.textContent.trim().replace(/\s/g, "");

  const parts = timeText.split(":");

  const minutes = parseInt(parts[0]) || 0;
  const seconds = parseInt(parts[1]) || 0;
  const milliseconds = parseInt(parts[2]) || 0;

  totalTime = minutes * 60 + seconds + milliseconds / 1000;
});

startButton.addEventListener("click", function () {
  if (currentMode === "stopwatch") {
    startTime = Date.now();
    cancelId = requestAnimationFrame(updateTimer);

  } else if (currentMode === "timer") {

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
  } else if (currentMode === "timer") {
    clearInterval(countdownInterval);
  }
});

resetButton.addEventListener("click", function () {
  startTime = Date.now();

  savedTime = 0;
  totalTime = 0;

  cancelAnimationFrame(cancelId);
  clearInterval(countdownInterval);

  timerMilliseconds.innerHTML = "00";
  timerSeconds.innerHTML = "00";
  timerMinutes.innerHTML = "00";
  if (currentMode === "timer") {
    clearInterval(countdownInterval);
  }
});

function displayStopwatchTime() {
  let secondsElapsed = savedTime / 1000;
  let minutesElapsed = secondsElapsed / 60;

  let minutesText = Math.floor(minutesElapsed)
    .toString()
    .padStart(2, "0");

  let secondsText = Math.floor(secondsElapsed % 60)
    .toString()
    .padStart(2, "0");

  let millisText = Math.floor(savedTime % 1000)
    .toString()
    .padStart(3, "0");

  timerMinutes.innerHTML = minutesText;
  timerSeconds.innerHTML = secondsText;
  timerMilliseconds.innerHTML = millisText;
}

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

  timerMinutes.innerHTML = minutesText;
  timerSeconds.innerHTML = secondsText;
  timerMilliseconds.innerHTML = hundredthsText;

  cancelId = requestAnimationFrame(updateTimer);
}

function updateCountdown() {
  let hours = Math.floor(totalTime / 3600);

  let minutes = Math.floor(
    (totalTime % 3600) / 60
  );

  let seconds = totalTime % 60;

  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");

  timerMinutes.innerHTML = hours;
  timerSeconds.innerHTML = minutes;
  timerMilliseconds.innerHTML = seconds;

  totalTime--;

  if (totalTime < 0) {
    clearInterval(countdownInterval);

    timerMinutes.innerHTML = "00";
    timerSeconds.innerHTML = "00";
    timerMilliseconds.innerHTML = "00";

    alert("Time is up!");
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
