import {Connection, Repository} from "typeorm";
import {User} from "../entity/User";

export class UserService {

    static connection: Connection = null;

    static async createConnection(connection: Connection) {
        UserService.connection = connection;
    }

    static async getAll(): Promise<User[]> {
        const userRepository: Repository<User> = UserService.connection.getRepository(User);

        return await userRepository.find({
            relations: ["activities", "projects", "workPlaces"]
        });
    }

    static async getMany(userIds: number[]): Promise<User[]> {
        if (!userIds) {
            return [];
        }

        const userRepository: Repository<User> = UserService.connection.getRepository(User);
        const users: User[] = await userRepository.findByIds(userIds, {
            relations: ["projects", "workPlaces"]
        });

        return users ? users : [];
    }

    static async create(user: User): Promise<User> {
        const userRepository: Repository<User> = UserService.connection.getRepository(User);

        return await userRepository.save<User>(user);
    }

    static async get(userId: number): Promise<User> {
        const userRepository: Repository<User> = UserService.connection.getRepository(User);

        return await userRepository.findOne(userId);
    }

    static async search(user: User) {
        const userRepository: Repository<User> = UserService.connection.getRepository(User);

        return await userRepository.findOne({
            firstName: user.firstName,
            lastName: user.lastName,
            mail: user.mail,
        });
    }

    static async update(user: User): Promise<User> {
        const userRepository: Repository<User> = UserService.connection.getRepository(User);

        return await userRepository.save<User>(user);
    }

    static async delete(userId: number): Promise<User> {
        const userRepository: Repository<User> = UserService.connection.getRepository(User);
        const user: User = await userRepository.findOne(userId);

        return await userRepository.remove(user);
    }
}
