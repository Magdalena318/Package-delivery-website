using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace Back_end.Models
{
    public class Package
    {
        public int id { get; set; }
        Endpoint_details pickup_details { get; set; }
        Endpoint_details delivery_details { get; set; }
        Package_info package_info { get; set; }

        public Package(int _id, Endpoint_details _pickup_details, Endpoint_details _delivery_details, Package_info _package_info) {
            id = _id;
            pickup_details = _pickup_details;
            delivery_details = _delivery_details;
            package_info = _package_info;
        }

        public int getId() {
            return id;
        }

        public Endpoint_details getPickupDetails ()
        {
            return pickup_details;
        }

        public Endpoint_details getDeliveryDetails()
        {
            return delivery_details;
        }

        public Package_info getPackageInfo()
        {
            return package_info;
        }
    }
}