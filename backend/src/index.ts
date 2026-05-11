import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import routes from './routes'

const app = express()
const PORT = process.env.PORT || 3000

app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})