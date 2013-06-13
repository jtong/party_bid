describe('Activity',function(){
    var activity;
    beforeEach(function(){
        localStorage.ActivityNames = JSON.stringify([]);
        localStorage.removeItem('test');
        activity = new Activity("test");
        activity.create();
    })

   it("should save activity to localStorage",function(){

       expect(localStorage.test).not.toBeUndefined();

       var activity_in_storage = JSON.parse(localStorage.test);

       expect(activity_in_storage.applicant).not.toBe(null);
       expect(activity_in_storage.bids).not.toBe(null);
    });

    it("should save activity Name to localStorage", function(){
        expect(localStorage.ActivityNames).not.toBeUndefined();
        var activity_name = JSON.parse(localStorage.ActivityNames);
        expect(activity_name).toContain("test");
    })

    it("should find activity by Name from localStorage", function(){
        var activity_from_localStorage = activity.find_by_name('test');

        expect(activity_from_localStorage.applicant).not.toBeUndefined();
        expect(activity_from_localStorage.bids).not.toBeUndefined();
    })

    it("should find undefined from localStorage by name not existing", function(){

        var activity_from_localStorage = activity.find_by_name("not exist activity");
        expect(activity_from_localStorage).toBeUndefined();
    })



})