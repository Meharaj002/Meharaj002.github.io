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

  // Email links (sidebar + Contact button): open the mail client via mailto AND
  // copy the address with visible feedback, so they always do something even
  // when no default mail app is configured.
  function wireEmailCopy(el, label) {
    if (!el || !label) return;
    el.addEventListener("click", function () {
      var addr = el.getAttribute("data-email");
      if (!addr || !navigator.clipboard || !navigator.clipboard.writeText) return;
      navigator.clipboard.writeText(addr).then(function () {
        if (label.dataset.busy) return;
        label.dataset.busy = "1";
        var orig = label.textContent;
        label.textContent = "Copied ✓";
        setTimeout(function () { label.textContent = orig; delete label.dataset.busy; }, 1500);
      }).catch(function () {});
    });
  }
  var emailBtn = document.getElementById("email-btn");
  wireEmailCopy(emailBtn, emailBtn);
  var emailSide = document.getElementById("email-side");
  wireEmailCopy(emailSide, emailSide && emailSide.querySelector(".sl-lbl"));

  // Footer year
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
