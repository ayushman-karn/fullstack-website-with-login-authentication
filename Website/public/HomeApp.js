//frontend js for the home page
{
  window.addEventListener("load", (event) => {
    document.getElementById("head2").style.transform = "translateY(-130%)";
  });

  const nav_lines = document.querySelector(".nav-lines");

  let count = 0;
  nav_lines.addEventListener("click", func);

  function func(event) {
    ++count;
    if (count % 2) {
      document.getElementById("nav-div").style.width = "30rem";
      document.getElementById("nav-div").style.border = "0.4rem solid #c2e9fb";
      window.onscroll = function () {
        window.scrollTo(0, 0);
      };
    } else {
      document.getElementById("nav-div").style.width = "0";
      document.getElementById("nav-div").style.border = "none";
      window.onscroll = function () {};
    }
  }
}
