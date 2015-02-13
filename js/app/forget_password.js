$(function(){
    var config = JSON.parse(localStorage.getItem("config"));
    $("#password-next-form").validate( {
        rules: {
                   phone: { required: true, minlength: 11, maxlength: 11 }
               },
        errorPlacement: function(error, element) {
                            error.insertAfter(element.parent());
                        },
        submitHandler: function(form) {
                           config.phone = $("#phone").val();
                           localStorage.setItem('config', JSON.stringify(config));
                           $.ajax({
                               dataType: 'JSONP',
                               type: 'GET',
                               jsonCallback: 'callback',
                               url: config.api_url,
                               data: { querytype: "captcha", phone: $("#phone").val() },
                               success: function (data) {
                                    if (data.result.status != 1) {
                                        alert(data.err_msg);
                                    } else {
                                        $( ":mobile-pagecontainer" ).pagecontainer( "change", "update_password.html", { role: "page" } );
                                    }
                               }
                            });   

                        }
      });
});
