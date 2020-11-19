﻿using Back_end.Models;
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

        // GET: api/Packages
        public IHttpActionResult Get()
        {
            return Ok(Database.GetPackages());
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
        public IHttpActionResult Post([FromBody]Package p)
        {
            if (p == null)
            {
                return NotFound();
            }

            int new_id = Database.NextId();
            p.id = new_id;
            Database.AddNewPackage(p);
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
