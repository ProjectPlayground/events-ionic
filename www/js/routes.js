angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('menu.home', {
    url: '/home',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.eventsList', {
    url: '/eventslist',
    views: {
      'side-menu21': {
        templateUrl: 'templates/eventsList.html',
        controller: 'eventsListCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'userCtrl'
  })

  .state('menu.login', {
    url: '/login',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'userCtrl'
      }
    }
  })

  .state('menu.logout', {
    url: '/logout',
    views: {
      'side-menu21': {
        templateUrl: 'templates/logout.html',
        controller: 'userCtrl'
      }
    }
  })

  .state('menu.checkins', {
    url: '/checkins',
    views: {
      'side-menu21': {
        templateUrl: 'templates/checkins.html',
        controller: 'checkinsCtrl'
      }
    }
  })

  .state('menu.getLocation', {
    url: '/get-location',
    views: {
      'side-menu21': {
        templateUrl: 'templates/getLocation.html',
        controller: 'getLocationCtrl'
      }
    }
  })

  .state('menu.checkinDetails', {
    url: '/checkin-details/:id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/checkinDetails.html',
        controller: 'checkinDetailsCtrl'
      }
    }
  })

  .state('menu.eventDetails', {
    url: '/event-details',
    views: {
      'side-menu21': {
        templateUrl: 'templates/eventDetails.html',
        controller: 'eventDetailsCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/home')

});