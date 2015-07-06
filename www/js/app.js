// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'weather-app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('weather-app', ['ionic', 'weather-app.services']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.constant('$ionicLoadingConfig', {
  template: '/templates/loading.html'
});

app.controller('MainCtrl',function(WeatherAPI, $scope){
  var fetchWeatherData = function(cityName) {
    WeatherAPI.getWeatherByCityName(cityName)
    .then(function(response) {
        $scope.weather[cityName] = response;
     });
  };

  $scope.refreshWeatherData = function() {
    $scope.cityList.forEach(function(cityName) {
      fetchWeatherData(cityName);
    });
    $scope.$broadcast('scroll.refreshComplete');
  };

  // Reload persisted list of cities into cityList array.
  if(window.localStorage.getItem("citylist")) {
    $scope.cityList = window.localStorage.getItem("citylist").split(',');
    $scope.refreshWeatherData();
  } else {
    $scope.cityList =  [];
  }

  $scope.weather = {};

  $scope.addCityToList = function(cityName) {
    $scope.cityList.push(cityName);
    window.localStorage.setItem("citylist", $scope.cityList);
    fetchWeatherData(cityName);
    $scope.cityName = "";
  };

  $scope.removeCityFromList = function(cityName) {
    $scope.cityList.splice($scope.cityList.indexOf(cityName),1);
    window.localStorage.setItem("citylist", $scope.cityList);
  };

  $scope.moveItem = function(item, fromIndex, toIndex) {
    item = $scope.cityList.splice(fromIndex, 1);
    $scope.cityList.splice(toIndex, 0, item[0]);
    window.localStorage.setItem("citylist", $scope.cityList);
  };
});