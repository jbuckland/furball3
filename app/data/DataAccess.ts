import fs = require('fs');
import { Ship, SlotType, Upgrade, Record } from "../core/models";
import { IDataAccess } from "../core/interfaces";
import { Database } from "./Database";

export class DataAccess implements IDataAccess {

    private dbFilePath: string = "./app/data/database.json";

    private database: Database;

    constructor() {
        this.loadDbFromFile();
    }

    AddUpgrade(upgrade: Upgrade) {
        this.database.MaxUpgradeId++;
        upgrade.Id = this.database.MaxUpgradeId;
        this.database.Upgrades.push(upgrade);
        this.saveDbToFile();

        this.AddRecord(upgrade, this.database.Upgrades, this.database.MaxUpgradeId);
    }
    GetAllUpgrades(): Upgrade[] {
        return this.database.Upgrades;
    }
    AddShip(ship: Ship) {
        this.database.MaxShipId++;
        ship.Id = this.database.MaxShipId;

        this.database.Ships.push(ship);
        this.saveDbToFile();
    }

    GetAllShips(): Ship[] {
        return this.database.Ships;
    }

    DeleteUpgrade(upgradeId: number): boolean {
        return this.DeleteRecord(this.database.Upgrades.findIndex(u => u.Id == upgradeId), this.database.Upgrades, );
    }


    private AddRecord(record: Record, table: Array<Record>, maxId: number) {
        maxId++;
        record.Id = maxId;

        table.push(record);
        this.saveDbToFile();
    }

    private DeleteRecord(index: number, table: Array<Record>): boolean {
        var deleted = false;
        if (index > -1) {
            table.splice(index, 1);
            this.saveDbToFile();
            deleted = true;
        }
        return deleted;
    }



    private loadDbFromFile() {
        var jsonData = fs.readFileSync(this.dbFilePath).toString();
        this.database = JSON.parse(jsonData);

        if (this.database == null)
            this.database = new Database();

        if (this.database.Ships == null)
            this.database.Ships = new Array<Ship>();

        if (this.database.Upgrades == null)
            this.database.Upgrades = new Array<Upgrade>();
    }
    private saveDbToFile() {
        var jsonData = JSON.stringify(this.database, null, 4);
        fs.writeFileSync(this.dbFilePath, jsonData);
    }



}



