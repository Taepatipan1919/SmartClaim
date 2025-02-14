<?php
require_once('../connections/mysql.php');


$check_submit = "";
$user_username = "";

if (isset($_POST["submit"])) {
  $sql = "SELECT * FROM tb_user WHERE user_username = '".mysqli_real_escape_string($Connection,$_POST['user_username'])."' and user_password = '".mysqli_real_escape_string($Connection,md5($_POST['user_password']))."'";
  $query = mysqli_query($Connection,$sql);
  $result = mysqli_fetch_array($query,MYSQLI_ASSOC);

  if (!$result) {
    $user_username = $_POST['user_username'];
    $check_submit = '<div class="alert alert-danger" role="alert">';
    $check_submit .= '<span><i class="bi bi-info-circle"></i> ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบใหม่อีกครั้ง</span>';
    $check_submit .= '</div>';
  }else{
    $_SESSION["user_username"] = $result["user_username"];
    $_SESSION["user_level"] = $result["user_level"];

    if ($_SESSION["user_level"] == 'admin') {
      header("location:indexadmin");
      exit();
    }
    // else{
    //   header("location:indexadmin");
    //   exit();
    // }
  }
}
?>

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

</head>
<style>
body {
    background-image: url('../assets/img/footer-bg3.jpg'); /* ใส่ URL รูปภาพที่ถูกต้อง */ 
    background-size: cover ;
    background-repeat: no-repeat ;
    background-attachment: fixed ;
    background-position: center ;
    margin: 0;
    padding: 0;
}
.border-dark{
  background: rgba(255, 255, 255, 0.8);
}
.container-fluid {

    padding-top: 20px ;
    min-height: 100vh ; /* Make sure it covers full screen height */
}
</style>
<body>
<div class="container-fluid">

    <div class="row justify-content-md-center">
        <div class="col-md-5 mb-4">
            <div class="card border-dark mt-2">
                <div class="card-body">
                    <div class="row justify-content-md-center mb-2">
                        <div class="col col-lg-6">
                            <img src="../assets/img/suxinlogo.png" style="width: 100%;">
                        </div>
                    </div>
                    <div class="col-md-12 mt-4">
        <div class="row justify-content-md-center">
            <div class="col-md-auto"><?php echo $check_submit; ?></div>
        </div>
    </div>
                    <form method="post">
                        <div class="mb-3">
                            <label class="form-label">Username</label>
                            <input type="text" class="form-control" name="user_username" value="<?php echo $user_username;?>" placeholder="Enter Username" required/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-control" name="user_password" placeholder="Enter Password" required/>
                        </div>
                        <button type="submit" class="btn btn-success" name="submit">เข้าสู่ระบบ</button>
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