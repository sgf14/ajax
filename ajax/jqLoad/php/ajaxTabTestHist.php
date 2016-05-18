<?php
//read only display of history data
require_once '../../jqGet/php/dbLogin.php';

$sql="SELECT * FROM history WHERE 0 = 0";
$result = mysqli_query($con,$sql);

// note this has the html in the php file directly so it is not just sending the server data back to the client
// for it to do the UI presentation
echo "<table>
<tr>
<th>ID</th>
<th>Title</th>
<th>Year</th>
<th>Contents</th>

</tr>";
while($row = mysqli_fetch_array($result)) {
    echo "<tr>";
    echo "<td>" . $row['history_id'] . "</td>";
    echo "<td>" . $row['title'] . "</td>";
    echo "<td>" . $row['year'] . "</td>";
    echo "<td>" . $row['content'] . "</td>";
    echo "</tr>";
}
echo "</table>";
mysqli_close($con);
?>

