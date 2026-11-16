// Morrow page: switches the phone preview in "See it in action".
(function () {
  var titles = { calendar: "Today", clients: "Clients", sales: "Takings" };
  var buttons = { calendar: "NEW BOOKING", clients: "ADD CLIENT", sales: "PRINT DAY SUMMARY" };
  var tabs = document.querySelectorAll(".demo-tab");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var id = tab.getAttribute("data-tab");
      tabs.forEach(function (t) { t.setAttribute("aria-pressed", String(t === tab)); });
      document.querySelectorAll(".demo-screen").forEach(function (s) {
        s.style.display = s.getAttribute("data-screen") === id ? "flex" : "none";
      });
      document.getElementById("demo-title").textContent = titles[id];
      document.getElementById("demo-button").textContent = buttons[id];
    });
  });
})();
