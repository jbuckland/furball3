class Ship{
    public Type:string;
    public PilotName:string;
    public PilotAbility: string;
    public PointCost: number;
    public CardImageId: number;
    public UpgradeSlots:SlotType[];
}

class CardImage{
    public Id: number;
    public FilePath: string;
}


class Upgrade{
    public Name: string;
    public PointCost: number;
    public UpgradeType: SlotType;
    public Description: string;
    public CardImageId: number;
}

enum SlotType{
    Missile,
    Torpedo,
    Astromech,
    System,
    Cannon
}


class Build{
    public ChosenShip:Ship;
    public Upgrades:Upgrade[];
    public Description: string;
}

