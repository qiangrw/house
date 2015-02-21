$(function(){
    var config = JSON.parse(localStorage.getItem("config"));
    var user   = JSON.parse(localStorage.getItem('user'));
    $("#post-form").validate( {
        rules: {
                roomtype: {required: true },
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
                    },
                    success: function (responseData) {
                        if (responseData.mainStatus != "1") {
                            alert(responseData.mainNotice);
                        } else {
                        if (responseData.result.status == "1") {
                           localStorage.setItem('user', JSON.stringify(user));
                           $( ":mobile-pagecontainer" ).pagecontainer( "change", "agent_house_list.html", { role: "page" } );
                       } else {
                            alert(responseData.result.err_msg)
                       }
                       }
                    }
                });
        }
    });
});
