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