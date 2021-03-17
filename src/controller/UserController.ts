import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDataBase } from "../data/UserDataBase";
import { LoginInputDTO, SignupInputDTO } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HasManager";
import { IdGenerator } from "../services/IdGenerator";

const userBusiness = new UserBusiness(
    new IdGenerator(),
    new HashManager(),
    new Authenticator(),
    new UserDataBase()  
);

export class UserController {

    async signup(req: Request, res: Response){
        try {

            const input: SignupInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,  
            }

            const token = await userBusiness.createUser(input)

            res.status(200).send({ token })

        } catch (error) {
            res.status(error.statusCode).send({ error: error.message });
        }

        }

        async login(req: Request, res: Response) {

            try {
    
                const loginInput: LoginInputDTO = {
                    email: req.body.email,
                    password: req.body.password
                }
    
                const token = await userBusiness.getUserByEmail(loginInput)
    
                res.status(200).send({ token })
    
    
        } catch (error) {
            res.status(error.statusCode).send({ error: error.message });
    
        }
    }
}
