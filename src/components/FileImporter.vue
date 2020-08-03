<template>
	<div class="mt-4">
		<div>
			<div>
				<h3 class="text-lg leading-6 font-medium text-gray-900">
					File importer
				</h3>
				<p>
					Import spritesheet image, adjust it's settings and see how
					Phaser will render it
				</p>
			</div>
			<div class="mt-6 sm:mt-5">
				<div
					class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
				>
					<label
						for="photo"
						class="block text-sm leading-5 font-medium text-gray-700"
					>
						Image
					</label>
					<div class="mt-2 sm:mt-0 sm:col-span-2">
						<div class="flex items-center">
							<span class="rounded-md shadow-sm">
								<input
									type="file"
									class="cursor-pointer absolute block opacity-0 pin-r pin-t"
									@change="
										selectedImage($event.target.files[0])
									"
									accept="image/png"
								/>
								<button
									type="button"
									class="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
								>
									{{ filename }}
								</button>
							</span>
						</div>
					</div>
				</div>
				<div class="mt-2 border border-gray-300 p-2 rounded-lg" v-if="imagePreview">
					<img :src="imagePreview" alt="image preview" class=" flex-auto object-center" />
				</div>
			</div>
			<div class="mt-8 border-t border-gray-200 pt-5">
				<div class="flex justify-end">
					<span class="ml-3 inline-flex rounded-md shadow-sm">
						<button
							type="button"
							@click="runGame"
							class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
						>
							Run
						</button>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
export default defineComponent({
	setup(props, context) {
		const filename = ref("Select");
		const imagePreview = ref();

		async function getImagePreview(file: File) {
			return new Promise(resolve => {
				// https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded
				const fileReader = new FileReader();
				fileReader.readAsDataURL(file); // convert to base64 string
				fileReader.onload = function () {
					resolve(fileReader.result);
				};
			})
		}

		async function selectedImage(file: File) {
			filename.value = file.name;
			imagePreview.value = await getImagePreview(file);
		}

		function runGame() {
			context.emit("selectedImage", imagePreview);
		}

		return { filename, selectedImage, imagePreview, runGame };
	},
});
</script>
