
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
        reviewArr,
        time;


//GET PLACE COORDS FROM STATE PARAM
    if($stateParams) {
      coords = $stateParams.search;
      sep = coords.split(',');
      place_coords = {
        lat: Number(sep[0]), lng: Number(sep[1])
      };
      place_id = sep[2];
      var arr = [];
      arr.push(place_coords);
      $scope.arr = arr;
    }

//GET DETAILS AND DISPLAY ON VIEW
      Geo.getDetails(place_id, place_coords).then(function(details){
        reviewArr = details.reviews;
        var reviews = [];
        for(var i = 0; i<reviewArr.length; i++) {
          reviews.push(reviewArr[i]);
        }

        $scope.reviews = reviews;
        $scope.name = details.name;
        $scope.address = details.formatted_address;
        $scope.phone = details.formatted_phone_number;
        $scope.rating = details.rating;
        $scope.website = details.website;
    });

}
})();