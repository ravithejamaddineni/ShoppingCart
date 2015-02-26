/*
Its an level controller to handle the operations which are generic to application.
*/
var appControllerModule = angular.module('shoppingcart.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $ionicPopup, $ionicHistory, $state, $translate) {
                //Global items to store items added in cart
                $scope.itemsInCart = [];
                // To store the data read from AJAX
                $scope.dataFromServer = {};
                // To store android path 
                $scope.androidPath = "";
                // Used to hide and show chekout button on ActionBar
                $scope.hideCheckOut = true;

                // Filter criteria
                $scope.filterCriteria = '';
                // to make the filter assending or decending
                $scope.filterReverse = true;



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


                // to reset filters on initial launch
                $scope.resetFilters = function(){
                  $scope.filterCriteria = '';
                  $scope.filterReverse = true;
                  $scope.filter_type = $translate.instant("FILTER_ALL");
                }

                // update the filters on the selection 
                $scope.updateListFilters =function(filter_type){
                    
                    if(filter_type === $translate.instant("FILTER_ALL")){
                        $scope.filterCriteria = '';
                        $scope.filterReverse = true;
                    } else if(filter_type === $translate.instant("FILTER_HIGH_TO_LOW")){
                        $scope.filterCriteria = 'price';
                        $scope.filterReverse = true;
                    } else if (filter_type === $translate.instant("FILTER_LOW_TO_HIGH")) {
                        $scope.filterCriteria = 'price';
                        $scope.filterReverse = false;
                    } else{
                        $scope.filterCriteria = '';
                        $scope.filterReverse = true;
                    } 
                    
                }


                $scope.checkOut = function(){
                    if($scope.itemsInCart.length !== 0){
                        var confirmPopup = $ionicPopup.confirm({
                              title: $translate.instant("ARE_YOU_SURE_FOR_CHECK_OUT"),
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
                        $scope.showAlert($translate.instant("PLEASE_ADD_ATLEAST_ONE_ITEM"), null);
                   }
                }

                // An alert dialog
                 $scope.showAlert = function(templateString,callback) {
                   var alertPopup = $ionicPopup.alert({
                     title: $translate.instant("ALERT"),
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

                 //if total price is >= 50$, 10% discount given
                 $scope.calculateDiscount = function(){
                    var tot = $scope.getTotal()
                    if(tot >= 50){
                        return (tot*10)/100
                    }

                    return 0; 
                 }


               

});


