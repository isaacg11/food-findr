
//FACTORY

(function() {
  'use strict';
  angular.module('stamplay')
  .factory('Geo', Geo);

  function Geo($http, $q, $window) {

	return {

    	getPlaces : function(){
        var lat, lng, map;
      	var q = $q.defer();
        navigator.geolocation.getCurrentPosition(showPosition);
    
        function showPosition(position) {
          lat = position.coords.latitude;
          lng = position.coords.longitude; 
          map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: lat, lng: lng},
            zoom: 15
          });

          var request = {
            location:  new google.maps.LatLng(lat, lng),
            radius: 1000,
            query: "restaurant",
            rankBy: google.maps.places.RankBy.DISTANCE,
          };

          var service = new google.maps.places.PlacesService(map);
          service.textSearch(request, callback);

          function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
              q.resolve(results);
            }
          }        
        }
        return q.promise;
    	},
  	};

}
})();