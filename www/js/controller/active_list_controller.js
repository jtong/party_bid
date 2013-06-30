function active_list_controller($scope,$navigate)
{
	$scope.actives=JSON.parse(localStorage.getItem('temp'));
    //创建活动函数为什么叫move?应该叫 create_activity,或者叫go_to_create_activity
	$scope.move=function()
	{
        if(localStorage.nname=='结束') //nname... 而且这个思路也有点问题...在这个函数外面替换处理函数和改变按钮状态都可以,职责不够单一
        {
            return;
        }
		$navigate.go('/make_active');
	}
    //跟上面一个毛病
    $scope.jump=function()
    {
        $navigate.go('/active_baoming');
    }
}

