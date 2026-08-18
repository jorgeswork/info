// Obsidian Publish-style theme toggle + collapsible file explorer.
(function () {
  "use strict";

  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  if (stored === "dark" || stored === "light") {
    document.documentElement.classList.remove("theme-light", "theme-dark");
    document.documentElement.classList.add("theme-" + stored);
  } else {
    var prefersDark = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.add(prefersDark ? "theme-dark" : "theme-light");
  }

  document.addEventListener("click", function (e) {
    var toggle = e.target.closest(".theme-toggle");
    if (toggle) {
      var isDark = document.documentElement.classList.contains("theme-dark");
      var next = isDark ? "light" : "dark";
      document.documentElement.classList.remove("theme-light", "theme-dark");
      document.documentElement.classList.add("theme-" + next);
      try { localStorage.setItem("theme", next); } catch (err) {}
      return;
    }

    var collapse = e.target.closest(".tree-item-self.has-children");
    if (collapse) {
      e.preventDefault();
      var item = collapse.closest(".tree-item");
      if (item) {
        item.classList.toggle("is-collapsed");
        var ind = collapse.querySelector(".tree-item-collapse-indicator");
        if (ind) {
          ind.textContent = item.classList.contains("is-collapsed") ? "▸" : "▾";
        }
      }
    }
  });
})();
