using System.Collections.Generic;

namespace Furball3.Core
{
    public class Build
    {
        public Ship ChosenShip { get; set; }
        public List<Upgrade> Upgrades { get; set; }
        public string Description { get; set; }
    }
}