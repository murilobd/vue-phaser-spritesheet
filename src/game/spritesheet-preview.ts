import "phaser";
import SpriteConfiguration from "../interfaces/SpriteConfiguration";
import eventbus from "../eventbus";

interface CanvasSize {
	height: number;
	width: number;
}

export default class SpritesheetPreview extends Phaser.Scene {
	private img: string;
	private spriteConfiguration: SpriteConfiguration;
	private imgShard: HTMLImageElement;
	private player: any;
	private maxFrameHeight = 0;
	private canvasSize: CanvasSize = { height: 0, width: 0 };

	constructor(img: string, spriteConfiguration: SpriteConfiguration) {
		super("spritesheet-preview"); // name of the scene
		this.spriteConfiguration = spriteConfiguration;
		this.img = img;
		this.imgShard = new Image();

		// whenever a configuration for the spritesheet is changed, it will listen here the event and apply it
		eventbus.addListener(
			"changed_config",
			(newSpriteConfiguration: SpriteConfiguration) => {
				this.imageLoaded(newSpriteConfiguration, true);
			},
		);
	}

	init(): void {
		this.canvasSize = {
			width: this.sys.canvas.width,
			height: this.sys.canvas.height,
		};
	}

	create() {
		// reference: https://supernapie.com/blog/loading-assets-as-data-uri-in-phaser-3/
		this.textures.addBase64("userImage", this.img);
		var shardsImg = new Image();
		shardsImg.onload = () => {
			this.imgShard = shardsImg;
			this.maxFrameHeight = shardsImg.height;
			this.imageLoaded(this.spriteConfiguration);
		};
		shardsImg.src = this.img;
	}

	imageLoaded(config: SpriteConfiguration, isUpdate: Boolean = false) {
		if (isUpdate) {
			this.player.destroy();
			this.textures.remove("userImageSpritesheet");
			this.anims.remove("defaultAnimation");
		}

		// If frameHeight > image height, it breaks
		const frameHeight = Math.min(
			this.maxFrameHeight,
			config.frameHeight || config.frameWidth,
		);
		const frameWidth = config.frameWidth <= 1 ? 1 : config.frameWidth;
		this.textures.addSpriteSheet("userImageSpritesheet", this.imgShard, {
			frameWidth: frameWidth,
			frameHeight: frameHeight,
		});

		this.player = this.add
			.sprite(0, 0, "userImageSpritesheet")
			.setScale(this.calculatePlayerScale(frameHeight, frameWidth))
			.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);

		this.anims.create({
			key: "defaultAnimation",
			frames: this.anims.generateFrameNumbers("userImageSpritesheet", {
				start: config.startFrame,
				end: config.endFrame,
			}),
			frameRate: config.frameRate || 10,
			repeat: config.loop ? -1 : 0,
			showOnStart: true,
			yoyo: config.yoyo || false,
		});
		this.player.anims.play("defaultAnimation");
	}

	/**
	 * Calculate scale to display spritesheet based on frame sizes and canvas size
	 *
	 * @param frameHeight {number} Sprite frame height
	 * @param frameWidth {number} Sprite frame width
	 */
	calculatePlayerScale(frameHeight: number, frameWidth: number): number {
		let heightProportion = this.canvasSize.height / frameHeight;
		let widthProportion = this.canvasSize.width / frameWidth;
		return Math.min(1, Math.min(heightProportion, widthProportion) * 0.95); //rescale only if bigger than screen
	}
}
