import { UserDataBase } from "../data/UserDataBase";
import { CustomError } from "../error/CustomError";
import { LoginInputDTO, SignupInputDTO } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HasManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        public authenticator: Authenticator,
        private userDataBase: UserDataBase,
    ) {}

    async createUser(input: SignupInputDTO) {

        try {

            if (!input.name || !input.email || !input.password) {
                throw new CustomError(417, "Please, enter the information required")
            }
    
            if(!input.email.includes('@')) {
                throw new CustomError (404,"Invalid email")
            }
    
            if (input.password.length < 6) {
                throw new CustomError (411,"Enter at least 6 characters")
            }
    
            const id = this.idGenerator.generate();
    
            const hashPassword = await this.hashManager.hash(input.password);
    
            const user = {
                id,
                name: input.name,
                email: input.email,
                password: hashPassword
            }
    
            await this.userDataBase.insertUser(user)
    
            const acessToken = this.authenticator.generateToken({ id });
    
            return acessToken
        

        } catch (error) {
            throw new CustomError(400, error.message)
        }
    }

    async getUserByEmail(user: LoginInputDTO) {

        try {

            if(!user.email || !user.password) {
                throw new CustomError(404, 'enter "email" or "nickname" and "password"')
            }
            
    
            const userFromDB = await this.userDataBase.selectUserByEmail(user.email);
    
            if(!userFromDB) {
                throw new CustomError(406, "user does not exist")
            }
    
            const passwordIsCorrect = await this.hashManager.compare(
                user.password,
                userFromDB.password
            )
    
            if (!passwordIsCorrect) {
                throw new CustomError(401, "Invalid password")
            }
    
            const acessToken = this.authenticator.generateToken({
                id: userFromDB.id
            })
    
            return acessToken

        } catch (error) {
            throw new CustomError(400,error.message);
        }
    }
}