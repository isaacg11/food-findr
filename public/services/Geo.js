
//FACTORY

(function() {
  'use strict';
  angular.module('stamplay')
  .factory('Geo', Geo);

  function Geo($http, $q, $window) {

	return {
    	getPlaces : function(){
      	var q = $q.defer();
        var map = new google.maps.Map(document.getElementById("map-canvas"));
        var request = {
          location:  new google.maps.LatLng("35.1219994", "-118.46876150000001"),
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
        return q.promise;
    	},
  	};

}
})();