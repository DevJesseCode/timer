class Timer {
	constructor(durationInput, startButton, pauseButton, callbacks) {
		this.durationInput = durationInput;
		this.startButton = startButton;
		this.pauseButton = pauseButton;
		if (callbacks) {
			const { onStart, onTick, onComplete } = callbacks;
			this.onStart = onStart;
			this.onTick = onTick;
			this.onComplete = onComplete;
		}

		this.startButton.addEventListener("click", this.start);
		this.pauseButton.addEventListener("click", this.pause);
	}

	start = () => {
		this.onStart?.call(this, this.timeRemaining);
		this.interval = setInterval(this.tick, 10);
	};

	pause = () => {
		clearInterval(this.interval);
	};

	tick = () => {
		if (this.timeRemaining <= 0) {
			this.pause();
			this.onComplete?.call(this);
		} else {
			this.timeRemaining = this.timeRemaining - 0.01;
			this.onTick?.call(this, this.timeRemaining);
		}
	};

	get timeRemaining() {
		return parseFloat(this.durationInput.value);
	}

	set timeRemaining(time) {
		this.durationInput.value = time.toFixed(2);
	}
}
