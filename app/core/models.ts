export class Ship {
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


export class Upgrade {
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
    Cannon = 5
}


export class Build {
    public ChosenShip: Ship;
    public Upgrades: Upgrade[];
    public Description: string;
}

