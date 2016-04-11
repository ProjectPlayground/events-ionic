angular.module('app.services', [])


.factory('reverseGeocoder', ['$q', '$http', function($q, $http){

	function parseAddressFromApiResponse(response) {
		// reduce = Get the sum of the numbers in the array
		var parts = [
			'street',
			'adminArea6',
			'adminArea5',
			'adminArea4',
			'adminArea3',
			'postalCode',
			'adminArea2',
			'adminArea1'
		].reduce(function(carry, part){
			console.log("carry: " + carry);
			console.log("part: " + part);
			if (response[part]) {
				carry.push(response[part]);
			}
			return carry;
		}, []);
		return {
			parts: parts,
			text: parts.join(",\r\n"),
			map: response.mapUrl
		};
	}

	return {
		getAddress: function(latitude, longitude) {
			var key = 'glZYY2d2Nb7H8aGz2ggDsf7DIKXckzbM';
			var deferred = $q.defer();
			$http.get('http://www.mapquestapi.com/geocoding/v1/reverse?key=' + key + '&location=' + latitude + ',' + longitude)
				.then(function(response){
					console.log(response);
					console.log(response.data.results[0].locations[0]);
					if (response.data.results[0] && response.data.results[0].locations[0]) {
						return deferred.resolve(parseAddressFromApiResponse(response.data.results[0].locations[0]));
					}
					deferred.reject();
				}, function(){
					deferred.reject();
				});
			return deferred.promise;
		},

		/*
		contoh async function - contoh dari zulfa
		refer part bawah untuk tengok cara call dekat dalam controller
		*/
		getAsyncData: function() {
			var defer = $q.defer();
			setTimeout(function() {
				// data sini
				var data = 'hehe';

				if(!data){
					return defer.reject();
				} else {
					defer.resolve(data);
				}

			}, 1000);

			return defer.promise;
		}
	};

}])


.factory('Session', function($interval){
	var session = window.localStorage.getItem('session') !== null ?
		JSON.parse(window.localStorage.getItem('session')) : {checkins: []};

	var last = JSON.stringify(session);
	$interval(function(){
		var sessionStr = JSON.stringify(session);
		if (sessionStr != last) {
			window.localStorage.setItem('session', sessionStr);
			last = sessionStr;
			delete sessionStr;
		}
	}, 300);

	return session;
})
/*
.factory('LocalStorage', function(){
	return {

		get:function(key, defaults) {
			var data=localStorage.getItem(key);

			if(data) {
				return JSON.parse(data);//string to object
			}
			return defaults; //if null then return defaults
		},

		set:function(key, data) {
			localStorage.setItem(key, JSON.stringify(data)); //object to string

		}
	}
})
*/

.service('BlankService', [function(){

}]);

