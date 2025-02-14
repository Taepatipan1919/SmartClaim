<?php
require_once('../connections/mysql.php');

if ($_SESSION == NULL) {
  header("location:index");
  exit();
}

$id=$_GET['id'];
//echo $id;
$query ="SELECT * FROM tb_user WHERE user_id='$id'";
$result = mysqli_query($condb,$query);
$row=mysqli_fetch_array($result);
$raw_password = $row['user_password'];
$hashed_password = md5($raw_password);

if (isset($_POST["save"])) {
  $sql_2 = "UPDATE tb_user SET user_name = '".$_POST["user_name"]."' , user_surname = '".$_POST["user_surname"]."' , user_tel = '".$_POST["tel"]."' , user_level = '".$_POST["user_level"]."'  WHERE user_id = '$id'";
  $query_2 = mysqli_query($condb,$sql_2);
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
  <div class="container-fluid">
  <?php include 'include/sidebarMenu.php'; ?>
    <div class="row justify-content-md-center">
      <div class="col-md-5 mb-4">
        <div class="card border-dark mt-2">
          <h5 class="card-header">แก้ไขข้อมูลผู้ใช้ ID : <?php echo $row['user_username'];?></h5>
          <div class="card-body">
            <form action="" method="post">
              <div class="mb-3">
                <label class="form-label">Username</label>
                <input type="text" class="form-control" value="<?php echo $row['user_username'];?>" disabled/>
              </div>
              <div class="mb-3">
                <label class="form-label">ชื่อ <span  class="text-red">*</span></label>
                <input type="text" class="form-control" name="user_name" value="<?php echo $row['user_name'];?>" required/>
              </div>
              <div class="mb-3">
                <label class="form-label">นามสกุล <span  class="text-red">*</span></label>
                <input type="text" class="form-control" name="user_surname" value="<?php echo $row['user_surname'];?>" required/>
              </div>
              <div class="mb-3">
                <label class="form-label">เบอร์โทร <span  class="text-red">*</span></label>
                <input type="text" class="form-control" name="tel" value="<?php echo $row['user_tel'];?>" required/>
              </div>
              <div class="mb-3">
                <label class="form-label">ระดับผู้ใช้ <span  class="text-red">*</span></label>
                <select class="form-select" name="user_level" value="<?php echo $row['user_level'];?>" required>
                <option value="">-กรุณาเลือก-</option>
                  <option value="member" <?php if ($row['user_level'] == 'member') {echo " selected";} ?>>member</option>
                  <option value="admin" <?php if ($row['user_level'] == 'admin') {echo " selected";} ?>>admin</option>
                </select>
              </div>
              <button type="submit" class="btn btn-success" name="save" onClick="return confirm('คุณต้องการที่จะบันทึกใช่หรือไม่ ?');"><i class="bi bi-floppy-fill"></i></button>
              <a href="javascript:history.back()" class="btn btn-warning"><i class="bi bi-arrow-return-left"></i></a>
              <a href="delete_user?id=<?php echo $row['user_id'];?>" class="btn btn-danger" onClick="return confirm('คุณต้องการที่จะลบใช่หรือไม่ ?');"><i class="bi bi-trash3-fill"></i></a>
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
