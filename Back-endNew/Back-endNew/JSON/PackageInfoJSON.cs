using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_endNew.JSON
{
    public class PackageInfoJSON
    {
        [JsonProperty("size")]
        public string size { get; set; }
        [JsonProperty("weight")]
        public string weight { get; set; }

        public PackageInfoJSON(string _size, string _weight)
        {
            size = _size;
            weight = _weight;
        }
    }
}