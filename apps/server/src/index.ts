// server/src/index.ts
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello from backend!')
})
app.post('/', (req, res) => {
    res.send('Hello from backend!')
})
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000')
})