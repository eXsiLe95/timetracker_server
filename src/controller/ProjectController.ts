import {Request, Response} from 'express';
import {ProjectService} from '../service/ProjectService';
import {Project} from '../entity/Project';
import {Connection} from 'typeorm';
import {User} from '../entity/User';
import {UserService} from '../service/UserService';
import {WorkPlace} from '../entity/WorkPlace';
import {WorkPlaceService} from '../service/WorkPlaceService';

export class ProjectController {

    static async getAll(request: Request, response: Response) {

        const projects: Project[] = await ProjectService.getAll();

        if (!!projects) {
            response.status(200).send(projects);
        } else {
            response.status(500).send({});
        }

    }

    static async create(request: Request, response: Response) {
        const projectName: string = request.body.name;
        const projectUserIds: number[] = request.body.userIds;
        const projectWorkPlaceId: number = Number(request.body.workPlaceId);

        if (!projectName) {
            response.status(400).send({});
            return;
        }

        const project: Project = new Project();
        const projectUsers: User[] = await UserService.getMany(projectUserIds);
        const projectWorkPlace: WorkPlace = await WorkPlaceService.get(projectWorkPlaceId);

        project.name = projectName;
        project.users = projectUsers;
        project.workPlace = projectWorkPlace;

        const result: Project = await ProjectService.create(project);

        if (result) {
            response.status(200).send(result);
        } else {
            response.status(500).send({});
        }
    }

    static async get(request: Request, response: Response) {
        const projectId: number = Number(request.params.projectId);

        if (!projectId) {
            response.status(400).send({});
            return;
        }

        const project: Project = await ProjectService.get(projectId);

        if (!!project) {
            response.status(200).send(project);
        } else {
            response.status(500).send({});
        }
    }

    static async update(request: Request, response: Response) {
        const projectId: number = Number(request.params.projectId);
        const projectName: string = request.body.name;
        const projectUserIds: number[] = request.body.userIds;
        const projectWorkPlaceId: number = Number(request.body.workPlaceId);

        if (!projectId) {
            response.status(400).send({});
            return;
        }

        const project: Project = await ProjectService.get(projectId);

        if (!project) {
            response.status(404).send({});
        }

        // Update values if given
        project.name = projectName ? projectName : project.name;
        project.users = projectUserIds ? await UserService.getMany(projectUserIds) : project.users;
        project.workPlace = projectWorkPlaceId ? await WorkPlaceService.get(projectWorkPlaceId) : project.workPlace;

        const result: Project = await ProjectService.update(project);

        if (result) {
            response.status(200).send(result);
        } else {
            response.status(500).send({});
        }
    }

    static async delete(request: Request, response: Response) {
        const projectId: number = Number(request.params.projectId);

        if (!projectId) {
            response.status(400).send({});
            return;
        }

        const result: Project = await ProjectService.delete(projectId);

        if (result) {
            response.status(200).send(result);
        } else {
            response.status(500).send({});
        }
    }

    static async initORM(connection: Connection) {
        await ProjectService.createConnection(connection);
    }
}
