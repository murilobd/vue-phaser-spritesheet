<template>
	<div class="grid sm:col-span-1">
		<label class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
			<slot name="label" />
			<slot />
		</label>
		<div class="my-1 sm:mt-0 sm:col-span-2">
			<div class="rounded-md shadow-sm">
				<!-- On: "bg-indigo-600", Off: "bg-gray-200" -->
				<span role="checkbox" tabindex="0" aria-checked="false" :class="`${status ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline`" @click="toggleStatus">
					<!-- On: "translate-x-5", Off: "translate-x-0" -->
					<span aria-hidden="true" :class="`${status ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200`"></span>
				</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
	name: "ToggleInput",

	props: {
		modelValue: {
			type: Boolean,
			default: false
		}
	},

	setup(props, context) {
		const status = ref(props.modelValue);

		function toggleStatus() {
			status.value = Boolean(!status.value);
			context.emit('update:modelValue', status.value);
		}

		return { status, toggleStatus };
	}
});
</script>

<style>

</style>