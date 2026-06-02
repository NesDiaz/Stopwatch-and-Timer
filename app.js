let startTime;
let cancelId;
let savedTime = 0;
let currentMode = "stopwatch";
let countdownInterval;
let totalTime = 0;

const timerMilliseconds = document.querySelector(".timer_milliseconds");
const timerSeconds = document.querySelector(".timer_seconds");
const timerMinutes = document.querySelector(".timer_minutes");

const buttons = document.querySelectorAll(".btn");

const modeButtons = document.querySelectorAll(".mode-btn");
modeButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    modeButtons.forEach((b) => {
      b.classList.remove("active");
    });

    this.classList.add("active");
  });
});

const countdown = document.querySelectorAll(".countdown");
const timerDisplay = document.querySelector("#timer");
const timerButton = document.querySelector(".timer-button");
timerButton.addEventListener("click", function () {
  currentMode = "timer";
  
  timerDisplay.contentEditable = true;
});

const setTime = document.querySelector(".setTime");
const stopwatchButton = document.querySelector(".stopwatch-button");
stopwatchButton.addEventListener("click", function () {
  currentMode = "stopwatch";
  
  timerDisplay.contentEditable = false;

});

timerDisplay.addEventListener('blur', function() {
    if (currentMode !== "timer") return;

    const timeText = timerDisplay.textContent.trim().replace(/\s/g, '');;
  
    console.log(timeText);

    const parts = timeText.split(':');
    console.log(parts);


    
    console.log(minutes, seconds, milliseconds);
    totalTime = minutes * 60 + seconds + milliseconds / 1000;

});

const startButton = document.querySelector(".start");
startButton.addEventListener("click", function () {
  if (currentMode === "stopwatch") {
    startTime = Date.now();
    cancelId = requestAnimationFrame(updateTimer);
    
  } else if (currentMode === "timer") {
   
    clearInterval(countdownInterval); 
  countdownInterval = setInterval(updateCountdown, 1000);

const timerParts = timerDisplay.textContent.split(':');

const timerMinutes = parseInt(timerParts[0]) || 0;
const timerSeconds = parseInt(timerParts[1]) || 0;

totalTime = timerMinutes * 60 + timerSeconds;

    console.log(timerMinutes, timerSeconds);

  }
});

const stopButton = document.querySelector(".stop");
stopButton.addEventListener("click", function () {
  if (currentMode === "stopwatch") {
    savedTime = savedTime + (Date.now() - startTime);
    cancelAnimationFrame(cancelId);
  } else if (currentMode === "timer") {
    clearInterval(countdownInterval);
  }
});

const resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", function () {
  startTime = Date.now();

  savedTime = 0;
  totalTime = 0;

  cancelAnimationFrame(cancelId);
 clearInterval(countdownInterval);

  timerMilliseconds.innerHTML = "000";
  timerSeconds.innerHTML = "00";
  timerMinutes.innerHTML = "00";
  if (currentMode === "timer") {
    clearInterval(countdownInterval);
  }
});

function updateTimer() {
  let millisElapsed = savedTime + (Date.now() - startTime);

  let secondsElapsed = millisElapsed / 1000;
  let minutesElapsed = secondsElapsed / 60;

  let minutesText = Math.floor(minutesElapsed);
  let secondsText = Math.floor(secondsElapsed % 60);
  let millisText = millisElapsed % 1000;

  minutesText = minutesText.toString().padStart(2, "0");
  secondsText = secondsText.toString().padStart(2, "0");
  millisText = millisText.toString().padStart(3, "0");

  timerMinutes.innerHTML = minutesText;
  timerSeconds.innerHTML = secondsText;
  timerMilliseconds.innerHTML = millisText;

  cancelId = requestAnimationFrame(updateTimer);
}

function updateCountdown() {
  let minutes = Math.floor(totalTime / 60);
  let seconds = totalTime % 60;

  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");

  timerMinutes.innerHTML = minutes;
  timerSeconds.innerHTML = seconds;
  timerMilliseconds.innerHTML = "000";

  totalTime--;

  if (totalTime < 0) {
    clearInterval(countdownInterval);

    timerMinutes.innerHTML = "00";
    timerSeconds.innerHTML = "00";

    alert("Time is up!");
  }
}

let isMuted = true;

const volumeButton = document.querySelector(".volume-button");
const icon = document.querySelector("#icon");
const mute = document.querySelector("#mute");
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

const maximizeButton = document.querySelector(".max-btn");
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
