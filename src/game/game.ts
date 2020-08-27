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
			mode: Phaser.Scale.RESIZE,
			parent: containerId,
			width: 800,
			height: 400,
		},
		// parent: containerId,
		scene: new SpritesheetPreview(img, spriteConfiguration),
	});
}
