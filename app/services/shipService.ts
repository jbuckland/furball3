import { Ship, SlotType } from "../core/models";
import { IShipService, IDataAccess } from "../core/interfaces";


export class ShipService implements IShipService {

    private dataAccess: IDataAccess;
    constructor(dataAccess: IDataAccess) {
        this.dataAccess = dataAccess;
    }

    public GetShips(): Ship[] {
        return this.dataAccess.GetAllShips();
    }

    public GetShip(shipId: number): Ship {
        var ship = new Ship();
        ship.Type = "X-Wing";
        ship.PilotName = "Poe Dameron";
        ship.PointCost = 30;
        ship.PilotAbility = "do cool stuff!";

        return ship;
    }

    public AddShip(type: string, name: string, cost: number, ability: string, upgradeList: SlotType[]): Ship {
        var ship = new Ship();
        ship.Type = type;
        ship.PilotName = name;
        ship.PointCost = cost;
        ship.PilotAbility = ability;
        //ship.UpgradeSlots = upgradeList;
        ship.UpgradeSlots = new Array<SlotType>();
        ship.UpgradeSlots.push(SlotType.Cannon);
        ship.UpgradeSlots.push(SlotType.Missile);

        this.dataAccess.AddShip(ship);
        return ship;
    }



}