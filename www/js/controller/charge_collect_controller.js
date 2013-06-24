function charge_collect_controller($scope,$navigate)
{
    $scope.back=function()
    {
        $navigate.go('/');
    }
    var charge_collect_people=JSON.parse(localStorage.getItem('sorted_charge_people'));
    console.log(charge_collect_people);
    var temp_people_storage=charge_collect_people[0];
    var temp_count=0;
    var temp=[];
    console.log(temp);
    for(var i=0;i<charge_collect_people.length;i++)
    {
        if(temp_people_storage.price==charge_collect_people[i].price)
        {
             temp_count++;
        }
        else
        {
            if(temp.length==0)
            {
                temp=[{price:temp_people_storage.price,number:temp_count}];
                console.log(temp);
            }
            else
            {
                temp.push({price:temp_people_storage.price,number:temp_count});
            }
            temp_people_storage=charge_collect_people[i];
            temp_count=0;
            temp_count++;
        }
    }
    temp.push({price:temp_people_storage.price,number:temp_count});
    function more()
    {
        if(temp.length<=10)
        {
            $scope.show_hide_status=false;
            console.log(temp);
            return temp;
        }
        $scope.show_hide_status=true;
        var tep=temp.slice(0,9);
        JSON.stringify(localStorage.setItem('pn',tep));
        return tep;
    }
    $scope.button_function=function()
    {
        var tep=JSON.parse(localStorage.getItem('pn'));
        //((tep.length+20)>temp.length) ? return button_false() : return button_true();
        if((tep.length+20)>temp.length)
        {
            return button_false()
        }
        return button_true();
        //tep.push(temp.slice(,));
    }
    $scope.charge_collect=more();
    console.log($scope.charge_collect);
}
