import { Ship, SlotType } from "./models";

export interface IDataAccess {
    AddShip(ship: Ship);
    GetAllShips():Ship[];
}

export interface IShipService {
    GetShips(): Ship[];
    GetShip(shipId: number):Ship;
    AddShip(type: string, name: string, cost: number, ability: string, upgradeList: SlotType[]): Ship;
}