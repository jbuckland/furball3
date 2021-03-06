import fs = require('fs');
import { Ship, SlotType, Upgrade, Record, Build } from "../core/models";
import { IDataAccess } from "../core/interfaces";
import { Database } from "./Database";

export class DataAccess implements IDataAccess {

    private dbFilePath: string = "./app/data/database.json";

    private database: Database;

    constructor() {
        this.loadDbFromFile();
    }

    AddUpgrade(upgrade: Upgrade) {
        this.database.MaxUpgradeId++;
        upgrade.Id = this.database.MaxUpgradeId;
        this.database.Upgrades.push(upgrade);
        this.saveDbToFile();

        this.AddRecord(upgrade, this.database.Upgrades, this.database.MaxUpgradeId);
    }
    GetAllUpgrades(): Upgrade[] {
        return this.database.Upgrades;
    }
    AddShip(ship: Ship) {
        this.database.MaxShipId++;
        ship.Id = this.database.MaxShipId;

        this.database.Ships.push(ship);
        this.saveDbToFile();
    }

    GetAllShips(): Ship[] {
        return this.database.Ships;
    }

    DeleteUpgrade(upgradeId: number): boolean {
        return this.DeleteRecord(this.database.Upgrades.findIndex(u => u.Id == upgradeId), this.database.Upgrades, );
    }


    private AddRecord(record: Record, table: Array<Record>, maxId: number) {
        maxId++;
        record.Id = maxId;

        table.push(record);
        this.saveDbToFile();
    }

    private DeleteRecord(index: number, table: Array<Record>): boolean {
        var deleted = false;
        if (index > -1) {
            table.splice(index, 1);
            this.saveDbToFile();
            deleted = true;
        }
        return deleted;
    }



    private loadDbFromFile() {
        var jsonData = fs.readFileSync(this.dbFilePath).toString();
        this.database = JSON.parse(jsonData);

        if (this.database == null)
            this.database = new Database();

        if (this.database.Ships == null)
            this.database.Ships = new Array<Ship>();

        if (this.database.Upgrades == null)
            this.database.Upgrades = new Array<Upgrade>();
    }
    private saveDbToFile() {
        var jsonData = JSON.stringify(this.database, null, 4);
        fs.writeFileSync(this.dbFilePath, jsonData);
    }


    ///////////////////////////////////
    //temp stuff from old data.js
    public GetAllBuilds(): Array<Build> {
        //return this.database.Builds;
        return this.GetAllBuildsFromArray(this.buildsToPrint);
    }


    public GetAllBuildsFromArray(buildArray): Array<Build> {
        var retVal = new Array<Build>();
        for (var b = 0; b < buildArray.length; b++) {
            var buildList = buildArray[b];

            for (var p = 0; p < buildList['pilots'].length; p++) {
                var rawBuild = buildList['pilots'][p];

                var build = new Build();

                build.ChosenShip = new Ship();
                build.ChosenShip.PilotName = rawBuild['name'];
                build.ChosenShip.Type = rawBuild['ship'];
                build.ChosenShip.PointCost = rawBuild['points']

                build.Upgrades = new Array<Upgrade>();
                var rawAllUpgrades = rawBuild['upgrades'];


                for (var upgradeType in rawAllUpgrades) {
                    var rawUpgradesOfType = rawAllUpgrades[upgradeType];
                    for (var u = 0; u < rawUpgradesOfType.length; u++) {
                        var rawUpgradeName = rawUpgradesOfType[u];
                        var upgrade = new Upgrade();
                        upgrade.UpgradeType = this.convertUpgradeNameToSlotType(upgradeType);
                        upgrade.Name = rawUpgradeName;
                        build.Upgrades.push(upgrade);
                    }
                }

                retVal.push(build);
            }
        }
        return retVal;
    }

    public GetImagePath(cardName: string): string {
        let path = null;
        if (this.nameToFileMap[cardName])
            path = this.nameToFileMap[cardName];
        return path;
    }

    private convertUpgradeNameToSlotType(rawUpgradeType): SlotType {
        var type: SlotType = null;

        var map = {
            'ept': SlotType.ElitePilot,
            'mod': SlotType.Modification,
            'title': SlotType.Title,
            'bomb': SlotType.Bomb,
            'system': SlotType.System,
            'tech': SlotType.Tech,
            'missile': SlotType.Missile,
            'amd': SlotType.Astromech,
            'torpedo': SlotType.Torpedo,
            'turret': SlotType.Turret,
            'crew': SlotType.Crew,
            'samd': SlotType.SalvagedAstromech,
            'illicit': SlotType.Illicit
        }

        return map[rawUpgradeType];
    }

    private buildLists: any = [
        {
            "name": "furball - imperial",
            "faction": "imperial",
            "points": 100,
            "description": "",
            "pilots": [
                {
                    "name": "soontirfel",
                    "ship": "tieinterceptor",
                    "upgrades": {
                        "ept": [
                            "pushthelimit"
                        ],
                        "mod": [
                            "autothrusters",
                            "stealthdevice"

                        ],
                        "title": [
                            "royalguardtie"
                        ]
                    },
                    "points": 35
                },
                {
                    "name": "echo",
                    "ship": "tiephantom",
                    "upgrades": {
                        "ept": [
                            "veteraninstincts"
                        ],
                        "mod": [
                            "advancedcloakingdevice"
                        ]
                    },
                    "points": 35
                },
                {
                    "name": "countessryad",
                    "ship": "tiedefender",
                    "upgrades": {
                        "ept": [
                            "pushthelimit"
                        ],
                        "title": [
                            "tiex7"
                        ]
                    },
                    "points": 35
                },
                {
                    "name": "deathfire",
                    "ship": "tiebomber",
                    "upgrades": {
                        "torpedo": [
                            "extramunitions",
                            "plasmatorpedoes"
                        ],
                        "missile": [
                            "assaultmissiles",
                            "clustermissiles"
                        ],
                        "bomb": [
                            "proximitymines"
                        ],
                        "mod": [
                            "munitionsfailsafe"
                        ]
                    },
                    "points": 35
                },
                {
                    "name": "gammasquadronveteran",
                    "ship": "tiebomber",
                    "upgrades": {
                        "ept": [
                            "deadeye"
                        ],
                        "torpedo": [
                            "extramunitions",
                            "plasmatorpedoes"
                        ],
                        "missile": [
                            "clustermissiles",
                            "homingmissiles"
                        ],
                        "mod": [
                            "munitionsfailsafe"
                        ]
                    },
                    "points": 35
                },

                {
                    "name": "quickdraw",
                    "ship": "tiesffighter",
                    "upgrades": {
                        "ept": [
                            "marksmanship"
                        ],
                        "system": [
                            "firecontrolsystem"
                        ],
                        "mod": [
                            "twinionenginemkii"
                        ],
                        "title": [
                            "specialopstraining"
                        ]
                    },
                    "points": 35
                },
                {
                    "name": "theinquisitor",
                    "ship": "tieadvancedprototype",
                    "upgrades": {
                        "ept": [
                            "pushthelimit"
                        ],
                        "missile": [
                            "protonrockets"
                        ],
                        "mod": [
                            "autothrusters"
                        ],
                        "title": [
                            "tiev1"
                        ]
                    },
                    "points": 34
                }
            ],
            "version": "0.2.2",
            "vendor": {
                "xwsbandroid": {
                    "builder": "X-Wing Squdron Builder for Android",
                    "builder_link": "https:\/\/play.google.com\/store\/apps\/details?id=es.eko.squadronbuilder"
                }
            }
        },
        {
            "name": "furball - rebel",
            "faction": "rebel",
            "points": 100,
            "description": "",
            "pilots": [
                {
                    "name": "tychocelchu",
                    "ship": "awing",
                    "upgrades": {
                        "ept": [
                            "rage",
                            "pushthelimit"
                        ],
                        "missile": [
                            "protonrockets"
                        ],
                        "mod": [
                            "autothrusters"
                        ],
                        "title": [
                            "awingtestpilot"
                        ]
                    },
                    "points": 35
                },
                {
                    "name": "poedameron",
                    "ship": "t70xwing",
                    "upgrades": {
                        "amd": [
                            "bb8"
                        ],
                        "mod": [
                            "autothrusters"
                        ]
                    },
                    "points": 35
                },
                {
                    "name": "lukeskywalker",
                    "ship": "xwing",
                    "upgrades": {
                        "ept": [
                            "predator"
                        ],
                        "amd": [
                            "r2d2"
                        ]
                    },
                    "points": 35
                },
                {
                    "name": "hortonsalm",
                    "ship": "ywing",
                    "upgrades": {
                        "torpedo": [
                            "bombloadout",
                            "extramunitions"
                        ],
                        "turret": [
                            "twinlaserturret"
                        ],
                        "bomb": [
                            "seismiccharges"
                        ],
                        "title": [
                            "btla4ywing"
                        ]
                    },
                    "points": 35
                },

                {
                    "name": "norrawexley",
                    "ship": "arc170",
                    "upgrades": {
                        "ept": [
                            "pushthelimit"
                        ],
                        "crew": [
                            "tailgunner"
                        ],
                        "title": [
                            "allianceoverhaul"
                        ]
                    },
                    "points": 34
                }
            ],
            "version": "0.2.2",
            "vendor": {
                "xwsbandroid": {
                    "builder": "X-Wing Squdron Builder for Android",
                    "builder_link": "https:\/\/play.google.com\/store\/apps\/details?id=es.eko.squadronbuilder"
                }
            }
        },
        {
            "name": "furball - scum",
            "faction": "scum",
            "points": 100,
            "description": "",
            "pilots": [
                {
                    "name": "kavil",
                    "ship": "ywing",
                    "upgrades": {
                        "ept": [
                            "predator"
                        ],
                        "turret": [
                            "twinlaserturret"
                        ],
                        "samd": [
                            "r4agromech"
                        ]
                    },
                    "points": 35
                },
                {
                    "name": "palobgodalhi",
                    "ship": "hwk290",
                    "upgrades": {
                        "ept": [
                            "predator"
                        ],
                        "turret": [
                            "blasterturret"
                        ],
                        "title": [
                            "moldycrow"
                        ]
                    },
                    "points": 30
                },
                {
                    "name": "guri",
                    "ship": "starviper",
                    "upgrades": {
                        "ept": [
                            "pushthelimit"
                        ],
                        "title": [
                            "virago"
                        ],
                        "illicit": [
                            "blackmarketslicertools"
                        ]
                    },
                    "points": 35
                },
                {
                    "name": "drearenthal",
                    "ship": "ywing",
                    "upgrades": {
                        "torpedo": [
                            "protontorpedoes",
                            "iontorpedoes"
                        ],
                        "mod": [
                            "munitionsfailsafe"
                        ],
                        "samd": [
                            "r4b11"
                        ]
                    },
                    "points": 35
                },
                {
                    "name": "syndicatethug",
                    "ship": "ywing",
                    "upgrades": {
                        "torpedo": [
                            "bombloadout",
                            "protontorpedoes"
                        ],
                        "turret": [
                            "ioncannonturret"
                        ],
                        "bomb": [
                            "proximitymines"
                        ],
                        "mod": [
                            "hullupgrade"
                        ],
                        "title": [
                            "btla4ywing"
                        ],
                        "samd": [
                            "unhingedastromech"
                        ]
                    },
                    "points": 34
                },
                {
                    "name": "fennrau",
                    "ship": "protectoratestarfighter",
                    "upgrades": {
                        "ept": [
                            "pushthelimit"
                        ],
                        "mod": [
                            "autothrusters"
                        ],
                        "title": [
                            "concorddawnprotector"
                        ]
                    },
                    "points": 34
                }
            ],
            "version": "0.2.2",
            "vendor": {
                "xwsbandroid": {
                    "builder": "X-Wing Squdron Builder for Android",
                    "builder_link": "https:\/\/play.google.com\/store\/apps\/details?id=es.eko.squadronbuilder"
                }
            }
        }


    ]


    private buildLists2: any = [
        {
            "name": "to print",
            "faction": "rebel",
            "points": 100,
            "description": "",
            "pilots": [
                {
                    "name": "backdraft",
                    "ship": "tiesffighter",
                    "upgrades": {
                        "ept": [
                            "outmaneuver"
                        ],
                        "system": [
                            "firecontrolsystem"
                        ],
                        "mod": [
                            "twinionenginemkii"
                        ],
                        "title": [
                            "specialopstraining"
                        ],
                        "tech": [
                            "patternanalyzer"
                        ]
                    },
                    "points": 35
                },

                {
                    "name": "maarekstele",
                    "ship": "tiedefender",
                    "upgrades": {
                        "ept": [
                            "juke"
                        ],
                        "title": [
                            "tiex7"
                        ]
                    },
                    "points": 35
                },
                {
                    "name": "echo",
                    "ship": "tiephantom",
                    "upgrades": {
                        "ept": [
                            "veteraninstincts"
                        ],
                        "system": [
                            "collisiondetector"
                        ],
                        "mod": [
                            "advancedcloakingdevice"
                        ]
                    },
                    "points": 35
                },
                {
                    "name": "wardensquadronpilot",
                    "ship": "kwing",
                    "upgrades": {
                        "torpedo": [
                            "extramunitions"
                        ],
                        "bomb": [
                            "proximitymines",
                            "connernet"
                        ],
                        "mod": [
                            "advancedslam"
                        ],
                        "crew": [
                            "bombardier"
                        ]
                    },
                    "points": 35
                },
                {
                    "name": "snapwexley",
                    "ship": "t70xwing",
                    "upgrades": {
                        "ept": [
                            "pushthelimit"
                        ],
                        "amd": [
                            "r2astromech"
                        ],
                        "mod": [
                            "integratedastromech"
                        ],
                        "tech": [
                            "patternanalyzer"
                        ]
                    },
                    "points": 34
                },

                {
                    "name": "niennunb",
                    "ship": "t70xwing",
                    "upgrades": {
                        "ept": [
                            "snapshot"
                        ],
                        "amd": [
                            "r3a2"
                        ],
                        "mod": [
                            "autothrusters"
                        ]
                    },
                    "points": 35
                },
                {
                    "name": "snapwexley",
                    "ship": "t70xwing",
                    "upgrades": {
                        "ept": [
                            "veteraninstincts"
                        ],
                        "amd": [
                            "r3a2"
                        ],
                        "mod": [
                            "vectoredthrusters"
                        ],
                        "title": [
                            "blackone"
                        ],
                        "tech": [
                            "primedthrusters"
                        ]
                    },
                    "points": 35
                },
                {
                    "name": "niennunb",
                    "ship": "t70xwing",
                    "upgrades": {
                        "ept": [
                            "stayontarget"
                        ],
                        "amd": [
                            "targetingastromech"
                        ],
                        "mod": [
                            "integratedastromech"
                        ],
                        "tech": [
                            "patternanalyzer"
                        ]
                    },
                    "points": 35
                },

                {
                    "name": "tychocelchu",
                    "ship": "awing",
                    "upgrades": {
                        "ept": [
                            "pushthelimit",
                            "daredevil"
                        ],
                        "mod": [
                            "vectoredthrusters"
                        ],
                        "title": [
                            "awingtestpilot"
                        ]
                    },
                    "points": 32
                },


                {
                    "name": "constablezuvio",
                    "ship": "quadjumper",
                    "upgrades": {
                        "ept": [
                            "outmaneuver"
                        ],
                        "bomb": [
                            "connernet"
                        ],
                        "mod": [
                            "engineupgrade"
                        ],
                        "crew": [
                            "ketsuonyo"
                        ],
                        "illicit": [
                            "scavengercrane"
                        ],
                        "tech": [
                            "patternanalyzer"
                        ]
                    },
                    "points": 35
                }, {
                    "name": "constablezuvio",
                    "ship": "quadjumper",
                    "upgrades": {
                        "ept": [
                            "pushthelimit"
                        ],
                        "bomb": [
                            "connernet"
                        ],
                        "mod": [
                            "spacetugtractorarray"
                        ],
                        "crew": [
                            "dengar"
                        ],
                        "illicit": [
                            "scavengercrane"
                        ],
                        "tech": [
                            "patternanalyzer"
                        ]
                    },
                    "points": 35
                }
            ]
        }
    ]

    private buildsToPrint: any = [
        {
            "name": "to print",
            "faction": "rebel",
            "points": 100,
            "description": "",
            "pilots": [
                {
                    "name": "constablezuvio",
                    "ship": "quadjumper",
                    "upgrades": {
                        "ept": [
                            "outmaneuver"
                        ],
                        "bomb": [
                            "connernet"
                        ],
                        "mod": [
                            "spacetugtractorarray"
                        ],
                        "crew": [
                            "ketsuonyo"
                        ],
                        "illicit": [
                            "scavengercrane"
                        ],
                        "tech": [
                            "patternanalyzer"
                        ]
                    },
                    "points": 33
                }

            ]
        }
    ]



    private nameToFileMap: any = {
        "accuracycorrector": "Accuracy-corrector.png",
        "advancedcloakingdevice": "Advanced-cloaking-device.png",
        "advancedslam": "advancedslam.png",
        "allianceoverhaul": "Overhaul.png",
        "assaultmissiles": "assaultmissiles.png",
        "autothrusters": "autothrusters.png",
        "awingtestpilot": "awingtestpilot.png",
        "backdraft": "Swx54-backdraft.png",
        "bb8": "bb8.png",
        "blasterturret": "blasterturret.png",
        "bombardier": "bombardier.png",
        "bombloadout": "bombloadout.png",
        "btla4ywing": "btla4ywing.png",
        "clustermines": "clustermines.png",
        "clustermissiles": "clustermissiles.png",
        "countessryad": "countess-ryad.png",
        "deadeye": "deadeye.png",
        "deathfire": "deathfire.png",
        "drearenthal": "Drea-renthal-1-.png",
        "echo": "echo.png",
        "extramunitions": "extramunitions.png",
        "firecontrolsystem": "Fire-control-system.png",
        "gammasquadronveteran": "Swx52-gamma-squad-vet.png",
        "guri": "guri.png",
        "homingmissiles": "Homing_Missiles.png",
        "hortonsalm": "hortonsalm.png",
        "hullupgrade": "Hull_Modification.png",
        "ioncannonturret": "ioncannonturret.png",
        "iontorpedoes": "iontorpedoes.png",
        "kavil": "kavil.png",
        "lukeskywalker": "lukeskywalker.png",
        "marksmanship": "Marksmanship.png",
        "moldycrow": "moldycrow.png",
        "munitionsfailsafe": "munitionsfailsafe.png",
        "nightbeast": "Night_Beast.png",
        "norrawexley": "Swx53-norra-wexley.png",
        "outmaneuver": "Outmaneuver.png",
        "palobgodalhi": "palobgodalhi.png",
        "plasmatorpedoes": "plasmatorpedoes.png",
        "poedameron": "poedameron.png",
        "predator": "predator.png",
        "protonrockets": "Proton-rockets.png",
        "protontorpedoes": "Proton-torpedoes.png",
        "proximitymines": "proximitymines.png",
        "pushthelimit": "pushthelimit.png",
        "quickdraw": "Swx54-quickdraw.png",
        "r2d2": "R2-d2.png",
        "r3astromech": "Swx53-r3-astromech.png",
        "r4agromech": "r4agromech.png",
        "r4b11": "R4-b11-1-.png",
        "rage": "Rage.png",
        "reconspecialist": "reconspecialist.png",
        "royalguardtie": "royalguardtie.png",
        "seismiccharges": "seismiccharges.png",
        "soontirfel": "soontirfel.png",
        "specialopstraining": "SpecOpsTraining.png",
        "stealthdevice": "stealthdevice.png",
        "syndicatethug": "syndicatethug.png",
        "tailgunner": "Swx53-tail-gunner.png",
        "theinquisitor": "Inquisitor.png",
        "tied": "tied.png",
        "tiex7": "tiex7.png",
        "tiev1": "Swx40_tiev1title.png",
        "tractorbeam": "tractorbeam.png",
        "twinionenginemkii": "Twin-ion-engine-mk2-1-.png",
        "twinlaserturret": "twinlaserturret.png",
        "tychocelchu": "tychocelchu.png",
        "unhingedastromech": "Unhinged-astromech.png",
        "vectoredthrusters": "Swx53-vectored-thrusters.png",
        "veteraninstincts": "veteraninstincts.png",
        "wardensquadronpilot": "wardensquadronpilot.png",
        "weaponsguidance": "Weapons-guidance.png",
        "zetaace": "Zeta-ace.png",

        "wedgeantilles": "Wedge-antilles.png",
        "integratedastromech": "Integrated-astromech.png",
        "ionbombs": "Ion-bombs-1-.png",
        "r3a2": "R3-a2.png",
        "fennrau": "FennRau.png",
        "concorddawnprotector": "Swx55-concord-dawn-protector.png",
        "snapshot": "Swx57-snap-shot.png",
        "maarekstele": "Swx52-maarek-stele.png",
        "juke": "Juke.png",
        "collisiondetector": "Swx54-collision-detector.png",
        "snapwexley": "Swx57-snap-wexley.png",
        "r2astromech": "R2_Astromech.jpg",
        "patternanalyzer": "Swx57-pattern-analyzer.png",
        "constablezuvio": "Swx61-constable-zuvio.png",
        "connernet": "Connor-net-1-.png",
        "engineupgrade": "Engine_Upgrade.png",
        "ketsuonyo": "Swx56-ketsu-onyo-crew.png",
        "scavengercrane": "Swx61-scavenger-crane.png",
        "talonbanecobra": "Swx32_talonbane_cobra_card-1-.png",
        "blackmarketslicertools": "Black-market-slicer-tools.jpg",
        "spacetugtractorarray": "Swx61-spacetug-tractor-array.png",
        "dengar": "Dengar-0.png",
        "daredevil": "Daredevil.png",
        "chardaanrefit": "Chardaan-refit.png",
        "primedthrusters": "Swx57-primed-thrusters.png",
        "blackone": "Swx57-black-one.png",
        "niennunb": "Swx57-nien-nunb.png",
        "stayontarget": "Stay-on-target.png",
        "targetingastromech": "Targeting-astromech.png",
        "elloasty": "Ello-asty.png"

    };


}



