// Portfolio interactions: tab switching (hash-linkable), collapsible
// experience cards, footer year.
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  var panels = Array.prototype.slice.call(document.querySelectorAll(".panel"));

  function activate(name, push) {
    var found = false;
    tabs.forEach(function (t) {
      var on = t.getAttribute("data-tab") === name;
      t.classList.toggle("active", on);
      if (on) found = true;
    });
    if (!found) return;
    panels.forEach(function (p) { p.classList.toggle("active", p.id === name); });
    if (push && window.history && history.replaceState) {
      history.replaceState(null, "", "#" + name);
    }
    var main = document.querySelector(".main");
    if (main && push) window.scrollTo({ top: 0, behavior: "auto" });
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function () { activate(t.getAttribute("data-tab"), true); });
  });

  // Open the tab named in the URL hash (e.g. #projects), else default.
  var initial = (location.hash || "").replace("#", "");
  if (initial) activate(initial, false);
  window.addEventListener("hashchange", function () {
    activate((location.hash || "").replace("#", ""), false);
  });

  // Collapsible experience cards
  document.querySelectorAll(".xp-head").forEach(function (head) {
    head.addEventListener("click", function () {
      head.parentElement.classList.toggle("open");
    });
  });

  // Footer year
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
