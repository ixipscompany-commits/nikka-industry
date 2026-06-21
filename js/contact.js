(function () {
  "use strict";

  var ENDPOINT = "https://formsubmit.co/ajax/info@nikka.asia";

  var form = document.getElementById("contact-form");
  var success = document.getElementById("contact-success");
  var error = document.getElementById("form-error");
  var submitBtn = form && form.querySelector('button[type="submit"]');
  var submitLabel = submitBtn && submitBtn.querySelector("span");

  if (!form) return;

  function translate(key) {
    if (typeof window.nikkaTranslate === "function") {
      return window.nikkaTranslate(key);
    }
    return "";
  }

  function showSuccess() {
    form.hidden = true;
    var aside = document.querySelector(".contact-aside");
    if (aside) aside.hidden = true;
    if (success) success.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function setSubmitting(isSubmitting) {
    if (!submitBtn) return;
    submitBtn.disabled = isSubmitting;
    if (submitLabel) {
      submitLabel.textContent = isSubmitting
        ? translate("contact.form.sending") || "送信中…"
        : translate("contact.form.submit") || "送信する";
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      if (error) {
        error.textContent = translate("contact.form.error");
        error.hidden = false;
      }
      return;
    }

    if (error) error.hidden = true;
    setSubmitting(true);

    var formData = new FormData(form);
    formData.append("_subject", "【NIKKA】お問い合わせ");
    formData.append("_template", "table");
    formData.append("_captcha", "false");

    fetch(ENDPOINT, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Send failed");
        return res.json();
      })
      .then(function () {
        showSuccess();
      })
      .catch(function () {
        if (error) {
          error.textContent = translate("contact.form.sendError");
          error.hidden = false;
        }
        setSubmitting(false);
      });
  });
})();
