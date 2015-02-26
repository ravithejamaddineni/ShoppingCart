/*
Item details controller
*/
appControllerModule.controller('ItemCtrl',function($scope, $ionicNavBarDelegate, $state , $stateParams, $filter, $ionicPopup,$ionicHistory, $translate) {
    
    $scope.itemBean = {};
    $scope.total = 0;
    $scope.grandTotal = 0;
    $scope.disableAddCart = false;
    
    // To get an Item from array based on ID.
    $scope.getItemBean = function(){
    	$scope.itemBean = $filter('filter')($scope.dataFromServer, {id: $stateParams.id})[0];
		$scope.itemBean.quantity = 1;
		$scope.calculateTotal();
	}
    // To Calculate Total of an item with respect to quantity
    $scope.calculateTotal = function(){
    	var result;
    	$scope.total = isNaN(result = parseInt($scope.itemBean.quantity)*parseInt($scope.itemBean.price))?0:result;
    	
    	if($scope.total === 0){
    		$scope.disableAddCart = true;
    	}else{
			$scope.disableAddCart = false;
    	}

    	$scope.$apply();
    }

    // To add an item to cart
    $scope.addToCart = function(){
        $scope.$parent.hideCheckOut = false;
        $scope.$parent.$apply(); 
        var myNewObj = angular.copy($scope.itemBean);
        $scope.itemsInCart.push(myNewObj);
        $scope.showAlert($translate.instant("PRODUCT_ADDED_TO_CART"),function callback () {
            $ionicHistory.goBack();
        });
    }

    

    

});