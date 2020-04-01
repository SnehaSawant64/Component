const clock = document.createElement('template');
clock.innerHTML = `
<div class="container">
	<div class="clock">
			<span id="hour" class="hands"></span>
		 	<span id="minute" class="hands"></span>
		 	<span id="second" class="hands"></span>
	</div>
</div>
<style>
.container {
	display: flex;
	align-items: center;
	justify-content: center;
}
.clock {
	position: relative;
	width: 400px;
	height: 400px;
	background: url(https://raw.githubusercontent.com/SnehaSawant64/webcomponents/master/components/clock-analog/images/clock_face.jpg);
}
.clock:after {
	position: absolute;
	content: '';
	background: #000;
	width: 30px;
	height: 30px;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	border-radius: 50%;
}
.hands {
	position: absolute;
  top: 0;
  left: 0;
}
</style>
`;

/**
 * Clock is a web component for which will automatically provide
 *  an analog clock to user
 *	expected Usage:
 *		<clock-analog>
 *	 	</clock-analog>
 *
 * @class Clock
 * @extends {HTMLElement}
 */
class Clock extends HTMLElement {

	constructor() {
		super();
		var date = new Date();
		this.hour = date.getHours() % 12; // 0 - 23
		this.minute = date.getMinutes();
		this.second = date.getSeconds();
	}

	connectedCallback() {
		const shadow = this.attachShadow({ mode: 'open' });
		shadow.appendChild(clock.content.cloneNode(true));

		window.setInterval(function() {
			console.log("setInterval call");

			console.log(this.hour);
			console.log(this.minute);
			console.log(this.second);

			var hourDeg = (this.hour * 30) + (0.5 * this.minute); // every hour, 30 deg. 30 / 60
			var minuteDeg = (this.minute * 6) + (0.1 * this.second); // every minute, 6 deg. 6 / 60
			var secondDeg = this.second * 6; // 360 / 60

			shadow.getElementById('hour').innerHTML = `<img id="hourHand" class="hands" src="https://raw.githubusercontent.com/SnehaSawant64/webcomponents/master/components/clock-analog/images/hour_hand.png" alt="">`;
			shadow.getElementById('minute').innerHTML = `<img id="minuteHand" class="hands" src="https://raw.githubusercontent.com/SnehaSawant64/webcomponents/master/components/clock-analog/images/minute_hand.png" alt="">`;
			shadow.getElementById('second').innerHTML = `<img id="secondHand" class="hands" src="https://raw.githubusercontent.com/SnehaSawant64/webcomponents/master/components/clock-analog/images/second_hand.png" alt="">`;

			console.log(hourDeg);
			console.log(minuteDeg);
			console.log(secondDeg);

			shadow.getElementById('hourHand').style.transform = 'rotate(' + hourDeg + 'deg)';
			shadow.getElementById('minuteHand').style.transform = 'rotate(' + minuteDeg + 'deg)';
			shadow.getElementById('secondHand').style.transform = 'rotate(' + secondDeg + 'deg)';

		}, 5000);
	}
}

window.customElements.define('clock-analog', Clock);
