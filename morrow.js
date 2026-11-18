// Morrow page: the phone preview buttons, and the picture viewer for "A closer look".
(function () {
  // "On your phone": the buttons switch which screenshot the phone shows
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

  // "A closer look": a picture opens on top of the page; tap anywhere, press Esc or X to close
  var viewer = null;
  var lastLink = null;

  function close() {
    if (!viewer) return;
    viewer.remove();
    viewer = null;
    document.body.classList.remove("viewer-open");
    document.removeEventListener("keydown", onKey);
    if (lastLink) lastLink.focus();
  }

  function onKey(e) {
    if (e.key === "Escape") close();
  }

  function open(link) {
    var img = link.querySelector("img");
    lastLink = link;
    viewer = document.createElement("div");
    viewer.className = "viewer";
    viewer.setAttribute("role", "dialog");
    viewer.setAttribute("aria-modal", "true");
    viewer.setAttribute("aria-label", img ? img.alt : "Picture");
    viewer.innerHTML =
      '<button type="button" class="viewer-close" aria-label="Close">×</button>' +
      '<img alt="">' +
      '<span class="viewer-hint">Tap anywhere to close</span>';
    var big = viewer.querySelector("img");
    big.src = link.getAttribute("href");
    big.alt = img ? img.alt : "";
    viewer.addEventListener("click", close);
    document.body.appendChild(viewer);
    document.body.classList.add("viewer-open");
    document.addEventListener("keydown", onKey);
    viewer.querySelector(".viewer-close").focus();
  }

  document.querySelectorAll("#closer-look a").forEach(function (link) {
    link.addEventListener("click", function (e) {
      // Ctrl/Cmd-click still opens the picture in a new tab
      if (e.ctrlKey || e.metaKey || e.shiftKey) return;
      e.preventDefault();
      open(link);
    });
  });
})();
