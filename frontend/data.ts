import { Build, Ship, Upgrade, SlotType } from '../app/core/models.js';
import { IMainData } from './main-presenter.js';
import * as $ from 'jquery';

export class Data implements IMainData {
    public getBuilds_ViaApi(): JQueryXHR {
        let promise = $.get("/api/build/all");
        return promise;
    }

    public getBuilds(): Array<Build> {
        var retVal = new Array<Build>();
        for (var b = 0; b < this.buildLists.length; b++) {
            var buildList = this.buildLists[b];

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

    public buildLists: any = [
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
                            "weaponsguidance"
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
                    "name": "wardensquadronpilot",
                    "ship": "kwing",
                    "upgrades": {
                        "torpedo": [
                            "extramunitions"
                        ],
                        "bomb": [
                            "proximitymines",
                            "clustermines"
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


    public oldLists: any = [
        {
            "name": "to print",
            "faction": "rebel",
            "points": 100,
            "description": "",
            "pilots": [
                {
                    "name": "hortonsalm",
                    "ship": "ywing",
                    "upgrades": {
                        "torpedo": [
                            "bombloadout"
                        ],
                        "turret": [
                            "twinlaserturret"
                        ],
                        "bomb": [
                            "ionbombs"
                        ],
                        "amd": [
                            "r3a2"
                        ],
                        "title": [
                            "btla4ywing"
                        ]
                    },
                    "points": 35
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


    public nameToFileMap: any = {
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
        "concorddawnprotector": "Swx55-concord-dawn-protector.png"
    };
}