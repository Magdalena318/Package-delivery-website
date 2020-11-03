using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_end.JSON
{
    public class NameJSON
    {
        [JsonProperty("first_name")]
        public string first_name { get; set; }
        [JsonProperty("last_name")]
        public string last_name { get; set; }


        public NameJSON(string _first_name, string _last_name)
        {
            first_name = _first_name;
            last_name = _last_name;
        }
    }
}