using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_end.JSON
{
    public class LatLngJSON {
        [JsonProperty("lat")]
        public string lat { get; set; }
        [JsonProperty("lng")]
        public string lng { get; set; }
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
        
    }
}