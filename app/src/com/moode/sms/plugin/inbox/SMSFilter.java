package com.moode.sms.plugin.inbox;

import com.moode.sms.domain.Message;

public abstract class SMSFilter {

    public abstract void setParameter(Object parameter);

    public abstract boolean isFilter(Message message);

    public boolean goOnFilter(Message message) {
          return true;
    }
}
