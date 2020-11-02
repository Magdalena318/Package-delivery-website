using System;
namespace Back_end.Models
{
	class LatLng
	{
		double lat { get; set; }
		double lng { get; set; }

		public LatLng(double _lat, double _lng)
		{
			this.lat = _lat;
			this.lng = _lng;
		}

	}

	public class Address
	{
		string country { get; set; }
		string city { get; set; }
		string address { get; set; }
		string index { get; set; }
		LatLng latlng { get; set; }

		public Address(string _country, string _city, string _address, string _index, double lat, double lng)
		{
			country = _country;
			city = _city;
			address = _address;
			index = _index;
			latlng = new LatLng(lat, lng);
		}
	}
}