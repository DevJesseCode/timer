class Timer {
	constructor(duration_input, start_button, pause_button) {
		this.duration = duration_input;
		this.start_button = start_button;
		this.pause_button = pause_button;
		this.start_button.addEventListener("click", this.start);
		this.pause_button.addEventListener("click", this.pause);
		this.countdown_track_animation = "timer durations linear 0s 1 forwards";
		this.countdown_bulb_animation = "change-color durations linear 0s 1 forwards";
	}

	start = () => {
		const { duration, countdown_bulb_animation, countdown_track_animation } = this;
		this.timer_duration =
			this.timer_duration === undefined
				? duration.value
				: this.timer_duration - this.elapsed_time === 0 || this.timer_duration - this.elapsed_time === 1
				? duration.value
				: this.timer_duration;
		this.timer_duration = this.completed ? duration.value : this.timer_duration;
		this.completed = false;
		this.elapsed_time;
		if (!this.elapsed_time) {
			countdownTracker.style.animation = countdown_track_animation.replace("duration", this.timer_duration);
			timerBulb.style.animation = countdown_bulb_animation.replace("duration", this.timer_duration);
		} else {
			countdownTracker.style.animationPlayState = "running";
			timerBulb.style.animationPlayState = "running";
		}
		// this.tick();
		this.timer = setInterval(this.tick, 1000);
		console.log(this);
	};

	pause = () => {
		clearInterval(this.timer);
		countdownTracker.style.animationPlayState = "paused";
		timerBulb.style.animationPlayState = "paused";
		this.completed = false;
	};

	tick = () => {
		if (this.elapsed_time === undefined) {
			this.elapsed_time = 0;
		}
		this.elapsed_time++;
		this.duration.value = this.timer_duration - this.elapsed_time;
		if (this.timer_duration - this.elapsed_time === 0) {
			setTimeout(() => {
				this.duration.value = this.timer_duration;
				this.elapsed_time = 0;
				clearInterval(this.timer);
				countdownTracker.style.animation = "";
				timerBulb.style.animation = "";
				countdownTracker.style.animationPlayState = "";
				timerBulb.style.animationPlayState = "";
			}, 750);
			for (let index = 1; index < 9; index++) {
				setTimeout(() => {
					document.querySelector("#timer").style.borderColor = index % 2 ? "white" : "black";
					document.body.style.backgroundColor = index % 2 ? "black" : "white";
				}, 100 * index);
			}
			// this.duration.value = this.timer_duration;
			// this.elapsed_time = 0;
			// clearInterval(this.timer);
			// countdownTracker.style.animation = "";
			// timerBulb.style.animation = "";
			// countdownTracker.style.animationPlayState = "";
			// timerBulb.style.animationPlayState = "";
		}
		this.completed = true;
	};
}

const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const countdownTracker = document.querySelector("#countdown-tracker");
const timerBulb = document.querySelector(".timer-bulb");
const timer = new Timer(durationInput, startButton, pauseButton);
const resize_function = () => {
	for (const element of document.querySelectorAll("button")) {
		element.style.height = `${element.clientWidth}px`;
	}
	document.querySelector("#duration").style.marginTop =
		(document.querySelector("#timer").clientHeight -
			(document.querySelector("#duration").clientHeight + document.querySelector("button").clientHeight + 10)) /
			2 +
		"px";
	document.querySelector("#button-container").style.marginLeft =
		(document.querySelector("#timer").clientWidth - document.querySelector("#button-container").clientWidth) / 2 +
		"px";
};

window.onresize = resize_function;
window.onkeydown = (e) => {
	switch (e.key) {
		case "s":
			timer.start();
			break;
		case "p":
			timer.pause();
		default:
			break;
	}
};
resize_function();
