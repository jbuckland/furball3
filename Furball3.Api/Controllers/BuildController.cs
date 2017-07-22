using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Furball3.Core.Services;
using Furball3.Data;

namespace Furball3.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class BuildController : Controller
    {
        // GET
        public List<Core.Build> All()
        {
            var data = new DataAccess();
            var service = new BuildService(data);
            return service.GetBuilds();
        }
    }
}