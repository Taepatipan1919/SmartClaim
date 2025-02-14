<?php
require_once('../connections/mysql.php');

if ($_SESSION == NULL) {
  header("location:index");
  exit();
}

$id=$_GET['id'];
//echo $id;
$query ="SELECT * FROM tb_type WHERE type_id='$id'";
$result = mysqli_query($condb,$query);
$row=mysqli_fetch_array($result);

if (isset($_POST["save"])) {
  $sql_2 = "UPDATE tb_type SET type_name = '".$_POST["type_name"]."', type_status = '".$_POST["type_status"]."' WHERE type_id = '$id'";
  $query_2 = mysqli_query($condb,$sql_2);
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
  <div class="container-fluid">
  <?php include 'include/sidebarMenu.php'; ?>
    <div class="row justify-content-md-center">
      <div class="col-md-5 mb-4">
        <div class="card border-dark mt-2">
          <h5 class="card-header">แก้ไขข้อมูลประเภทสินค้า ID : <?php echo $row['type_id'];?></h5>
          <div class="card-body">
            <form action="" method="post">
              <div class="mb-3">
                <label class="form-label">ชื่อ <span  class="text-red">*</span></label>
                <input type="text" class="form-control" name="type_name" value="<?php echo $row['type_name'];?>" required/>
              </div>
              <div class="mb-3">
                <label class="form-label">สถานะประเภท <span  class="text-red">*</span></label>
                <select class="form-select" name="type_status" required>
    <option value="<?php echo $row["type_status"];?>"><?php if($row["type_status"] == "0"){ echo "ปิดการใช้งาน";}else{ echo "พร้อมใช้งาน";}?></option>
    <?php if($row["type_status"] == "0") { ?><option value="1">พร้อมใช้งาน</option><?php }else{ ?><option value="0">ปิดการใช้งาน</option><?php } ?>
    <!-- <?php if($row["type_status"] == "0") { ?><option value="0">ปิดการใช้งาน</option><?php } ?> -->
</select>

              </div>
              <button type="submit" class="btn btn-success" name="save" onClick="return confirm('คุณต้องการที่จะบันทึกใช่หรือไม่ ?');"><i class="bi bi-floppy-fill"></i></button>
              <a href="javascript:history.back()" class="btn btn-warning"><i class="bi bi-arrow-return-left"></i></a>
              <a href="delete_type?id=<?php echo $row['type_id'];?>" class="btn btn-danger" onClick="return confirm('คุณต้องการที่จะลบใช่หรือไม่ ?');"><i class="bi bi-trash3-fill"></i></a>
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
