import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { ProductInputDTO } from "../model/Product";

export class ProductController {

    async createProduct(req: Request, res: Response) {

        try {

            const token = req.headers.authorization!;
            
            const input: ProductInputDTO = {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category
            }

            const productBusiness = new ProductBusiness()

            await productBusiness.createProduct(input, token)

            res.status(201).send({message: "Product created successfully"});

        } catch (error) {
            res.status(error.statusCode).send({ error: error.message });
        }
    }
}


