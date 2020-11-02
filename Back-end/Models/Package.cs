using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_end.Models
{
    public class Package
    {
        Address sender_address { get; set; }
        Address receiver_address { get; set; }
        Package_Info info { get; set; }
    }
}