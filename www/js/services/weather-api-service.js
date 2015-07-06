angular.module('weather-app.services', [])

.factory('WeatherAPI', function($http) {
	return {
		getWeatherByCityName: function(city){
			return $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + "&mode=JSON&units=metric")
		    .then( function (response) {
				if(response.data.cod === 200) {
	                return {
						main: 		 response.data.weather[0].main,
						description: response.data.weather[0].description,
						icon: 		 response.data.weather[0].icon,
						temp:		 response.data.main.temp,
						temp_max:	 response.data.main.temp_max,
						temp_min:	 response.data.main.temp_min
	                };
	            } else {
	            	return {
	            		main: 		 "",
						description: response.data.message,
						icon: 		 "01d",
						temp:		 0,
						temp_max:	 0,
						temp_min:	 0
	            	};
	            }
            });
		}
	};
});