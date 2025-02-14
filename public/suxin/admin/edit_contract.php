<?php
require_once('../connections/mysql.php');

if ($_SESSION == NULL) {
  header("location:index");
  exit();
}


$query ="SELECT * FROM tb_contract";
$result = mysqli_query($condb,$query);
$row=mysqli_fetch_array($result);


if (isset($_POST["save"])) {
  $sql_2 = "UPDATE tb_contract SET con_address = '".$_POST["con_address"]."' , con_line = '".$_POST["con_line"]."' , con_tel = '".$_POST["con_tel"]."' , con_linkaddress = '".$_POST["con_linkaddress"]."' ";
  $query_2 = mysqli_query($condb,$sql_2);
  header("location:edit_contract");
  exit();
} 
?>
<style>
    .text-red{
    color: red;
  }
  .btn-warning {
    color: #ffffff !important;
  }
</style>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title><?php include('../tool/titleweb.php'); ?></title>
  <?php include('../tool/link.php'); ?>
  <?php include('icontitle.php'); ?>
  <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/icons/bootstrap-icons.css">
    <link rel="stylesheet" href="assets/dashboard.css">

    
</head>
<body class="default">
<?php include 'include/header.php'; ?>
  <div class="container-fluid">
  <?php include 'include/sidebarMenu.php'; ?>
    <div class="row justify-content-md-center">
      <div class="col-md-5 mb-4">
        <div class="card border-dark mt-2">
          <h5 class="card-header">แก้ไขข้อมูลติดต่อเรา</h5>
          <div class="card-body">
            <form action="" method="post">
              <div class="mb-3">
                <label class="form-label">ที่อยู่</label>
                <textarea class="form-control" name="con_address" rows="10" ><?php echo $row['con_address'] ?></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">ID Line</label>
                <input type="text" class="form-control" name="con_line" value="<?php echo $row['con_line'];?>"/>
              </div>
              <div class="mb-3">
                <label class="form-label">เบอร์โทร</label>
                <input type="text" class="form-control" name="con_tel" value="<?php echo $row['con_tel'];?>" />
              </div>
              <div class="mb-3">
                <label class="form-label">Link Address</label>
                <input type="text" class="form-control" name="con_linkaddress" value="<?php echo $row['con_linkaddress'];?>" />
              </div>
              <button type="submit" class="btn btn-success" name="save" onClick="return confirm('คุณต้องการที่จะบันทึกใช่หรือไม่ ?');"><i class="bi bi-floppy-fill"></i></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="assets/js/bootstrap.bundle.min.js"></script>
  <?php mysqli_close($Connection);?>
</body>
</html>
