/**
 * Created with JetBrains RubyMine.
 * User: hyfy
 * Date: 13-6-10
 * Time: 下午6:01
 * To change this template use File | Settings | File Templates.
 */
function contro1()
{
    var player_list = document.getElementById("player_list");
    if (player_list) {
        var scope = angular.element(player_list).scope();
        scope.$apply(function () {
            scope.temp();
            scope.peoples = JSON.parse(localStorage.getItem('people_temp'));
        })
    }
}
function contro2()
{
    var charge_list = document.getElementById("charge_list");
    if (charge_list) {
        var scope = angular.element(charge_list).scope();
        scope.$apply(function () {
            scope.charge_temp();
            scope.charge_peoples = JSON.parse(localStorage.getItem('charge_people_temp'));
        })
    }
}