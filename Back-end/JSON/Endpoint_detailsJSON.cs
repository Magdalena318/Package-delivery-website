using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_end.JSON
{
    public class Endpoint_detailsJSON
    {
        public NameJSON name { get; set; }
        public AddressJSON address { get; set; }

        public Endpoint_detailsJSON(NameJSON _name, AddressJSON _address)
        {
            name = _name;
            address = _address;
        }
    }
}