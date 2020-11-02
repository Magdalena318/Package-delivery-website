using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Back_end.JSON;
using Back_end.Models;

namespace Back_end.Controllers
{

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PackagesController : ApiController
    {
        Database data = new Database();

        // GET: api/Packages
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Packages/5
        public IHttpActionResult Get(int id)
        {
            Package requested = data.FindPackage(id);
            if (requested == null) {
                return NotFound();
            }
            return Ok(requested);
        }

        // POST: api/Packages
        public IHttpActionResult Post([FromBody] PackageJSON json_package)
        {
            int id = data.NextId();
            Console.WriteLine(json_package);

            //Parsing pickup details
            Name pickup_name = new Name(json_package.pickup_details.name.first_name, json_package.pickup_details.name.last_name);
            string pickup_country = json_package.pickup_details.address.country;
            string pickup_city = json_package.pickup_details.address.city;
            string pickup_street_address = json_package.pickup_details.address.address;
            string pickup_index = json_package.pickup_details.address.index;
            double pickup_lat = Convert.ToDouble(json_package.pickup_details.address.latlng.lat);
            double pickup_lng = Convert.ToDouble(json_package.pickup_details.address.latlng.lng);
            Address pickup_address = new Address(pickup_country, pickup_city, pickup_street_address, pickup_index, pickup_lat, pickup_lng);
            Endpoint_details pickup_details = new Endpoint_details(pickup_name, pickup_address);

            //Parsing delivery details
            Name delivery_name = new Name(json_package.delivery_details.name.first_name, json_package.delivery_details.name.last_name);
            string delivery_country = json_package.delivery_details.address.country;
            string delivery_city = json_package.delivery_details.address.city;
            string delivery_street_address = json_package.delivery_details.address.address;
            string delivery_index = json_package.delivery_details.address.index;
            double delivery_lat = Convert.ToDouble(json_package.delivery_details.address.latlng.lat);
            double delivery_lng = Convert.ToDouble(json_package.delivery_details.address.latlng.lng);
            Address delivery_address = new Address(delivery_country, delivery_city, delivery_street_address, delivery_index, delivery_lat, delivery_lng);
            Endpoint_details delivery_details = new Endpoint_details(delivery_name, delivery_address);

            //Parsing package_details
            Package_Info package_info = new Package_Info(json_package.package_info.size, Convert.ToDouble(json_package.package_info.weight));

            //Creating and adding a new package
            Package new_package = new Package(id, pickup_details, delivery_details, package_info);
            data.AddNewPackage(new_package);
            data.LogPackages();

            return Ok(id);
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
