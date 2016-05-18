//05/14/16- historical version only.  This code doesnt fully work- see current ajaxPost with $(each) that does work
//to add a form for each database entry with its own editabel input box.  this version puts multiple db entries
// into a single form as noted below. didnt have this as version controlled ajax project yet, so made history versions
//for reference later.

//basic jq ready.  When page loads run this code
//04/30/16- the get part works to display values in input fields.  working on post part
$(document).ready(function () {
	//load page w/ initial data from db
	var title = "title";
	//note upon successful get, .done calls a function- in this case to put cursor in first box
	//$.get('php/ajaxGet.php', { 'title': title }, showResults); //.done(loadDefault);
	$.get('php/ajaxGet.php', showResults);
	//basic click handler.  change the data based on entry in the field.  use keyup()??
	$("#saveFormData").click(ajaxPost);
	
});

//handle the results 
function showResults(data) {
	
	var titleType = 'type = "text"';
	//note no ID- because id has to be unique and this returns multiple results.  Could put id in for loop, or you could
	//dynamically make a form for each record
	var titleClass = 'class = "testFormTitle"';
	var idName = 'name = "history_id"';
	var titleName = 'name = "title"';
		
	if (data.length > 0) {
		/*05/14/16- this is where things are getting stuck.  it brings back db data
		 * but both the for loop and each loop- see ajaxPostEachVer.js- both
		 * bring back multiple records in each <form> or <div> tag, minus 1st record, then repeats each time thru loop
		 * w/ one less record each go around.
		 * trying to get one record to populate one form or div tag then move on to the next record, until the end
		 */
		
		
		//note 0 based array
		for (var i = 0; i <= data.length-1; i++) {
			var recordData = data[i];
			//index
			var recordIndex = recordData.history_id;
			var idxId = '"formHist' + recordIndex + '"';
			var idxTag = '$("#formHist' + recordIndex + '")';
			//this goes through each to make a form
			var testFormTag = '<form class="formsHist" id=' + idxId + '></form>';
			
			//idx - but then this and next 2 tack on all recs minus first instead of single first rec under form- since 
			//testTagForm is in last #container line in block- need an internal for loop??
			var idx = '<input class="hidden"' + idName + ' value="' + recordIndex + '"></input>';
			console.log("recordIndex= "+ recordIndex + "; idxId= " + idxId + "; idxTag= " + idxTag)
			$("#formHist15").append(idx); //no-testFormTag, idxTag.append(idx), $('"#' + idxId)- w/ type errors; 
			//no- $("#formHist15") no type errors- but doesnt display- 1st record not in set
			//yes- but dup problem , "$(form)"
			
			//display label
			var titleLabel = '<label class="label">Title: </label>';
			$("#formHist15").append(titleLabel);
			
			//title data
			var titleValue = 'value = "' + recordData.title + '"';
			var inputStg = "<input " + titleType + " " + titleClass + " " 
				+ titleName + " " + titleValue + "/><br>";
			$("#formHist15").append(inputStg);
			//attach all to body div-  
			$("#container").append(testFormTag);
		}
		
	} else {
		$("#container").html = "No Results";		
	}
}

function loadDefault(){
	$(".formsHist:first").focus();
	//$("#testFormTag .testFormTitle:first").focus();
	//note- w/o the return false the cursor doesnt appear in box (focus() doesnt work)
	return false;
}

function ajaxPost() {
	//hard coded test post works.  Need to change vars to for each loops to grab changs from form and update db
	var idx = ""; //"14";
	var newTitle = ""; //"myLtest";
	var recordCount = 0;
	
	//so this works to walk through the index values, except that first title repeats 5 times. nned to be able to 
	//connect idx to title in an array to step through each, i think.. see what php book does for this
	$("#testForm .hidden").each( function() {
		idx = $(this).val();
		newTitle = $("#testForm .testFormTitle").val();
		//alert("idx= " + idx + "; title= " + newTitle);
		console.log("idx= " + idx + "; title= " + newTitle);
		//$.post('php/ajaxPost.php', { 'history_id': idx, 'title': newTitle } );
	});
	
//	$("#testForm .hidden").each( function() {
//		recordCount = recordCount + 1;
//	});
////	console.log(recordCount);
//	
//	//var recordCount = $("#testForm .hidden");
//	for (var i = 1; i <= recordCount; i++) {
//		idx = $(this).val();
//		newTitle = $("#testForm .testFormTitle").val();
//		console.log("idx= " + idx + "; title= " + newTitle);
//	}
	
	//get from db again and call formatting func.
	//TODO clear existing form then Get.  This code tacks on a 2nd group to the bottom
	//var title = "title";
	//$.get('php/ajaxGet.php', { 'title': title }, showResults);
}