using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_endNew.JSON
{
    public class EndpointDetailsJSON
    {
        public NameJSON name { get; set; }
        public AddressJSON address { get; set; }

        [JsonProperty("date")]
        public string date { get; set; }

        public EndpointDetailsJSON(NameJSON _name, AddressJSON _address, string _date)
        {
            name = _name;
            address = _address;
            date = _date;
        }
    }
}