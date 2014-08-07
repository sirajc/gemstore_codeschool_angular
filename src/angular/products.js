/**
 * Created by Siraj on 26-07-2014.
 */
(function(){
    var app = angular.module('store-directives', ['ngAnimate']);

    app.directive("productDescription", function() {
        return {
            restrict: 'E',
            templateUrl: "product-description.html"
        };
    });

    app.directive("productReviews", function() {
        return {
            restrict: 'E',
            templateUrl: "product-reviews.html"
        };
    });

    app.directive("productSpecs", function() {
        return {
            restrict:"A",
            templateUrl: "product-specs.html"
        };
    });

    app.directive("productTabs", function() {
        return {
            restrict: "E",
            templateUrl: "product-tabs.html",
            controller: function() {
                this.tab = 1;

                this.isSet = function(checkTab) {
                    return this.tab === checkTab;
                };

                this.setTab = function(activeTab) {
                    this.tab = activeTab;
                };
            },
            controllerAs: "tab"
        };
    });

    app.directive("productGallery", function($timeout) {
        return {
            restrict: "E",
            templateUrl: "product-gallery.html",
            controller: function() {

                var _gallery = this;

                _gallery.current = 0;
                _gallery.changeImage=false;

                _gallery.setCurrent = function(imageNumber){
                    _gallery.changeImage=true;
                    $timeout(function () {
                        _gallery.current = imageNumber || 0;

                        $timeout(function () {
                            _gallery.changeImage = false;
                        }, 150, true);
                    }, 150, true);
                };
            },
            controllerAs: "gallery"
        };
    });

    var fadeOut = function(element, className, done) {
        element.css({
            opacity: 1
        });
        jQuery(element).animate({
            opacity: 0
        }, 150,  done);
        return function(cancel) {
            if (cancel) {
                jQuery(element).stop();
            }
        };
    };

    var fadeIn = function(element, className, done) {
        element.css({
            opacity: 0
        });
        jQuery(element).animate({
            opacity: 1
        }, 150, done);
        return function(cancel) {
            if (cancel) {
                jQuery(element).stop();
            }
        };
    };

    var gem = function() {
        return {
            addClass: fadeOut,
            removeClass: fadeIn
        };
    };

    app.animation('.gem', gem);

    app.directive("fadeInOut", function($animate){
        return function(scope, element, attrs){
            scope.$watch(attrs.fadeInOut, function(newVal){
                if(newVal) {
                    $animate.addClass(element, 'gem');
                }else{
                    $animate.removeClass(element, 'gem');
                }
            })
        }
    })

})();
