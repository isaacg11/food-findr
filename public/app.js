(function() {
  'use strict';
  var app = angular.module('stamplay', ['ui.router','ngStamplay'])
  .config(Config);
  Config.$inject = ['$stateProvider', '$urlRouterProvider'];


function Config($stateProvider, $urlRouterProvider) {
  $stateProvider.state('Home',{
    url: '/',
    templateUrl: './public/views/home.html'
  });
  $urlRouterProvider.otherwise('/');
  }

})();