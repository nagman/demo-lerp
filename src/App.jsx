import React, { Component, createRef } from "react";
import { lerp } from "./utils/maths";

const SMOOTH_FACTOR = 0.1;

class App extends Component {
	x = { prev: 0, next: 0 };
	y = { prev: 0, next: 0 };
	rafId = undefined;
	imgRef = createRef();

	componentDidMount() {
		window.addEventListener("mousemove", this.handleMouseMove);
	}

	componentWillUnmount() {
		window.removeEventListener("mousemove", this.handleMouseMove);
	}

	handleMouseMove = ({ clientX, clientY }) => {
		this.x.next = clientX;
		this.y.next = clientY;

		if (this.rafId === undefined) {
			this.rafId = requestAnimationFrame(this.raf);
		}
	};

	raf = () => {
		// lerp
		this.x.prev = lerp(this.x.prev, this.x.next, SMOOTH_FACTOR);
		this.y.prev = lerp(this.y.prev, this.y.next, SMOOTH_FACTOR);

		// move element
		this.imgRef.current.style.setProperty("--x", this.x.prev + "px");
		this.imgRef.current.style.setProperty("--y", this.y.prev + "px");

		// the loop
		if (Math.abs(this.y.prev - this.y.next) < 0.1) this.stopLoop();
		else this.runLoop();
	};

	runLoop() {
		this.rafId = requestAnimationFrame(this.raf);
	}

	stopLoop() {
		cancelAnimationFrame(this.rafId);
		this.rafId = undefined;
	}

	render() {
		return (
			<div className="App">
				<img
					ref={this.imgRef}
					className="img"
					src="https://picsum.photos/200"
				/>
			</div>
		);
	}
}

export default App;
