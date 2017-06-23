using System.Collections.Generic;

namespace Furball3.Core
{
    public class Ship : Record
    {
        public string Type { get; set; }
        public string PilotName { get; set; }
        public string PilotAbility { get; set; }
        public string PointCost { get; set; }
        public string ImagePath { get; set; }
        public List<SlotType> UpgradeSlots { get; set; }
    }
}