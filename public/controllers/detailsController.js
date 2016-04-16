
//CONTROLLER
(function() {
  'use strict';
  angular.module('stamplay')
  .controller('detailsController', detailsController);
  detailsController.$inject = ['Geo','$state',"$http","$scope", "$stamplay",'uiGmapGoogleMapApi','$window','$stateParams'];

  function detailsController(Geo, $state, $http, $scope, $stamplay, uiGmapGoogleMapApi, $window, $stateParams){

//GLOBALS
    var sep, 
        coords, 
        lat, 
        lng, 
        place_coords,
        place_id, 
        directions,
        duration, 
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
      place_id = sep[2];
    }


//GET DIRECTIONS & DISPLAY STEPS
      Geo.getDetails(place_id, place_coords).then(function(details){
        console.log(details);
        $scope.name = details.name;
        $scope.address = details.formatted_address;
        $scope.phone = details.formatted_phone_number;
        $scope.rating = details.rating;


        // var num = 0;
        // $scope.duration = res.routes[0].legs[0].duration.text;
        // instructions = res.routes[0].legs[0].steps;
        // for(var i = 0; i<instructions.length; i++){
        //   num = num + 1;
        //   step = instructions[i].instructions;
        //   distance = instructions[i].distance.text;
        //   elemStrName = "<div>" + "<ul>";
        //   elemStrName += "<li>"+"<b>"+num+"."+"</b>"+" "+step+" "+"("+distance+")"+"</li>"; 
        //   elemStrName += "</ul>" + "</div>";
        //   document.getElementById('output').innerHTML += elemStrName;
        // }
        // Geo.getDirections(place_coords).then(function(res){
        // });
    });

}
})();