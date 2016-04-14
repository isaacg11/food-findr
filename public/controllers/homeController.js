
//CONTROLLER
(function() {
  'use strict';
  angular.module('stamplay')
  .controller('homeController', homeController);
  homeController.$inject = ['Geo','$state',"$http","$scope", "$stamplay",'uiGmapGoogleMapApi','$window'];

  function homeController(Geo, $state, $http, $scope, $stamplay, uiGmapGoogleMapApi, $window){

    Geo.getPlaces().then(function(res){
      $scope.desc = res;
    });

}
})();