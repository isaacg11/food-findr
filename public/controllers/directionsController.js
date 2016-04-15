
//CONTROLLER
(function() {
  'use strict';
  angular.module('stamplay')
  .controller('directionsController', directionsController);
  directionsController.$inject = ['Geo','$state',"$http","$scope", "$stamplay",'uiGmapGoogleMapApi','$window','$stateParams'];

  function directionsController(Geo, $state, $http, $scope, $stamplay, uiGmapGoogleMapApi, $window, $stateParams){

//GLOBALS
    var sep, coords, lat, lng, place_coords, instructions, step;

//GET PLACE COORDS FROM STATE PARAM
    if($stateParams) {
      coords = $stateParams.search;
      sep = coords.split(',');
      place_coords = {
        lat: Number(sep[0]), lng: Number(sep[1])
      };
    }

//GET DIRECTIONS
    Geo.getDirections(place_coords).then(function(res){
      instructions = res.routes[0].legs[0].steps;
      for(var i = 0; i<instructions.length; i++){
        step = instructions[i].instructions;
        var elemStrName = "<div>" + "<ul>";
        elemStrName += "<li>" +"- "+step + "</li>"; 
        elemStrName += "</ul>" + "</div>";
        document.getElementById('output').innerHTML += elemStrName;
      }
    });

}
})();