<?php require_once('connections/mysql.php'); ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title><?php include('tool/titleweb.php'); ?></title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <?php include('tool/link.php'); ?>
</head>

<body>

  <!-- ======= Header ======= -->
  <header id="header" class="header d-flex align-items-center">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">


        <?php include('tool/title.php'); ?>
  

      <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
      <?php include('tool/menu.php'); ?>

    </div>
  </header><!-- End Header -->

  <!-- ======= Hero Section ======= -->
  <section id="hero" class="hero">

    <div class="info d-flex align-items-center">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6 text-center">
            <h2 data-aos="fade-down"><span>Welcome To <br>Suxin Furniture</span></h2>
            <p data-aos="fade-up">ร้านขายเฟอร์นิเจอร์เป็นแหล่งที่คุณสามารถค้นหาและเลือกซื้อเฟอร์นิเจอร์ที่หลากหลายและมีคุณภาพสูงได้อย่างง่ายดายและสะดวกสบาย</p>
            <!-- <a data-aos="fade-up" data-aos-delay="200" href="#get-started" class="btn-get-started">Get Started</a> -->
          </div>
        </div>
      </div>
    </div>

    <div id="hero-carousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
      <div class="carousel-item active" style="background-image: url(assets/img/hero-carousel/bg1.jpg)"></div>
      <div class="carousel-item" style="background-image: url(assets/img/hero-carousel/bg2.jpg)"></div>
      <div class="carousel-item" style="background-image: url(assets/img/hero-carousel/bg3.jpg)"></div>
      <div class="carousel-item" style="background-image: url(assets/img/hero-carousel/bg4.jpg)"></div>
      <div class="carousel-item" style="background-image: url(assets/img/hero-carousel/bg5.jpg)"></div>

      <a class="carousel-control-prev" href="#hero-carousel" role="button" data-bs-slide="prev">
        <span class="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
      </a>

      <a class="carousel-control-next" href="#hero-carousel" role="button" data-bs-slide="next">
        <span class="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
      </a>

    </div>

  </section><!-- End Hero Section -->

  <!-- Vendor JS Files -->
  <?php include('tool/footlink.php'); ?>

</body>

</html>