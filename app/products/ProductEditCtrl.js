(function () {
   "use strict";

    angular
        .module("productManagement")
        .controller("ProductEditCtrl",
                    ["product",
                     "$state",
                     "productService",
                     ProductEditCtrl]);


    function ProductEditCtrl(product, $state, productService) {
        var vm = this;

        vm.product = product;

        vm.priceOption = "percent";

        vm.marginPercent = function () {
            return productService.calculateMarginPercent(vm.product.price, vm.product.cost);
        };


        if (vm.product && vm.product.productId)
        {
            vm.title = "Edit: " + vm.product.productName;
        }
        else {
            vm.title = "New Product"
        }

        vm.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = !vm.opened;
        };

        vm.submit = function (isValid) {
            if (isValid) {
                vm.product.$save(saveSuccessful());
            } else {
                toastr.error("Please correct the validation errors first!");
            }

        };

        vm.cancel = function () {
            $state.go('productList');
        };

        vm.addTags = function (tags) {
            if(tags){
                var array = tags.split(',');
                vm.product.tags = vm.product.tags ? vm.product.tags.concat(array) : array;
                vm.newTags = "";
            } else {
                toastr.error("Please enter one or more tags separated by commas");
            }
        };

        vm.removeTag = function (index) {
            vm.product.tags.splice(index, 1);
        };

        function saveSuccessful (data) {
            toastr.success("Save Successful");
        }

    }

}());