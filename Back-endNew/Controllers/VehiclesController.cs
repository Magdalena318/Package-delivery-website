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
            requested.ComputeRoute();
            return Ok(requested);
        }

        // POST: api/Vehicles
        public IHttpActionResult Post([FromBody] VehicleSubmit v)
        {
            if (v == null)
            {
                return NotFound();
            }

            int new_id = Database.NextVehicleId();
            Vehicle new_vehicle = new Vehicle(new_id, Convert.ToDouble(v.capacity), new LatLng(Convert.ToDouble(v.lat), Convert.ToDouble(v.lng)));
            Database.AddNewVehicle(new_vehicle);
            return Ok(new_id);
        }

        // PUT: api/Vehicles/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Vehicles/5
        public void Delete(int id)
        {
        }
    }
}
