$(function(){
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
               }
    });
});
