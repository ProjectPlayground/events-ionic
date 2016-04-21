angular.module('app.services', [])

//Functions for register table
.factory('userServices', function($http, $q) {
    var baseUrl = 'http://www.zaimramlan.com/api_kira/'; //api link here

    return {

        //To add user 
        addService: function (user){
            return $http.get(baseUrl+'signUp.php?name='+user.name+'&postemail='+user.email+'&password='+user.password);
        },

        //User login 
        loginService: function (user){

            var deferred = $q.defer();
			
			$http.get(baseUrl+'signIn.php?name='+user.name+'&password='+user.password).then(function(response) {
				deferred.resolve({
					users_list: response.data.users_list //return event array
				});
			}, function(err) {
				deferred.reject();
			});

			return deferred.promise;
        }
    };
})


//Functions for events table
.factory('EventsAPI', function($http, $q) {
	var baseLink = 'http://www.zaimramlan.com/api_kira/'; //link api here

	return {
		//load events from db
		loadEvents: function() {
			var deferred = $q.defer();
			
			$http.get(baseLink + 'getEvents.php').then(function(response) {
				deferred.resolve({
					events_list: response.data.events_list //return event array
				});
			}, function(err) {
				deferred.reject();
			});

			return deferred.promise;
		}
	}
})




//Functions for bookmarks table
.factory('bookmarksServices', function($http, $q) {
	var baseUrl = 'http://www.zaimramlan.com/api_kira/'; //link api here

	return {

		//To add bookmark 
        createBookmarks: function (user, event){
        	console.log(user);
            return $http.get(baseUrl+'createBookmarks.php?userid='+user.id+'&eventid='+event.eventID);
        },

		//load bookmarks from db
		showBookmarks: function(user) {
			var deferred = $q.defer();
			
			$http.get(baseUrl + 'showBookmarks.php?userid='+user.id).then(function(response) {
				deferred.resolve({
					bookmarks_list: response.data.bookmarks_list
				});
			}, function(err) {
				deferred.reject();
			});

			return deferred.promise;
		},

		//To delete bookmark 
        deleteBookmarks: function (user, event){
            return $http.get(baseUrl+'deleteBookmarks.php?userid='+user.id+'&eventid='+event.eventID);
        }
	}
})


//Functions for checkins

/*
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

		
		//contoh async function - contoh dari zulfa
		//refer part bawah untuk tengok cara call dekat dalam controller
		
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
*/

/*

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
*/

.factory('ReverseGeoCoder', function($http, $q){
	return {
		get: function(latitude, longitude) {
			var deferred = $q.defer();
			$http.get('http://www.mapquestapi.com/geocoding/v1/reverse?key=glZYY2d2Nb7H8aGz2ggDsf7DIKXckzbM&location=' + latitude + ',' + longitude)
			.then(function(response) {
		          var addressObject = response.data.results[0].locations[0];
		          var addressString = 
		            addressObject.street + ', ' +
		            addressObject.adminArea6 + ', ' +
		            addressObject.adminArea5 + ', ' +
		            addressObject.adminArea3 + ', ' +
		            addressObject.postalCode + ', ' +
		            addressObject.adminArea1;
		          var mapString = addressObject.mapUrl;

                deferred.resolve({
		            address: addressString,
		            map: mapString
		          });

		          console.log(addressString, mapString);
		          // console.log(response);

			}, function(err) {
				deferred.reject();
			});
			return deferred.promise;
		}
	}
})

.factory('LocalStorage', function(){
	return {
		get: function(key, defaults) {
			var data = localStorage.getItem(key);
			if(data) {
				return JSON.parse(data);
			}

			return defaults;
		},
		set: function(key, data) {
			localStorage.setItem(key, JSON.stringify(data));
		},
		update: function(key, data) {
			localStorage.setItem(key, JSON.stringify(data));
		}
	}
})


.service('BlankService', [function(){

}]);

