
//CONTROLLER
(function() {
  'use strict';
  angular.module('stamplay')
  .controller('homeController', homeController);
  homeController.$inject = ['Geo','$state',"$http","$scope", "$stamplay",'uiGmapGoogleMapApi','$window'];

  function homeController(Geo, $state, $http, $scope, $stamplay, uiGmapGoogleMapApi, $window){

    var infowindow;
    var lat;
    var lng;
    var places;
    var map;
    var gmarkers = [];
    var urHere;
    var rating;
    var place_rating;

    Geo.getPlaces(lat, lng).then(function(res){
      console.log(res);
      $scope.desc = res;
    });

}
})();