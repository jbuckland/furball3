import { NextFunction, Request, Response, Router } from "express";
import { BuildService } from "../app/services/buildService";
import { DataAccess } from "../app/data/dataAccess";

/**
 * / route
 *
 * @class User
 */
export class BuildRoutes {
    private service: BuildService;
    private dataAccess: DataAccess;

    constructor() {
        this.dataAccess = new DataAccess();
        this.service = new BuildService(this.dataAccess);

    }

    public createRouter(): Router {
        console.log("Creating BuildRoutes.");

        let router: Router;
        router = Router();


        router.get("/all", (req: Request, res: Response, next: NextFunction) => {
            var response = this.service.GetBuilds();
            res.json(response);
        });


       

        return router;
    }

}

