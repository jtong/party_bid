package com.moode.sms.plugin.inbox.filters;

import com.moode.sms.plugin.inbox.SMSFilter;
import com.moode.sms.domain.Message;

import java.util.Date;

public class SMSAfterFilter extends SMSFilter {
    
    public static final String NAME = "after";
    private Date beginDate;

    @Override
    public void setParameter(Object parameter) {
        this.beginDate = new Date((Long) parameter);
    }

    @Override
    public boolean isFilter(Message message) {
        return message.getReceivedDate().after(beginDate);
    }

    @Override
    public boolean goOnFilter(Message message) {
        return message.getReceivedDate().after(beginDate);
    }
}
