
//CONTROLLER
(function() {
  'use strict';
  angular.module('stamplay')
  .controller('directionsController', directionsController);
  directionsController.$inject = [
    'Geo',
    '$state',
    "$http",
    "$scope", 
    "$stamplay",
    'uiGmapGoogleMapApi',
    '$window',
    '$stateParams'
  ];

  function directionsController(
    Geo, 
    $state, 
    $http, 
    $scope, 
    $stamplay, 
    uiGmapGoogleMapApi, 
    $window, 
    $stateParams
    )
  {

//SCROLL TO TOP ON PAGE LOAD
    document.body.scrollTop = document.documentElement.scrollTop = 0;
//GLOBALS
    var sep, 
        coords, 
        place_coords,
        instructions,
        step,
        distance,
        elemStrName;

//GET PLACE COORDS FROM STATE PARAM
    if($stateParams) {
      coords = $stateParams.search;
      sep = coords.split(',');
      place_coords = {
        lat: Number(sep[0]), lng: Number(sep[1])
      };
    }

    Geo.getDirections(place_coords).then(function(res){
      $scope.desc = res;
    	var num = 0;
        instructions = res.routes[0].legs[0].steps;
        for(var i = 0; i<instructions.length; i++){
          num = num + 1;
          step = instructions[i].instructions;
          distance = instructions[i].distance.text;
          elemStrName = "<div>" + "<ul>";
          elemStrName += "<li>"+"<b>"+num+"."+"</b>"+" "+step+" "+"("+distance+")"+"</li>"; 
          elemStrName += "</ul>" + "</div>";
          document.getElementById('output').innerHTML += elemStrName;
        }
    });
  }
})();