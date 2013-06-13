function Phones() {
}

Phones.save = function (message) {

    var phones = this.get();

    if (!_.include(phones, message['phone'])) {
        phones.push(message['phone']);
        localStorage.setItem("phones", JSON.stringify(phones))
    }

}

Phones.get = function () {
    return JSON.parse(localStorage.getItem("phones"));

}

Phones.get_50 = function () {
    return JSON.parse(localStorage.getItem("phones")).slice(0, 50);
}


Phones.get_an_random = function () {
    var phones = this.get();
    var random = Math.floor(Math.random() * ( phones.length));

    return phones[random];
}

Phones.clear_phones = function()
{
    localStorage.setItem("phones",JSON.stringify([]))
}


Phones.save_lottery_phone_number = function (phone) {
    var phones = this.get_has_lottery();
    phones.push(phone);
    localStorage.setItem("has_lottery_phones", JSON.stringify(phones));
}

Phones.get_has_lottery = function () {
    return JSON.parse(localStorage.getItem("has_lottery_phones"))
}

Phones.check_has_lottery = function (phone) {
    var phones = this.get_has_lottery();
    return _.include(phones, phone);
}

Phones.get_an_lottery = function () {
    var random_phone = "";
    while (true) {
        random_phone = this.get_an_random();
        if (!this.check_has_lottery(random_phone) && random_phone != null) {
            this.save_lottery_phone_number(random_phone);
            break;
        }
    }
    return random_phone;
}




Phones.clear_lottery = function()
{
    localStorage.setItem("has_lottery_phones",JSON.stringify([]))
}
