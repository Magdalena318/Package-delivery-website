using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_end.JSON
{
    public class PackageJSON
    {
        [JsonProperty("id")]
        public string id { get; set; }
        public Endpoint_detailsJSON pickup_details { get; set; }
        public Endpoint_detailsJSON delivery_details { get; set; }
        public Package_InfoJSON package_info { get; set; }
    }
}