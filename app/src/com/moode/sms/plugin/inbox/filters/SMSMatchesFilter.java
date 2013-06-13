package com.moode.sms.plugin.inbox.filters;

import com.moode.sms.plugin.inbox.SMSFilter;
import com.moode.sms.domain.Message;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SMSMatchesFilter extends SMSFilter {

    public static final String NAME = "matches";
    private static final Pattern JavaScriptRegexpPattern = Pattern.compile("^/(.*)/(.*)$");
    private static final String JavaScriptIgnoreCaseRegexp = "^/(.*)/i$";
    private List<Pattern> patterns;

    @Override
    public void setParameter(Object parameter) {
        try {
            this.patterns = parseParameter(parameter);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private List<Pattern> parseParameter(Object parameter) throws JSONException {
        JSONArray jsonArray = (JSONArray) parameter;
        List<Pattern> patterns = new ArrayList<Pattern>();
        for (int index = 0; index < jsonArray.length(); index++) {
            patterns.add(translateToPattern((String) jsonArray.get(index)));
        }
        return patterns;
    }

    private Pattern translateToPattern(String originalRegexpString) {
        String patternString = extractRegexp(originalRegexpString);
        if (isIgnoreCasePattern(originalRegexpString)) {
            return Pattern.compile(patternString, Pattern.CASE_INSENSITIVE);
        }
        return Pattern.compile(patternString);
    }

    private boolean isIgnoreCasePattern(String patternString) {
        return patternString.matches(JavaScriptIgnoreCaseRegexp);
    }

    private String extractRegexp(String originalRegexp) {
        Matcher matcher = JavaScriptRegexpPattern.matcher(originalRegexp);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return originalRegexp;
    }

    @Override
    public boolean isFilter(Message message) {
        for (Pattern pattern : patterns) {
            if(!pattern.matcher(message.getMessage()).matches()) {
                return false;
            }
        }
        return true;
    }
}
