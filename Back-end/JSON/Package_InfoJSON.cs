using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_end.JSON
{
    public class Package_infoJSON
    {
        [JsonProperty("size")]
        public string size { get; set; }
        [JsonProperty("weight")]
        public string weight { get; set; }

        public Package_infoJSON(string _size, string _weight)
        {
            size = _size;
            weight = _weight;
        }
    }
}