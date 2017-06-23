using System.Collections.Generic;
using System.Security;
using Furball3.Core;

namespace Furball3.Data
{
    public class FileDatabase
    {
        private int MaxShipId;
        private int MaxUpgradeId;

        public FileDatabase()
        {
            this.MaxShipId = 0;
            this.MaxUpgradeId = 0;
        }

        public List<Ship> Ships { get; set; }

        public List<Upgrade> Upgrades { get; set; }

        public List<Build> Builds { get; set; }

        public Dictionary<string, string> NameToFileMap { get; set; }
    }
}