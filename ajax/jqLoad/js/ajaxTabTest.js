var main = function () {  
"use strict";
//tab functionality- pg 137 of web app book(WAB)
	$(".tabs a span").toArray().forEach(function (element) {
		//create a click handler for this element
		$(element).on("click", function() {
			var $element = $(element);
			$(".tabs a span").removeClass("active");
			$(element).addClass("active");
			$("main .content").empty();
//tab content
			if ($element.parent().is(":nth-child(1)")) {
				var $content = $("<div>Main Page</div>");
				$("main .content").append($content);
								
			} else if ($element.parent().is(":nth-child(2)")){
				//$(document).ready(function() {
		    		$("main .content").load("php/ajaxTabTestHist.php"); //change this to ..Post version and test.  this should be the only change in the js file
		    	//});
				
			} else if ($element.parent().is(":nth-child(3)")){
				$("main .content").load("php/ajaxTabTestEtym.php");
			}
//return false or browser will follow the link- pg 136 in WAB
			return false;
		});
	});
	
	$(".tabs a:first-child span").trigger("click");

    
};

$(document).ready(main);