using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Back_end.Models;

namespace Back_end.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PackagesController : ApiController
    {
        private Package[] packages { get; set; }
        private int last_package_id = 10000000;

        // GET: api/Packages
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Packages/5
        public IHttpActionResult Get(int id)
        {
            Package requested = Array.Find(packages, p => p.id == id);
            if (requested == null) {
                return NotFound();
            }
            return Ok(requested);
        }

        // POST: api/Packages
        public IHttpActionResult Post([FromBody]Package new_package)
        {
            last_package_id += 1;
            Console.WriteLine(new_package);

            packages.Append(new_package);
            
            return Ok(last_package_id);
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
