<?php
require_once('connections/mysql.php'); 





$sql = "SELECT * FROM `tb_contract`";
$query = mysqli_query($Connection,$sql);
$result = mysqli_fetch_array($query);
?>



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

  <main id="main">

    <!-- ======= Breadcrumbs ======= -->
    <div class="breadcrumbs d-flex align-items-center" style="background-image: url('assets/img/background.jpg');">
      <div class="container position-relative d-flex flex-column align-items-center" data-aos="fade">

        <h2>ติดต่อเรา</h2>
        <ol>
          <li><a href="index.html">หน้าหลัก</a></li>
          <li>ติดต่อเรา</li>
        </ol>

      </div>
    </div><!-- End Breadcrumbs -->

    <!-- ======= Contact Section ======= -->
    <section id="contact" class="contact">
      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row gy-4">
          <div class="col-lg-6">
            <div class="info-item  d-flex flex-column justify-content-center align-items-center">
              <i class="bi bi-map"></i>
              <h3>ที่อยู่</h3>
              <p><?php echo $result['con_address'] ?></p>

            </div>
          </div><!-- End Info Item -->

          <div class="col-lg-3 col-md-6">
            <div class="info-item d-flex flex-column justify-content-center align-items-center">
            <i class="bi bi-line"></i>
              <h3>ID Line</h3>
              <p><?php echo $result['con_line'] ?></p>
            </div>
          </div><!-- End Info Item -->

          <div class="col-lg-3 col-md-6">
            <div class="info-item  d-flex flex-column justify-content-center align-items-center">
              <i class="bi bi-telephone"></i>
              <h3>เบอร์โทร</h3>
              <p><?php echo $result['con_tel'] ?></p>
            </div>
          </div><!-- End Info Item -->

        </div>

        <!-- <div class="row gy-2 mt-1"> -->

          <div class="mt-3">
            <center>
          <iframe src="<?php echo $result['con_linkaddress'] ?>" width="700" height="500" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe><section id="contact" class="contact">
            </center>
          </div>

      <!-- <div class="col-lg-6"> -->
           <!--      <form action="forms/contact.php" method="post" role="form" class="php-email-form">
              <div class="row gy-4">
                <div class="col-lg-6 form-group">
                  <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" required>
                </div>
                <div class="col-lg-6 form-group">
                  <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" required>
                </div>
              </div>
              <div class="form-group">
                <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" required>
              </div>
              <div class="form-group">
                <textarea class="form-control" name="message" rows="5" placeholder="Message" required></textarea>
              </div>
              <div class="my-3">
                <div class="loading">Loading</div>
                <div class="error-message"></div>
                <div class="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div class="text-center"><button type="submit">Send Message</button></div>
            </form>
          </div> -->

        <!-- </div> -->

      </div>
    </section><!-- End Contact Section -->

  </main><!-- End #main -->
  <?php include('tool/footer.php'); ?>
  <!-- Vendor JS Files -->
  <?php include('tool/footlink.php'); ?>

</body>

</html>