using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_endNew.JSON
{
    public class TestJSON
    {
        [JsonProperty("id")]
        public string id { get; set; }
        [JsonProperty("pickup_details")]
        public string pickup_details { get; set; }
    }
}