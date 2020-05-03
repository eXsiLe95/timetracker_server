import {Connection, Repository} from "typeorm";
import {Project} from "../entity/Project";

export class ProjectService {

    static connection: Connection = null;

    static async createConnection(connection: Connection) {
        ProjectService.connection = connection;
    }

    static async getAll(): Promise<Project[]> {
        const projectRepository: Repository<Project> = ProjectService.connection.getRepository(Project);

        return await projectRepository.find({
            relations: ["activities", "users", "workPlace"]
        });
    }

    static async getMany(projectIds: number[]): Promise<Project[]> {
        const projectRepository: Repository<Project> = ProjectService.connection.getRepository(Project);

        return await projectRepository.findByIds(projectIds, {
            relations: ["activities", "users", "workPlace"]
        });
    }

    static async create(project: Project): Promise<Project> {
        const projectRepository: Repository<Project> = ProjectService.connection.getRepository(Project);

        return await projectRepository.save<Project>(project);
    }

    static async get(projectId: number): Promise<Project> {
        const projectRepository: Repository<Project> = ProjectService.connection.getRepository(Project);

        return await projectRepository.findOne(projectId, {
            relations: ["activities", "users", "workPlace"]
        });
    }

    static async update(project: Project): Promise<Project> {
        const projectRepository: Repository<Project> = ProjectService.connection.getRepository(Project);

        return await projectRepository.save<Project>(project);
    }

    static async delete(projectId: number): Promise<Project> {
        const projectRepository: Repository<Project> = ProjectService.connection.getRepository(Project);
        const project: Project = await projectRepository.findOne(projectId);

        return await projectRepository.remove(project);
    }
}
