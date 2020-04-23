import {Connection, Repository} from "typeorm";
import {Project} from "../entity/Project";

export class ProjectService {

    static connection: Connection = null;

    static async createConnection(connection: Connection) {
        ProjectService.connection = connection;
    }

    static async getAll() {
        const projectRepository: Repository<Project> = ProjectService.connection.getRepository(Project);

        return await projectRepository.find();
    }

    static async create(project: Project): Promise<boolean> {
        const projectRepository: Repository<Project> = ProjectService.connection.getRepository(Project);
        const databaseProject: Project = await projectRepository.save<Project>(project);

        return !!databaseProject;
    }

    static async get(projectId: number) {
        const projectRepository: Repository<Project> = ProjectService.connection.getRepository(Project);

        return await projectRepository.findOne(projectId);
    }

    static async update(project: Project) {
        const projectRepository: Repository<Project> = ProjectService.connection.getRepository(Project);
        const databaseProject: Project = await projectRepository.save<Project>(project);

        return !!databaseProject;
    }

    static async delete(projectId: number) {
        const projectRepository: Repository<Project> = ProjectService.connection.getRepository(Project);
        const project: Project = await projectRepository.findOne(projectId);
        const databaseProject: Project = await projectRepository.remove(project);

        return !!databaseProject;
    }
}
