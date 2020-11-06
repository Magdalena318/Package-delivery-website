using Back_endNew.JSON;
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

        public Package(int _id,  PackageJSON package)
        {
            id = _id;

            //Pickup details
            Name pickup_name = new Name(package.pickup_details.name.first_name, package.pickup_details.name.last_name);
            string pickup_street_address = package.pickup_details.address.address;
            double pickup_lat = Convert.ToDouble(package.pickup_details.address.latlng.lat);
            double pickup_lng = Convert.ToDouble(package.pickup_details.address.latlng.lng);
            Address pickup_address = new Address(pickup_street_address, pickup_lat, pickup_lng);
            string pickup_date = package.pickup_details.date;
            pickup_details = new EndpointDetails(pickup_name, pickup_address, pickup_date);

            //Delivery details
            Name delivery_name = new Name(package.delivery_details.name.first_name, package.delivery_details.name.last_name);
            string delivery_street_address = package.delivery_details.address.address;
            double delivery_lat = Convert.ToDouble(package.delivery_details.address.latlng.lat);
            double delivery_lng = Convert.ToDouble(package.delivery_details.address.latlng.lng);
            Address delivery_address = new Address(delivery_street_address, delivery_lat, delivery_lng);
            string delivery_date = package.delivery_details.date;
            delivery_details = new EndpointDetails(delivery_name, delivery_address, delivery_date);

            //Package details
            string size = package.package_info.size;
            double weight = Convert.ToDouble(package.package_info.weight);
            package_info = new PackageInfo(size, weight);
        }

        //Constructing JSON out of package
        public PackageJSON ToJSON()
        {
            //Pickup details
            NameJSON pickup_name = new NameJSON(this.pickup_details.getName().getFirstName(), this.pickup_details.getName().getLastName());
            string pickup_street_address = this.pickup_details.getAddress().getAddress();
            string pickup_lat = this.pickup_details.getAddress().getLatLng().getLat().ToString();
            string pickup_lng = this.pickup_details.getAddress().getLatLng().getLng().ToString();
            AddressJSON pickup_address = new AddressJSON(pickup_street_address, pickup_lat, pickup_lng);
            string pickup_date = this.pickup_details.getDate();
            EndpointDetailsJSON pickup_details = new EndpointDetailsJSON(pickup_name, pickup_address, pickup_date);

            //Delivery details
            NameJSON delivery_name = new NameJSON(this.delivery_details.getName().getFirstName(), this.delivery_details.getName().getLastName());
            string delivery_street_address = this.delivery_details.getAddress().getAddress();
            string delivery_lat = this.delivery_details.getAddress().getLatLng().getLat().ToString();
            string delivery_lng = this.delivery_details.getAddress().getLatLng().getLng().ToString();
            AddressJSON delivery_address = new AddressJSON(delivery_street_address, delivery_lat, delivery_lng);
            string delivery_date = this.delivery_details.getDate();
            EndpointDetailsJSON delivery_details = new EndpointDetailsJSON(delivery_name, delivery_address, delivery_date);

            //Package details
            string size = this.package_info.getSize();
            string weight = this.package_info.getWeight().ToString();
            PackageInfoJSON package_info = new PackageInfoJSON(size, weight);

            PackageJSON json_package = new PackageJSON(this.id.ToString(), pickup_details, delivery_details, package_info);
            return json_package;
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