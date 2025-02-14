<?php 
require_once('connections/mysql.php'); 


$sql = "SELECT * FROM tb_type order  by type_id ASC";
$query = mysqli_query($Connection,$sql);




?>
<!-- <style>
 body { 
    margin: 0 !important;;  
    font-family: Arial, Helvetica, sans-serif !important;; } 
    .navbar {
         overflow: hidden !important;;
          background-color: #333 !important;; 
          position: sticky !important;; 
          top: 0; 
          width: 100% !important;; } 
          .navbar a { 
            float: left !important;;
             display: block !important;; 
             color: #f2f2f2 !important;; 
             text-align: center !important;; 
             padding: 14px 20px !important;; 
             text-decoration: none !important;; } 
             .navbar a:hover { 
                background-color: #ddd !important;; 
                color: black !important;; } 
                .content { 
                    padding: 16px !important;;
                     } 
                     </style> -->

<nav id="navbar" class="navbar ">
<!-- <nav class="navbar"> -->
    <ul>
        <li><a href="index">หน้าหลัก</a></li>
        <li class="dropdown"><a href="product"><span>สินค้า</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
            <ul>
            <?php  while($row=mysqli_fetch_array($query)) { ?>
                <li><a href="product"><?php echo $row['type_name']; ?></a></li>
                <?php } ?>
            </ul>
        </li>
        <li><a href="setroom">SetRoom</a></li>
        <li><a href="setroom">ผลงาน</a></li>
        <li><a href="contract">ติดต่อเรา</a></li>
    </ul>
</nav>