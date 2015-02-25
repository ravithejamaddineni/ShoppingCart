/*
Its an level controller to handle the operations which are generic to application.
*/
var appControllerModule = angular.module('shoppingcart.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $ionicPopup, $ionicHistory, $state) {
                //Global items to store items added in cart
                $scope.itemsInCart = [];
                // To store the data read from AJAX
                $scope.dataFromServer = {};
                // To store android path 
                $scope.androidPath = "";
                // Used to hide and show chekout button on ActionBar
                $scope.hideCheckOut = true;
                if(ionic.Platform.isAndroid()){
                         $scope.androidPath = "/android_asset/www/";
                }
                // Load JSON data using AJAX 
                $scope.loadData = function(){

                    var responsePromise = $http.get( $scope.androidPath+"data.json");

                    responsePromise.success(function(data, status, headers, config) {
                        //alert(JSON.stringify(data));
                        $scope.dataFromServer = data;
                    });
                    responsePromise.error(function(data, status, headers, config) {
                        alert("AJAX failed!");
                    });
                }


                $scope.checkOut = function(){
                    if($scope.itemsInCart.length !== 0){
                        var confirmPopup = $ionicPopup.confirm({
                              title: 'Are you sure you want to check out?',
                              templateUrl: $scope.androidPath+'templates/checkoutpopup.html',
                              scope:  $scope
                        });
                       confirmPopup.then(function(res) {
                         if(res) {
                          $scope.$parent.hideCheckOut = true; 
                          $scope.$parent.$apply();
                          $state.go('app.invoice');
                           
                         } else {
                           console.log('Cancel click');
                         }
                       });
                   }else{
                        $scope.showAlert('Please add atleast one item to cart', null);
                   }
                }

                // An alert dialog
                 $scope.showAlert = function(templateString,callback) {
                   var alertPopup = $ionicPopup.alert({
                     title: 'Alert',
                     template: templateString
                   });
                   alertPopup.then(function(res) {
                        if(callback !== null){
                          callback();
                        }                        
                   });
                 };
                 // To get the Total of all the items in cart
                 $scope.getTotal = function(){
                        var total = 0;
                        for(var i = 0; i < $scope.itemsInCart.length; i++){
                            var product = $scope.itemsInCart[i];
                            total += (product.price * product.quantity);
                        }
                        return total;
                 }


               

});


