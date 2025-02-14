<?php
require_once('../connections/mysql.php');

if ($_SESSION == NULL) {
  header("location:index");
  exit();
}



if (isset($_POST["save"])) {
  $sql = "INSERT INTO tb_type(type_name,type_status)
  VALUES ('".$_POST['type_name']."','".$_POST['type_status']."')";
  mysqli_query($condb,$sql);

  header("location:type");
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
<?php include 'include/sidebarMenu.php'; ?>
  <div class="container-fluid">
    <div class="row justify-content-md-center">
      <div class="col-md-5 mb-4">
        <div class="card border-dark mt-2">
          <h5 class="card-header">เพิ่มข้อมูลปรเเภทสินค้า</h5>
          <div class="card-body">
            <form action="" method="post">
              <div class="mb-3">
                <label class="form-label">ชื่อประเภทสินค้า <span  class="text-red">*</span></label>
                <input type="text" class="form-control" name="type_name" required/>
              </div>
              <div class="mb-3">
                <label class="form-label">สถานะประเภทสินค้า <span  class="text-red">*</span></label>
                <select class="form-select" name="type_status" required>
                <option value="">-กรุณาเลือก-</option>
                  <option value="1">พร้อมใช้งาน</option>
                  <option value="0">ปิดการใช้งาน</option>
                </select>
              </div>
              <button type="submit" class="btn btn-success" name="save" onClick="return confirm('คุณต้องการที่จะบันทึกใช่หรือไม่ ?');"><i class="bi bi-floppy-fill"></i></button>
              <a href="javascript:history.back()" class="btn btn-warning"><i class="bi bi-arrow-return-left"></i></a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="assets/js/bootstrap.bundle.min.js"></script>
  <?php mysqli_close($condb);
  ?>
</body>
</html>
