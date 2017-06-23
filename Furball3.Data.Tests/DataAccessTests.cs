using NUnit.Framework;

namespace Furball3.Data.Tests
{
    
    [TestFixture]
    public class DataAccessTests
    {


        [SetUp]
        public void Setup()
        {
            
        }


        [Test]
        public void Constructor_valid_ReadsFile()
        {
            var data = new DataAccess();
            
            Assert.Pass("Did not throw exception!");

        }
        
    }
}