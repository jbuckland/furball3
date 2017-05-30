"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/**
 * / route
 *
 * @class User
 */
class ShipRoutes {
    static createRouter() {
        //log
        console.log("[ShipRoute::create] Creating ship route.");
        let router;
        router = express_1.Router();
        router.get("/", (req, res, next) => {
            var jsonData = { this: 'is', a: 'json', response: 'object' };
            res.json(jsonData);
        });
        router.get("/add", (req, res, next) => {
            var jsonData = "add a ship";
            res.json(jsonData);
        });
        router.get("/:shipId", (req, res, next) => {
            var jsonData = "fetching ship id:" + req.params.shipId;
            res.json(jsonData);
        });
        return router;
    }
}
ShipRoutes.BASE_PATH = "/ship";
exports.ShipRoutes = ShipRoutes;
//# sourceMappingURL=ship.js.map