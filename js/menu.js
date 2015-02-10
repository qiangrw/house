$(function() {
    $("#signout-btn").click(function(){
        localStorage.setItem('user', JSON.stringify(null));
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "signin.html", { role: "page" } );
    });
});
