<?php
require_once('../connections/mysql.php');

if ($_SESSION == NULL) {
  header("location:index");
  exit();
}

$num = 1;
$sql = "SELECT * FROM tb_type ";
$query = mysqli_query($Connection,$sql);
?>
<style>
  #myTable td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  #myTable tr:nth-child(even){background-color: #f2f2f2;}

  #myTable tr:hover {background-color: #ddd;}

  #myTable th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4fcbe9;
    color: white;
  }
</style>
<!doctype html>
<html lang="en">
  <head>
    
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/icons/bootstrap-icons.css">
    <link rel="stylesheet" href="assets/dashboard.css">
    <title><?php include('../tool/titleweb.php'); ?></title>
  <?php include('../tool/link.php'); ?>
  <?php include('icontitle.php'); ?>
  </head>
  <body>
    <?php include 'include/header.php'; ?>
    <?php include 'include/sidebarMenu.php'; ?>
    <div class="container-fluid">
        <main class="col-md-9 ms-sm-auto col-lg-11 px-md-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">ข้อมูลประเภทสินค้า</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <a href="increase_type" class="btn btn-success"><i class="bi bi-plus-circle"></i></a>
            </div>
          </div>
          <table class="table table-bordered table-hover" id="myTable"> 
            <thead>
              <tr class="table-info">
                <th scope="col" width="5%">ลำดับ</th>
                <th scope="col">ชื่อ</th>
                <th scope="col" width="10%">สถานะ</th>
                <th scope="col" width="5%"></th>
              </tr>
            </thead>
            <tbody>
              <?php
              while ($result = mysqli_fetch_array($query)) {
                ?>
                <tr>
                  <td><?php echo $num++; ?></td>
                  <td><?php echo $result['type_name']; ?></td>
                  <td><?php if ($result['type_status'] == "1") {echo "พร้อมใช้งาน";}else{echo "ปิดการใช้งาน";} ?></td>
                  <td>
                    <center><a href="edit_type.php?id=<?php echo $result['type_id'];?>" class="btn btn-success btn-sm" ><i class="bi bi-pencil-square"></i></a></center>
                  </td>
                </tr>
                <?php
              }
              ?>
            </tbody>
          </table>
        </main>
   
    </div>
    <script>
  $(document).ready( function () {
    $('#myTable').DataTable();
  });
</script>
    <?php mysqli_close($Connection); ?>
  </body>
</html>
