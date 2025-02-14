<html>
<head>
<title>delete</title>
<?php include('icontitle.php'); ?>
</head>
<body>
<?php
	ini_set('display_errors', 1);
	error_reporting(~0);
    require_once('../connections/mysql.php');


	$strCustomerID = $_GET["id"];
	$sql = "DELETE FROM tb_type
			WHERE type_id = '".$strCustomerID."' ";

	$query = mysqli_query($conn2,$sql);

	if(mysqli_affected_rows($conn2)) {
        header("location:type");
        exit();
	}

	mysqli_close($conn2);
?>
</body>
</html>