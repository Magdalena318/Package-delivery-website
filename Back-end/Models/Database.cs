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