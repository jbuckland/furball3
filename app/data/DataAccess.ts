import fs = require('fs');

class DataAccess {

    private dbFilePath: string = "./database.json";

    private database: Database;

    constructor() {

    }

    initNewDB() {
        this.database = new Database();
        this.database.Ships = new Array<Ship>();
    }

    loadDbFromFile() {
        var jsonData = fs.readFileSync(this.dbFilePath).toString();
        this.database = JSON.parse(jsonData);
    }


    addShip(ship: Ship) {
        this.database.Ships.push(ship);
        this.saveDbToFile();
    }

    private saveDbToFile() {
        var jsonData = JSON.stringify(this.database);
        fs.writeFileSync(this.dbFilePath, jsonData);
    }
}



