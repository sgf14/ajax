//05/21/16-initial test of refactoring into modular js files based on function, successful.  working to finalize

//this doesnt do exactly what I expected but it does put the cursor on first entry- but in the year field not the title
// field.  The final <input> of the 1st group.
function loadDefault(){
	$('.divsHist:first input').focus();
	//note- w/o the return false the cursor doesnt appear in box [focus() doesnt work].
	return false;
}