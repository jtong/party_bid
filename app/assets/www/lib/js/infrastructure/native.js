function isOnDevice(){
    return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
}

function NativeAccess() {
    this.base_access = isOnDevice() ? cordova : new MockedCordova();
}
function MockedCordova()
{
}

MockedCordova.prototype.exec = function(){
  console.log("Mocked Cordova 'exec' method has been called.");
}

NativeAccess.prototype.send_sms = function (receivers, message_content, success_callback, error_callback) {
    this.base_access.exec(function (result) {
        success_callback.call(result);
    }, function (err) {
        error_callback.call();
    }, "MoodeSMS", "send_sms", [receivers, message_content]);
};


NativeAccess.prototype.save_token=function(token_json, success_callback, fail_callback){
    this.base_access.exec( success_callback, fail_callback, "TokenPlugin", "save",[token_json])
}

NativeAccess.prototype.do_action = function (success_callback, error_callback, plugin_name, action, data_array) {
//
//    this.base_access.exec(
//        function(){console.log("success")}
//    , function(){console.log("error")}, "MoodeSMS", "send_sms", [[], message_content]);
    console.log(JSON.stringify(this.base_access));
    this.base_access.exec(success_callback, error_callback, plugin_name, action, data_array);
};





