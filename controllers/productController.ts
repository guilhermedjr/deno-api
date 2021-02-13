import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import { Product, ProductUpdate } from '../types.ts'
import { products } from '../helpers/dbconnect.ts'

export class ProductController {
    constructor(){}

// @desc Get all products
// @route GET /api/v1/products
public async getProducts({response}: {response:any}) {
    const data = await products.find()
    if (data) {
        response.status = 200
        response.body = {
            success: true,
            data: data
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'No products found'
        }
    }
}

// @desc Get single product
// @route GET /api/v1/products/:id
public async getProduct({params, response} : { params: {id: string}, response: any }) {
    const id = params.id
    const product = await products.findOne({_id : {"$oid" : id}})

    if (product) {
        response.status = 200
        response.body = {
            success: true,
            data: product
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'No product found'
        }
    }
}

// @desc Add product 
// @route POST /api/v1/products
public async addProduct({request, response}: {request: any, response: any}) {
    const body = await request.body()

    if (!request.hasBody) {
        response.status = 400
        response.body = {
            success: false,
            msg: 'No data'
        }
    } else {
        const product : Product = body.value
        await products.insertOne({
            id: ProductController.generateId(),
            name: product.name,
            description: product.description,
            price: product.price

        })
        response.status = 201
        response.body = {
            success: true,
            data: product
        }
    }
}

// @desc Update product
// @route PUT /api/v1/products/:id
public async updateProduct({params, request, response}: {params: {id: string}, request: any, response: any }) {
    const id = params.id

    if (id !== null) {

        if (!request.hasBody) {
            response.status = 400
            response.body = {
                success: false,
                msg: 'No data'
            }
        }
        else {
          const body = await request.body()
          const data : ProductUpdate = {}
        
           if (body.value.name) {
             data["name"] = body.value.name
           }

           if (body.value.description) {
            data["description"] = body.value.description
           }

           if (body.value.price) {
            data["price"] = body.value.price
           }

           const result = await products.updateOne({_id: {"$oid": id}}, {$set: data})

           if (result) {
              response.status = 200
              response.body = {
              success: true,
              data: result
              }
           } else {
               response.status = 404
               response.body = {
                success: false,
                msg: 'Error - not found'
              }
           }
        }
    } else {
        response.body = {
            success: false,
            msg: 'Error - null id'
        }
    }
}

// @desc Delete product
// @route DELETE /api/v1/product/:id
public async deleteProduct({params, response} : {params: {id: string}, response: any}) {
    const id = params.id

    if (id !== null) {
        const result = await products.deleteOne({_id: {"$oid": id}})

        if (result == 1) {
           response.status = 200
           response.body = {
               success: true,
               msg: 'Product removed'
           }
        }
        else if (result == 0) {
           response.status = 404
           response.body = {
               success: false,
               msg: 'Error - not found'
           }
        }
    } else {
        response.body = {
            success: false,
            msg: 'Error - null id'
        }
    }
}

private static generateId() : String {
   return v4.generate()
}

}