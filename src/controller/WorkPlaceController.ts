import {Request, Response} from "express";
import {WorkPlaceService} from "../service/WorkPlaceService";
import {WorkPlace} from "../entity/WorkPlace";
import {Connection} from "typeorm";
import {User} from '../entity/User';
import {UserService} from '../service/UserService';
import {Project} from '../entity/Project';
import {ProjectService} from '../service/ProjectService';

export class WorkPlaceController {

    static async getAll(request: Request, response: Response) {

        const workPlaces: WorkPlace[] = await WorkPlaceService.getAll();

        if (!!workPlaces) {
            response.status(200).send(workPlaces);
        } else {
            response.status(500).send({

            });
        }

    }

    static async create(request: Request, response: Response) {
        const workPlaceName: string = request.body.name;
        const workPlaceProjectIds: number[] = request.body.projectIds;
        const workPlaceUserIds: number[] = request.body.userIds;
        // TODO: Get user id from authentication
        const userId: number = Number(request.body.userId);

        if (!workPlaceName || !userId) {
            response.status(400).send({

            });
            return;
        }

        const workPlace: WorkPlace = new WorkPlace();
        // TODO: Get user id from authentication
        const user: User = await UserService.get(userId);

        workPlace.name = workPlaceName;
        workPlace.projects = await ProjectService.getMany(workPlaceProjectIds);
        workPlace.users = await UserService.getMany(workPlaceUserIds);
        // TODO: Get user id from authentication
        workPlace.users = [user];

        const result: WorkPlace = await WorkPlaceService.create(workPlace);

        if (result) {
            response.status(200).send(result);
        } else {
            response.status(500).send({

            });
        }
    }

    static async get(request: Request, response: Response) {
        const workPlaceId: number = Number(request.params.workPlaceId);

        if (!workPlaceId) {
            response.status(400).send({

            });
            return;
        }

        const workPlace: WorkPlace = await WorkPlaceService.get(workPlaceId);

        if (!!workPlace) {
            response.status(200).send(workPlace);
        } else {
            response.status(500).send({

            });
        }
    }

    static async update(request: Request, response: Response) {
        const workPlaceId: number = Number(request.params.workPlaceId);
        const workPlaceName: string = request.body.name;
        const workPlaceProjectIds: number[] = request.body.projectIds;
        const workPlaceUserIds: number[] = request.body.userIds;

        if (!workPlaceId) {
            response.status(400).send({

            });
            return;
        }

        const workPlace: WorkPlace = await WorkPlaceService.get(workPlaceId);

        if (!workPlace) {
            response.status(404).send({

            });
            return;
        }
        const workPlaceProjects: Project[] = await ProjectService.getMany(workPlaceProjectIds);
        const workPlaceUsers: User[] = await UserService.getMany(workPlaceUserIds);

        workPlace.name = workPlaceName;
        workPlace.projects = workPlaceProjects;
        workPlace.users = workPlaceUsers;

        const result: WorkPlace = await WorkPlaceService.update(workPlace);

        if (result) {
            response.status(200).send(result);
        } else {
            response.status(500).send({

            });
        }
    }

    static async delete(request: Request, response: Response) {
        const workPlaceId: number = Number(request.params.workPlaceId);

        if (!workPlaceId) {
            response.status(400).send({

            });
            return;
        }

        const result: WorkPlace = await WorkPlaceService.delete(workPlaceId);

        if (result) {
            response.status(200).send(result);
        } else {
            response.status(500).send({

            });
        }
    }

    static async initORM(connection: Connection) {
        await WorkPlaceService.createConnection(connection);
    }
}
