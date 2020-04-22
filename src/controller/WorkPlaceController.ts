import {Request, Response} from "express";
import {WorkPlaceService} from "../service/WorkPlaceService";
import {WorkPlace} from "../entity/WorkPlace";

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

        if (!workPlaceName) {
            response.status(400).send({

            });
            return;
        }

        const workPlace: WorkPlace = new WorkPlace();

        workPlace.name = workPlaceName;

        const result: boolean = await WorkPlaceService.create(workPlace);

        if (result) {
            response.status(200).send({

            });
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

        if (!workPlaceId && !workPlaceName) {
            response.status(400).send({

            });
            return;
        }

        const workPlace: WorkPlace = new WorkPlace();
        workPlace.id = workPlaceId;
        workPlace.name = workPlaceName;

        const result: boolean = await WorkPlaceService.update(workPlace);

        if (result) {
            response.status(200).send({

            });
        } else {
            response.status(500).send({

            });
        }
    }

    static async delete(request: Request, response, Response) {
        const workPlaceId: number = Number(request.params.workPlaceId);

        if (!workPlaceId) {
            response.status(400).send({

            });
            return;
        }

        const result: boolean = await WorkPlaceService.delete(workPlaceId);

        if (result) {
            response.status(200).send({

            });
        } else {
            response.status(500).send({

            });
        }
    }

    static async init() {
        await WorkPlaceService.createConnection();
    }
}
