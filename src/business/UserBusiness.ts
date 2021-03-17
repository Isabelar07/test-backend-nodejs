import { UserDataBase } from "../data/UserDataBase";
import { CustomError } from "../error/CustomError";
import { SignupInputDTO } from "../model/User";
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
}