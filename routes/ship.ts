import { NextFunction, Request, Response, Router } from "express";


/**
 * / route
 *
 * @class User
 */
export class ShipRoutes {
    public static BASE_PATH: string = "/ship";
    public static createRouter(): Router {
        //log
        console.log("[ShipRoute::create] Creating ship route.");

        let router: Router;
        router = Router();


        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            var jsonData = { this: 'is', a: 'json', response: 'object' };
            res.json(jsonData);
        });


        router.get("/add", (req: Request, res: Response, next: NextFunction) => {
            var jsonData = "add a ship";
            res.json(jsonData);
        });

        router.get("/:shipId", (req: Request, res: Response, next: NextFunction) => {
            var jsonData = "fetching ship id:" + req.params.shipId;
            res.json(jsonData);
        });



        return router;
    }

}

