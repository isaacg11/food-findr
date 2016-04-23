
//CONTROLLER
(function() {
  'use strict';
  angular.module('stamplay')
  .controller('searchController', searchController);
  searchController.$inject = [
    'Geo',
    '$state',
    "$http",
    "$scope", 
    "$stamplay",
    'uiGmapGoogleMapApi',
    '$window',
    '$stateParams'
  ];

  function searchController(
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
    var params,
        type,
        distance,
        sep;

    if($stateParams.search) {
      params = $stateParams.search;
      sep = params.split(',');
      type = sep[0];
      distance = parseInt(sep[1]);
      console.log(type+" "+distance);

      Geo.advanceSearch(type, distance).then(function(res){
        console.log(res);
      });
    }

  }
  })();