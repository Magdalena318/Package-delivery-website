using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_end.Models
{
    public class Database
    {
        List<Package> packages { get; set; }
        private int last_package_id { get; set; }

        public Database()
        {
            packages = new List<Package>();
            last_package_id = 10000000;

            //Creating and adding a new package
            EndpointDetails dummy_pickup = new EndpointDetails();
            dummy_pickup.first_name = "John";
            dummy_pickup.last_name = "Doe";
            dummy_pickup.address = "USA, New York, Washington st. 52, 51464";
            dummy_pickup.date = "21/32/2025";
            dummy_pickup.latlng = new LatLng();
            dummy_pickup.latlng.lat = 52.6234;
            dummy_pickup.latlng.lng = 54.45124;
            EndpointDetails dummy_delivery = new EndpointDetails();
            dummy_delivery.first_name = "Lisa";
            dummy_delivery.last_name = "Kekington";
            dummy_delivery.address = "France, Paris, Rouge st. 21, 21152";
            dummy_delivery.date = "21/04/2005";
            dummy_delivery.latlng = new LatLng();
            dummy_delivery.latlng.lat = 12.65453;
            dummy_delivery.latlng.lng = 54.13545;

            Package new_package = new Package();
            new_package.pickup_details = dummy_pickup;
            new_package.delivery_details = dummy_delivery;
            new_package.id = last_package_id;
            new_package.size = "big enough";
            new_package.weight = 26;

            this.AddNewPackage(new_package);
        }

        public Package FindPackage(int id)
        {
            return packages.Find(p => p.id == id);
        }

        public int NextId()
        {
            last_package_id++;
            return last_package_id;
        }

        public void AddNewPackage(Package p)
        {
            packages.Add(p);
        }

        public List<Package> GetDatabase()
        {
            return packages;
        }

    }
}