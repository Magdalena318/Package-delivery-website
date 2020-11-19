using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_end.Models
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