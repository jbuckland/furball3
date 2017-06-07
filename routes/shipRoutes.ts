import { NextFunction, Request, Response, Router } from "express";
import { ShipService } from "../app/services/shipService";
import { DataAccess } from "../app/data/dataAccess";

/**
 * / route
 *
 * @class User
 */
export class ShipRoutes {
    //what's my job?
    //to tie request paths to service methods

    private shipService: ShipService;
    private dataAccess: DataAccess;

    constructor() {
        this.dataAccess = new DataAccess();
        this.shipService = new ShipService(this.dataAccess);

    }

    public createRouter(): Router {
        //log
        console.log("[ShipRoute::create] Creating ship route.");

        let router: Router;
        router = Router();


        router.get("/all", (req: Request, res: Response, next: NextFunction) => {
            var shipId = req.param('shipId');
            var response = this.shipService.GetShips();
            res.json(response);
        });


        router.get("/add", (req: Request, res: Response, next: NextFunction) => {
            var cost = Number(req.param('cost'));
            if(isNaN(cost))
                cost = -1;
            var response = this.shipService.AddShip(
                req.param('type'),
                req.param('pilotName'),
                cost,
                req.param('ability'),
                req.param('upgradeList')
            )
            res.json(response);
        });

        router.get("/:shipId", (req: Request, res: Response, next: NextFunction) => {
            var jsonData = "fetching ship id:" + req.params.shipId;
            res.json(jsonData);
        });



        return router;
    }

}

