using System.Collections.Generic;
using System.IO;
using System.Reflection;
using Furball3.Core;
using Newtonsoft.Json;

namespace Furball3.Data
{
    public class DataAccess : IDataAccess
    {
        private const string DB_FILE_PATH = "../Furball3.Data/database.json";

        private FileDatabase database;

        public DataAccess()
        {
            LoadDbFromFile();
        }


        public List<Ship> GetAllShips()
        {
            var ships = new List<Ship>();
            ships.Add(new Ship {PilotName = "foo"});
            return ships;
        }

        public List<Build> GetAllBuilds()
        {
            return database.Builds;
        }

        public List<Build> GetToPrint()
        {
            var fileText = File.ReadAllText("../Furball3.Data/toPrint.json");
            var printBuilds = ConvertFromXWS(fileText);
            SetFilePaths(printBuilds);
            return printBuilds;

        }

        public List<Build> ConvertFromXWS(string xwsString)
        {
            var builds = new List<Build>();
            var xwsList = JsonConvert.DeserializeObject<XWSList>(xwsString);

            foreach (var xwsPilot in xwsList.pilots)
            {
                var build = new Build();
                build.ChosenShip = new Ship();
                build.ChosenShip.PilotName = xwsPilot.name;
                build.Upgrades = new List<Upgrade>();
                foreach (var key in xwsPilot.upgrades.Keys)
                {
                    foreach (var upgradeName in xwsPilot.upgrades[key])
                    {
                        build.Upgrades.Add(new Upgrade {Name = upgradeName, UpgradeType = ConvertToSlotType(key)});
                    }
                }
                builds.Add(build);
            }

            return builds;
        }

        private SlotType ConvertToSlotType(string slotName)
        {
            var type = SlotType.Null;
            if (slotName == "amd") type = SlotType.Astromech;
            else if (slotName == "bomb") type = SlotType.Bomb;
            else if (slotName == "cannon") type = SlotType.Cannon;
            else if (slotName == "crew") type = SlotType.Crew;
            else if (slotName == "ept") type = SlotType.ElitePilot;
            else if (slotName == "illicit") type = SlotType.Illicit;
            else if (slotName == "missile") type = SlotType.Missile;
            else if (slotName == "mod") type = SlotType.Modification;
            else if (slotName == "samd") type = SlotType.SalvagedAstromech;
            else if (slotName == "system") type = SlotType.System;
            else if (slotName == "tech") type = SlotType.Tech;
            else if (slotName == "title") type = SlotType.Title;
            else if (slotName == "torpedo") type = SlotType.Torpedo;
            else if (slotName == "turret") type = SlotType.Turret;

            return type;
        }


        private string MapNameToFile(string cardName)
        {
            string filePath = null;

            if (nameToFileMap.ContainsKey(cardName))
            {
                filePath = nameToFileMap[cardName];
                if (filePath == string.Empty)
                    filePath = null;
            }
            return filePath;
        }

        private void LoadDbFromFile()
        {
            var fileText = File.ReadAllText(DB_FILE_PATH);
            database = JsonConvert.DeserializeObject<FileDatabase>(fileText);
            if (this.database == null)
                this.database = new FileDatabase();

            if (this.database.Ships == null)
                this.database.Ships = new List<Ship>();

            if (this.database.Upgrades == null)
                this.database.Upgrades = new List<Upgrade>();

            SetFilePaths(database.Builds);
        }

        private void SetFilePaths(List<Build> builds)
        {
            foreach (var build in builds)
            {
                build.ChosenShip.ImagePath = MapNameToFile(build.ChosenShip.PilotName);
                foreach (var upgrade in build.Upgrades)
                {
                    upgrade.ImagePath = MapNameToFile(upgrade.Name);
                }
            }
        }

        private void SaveDbToFile()
        {
            var jsonData = JsonConvert.SerializeObject(database, Formatting.Indented);
            File.WriteAllText(DB_FILE_PATH, jsonData);
        }

        private Dictionary<string, string> nameToFileMap = new Dictionary<string, string>()
        {
            {"accuracycorrector", "Accuracy-corrector.png"},
            {"advancedcloakingdevice", "Advanced-cloaking-device.png"},
            {"advancedslam", "advancedslam.png"},
            {"allianceoverhaul", "Overhaul.png"},
            {"assaultmissiles", "assaultmissiles.png"},
            {"autothrusters", "autothrusters.png"},
            {"awingtestpilot", "awingtestpilot.png"},
            {"backdraft", "Swx54-backdraft.png"},
            {"bb8", "bb8.png"},
            {"blasterturret", "blasterturret.png"},
            {"bombardier", "bombardier.png"},
            {"bombloadout", "bombloadout.png"},
            {"btla4ywing", "btla4ywing.png"},
            {"clustermines", "clustermines.png"},
            {"clustermissiles", "clustermissiles.png"},
            {"countessryad", "countess-ryad.png"},
            {"deadeye", "deadeye.png"},
            {"deathfire", "deathfire.png"},
            {"drearenthal", "Drea-renthal-1-.png"},
            {"echo", "echo.png"},
            {"extramunitions", "extramunitions.png"},
            {"firecontrolsystem", "Fire-control-system.png"},
            {"gammasquadronveteran", "Swx52-gamma-squad-vet.png"},
            {"guri", "guri.png"},
            {"homingmissiles", "Homing_Missiles.png"},
            {"hortonsalm", "hortonsalm.png"},
            {"hullupgrade", "Hull_Modification.png"},
            {"ioncannonturret", "ioncannonturret.png"},
            {"iontorpedoes", "iontorpedoes.png"},
            {"kavil", "kavil.png"},
            {"lukeskywalker", "lukeskywalker.png"},
            {"marksmanship", "Marksmanship.png"},
            {"moldycrow", "moldycrow.png"},
            {"munitionsfailsafe", "munitionsfailsafe.png"},
            {"nightbeast", "Night_Beast.png"},
            {"norrawexley", "Swx53-norra-wexley.png"},
            {"outmaneuver", "Outmaneuver.png"},
            {"palobgodalhi", "palobgodalhi.png"},
            {"plasmatorpedoes", "plasmatorpedoes.png"},
            {"poedameron", "poedameron.png"},
            {"predator", "predator.png"},
            {"protonrockets", "Proton-rockets.png"},
            {"protontorpedoes", "Proton-torpedoes.png"},
            {"proximitymines", "proximitymines.png"},
            {"pushthelimit", "pushthelimit.png"},
            {"quickdraw", "Swx54-quickdraw.png"},
            {"r2d2", "R2-d2.png"},
            {"r3astromech", "Swx53-r3-astromech.png"},
            {"r4agromech", "r4agromech.png"},
            {"r4b11", "R4-b11-1-.png"},
            {"rage", "Rage.png"},
            {"reconspecialist", "reconspecialist.png"},
            {"royalguardtie", "royalguardtie.png"},
            {"seismiccharges", "seismiccharges.png"},
            {"soontirfel", "soontirfel.png"},
            {"specialopstraining", "SpecOpsTraining.png"},
            {"stealthdevice", "stealthdevice.png"},
            {"syndicatethug", "syndicatethug.png"},
            {"tailgunner", "Swx53-tail-gunner.png"},
            {"theinquisitor", "Inquisitor.png"},
            {"tied", "tied.png"},
            {"tiex7", "tiex7.png"},
            {"tiev1", "Swx40_tiev1title.png"},
            {"tractorbeam", "tractorbeam.png"},
            {"twinionenginemkii", "Twin-ion-engine-mk2-1-.png"},
            {"twinlaserturret", "twinlaserturret.png"},
            {"tychocelchu", "tychocelchu.png"},
            {"unhingedastromech", "Unhinged-astromech.png"},
            {"vectoredthrusters", "Swx53-vectored-thrusters.png"},
            {"veteraninstincts", "veteraninstincts.png"},
            {"wardensquadronpilot", "wardensquadronpilot.png"},
            {"weaponsguidance", "Weapons-guidance.png"},
            {"zetaace", "Zeta-ace.png"},
            {"wedgeantilles", "Wedge-antilles.png"},
            {"integratedastromech", "Integrated-astromech.png"},
            {"ionbombs", "Ion-bombs-1-.png"},
            {"r3a2", "R3-a2.png"},
            {"fennrau", "FennRau.png"},
            {"concorddawnprotector", "Swx55-concord-dawn-protector.png"},
            {"snapshot", "Swx57-snap-shot.png"},
            {"maarekstele", "Swx52-maarek-stele.png"},
            {"juke", "Juke.png"},
            {"collisiondetector", "Swx54-collision-detector.png"},
            {"snapwexley", "Swx57-snap-wexley.png"},
            {"r2astromech", "R2_Astromech.jpg"},
            {"patternanalyzer", "Swx57-pattern-analyzer.png"},
            {"constablezuvio", "Swx61-constable-zuvio.png"},
            {"connernet", "Connor-net-1-.png"},
            {"engineupgrade", "Engine_Upgrade.png"},
            {"ketsuonyo", "Swx56-ketsu-onyo-crew.png"},
            {"scavengercrane", "Swx61-scavenger-crane.png"},
            {"talonbanecobra", "Swx32_talonbane_cobra_card-1-.png"},
            {"blackmarketslicertools", "Black-market-slicer-tools.jpg"},
            {"spacetugtractorarray", "Swx61-spacetug-tractor-array.png"},
            {"dengar", "Dengar-0.png"},
            {"daredevil", "Daredevil.png"},
            {"chardaanrefit", "Chardaan-refit.png"},
            {"primedthrusters", "Swx57-primed-thrusters.png"},
            {"blackone", "Swx57-black-one.png"},
            {"niennunb", "Swx57-nien-nunb.png"},
            {"stayontarget", "Stay-on-target.png"},
            {"targetingastromech", "Targeting-astromech.png"},
            {"elloasty", "Ello-asty.png"}
        };
    }
}