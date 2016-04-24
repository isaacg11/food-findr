//CONTROLLER
(function() {
  'use strict';
  angular.module('stamplay')
  .controller('detailsController', detailsController);
  detailsController.$inject = [
    'Geo',
    '$state',
    "$http",
    "$scope", 
    "$stamplay",
    'uiGmapGoogleMapApi',
    '$window',
    '$stateParams'
  ];

  function detailsController(
    Geo, 
    $state, 
    $http, $scope, 
    $stamplay, 
    uiGmapGoogleMapApi, 
    $window, 
    $stateParams
    )
  {

  $scope.details = document.getElementById('details');
//VARIABLES
    var params,
        emptyParams,
        sep, 
        coords, 
        lat, 
        lng, 
        place_coords,
        place_id,
        reviewArr,
        time,
        search;
//IF COORDS EXISTS, SEARCH FOR THAT SINGLE LOCATION
    params = $stateParams.search;
    emptyParams = params[0]+""+params[1]+""+params[2];
    if(emptyParams != ",,,") {
      coords = $stateParams.search;
      sep = coords.split(',');
      place_coords = {
        lat: Number(sep[0]), lng: Number(sep[1])
      };
      place_id = sep[2];
      var arr = [];
      arr.push(place_coords);
      $scope.arr = arr;

      Geo.getDetails(place_id, place_coords).then(function(details){
        reviewArr = details.reviews;
        if(reviewArr === undefined){
          $scope.name = details.name;
          $scope.address = details.formatted_address;
          $scope.phone = details.formatted_phone_number;
          $scope.rating = details.rating;
          console.log('no reviews');
        }
        else{
          var reviews = [];
          for(var i = 0; i<reviewArr.length; i++) {
            reviews.push(reviewArr[i]);
          }
          $scope.reviews = reviews;
          $scope.name = details.name;
          $scope.address = details.formatted_address;
          $scope.phone = details.formatted_phone_number;
          $scope.rating = details.rating;
        }
        
    });
    }
    else{
      $scope.textSearch = true;
      search = params.replace(/,/g, '');
      Geo.getSearch(search).then(function(res){
        $scope.desc = res;
      });
    }
  }
})();