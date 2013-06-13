function is_null_in_localStroage(item)
{
    var b = localStorage.getItem(item) ;
    return b == "" || b == undefined || b == null ;
}