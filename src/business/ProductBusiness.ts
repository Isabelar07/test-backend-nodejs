import { CategoryDataBase } from "../data/CategoryDataBase"
import { ProductDataBase } from "../data/ProductDataBase"
import { UserDataBase } from "../data/UserDataBase"
import { CustomError } from "../error/CustomError"
import { Category } from "../model/Category"
import { Product, ProductInputDTO } from "../model/Product"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"
import { CategoryBusiness } from "./CategoryBusiness"

export class ProductBusiness {

    async createProduct(product: ProductInputDTO, token: string): Promise<void> {

        try {

            if (!product.title || !product.description || !product.price || !product.category.length) {
                throw new CustomError(417, "Invalid input. Please, fill the fields correctly.")
            }

            const authenticator = new Authenticator()
            const verifiedToken = authenticator.getTokenData(token)

            if (!verifiedToken) {
                throw new CustomError(401, "please log in to register a category")
            }

            const categoryBusiness = new CategoryBusiness();
            const existingCategory = await categoryBusiness.getCategory(token);

            const checkedCategories = existingCategory.filter((category: Category) => {
                return product.category.includes(category.category);
            });

            if (checkedCategories.length < 1) {
                throw new Error("The category must exist")
            }

            const idGenerator = new IdGenerator() 
            const id = idGenerator.generate()

            const userDataBase = new UserDataBase();

            const user_id = await userDataBase.selectUserById((verifiedToken).id)

            const products: Product = {
                id: id,
                user_id: user_id.id,
                title: product.title,
                description: product.description,
                price: product.price,
                category: checkedCategories
            }

            const productDataBase = new ProductDataBase()
            await productDataBase.insertProduct(products)


        } catch (error) {
            throw new CustomError(400, error.message);
        }
    } 
}