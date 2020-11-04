using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_endNew.Models
{
    public class Database
    {
        List<Package> packages { get; set; }
        private int last_package_id { get; set; }

        public Database()
        {
            packages = new List<Package>();
            last_package_id = 10000000;

            //Name pickup_name = new Name("John", "Doe");
            //Address pickup_address = new Address("USA", "New York", "Washington st. 52", "51464", 52.6234, 54.45124);
            //EndpointDetails pickup_details = new EndpointDetails(pickup_name, pickup_address);

            ////Parsing delivery details
            //Name delivery_name = new Name("Lisa", "Kekington");
            //Address delivery_address = new Address("France", "Paris", "Rouge st. 21", "21152", 12.65453, 54.13545);
            //EndpointDetails delivery_details = new EndpointDetails(delivery_name, delivery_address);

            ////Parsing package_details
            //PackageInfo package_info = new PackageInfo("big enough", 52.3);

            ////Creating and adding a new package
            //Package new_package = new Package(last_package_id, pickup_details, delivery_details, package_info);
            //this.AddNewPackage(new_package);
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

    }
}