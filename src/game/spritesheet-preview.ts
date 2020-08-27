import "phaser";
import SpriteConfiguration from "../interfaces/SpriteConfiguration";
import eventbus from "../eventbus";

export default class SpritesheetPreview extends Phaser.Scene {
	public _img: string;
	public _spriteConfiguration: SpriteConfiguration;
	public _imgShard: HTMLImageElement;
	public _player: any;
	public maxFrameHeight = 0;

	constructor(img: string, spriteConfiguration: SpriteConfiguration) {
		super("spritesheet-preview"); // name of the scene
		this._spriteConfiguration = spriteConfiguration;
		this._img = img;
		this._imgShard = new Image();

		// whenever a configuration for the spritesheet is changed, it will listen here the event and apply it
		eventbus.addListener(
			"changed_config",
			(newSpriteConfiguration: SpriteConfiguration) => {
				console.log("received configuration", newSpriteConfiguration);
				this.imageLoaded(newSpriteConfiguration, true);
			},
		);
	}

	create() {
		// reference: https://supernapie.com/blog/loading-assets-as-data-uri-in-phaser-3/
		this.textures.addBase64("userImage", this._img);
		var shardsImg = new Image();
		shardsImg.onload = () => {
			this._imgShard = shardsImg;
			this.maxFrameHeight = shardsImg.height;
			this.imageLoaded(this._spriteConfiguration);
		};
		shardsImg.src = this._img;
	}

	imageLoaded(config: SpriteConfiguration, isUpdate: Boolean = false) {
		if (isUpdate) {
			this._player.destroy();
			this.textures.remove("userImageSpritesheet");
			this.anims.remove("defaultAnimation");
		}
		this.textures.addSpriteSheet("userImageSpritesheet", this._imgShard, {
			frameWidth: config.frameWidth,
			// If frameHeight > image height, it breaks
			frameHeight: Math.min(
				this.maxFrameHeight,
				config.frameHeight || config.frameWidth,
			),
		});
		this._player = this.add
			.sprite(100, 50, "userImageSpritesheet")
			.setScale(0.3);

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
		this._player.anims.play("defaultAnimation");
	}
}
