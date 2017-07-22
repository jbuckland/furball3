import { NextFunction, Request, Response, Router } from "express";
import { UpgradeService } from "../app/services/upgradeService";
import { DataAccess } from "../app/data/dataAccess";

/**
 * / route
 *
 * @class User
 */
export class UpgradeRoutes {
    private upgradeService: UpgradeService;
    private dataAccess: DataAccess;

    constructor() {
        this.dataAccess = new DataAccess();
        this.upgradeService = new UpgradeService(this.dataAccess);

    }

    public createRouter(): Router {
        console.log("Creating UpgradeRoutes.");

        let router: Router;
        router = Router();


        router.get("/all", (req: Request, res: Response, next: NextFunction) => {
            var response = this.upgradeService.GetUpgrades();
            res.json(response);
        });


        router.get("/add", (req: Request, res: Response, next: NextFunction) => {
            var cost = Number(req.param('cost'));
            if (isNaN(cost))
                cost = -1;

            var response = this.upgradeService.AddUpgrade(
                req.param('name'),
                cost,
                req.param('type'),
                req.param('description'),
                -1
            )
            res.json(response);
        });

        router.get("/delete",(req: Request, res: Response, next: NextFunction) => {
            var response = this.upgradeService.DeleteUpgrade(
                req.param('upgradeId')
            )
            res.json(response);
        });

        return router;
    }

}

