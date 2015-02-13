$(function(){
    var config = JSON.parse(localStorage.getItem("config"));
    var user   = JSON.parse(localStorage.getItem('user'));
    $.ajax({
        dataType: 'jsonp',
        type: 'get',
        jsonCallback: 'callback',
        url: config.api_url,
        data: {
            querytype: "getalllist",
            uid: user.uid,
            password: user.password
        },
        success: function(data) {
                     console.log(data);
                     if (data.mainStatus != 1) {
                         alert(data.mainNotice);
                     } else {
                         // deal with these data
                         console.log(data.result);
                         userinfo = data.result.userinfo;
                         requestinfo = data.result.requestinfo;
                         housesheetinfo = data.result.housesheetinfo;
                         latestmsg = data.result.latestmsg;
                     }
        }
    });
});

