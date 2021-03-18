import { CustomError } from "../error/CustomError";
import { Category } from "../model/Category";
import { BaseDataBase } from "./BaseDataBase";

export class CategoryDataBase extends BaseDataBase {

    private static TABLE_NAME = "Test_Anotaai_Category"

    public async insertCategory(
        cat: Category,
    ): Promise<void> {
        try {
            await BaseDataBase.connection
            .insert({
                id: cat.id,
                category: cat.category

            }).into(CategoryDataBase.TABLE_NAME)

        } catch (error) {
            throw new CustomError(500, error.message)
        }
    }
}