function active_list_controller($scope,$navigate)
{
	$scope.actives=JSON.parse(localStorage.getItem('temp'));
	$scope.move=function()
	{
        if(localStorage.nname=='结束')
        {
            return;
        }
		$navigate.go('/make_active');
	}
    $scope.jump=function()
    {
        $navigate.go('/active_baoming');
    }
}

