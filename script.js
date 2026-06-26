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
    head.addEventListener("click", function (e) {
      if (e.target.closest("a")) return; // let company-name links open normally
      head.parentElement.classList.toggle("open");
    });
  });

  // "Email me" — opens the mail client (mailto) AND copies the address with
  // feedback, so it always does something even without a default mail app.
  var emailBtn = document.getElementById("email-btn");
  if (emailBtn) {
    emailBtn.addEventListener("click", function () {
      var addr = emailBtn.getAttribute("data-email");
      if (addr && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(addr).then(function () {
          if (emailBtn.dataset.busy) return;
          emailBtn.dataset.busy = "1";
          var orig = emailBtn.textContent;
          emailBtn.textContent = "Email copied ✓";
          setTimeout(function () { emailBtn.textContent = orig; delete emailBtn.dataset.busy; }, 1600);
        }).catch(function () {});
      }
    });
  }

  // Footer year
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
