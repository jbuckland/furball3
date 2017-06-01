import fs = require('fs');
import { Ship, SlotType } from "../core/models";
import { IDataAccess } from "../core/interfaces";
import { Database } from "./Database";

export class DataAccess implements IDataAccess {

    private dbFilePath: string = "./app/data/database.json";

    private database: Database;

    constructor() {
        this.loadDbFromFile();
        if (this.database == null) {
            this.initNewDB();
        }
    }

    private initNewDB() {
        this.database = new Database();
        this.database.Ships = new Array<Ship>();
    }

    private loadDbFromFile() {
        var jsonData = fs.readFileSync(this.dbFilePath).toString();
        this.database = JSON.parse(jsonData);
    }
    private saveDbToFile() {
        var jsonData = JSON.stringify(this.database, null, 4);
        fs.writeFileSync(this.dbFilePath, jsonData);
    }

    AddShip(ship: Ship) {
        this.database.Ships.push(ship);
        this.saveDbToFile();
    }

    public GetAllShips(): Ship[] {
        //return new Array<Ship>();
        return this.database.Ships;

    }

}



