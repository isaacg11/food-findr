
//FACTORY

(function() {
  'use strict';
  angular.module('stamplay')
  .factory('Geo', Geo);

  function Geo($http, $q) {

	return {
    	getRestaurants : function(lon, lat){
      		var q = $q.defer();
      		var coords = {
  				_geolocation : {
    				type: "Point",
    				coordinates: [lon, lat]
  				}
			};

      		$http.get("http://maps.google.com/maps/api/geocode/json?address=Canada&sensor=true&region=USA").then(function(res){
      			q.resolve(res);
			});
      	return q.promise;
    	},
  	};

}
})();