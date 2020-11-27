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
        static private int last_vehicle_id { get; set; }

        static Database()
        {
            vehicles = new List<Vehicle>();
            last_vehicle_id = 0;
            Vehicle v1 = new Vehicle(NextVehicleId(), 1000, new LatLng(40.738555, -111.938347));
            AddNewVehicle(v1);
            Vehicle v2 = new Vehicle(NextVehicleId(), 1500, new LatLng(44.956586, -93.251868));
            AddNewVehicle(v2);
            Vehicle v3 = new Vehicle(NextVehicleId(), 3000, new LatLng(36.131984, -86.737220));
            AddNewVehicle(v3);

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
                    //p.pickup_details = new EndpointDetails();
                    p.pickup_details.name = values[1];
                    p.pickup_details.address = values[2];
                    p.pickup_details.latlng = new LatLng(Convert.ToDouble(values[3]), Convert.ToDouble(values[4]));
                    p.pickup_details.date = values[5];
                    //delivery
                    //p.delivery_details = new EndpointDetails();
                    p.delivery_details.name = values[6];
                    p.delivery_details.address = values[7];
                    p.delivery_details.latlng = new LatLng(Convert.ToDouble(values[8]), Convert.ToDouble(values[9]));
                    p.delivery_details.date = values[10];
                    //package details
                    p.size = values[11];
                    p.weight = Convert.ToDouble(values[12]);

                    AddNewPackage(p);
                }

                DistributePackages();
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

        public static int NextPackageId()
        {
            last_package_id++;
            return last_package_id;
        }

        public static int NextVehicleId()
        {
            last_vehicle_id++;
            return last_vehicle_id;
        }

        public static void AddNewPackage(Package p)
        {
            bool result = false;
            List<Vehicle> tmp = vehicles.ConvertAll(x => new Vehicle(x));
            while (result == false && tmp.Count > 0)
            {
                int cur_id = closestVehicle(tmp, p);
                Vehicle candidate = FindVehicle(cur_id);
                result = candidate.AddPackage(p);
                tmp.Remove(tmp.Find(v => v.id == cur_id));
                result = true;
            }
            packages.Add(p);
        }

        public static void AddNewVehicle(Vehicle v)
        {
            vehicles.Add(v);
        }

        public static List<Package> GetPackages()
        {
            return packages;
        }

        public static List<Vehicle> GetVehicles()
        {
            return vehicles;
        }

        static double distance(LatLng p, LatLng r)
        {
            return Math.Sqrt(Math.Pow(p.lat - r.lat, 2) + Math.Pow(p.lng - r.lng, 2));
        }

        static int closestVehicle(List<Vehicle> vls, Package start)
        {
            int vehicle_id = vls[0].id;
            double cur_distance = distance(start.pickup_details.latlng, vls[0].depot);

            foreach (var v in vls)
            {
                if (((v.capacity - v.occupied) - start.weight) >= 0)
                {
                    if (distance(start.pickup_details.latlng, v.depot) < cur_distance || distance(start.delivery_details.latlng, v.depot) < cur_distance)
                    {
                        vehicle_id = v.id;
                        cur_distance = Math.Min(distance(start.pickup_details.latlng, v.depot), distance(start.delivery_details.latlng, v.depot));
                    }
                }
            }

            return vehicle_id;
        }

        public static void DistributePackages() {
            foreach (Package p in packages) {
                bool result = false;
                List<Vehicle> tmp = vehicles.ConvertAll(x => new Vehicle(x));
                while (result == false && tmp.Count > 0) {
                    int cur_id = closestVehicle(tmp, p);
                    Vehicle candidate = FindVehicle(cur_id);
                    result = candidate.AddPackage(p);
                    tmp.Remove(tmp.Find(v => v.id == cur_id));
                }
            }
        }
    }
}