
//CONTROLLER
(function() {
  'use strict';
  angular.module('stamplay')
  .controller('homeController', homeController);
  homeController.$inject = ['Geo','$state',"$http","$scope", "$stamplay",'uiGmapGoogleMapApi'];

  function homeController(Geo, $state, $http, $scope, $stamplay, uiGmapGoogleMapApi){

    Geo.getPlaces().then(function(res){
      var arr = [];

      for(var i = 0; i < res.length; i++){
        var place = res[i].name;
        arr.push(place);
      }
      $scope.desc = arr;
    });
}
})();