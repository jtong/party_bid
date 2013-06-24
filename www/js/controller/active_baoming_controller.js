function active_baoming_controller($scope,$navigate)
{
    $scope.people_number=JSON.parse(localStorage.getItem('people_number'));
    $scope.flag='开始';
    localStorage.setItem('nname',$scope.flag);
    //既然能做开始和结束,为什么函数叫begin?叫switch还靠谱点.而且最后那个 return;也显得非常诡异.后面都没有代码了 return什么?
    $scope.begin=function()
    {
        if($scope.flag=='开始')
        {
            $scope.flag='结束';
            localStorage.setItem('nname',$scope.flag);
        }
        else
        {
            if(confirm("确定结束吗?"))
            {
                localStorage.setItem('nname',$scope.flag);
                document.getElementById('btton').disabled='true';
                $navigate.go('/jingjia_list');
                return;
            }
        }
    }

    $scope.back=function()
    {
        $navigate.go('/actives');
    }

    $scope.baoming=function()
    {
        $navigate.go('/active_baoming');
    }
    $scope.jingjia=function()
    {
        $navigate.go('/active_jingjia');
    }

    //return? 这里是要起到什么效果?
    if(localStorage.getItem('name')==null)
    {
        return;
    }
    $scope.peoples=JSON.parse(localStorage.getItem('people_temp'));

    //temp是个什么函数?永远不要出现这种函数名,让机器能读懂的代码谁都会写,要写人能读懂的代码.
    $scope.temp=function()
    {
        console.log('已执行');
        //初始化的工作应该统一完成,比如在document ready里.这样就不用四处写重复代码了.而且看着都很怪.
        //初始化的逻辑混杂在业务逻辑里
        $scope.people_number=JSON.parse(localStorage.getItem('people_number'));
        if($scope.peoples.length==0)
        {
            $scope.peoples=[{name:localStorage.getItem('name'),number:localStorage.getItem('number')}]
        }
        else
        {
            $scope.peoples.splice(0,0,{name:localStorage.getItem('name'),number:localStorage.getItem('number')});
        }
        localStorage.setItem('people_temp',JSON.stringify($scope.peoples));
    }
    //怪怪的,为什么要判断一下?
    if($scope.peoples.length==0)
    {
        $scope.peoples=[{name:localStorage.getItem('name'),number:localStorage.getItem('number')}]
    }
    else
    {
        $scope.peoples.splice(0,0,{name:localStorage.getItem('name'),number:localStorage.getItem('number')});
    }
    localStorage.setItem('people_temp',JSON.stringify($scope.peoples));

}
