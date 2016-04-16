
//FACTORY

(function() {
  'use strict';
  angular.module('stamplay')
  .factory('Geo', Geo);

  function Geo($http, $q, $window) {

	return {

    	getPlaces : function(){
        var lat, 
            lng, 
            map, 
            marker, 
            image;

      	var q = $q.defer();
        navigator.geolocation.getCurrentPosition(showPosition);
//GET CURRENT LOCATION   
        function showPosition(position) {
          lat = position.coords.latitude;
          lng = position.coords.longitude; 
          var myLatLng = {lat: lat, lng: lng};
//INITIALIZE MAP 
          map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: lat, lng: lng},
            zoom: 16
          });
//MARKERS - USER
          image = "/public/images/green-marker.png";
          marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'YOU ARE HERE!',
            icon: image,
            animation: google.maps.Animation.BOUNCE
          });
//SEARCH REQUEST
          var request = {
            location:  new google.maps.LatLng(lat, lng),
            types: ["restaurant", "bar", "meal_takeaway"],
            rankBy: google.maps.places.RankBy.DISTANCE
          };

          var service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, callback);

          function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
              for(var i = 0; i<results.length; i++){
                var place_name = results[i].name;
                var place_lat = results[i].geometry.location.lat();
                var place_lng = results[i].geometry.location.lng();
                var place_LatLng = {lat: place_lat, lng: place_lng};
                var place_image = "/public/images/blue-pin.png";
                var place_marker = new google.maps.Marker({
                  position: place_LatLng,
                  map: map,
                  title: place_name,
                  icon: place_image,
                });
              }
              q.resolve(results);
            }
          }        
        }
        return q.promise;
    	},
      getDirections : function(coords){
        var lat, 
            lng, 
            map, 
            marker, 
            image, 
            myLatLng, 
            placeLatLng, 
            path, 
            flightPath,
            directions;

        var q = $q.defer();
        navigator.geolocation.getCurrentPosition(showPosition);
//GET CURRENT LOCATION   
        function showPosition(position) {
          lat = position.coords.latitude;
          lng = position.coords.longitude;
          placeLatLng = {lat: coords.lat, lng: coords.lng};
          myLatLng = {lat: lat, lng: lng};
//INITIALIZE MAP 
          map = new google.maps.Map(document.getElementById('directions'), {
            center: {lat: lat, lng: lng},
            zoom: 16,
          });
//GET DIRECTIONS
          var directionsService = new google.maps.DirectionsService();
          var directionsRequest = {
            origin: myLatLng,
            destination: placeLatLng,
            travelMode: google.maps.DirectionsTravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.USCS
          };

          directionsService.route(
          directionsRequest,
          function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              new google.maps.DirectionsRenderer({
                map: map,
                directions: response
              });
              directions = response;
              q.resolve(directions);
            }
          });
        }
        return q.promise;
      },
      getDetails : function(id, coords){
        var lat,
            lng,
            placeLatLng,
            map,
            place_image,
            place_marker,
            request,
            service;

//GET CURRENT LOCATION   
        lat = coords.lat;
        lng = coords.lng;
        placeLatLng = {lat: lat, lng: lng};
        var q = $q.defer();
        map = new google.maps.Map(document.getElementById('details'), {
          center: placeLatLng,
          zoom: 19,
        });

        place_image = "/public/images/blue-pin.png";
        place_marker = new google.maps.Marker({
          position: placeLatLng,
          map: map,
          title: 'name',
          icon: place_image,
        });

        request = {
          placeId: id
        };

        service = new google.maps.places.PlacesService(map);
        service.getDetails(request, callback);

        function callback(place, status) {
          q.resolve(place);
        }
      return q.promise;
      },
  	};

}
})();