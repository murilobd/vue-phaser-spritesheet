import "phaser";
import SpritesheetPreview from "./spritesheet-preview";

export default function game(
	containerId: string = "gameContainer",
	img: string,
): Phaser.Game {
	return new Phaser.Game({
		type: Phaser.AUTO,
		backgroundColor: "#125555",
		width: 800,
		height: 400,
		parent: containerId,
		scene: new SpritesheetPreview(img),
	});
}
