export default interface SpriteConfiguration {
	frameWidth: number;
	frameHeight?: number;
	startFrame: number;
	endFrame: number;
	frameRate?: number;
	loop?: boolean;
	yoyo?: boolean;
}
