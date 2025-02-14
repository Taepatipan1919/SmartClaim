
<style>
  .bg-dark {
    background-color: #17519e !important;
  }
  .navbar-dark .navbar-nav .nav-link {
    color: rgb(255 255 255);
  }
  .text {
    color: white;
    margin-left: auto;
}
</style>
<script>
function toggleOptions() {
  var options = document.getElementById('user-options');
  options.style.display = options.style.display === "none" ? "block" : "none";
}
</script>


<header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
  <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="indexadmin">ระบบหลังบ้าน</a>
  <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <h5 class="text">User : <?php echo $_SESSION["user_username"]; ?></h5>
  <ul class="navbar-nav px-3">
    <li class="nav-item text-nowrap">
      <a class="nav-link" href="logout"><i class="bi bi-box-arrow-right"></i></a>
    </li>
  </ul>
</header>
