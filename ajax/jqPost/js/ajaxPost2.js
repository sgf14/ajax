//refactoring the '2' series to 
//  1) breakout functions to organized set of js folders/files for easier expansion
//  2) add additional db columns to establish expandable pattern 
var origDataArray = [];
//basic jq ready.  When page loads run this code
$(document).ready(function () {
	//load page w/ initial data from db. Note upon successful get, .done calls a function- in this case to put cursor in first box
	$.get('php/ajaxGet2.php', showResults).done(loadDefault);
	//js import test, just need to call all reqd js files in html to have access to other js files functions
	//  same as you are doing with jquery cdn in the html file
	//loadDefault2();
	//basic click handler
	$("#saveFormData").click(ajaxPost);
	
});

//handle the results 
function showResults(data) {
	//iterate through each record, create unique div id, populate data and append to html container tag 
	$.each(data, function(key,val) {
		//add div tag to group results and add a unique id per form
		var div = $('<div class="divsHist" id="histDiv' + val.history_id + '"></div>');
		//id
		var idxVal = $('<input name="historyId" value="' + val.history_id + '" disabled="true" ></input>');
		div.append(idxVal);
		//title- not &nbsp is an alternate to adding spaces in html text
		div.append('<br><label>Title:</label>&nbsp');
		var titleVal = $('<input type="text" name="title" value="' + val.title + '"></input>');
		div.append(titleVal);
		//year
		div.append('<label> Year: </label>');
		var yearVal = $('<input type="text" name="year" value="' + val.year + '"></input>');
		div.append(yearVal);
		//append the div to the form tag
		$("#container").append(div);
		
		//array of original data for later comparison to changed data
		origDataArray.push("history_id");
		origDataArray.push(val.history_id);
		origDataArray.push("title");
		origDataArray.push(val.title);
		origDataArray.push("year");
		origDataArray.push(val.year);
	});
	//console.log(origDataArray);
}

function ajaxPost() {
	// get revised data and create empty array to hold new data
	var serializeHistForm = $("#container").serializeArray();
	var newDataArray = [];
	//console.log(serializeHistForm); 

	//push updated form data
	$.each(serializeHistForm, function(key, field) {
		//console.log('Name: ' + field.name + ". Value: " + field.value);
		newDataArray.push(field.name);
		newDataArray.push(field.value);
	});
	
	//send data to db via post- relies on regularly repeated format- i=i+n where n=2*number of data columns
	for (var i = 0; i < newDataArray.length; i = i + 6) {
		var newHistoryId = newDataArray[i+1];
		var newTitle = newDataArray[i+3];
		var newYear = newDataArray[i+5];
		//these are boolean type vars
		var idTagMatch = origDataArray[i+1] == newDataArray[i+1];
		var dataTagsNotMatch = (origDataArray[i+3] != newDataArray[i+3])
			|| (origDataArray[i+5] != newDataArray[i+5]);
			//add more entries to match # of columns
		
		console.log(origDataArray[i+1] + " " + idTagMatch + ";" +  origDataArray[i+3] + " " + dataTagsNotMatch);
		
		//conditional to test if record changed- only post those.  
		if (idTagMatch && dataTagsNotMatch) {
			//console.log(i +" id " + newHistoryId + ": title " + newTitle);
			$.post('php/ajaxPost2.php', 
				{ 
				  'history_id': newHistoryId
				, 'title': newTitle 
				, 'year': newYear
				} );
		}
	}
	
	//get from db again and call formatting func. Clear existing form then refresh w db data. 
	$("#container").html("");
	$.get('php/ajaxGet2.php', showResults).done(loadDefault);
}