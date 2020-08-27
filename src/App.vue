<template>
	<!-- <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> -->
	<div class="px-4 grid grid-flow-col" style="grid-template-columns: 1fr 2fr">
		<div>
			<div class="max-w-3xl mx-auto">
				<div class="mt-4 sm:border-b sm:border-gray-200 pb-5">
					<h3 class="text-lg leading-6 font-medium text-gray-900">
						Phaser Spritesheet Preview
					</h3>
					<p>
						Import spritesheet image, adjust it's settings and see how
						Phaser will render it
					</p>
				</div>

				<FileImporter v-model="img" :blockImporter="showGame" @imageHeight="setFrameHeight" />
				<div class="grid grid-cols-2 gap-2 mt-1">
					<app-input type="number" v-model="frame.frameHeight">Frame Height</app-input>
					<app-input type="number" v-model="frame.frameWidth">Frame Width</app-input>
				</div>

				<div class="mt-4 sm:border-b sm:border-gray-200 pb-5">
					<h3 class="text-lg leading-6 font-medium text-gray-900">
						Animation configuration
					</h3>
				</div>

				<div class="grid grid-cols-2 gap-2 mt-1">
					<app-input type="number" v-model="frame.startFrame">Frame start</app-input>
					<app-input type="number" v-model="frame.endFrame">Frame end</app-input>
					<app-input type="number" v-model="frame.frameRate">Speed (fps)</app-input>
				</div>
				<div class="grid grid-cols-2 gap-2 mt-1">
					<app-toggle-input v-model="frame.loop">Loop</app-toggle-input>
					<app-toggle-input v-model="frame.yoyo">Yoyo</app-toggle-input>
				</div>
			</div>
			<div class="mt-8 border-t border-gray-200 pt-5">
				<div class="flex justify-end">
					<span class="ml-3 inline-flex rounded-md shadow-sm">
						<button
							type="button"
							@click="runGame"
							:disabled="showGame"
							:class="`inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out ${showGame && 'cursor-not-allowed'}`"
						>
							Run
						</button>
					</span>
				</div>
			</div>
		</div>
		<div class="pl-4 my-4 max-w-full">
			<Game :img="img" :sprite-configuration="frame" v-if="showGame" />
		</div>
	</div>
</template>

<script>
import FileImporter from "./components/FileImporter.vue";
import Game from "./components/Game.vue";
import Input from "./components/Input.vue";
import ToggleInput from "./components/ToggleInput.vue";
import { defineComponent, ref, reactive, toRefs, watch } from "vue";
import eventbus from "./eventbus";

export default defineComponent({
	name: "App",
	setup() {
		const state = reactive({
			img: null,
			frame: {
				frameWidth: 260,
				frameHeight: 280,
				startFrame: 0,
				endFrame: 4,
				frameRate: 10,
				loop: true,
				yoyo: false
			},
			showGame: false
		});

		watch(state.frame, () => {
			const spritesheetConfiguration = {};
			for (const item in state.frame) {
				if (["loop", "yoyo"].includes(item))
					spritesheetConfiguration[item] = Boolean(state.frame[item]);
				else
					spritesheetConfiguration[item] = Number(state.frame[item]);
			}
			eventbus.emit("changed_config", spritesheetConfiguration);
		});

		function setFrameHeight(height) {
			state.frame.frameHeight = height;
		}

		function runGame() {
			state.showGame = true;
		}

		return { ...toRefs(state), setFrameHeight, runGame };
	},
	components: {
		FileImporter,
		Game,
		"app-input": Input,
		"app-toggle-input": ToggleInput
	},
});
</script>
