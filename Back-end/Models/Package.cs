using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_end.Models
{
    public class Package
    {
        public int id { get; set; }
        public EndpointDetails pickup_details { get; set; }
        public EndpointDetails delivery_details { get; set; }
        public string size { get; set; }
        public double weight { get; set; }
    }
}