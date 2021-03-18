import { CustomError } from "../error/CustomError";
import { User } from "../model/User";
import { BaseDataBase } from "./BaseDataBase";

export class UserDataBase extends BaseDataBase {

    private static TABLE_NAME = "Test_Anotaai_User";

    public async insertUser(
        user: User
    ): Promise<void> {
        try {
            await BaseDataBase.connection
            .insert({
                id: user.id,
                name: user.name,
                email: user.email, 
                password: user.password,
            }).into(UserDataBase.TABLE_NAME)

        } catch (error) {
            throw new CustomError(500, error.message)
        }
    }

    public async selectUserByEmail(email: string):  Promise<User> {
        try {
            const result = await BaseDataBase.connection
            .select("*")
            .from(UserDataBase.TABLE_NAME)
            .where({ email });

            return User.toUserModel(result[0]);
            
        } catch (error) {
            throw new CustomError(500, error.message)
        }
    }   

    public async selectUserById(id: string):  Promise<User> {
        try {
            const result = await BaseDataBase.connection
            .select("*")
            .from(UserDataBase.TABLE_NAME)
            .where({ id });

            return User.toUserModel(result[0]);
            
        } catch (error) {
            throw new CustomError(500, error.message)
        }
    }   
}