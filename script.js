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
  // copy the address. Feedback is shown as a floating toast so it never shifts
  // the layout (changing the link text would reflow the row).
  var toastTimer;
  function showToast(msg) {
    var t = document.getElementById("toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      t.className = "toast";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    // force reflow so the transition replays on rapid repeats
    void t.offsetWidth;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 1800);
  }
  function wireEmailCopy(el) {
    if (!el) return;
    el.addEventListener("click", function () {
      var addr = el.getAttribute("data-email");
      if (!addr || !navigator.clipboard || !navigator.clipboard.writeText) return;
      navigator.clipboard.writeText(addr).then(function () {
        showToast("Email copied — " + addr);
      }).catch(function () {});
    });
  }
  wireEmailCopy(document.getElementById("email-btn"));
  wireEmailCopy(document.getElementById("email-side"));

  // Footer year
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
