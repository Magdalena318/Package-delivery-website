using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_end.Models
{
    public class LatLng
    {
        public double lat { get; set; }
        public double lng { get; set; }

    }

    public class EndpointDetails
    {
        public string name { get; set; }
        public string address { get; set; }

        public LatLng latlng { get; set; }
        public string date { get; set; }
    }
}