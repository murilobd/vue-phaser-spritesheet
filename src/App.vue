<template>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="max-w-3xl mx-auto">
			<FileImporter />
		</div>
	</div>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<Game />
	</div>
</template>

<script>
import FileImporter from "./components/FileImporter.vue";
import Game from "./components/Game.vue";
import { defineComponent } from "vue";

export default defineComponent({
	name: "App",
	components: {
		FileImporter,
		Game,
	},
});
</script>
