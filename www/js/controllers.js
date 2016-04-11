angular.module('app.controllers', ['nl2br', 'uuid'])
  
.run(function($rootScope, Session){
	$rootScope.Session = Session;
/*
	$rootScope.events =
  {
      id: 1,
      latitude: 0,
      longitude: 0,
      address: 'Microsoft Malaysia, Tower 3, KLCC',
      description: 'I was here 1',
    },
    {
      id: 2,
      latitude: 0,
      longitude: 0,
      address: 'Microsoft Malaysia, Tower 3, KLCC',
      description: 'I was here 2',
    },
    {
      id: 3,
      latitude: 0,
      longitude: 0,
      address: 'Microsoft Malaysia, Tower 3, KLCC',
      description: 'I was here 3',
    },
    {
      id: 4,
      latitude: 0,
      longitude: 0,
      address: 'Microsoft Malaysia, Tower 3, KLCC',
      description: 'I was here 4',
    },
    {
      id: 5,
      latitude: 0,
      longitude: 0,
      address: 'Microsoft Malaysia, Tower 3, KLCC',
      description: 'I was here 5',
    }*/
})

.controller('homeCtrl', function($scope) {

//check username, if not anonymous, then display name and display checkins
	/*$scope.name    = '';
	$scope.username    = '';
	$scope.password   = '';

	$scope.login = function() {
		console.log($scope);*/
		// check login data, username and password
	
})
   
.controller('eventsListCtrl', function($scope) {
//search events, display search input when search button is clicked

//search process
})
      
.controller('eventDetailsCtrl', function($scope, $stateParams) {

	/*$scope.event=$scope.events.filter(function(event){
		return event.id == $stateParams.id;
	}).pop();
	
	console.log($scope.event); //display details based on id in console
	console.log($stateParams); //display id in console*/
})
 
.controller('signupCtrl', function($scope) {
//check for blank field and check if username and email exists
})
   
.controller('loginCtrl', function($scope) {
	/*$scope.name     = '';
	$scope.password = ''

	$scope.login;

	if(name==)*/
})
   
.controller('checkinsCtrl', function($scope, $timeout) {
	$scope.removeCheckin = function(checkin) {
		console.log(checkin);
		$scope.Session.checkins.splice($scope.Session.checkins.indexOf(checkin), 1);
	}
})

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

