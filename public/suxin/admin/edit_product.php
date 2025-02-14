<?php
require_once('../connections/mysql.php');

if ($_SESSION == NULL) {
  header("location:index");
  exit();
}


$id=$_GET['id'];
$sql = "SELECT * FROM tb_order INNER JOIN tb_type ON tb_order.order_type= tb_type.type_id where order_id='$id'";
$query = mysqli_query($Connection,$sql);
$row=mysqli_fetch_array($query);

$check_submit = "";
$uploaded_files = array();
if (isset($_POST["save"])) {
  $target_dir = "../assets/img/product/"; // กำหนดโฟลเดอร์ที่จะบันทึกไฟล์

  // รายชื่อไฟล์ทั้งหมด
  $files = array("order_img", "order_img2", "order_img3");

  foreach ($files as $file) {
      $target_file = $target_dir . basename($_FILES[$file]["name"]);
      $uploadOk = 1;
      $fileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

      // ตรวจสอบว่าไฟล์ไม่ว่าง
      if(!empty($_FILES[$file]["tmp_name"])) {
          // ตรวจสอบประเภทไฟล์
          $check = getimagesize($_FILES[$file]["tmp_name"]);
          if($check !== false) {
              echo "ไฟล์ " . $_FILES[$file]["name"] . " เป็นรูปภาพ - " . $check["mime"] . ".<br>";
              $uploadOk = 1;
          } else {
            $check_submit = '<div class="alert alert-danger" role="alert">';
            $check_submit .= '<span><i class="bi bi-info-circle"></i> ขออภัย, ไฟล์  ' . $_FILES[$file]["name"] . ' ไม่ใช่รูปภาพ.<br></span>';
            $check_submit .= '</div>';
              $uploadOk = 0;
          }

          // ตรวจสอบว่ามีไฟล์อยู่แล้วหรือไม่
          if (file_exists($target_file)) {
            $check_submit = '<div class="alert alert-danger" role="alert">';
            $check_submit .= '<span><i class="bi bi-info-circle"></i> ขออภัย, ไฟล์  ' . $_FILES[$file]["name"] . ' มีอยู่ในระบบแล้ว.<br></span>';
            $check_submit .= '</div>';
              $uploadOk = 0;
          }

          // ตรวจสอบขนาดไฟล์
          if ($_FILES[$file]["size"] > 50000000) {
            $check_submit = '<div class="alert alert-danger" role="alert">';
            $check_submit .= '<span><i class="bi bi-info-circle"></i> ขออภัย, ไฟล์  ' . $_FILES[$file]["name"] . 'มีขนาดใหญ่เกินไป.<br></span>';
            $check_submit .= '</div>';
              $uploadOk = 0;
          }

          // อนุญาตเฉพาะไฟล์ JPG, JPEG, PNG & GIF
          if($fileType != "jpg" && $fileType != "png" && $fileType != "jpeg" && $fileType != "gif" ) {
            $check_submit = '<div class="alert alert-danger" role="alert">';
            $check_submit .= '<span><i class="bi bi-info-circle"></i> ขออภัย, อนุญาตเฉพาะไฟล์ JPG, JPEG, PNG & GIF เท่านั้นสำหรับไฟล์  ' . $_FILES[$file]["name"] . '.<br></span>';
            $check_submit .= '</div>';
              $uploadOk = 0;
          }
  
          // ตรวจสอบว่า $uploadOk ไม่เท่ากับ 0 ไม่ใช่หรือป่าว?
          if ($uploadOk == 0) {
            $check_submit = '<div class="alert alert-danger" role="alert">';
            $check_submit .= '<span><i class="bi bi-info-circle"></i> ขออภัย, ไม่สามารถอัพโหลดไฟล์ ' . $_FILES[$file]["name"] . '.<br></span>';
            $check_submit .= '</div>';
              echo "ขออภัย, ไม่สามารถอัพโหลดไฟล์ " . $_FILES[$file]["name"] . ".<br>";
          } else {
              if (move_uploaded_file($_FILES[$file]["tmp_name"], $target_file)) {
                  // echo "ไฟล์ " . htmlspecialchars( basename( $_FILES[$file]["name"])). " ได้รับการอัพโหลดแล้วและเก็บไว้ในโฟลเดอร์ '$target_dir'.<br>";

                   $uploaded_files[] = basename($_FILES[$file]["name"]);

              } else {
                  echo "ขออภัย, มีข้อผิดพลาดในการอัพโหลดไฟล์ " . $_FILES[$file]["name"] . ".<br>";
              }
          }
          if(count($uploaded_files) >= 1) {
       
            $sql = "UPDATE  tb_order set order_code = '".$_POST['order_code']."',order_detail = '".$_POST['order_detail']."',order_size = '".$_POST['order_size']."',order_price = '".$_POST['order_price']."',order_shell = '".$_POST['order_shell']."',order_type = '".$_POST['order_type']."',order_img = '".$uploaded_files[0]."',order_img2 = '".$uploaded_files[1]."',order_img3 = '".$uploaded_files[2]."',order_status = '".$_POST['order_status']."' where order_id = $id";
            mysqli_query($condb,$sql);
              header("location:product.php");
              exit();

        }


      }
      else{
        
  $sql = "UPDATE  tb_order set order_code = '".$_POST['order_code']."',order_detail = '".$_POST['order_detail']."',order_size = '".$_POST['order_size']."',order_price = '".$_POST['order_price']."',order_shell = '".$_POST['order_shell']."',order_type = '".$_POST['order_type']."',order_status = '".$_POST['order_status']."' where order_id = $id";
  mysqli_query($condb,$sql);

  header("location:product.php");
  exit();
      }
  }

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
  <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/icons/bootstrap-icons.css">
    <link rel="stylesheet" href="assets/dashboard.css">
    <?php include('icontitle.php'); ?>
</head>
<body class="default">
 <?php include 'include/header.php'; ?> 
 <?php include 'include/sidebarMenu.php'; ?> 
 <div class="row justify-content-md-center">
            <div class="col-md-auto"><?php echo $check_submit; ?></div>
        </div>
  <div class="container-fluid">
    <div class="row justify-content-md-center">
      <div class="col-md-5 mb-4">
        <div class="card border-dark mt-2">
          <h5 class="card-header">เพิ่มข้อมูลสินค้า</h5>
          <div class="card-body">
            <form action="" method="post" enctype="multipart/form-data">
              <!-- <div class="mb-3">
                <label class="form-label">ชื่อ <span  class="text-red">*</span></label>
                <input type="text" class="form-control" name="order_name" value="<?php echo $row['order_name'] ?>" required>
              </div> -->
              <div class="mb-3">
                <label class="form-label">รหัส <span  class="text-red">*</span></label>
                <input type="text" class="form-control" name="order_code" value="<?php echo $row['order_code'] ?>" required>
              </div>
              <div class="mb-3">
                <label class="form-label">รายละเอียด</label>
                <textarea class="form-control" name="order_detail" rows="10" ><?php echo $row['order_detail'] ?></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">ขนาด</label>
                <input type="text" class="form-control" name="order_size" value="<?php echo $row['order_size'] ?>"/>
              </div>
              <div class="mb-3">
                <label class="form-label">ราคา</label>
                <input type="text" class="form-control" name="order_price"  value="<?php echo $row['order_price'] ?>"/>
              </div>
              <div class="mb-3">
                <label class="form-label">ราคาลด</label>
                <input type="text" class="form-control" name="order_shell"  value="<?php echo $row['order_shell'] ?>"/>
              </div>
              <div class="mb-3">
                <label class="form-label">ประเภท <span  class="text-red">*</span></label>
                <select class="form-select" name="order_type" required>
    <?php
    $sql = "SELECT * FROM tb_type ORDER BY type_id ASC";
    $query = mysqli_query($Connection, $sql);
    $current_type_id = $row['type_id']; // สมมติว่าค่าปัจจุบันมาจากตัวแปรนี้

    foreach ($query as $results) {
        if ($results['type_id'] == $current_type_id) {
            echo '<option value="' . $results['type_id'] . '" selected>' . $results['type_name'] . '</option>';
        } else {
            echo '<option value="' . $results['type_id'] . '">' . $results['type_name'] . '</option>';
        }
    }
    ?>
</select>

              </div>
              <div class="mb-3">
                <label class="form-label">รูปภาพ 1 (JPG, JPEG, PNG & GIF)</label>
                <input type="file" class="form-control" name="order_img" id="order_img">
              </div>
              <div class="mb-3">
                <label class="form-label">รูปภาพ 2 (JPG, JPEG, PNG & GIF)</label>
                <input type="file" class="form-control" name="order_img2" id="order_img2">
              </div>
              <div class="mb-3">
                <label class="form-label">รูปภาพ 3 (JPG, JPEG, PNG & GIF)</label>
                <input type="file" class="form-control" name="order_img3" id="order_img3">
              </div>
              <!-- <div class="mb-3">
                <label class="form-label">วีดีโอ</label>
                <input type="text" class="form-control" name="order_vdio"/>
              </div> -->
              <div class="mb-3">
                <label class="form-label">สถานะ <span  class="text-red">*</span></label>
                <select class="form-select" name="order_status" required>
    <option value="<?php echo $row["order_status"];?>"><?php if($row["order_status"] == "0"){ echo "สินค้าหมด";}else{ echo "มีสินค้า";}?></option>
    <?php if($row["order_status"] != "0") { ?><option value="0">สินค้าหมด</option><?php } ?>
    <?php if($row["order_status"] != "1") { ?><option value="1">มีสินค้า</option><?php } ?>
</select>

              </div>
              <button type="submit" class="btn btn-success" name="save" onClick="return confirm('คุณต้องการที่จะบันทึกใช่หรือไม่ ?');"><i class="bi bi-floppy-fill"></i></button>
              <a href="javascript:history.back()" class="btn btn-warning"><i class="bi bi-arrow-return-left"></i></a>
              <a href="delete_product?id=<?php echo $id;?>" class="btn btn-danger" onClick="return confirm('คุณต้องการที่จะลบใช่หรือไม่ ?');"><i class="bi bi-trash3-fill"></i></a>
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
