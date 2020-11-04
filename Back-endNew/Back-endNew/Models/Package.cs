using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_endNew.Models
{
    public class Package
    {
        public int id { get; set; }
        EndpointDetails pickup_details { get; set; }
        EndpointDetails delivery_details { get; set; }
        PackageInfo package_info { get; set; }

        public Package(int _id, EndpointDetails _pickup_details, EndpointDetails _delivery_details, PackageInfo _package_info)
        {
            id = _id;
            pickup_details = _pickup_details;
            delivery_details = _delivery_details;
            package_info = _package_info;
        }

        public int getId()
        {
            return id;
        }

        public EndpointDetails getPickupDetails()
        {
            return pickup_details;
        }

        public EndpointDetails getDeliveryDetails()
        {
            return delivery_details;
        }

        public PackageInfo getPackageInfo()
        {
            return package_info;
        }
    }
}