using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_endNew.Models
{
    public class Name
    {
        string first_name { get; set; }
        string last_name { get; set; }

        public Name(string _first_name, string _last_name)
        {
            first_name = _first_name;
            last_name = _last_name;
        }

        public string getFirstName()
        {
            return first_name;
        }

        public string getLastName()
        {
            return last_name;
        }
    }
}