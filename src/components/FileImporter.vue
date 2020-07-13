<template>
	<form class="mt-4">
		<div>
			<div>
				<h3 class="text-lg leading-6 font-medium text-gray-900">File importer</h3>
				<p>Import spritesheet image, adjust it's settings and see how Phaser will render it</p>
			</div>
			<div class="mt-6 sm:mt-5">
				<div
					class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
				>
					<label
						for="cover_photo"
						class="block text-sm leading-5 font-medium text-gray-700 sm:mt-px sm:pt-2"
					>Cover photo</label>
					<div class="mt-2 sm:mt-0 sm:col-span-2">
						<div
							class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
						>
							<div class="text-center">
								<svg
									class="mx-auto h-12 w-12 text-gray-400"
									stroke="currentColor"
									fill="none"
									viewBox="0 0 48 48"
								>
									<path
										d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
								<p class="mt-1 text-sm text-gray-600">
									<button
										type="button"
										class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
									>Upload a PNG file</button>
									or drag and drop
								</p>
								<p class="mt-1 text-xs text-gray-500">PNG up to 10MB</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="mt-8 border-t border-gray-200 pt-5">
				<div class="flex justify-end">
					<span class="inline-flex rounded-md shadow-sm">
						<button
							type="button"
							class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
						>Reset</button>
					</span>
					<span class="ml-3 inline-flex rounded-md shadow-sm">
						<button
							type="submit"
							class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
						>Run</button>
					</span>
				</div>
			</div>
		</div>
	</form>
</template>

<script>
export default {
	name: "FileImporter",
};
</script>