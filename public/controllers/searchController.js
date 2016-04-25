
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
    
//SCROLL TO TOP ON PAGE LOAD
    document.body.scrollTop = document.documentElement.scrollTop = 0;
//VARIABLES  
    var params,
        type,
        distance,
        numMiles,
        dist,
        sep;

//GET SEARCH PARAMETERS AND DISPLAY ON PAGE LOAD  
    if($stateParams.search) {
      params = $stateParams.search;
      sep = params.split(',');
      type = sep[0];
      distance = sep[1];
      numMiles = parseInt(sep[1]);
      dist = numMiles * 1609;
      $scope.types = [
        {name: type}, 
        {name: "Fast Food"},
        {name: "Seafood"},
        {name: "Diner"},
        {name: "BBQ"},
        {name: "Steakhouse"},
        {name: "Deli"},
        {name: "Mexican"},
        {name: "Italian"},
        {name: "Chinese"},
        {name: "Japenese"},
        {name: "Thai"},
        {name: "Vietnamese"},
        {name: "Indian"},
        {name: "Greek"},
        {name: "Mediterranean"},
      ];
      $scope.type = $scope.types[0];
      
      $scope.items = [
        {name: distance+" "+"Mile(s)"}, 
        {name: "1"},
        {name: "2"},
        {name: "3"},
        {name: "4"},
        {name: "5"},
      ];
      $scope.item = $scope.items[0];

      Geo.advanceSearch(type, dist).then(function(res){
        if(res === "No Food Found, Sorry"){
          $scope.err = res;
        }
        else{
          $scope.desc = res; 
        }
      });
    }

  }
  })();