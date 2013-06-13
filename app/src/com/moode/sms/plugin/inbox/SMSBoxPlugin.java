package com.moode.sms.plugin.inbox;

import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;

public class SMSBoxPlugin extends Plugin {
    private static final String QUERY = "query";
    @Override
    public PluginResult execute(String action, JSONArray args, String callbackId) {
        if(action.equalsIgnoreCase(QUERY) ) {
            SMSBoxPluginHelper smsBoxPluginHelper = new SMSBoxPluginHelper(webView.getContext());
            return smsBoxPluginHelper.query(args);
        }
        return new PluginResult(PluginResult.Status.ERROR);
    }
}
