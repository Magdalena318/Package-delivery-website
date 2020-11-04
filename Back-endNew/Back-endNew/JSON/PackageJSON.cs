using Back_endNew.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_endNew.JSON
{
    public class PackageJSON
    {
        [JsonProperty("id")]
        public string id { get; set; }
        public EndpointDetailsJSON pickup_details { get; set; }
        public EndpointDetailsJSON delivery_details { get; set; }
        public PackageInfoJSON package_info { get; set; }

        public PackageJSON(string _id, EndpointDetailsJSON _pickup_details, EndpointDetailsJSON _delivery_details, PackageInfoJSON _package_info)
        {
            id = _id;
            pickup_details = _pickup_details;
            delivery_details = _delivery_details;
            package_info = _package_info;
        }
    }
}