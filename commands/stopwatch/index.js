module.exports = {
  description: '',
  usage: '',
  aliases: ['storage'],
	db: null,
	init(opts) {
		this.db = opts.db.self(opts).data;
		this.resetStopwatch();
	},
	execute(opts) {
		if (opts.args.start) {
			this.resetStopwatch();
			this.startStopwatch();
		}else if(opts.args.stop) {
			this.stopStopwatch();
		}

		let stopwatch = this.getStopwatch();
		let message = `:stopwatch: ${this.msToTime(stopwatch.duration)}`;

		if(!stopwatch.isRunning) {
			message += `\n:pause_button: On pause`;
		}
		
		opts.event.channel.send(new opts.Discord.MessageEmbed().setTitle(message).setColor(6901247))	
	
	},
	resetStopwatch(){
		this.db.stopwach = {
			startTime: null,
			stopTime: null,
			duration: null,
			isRunning: null,
		}
	},
	startStopwatch(){
		this.db.stopwach.startTime = Date.now();
	},
	stopStopwatch(){
		this.db.stopwach.stopTime = Date.now();
	},
	getStopwatch(){
		if(this.db.stopwach.stopTime) {
			this.db.stopwach.duration = this.db.stopwach.stopTime - this.db.stopwach.startTime;
			this.db.stopwach.isRunning = false;
		}else{
			this.db.stopwach.duration = Date.now() - this.db.stopwach.startTime;
			this.db.stopwach.isRunning = true;
		}
		return this.db.stopwach;
	},
	msToTime(duration) {
		var milliseconds = parseInt((duration % 1000) / 100),
			seconds = Math.floor((duration / 1000) % 60),
			minutes = Math.floor((duration / (1000 * 60)) % 60),
			hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
	
		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;
	
		return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
	}
};