using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_endNew.Models
{
    public class EndpointDetails
    {
        Name name { get; set; }
        Address address { get; set; }
        string date { get; set; }

        public EndpointDetails(Name _name, Address _address, string _date)
        {
            name = _name;
            address = _address;
            date = _date;
        }

        public Name getName()
        {
            return name;
        }
        public Address getAddress()
        {
            return address;
        }

        public string getDate()
        {
            return date;
        }
    }
}