﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_endNew.Models
{
    public class Endpoint {
        public int package_id { get; set; }
        public bool delivery { get; set; }
        public LatLng location { get; set; }
    }

    public class Vehicle
    {
        public LatLng depot { get; set; }
        public int id { get; set; }
        public double capacity { get; set; }
        public double occupied { get; set; }
        List<Package> packages { get; set; }
        List<Endpoint> route { get; set; }

        public Vehicle(int _id, double _capacity, LatLng _depot) {
            id = _id;
            capacity = _capacity;
            depot = _depot;
            occupied = 0;
            packages = new List<Package>();
            route = new List<Endpoint>();
        }

        public bool AddPackage(Package p)
        {
            if (p.weight < capacity - occupied)
            {
                packages.Append(p);
                occupied += p.weight;
                return true;
            }
            return false;
        }

        static double distance(LatLng p, LatLng r)
        {
            return Math.Sqrt(Math.Pow(p.lat - r.lat, 2) + Math.Pow(p.lat - r.lng, 2));
        }

        //Returns the next endpoint
        static Endpoint closestPoint(List<Endpoint> points, Endpoint start)
        {
            Endpoint next = new Endpoint();

            foreach (var p in points) {
                if (distance(start.location, p.location) < distance(start.location, next.location))
                    next = p;
            }

            return next;
        }

        public void ComputeRoute()
        {
            //Setting the depot
            Endpoint depot_start = new Endpoint();
            depot_start.package_id = 0;
            depot_start.delivery = false;
            depot_start.location = depot;
            route.Add(depot_start);

            //Initialize the list with the pickup points
            List<Endpoint> tmp = new List<Endpoint>();
            for (int i = 0; i < packages.Count; i++) {
                Endpoint cur = new Endpoint();
                cur.package_id = packages[i].id;
                cur.location = packages[i].pickup_details.latlng;
                cur.delivery = false;
                tmp.Add(cur);
            }

            Endpoint start = depot_start;
            while (tmp.Count > 0) {
                Endpoint next = closestPoint(tmp, start);
                route.Add(next);
                
                //Add delivery points
                if (next.delivery == false) {
                    Endpoint cur = new Endpoint();
                    cur.package_id = next.package_id;
                    Package cur_package = packages.Find(p => p.id == next.package_id);
                    cur.location = cur_package.delivery_details.latlng;
                    cur.delivery = true;
                    tmp.Add(cur);
                }
            }

            //Setting the depot end
            Endpoint depot_end = new Endpoint();
            depot_end.package_id = 0;
            depot_end.delivery = true;
            depot_end.location = depot;
            route.Add(depot_end);
        }

    }
}