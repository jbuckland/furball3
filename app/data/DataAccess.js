"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class DataAccess {
    constructor() {
        this.dbFilePath = "./database.json";
    }
    initNewDB() {
        this.database = new Database();
        this.database.Ships = new Array();
    }
    loadDbFromFile() {
        var jsonData = fs.readFileSync(this.dbFilePath).toString();
        this.database = JSON.parse(jsonData);
    }
    addShip(ship) {
        this.database.Ships.push(ship);
        this.saveDbToFile();
    }
    saveDbToFile() {
        var jsonData = JSON.stringify(this.database);
        fs.writeFileSync(this.dbFilePath, jsonData);
    }
}
//# sourceMappingURL=DataAccess.js.map