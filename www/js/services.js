angular.module('app.services', [])

//Functions for register table
.factory('userServices', function($http) {
    var baseUrl = 'http://fyproject.site88.net/api/'; //api link here

    return {

        //To add user 
        addService: function (user){
            return $http.get(baseUrl+'signUp.php?postusername='+user.name+'&postemail='+user.email+'&postpassword='+user.password);
        },

        //User login 
        loginService: function (user){
            return $http.get(baseUrl+'signIn.php?postusername='+user.name+'&postpassword='+user.password);
        }

    };
})

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

//Functions for track table
.factory('eventsServices', function($http) {

    return {

    	//get list of events
        getEvents: function (){
            return $http.get("http://www.zaimramlan.com/api_kira/getEvents.php").then(function(response){
				//events = response;
				console.log(response.data.events_list);
				return response.data.events_list;
			});
		}
		};
		/*
        //To get list of our tracker (Who track us?)
		    getTracker: function (){
            return $http.get(baseUrl+'getTracker.php?userId='+userId); 
        }
        
        //To add tracker 
        addTracker: function (track,register){
            return $http.get(baseUrl+'addTracker2.php?name1='+userId+'&name2='+register.name);
        },

        //To delete tracked person
        deleteTracked: function  (track,register){
            return $http.get(baseUrl+'deleteTracked2.php?name1='+track.trackerId+'&name2='+register.name);
        },

        //To delete tracker person
        deleteTracker: function  (track,register){
            return $http.get(baseUrl+'deleteTracker2.php?name1='+track.trackedId+'&name2='+register.name);
        }*/

})

/*
.factory('eventsServices', function($http){

	return {
		getEvents: function(){
			return $http.get("https://www.yoursite.com/users").then(function(response){
				events = response;
				return events;
			});
		}

		searchEvents: function(){
			return $http.get("link here").then(function(response){
				events = response;
				return events;
			});
		}

	}

})


.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (name == 'user' && pw == 'secret') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

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

