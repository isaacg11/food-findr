(function() {
  'use strict';
  var app = angular.module('stamplay', ['ui.router','ngStamplay','uiGmapgoogle-maps','angular-input-stars','google.places'])
  .config(Config);
  Config.$inject = ['$stateProvider', '$urlRouterProvider','uiGmapGoogleMapApiProvider','$locationProvider'];


function Config($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider, $locationProvider) {
  $stateProvider.state('Home',{
    url: '/',
    templateUrl: './public/views/home.html'
  }).
  state('Details',{
    url: '/details/:search',
    templateUrl: './public/views/details.html'
  }).
  state('Directions',{
    url: '/directions/:search',
    templateUrl: './public/views/directions.html'
  }).
  state('Search',{
    url: '/search/:search',
    templateUrl: './public/views/search.html'
  });
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyBTQ9PMGuNfxnGXjtpD_-JYAOqc955zojk',
    v: '3.17',
    libraries: 'places,weather,geometry,visualization'
  });
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  }

})();