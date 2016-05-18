<?php
/*Not working 04/24/16-use jqPost file set.  test only.  Original is copy of ajaxTabTestHist (a basic read only version of table data)
adapt this w/ update/set to be able to edit info in browser and write to db
 * changed ui from table to article type entry so edit and add new could be incorporated
 * see mylyn task- ajax-post functionality for details
 */
require_once '../../jqGet/php/dbLogin.php';

// delete record if proper conditions set
if (isset($_POST['delete']) && isset($_POST['history_id'])) {
	$history_id = get_post($con, 'history_id');
	$sql="DELETE FROM history WHERE history_id = $history_id";
	$result = mysqli_query($con,$sql);
	
	if (!$result) echo "DELETE failed: $sql<br>" . $con->error . "<br><br>";
}

if (//isset($_POST['history_id']) &&  // note history-Id is auto increment and therefore does not get entered- db assigns this
	isset($_POST['title']) 		&&
	isset($_POST['year'])		&&
	isset($_POST['content'])) {

		$title			= get_post($con, 'title');
		$year			= get_post($con, 'year');
		$content		= get_post($con, 'content');

		
	// this needs to be in the same order as the table- in this case history_id is the 6th column- note that NULL does NOT
	// have quotes around it- similar to number columns it is not enclosed	
	$sql= "INSERT INTO history VALUES ('$title', '$year', '$content', NULL, NULL, NULL, 'admin', SYSDATE())";
	$result = mysqli_query($con,$sql);
	
	if (!$result) echo "INSERT failed: $sql <br>" . $con->error . "<br><br>";
}

$sql= "SELECT * FROM history";
$result = mysqli_query($con,$sql);

$rows = $result->num_rows;

for ($j = 0; $j < $rows; ++$j) {
	$result->data_seek($j);
	$row = $result->fetch_array(MYSQLI_NUM);

}

mysqli_close($con);

//this function translates html entry into test to be added to db- add additional SQL injection prevents -see lpmj pg 263
function get_post($con, $var) {
	return $con->real_escape_string($_POST[$var]); //note, no quotes on $var
	
}
?>

<!-- htmlspecialchars prevents cross site scripting hacks see wc3 schools php section, forms subsection -->

<form id="hist_newrec" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post"><pre>
<!-- here is where I left off- pulled html out of echo sections above.  see w3c sh php form section and copy functionality
should still be able to treat db connection the same
 call the php via $chars,  -->
<!-- per w3c example and the field validation steps -->
     Title 	<input type="text" name="title">
      Year 	<input type="text" name="year">
   Content 	<input type="text" name="content">
			<input type="submit" value="Add Record">
</pre>
</form>

	<pre>
	History ID 	<input name="history_id" value=?php echo $row[5];?>
		 Title 	$row[0]
		  Year 	$row[1]
	   Content 	$row[2]	
	</pre>
	<form id="hist_form" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post">
	<input type="hidden" name="delete" value="yes">
	<input type="hidden" name="history_id" value="$row[5]">
	History ID 	<input name="history_id" value="?php echo $row[5];?">
	<input type="submit" value="Delete Record">
	</form>
