using System;
using System.Collections.Generic;
using System.Linq;
using Back_end.Models;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;


namespace Back_end.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class VehiclesController : ApiController
    {

        // GET: api/Vehicles
        public IHttpActionResult Get()
        {
            return Ok(Database.GetVehicles());
        }

        // GET: api/Vehicles/5
        public IHttpActionResult Get(int id)
        {
            Vehicle requested = Database.FindVehicle(id);
            if (requested == null)
            {
                return NotFound();
            }

            return Ok(requested);
        }

        // POST: api/Vehicles
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Vehicles/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Vehicles/5
        public void Delete(int id)
        {
        }
    }
}
