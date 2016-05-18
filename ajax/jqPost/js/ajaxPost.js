//05/14/16- the get part works to display values in unique forms w/ input fields for editing.  working on post part
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
	//iterate through each record, create unique form id, populate data and append to html container tag 
	$.each(data, function(key,val) {
		//add form tag to group results and add a unique id per form
		var form = $('<form class="formsHist" id="histForm' + val.history_id + '"></form>');
		//id
		//old span ver- spans dont have normal name/value pairs like input
		//var idxTag = $('<span></span>').html(val.history_id);
		var idxTag = $('<input name="historyId" value="' + val.history_id + '" ></input>');
		//these dont work as I expected, alternate to serializeArray()- attempting to build orignal data array that 
		//    can be compared to changes when save button pushed
		//formOrigDataArr.push($("input").attr(id));
		//formOrigDataArr.push($("input").val());
		form.append(idxTag);
		//title html
		form.append('<br><label>Title:</label>&nbsp');
		//title contents within editable input field
		var item = $('<input type="text" name="title" value="' + val.title + '"></input>');
		//formOrigDataArr.push(name="title");
		//formOrigDataArr.push('value="' + val.title + '"');
		form.append(item);
		//expand with other db fields in similar manner for fully fledged form
		//var formOrigDataArr = $('#histForm' + val.history_id + '"').serializeArray();
		formOrigDataArr = $('form').serializeArray();
		//append the form group
		$("#container").append(form);
		//console.log(formOrigDataArr);
	});
	
}

function loadDefault(){
	$(".formsHist:first input").focus();
	//note- w/o the return false the cursor doesnt appear in box [focus() doesnt work].
	return false;
}

function ajaxPost() {
	//hard coded test post works writing to db.  Need to change vars to for each loops to grab changs from form and update db
	var idx = ""; //"14";
	var newTitle = ""; //"myLtest";
	var recordCount = countOf($("#container children"));
	console.log(recordCount); 
	
	//build an array of form data
//	var formNewDataArray = [];
//	$.each($(".formsHist"), function() {
//		//not working yet.  trying to build array of forms under #container, then use that array data to post to db
//		formNewDataArray.push($(this).children("title").val());
//	});
//	console.log(formNewDataArray);
	
	
	//old- practicing 
	//this gets the 1st span value- 15- but then repeats 5 times, not looping thru the id to the next number. 
	//it also only grabs the first input- the save button on the html- not the form values
//	$.each($(".formsHist"), function() {
//		idx = $("span").html();
//		newTitle = $("input").val();
//		//alert("idx= " + idx + "; title= " + newTitle);
//		console.log("idx= " + idx + "; New title= " + newTitle);
//		// the db post does work- commented out until I get it to loop through the values properly
//		//$.post('php/ajaxPost.php', { 'history_id': idx, 'title': newTitle } );
//	});
//	
//	$(".formsHist").each( function() {
//		recordCount = recordCount + 1;
//	});
//	console.log(recordCount);
	
	//var recordCount = $("#testForm .hidden");
//	for (var i = 1; i <= recordCount; i++) {
//		idx = $("form input").val();
//		//newTitle = $("#testForm .testFormTitle").val();
//		console.log("idx= " + idx); // + "; title= " + newTitle);
//	}
	
	//get from db again and call formatting func.
	//TODO clear existing form then Get.  This code tacks on a 2nd form group to the bottom if uncommented
	//$.get('php/ajaxGet.php', showResults);
}