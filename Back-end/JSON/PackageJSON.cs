using Back_end.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_end.JSON
{
    public class PackageJSON
    {
        [JsonProperty("id")]
        public string id { get; set; }
        public Endpoint_detailsJSON pickup_details { get; set; }
        public Endpoint_detailsJSON delivery_details { get; set; }
        public Package_infoJSON package_info { get; set; }

        public PackageJSON(string _id, Endpoint_detailsJSON _pickup_details, Endpoint_detailsJSON _delivery_details, Package_infoJSON _package_info)
        {
            id = _id;
            pickup_details = _pickup_details;
            delivery_details = _delivery_details;
            package_info = _package_info;
        }

        //Constructing JSON out of package
        public PackageJSON(Package package) {
            id = package.getId().ToString();

            //Pickup details
            NameJSON pickup_name = new NameJSON(package.getPickupDetails().getName().getFirstName(), package.getPickupDetails().getName().getLastName());

            string pickup_country = package.getPickupDetails().getAddress().getCountry();
            string pickup_city = package.getPickupDetails().getAddress().getCity();
            string pickup_street_address = package.getPickupDetails().getAddress().getAddress();
            string pickup_index = package.getPickupDetails().getAddress().getIndex();
            string pickup_lat = package.getPickupDetails().getAddress().getLatLng().getLat().ToString();
            string pickup_lng = package.getPickupDetails().getAddress().getLatLng().getLng().ToString();
            AddressJSON pickup_address = new AddressJSON(pickup_country, pickup_city, pickup_street_address, pickup_index, pickup_lat, pickup_lng);
            pickup_details = new Endpoint_detailsJSON(pickup_name, pickup_address);

            //Delivery details
            NameJSON delivery_name = new NameJSON(package.getDeliveryDetails().getName().getFirstName(), package.getDeliveryDetails().getName().getLastName());

            string delivery_country = package.getDeliveryDetails().getAddress().getCountry();
            string delivery_city = package.getDeliveryDetails().getAddress().getCity();
            string delivery_street_address = package.getDeliveryDetails().getAddress().getAddress();
            string delivery_index = package.getDeliveryDetails().getAddress().getIndex();
            string delivery_lat = package.getDeliveryDetails().getAddress().getLatLng().getLat().ToString();
            string delivery_lng = package.getDeliveryDetails().getAddress().getLatLng().getLng().ToString();
            AddressJSON delivery_address = new AddressJSON(delivery_country, delivery_city, delivery_street_address, delivery_index, delivery_lat, delivery_lng);
            delivery_details = new Endpoint_detailsJSON(delivery_name, delivery_address);

            //Package details
            string size = package.getPackageInfo().getSize();
            string weight = package.getPackageInfo().getWeight().ToString();
            package_info = new Package_infoJSON(size, weight);           
        }
    }
}