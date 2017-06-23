using System.Collections.Generic;

namespace Furball3.Core
{
    public interface IDataAccess
    {
        List<Ship> GetAllShips();
    }
}