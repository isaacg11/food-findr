
//CONTROLLER
(function() {
  'use strict';
  angular.module('stamplay')
  .controller('directionsController', directionsController);
  directionsController.$inject = ['Geo','$state',"$http","$scope", "$stamplay",'uiGmapGoogleMapApi','$window','$stateParams'];

  function directionsController(Geo, $state, $http, $scope, $stamplay, uiGmapGoogleMapApi, $window, $stateParams){

//GLOBALS
    var sep, coords, lat, lng, place_coords;

    if($stateParams) {
      coords = $stateParams.search;
      sep = coords.split(',');
      place_coords = {
        lat: Number(sep[0]), lng: Number(sep[1])
      };
    }


    Geo.getLocation(place_coords).then(function(res){
    });

}
})();