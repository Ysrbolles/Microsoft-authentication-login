const config = {
	appId: 'YOUR_APPLICATION_KEY',
	redirectUrl: 'http://localhost:3000',
	scopes: [
		'user.read',
		'calendars.read',
	],
	authority: 'https://login.microsoftonline.com/common/',
}

export default config
