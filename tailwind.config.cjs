const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	theme: {
		extend: {
			fontFamily: {
				spacegrotesk: ['Space Grotesk', 'system-ui'],
				inter: ['Inter', 'system-ui']
			},
			colors: {
				primary: '#1953ff',
				secondary: '#EEF7FF'
			}
		}
	},

	plugins: [require('flowbite/plugin')],
	darkMode: 'class'
};

module.exports = config;
