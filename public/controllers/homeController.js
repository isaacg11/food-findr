
//CONTROLLER
(function() {
  'use strict';
  angular.module('stamplay')
  .controller('homeController', homeController);
  homeController.$inject = [
    'Geo',
    '$state',
    "$http",
    "$scope", 
    "$stamplay",
    'uiGmapGoogleMapApi',
    '$window'
  ];

  function homeController(
    Geo, 
    $state, 
    $http, 
    $scope, 
    $stamplay, 
    uiGmapGoogleMapApi, 
    $window
    )
  {

//FETCH AND DISPLAY PLACES CLOSE BY ON PAGE LOAD 
    navigator.geolocation.getCurrentPosition(showPosition);
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
        $scope.map = document.getElementById('map');
    	});

  }
  })();