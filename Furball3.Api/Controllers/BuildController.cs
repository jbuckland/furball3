using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Furball3.Core;
using Furball3.Core.Services;
using Furball3.Data;

namespace Furball3.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class BuildController : Controller
    {
        private IDataAccess data;
        private BuildService service;
        
        public BuildController()
        {
            data = new DataAccess();
            service = new BuildService(data);
        }
        
        // GET
        public List<Build> All()
        {
            return service.GetBuilds();
        }

        public List<Build> ToPrint()
        {
            return service.GetToPrint();
        }
    }
}