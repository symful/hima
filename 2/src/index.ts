import { Hono } from 'hono'
import kategori from './routes/kategori'
import menu from './routes/menu'

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => {
  return c.text('Canteen Management System API is running!')
})

app.route('/api/kategori', kategori)
app.route('/api/menu', menu)

export default app
