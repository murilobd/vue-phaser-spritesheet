const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	purge: ["./index.html", "./src/**/*.vue", "./src/**/*.js"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter var", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	variants: {},
	plugins: [require("@tailwindcss/ui")],
};
