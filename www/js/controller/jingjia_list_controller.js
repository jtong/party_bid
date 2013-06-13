function jingjia_list_controller($scope,$navigate)
{
    $scope.status='开始';
    $scope.back=function()
    {
        $navigate.go('/active_list');
    }
    $scope.begin=function()
    {
        $scope.status='结束';
        $navigate.go('/charge_baoming');
        localStorage.setItem('begin_end_status',$scope.status);           
    }
    if(!localStorage.getItem('jingjia'))
    {
    	$scope.actives=['竞价1'];
    }
    else if(localStorage.getItem('begin_end_status'))
    {
        $scope.actives.push('竞价');
    }
}

