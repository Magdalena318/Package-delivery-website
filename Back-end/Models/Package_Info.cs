using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_end.Models
{
    public class Package_info
    {
        string size { get; set; }
        double weight { get; set; }

        public Package_info(string _size, double _weight) {
            size = _size;
            weight = _weight;
        }

        public string getSize() {
            return this.size;
        }

        public double getWeight()
        {
            return this.weight;
        }

        public void setSize(string _size)
        {
            size = _size;
        }

        public void setWeight(double _weight)
        {
            weight = _weight;
        }
    }
}