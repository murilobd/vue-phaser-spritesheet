<template>
	<!-- <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5"> -->
	<div class="grid sm:col-span-1">
		<label class="block text-sm font-medium leading-5 text-gray-700"><!-- sm:mt-px sm:pt-2"> -->
			<slot name="label" />
			<slot />
		</label>
		<!-- <div class="my-1 sm:mt-0 sm:col-span-2"> -->
		<div class="mt-1 rounded shadow-sm">
			<!-- <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs"> -->
				<input 
					:type="type"
					:value="modelValue"
					@input="updateModelValue($event.target.value)"
					class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
			<!-- </div> -->
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	name: "Input",
	props: {
		type: {
			type: String,
			default: "text"
		},
		modelValue: null
	},
	setup(props, context) {
		function updateModelValue(value) {
			let typedValue = value;
			if (props.type === "number") {
				if (Number.isNaN(value)) {
					throw new Error("Number invalid");
				}
				typedValue = Number(value);
			}
			context.emit('update:modelValue', typedValue);
		}
		return { updateModelValue };
	}
});
</script>

<style>

</style>