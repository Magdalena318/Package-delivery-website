using Back_end.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Back_end.Controllers
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
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Packages
        public IHttpActionResult Post([FromBody]Package p)
        {
            if (p == null)
            {
                return NotFound();
            }

            int new_id = data.NextId();
            //p.id = new_id;
            data.AddNewPackage(p);
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
