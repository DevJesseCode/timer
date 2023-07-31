const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const timerCircle = document.querySelector("#timer-circle");
const perimeter = 2 * Math.PI * timerCircle.getAttribute("r");
let currentOffset = 0;
let duration;
const timer = new Timer(durationInput, startButton, pauseButton, {
	onStart(totalDuration) {
		duration = totalDuration;
	},
	onTick(timeRemaining) {
		timerCircle.setAttribute("stroke-dashoffset", (perimeter * timeRemaining) / duration - perimeter);
	},
	onComplete() {
		console.log("The timer is complete!");
	},
});

timerCircle.setAttribute("stroke-dasharray", perimeter);
durationInput.value = 30;

