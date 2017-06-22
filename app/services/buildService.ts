import { IDataAccess } from "../core/interfaces";
import { Build, Ship } from "../core/models";

export class BuildService {
    private dataAccess: IDataAccess;
    constructor(dataAccess: IDataAccess) {
        this.dataAccess = dataAccess;
    }

    public GetBuilds(): Array<Build> {
        let builds = this.dataAccess.GetAllBuilds();
        for (let build of builds) {
            build.ChosenShip.ImagePath = this.dataAccess.GetImagePath(build.ChosenShip.PilotName);
            for (let upgrade of build.Upgrades) {
                upgrade.ImagePath = this.dataAccess.GetImagePath(upgrade.Name);
            }
        }

        return builds;
    }
}