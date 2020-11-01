using System;

class LatLng
{
	double lat;
	double lng;

	LatLng(double _lat, double _lng) {
		this.lat = _lat;
		this.lng = _lng;
	}

	double getLat() {
		return lat;
	}

	double getLng()
	{
		return lng;
	}
}

public class Address
{
	string country;
	string city;
	string address;
	string index;
	LatLng latlng;

	public Address(string _country, string _city, string _address, string _index, double lat, double lng)
	{
		country = _country;
		city = _city;
		address = _address;
		index = _index;
		latlng = new LatLng(lat, lng);
	}

	string getCountry() {
		return country;
	}

	string getCity()
	{
		return city;
	}

	string getAddress()
	{
		return address;
	}

	string getIndex()
	{
		return index;
	}

	LatLng getLatLng()
	{
		return latlng;
	}
}
