$(function(){
    var config = {
        //api_url: "http://www.fqwh.com/api/app/v1.php"
        //api_url: "http://webkdd.org/api/app/v1.php"
        api_url: "http://www.fangqianwuhou.com:8080/api/app/v1.php" 
    };
    localStorage.setItem('config', JSON.stringify(config));
    var user   = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
        // $( ":mobile-pagecontainer" ).pagecontainer( "change", "house_list.html", { role: "page" } );
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "agent_message.html", { role: "page" } );
    }
});

function getParameter(name) {
    var url = document.location.href;
    var start = url.indexOf("?")+1;
    if (start==0) {
        return "";
    }
    var value = "";
    var queryString = url.substring(start);
    var paraNames = queryString.split("&");
    for (var i=0; i<paraNames.length; i++) {
        if (name==getParameterName(paraNames[i])) {
            value = getParameterValue(paraNames[i])
        }
    }
    return value;
}

function getParameterName(str) {
    var start = str.indexOf("=");
    if (start==-1) {
        return str;
    }
    return str.substring(0,start);
}

function getParameterValue(str) {
    var start = str.indexOf("=");
    if (start==-1) {
        return "";
    }
    return str.substring(start+1);
}
