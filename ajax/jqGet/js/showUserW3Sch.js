function showUser(str) {
	
	//repl this wiht jq get and add jq call in index
    if (str == "") {
        document.getElementById("txtHint").innerHTML = "";
        return;
    } else {
    	// here is the W3 schools ajax method
//        if (window.XMLHttpRequest) {
//            // code for IE7+, Firefox, Chrome, Opera, Safari
//            xmlhttp = new XMLHttpRequest();
//        } else {
//            // code for IE6, IE5
//            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//        }
//        xmlhttp.onreadystatechange = function() {
//            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//                document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
//            }
//        };
//        xmlhttp.open("GET","php/getUserW3sch.php?q="+str,true);
//        xmlhttp.send();
//    
    	//here is the jquery version of the same- note use of ajax load instead of get. SAJ book 432
    	// since you are loading direct from the server, not jusst 'get' ing.  see pg 429
    	// this requires calling jq in index, where as w3 schools doesnt- it is basic javascript (w/o the need for a library)
    	$(document).ready(function() {
    		$("#txtHint").load("php/getUserW3sch.php?q="+str);
    	});
    }
}

