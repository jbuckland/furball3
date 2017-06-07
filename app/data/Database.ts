import { Ship, Upgrade } from "../core/models";

export class Database {

    constructor() {
        this.MaxShipId = 0;
        this.MaxUpgradeId = 0;
    }
    public Ships: Array<Ship>;
    public MaxShipId: number;

    public Upgrades: Array<Upgrade>;
    public MaxUpgradeId: number;

}