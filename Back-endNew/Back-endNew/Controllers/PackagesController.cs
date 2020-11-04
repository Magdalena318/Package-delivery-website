using Back_endNew.JSON;
using Back_endNew.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Back_endNew.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PackagesController : ApiController
    {
        private static Database data = new Database();

        // GET: api/Packages
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Packages/5
        public IHttpActionResult Get(int id)
        {
            Package requested = data.FindPackage(id);
            if (requested == null)
            {
                return NotFound();
            }

            PackageJSON response = requested.ToJSON();
            return Ok(response);
        }

        // POST: api/Packages
        public IHttpActionResult Post([FromBody]PackageJSON json_package)
        {
            if (json_package == null)
            {
                return NotFound();
            }

            int new_id = data.NextId();
            Package new_package = new Package(new_id, json_package);
            return Ok(new_id);
        }

        // PUT: api/Packages/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Packages/5
        public void Delete(int id)
        {
        }
    }
}
