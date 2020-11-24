using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_endNew.Models
{
    public class LatLng
    {

        public double lat { get; set; }
        public double lng { get; set; }

        public LatLng() { 
        
        }

        public LatLng(double v1, double v2)
        {
            lat = v1;
            lng = v2;
        }
    }

    public class EndpointDetails
    {
        public string name { get; set; }
        public string address { get; set; }

        public LatLng latlng { get; set; }
        public string date { get; set; }
    }
}