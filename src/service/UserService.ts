import {Connection, Repository} from "typeorm";
import {User} from "../entity/User";

export class UserService {

    static connection: Connection = null;

    static async createConnection(connection: Connection) {
        UserService.connection = connection;
    }

    static async getAll() {
        const userRepository: Repository<User> = UserService.connection.getRepository(User);

        return await userRepository.find();
    }

    static async create(user: User): Promise<boolean> {
        const userRepository: Repository<User> = UserService.connection.getRepository(User);
        const databaseUser: User = await userRepository.save<User>(user);

        return !!databaseUser;
    }

    static async get(userId: number) {
        const userRepository: Repository<User> = UserService.connection.getRepository(User);

        return await userRepository.findOne(userId);
    }

    static async update(user: User) {
        const userRepository: Repository<User> = UserService.connection.getRepository(User);
        const databaseUser: User = await userRepository.save<User>(user);

        return !!databaseUser;
    }

    static async delete(userId: number) {
        const userRepository: Repository<User> = UserService.connection.getRepository(User);
        const user: User = await userRepository.findOne(userId);
        const databaseUser: User = await userRepository.remove(user);

        return !!databaseUser;
    }
}
