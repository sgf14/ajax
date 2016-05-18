//05/17/16- this now works for both get and post
var formOrigDataArr = [];
//basic jq ready.  When page loads run this code
$(document).ready(function () {
	//load page w/ initial data from db. Note upon successful get, .done calls a function- in this case to put cursor in first box
	$.get('php/ajaxGet.php', showResults).done(loadDefault);
	//basic click handler.  change the data based on entry in the field.  use keyup()??
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
	});
	
}

function loadDefault(){
	$(".formsDiv:first input").focus();
	//note- w/o the return false the cursor doesnt appear in box [focus() doesnt work].
	return false;
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
	
	//send data to db via post- relies on regularly repeated format
	for (var i = 0; i < newDataArray.length; i = i + 4) {
		var newHistoryId = newDataArray[i+1];
		var newTitle = newDataArray[i+3];
		console.log(i +" id " + newHistoryId + ": title " + newTitle);
		$.post('php/ajaxPost.php', { 'history_id': newHistoryId, 'title': newTitle } );
	}
	
	//get from db again and call formatting func.
	//TODO clear existing form then Get.  This code tacks on a 2nd form group to the bottom if uncommented
	//$.get('php/ajaxGet.php', showResults);
}