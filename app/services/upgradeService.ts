import { IUpgradeService, IDataAccess } from "../core/interfaces";
import { Upgrade, SlotType } from "../core/models";

export class UpgradeService implements IUpgradeService {

    private dataAccess: IDataAccess;

    constructor(dataAccess: IDataAccess) {
        this.dataAccess = dataAccess;
    }

    GetUpgrades(): Upgrade[] {
        return this.dataAccess.GetAllUpgrades();
    }

    AddUpgrade(name: string, cost: number, type: SlotType, description: string, imageId: number): Upgrade {
        var upgrade = new Upgrade();
        upgrade.Name = name;
        upgrade.PointCost = cost;
        upgrade.UpgradeType = type;
        upgrade.Description = description;
        upgrade.CardImageId = imageId;

        this.dataAccess.AddUpgrade(upgrade);
        return upgrade;
    }

    DeleteUpgrade(upgradeId: number): boolean {
        var success = this.dataAccess.DeleteUpgrade(upgradeId);
        return success;
    }



}