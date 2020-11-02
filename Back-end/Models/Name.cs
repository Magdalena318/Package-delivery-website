using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;

namespace Back_end.Models
{
    public class Name
    {
        string  first_name { get; set; }
        string last_name { get; set; }

        public Name(string _first_name, string _last_name) {
            first_name = _first_name;
            last_name = _last_name;
        }
    }
}