using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_end.Models
{
    public class Vehicle
    {
        public int id { get; set; }
        public double capacity { get; set; }
        public double occupied { get; set; }
        public Package[] packages { get; set; }

        Dictionary<int, LatLng> route = new Dictionary<int, LatLng>();



        public bool AddPackage(Package p) {
            if (p.weight < capacity - occupied) {
                packages.Append(p);
                occupied += p.weight;
                return true;
            }
            return false;
        }

        public void ComputeRoute() { 
            
        }

    }
}