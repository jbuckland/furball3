namespace Furball3.Core
{
    public class Upgrade : Record
    {
        public string Name { get; set; }
        public string PointCost { get; set; }
        public SlotType UpgradeType { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }
    }
}