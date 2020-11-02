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
        Package_Info package_info { get; set; }

        public Package(int _id, Endpoint_details _pickup_details, Endpoint_details _delivery_details, Package_Info _package_info) {
            id = _id;
            pickup_details = _pickup_details;
            delivery_details = _delivery_details;
            package_info = _package_info;
        }
    }
}