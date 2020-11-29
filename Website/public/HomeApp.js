//frontend js for the home page
{
  const nav_div = document.getElementById("nav-div");
  window.addEventListener("load", (event) => {
    document.getElementById("head2").style.transform = "translateY(-130%)";
    nav_div.style.width = "0rem";
  });

  const page_content = document.querySelector(".page-content");
  page_content.addEventListener("click", () => {
    nav_div.style.width = "0rem";
    nav_div.style.border = "none";
    window.onscroll = function () {};
    page_content.style.filter = "blur(0)";
  });

  const nav_lines = document.querySelector(".nav-lines");

  nav_lines.addEventListener("click", func);

  function func(event) {
    if (nav_div.style.width == "0rem") {
      nav_div.style.width = "30rem";
      nav_div.style.border = "0.4rem solid #c2e9fb";
      window.onscroll = function () {
        window.scrollTo(0, 0);
      };
      page_content.style.filter = "blur(3px)";
    } else {
      nav_div.style.width = "0rem";
      nav_div.style.border = "none";
      window.onscroll = function () {};
      page_content.style.filter = "blur(0)";
    }
  }
}
