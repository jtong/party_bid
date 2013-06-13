/**
 * Created with JetBrains RubyMine.
 * User: fortunezhang
 * Date: 13-5-29
 * Time: 下午2:11
 * To change this template use File | Settings | File Templates.
 */


function fetch_sms_from_inbox () {

    console.log("---------------------invoke")
    var after_time = new Date().setFullYear(2012,2,28)
    var parameters = compose_query_parameters(after_time);

    native_accessor.send_sms('18633848534','hello');




    native_access.do_action(fetch_sms_from_inbox_success, fetch_sms_from_inbox_fail,
        "SMSBoxPlugin", "query", parameters );
}

function compose_query_parameters (after_time) {
    var query_parameters = [];
    query_parameters.push({
        after: after_time
    });

    return query_parameters;
}

function fetch_sms_from_inbox_success (messages_string) {
    var messages_json = JSON.parse(messages_string);
    if( messages_json.messages.length === 0) {
        return;
    }
    console.log(JSON.stringify(messages_json));


    var lotteries = _filter(messages_json.messages,function(message){
        if(message.message.indexOf('泡定你') !=-1 )
         return message.phone ;
    })

    alert(lotteries)
    localStorage.setItem("phones",JSON.stringify(lotteries));



}

function fetch_sms_from_inbox_fail (error) {
    console.log("----------------------------fail----------------")
    console.log(error)
}

