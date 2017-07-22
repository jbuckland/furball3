using System.Collections.Generic;

namespace Furball3.Core
{
    public class XWSPilot
    {
        public string name { get; set; }
        public string ship { get; set; }
        public int points { get; set; }
        public Dictionary<string, List<string>> upgrades { get; set; }
    }
}