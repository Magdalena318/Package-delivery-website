using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Web;

namespace Back_end.Models
{
    public class Database
    {
        List<Package> packages { get; set; }
        private int last_package_id { get; set; }

        public Database() {
            packages = new List<Package>();
            last_package_id = 10000000;

            Name pickup_name = new Name("John", "Doe");
            Address pickup_address = new Address("USA", "New York", "Washington st. 52", "51464", 52.6234, 54.45124);
            Endpoint_details pickup_details = new Endpoint_details(pickup_name, pickup_address);

            //Parsing delivery details
            Name delivery_name = new Name("Lisa", "Kekington");
            Address delivery_address = new Address("France", "Paris", "Rouge st. 21", "21152", 12.65453, 54.13545);
            Endpoint_details delivery_details = new Endpoint_details(delivery_name, delivery_address);

            //Parsing package_details
            Package_Info package_info = new Package_Info("big enough", 52.3);

            //Creating and adding a new package
            Package new_package = new Package(last_package_id, pickup_details, delivery_details, package_info);
            this.AddNewPackage(new_package);
        }

        public Package FindPackage(int id) {
            return packages.Find(p => p.id == id);
        }

        public int NextId() {
            last_package_id++;
            return last_package_id;
        }

        public void AddNewPackage(Package p) {
            packages.Add(p);
        }

        //For testing purposes only
        public void LogPackages() {
            foreach (Package p in packages){
                System.IO.File.WriteAllText(@"C:\Users\Cranberry\source\repos\homework\Back-end\Models\Logs\Log.txt", p.ToString());
                System.IO.File.WriteAllText(@"C:\Users\Cranberry\source\repos\homework\Back-end\Models\Logs\Log.txt", packages.Count.ToString());
            }

        }
    }
}