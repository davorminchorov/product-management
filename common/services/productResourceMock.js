(function () {
    "use strict";

    var app = angular
                .module("productResourceMock",
                        ["ngMockE2E"]);

    app.run(function ($httpBackend) {
        var products = [
            {
                "productId": 1,
                "productName": "Leaf Rake",
                "productCode": "GDN-0011",
                "releaseDate": "March 19, 2009",
                "description": "Leaf rake with 48-inch handle.",
                "cost": 9.00,
                "price": 19.95,
                "category": "garden",
                "tags": ["leaf", "tool"],
                "imageUrl": "http://openclipart.org/image/50px/svg_to_png/26215/Anonymous"
            },
            {
                "productId": 5,
                "productName": "Hammer",
                "productCode": "TBX-0048",
                "releaseDate": "May 21, 2013",
                "description": "Curved claw steel hammer.",
                "cost": 1.00,
                "price": 8.95,
                "category": "toolbox",
                "tags": ["tool"],
               "imageUrl": "http://openclipart.org/image/50px/svg_to_png/73/"
            }
        ];

        var productUrl = "/api/products";

        var editingRegex = new RegExp(productUrl + "/[0-9][0-9]*", '');

        $httpBackend.whenGET(productUrl).respond(products);

        $httpBackend.whenGET(editingRegex).respond(singleProduct);

        $httpBackend.whenPOST(productUrl).respond(newOrUpdatedProduct);


        function newOrUpdatedProduct (method, url, data){

            var product = angular.fromJson(data);

            if (!product.productId){
                product.productId = products[products.length - 1].productId + 1;
                products.push(product);
            }
            else {
                for (var i = 0; i < products.length; i++)
                {
                    if (products[i].productId == product.productId){
                        products[i] = product;
                        break;
                    }
                }
            }
            return [200, product, {}];
        }


        function singleProduct(method, url, data){
            var product = {"productId": 0};
            var parameters = url.split("/");
            var length = parameters.length;
            var id = parameters[length - 1];

            if (id > 0)
            {
                for (var i = 0; i < products.length; i++)
                {
                    if (products[i].productId == id)
                    {
                        product = products[i];
                        break;
                    }
                }

            }

            return [200, product, {}];
        }

        $httpBackend.whenGET("/app/").passThrough();
    })

}());