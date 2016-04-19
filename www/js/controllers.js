angular.module('app.controllers', [])
  
.run(function($rootScope, $ionicLoading, LocalStorage){

	$rootScope.checkins = LocalStorage.get('checkins', []);
	$rootScope.events;
	$rootScope.bookmarks;

	$rootScope.isLoggedIn=false;

	$rootScope.showLoading = function(msg) { //msg
    	$ionicLoading.show({
    		template: msg
    	});
  	};

  	$rootScope.hideLoading = function(){
		$ionicLoading.hide();
  	};

	/*$rootScope.Session = Session;

	$rootScope.username = "Anonymous";
	$rootScope.password = "";	
*/
})//end run 



.controller('homeCtrl', function($scope, $state, $cordovaGeolocation) {
/*
	$cordovaGeolocation.getCurrentPosition({

		timeout: 10000,
		enableHighAccuracy: true

	}).then(function(position){

		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;

		var latLng = new google.maps.LatLng(latitude,longitude);
		var mapOptions = {
			center: latLng,
			zoom: 17,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};		

		$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

		google.maps.event.addListenerOnce($scope.map, 'idle', function(){

			var marker = new google.maps.Marker({
				map: $scope.map,
				animation: google.maps.Animation.DROP,
				position: latLng,
			});			

			var infoWindow = new google.maps.InfoWindow({
				content: 'UIA Gombak'
			});

			google.maps.event.addListener(marker, 'click', function(){
				infoWindow.open($scope.map, marker);
			})

			google.maps.event.addListener($scope.map, 'click', function(event){

				var marker = new google.maps.Marker({
					position: event.latLng,
					map: $scope.map,
					animation: google.maps.Animation.DROP,
					draggable: true
				})

				console.log(event.latLng.lat() + " " + event.latLng.lng());
			})			
		})

	}, function(error){
		console.log("could not get location");
	});

//check username, if not anonymous, then display name and display checkins
	/*$scope.name    = '';
	$scope.username    = '';
	$scope.password   = '';

	$scope.login = function() {
		console.log($scope);
		// check login data, username and password
*/
	$cordovaGeolocation.getCurrentPosition({
		timeout: 10000,
		enableHighAccuracy: true
	}).then(function(position){
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;

		var latLng = new google.maps.LatLng(latitude,longitude);
		var mapOptions = {
			center: latLng,
			zoom: 17,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};		

		$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

		google.maps.event.addListenerOnce($scope.map, 'idle', function(){
			var marker = new google.maps.Marker({
				map: $scope.map,
				animation: google.maps.Animation.DROP,
				position: latLng,
			});			

			var infoWindow = new google.maps.InfoWindow({
				content: 'UIA Gombak'
			});

			google.maps.event.addListener(marker, 'click', function(){
				infoWindow.open($scope.map, marker);
			})

			google.maps.event.addListener($scope.map, 'click', function(event){
				var marker = new google.maps.Marker({
					position: event.latLng,
					map: $scope.map,
					animation: google.maps.Animation.DROP,
					draggable: true
				})

				console.log(event.latLng.lat() + " " + event.latLng.lng());
			})			
		})

	}, function(error){
		console.log("could not get location");
	});
})//end homeCtrl



//To manage user registration
.controller('userCtrl', function($scope, $rootScope, userServices, $ionicPopup, $state, $ionicHistory, LocalStorage){
    
    $scope.addUser = function(user){

        userServices.addService(user).success(function(data){
            $scope.users = data;
            console.log("Data " + data);

        	if (data == 1) {

            	$ionicPopup.alert({
                	title: 'Successfully registered!',
                	content: 'Thank you for your registration '+ user.name+ '. Please login to enter the system :)' 
            	})

            	//masuk dlm system      
            	$state.go('menu.login');
        	} 

        	else if (data == 3) {

            	$ionicPopup.alert({
                	title: 'Error',
                	content: 'Hi '+  user.name+ '! Sorry, the email or username already exist!'
            	})
       		}
        
        	else { 
            
            	$ionicPopup.alert({
                	title: 'Error',
                	content: 'Sorry. Error happen'
            	})
        	}

        });//end function data
    };//end addUser

    $scope.loginUser = function(user){

    	$rootScope.showLoading('Welcome');

        userServices.loginService(user).success(function(data){
        	$rootScope.hideLoading();
            $scope.users = data;																																																
            console.log("Berjaya dapat userId " + $scope.users.userid );

        if (data!=0) {

                    LocalStorage.set("loggedIn", 1);
                    LocalStorage.set("userId", $scope.users.userid);//from db
                    LocalStorage.set("username", $scope.users.name);

                    console.log(data);
                    console.log("userId : ");
                    console.log($scope.users.userid);
                    console.log("username : ");
                    console.log($scope.users.name);

                    $rootScope.isLoggedIn=true;

                    $ionicPopup.alert({
                      	title: 'Successfully login!',
                      	content: 'Hi '+ $scope.users.name+ ' :) ' + $scope.users.userid
                    })

        			$ionicHistory.nextViewOptions({
        				disableBack:true
        			});

                    //masuk dlm system      
                    $state.go('menu.home');

                    }

        else        
            {
                    $ionicPopup.alert({
                      title: 'Error weyh betul',
                      content: 'Hi '+  user.name+ '! Sorry, password tak sama'
                    })
                      
            }
            
        });//function data
    };//userlogin

    $scope.logoutUser = function(user) {
              
        var username =  LocalStorage.get("username");

        $rootScope.isLoggedIn=false;

        $ionicPopup.alert({
            title: 'Successfully logout!',
            content: 'Bye '+ username + ' :)'
        })

	    //LocalStorage.remove("userId");
        //LocalStorage.remove("username");
        LocalStorage.set("loggedIn", 0);

        //keluar dari system      
        $state.go('menu.home');
    }; //end logout
})//end userCtrl



.controller('eventsListCtrl', function($scope, $rootScope, $ionicLoading, $ionicFilterBar, EventsAPI) {
	$rootScope.showLoading();

	//load events from db
	EventsAPI.loadEvents().then(function(response) {
		$rootScope.hideLoading();
		console.log("Berjaya show events");

	    /* ion-filter-bar begins */
	    var filterBarInstance;
		$rootScope.events = response.events_list;

		//filter events
		$scope.showFilterBar = function () {
			filterBarInstance = $ionicFilterBar.show({
	      		/*
				- do not change 'items' attribute's name. 
				- the name is fixed with the plugin.
				*/
				items: $rootScope.events,
				update: function (filteredEvents, filterText) {

					$rootScope.events = filteredEvents;
					if (filterText) {
						console.log(filterText);
					}

				}
			});
		};
	    /* ion-filter-bar ends */
	})//end eventsServices.loadEvents()
})//end eventsListCtrl
      

.controller('eventDetailsCtrl', function($scope, $rootScope,$stateParams) {

	$scope.event = $rootScope.events.filter(function(event){ //scope saves an event object which id==parameter id
		return event.id == $stateParams.id; //filter by id from rootScope.events
	}).pop();
	
	console.log($scope.event); //display details based on id in console
	console.log($stateParams); //display id in console

	$scope.bookmark = function () {

	};

})//end eventDetailsCtrl



.controller('bookmarksListCtrl', function($scope, $rootScope, $ionicLoading, $ionicFilterBar, BookmarksAPI) {
	$rootScope.showLoading();

	//load events from db
	EventsAPI.loadBookmarks().then(function(response) {
		$rootScope.hideLoading();
		console.log("Berjaya show bookmarks");

	    /* ion-filter-bar begins */
	    var filterBarInstance;
		$rootScope.bookmarks = response.bookmarks_list;

		//filter bookmarks
		$scope.showFilterBar = function () {
			filterBarInstance = $ionicFilterBar.show({
	      		/*
				- do not change 'items' attribute's name. 
				- the name is fixed with the plugin.
				*/
				items: $rootScope.bookmarks,
				update: function (filteredBookmarks, filterText) {

					$rootScope.bookmarks = filteredBookmarks;
					if (filterText) {
						console.log(filterText);
					}

				}
			});
		};
	    /* ion-filter-bar ends */
	})//end bookmarksServices.loadBookmarks()
})//end bookmarksListCtrl



.controller('settingsCtrl', function($scope) {

})
/*
.controller('loginCtrl', function($scope, $rootScope, $ionicPopup, $state, $ionicHistory) {

    $scope.user = 
	{
		id : 1,
		username : "admin",
		password : "admin"
	};
 	
    $scope.login = function() {
    	var validUsername = ($scope.username == $scope.user.username);
 		var validPassword = ($scope.password == $scope.user.password);

        //LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
        if(validUsername && validPassword) {
        	$ionicHistory.nextViewOptions({
        		disableBack:true
        	});
        	$rootScope.username = $scope.user.username;
            $state.go('menu.home');
        }
        /*}).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
		else (function(user) {
			var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
		})
    }
	/*$scope.name     = '';
	$scope.password = ''

	$scope.login;

	if(name==)
})*/
   

/*
.controller('checkinsCtrl', function($scope, $timeout) {
	$scope.removeCheckin = function(checkin) {
		console.log(checkin);
		$scope.Session.checkins.splice($scope.Session.checkins.indexOf(checkin), 1);
	}
})
*/

.controller('checkinsCtrl', function($scope, LocalStorage) {
	$scope.removeCheckin = function(checkin) {
		if(confirm('Are you sure you want to delete this?')) {
			var index = $scope.checkins.indexOf(checkin);
			$scope.checkins.splice(index, 1);
			LocalStorage.update('checkins', $scope.checkins);
		}
	}
})



/*
.controller('getLocationCtrl', function(
	$scope,
	$ionicLoading,
	$timeout,
	$cordovaGeolocation,
	$ionicPlatform,
	$http,
	reverseGeocoder,
	$state,
	uuid4
	) {

	$scope.latitude    = '';
	$scope.longitude   = '';
	$scope.address     = '';
	$scope.description = '';
	$scope.map         = '';

	$ionicLoading.show({
		template: "Getting your location..."
	});

	$ionicPlatform.ready(function(){
		console.log("ready");
		$cordovaGeolocation.getCurrentPosition({
			timeout: 20000,
			enableHighAccuracy: false

		}).then(function(position){
			$scope.latitude	= position.coords.latitude.toFixed(5);
			$scope.longitude = position.coords.longitude.toFixed(5);
			console.log($scope.latitude);
			console.log($scope.longitude);
			reverseGeocoder.getAddress($scope.latitude, $scope.longitude)
				.then(function(address){
					$scope.address = address.text;
					$scope.map = address.map;
					$ionicLoading.hide();
				}, function(){
					$ionicLoading.show({
						template: "Error getting address"
					});
					$timeout(function(){
						$ionicLoading.hide();
					}, 1000);
				});
		});
	});

	$scope.save = function() {
		console.log($scope);
		// unshift = add new items to the beginning of an array
		$scope.Session.checkins.unshift({
			id: uuid4.generate(),
			latitude: $scope.latitude,
			longitude: $scope.longitude,
			address: $scope.address,
			description: $scope.description,
			map: $scope.map
		});
		$state.go('checkins');
	};

})

*/

.controller('getLocationCtrl', function(
	$scope,
	$state,
	LocalStorage,
	$cordovaGeolocation,
	ReverseGeoCoder
	) {

	$cordovaGeolocation.getCurrentPosition({
		timeout: 20000,
		maximumAge: 30000,
		enableHighAccuracy: false,
	}).then(function(results){
		console.log(results);
		$scope.latitude = results.coords.latitude;
		$scope.longitude = results.coords.longitude;
		ReverseGeoCoder.get($scope.latitude, $scope.longitude)
		.then(function(results) {
			$scope.address = results.address;
			$scope.maps = results.map;
		})
	}, function(){
		console.log('error');
	})

	$scope.save = function() {
		$scope.checkins.push({
			id: $scope.checkins.length + 1,
			latitude: $scope.latitude,
			longitude: $scope.longitude,
			address: $scope.address,
			descriptions: $scope.descriptions,
			maps: $scope.maps
		});
		LocalStorage.set('checkins', $scope.checkins);
		$state.go('menu.checkins');		
	}
})


   
.controller('checkinDetailsCtrl', function($scope, $stateParams) {
	$scope.checkin = $scope.checkins.filter(function(checkin){
		return checkin.id == $stateParams.id;
	}).pop();
})

.controller('settingsCtrl', function($scope) {

})

/*
.controller('checkinDetailsCtrl', function($scope, $stateParams) {
    $scope.checkin = $scope.Session.checkins.reduce(function(carry, checkin){
		console.group("carry");
		console.log(carry);
		console.groupEnd();

		console.group("checkin");
		console.log(checkin);
		console.groupEnd();

		if (checkin.id == $stateParams.id) {
			carry = checkin;
		}
	return carry;
    }, {});
    console.log($scope.checkin, $stateParams);
})
*/
