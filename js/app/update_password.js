$(function(){
    var config = JSON.parse(localStorage.getItem("config"));
    $("#update-password-form").validate( {
        rules: {
                password: {
                    required: true,
                    minlength: 6,
                    maxlength: 12
                },
                password2: {
                    required: true,
                    minlength: 6,
                    maxlength: 12,
                    equalTo: "#password"
                },
                captcha: {
                    required: true
                }
               },
        errorPlacement: function(error, element) {
                        error.insertAfter(element.parent());
               },
        submitHandler: function(form) {
                $.ajax({
                    dataType: 'JSONP',
                    type: 'GET',
                    jsonCallback: 'callback',
                    url: config.api_url,
                    data: {
                       querytype: "resetpassword",
                       phone: $("#phone").val(),
                       password: $("#password").val(),
                       captcha: $("#captcha").val(),
                    },
                    success: function (responseData) {
                        if (responseData.result.status == 1) {
                           var passhash = md5($("#password").val());
                           var user = {
                            uid: responseData.result.uid,
                            identity: responseData.result.identity,
                            password: passhash
                           };
                           localStorage.setItem('user', JSON.stringify(user));
                           $( ":mobile-pagecontainer" ).pagecontainer( "change", "update_succ.html", { role: "page" } );
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
