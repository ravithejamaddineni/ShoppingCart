/*
Invoice List controller
*/
appControllerModule.controller('InvoiceCtrl',function($scope, $ionicNavBarDelegate, $state) {
   $scope.$parent.hideCheckOut = true;
   $scope.$parent.$apply();
   $scope.invoiceNumber = Math.floor(Math.random()*90000000)+10000000;
   $scope.clearItemsInCart = function(){
   	$scope.$parent.itemsInCart.length = 0;
   	$scope.$parent.$apply();
   }
   //This is called when the controller destroy, so once the invice is generated all the items in the cart are cleared.
   $scope.$on("$destroy", function(){
        $scope.clearItemsInCart();
    });       
});