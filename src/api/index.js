import express from 'express'
import logger from 'config/logger'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => logger.info(`Listening on port ${port}!`))
