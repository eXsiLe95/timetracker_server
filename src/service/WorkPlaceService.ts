import {Connection, Repository} from "typeorm";
import {WorkPlace} from "../entity/WorkPlace";

export class WorkPlaceService {

    static connection: Connection = null;

    static async createConnection(connection: Connection) {
        WorkPlaceService.connection = connection;
    }

    static async getAll(): Promise<WorkPlace[]> {
        const workPlaceRepository: Repository<WorkPlace> = WorkPlaceService.connection.getRepository(WorkPlace);

        return await workPlaceRepository.find({
            relations: ["projects", "users"],
        });
    }

    static async getMany(projectWorkPlaceIds: number[]): Promise<WorkPlace[]> {
        return [];
    }

    static async create(workPlace: WorkPlace): Promise<WorkPlace> {
        const workPlaceRepository: Repository<WorkPlace> = WorkPlaceService.connection.getRepository(WorkPlace);

        return await workPlaceRepository.save<WorkPlace>(workPlace);
    }

    static async get(workPlaceId: number): Promise<WorkPlace> {
        const workPlaceRepository: Repository<WorkPlace> = WorkPlaceService.connection.getRepository(WorkPlace);

        return await workPlaceRepository.findOne(workPlaceId, {
            relations: ["projects", "users"],
        });
    }

    static async update(workPlace: WorkPlace): Promise<WorkPlace> {
        const workPlaceRepository: Repository<WorkPlace> = WorkPlaceService.connection.getRepository(WorkPlace);

        return await workPlaceRepository.save<WorkPlace>(workPlace);
    }

    static async delete(workPlaceId: number): Promise<WorkPlace> {
        const workPlaceRepository: Repository<WorkPlace> = WorkPlaceService.connection.getRepository(WorkPlace);
        const workPlace: WorkPlace = await workPlaceRepository.findOne(workPlaceId);

        return await workPlaceRepository.remove(workPlace);
    }
}
