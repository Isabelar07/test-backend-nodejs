import { CustomError } from "../error/CustomError";
import { Product } from "../model/Product";
import { BaseDataBase } from "./BaseDataBase";

export class ProductDataBase extends BaseDataBase {

    private static TABLE_NAME = "Test_Anotaai_Products";
    private static INTER_TABLE_NAME = "Test_Anotaai_Products_Category"

    public async insertProduct(
        product: Product
    ): Promise<void> {
        try {
            await BaseDataBase.connection
            .insert({
                id: product.id,
                user_id: product.user_id,
                title: product.title,
                description: product.description, 
                price: product.price
            }).into(ProductDataBase.TABLE_NAME)

            if(product.category) {
                for (let categories of product.category) {
                    await BaseDataBase.connection()
                    .insert({
                        products_id: product.id,
                        category_id: categories.id
                    }).into(ProductDataBase.INTER_TABLE_NAME)
                }
            }

        } catch (error) {
            throw new CustomError(500, error.message)
        }
    }
}