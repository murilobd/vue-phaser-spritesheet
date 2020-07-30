<template>
	<div id="gameContainer"></div>
</template>

<script lang="ts">
import Game from "../game/game";

import { onMounted, defineComponent } from "vue";

export default defineComponent({
	name: "Game",
	setup() {
		onMounted(() => {
			Game("gameContainer");
		});
	},
});
</script>