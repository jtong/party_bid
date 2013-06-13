function DefaultPageController($scope, $navigate) {
   $scope.set_default = function()
   {
       var  name = $scope.username ;

       if(!(/^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/.test(name))){
         alert("不是正确的手机")
           return
       }
           localStorage.setItem("default",name);
       $navigate.go("/index",'slide')

   }

   $scope.back_to_index = function()
   {
       $navigate.go("/index",'slide')
   }

}
