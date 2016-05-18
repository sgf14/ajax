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
	//this is xml, need to turn php table datainto xcml or json (if json need to adapt this), then call php into this below
	var histData = $(data).find("record");
	histData.each(function() {
		var tr = $("<tr></tr>");
		tr.append($("<td></td>").html($(this).children("history_id").text()));
		tr.append($("<td></td>").html($(this).children("title").text()));
		tr.append($("<td></td>").html($(this).children("year").text()));
		tr.append($("<td></td>").html($(this).children("contents").text()));
		$("#histbody").append(tr);
	});
}

function getHistData() {
	//change this to php file w/ conx to db
	$.get("xml/histTableData.xml", setHistGridData);
}

$(document).ready(getData);
//$(document).ready(function () {
//	$.get("php/ajaxTabTestHistGet.php", getData).done(function () {
//		$(".tabs a:first-child span").trigger("click"); return false; 
//	});
//});