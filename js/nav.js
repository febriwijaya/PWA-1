document.addEventListener("DOMContentLoaded", function () {
  // Mengaktifkan sidebar navigasi
  let e = document.querySelectorAll(".sidenav");
  M.Sidenav.init(e);
  loadNav();

  function loadNav() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200)
          return;
        document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // Mendaftarkan event listener untuk setiap menu
        document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
          elm.addEventListener("click", function (event) {
            let sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  // Meload page
  let page = window.location.hash.substr(1);
  if (page == "") page = "beranda";
  loadPage(page);

  function loadPage(page) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        let content = document.querySelector("#body-content");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>Page Not Found</p>";
        } else {
          content.innerHTML = "<p>Upss.... halaman tidak bisa diakses!</p>";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
});