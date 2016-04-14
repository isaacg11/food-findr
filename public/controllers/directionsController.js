
//CONTROLLER
(function() {
  'use strict';
  angular.module('stamplay')
  .controller('directionsController', directionsController);
  directionsController.$inject = ['Geo','$state',"$http","$scope", "$stamplay",'uiGmapGoogleMapApi','$window','$stateParams'];

  function directionsController(Geo, $state, $http, $scope, $stamplay, uiGmapGoogleMapApi, $window, $stateParams){

    if($stateParams) {
      console.log($stateParams.search);
    }

    Geo.getLocation().then(function(res){
      console.log(res);
    });

}
})();