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
               $.ajax({
                           dataType: 'JSONP',
                           type: 'GET',
                           jsonCallback: 'callback',
                           url: config.api_url,
                           data: {
                               querytype: "login",
                               phone: $("#phone").val(),
                               password: $("#password").val()
                           },
                           success: function (responseData) {
                               var user = {
                                uid: responseData.result.uid,
                                identity: responseData.result.identity,
                                password: $("#password").val()
                               };
                               localStorage.setItem('user', JSON.stringify(user));
                               $( ":mobile-pagecontainer" ).pagecontainer( "change", "house_list.html", { role: "page" } );

                           },
                           error: function (responseData) {
                               // TODO ERROR HANDLER
                               alert('Ajax request not recieved!');
                           }
                           });
                       }
    });
});
