<template>
	<div id="gameContainer"></div>
</template>

<script lang="ts">
import Game from "../game/game";

import { onMounted, defineComponent } from "vue";

export default defineComponent({
	name: "Game",
	props: {
		img: null
	},
	setup(props) {
		onMounted(() => {
			Game("gameContainer", props.img);
		});
	},
});
</script>