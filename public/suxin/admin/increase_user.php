<?php
require_once('../connections/mysql.php');

if ($_SESSION == NULL) {
  header("location:index");
  exit();
}



if (isset($_POST["save"])) {
  $sql = "INSERT INTO tb_user(user_username,user_password,user_name,user_surname,user_tel,user_level)
  VALUES ('".$_POST['user_username']."', '".md5($_POST['user_password'])."', '".$_POST['user_name']."', '".$_POST['user_surname']."', '".$_POST['user_tel']."', '".$_POST['user_level']."')";
  mysqli_query($condb,$sql);

  header("location:user");
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
          <h5 class="card-header">เพิ่มข้อมูลผู้ใช้</h5>
          <div class="card-body">
            <form action="" method="post">
              <div class="mb-3">
                <label class="form-label">Username <span  class="text-red">*</span></label>
                <input type="text" class="form-control" name="user_username" required/>
              </div>
              <div class="mb-3">
                <label class="form-label">Password <span  class="text-red">*</span></label>
                <input type="text" class="form-control" name="user_password" required/>
              </div>
              <div class="mb-3">
                <label class="form-label">ชื่อ <span  class="text-red">*</span></label>
                <input type="text" class="form-control" name="user_name" required/>
              </div>
              <div class="mb-3">
                <label class="form-label">นามสกุล <span  class="text-red">*</span></label>
                <input type="text" class="form-control" name="user_surname" required/>
              </div>
              <div class="mb-3">
                <label class="form-label">เบอร์โทร <span  class="text-red">*</span></label>
                <input type="text" class="form-control" name="user_tel" required/>
              </div>
              <div class="mb-3">
                <label class="form-label">ระดับผู้ใช้ <span  class="text-red">*</span></label>
                <select class="form-select" name="user_level" required>
                  <option value="member">member</option>
                  <option value="admin">admin</option>
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
