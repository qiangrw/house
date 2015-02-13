$(function(){
    var config = JSON.parse(localStorage.getItem("config"));
    var user   = JSON.parse(localStorage.getItem('user'));
    $("#post-form").validate( {
        rules: {
                rewards: {
                    required: true
                    },
                marks: {
                    required: true
                },
                lng: {
                    required: true,
                },
                lat: {
                    required: true
                },
                notice: {required: true },
                budget: {required: true },
                roomtype: {required: true },
                hezutype: {required: true },
                movintime: {required: true }
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
                       querytype: "postrequest",
                       uid: user.uid,
                       password: user.password,
                       housetype: getParameter("housetype"),
                       roomtype: $("#roomtype").val(),
                       rewards: $("#rewards").val(),
                       marks: $("#marks").val(),
                       lng: $("#lng").val(),
                       lat: $("#lat").val(),
                       notice: $("#notice").val(),
                       budget: $("#budget").val(),
                       hezutype: $("#hezutype").val(),
                       movintime: $("#movintime").val()
                    },
                    success: function (responseData) {
                        if (responseData.mainStatus != "1") {
                            alert(responseData.mainNotice);
                        } else {
                        if (responseData.result.status == "1") {
                           localStorage.setItem('user', JSON.stringify(user));
                           $( ":mobile-pagecontainer" ).pagecontainer( "change", "post_succ.html", { role: "page" } );
                       } else {
                            alert(responseData.result.err_msg)
                       }
                       }
                    }
                });
        }
    });
});
