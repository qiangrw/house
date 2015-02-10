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
                           dataType: 'json',
                           type: 'post',
                           url: config.api_url,
                           data: {
                               querytype: "login",
                               phone: $("#phone").val(),
                               password: $("#password").val()
                           },
                           success: function (responseData) {
                               var user = {
                                uid: 1,
                                password: "abcdef"
                               };
                               localStorage.setItem('user', JSON.stringify(user));
                               $( ":mobile-pagecontainer" ).pagecontainer( "change", "house_list.html", { role: "page" } );

                           },
                           error: function (responseData) {
                               // for test
                               var user = {
                                uid: 1,
                                password: "abcdef"
                               };
                               localStorage.setItem('user', JSON.stringify(user));
                               console.log('Ajax request not recieved!');
                               $( ":mobile-pagecontainer" ).pagecontainer( "change", "house_list.html", { role: "page" } );
                           }
                           });
                       }
    });
});
