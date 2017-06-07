export class Record {
    Id: number;
}
export class Ship extends Record {
    //public Id: number;
    public Type: string;
    public PilotName: string;
    public PilotAbility: string;
    public PointCost: number;
    public CardImageId: number;
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
}

export enum SlotType {
    Missile = 1,
    Torpedo = 2,
    Astromech = 3,
    System = 4,
    Cannon = 5,
    ElitePilot = 6
}


export class Build {
    public ChosenShip: Ship;
    public Upgrades: Upgrade[];
    public Description: string;
}

