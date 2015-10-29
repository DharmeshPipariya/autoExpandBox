var app = angular.module('autoExpand', []);

app.directive('autoExpand', ['$interval', function ($interval) {
    return {
        restrict: 'A',
        link: function ($scope, elem, attr) {
            $scope.timer;
            elem.on('mousedown', function () {
                angular.element(document).on('mousemove', moveCursor).on('mouseup', upCursor);
            });

            var moveCursor = function (e) {
                var offset = elem.offset();
                var width = elem.width();
                var height = elem.height();
                if (width - 50 < (e.pageX - offset.left) || height - 50 < (e.pageY - offset.top)) {
                    $interval.cancel($scope.timer);
                    $scope.timer = $interval(function () {
                        if (width - 50 < (e.pageX - offset.left)) {
                            elem.css('width', elem.width() + 4);
                            elem.parent().scrollLeft(width + 10);
                        }
                        if (height - 50 < (e.pageY - offset.top)) {
                            elem.css('height', elem.height() + 4);
                            elem.parent().scrollTop(height + 10);
                        }
                    }, 100);
                } else {
                    $interval.cancel($scope.timer);
                }
            };
            var upCursor = function (e) {
                angular.element(document).off('mousemove', moveCursor).off('mouseup', upCursor);
                $interval.cancel($scope.timer);
            };
        }
    };
}]);
