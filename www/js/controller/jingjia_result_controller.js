function jingjia_result_controller($scope,$navigate)
{
	var flag=0;
    $scope.back=function()
    {
        $navigate.go('/');
    }
    $scope.todo=function()
    {
        $navigate.go('/charge_collect');
    }
    function sort_people()
    {
        var sort_people=JSON.parse(localStorage.getItem('charge_people_temp'));
        for(var i=0;i<sort_people.length;i++)
        {
            for(var j=i+1;j<sort_people.length;j++)
            {
                if(sort_people[i].price>sort_people[j].price)
                {
                    var temp=sort_people[i];
                    sort_people[i]=sort_people[j];
                    sort_people[j]=temp;
                }
            }
        }
        return sort_people;
    }
    $scope.charge_peoples=sort_people();
    $scope.temp_storage=$scope.charge_peoples[0];
    //var i= 0,j=1;
    for(var i=1;i<$scope.charge_peoples.length;i++)
    {
        if($scope.temp_storage.price==$scope.charge_peoples[i].price)
        {
            flag=1;
            continue;
        }
        if(flag==0)
        {
            alert($scope.temp_storage.name+' '+'￥'+$scope.temp_storage.price+'\n'+
                $scope.temp_storage.number+'\n'+'竞价成功!');
            break;
        }
        flag=0;
        $scope.temp_storage=$scope.charge_peoples[i];
    }
    localStorage.setItem('sorted_charge_people',JSON.stringify($scope.charge_peoples));
    //console.log(charge_peoples);
    //$scope.orderProp='price';
    //alert('ffsdf');
    //setTimeout("alert.close()",3000);
	//setTimeout("alert.close()",3000);
}