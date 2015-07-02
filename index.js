var app = angular.module('autoExpand', []);

app.directive('autoExpand', ['$interval', function ($interval) {
    return {
        restrict: 'A',
        link: function ($scope, elem, attr) {
            $scope.down = false;
            $scope.drag = false;
            $scope.timer;
            elem.on('mousedown', function () { $scope.down = true; });
            angular.element(document).on('mousemove', function (e) {
                if ($scope.down) {
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
                } else {
                    $interval.cancel($scope.timer);
                }
            }).on('mouseup', function () {
                $scope.down = false;
                $interval.cancel($scope.timer);
            });
        }
    };
}]);