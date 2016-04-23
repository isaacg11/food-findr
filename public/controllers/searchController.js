
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
        numMiles,
        dist,
        sep;

    if($stateParams.search) {
      params = $stateParams.search;
      sep = params.split(',');
      type = sep[0];
      distance = sep[1];
      numMiles = parseInt(sep[1]);
      dist = numMiles * 1609;
      $scope.types = type;
      $scope.items = [{name: 'a'}, {name: distance+" "+"Mile(s)"}];
      $scope.item = $scope.items[1];

      Geo.advanceSearch(type, dist).then(function(res){
        $scope.desc = res; 
      });
    }

  }
  })();