import {Request, Response} from "express";
import {ProjectService} from "../service/ProjectService";
import {Project} from "../entity/Project";
import {Connection} from "typeorm";

export class ProjectController {

    static async getAll(request: Request, response: Response) {

        const projects: Project[] = await ProjectService.getAll();

        if (!!projects) {
            response.status(200).send(projects);
        } else {
            response.status(500).send({

            });
        }

    }

    static async create(request: Request, response: Response) {
        const projectName: string = request.body.name;

        if (!projectName) {
            response.status(400).send({

            });
            return;
        }

        const project: Project = new Project();

        project.name = projectName;

        const result: boolean = await ProjectService.create(project);

        if (result) {
            response.status(200).send({

            });
        } else {
            response.status(500).send({

            });
        }
    }

    static async get(request: Request, response: Response) {
        const projectId: number = Number(request.params.projectId);

        if (!projectId) {
            response.status(400).send({

            });
            return;
        }

        const project: Project = await ProjectService.get(projectId);

        if (!!project) {
            response.status(200).send(project);
        } else {
            response.status(500).send({

            });
        }
    }

    static async update(request: Request, response: Response) {
        const projectId: number = Number(request.params.projectId);
        const projectName: string = request.body.name;

        if (!projectId && !projectName) {
            response.status(400).send({

            });
            return;
        }

        const project: Project = new Project();
        project.id = projectId;
        project.name = projectName;

        const result: boolean = await ProjectService.update(project);

        if (result) {
            response.status(200).send({

            });
        } else {
            response.status(500).send({

            });
        }
    }

    static async delete(request: Request, response, Response) {
        const projectId: number = Number(request.params.projectId);

        if (!projectId) {
            response.status(400).send({

            });
            return;
        }

        const result: boolean = await ProjectService.delete(projectId);

        if (result) {
            response.status(200).send({

            });
        } else {
            response.status(500).send({

            });
        }
    }

    static async initORM(connection: Connection) {
        await ProjectService.createConnection(connection);
    }
}
