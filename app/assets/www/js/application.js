var myModule = angular.module('myApp', ['mobile-navigate']);

myModule.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl:"pages/index_page.html",
        controller:IndexPageController
        }).when("/index", {
            templateUrl: "pages/index_page.html",
            controller: IndexPageController
        }).when('/default',{
            templateUrl:"pages/default_page.html",
            controller:DefaultPageController
        }).when("/choice_one",{
            templateUrl:"pages/choice_one.html",
            controller:ChoiceOneController
        }).otherwise({
            redirectTo: "/"
        });
});


myModule.controller('MainCtrl', function($scope, $navigate) {
    $scope.$navigate = $navigate;
});

myModule.directive('ngTap', function($parse) {
    var isTouchDevice = !!("ontouchstart" in window);
    return function(scope, elm, attrs) {
        if (isTouchDevice) {
            var tapping = false;
            elm.bind('touchstart', function() { tapping = true; });
//            elm.bind('touchmove', function() { tapping = false; });
            elm.bind('touchend', function(event) {
                var fn = $parse(attrs.ngTap)
                tapping && scope.$apply(function() {
                            fn(scope, {$event:event});
                        });
            });
        } else {
            elm.bind('click', function() {
                var fn = $parse(attrs.ngTap);
                scope.$apply(function() {
                    fn(scope, {$event:event});
                });
            });
        }
    };
});

myModule.run(function($route, $http, $templateCache) {
    angular.forEach($route.routes, function(r) {
        if (r.templateUrl) {
            $http.get(r.templateUrl, {cache: $templateCache});
        }
    });
});


function onDeviceReady() {
}

var native_access;
$(document).ready(function () {
    localStorage.setItem("default", localStorage.getItem("default") || "")
    localStorage.setItem("phones", localStorage.getItem("phones") || JSON.stringify([]))
    localStorage.setItem("has_lottery_phones",localStorage.getItem("has_lottery_phones" )||JSON.stringify([]))

    native_access = new NativeAccess();

    console.log('fetch_sms_from_inbox before invoke----------------------------------------')
    fetch_sms_from_inbox();
    console.log('fetch_sms_from_inbox after invoke----------------------------------------')





});

myModule.factory('test', function() {
    return "test";
})

var native_accessor = {
    process_received_message: function (json_message) {
        judge_and_process_received_apply_message(json_message);
    },

    send_sms: function (phone, message) {
        native_access.send_sms({"receivers":[{"name":'name', "phone":phone}]}, {"message_content":message});
    },

    receive_message: function (json_message) {
        if (typeof this.process_received_message === 'function') {
            this.process_received_message(json_message);
        }
    }

};
function judge_and_process_received_apply_message(json_message)
{
    var message = json_message.messages[0];
    if((message.message.substr(0,3)).toUpperCase() == '泡定你')
    {
        Phones.save(message);
    }
    var phone_count = document.getElementById("phone_count");
    if (phone_count) {
        var scope = angular.element(phone_count).scope();
        scope.$apply(function () {
            scope.phone_count = Phones.get().length;;
        })
    }

}

function notify_message_received(message_json) {
    native_accessor.receive_message(message_json);
}



