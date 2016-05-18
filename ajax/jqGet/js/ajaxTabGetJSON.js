var getData = function () {  
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
				var $content = $("<table><thead>" +
						"<th>ID</th><th>Title</th><th>Year</th><th>Contents</th>" +
						"</thead>" +
						"<tbody id='histbody'></tbody>" +
						"</table>");
				
				var $gridData = (function(){getHistData()});
				
				$("main .content").append($content);
				$("main .content").append($gridData);
			} else if ($element.parent().is(":nth-child(3)")){
				var $content = $("<div>Under Construction</div>");
				$("main .content").append($content);
				//$("main .content").load("php/ajaxTabTestEtym.php");
			}
//return false or browser will follow the link- pg 136 in WAB
			return false;
		});
	});
	
	$(".tabs a:first-child span").trigger("click");

    
};

function setHistGridData(data) {
	//xml diff 1- this is json version, vs original xml loop
	//need to be careful with JSON if created manually- cannot be malformed (commas at end) or data wont display
	// as long as you use php json_encode() properly none of the following needs to be altered
	for (var i=0; i < data.length; i++) {
		var histData = data[i];
		var tr = $("<tr></tr>");
		tr.append($("<td></td>").html(histData.history_id));
		tr.append($("<td></td>").html(histData.title));
		tr.append($("<td></td>").html(histData.year));
		tr.append($("<td></td>").html(histData.content));
		$("#histbody").append(tr);
	}
}

function getHistData() {
	//xml diff 2- chg data source, otherwise the same
	//$.get("json/histTableData.json", setHistGridData);
	$.get("php/ajaxTabTestHistGetJSON.php", setHistGridData);
}

$(document).ready(getData);
//$(document).ready(function () {
//	$.get("php/ajaxTabTestHistGet.php", getData).done(function () {
//		$(".tabs a:first-child span").trigger("click"); return false; 
//	});
//});