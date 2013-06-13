package com.moode.sms.plugin.inbox;

import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import com.moode.sms.domain.Message;
import com.moode.sms.plugin.inbox.filters.SMSAfterFilter;
import com.moode.sms.utils.StringUtils;

import java.util.*;

public class SMSBoxReader {
    private static final String BODY = "body";
    private static final String ADDRESS = "address";
    private static final String DATE = "date";

    private Context context;
    private HashMap<String, SMSFilter> filters = new HashMap<String, SMSFilter>();

    public SMSBoxReader(Context context) {
        this.context = context;
        initFilters();
    }

    private void initFilters() {
        filters.put(SMSAfterFilter.NAME, new SMSAfterFilter());
    }

    public List<Message> querySMS(Map<String, Object> parameters) {
        Map<String, SMSFilter> smsFilters = fetchFiltersFromParameters(parameters);
        setFiltersParameter(smsFilters, parameters);
        return readSMS(new ArrayList<SMSFilter>(smsFilters.values()));
    }

    private Map<String, SMSFilter> fetchFiltersFromParameters(Map<String, Object> parameters) {
        Map<String, SMSFilter> queryFilters = new HashMap<String, SMSFilter>();
        for (String key : parameters.keySet()) {
            queryFilters.put(key, filters.get(key));
        }
        return queryFilters;
    }

    private void setFiltersParameter(Map<String, SMSFilter> smsFilters, Map<String, Object> parameters) {
        for (String key : smsFilters.keySet()) {
            smsFilters.get(key).setParameter(parameters.get(key));
        }
    }

    public List<Message> readSMS(List<SMSFilter> filters) {
        Cursor cursor = getSMSCursor();
        if (!cursor.moveToFirst()) return new ArrayList<Message>();
        return fetchSMS(filters, cursor);
    }

    private List<Message> fetchSMS(List<SMSFilter> filters, Cursor cursor) {
        List<Message> messageList = new ArrayList<Message>();
        int date_index = cursor.getColumnIndex(DATE);
        int address_index = cursor.getColumnIndex(ADDRESS);
        int body_index = cursor.getColumnIndex(BODY);
        do {
            Message message = new Message(StringUtils.trimCountryCode(cursor.getString(address_index)),
                    cursor.getString(body_index), new Date(cursor.getLong(date_index)));
            if (isFilterMessage(filters, message)) {
                messageList.add(message);
            }
            if (!isGoOnFilter(filters, message)) {
                break;
            }
        } while (cursor.moveToNext());
        return messageList;
    }

    private boolean isGoOnFilter(List<SMSFilter> filters, Message message) {
        for (SMSFilter filter : filters) {
            if (!filter.goOnFilter(message)) {
                return false;
            }
        }
        return true;
    }

    private boolean isFilterMessage(List<SMSFilter> filters, Message message) {
        for (SMSFilter filter : filters) {
            if (!filter.isFilter(message)) {
                return false;
            }
        }
        return true;
    }

    private Cursor getSMSCursor() {
        return context.getContentResolver().query(Uri.parse("content://sms/inbox"), null, null, null, null);
    }

}
