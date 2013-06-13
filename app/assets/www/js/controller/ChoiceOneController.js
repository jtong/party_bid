/**
 * Created with JetBrains WebStorm.
 * User: fortunezhang
 * Date: 13-5-19
 * Time: 上午11:11
 * To change this template use File | Settings | File Templates.
 */


function ChoiceOneController($scope, $navigate) {

    $scope.whether_show_back_btn = true
    $scope.choice_1st = "激动人心的时刻马上要到来了！！！";
    $scope.begin_and_stop_status = "开始";

    $scope.back_to_index = function () {
        $navigate.go("/",'slide')
    }

    $scope.begin_and_stop = function () {
        if(Phones.get().length==0)
        {
            alert("还没有人参加嘞！！！")
            return ;
        }
        if(localStorage.getItem("current_page") == "five" && Phones.get().length < 5 )
        {
            alert("不足5人哦。楼下有我3000小弟，稍等！！！")
            return ;
        }
        clear_lottery_if_most_people_has_lottery();


        var phones50 = Phones.get_50();
        if ($scope.begin_and_stop_status == "开始") {
           localStorage.setItem("interval_id",setInterval(change_one, 100));
            function change_one() {
                $scope.$apply(function () {
                    $scope.choice_1st = phones50[Math.floor(Math.random() * ( phones50.length))]
                    $scope.choice_2st = phones50[Math.floor(Math.random() * ( phones50.length))]
                    $scope.choice_3st = phones50[Math.floor(Math.random() * ( phones50.length))]
                    $scope.choice_4st = phones50[Math.floor(Math.random() * ( phones50.length))]
                    $scope.choice_5st = phones50[Math.floor(Math.random() * ( phones50.length))]
                    $scope.begin_and_stop_status = "结束"
                    $scope.whether_show_back_btn = false
                })
            }
        }
        else {
            clearInterval(localStorage.getItem("interval_id"));

            if (localStorage.getItem("current_page") == "one") {
                if (is_null_in_localStroage("default")) {
                    $scope.choice_1st = Phones.get_an_lottery();

                }
                else {
                    $scope.choice_1st = localStorage.getItem("default");
                    Phones.save_lottery_phone_number(localStorage.getItem("default"))
                    localStorage.removeItem("default")
                }
                $scope.choice_2st = ""
                $scope.choice_3st = ""
                $scope.choice_4st = ""
                $scope.choice_5st = ""
            }
            else {
                $scope.choice_1st = Phones.get_an_lottery();
                $scope.choice_2st = Phones.get_an_lottery();
                $scope.choice_3st = Phones.get_an_lottery();
                $scope.choice_4st = Phones.get_an_lottery();
                $scope.choice_5st = Phones.get_an_lottery();
            }
            $scope.whether_show_back_btn = true
            $scope.begin_and_stop_status = "开始"
        }
    }


    function clear_lottery_if_most_people_has_lottery()
    {
       if( Phones.get().length < Phones.get_has_lottery().length + 10)
       {
           Phones.clear_lottery();
       }
    }

}





