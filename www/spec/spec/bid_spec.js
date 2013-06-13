describe('bid',function(){
    localStorage.removeItem('test_bid');
    var activity = new Activity("test_bid");
    activity.create();
    var activity_info = JSON.parse(localStorage['test_bid']);
    var bid_num_before_create = activity_info.bids.length;
    localStorage['test_bid'] = JSON.stringify(activity_info);
    it('when create a new bid then bid num should increase 1',function(){
        localStorage.newestActivity = 'test_bid';
        var new_bid = new Bid();
        new_bid.create_new_bid_name();
        new_bid.create();
        activity_info = JSON.parse(localStorage['test_bid']);
        var bid_num_after_create = activity_info.bids.length;
        expect(bid_num_after_create - bid_num_before_create).toEqual(1);
    })
})
describe('BidStatus',function(){
    var bid_status;
    localStorage.removeItem('BidStatus');
    bid_status = new BidStatus();
    it('when click bid start then bid status is started',function(){
        bid_status.started();
        expect(localStorage.BidStatus).toEqual('started');
    });
    it('when click bid ended then bid status is ended',function(){
        bid_status.ended();
        expect(localStorage.BidStatus).toEqual('ended');
    });
    it('when create a new activity then bid status is not start',function(){
        bid_status.do_not_start();
        expect(localStorage.BidStatus).toEqual('not_start');
    })
})

describe('bid response',function(){
    var message = {"message":"zfm","phone":"123"};
    var bid_status = new BidStatus();
    var bid_response;
    it('give bid do not start when send a message then call bid_not_start method',function(){
        bid_status.do_not_start();
        bid_response = new BidResponse(message);
        spyOn(bid_response,'bid_not_start');
        bid_response.process_base_no_bid_status();
        expect(bid_response.bid_not_start).toHaveBeenCalled();
    });
    it('give bid started when send a message then call bid_started method',function(){
        bid_status.started();
        bid_response = new BidResponse(message);
        spyOn(bid_response,'bid_started');
        bid_response.process_base_no_bid_status();
        expect(bid_response.bid_started).toHaveBeenCalled();
    });
    it('give bid ended when send a message then call bid_ended method',function(){
        bid_status.ended();
        bid_response = new BidResponse(message);
        spyOn(bid_response,'bid_ended');
        bid_response.process_base_no_bid_status();
        expect(bid_response.bid_ended).toHaveBeenCalled();
    })
})

describe('bid response method',function(){
    var message = {"message":"zfm","phone":"123"};
    var bid_response = new BidResponse(message);
    it('when call bid_not_start method then reply a not start message',function(){
        spyOn(reply_bid,'do_not_start');
        bid_response.bid_not_start();
        expect(reply_bid.do_not_start).toHaveBeenCalled();
    });
    it('when call bid_ended method then reply a ended message',function(){
        spyOn(reply_bid,'ended');
        bid_response.bid_ended();
        expect(reply_bid.ended).toHaveBeenCalled();
    });
    it('when call bid_started method then judge how to process bid',function(){
        spyOn(BidProcess,'judge_how_to_process_bid');
        bid_response.bid_started();
        expect(BidProcess.judge_how_to_process_bid).toHaveBeenCalled();
    })
})

describe('bid success',function(){
    localStorage.removeItem('test_bid1');
    var activity = new Activity("test_bid1");
    activity.create();
    localStorage.newestActivity = 'test_bid1';
    var new_bid = new Bid();
    new_bid.create_new_bid_name();
    new_bid.create();
    it('should save bid info',function(){
        BidSuccess.save_bid_info('zfm','123','5','test_bid1');
        var activity_info = JSON.parse(localStorage['test_bid1']);
        expect(activity_info.bids[0].竞价1[0].name).not.toBe(null);
        expect(activity_info.bids[0].竞价1[0].phone).not.toBe(null);
        expect(activity_info.bids[0].竞价1[0].price).not.toBe(null);
    });
    it('when receive a bid message then get bidder name from applicant info with phone num',function(){
        ApplySucceed.save_activity_apply_info('zfm','123','test_bid1');
        expect(BidSuccess.get_bidder_name_from_apply_info(123,'test_bid1')).toEqual('zfm');
    });
    it('when bid succeed then save bid info and reply a succeed message',function(){
        var message = {"message":"zfm","phone":"123"};
        spyOn(BidSuccess,'save_bid_info');
        spyOn(reply_bid,'success');
        BidSuccess.process(message,'test_bid1');
        expect(BidSuccess.save_bid_info).toHaveBeenCalled();
        expect(reply_bid.success).toHaveBeenCalled();
    })
})

describe('BidProcess',function(){
    var message_1 = {"message":"5","phone":"123"};
    var message_2 = {"message":"5","phone":"124"};
    localStorage.removeItem('test_bid');
    var activity = new Activity('test_bid');
    activity.create();
    ApplySucceed.save_activity_apply_info('zfm','123','test_bid');
    it('give a bid message when bidder have applied then is_bidder_applied return true',function(){
        expect(BidProcess.is_bidder_applied(message_1.phone,'test_bid')).toBe(true);
    });
    it('give a bid message when bidder have not applied then is_bidder_applied return false',function(){
        expect(BidProcess.is_bidder_applied(124,'test_bid')).toBe(false);
    });
    it('when bidder have not applied(is_bidder_applied return false) then reply a have not applied message',function(){
        spyOn(reply_bid,'have_not_applied');
        BidProcess.judge_how_to_process_bid(message_2);
        expect(reply_bid.have_not_applied).toHaveBeenCalled();
    });
    it('give a bid message when bidder have offered price then is_bidder_offered_price return true',function(){
        BidSuccess.save_bid_info('zfm','123','5','test_bid');
        expect(BidProcess.is_bidder_offered_price(123,'test_bid')).toBe(true);

    });
    it('give a bid message when bidder have offered price then is_bidder_offered_price return false',function(){
        expect(BidProcess.is_bidder_offered_price(124,'test_bid')).toBe(false);
    });
    it('when a bidder have offered price then reply a repeat message',function(){
        spyOn(reply_bid,'repeat');
        BidProcess.judge_how_to_process_bid(message_1);
        expect(reply_bid.repeat).toHaveBeenCalled();
    });
    it('when a bidder offered price succeed then call BidSuccess process method',function(){
        ApplySucceed.save_activity_apply_info('zfm','124','test_bid');
        spyOn(BidSuccess,'process');
        BidProcess.judge_how_to_process_bid(message_2);
        expect(BidSuccess.process).toHaveBeenCalled();
    })
})

describe('statistics of bid info',function(){
    var bid_info = [
        {"name":"yinyi","phone":"123452","price":"12"},
        {"name":"zfm","phone":"2334551","price":"11"},
        {"name":"zyq","phone":"2134556","price":"10"},
        {"name":"wb","phone":"2314556","price":"11"}
    ];
    var bid_info_later = [
        {"name":"zyq","phone":"2134556","price":"10"},
        {"name":"zfm","phone":"2334551","price":"11"},
        {"name":"wb","phone":"2314556","price":"11"},
        {"name":"yinyi","phone":"123452","price":"12"}
    ];
    var num_of_price = [{"price":"10","num":1},{"price":"11","num":2},{"price":"12","num":1}];
    it('give bid info when this bid end then order the bid info obj ascending',function(){
        var result = order_bid_info_in_asc(bid_info);
        expect(result).toEqual(bid_info_later);
    });
    it('give bid result info when need to count then get the num of each price',function(){
        var result = get_the_num_of_each_price(bid_info_later);
        expect(result).toEqual(num_of_price);
    });
    it('give num of each price info when this bid end then get the winner price',function(){
        expect(get_the_winner_price(num_of_price)).toBe('10');

    });
    it('give bid info when bid ended then get the winner',function(){
        expect(get_the_winner(bid_info_later,10)).toEqual({"name" :"zyq","phone":"2134556","price":"10"});
    })
})