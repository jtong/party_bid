var myModule = angular.module('myApp', ['mobile-navigate']);
localStorage.people_number? localStorage.people_number:localStorage.people_number=0;
localStorage.charge_people_number? localStorage.charge_people_number:localStorage.charge_people_number=0;
localStorage.begin=false;
localStorage.jingjia_begin=false;
var people_number=localStorage.getItem('people_number');
var charge_people_number=localStorage.getItem('charge_people_number');

myModule.config(function ($routeProvider) {
    $routeProvider.when("/", {templateUrl:"pages/active_list.html",controller:active_list_controller}).
        when("/index", {templateUrl:"pages/active_list.html",controller:active_list_controller}).
        when('/make_active', {templateUrl:
            'pages/make_active.html', controller: make_active_controller}).
        // when('/active_id', {templateUrl:
        //     'pages/active_detail.html', controller: active_detail_controller}).
        when('/active_baoming', {templateUrl:
            'pages/active_baoming.html', controller: active_baoming_controller}).
        when('/jingjia_list',{templateUrl:
            'pages/jingjia_list.html', controller:jingjia_list_controller}).
        when('/charge_baoming',{templateUrl:
            'pages/charge_baoming.html', controller:charge_baoming_controller}).
        when('/jingjia_result', {templateUrl:
            'pages/jingjia_result.html', controller:jingjia_result_controller}).
        when('/charge_collect', {templateUrl:
            'pages/charge_collect.html', controller:charge_collect_controller}).
        otherwise({redirectTo: '/'});
});


if(!localStorage.getItem("temp"))
{
    localStorage.setItem("temp",JSON.stringify([]))
}
if(!localStorage.getItem("people_temp"))
{
    localStorage.setItem("people_temp",JSON.stringify([]))
}
if(!localStorage.getItem("charge_people_temp"))
{
    localStorage.setItem("charge_people_temp",JSON.stringify([]))
}

myModule.controller('MainCtrl', function($scope, $navigate) {
    $scope.$navigate = $navigate;
});

myModule.directive('ngTap', function($parse) {
    var isTouchDevice = !!("ontouchstart" in window);
    return function(scope, elm, attrs) {
        if (isTouchDevice) {
            var tapping = false;
            elm.bind('touchstart', function() { tapping = true; });
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

    native_access = new NativeAccess();

    fetch_sms_from_inbox();

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
    if(message.message.substr(0,2).toUpperCase()=='JJ' && localStorage.getItem('begin_end_status')=='结束')
    {
        localStorage.jingjia_begin="true";
        var charge_people_price='';
        var charge_people_name='';
        for(var i=2;i<json_message.messages[0]['message'].length;i++)
        {
            if(json_message.messages[0]['message'][i]!=' ')
            {
                charge_people_price+=json_message.messages[0]['message'][i];
            }
        }
        localStorage.setItem('charge_people_price',parseInt(charge_people_price));
        localStorage.setItem('charge_people_phone',json_message.messages[0]['phone']);
        console.log('恭喜，报名成功');
        charge_people_number++;
        var peoples=JSON.parse(localStorage.getItem('people_temp'));
        for(var i=0;i<peoples.length;i++)
        {
            console.log(localStorage.getItem('charge_people_temp'))
            if(localStorage.getItem('charge_people_phone')==peoples[i].number)
            {
                charge_people_name=peoples[i].name;
                console.log(peoples[i].name)
                break;
            }
        }
        localStorage.setItem('charge_people_name',charge_people_name);
        console.log(localStorage.getItem('charge_people_name'))
        localStorage.setItem('charge_people_number',JSON.stringify(charge_people_number));
        contro2();
    }
    else if(message.message.substr(0,2).toUpperCase()=='JJ')
    {
        if(localStorage.jingjia_begin=="false")
        {
            console.log('竞价未开始');
        }
        else
        {
            console.log('竞价已结束');
        }
    }
    if(message.message.substr(0,2).toUpperCase()=='BM' && localStorage.getItem('nname')=='结束')
    {
        localStorage.begin="true";
        var people_name='';
        for(var i=2;i<json_message.messages[0]['message'].length;i++)
        {
            if(json_message.messages[0]['message'][i]!=' ')
            {
                people_name+=json_message.messages[0]['message'][i];
            }
        }
        localStorage.setItem('name',people_name);
        localStorage.setItem('number',json_message.messages[0]['phone']);
        console.log('恭喜，报名成功');
        people_number++;
        localStorage.setItem('people_number',JSON.stringify(people_number));
        console.log('恭');
        contro1();
        console.log('喜');
    }
    else if(message.message.substr(0,2).toUpperCase()=='BM')
    {
        if(localStorage.begin=="false")
        {
            console.log('报名未开始');
        }
        else
        {
            console.log('报名已结束');
        }
    }
}

function notify_message_received(message_json) {
    native_accessor.receive_message(message_json);
}

