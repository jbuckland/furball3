using System.Collections.Generic;
using Furball3.Core.Services;
using Furball3.Data;
using Microsoft.AspNetCore.Mvc;

namespace Furball3.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class Ship : Controller
    {
        private ShipService service;

        public Ship()
        {
        }

        public List<Core.Ship> All()
        {
            var data = new DataAccess();
            service = new ShipService(data);
            return service.GetShips();
        }
    }
}