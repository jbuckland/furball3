export class Record {
    Id: number;
}
export class Ship extends Record {
    public type: string;
    public pilotName: string;
    public pilotAbility: string;
    public pointCost: number;
    public cardImageId: number;
    public imagePath: string;
    public upgradeSlots: SlotType[];
}

export class CardImage {
    public id: number;
    public filePath: string;
}


export class Upgrade extends Record {
    //public Id: number;
    public name: string;
    public pointCost: number;
    public upgradeType: SlotType;
    public description: string;
    public cardImageId: number;
    public imagePath:string;
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
    public chosenShip: Ship;
    public upgrades: Upgrade[];
    public description: string;
}

