// Morrow page: the buttons in "On your phone" switch which screenshot the phone shows.
(function () {
  var tabs = document.querySelectorAll(".demo-tab");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var id = tab.getAttribute("data-tab");
      tabs.forEach(function (t) { t.setAttribute("aria-pressed", String(t === tab)); });
      document.querySelectorAll(".demo-screen").forEach(function (s) {
        s.hidden = s.getAttribute("data-screen") !== id;
      });
    });
  });
})();
