
//CONTROLLER
(function() {
  'use strict';
  angular.module('stamplay')
  .controller('homeController', homeController);
  homeController.$inject = ['Geo','$state',"$http","$scope", "$stamplay"];

  function homeController(Geo, $state, $http, $scope, $stamplay){

    getLocation();
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
    }

    function showPosition(position) {
      var curr_lat = position.coords.latitude;
      var curr_lon = position.coords.longitude;
      initialize(curr_lat, curr_lon); 
    }

    var map;
    var service;
    var infowindow;

    function initialize(curr_lat, curr_lon) {
    var current = new google.maps.LatLng(curr_lat, curr_lon);
//CREATE MAP INSTANCE WITH POSITION
    map = new google.maps.Map(document.getElementById('map'), {
      center: current,
      zoom: 15
    });

//CREATE MARKER FOR CENTER POSITION
    var green = 'http://www.googlemapsmarkers.com/v1/009900';
    var marker = new google.maps.Marker({
      position: current,
      map: map,
      icon: green
    });

//SETUP PARAMETER FOR REQUEST
    var request = {
      location: current,
      radius: '5000',
      types: ['restaurant','cafe','meal_delivery','meal_takeaway']
    };

//SEARCH FOR NEARBY PLACES
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
        var place = results[i];
        var name = place.name;
        var lat = place.geometry.location.lat();
        var lon = place.geometry.location.lng(); 
        var coords = new google.maps.LatLng(lat,lon);

//CREATE MARKERS FOR PLACES
        var blue = 'http://www.googlemapsmarkers.com/v1/0099FF';
        var marker = new google.maps.Marker({
          position: coords,
          map: map,
          title: name,
          icon: blue
        });  
      }
    }
  }
}
}
})();