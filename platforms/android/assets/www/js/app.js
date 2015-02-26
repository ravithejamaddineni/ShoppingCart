// Ionic shoppingcart App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'shoppingcart' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'shoppingcart.controllers' is found in controllers.js
// 'pascalprecht.translate','ngSanitize' are for transilations
var app = angular.module('shoppingcart', ['ionic', 'shoppingcart.controllers','pascalprecht.translate','ngSanitize']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

// This is to maintain zero views in cache
app.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);
  $ionicConfigProvider.views.transition('none')
});

// Making the app localization ready
app.config(['$translateProvider', function($translateProvider) {
  $translateProvider.useStaticFilesLoader({
    prefix: 'languages/locale-',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('en_US'); //en_US,fr_FR
}]);



                    


// custom filter for displaying items based on price range
app.filter('matchPriceRange', function($translate) {
  return function( items, filter_type) {
    var filtered = [];
    angular.forEach(items, function(item) {
      if((filter_type === $translate.instant("FILTER_LESS_THAN_5")) && item.price < 5) {
                        filtered.push(item);
      }else if((filter_type === $translate.instant("FILTER_5_TO_10")) && (item.price >= 5 && item.price <= 10)){
                        filtered.push(item);
      } else if((filter_type === $translate.instant("FILTER_10_TO_15")) && (item.price >= 10 && item.price <= 15)){
                        filtered.push(item);
      } else if((filter_type === $translate.instant("FILTER_15_TO_20")) && (item.price >= 15 && item.price <= 20)){
                        filtered.push(item);
      } else if((filter_type === $translate.instant("FILTER_OVER_20")) && (item.price > 20)){
                        filtered.push(item);
      } else if((filter_type === $translate.instant("FILTER_ALL"))
                || (filter_type === $translate.instant("FILTER_HIGH_TO_LOW")) 
                || (filter_type === $translate.instant("FILTER_LOW_TO_HIGH"))){
                        filtered.push(item);
      }

    });
    return filtered;
  };
});


app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.men', {
      url: "/men",
      views: {
        'menuContent': {
          templateUrl: "templates/men.html",
          controller: 'MenCtrl'
        }
      }
    })

   .state('app.women', {
      url: "/women",
      views: {
        'menuContent': {
          templateUrl: "templates/women.html",
          controller: 'WomenCtrl'
        }
      }
    })

    .state('app.children', {
      url: "/children",
      views: {
        'menuContent': {
          templateUrl: "templates/children.html",
          controller: 'ChildrenCtrl'
        }
      }
    })

    .state('app.sports', {
      url: "/sports",
      views: {
        'menuContent': {
          templateUrl: "templates/sports.html",
          controller: 'SportsCtrl'
        }
      }
    })

    .state('app.item', {
    url: "/item/:id",
    views: {
      'menuContent': {
        templateUrl: "templates/item.html",
        controller: 'ItemCtrl'
      }
    }
    })
    .state('app.invoice', {
    url: "/invoice",
    views: {
      'menuContent': {
        templateUrl: "templates/invoice.html",
        controller: 'InvoiceCtrl'
      }
    }/*,
      onExit: function(clearItemsInCart){
        $scope.clearItemsInCart();
      }*/
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/men');
});
