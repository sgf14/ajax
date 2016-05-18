//basic jq ready.  When page loads run this code
$(document).ready(function () {
	//basic click handler.  Call the search() function when the go button is clicked
	$("#go").click(search);
});

function search() {
	//What is in the text box?
	var q = $("#q").val();
	//send request to server
	//1st arg is url for server and do the actual search, 2nd arg sends a query string parameter
	//3rd arg is the function to run when the results are successfully returned.
	//would also do error handling here- although none in this short example.
	$.get('php/ajaxGetSearch.php', { 'q': q }, showResults);
}

//handle the results
function showResults(data) {
	var html = '';
	//if we got some results...
	if (data.length > 0) {
		//need to fix this part- getting JSON back ok, but PHP books isnt json (an Object), its an entry
		//go back and look in 
		html = '<ul>';
		for (var i in data) {
			//this method was used in cookbook- wasnt adding JSON elements correctly- play around with this some more
			var escaped = $('<div/>').text(data[i]).html();
			html += '<li>' + escaped + "</li>";
			
			//this was version in SAJ book, pg 439- this worked, but need to hard code each object element-only have title now
			//and havent tested multiple matches in data set.  so more testing needed.
			var record = data[i];
			var title = $("<p></p>").html(record.title);
			var div = $("<div></div").append(title);
 		}
		html += '</ul>';
	} else {
		html = 'No results';
	}
	//put the result HTML on the page
	//$("#output").html(html);
	$("#output").append(div);
}