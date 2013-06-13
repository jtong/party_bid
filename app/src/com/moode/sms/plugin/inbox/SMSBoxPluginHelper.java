package com.moode.sms.plugin.inbox;

import android.content.Context;
import com.moode.sms.domain.Message;
import com.moode.sms.utils.JsonUtils;
import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class SMSBoxPluginHelper {
    private Context context;

    public SMSBoxPluginHelper(Context context) {
        this.context = context;
    }
    public PluginResult query(JSONArray args) {
        try {
            return queryAccordingConditions(args);
        } catch (JSONException e) {
           return new PluginResult(PluginResult.Status.ERROR);
        }
    }

    private PluginResult queryAccordingConditions(JSONArray args) throws JSONException {
        SMSBoxReader smsBoxReader = new SMSBoxReader(context);
        Map<String, Object> parameters = parseParameters(args);
        List<Message> messages = smsBoxReader.querySMS(parameters);
        return new PluginResult(PluginResult.Status.OK, JsonUtils.parseMessagesToJson(messages.toArray(new Message[0])));
    }

    private Map<String, Object> parseParameters(JSONArray args) throws JSONException {
        Map<String, Object> parameters = new HashMap<String, Object>();
        for (int index = 0; index < args.length(); index++) {
            JSONObject jsonObject = (JSONObject) args.get(index);
            Iterator keys = jsonObject.keys();
            while (keys.hasNext()) {
                String key = (String) keys.next();
                parameters.put(key, jsonObject.get(key));
            }
        }
        return parameters;
    }
}
