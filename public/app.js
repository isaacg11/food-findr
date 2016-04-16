(function() {
  'use strict';
  var app = angular.module('stamplay', ['ui.router','ngStamplay','uiGmapgoogle-maps','angular-input-stars'])
  .config(Config);
  Config.$inject = ['$stateProvider', '$urlRouterProvider','uiGmapGoogleMapApiProvider'];


function Config($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
  $stateProvider.state('Home',{
    url: '/',
    templateUrl: './public/views/home.html'
  }).
  state('Details',{
    url: '/details/:search',
    templateUrl: './public/views/details.html'
  });
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyBTQ9PMGuNfxnGXjtpD_-JYAOqc955zojk',
    v: '3.17',
    libraries: 'places,weather,geometry,visualization'
  });
  $urlRouterProvider.otherwise('/');
  }

})();