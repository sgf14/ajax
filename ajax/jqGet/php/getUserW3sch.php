<!DOCTYPE html>
<html>
<head>
<style>
table {
    width: 100%;
    border-collapse: collapse;
}

table, td, th {
    border: 1px solid black;
    padding: 5px;
}

th {text-align: left;}
</style>
</head>
<body>

<?php
$q = intval($_GET['q']);


$db_hostname = 'localhost';
$db_database = 'lpmj_book';
$db_username = 'lpmj_bookUrmd5';
$db_password = '!9?.N378e@6)';

$con = mysqli_connect($db_hostname,$db_username,$db_password, $db_database);
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

//mysqli_select_db($con,$db_database);  //in W3 sch example.  this is unnecessary- already selected db. 
// last identifier in $con is the database on that host, would be 'lpmj_book' in above
// would be useful if you are accessing more than one db then would leave the 4th attribute off & use mysqli_select_db() method
$sql="SELECT * FROM family_guy WHERE id = '".$q."'";
$result = mysqli_query($con,$sql);

// note this has the html in the php file directly so it is not just sending the server data back to the client
// for it to do the UI presentation
echo "<table>
<tr>
<th>Firstname</th>
<th>Lastname</th>
<th>Age</th>
<th>Hometown</th>
<th>Job</th>
</tr>";
while($row = mysqli_fetch_array($result)) {
    echo "<tr>";
    echo "<td>" . $row['first_name'] . "</td>";
    echo "<td>" . $row['last_name'] . "</td>";
    echo "<td>" . $row['age'] . "</td>";
    echo "<td>" . $row['hometown'] . "</td>";
    echo "<td>" . $row['job'] . "</td>";
    echo "</tr>";
}
echo "</table>";
mysqli_close($con);
?>
</body>
</html>