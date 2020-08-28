import "phaser";
import SpritesheetPreview from "./spritesheet-preview";
import SpriteConfiguration from "../interfaces/SpriteConfiguration";

export default function game(
	containerId: string = "gameContainer",
	img: string,
	spriteConfiguration: SpriteConfiguration,
): Phaser.Game {
	return new Phaser.Game({
		type: Phaser.AUTO,
		backgroundColor: "#125555",
		scale: {
			mode: Phaser.Scale.RESIZE, // resize canvas to fit available space
			parent: containerId,
			width: 400,
			height: 400,
		},
		scene: new SpritesheetPreview(img, spriteConfiguration),
	});
}
