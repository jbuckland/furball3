import { IDataAccess } from "../core/interfaces";
import { Build, Ship } from "../core/models";

export class BuildService {
    private dataAccess: IDataAccess;
    constructor(dataAccess: IDataAccess) {
        this.dataAccess = dataAccess;
    }

    public GetBuilds(): Array<Build> {
        return this.dataAccess.GetAllBuilds();
    }
}