using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Back_endNew.Models
{
	public class LatLng
	{
		double lat { get; set; }
		double lng { get; set; }

		public LatLng(double _lat, double _lng)
		{
			this.lat = _lat;
			this.lng = _lng;
		}

		public double getLat()
		{
			return lat;
		}

		public double getLng()
		{
			return lng;
		}
	}

	public class Address
    {
		string address { get; set; }

		LatLng latlng { get; set; }

		public Address(string _address, double lat, double lng)
		{
			address = _address;
			latlng = new LatLng(lat, lng);
		}

		public string getAddress()
		{
			return address;
		}

		public LatLng getLatLng()
		{
			return latlng;
		}
	}
}