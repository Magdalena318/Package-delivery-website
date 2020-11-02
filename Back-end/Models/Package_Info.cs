using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_end.Models
{
    public class Package_Info
    {
        double size { get; set; }
        double weight { get; set; }

        Package_Info(double _size, double _weight) {
            size = _size;
            weight = _weight;
        }
    }
}