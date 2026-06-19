(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  var success = document.getElementById("contact-success");
  var error = document.getElementById("form-error");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      if (error) error.hidden = false;
      return;
    }

    if (error) error.hidden = true;

    /* 本番環境では Formspree / Netlify Forms / 自社API 等の endpoint に差し替え */
    form.hidden = true;
    var aside = document.querySelector(".contact-aside");
    if (aside) aside.hidden = true;
    if (success) success.hidden = false;

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
