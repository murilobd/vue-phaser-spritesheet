<template>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="max-w-3xl mx-auto">
			<FileImporter @selectedImage="selectedImage" />
		</div>
	</div>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-2">
		<div class="max-w-3xl mx-auto">
			<Game :img="img" v-if="showGame" />
		</div>
	</div>
</template>

<script>
import FileImporter from "./components/FileImporter.vue";
import Game from "./components/Game.vue";
import { defineComponent, ref, reactive, toRefs } from "vue";

export default defineComponent({
	name: "App",
	setup() {
		const state = reactive({
			img: null,
			showGame: false
		});

		function selectedImage(_img) {
			state.img = _img;
			state.showGame = true;
		}

		return { ...toRefs(state), selectedImage };
	},
	components: {
		FileImporter,
		Game,
	},
});
</script>
