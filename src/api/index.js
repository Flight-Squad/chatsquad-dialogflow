import express from 'express'
import logger from 'config/logger'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/hook', (req, res) => {
  logger.info('Request Body', req.body);
  logger.info('Request Params', req.params);
  res.sendStatus(201);
})

app.listen(port, () => logger.info(`Listening on port ${port}!`))
