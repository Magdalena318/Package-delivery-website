using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_endNew.JSON
{
    public class LatLngJSON
    {
        [JsonProperty("lat")]
        public string lat { get; set; }
        [JsonProperty("lng")]
        public string lng { get; set; }

        public LatLngJSON(string _lat, string _lng)
        {
            lat = _lat;
            lng = _lng;
        }
    }

    public class AddressJSON
    {
        [JsonProperty("address")]
        public string address { get; set; }
        public LatLngJSON latlng { get; set; }

        public AddressJSON(string _address, string lat, string lng)
        {
            address = _address;
            latlng = new LatLngJSON(lat, lng);
        }
    }
}