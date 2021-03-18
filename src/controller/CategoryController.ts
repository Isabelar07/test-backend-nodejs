import { Request, Response } from "express";
import { CategoryBusiness } from "../business/CategoryBusiness";

export class CategoryController {

    async createCategory(req: Request, res: Response) {

        try {

            const category = req.body.category;
            const token = req.headers.authorization!;

            const categoryBusiness = new CategoryBusiness()

            await categoryBusiness.create(category, token)

            res.status(201).send({message: "Category created successfully"});

        } catch (error) {
            res.status(error.statusCode).send({ error: error.message });
        }
    }
}