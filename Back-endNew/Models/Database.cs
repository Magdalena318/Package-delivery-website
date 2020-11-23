using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace Back_endNew.Models
{
    public static class Database
    {
        static List<Package> packages { get; set; }
        static List<Vehicle> vehicles { get; set; }
        static private int last_package_id { get; set; }

        static Database()
        {
            packages = new List<Package>();
            last_package_id = 10000100;

            //Loading the initial dataset
            string filePath = System.IO.Path.GetFullPath(HostingEnvironment.ApplicationPhysicalPath + "\\Dataset\\InitialDataset.txt");
            using (var reader = new StreamReader(filePath))
            {
                reader.ReadLine(); //skipping headers

                while (!reader.EndOfStream)
                {
                    string line = reader.ReadLine();
                    string[] values = line.Split(';');

                    Package p = new Package();
                    p.id = Int32.Parse(values[0]);
                    //pickup
                    p.pickup_details = new EndpointDetails();
                    p.pickup_details.name = values[1];
                    p.pickup_details.address = values[2];
                    p.pickup_details.latlng = new LatLng();
                    p.pickup_details.latlng.lat = Convert.ToDouble(values[3]);
                    p.pickup_details.latlng.lng = Convert.ToDouble(values[4]);
                    p.pickup_details.date = values[5];
                    //delivery
                    p.delivery_details = new EndpointDetails();
                    p.delivery_details.name = values[6];
                    p.delivery_details.address = values[7];
                    p.delivery_details.latlng = new LatLng();
                    p.delivery_details.latlng.lat = Convert.ToDouble(values[8]);
                    p.delivery_details.latlng.lng = Convert.ToDouble(values[9]);
                    p.delivery_details.date = values[10];
                    //package details
                    p.size = values[11];
                    p.weight = Convert.ToDouble(values[12]);

                    AddNewPackage(p);
                }
            }
        }

        public static Package FindPackage(int id)
        {
            return packages.Find(p => p.id == id);
        }

        public static Vehicle FindVehicle(int id)
        {
            return vehicles.Find(p => p.id == id);
        }

        public static int NextId()
        {
            last_package_id++;
            return last_package_id;
        }

        public static void AddNewPackage(Package p)
        {
            packages.Add(p);
        }

        public static List<Package> GetPackages()
        {
            return packages;
        }

        public static List<Vehicle> GetVehicles()
        {
            return vehicles;
        }
    }
}