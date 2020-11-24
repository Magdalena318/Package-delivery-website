using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_endNew.Models
{
    public class Package
    {
        public int id { get; set; }
        public EndpointDetails pickup_details { get; set; }
        public EndpointDetails delivery_details { get; set; }
        public string size { get; set; }
        public double weight { get; set; }

        public Package() {
            pickup_details = new EndpointDetails();
            delivery_details = new EndpointDetails();
        }

        public Package(Package p) {
            id = p.id;
            pickup_details = p.pickup_details;
            delivery_details = p.delivery_details;
            size = p.size;
            weight = p.weight;
        }

        int vehicle_id { get; set; }

        public void setVehicle(int _id)
        {
            vehicle_id = _id;
        }
        public int getVehicle()
        {
            return vehicle_id;
        }
    }
}