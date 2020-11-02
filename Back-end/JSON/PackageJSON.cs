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
        Endpoint_detailsJSON pickup_details { get; set; }
        Endpoint_detailsJSON delivery_details { get; set; }
        Package_InfoJSON package_info { get; set; }
    }
}