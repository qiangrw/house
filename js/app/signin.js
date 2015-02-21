$(function(){
    var config = JSON.parse(localStorage.getItem("config"));
    $("#signin-form").validate( {
        rules: {
                   phone: {
                        required: true,
                        minlength: 11,
                        maxlength: 11
                        },
                   password: {
                        required: true,
                        minlength: 6,
                        maxlength: 12
                        }
               },
        errorPlacement: function(error, element) {
                        error.insertAfter(element.parent());
               },
        submitHandler: function(form) {
                var passhash = md5($("#password").val());
                $.ajax({
                    dataType: 'JSONP',
                    type: 'GET',
                    jsonCallback: 'callback',
                    url: config.api_url,
                    data: {
                       querytype: "login",
                       phone: $("#phone").val(),
                       password: passhash
                    },
                    success: function (responseData) {
                        if (responseData.result.status == 1) { 
                           var user = {
                            uid: responseData.result.uid,
                            phone: $("#phone").val(),
                            identity: responseData.result.identity,
                            password: passhash
                           };
                           localStorage.setItem('user', JSON.stringify(user));
                            if (user.identity == 1) {
                                $( ":mobile-pagecontainer" ).pagecontainer( "change", "house_list.html", { role: "page" } );
                            } else {
                                $( ":mobile-pagecontainer" ).pagecontainer( "change", "agent_message.html", { role: "page" } );
                            }  
                       } else {
                        alert(responseData.result.err_msg)
                       }

                    },
                    error: function (responseData) {
                       // TODO ERROR HANDLER
                       alert('Ajax request not recieved!');
                    }
                });
        }
    });
});
