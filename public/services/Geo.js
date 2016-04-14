
//FACTORY

(function() {
  'use strict';
  angular.module('stamplay')
  .factory('Geo', Geo);

  function Geo($http, $q, $window) {

	return {

    	getPlaces : function(){
        var lat, lng, map, marker, image;
      	var q = $q.defer();
        navigator.geolocation.getCurrentPosition(showPosition);
    
        function showPosition(position) {
          lat = position.coords.latitude;
          lng = position.coords.longitude; 
          var myLatLng = {lat: lat, lng: lng};
          map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: lat, lng: lng},
            zoom: 16
          });

          image = "/public/images/green-marker.png";
          marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'YOU ARE HERE!',
            icon: image,
            animation: google.maps.Animation.BOUNCE
          });

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
  	};

}
})();