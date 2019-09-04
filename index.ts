import { createServer } from './app'
import { config } from './config'

createServer(config).then(app =>
	app.listen(config.port, () =>
		console.log(`App started on port ${config.port}`)
	)
)
