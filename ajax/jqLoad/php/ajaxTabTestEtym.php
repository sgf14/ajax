<?php
require_once '../../jqGet/php/dbLogin.php';

$sql="SELECT * FROM etymology WHERE 0 = 0";
$result = mysqli_query($con,$sql);

// note using jq ajax load not get
// the html in the php file directly so it is not just sending the server data back to the client- like get/post-
// for it to do the UI presentation
echo "<table>
<tr>
<th>ID</th>
<th>Word</th>
<th>Definition</th>
<th>Source</th>

</tr>";
while($row = mysqli_fetch_array($result)) {
    echo "<tr>";
    echo "<td>" . $row['etymology_id'] . "</td>";
    echo "<td>" . $row['word'] . "</td>";
    echo "<td>" . $row['definition'] . "</td>";
    echo "<td>" . $row['language_origin'] . "</td>";
    echo "</tr>";
}
echo "</table>";
mysqli_close($con);
?>

