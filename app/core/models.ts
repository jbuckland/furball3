export class Record {
    Id: number;
}
export class Ship extends Record {
    public Type: string;
    public PilotName: string;
    public PilotAbility: string;
    public PointCost: number;
    public CardImageId: number;
    public ImagePath: string;
    public UpgradeSlots: SlotType[];
}

export class CardImage {
    public Id: number;
    public FilePath: string;
}


export class Upgrade extends Record {
    //public Id: number;
    public Name: string;
    public PointCost: number;
    public UpgradeType: SlotType;
    public Description: string;
    public CardImageId: number;
    public ImagePath:string;
}

export enum SlotType {
    Astromech = 1,
    Bomb = 2,
    Cannon = 3,
    Crew = 4,
    ElitePilot = 5,
    Illicit = 6,
    Missile = 7,
    Modification = 8,
    SalvagedAstromech = 9,
    System = 10,
    Tech = 11,
    Title = 12,
    Torpedo = 13,
    Turret = 14,

}


export class Build {
    public ChosenShip: Ship;
    public Upgrades: Upgrade[];
    public Description: string;
}

