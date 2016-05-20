//refactoring the '2' series to 
//  1) breakout functions to organized set of js folders/files for easier expansion
//  2) add additional db columns to establish expandable pattern 
var origDataArray = [];
//basic jq ready.  When page loads run this code
$(document).ready(function () {
	//load page w/ initial data from db. Note upon successful get, .done calls a function- in this case to put cursor in first box
	$.get('php/ajaxGet.php', showResults).done(loadDefault);
	//js import test, just need to call all reqd js files in html to have access to other js files functions
	//  same as you are doing with jquery cdn in the html file
	loadDefault2();
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
		var idxTag = $('<input name="historyId" value="' + val.history_id + '" ></input>');
		//could add an array function her so you get orig vals to compare to new entries to minimize posts below
		//formOrigDataArr.push(name="title");
		//formOrigDataArr.push('value="' + val.title + '"');
		div.append(idxTag);
		//title html
		div.append('<br><label>Title:</label>&nbsp');
		//title contents within editable input field
		var item = $('<input type="text" name="title" value="' + val.title + '"></input>');
		div.append(item);
		//append the div to the form tag
		$("#container").append(div);
		
		//build array of original data.  optional- it just allows for posts limted to only those records that changed
		//need text tags to pad so it aligns w/ serializedArray() output below
		origDataArray.push("history_id");
		origDataArray.push(val.history_id);
		origDataArray.push("title");
		origDataArray.push(val.title);
	});
	//console.log(origDataArray);
}

function loadDefault(){
	$("#container:first input").focus();
	//note- w/o the return false the cursor doesnt appear in box [focus() doesnt work].
	return false;
}

function ajaxPost() {
	//05/18/16- this approach seems pretty clunky, but it works.  and it only posts when data has changed
	//havent found a more elegant approach yet online.
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
	
	//send data to db via post- relies on regularly repeated format
	for (var i = 0; i < newDataArray.length; i = i + 4) {
		var newHistoryId = newDataArray[i+1];
		var newTitle = newDataArray[i+3];
		var idTagMatch = origDataArray[i+1] == newDataArray[i+1];
		var titleTagNotMatch = origDataArray[i+3] != newDataArray[i+3];
		//console.log(origDataArray[i+1] + " " + idTagMatch + ";" +  origDataArray[i+3] + " " + titleTagNotMatch);
		
		//conditional to test if record changed- only post those.  would need to modify NotMatch val if mulitple
		// columns on form- this example only has title.
		if (idTagMatch && titleTagNotMatch) {
			//console.log(i +" id " + newHistoryId + ": title " + newTitle);
			$.post('php/ajaxPost.php', { 'history_id': newHistoryId, 'title': newTitle } );
		}
	}
	
	//get from db again and call formatting func.
	//Clear existing form then refresh w db data. 
	$("#container").html("");
	$.get('php/ajaxGet.php', showResults);
}