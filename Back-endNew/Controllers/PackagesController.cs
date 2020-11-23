using Back_endNew.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;

namespace Back_endNew.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PackagesController : ApiController
    {

        // GET: api/Packages
        public IHttpActionResult Get()
        {
            List<Package> packages = Database.GetPackages();
            return Ok(packages);

        }

        // GET: api/Packages/5
        public IHttpActionResult Get(int id)
        {
            Package requested = Database.FindPackage(id);
            if (requested == null)
            {
                return NotFound();
            }

            return Ok(requested);
        }

        // POST: api/Packages
        public IHttpActionResult Post([FromBody] Package p)
        {
            if (p == null)
            {
                return NotFound();
            }

            int new_id = Database.NextPackageId();
            p.id = new_id;
            Database.AddNewPackage(p);
            return Ok(new_id);
        }

        // PUT: api/Packages/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Packages/5
        public void Delete(int id)
        {
        }
    }
}
