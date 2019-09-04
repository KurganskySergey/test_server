import yargs from 'yargs'

export const argv = yargs
	.option('port', {
		alias: 'p',
		description: 'Define port to run application',
		type: 'number',
	})
	.option('NODE_ENV', {
		alias: 'ne',
		description: 'Define application start enviroment',
		type: 'string',
	})
	.help()
	.alias('help', 'h').argv
