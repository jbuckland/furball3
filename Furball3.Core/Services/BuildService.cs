using System.Collections.Generic;


namespace Furball3.Core.Services
{
    public class BuildService
    {
        private IDataAccess dataAccess;

        public BuildService(IDataAccess dataAccess)
        {
            this.dataAccess = dataAccess;
        }


        public List<Build> GetBuilds()
        {
            var builds= this.dataAccess.GetAllBuilds();
            return builds;
        }
    }
}