using System.Collections.Generic;

namespace Furball3.Core.Services
{
    public class ShipService
    {
        private IDataAccess dataAccess;

        public ShipService(IDataAccess dataAccess)
        {
            this.dataAccess = dataAccess;
        }


        public List<Ship> GetShips()
        {
            var ships = this.dataAccess.GetAllShips();
            return ships;
        }
    }
}