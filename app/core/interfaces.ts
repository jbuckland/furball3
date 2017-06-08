import * as Core from "./models";

export interface IDataAccess {
    AddShip(ship: Core.Ship);
    GetAllShips(): Core.Ship[];

    AddUpgrade(upgrade: Core.Upgrade);
    GetAllUpgrades(): Core.Upgrade[];
    DeleteUpgrade(upgradeId: number): boolean;

    GetAllBuilds(): Array<Core.Build>;
}

export interface IShipService {
    GetShips(): Core.Ship[];
    GetShip(shipId: number): Core.Ship;
    AddShip(type: string, name: string, cost: number, ability: string, upgradeList: Core.SlotType[]): Core.Ship;
}

export interface IUpgradeService {
    GetUpgrades(): Core.Upgrade[];
    AddUpgrade(name: string, cost: number, type: Core.SlotType, description: string, imageId: number): Core.Upgrade;
    DeleteUpgrade(upgradeId: number): boolean;
}

