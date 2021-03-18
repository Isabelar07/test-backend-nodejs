import { CategoryDataBase } from "../data/CategoryDataBase";
import { CustomError } from "../error/CustomError";
import { Category } from "../model/Category";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class CategoryBusiness {

    async create(category: string, token: string): Promise<void> {

        try {

            if (!category) {
                throw new CustomError(417, " Please fill in the category field")
            }

            const idGenerator = new IdGenerator() 
            const id = idGenerator.generate()

            const authenticator = new Authenticator()
            const verifiedToken = authenticator.getTokenData(token)

            if (!verifiedToken) {
                throw new CustomError(401, "please log in to register a category")
            }

            const newCategory = {
                id,
                category,
            }

            const categoryDataBase = new CategoryDataBase()
            await categoryDataBase.insertCategory(newCategory)

        } catch (error) {
            throw new CustomError(400, error.message);
        }
    } 

    async getCategory(token: string): Promise<Category[]> {

        try {

            const authenticator = new Authenticator()
            const verifiedToken = authenticator.getTokenData(token);

            if (!verifiedToken) {
                throw new CustomError(401, "please log in to register a category")
            }

            const categoryDataBase = new CategoryDataBase()
            const categories: Category[] = await categoryDataBase.getCategory();

            return categories

        } catch (error) {
            throw new CustomError(400, error.message);
        }
    }
}