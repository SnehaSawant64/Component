const clock = document.createElement('template');
clock.innerHTML = `
<div class="container">
	<div class="clock">
		<img id="hourHand" class="hands" src="images/hour_hand.png" alt="">
		<img id="minuteHand" class="hands" src="images/minute_hand.png" alt="">
		<img id="secondHand" class="hands" src="images/second_hand.png" alt="">
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
	background: url(images/clock_face.jpg);
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
 * getClock is a web component for which will automatically provide
 *  an analog clock to user
 *
 *
 *
 * @class getClock
 * @extends {HTMLElement}
 */
class getClock extends HTMLElement {

	constructor() {
		super();
		var date = new Date();
		var hour = date.getHours() % 12; // 0 - 23
		var minute = date.getMinutes();
		var second = date.getSeconds();
	}

	connectedCallback() {
		const shadow = this.attachShadow({ mode: 'open' });
		shadow.appendChild(clock.content.cloneNode(true));

		var hourDeg = (this.hour * 30) + (0.5 * this.minute); // every hour, 30 deg. 30 / 60
		var minuteDeg = (this.minute * 6) + (0.1 * this.second); // every minute, 6 deg. 6 / 60
		var secondDeg = this.second * 6; // 360 / 60

		shadow.getElementById('hourHand').style.transform = 'rotate(' + hourDeg + 'deg)';
		shadow.getElementById('minuteHand').style.transform = 'rotate(' + minuteDeg + 'deg)';
		shadow.getElementById('secondHand').style.transform = 'rotate(' + secondDeg + 'deg)';

		setTimeout(this.connectedCallback(), 1000);
	}
}

window.customElements.define('clock-analog', getClock);
