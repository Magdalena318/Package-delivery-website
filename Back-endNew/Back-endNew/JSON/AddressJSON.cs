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
        [JsonProperty("country")]
        public string country { get; set; }
        [JsonProperty("city")]
        public string city { get; set; }
        [JsonProperty("address")]
        public string address { get; set; }
        [JsonProperty("index")]
        public string index { get; set; }
        public LatLngJSON latlng { get; set; }

        public AddressJSON(string _country, string _city, string _address, string _index, string lat, string lng)
        {
            country = _country;
            city = _city;
            address = _address;
            index = _index;
            latlng = new LatLngJSON(lat, lng);
        }
    }
}