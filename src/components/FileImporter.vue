<template>	
	<div>
		<div
			class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start"
		>
			<label
				for="image"
				class="block text-sm leading-5 font-medium text-gray-700"
			>
				Image
			</label>
			<div class="mt-2 sm:mt-0 sm:col-span-2">
				<div class="flex items-center">
					<span class="rounded-md shadow-sm">
						<input
							id="image"
							:disabled="blockImporter"
							type="file"
							:class="`${blockImporter ? 'cursor-not-allowed' : 'cursor-pointer'} absolute block opacity-0 pin-r pin-t`"
							@change="
								selectedImage($event.target.files[0])
							"
							accept="image/png"
						/>
						<button
							type="button"
							:class="`${blockImporter ? 'cursor-not-allowed' : 'cursor-pointer'} py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out`"
						>
							{{ filename }}
						</button>
					</span>
				</div>
			</div>
		</div>
		<div class="mt-2 border border-gray-300 p-2 rounded-lg" v-if="imagePreview">
			<img :src="imagePreview" alt="image preview" class="flex-auto object-center max-h-20" />
		</div>
	</div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

async function getImagePreview(file: File): Promise<String | ArrayBuffer | null> {
	return new Promise(resolve => {
		// https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file); // convert to base64 string
		fileReader.onload = function() {
			resolve(fileReader.result);
		};
	})
}

async function getImageHeight(file: File): Promise<Number> {
	return new Promise(resolve => {
		const img = new Image();
		img.onload = function<Image>() {
			resolve(this.height);
		}
		img.src = window.URL.createObjectURL(file);
	})
}

export default defineComponent({
	props: {
		modelValue: null,
		blockImporter: Boolean
	},
	setup(props, context) {
		const filename = ref("Select");
		const imagePreview = ref();

		async function selectedImage(file: File) {
			filename.value = file.name;
			imagePreview.value = await getImagePreview(file);
			context.emit("update:modelValue", imagePreview);
			
			// emit image height to auto fill to user
			const imageHeight = await getImageHeight(file);
			context.emit("imageHeight", imageHeight);
		}

		return { filename, selectedImage, imagePreview };
	},
});
</script>
