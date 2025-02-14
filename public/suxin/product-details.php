<?php 

require_once('connections/mysql.php'); 


$id=$_GET['id'];

$sql = "SELECT * FROM `tb_order`INNER JOIN tb_type ON tb_order.order_type= tb_type.type_id where tb_order.order_id='$id'";
$query = mysqli_query($Connection,$sql);
$result = mysqli_fetch_array($query);




?>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <?php include('tool/link.php'); ?>
  <title><?php include('tool/titleweb.php'); ?></title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  
</head>

<body>
<style>
  section {
    padding: 20px !important;
}

    .fixed-size {
    width: 200px; /* กำหนดขนาดความกว้างตามต้องการ */
    height: 500px; /* กำหนดขนาดความสูงตามต้องการ */
    object-fit: cover; /* ปรับภาพให้ครอบคลุมพื้นที่ที่กำหนด */
  }
  .overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgb(0 0 0 / 70%); /* พื้นหลังสีแดงใส */
    color: white;
    padding: 10px;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }
</style>
  <!-- ======= Header ======= -->
  <header id="header" class="header d-flex align-items-center">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
        <?php include('tool/title.php'); ?>
      <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
      <?php include('tool/menu.php'); ?>
    </div>
  </header>

  <main id="main">
    <!-- ======= Breadcrumbs ======= -->
    <div class="breadcrumbs d-flex align-items-center" style="background-image: url('assets/img/background.jpg');">
      <div class="container position-relative d-flex flex-column align-items-center" data-aos="fade">

        <!-- <h2>Project Details</h2> -->
        <ol>
          <li><a href="index">หน้าหลัก</a></li>
          <li><a href="product">สินค้า</a></li>
          <li><?php echo $result['order_code'] ?></li>
        </ol>

      </div>
    </div>


    <section id="project-details" class="project-details">
    <div class = "row"> 
   <div class = "col-md-4">
   <div class="position-relative">
        <div class="slides-1 portfolio-details-slider swiper">
            <div class="swiper-wrapper align-items-center">
          
              <div class="swiper-slide">
              <center>
                <a href="assets/img/product/<?php echo $result['order_img'] ?>"  data-gallery="portfolio-gallery-remodeling" class="glightbox preview-link">
              <img src="assets/img/product/<?php echo $result['order_img'] ?>" alt="" class="fixed-size">
              <?php if($result['order_status'] === "0") { ?>
                <div class="overlay">สินค้าหมด</div>
              <?php } ?>
            </a>
            </center>
              </div>

              <?php if($result['order_img2']){ ?>
              <div class="swiper-slide">
              <center>
              <a href="assets/img/product/<?php echo $result['order_img2'] ?>" data-gallery="portfolio-gallery-remodeling" class="glightbox preview-link">
                <img src="assets/img/product/<?php echo $result['order_img2'] ?>" alt="" class="fixed-size">
                <?php if($result['order_status'] === "0") { ?>
                <div class="overlay">สินค้าหมด</div>
              <?php } ?>
                </a>
              </center>
              </div>
             <?php } ?>

             <?php if($result['order_img3']){ ?>
              <div class="swiper-slide">
              <center>
              <a href="assets/img/product/<?php echo $result['order_img3'] ?>" data-gallery="portfolio-gallery-remodeling" class="glightbox preview-link">
              <img src="assets/img/product/<?php echo $result['order_img3'] ?>" alt="" class="fixed-size">
              <?php if($result['order_status'] === "0") { ?>
                <div class="overlay">สินค้าหมด</div>
              <?php } ?>
              </a>
            </center>
              </div>
              <?php } ?>
              <!-- <div class="swiper-slide">
                <img src="assets/img/product/<?php echo $result['order_vido'] ?>" alt="">
              </div> -->

            </div>
            <div class="swiper-pagination"></div>
          </div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>

        </div>
   </div> 
   <div class = "col-md-8">
   <div class="row justify-content-between gy-4 mt-4">

<div class="col-lg-8">
  <div class="portfolio-description">
        <!-- <h1 style="color:red; display:inline;">฿ <?php 
  if(!$result['order_shell']){
    echo number_format($result['order_price']);
  } else {
    echo number_format($result['order_shell']);
  }
?>
    </h1> 
    <h5 style="display:inline; padding-left: 10px"><?php 
  if($result['order_shell']){
    echo "<s>".number_format($result['order_price'])."</s>";
  }
?>
    </h5>-->
    <p>
      <?php echo $result['order_detail'] ?>
    </p>
  </div>
</div>

<div class="col-lg-3">
  <div class="portfolio-info">
    <h3>รายละเอียดสินค้า</h3>
    <ul>
      <li><strong>ขนาด (ยาว x กว้าง x สูง)</strong> <span><?php if($result['order_size']){ echo $result['order_size']; }else{ echo "-";} ?></span></li>
      <li><strong>ประเภทสินค้า</strong> <span><?php echo $result['type_name'] ?></span></li>
      <li><a href="assets/img/contact/line.jpg" data-gallery="admin"  class="btn-visit align-self-start glightbox preview-link">สั่งซื้อสินค้า</a></li>
    </ul>
  </div>
</div>

</div>
   </div>   <!--กำหนด column ใช้ 8 ช่อง--->
<div>
      <div class="container" data-aos="fade-up" data-aos-delay="100">





      </div>
    </section>
  </main><!-- End #main -->

  <!-- End Footer -->
  <?php include('tool/footer.php'); ?>
  <!-- Vendor JS Files -->
  <?php include('tool/footlink.php'); ?>

</body>

</html>