import "phaser";
import logo from "../assets/phaser3-logo.png";

export default class Demo extends Phaser.Scene {
	constructor() {
		super("demo"); // name of the scene
	}

	preload() {
		this.load.image("logo", logo);
	}

	create() {
		const logo = this.add.image(400, 70, "logo");
		this.tweens.add({
			targets: logo,
			y: 350,
			duration: 1500,
			ease: "Sine.inOut",
			yoyo: true,
			repeat: -1,
		});
	}
}
