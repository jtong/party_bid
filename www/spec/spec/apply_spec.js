describe('ApplyStatus',function(){
    var apply_status;
    beforeEach(function(){
        localStorage.removeItem('ApplyStatus');
        apply_status = new ApplyStatus();
    })
    it('when create a new activity then apply status is started',function(){
        apply_status.do_not_start();
        expect(localStorage.ApplyStatus).toEqual('not_start');
    })
    it('when click apply start then apply status is started',function(){
        apply_status.started();
        expect(localStorage.ApplyStatus).toEqual('started');
    })
    it('when click apply end then apply status is ended',function(){
        apply_status.ended();
        expect(localStorage.ApplyStatus).toEqual('ended');
    })
})

describe('apply response',function(){
    var message = {"message":"zfm","phone":"123"};
    var apply_status = new ApplyStatus();
    var apply_response;
    it('give apply do not start when send a message then call apply_not_start method',function(){
        apply_status.do_not_start();
        apply_response = new ApplyResponse(message);
        spyOn(apply_response,'apply_not_start');
        apply_response.process_base_on_apply_status();
        expect(apply_response.apply_not_start).toHaveBeenCalled();
    })
    it('give apply started when send a message then call apply_started method',function(){
        apply_status.started();
        apply_response = new ApplyResponse(message);
        spyOn(apply_response,'apply_started');
        apply_response.process_base_on_apply_status();
        expect(apply_response.apply_started).toHaveBeenCalled();
    })
    it('give apply ended when send a message then call apply_ended method',function(){
        apply_status.ended();
        apply_response = new ApplyResponse(message);
        spyOn(apply_response,'apply_ended');
        apply_response.process_base_on_apply_status();
        expect(apply_response.apply_ended).toHaveBeenCalled();
    })
})
describe('apply response method',function(){
    var message = {"message":"zfm","phone":"123"};
    var apply_response = new ApplyResponse(message);
    it('when call apply_not_start method then reply a not start message',function(){
        spyOn(reply_application,'do_not_start');
        apply_response.apply_not_start();
        expect(reply_application.do_not_start).toHaveBeenCalled();
    })
    it('when call apply_ended method then reply a end message',function(){
        spyOn(reply_application,'ended');
        apply_response.apply_ended();
        expect(reply_application.ended).toHaveBeenCalled();
    })
    it('when call apply_started method then judge how to process application',function(){
        spyOn(ApplicationProcess,'judge_how_to_process_application');
        apply_response.apply_started();
        expect(ApplicationProcess.judge_how_to_process_application).toHaveBeenCalled();
    })
})
describe('ApplicationProcess',function(){
    var activity;
    var message = {"message":"zfm","phone":"123"};
    var message1 = {"message":"zfm","phone":"126"};

    beforeEach(function(){
        localStorage.removeItem('test4');
        activity = new Activity('test4');
        activity.create();
        var activity_json = JSON.parse(localStorage['test4']);
        var applicant = {'name':'zfm','phone':'123'};
        activity_json.applicant.push(applicant);
        localStorage['test4'] = JSON.stringify(activity_json);
    });
    it('when receive the same phone then method is_phone_same return true',function (){
        var result = ApplicationProcess.is_phone_same('123','test4');
        expect(result).toBe(true);
    });
    it('when receive a different phone then method is_phone_same return false',function (){
        var result = ApplicationProcess.is_phone_same('124','test4');
        expect(result).toBe(false);
    });
    it('give a judge method when in_phone_same return true then reply a repeat message',function(){
        spyOn(reply_application,'repeat');
        localStorage.newestActivity = 'test4';
        ApplicationProcess.judge_how_to_process_application(message,'test4');
        expect(reply_application.repeat).toHaveBeenCalled();
    });
    it('give a judge method when in_phone_same return false then apply succeed',function(){
        spyOn(ApplySucceed,'process');
        localStorage.newestActivity = 'test4';
        ApplicationProcess.judge_how_to_process_application(message1,'test4');
        expect(ApplySucceed.process).toHaveBeenCalled();
    })
})
describe('apply succeed',function(){
    localStorage.removeItem('test6');
    var activity = new Activity('test6');
    activity.create();
    it('should save apply info',function(){
        expect(localStorage.test6).not.toBeUndefined();
        ApplySucceed.save_activity_apply_info('zfm','123','test6');
        var activity_info_in_storage = JSON.parse(localStorage.test6);
        expect(activity_info_in_storage.applicant).not.toBe(null);
        expect(activity_info_in_storage.bids).not.toBe(null);
    });
    it('should reply a success message',function(){
        var message = {"message":"zfm","phone":"123"};
        spyOn(reply_application,'success');
        ApplySucceed.process(message,'test6');
        expect(reply_application.success).toHaveBeenCalled();
    })
})

