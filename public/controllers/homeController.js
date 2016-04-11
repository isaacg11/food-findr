
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

    Geo.getPlaces(lat, lng).then(function(res){
      var arr = [];

      for(var i = 0; i < res.length; i++){
        var place = res[i].name;
        arr.push(place);
      }
      $scope.desc = arr;
    });

}
})();