function IndexPageController($scope, $navigate) {

    $scope.phone_count = Phones.get().length;

    $scope.begin_lottery = function()
    {
        $navigate.go("/default",'slide')
    }
    $scope.choice_one = function()
    {
        localStorage.setItem("current_page","one")
        $navigate.go("/choice_one",'slide')
    }

    $scope.choice_five = function()
    {
        localStorage.setItem("current_page","five")
        $navigate.go("/choice_one",'slide')
    }


    $scope.clear_data = function()
    {
        Phones.clear_lottery();
        Phones.clear_phones();
        $scope.phone_count = 0 ;
    }


}