
//CONTROLLER
(function() {
  'use strict';
  angular.module('stamplay')
  .controller('homeController', homeController);
  homeController.$inject = ['Geo','$state',"$http","$scope", "$stamplay",'uiGmapGoogleMapApi','$window'];

  function homeController(Geo, $state, $http, $scope, $stamplay, uiGmapGoogleMapApi, $window){

  	    navigator.geolocation.getCurrentPosition(showPosition);
//GET CURRENT LOCATION   
        function showPosition(position) {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude; 
          var myLatLng = {lat: lat, lng: lng};

    	  $scope.search = null;
    	  $scope.autocompleteOptions = {
        	types: ['establishment'],
        	location: new google.maps.LatLng(lat, lng),
        	radius: 1000,
    	  };           
		}

    	Geo.getPlaces().then(function(res){
    		$scope.desc = res;
    	});

}
})();