import { Application, Router } from 'https://deno.land/x/oak/mod.ts'

import { ProductController } from './controllers/productController.ts'

const router = new Router()
const PORT = 8000
const app = new Application()

const productController = new ProductController()

router.get('/api/v1/products', productController.getProducts)
      .get('/api/v1/products/:id', productController.getProduct)
      .post('/api/v1/products', productController.addProduct)
      .patch('/api/v1/products/:id', productController.updateProduct)
      .delete('/api/v1/product/:id', productController.deleteProduct)

app.use(router.routes())
app.use(router.allowedMethods())

console.log(`Server running on port ${PORT}`)

await app.listen({port: PORT})

