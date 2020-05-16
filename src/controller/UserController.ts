import {Request, Response} from "express";
import {UserService} from "../service/UserService";
import {User} from "../entity/User";
import {Connection} from "typeorm";

export class UserController {

    static async getAll(request: Request, response: Response) {

        const users: User[] = await UserService.getAll();

        if (!!users) {
            response.status(200).send(users);
        } else {
            response.status(500).send({

            });
        }

    }

    static async create(request: Request, response: Response) {
        const firstName: string = request.body.firstName;
        const lastName: string = request.body.lastName;
        const mail: string = request.body.mail;

        if (!firstName || !lastName || !mail) {
            response.status(400).send({

            });
            return;
        }

        const user: User = new User();

        user.firstName = firstName;
        user.lastName = lastName;
        user.mail = mail;

        const result: User = await UserService.create(user);

        if (result) {
            response.status(200).send(result);
        } else {
            response.status(500).send({

            });
        }
    }

    static async get(request: Request, response: Response) {
        const userId: number = Number(request.user['id']);

        const user: User = await UserService.get(userId);

        if (!!user) {
            response.status(200).send(user);
        } else {
            response.status(500).send({

            });
        }
    }

    static async update(request: Request, response: Response) {
        const userId: number = Number(request.params.userId);
        const userFirstName: string = request.body.firstName;
        const userLastName: string = request.body.lastName;
        const userMail: string = request.body.mail;

        if (!userId) {
            response.status(400).send({

            });
            return;
        }

        const user: User = new User();
        user.id = userId;

        if (userFirstName) {
            user.firstName = userFirstName;
        }

        if (userLastName) {
            user.lastName = userLastName;
        }

        if (userMail) {
            user.mail = userMail;
        }

        const result: User = await UserService.update(user);

        if (result) {
            response.status(200).send(result);
        } else {
            response.status(500).send({

            });
        }
    }

    static async delete(request: Request, response, Response) {
        const userId: number = Number(request.params.userId);

        if (!userId) {
            response.status(400).send({

            });
            return;
        }

        const result: User = await UserService.delete(userId);

        if (result) {
            response.status(200).send(result);
        } else {
            response.status(500).send({

            });
        }
    }

    static async initORM(connection: Connection) {
        await UserService.createConnection(connection);
    }
}
