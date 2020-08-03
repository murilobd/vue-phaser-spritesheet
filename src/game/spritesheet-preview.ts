import "phaser";

export default class SpritesheetPreview extends Phaser.Scene {
	public _img: string;

	constructor(img: string) {
		super("spritesheet-preview"); // name of the scene
		this._img = img;
	}

	create() {
		this.textures.addBase64("userImage", this._img);
		var shardsImg = new Image();
		shardsImg.onload = () => {
			this.imageLoaded();
		};
		shardsImg.src = this._img;
	}

	imageLoaded() {
		const userImage = this.add.image(300, 50, "userImage");
		this.tweens.add({
			targets: userImage,
			y: 350,
			duration: 1500,
			ease: "Sine.inOut",
			yoyo: true,
			repeat: -1,
		});
	}
}
