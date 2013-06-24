function make_active_controller($scope,$navigate)
{
	$scope.actives=[];
	$scope.add_todo=function()
	{
		if(!$scope.todoText)
		{
            //document.getElementById('btn').disabled='true';
            return;
		}
		$scope.actives=JSON.parse(localStorage.getItem('temp'));
		if($scope.actives.length>0)
		{
			$scope.actives.splice(0,0,$scope.todoText);
		}
		else
		{
			$scope.actives.push($scope.todoText);
		}
		localStorage.setItem('temp',JSON.stringify($scope.actives));
		$scope.todoText = '';
        $navigate.go('/active_baoming');
	}
	$scope.back=function()
	{
        $navigate.go('/active_list');
	}
}

