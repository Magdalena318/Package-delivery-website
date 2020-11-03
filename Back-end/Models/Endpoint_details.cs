using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_end.Models
{
    public class Endpoint_details
    {
        Name name { get; set; }
        Address address { get; set; }
        //DateTime date { get; set; }

        public Endpoint_details(Name _name, Address _address) {
            name = _name;
            address = _address;
        }

        public Name getName() {
            return name;
        }
        public Address getAddress()
        {
            return address;
        }
    }
}