using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_endNew.Models
{
    public class VehicleSubmit
    {
        [JsonProperty("capacity")]
        public string capacity { get; set; }
        [JsonProperty("lat")]
        public string lat { get; set; }
        [JsonProperty("lng")]
        public string lng { get; set; }
    }
}