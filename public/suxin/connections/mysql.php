<?php
  $hostname = "localhost";
  $username = "root";
  $password = "";
  $database = "suxinfurniture";
  $Connection = mysqli_connect($hostname, $username, $password, $database);
  $conn2 = mysqli_connect($hostname, $username , $password, $database);
  if (!$conn2) {
      die("Connection failed: " . mysqli_connect_error());
  }
  $condb = mysqli_connect($hostname, $username , $password, $database);
  
  

  //ตั้งค่าชุดอักขระไคลเอนต์เริ่มต้น
  mysqli_set_charset($Connection, "utf8");

  //เปิดใช้งาน SESSION
  session_start();

  //ตั้งค่า timezone ในประเทศไทย
  date_default_timezone_set('Asia/Bangkok');

?>
