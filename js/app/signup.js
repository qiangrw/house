$(function(){
    var config = JSON.parse(localStorage.getItem("config"));
    /*
    $("#get-vcode-btn").click(function() {
        if ($("#phone").val().length != 11) {
            alert("请填写手机号");
            return;
        }
        $.ajax({
            dataType: 'JSONP',
            type: 'GET',
            jsonCallback: 'jsonp',
            url: config.api_url,
            data: {
               querytype: "captcha",
               phone: $("#phone").val(),
            },
            success: function (responseData) {
                if (responseData.result.status == 1) {
                   $("#get-vcode-btn").html("验证码已发送到手机");
                   $("#get-vcode-btn").attr("disable", true);
               } else {
                  alert(responseData.result.err_msg)
               }

            }
        });
        
    });*/
    $("#signup-form").validate( {
        rules: {
                username: {
                    required: true,
                    minlength: 1,
                    maxlength: 40
                    },
                phone: {
                    required: true,
                    minlength: 11,
                    maxlength: 11
                    },
                /*vcode: {
                    required: true,
                    minlength: 1,
                    maxlength: 10
                    },
                */
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
                identity: {
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
                       querytype: "register",
                       username: $("#username").val(),
                       phone: $("#phone").val(),
                       password: $("#password").val(),
                       identity: $("#identity").val(),
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
                           $( ":mobile-pagecontainer" ).pagecontainer( "change", "signup_succ.html", { role: "page" } );
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
