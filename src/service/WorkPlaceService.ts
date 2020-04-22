import {Connection, createConnection, Repository} from "typeorm";
import {WorkPlace} from "../entity/WorkPlace";

export class WorkPlaceService {

    static connection: Connection = null;

    static async createConnection() {
        WorkPlaceService.connection = await createConnection();
    }

    static async getAll() {
        const workPlaceRepository: Repository<WorkPlace> = WorkPlaceService.connection.getRepository(WorkPlace);

        return await workPlaceRepository.find();
    }

    static async create(workPlace: WorkPlace): Promise<boolean> {
        const workPlaceRepository: Repository<WorkPlace> = WorkPlaceService.connection.getRepository(WorkPlace);
        const databaseWorkPlace: WorkPlace = await workPlaceRepository.save<WorkPlace>(workPlace);

        return !!databaseWorkPlace;
    }

    static async get(workPlaceId: number) {
        const workPlaceRepository: Repository<WorkPlace> = WorkPlaceService.connection.getRepository(WorkPlace);

        return await workPlaceRepository.findOne(workPlaceId);
    }

    static async update(workPlace: WorkPlace) {
        const workPlaceRepository: Repository<WorkPlace> = WorkPlaceService.connection.getRepository(WorkPlace);
        const databaseWorkPlace: WorkPlace = await workPlaceRepository.save<WorkPlace>(workPlace);

        return !!databaseWorkPlace;
    }

    static async delete(workPlaceId: number) {
        const workPlaceRepository: Repository<WorkPlace> = WorkPlaceService.connection.getRepository(WorkPlace);
        const workPlace: WorkPlace = await workPlaceRepository.findOne(workPlaceId);
        const databaseWorkPlace: WorkPlace = await workPlaceRepository.remove(workPlace);

        return !!databaseWorkPlace;
    }
}
