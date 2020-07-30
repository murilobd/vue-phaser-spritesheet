import "phaser";
import Demo from "./demo";

export default function game(
	containerId: string = "gameContainer",
): Phaser.Game {
	return new Phaser.Game({
		type: Phaser.AUTO,
		backgroundColor: "#125555",
		width: 800,
		height: 400,
		parent: containerId,
		scene: Demo,
	});
}
