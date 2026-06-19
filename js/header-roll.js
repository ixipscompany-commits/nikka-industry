(function () {
  "use strict";

  var ROLL_SELECTOR = ".site-logo__mark, .site-nav__list a[data-i18n]";

  /* px で 360° ＝ 1 回転（大きいほど緩やか） */
  var SCROLL_PER_ROTATION = 200;
  /* 文字ごとのスクロール遅延（大きいほどスタッガーが長い） */
  var CHAR_STAGGER_PX = 15;
  /* スクロール追従のなめらかさ（0〜1、小さいほどキビキビ） */
  var CHAR_SMOOTHING = 0.1;
  /* スクロール停止後に正面へ戻すまでの待機 */
  var IDLE_DELAY = 200;
  /* 停止時の文字リセット間隔 */
  var SNAP_STAGGER = 0.01;

  var idleTimer = null;
  var settleTween = null;
  var scrollListener = null;
  var lastScrollY = 0;
  var lastLenisScroll = 0;
  var virtualScroll = 0;
  var rollChars = [];

  function prefersReduced() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function getScrollPosition() {
    return window.scrollY || document.documentElement.scrollTop || 0;
  }

  function splitRollText(el, text) {
    el.textContent = "";
    el.classList.add("roll-text");
    el.setAttribute("aria-label", text);

    var index = 0;
    Array.from(text).forEach(function (char) {
      if (char === " ") {
        el.appendChild(document.createTextNode(" "));
        return;
      }

      var span = document.createElement("span");
      span.className = "roll-char";
      span.style.setProperty("--i", index);
      span.textContent = char;
      span.setAttribute("aria-hidden", "true");
      el.appendChild(span);
      index += 1;
    });
  }

  function getRollChars() {
    return gsap.utils
      ? gsap.utils.toArray(".roll-char")
      : Array.prototype.slice.call(document.querySelectorAll(".roll-char"));
  }

  function getCharIndex(char) {
    return parseInt(char.style.getPropertyValue("--i") || "0", 10);
  }

  function resetCharTransforms(chars) {
    chars.forEach(function (char) {
      if (typeof gsap !== "undefined") {
        gsap.killTweensOf(char);
        gsap.set(char, {
          transformPerspective: 160,
          transformOrigin: "50% 50%",
          rotateX: 0,
          force3D: true,
        });
      } else {
        char.style.transform = "";
      }
    });
  }

  function rotationForChar(char) {
    var charScroll = virtualScroll - getCharIndex(char) * CHAR_STAGGER_PX;
    return (charScroll / SCROLL_PER_ROTATION) * 360;
  }

  function syncVirtualFromLeadChar() {
    if (!rollChars.length || typeof gsap === "undefined") return;
    var leadRotation = gsap.getProperty(rollChars[0], "rotateX") || 0;
    virtualScroll = (leadRotation / 360) * SCROLL_PER_ROTATION;
  }

  function applyRollFromScroll() {
    if (!rollChars.length || typeof gsap === "undefined") return;

    rollChars.forEach(function (char) {
      var target = rotationForChar(char);
      var current = gsap.getProperty(char, "rotateX") || 0;
      var next = current + (target - current) * CHAR_SMOOTHING;

      gsap.set(char, {
        rotateX: next,
        transformPerspective: 160,
        transformOrigin: "50% 50%",
        force3D: true,
      });
    });
  }

  function cancelSettle() {
    clearTimeout(idleTimer);
    idleTimer = null;

    if (settleTween) {
      settleTween.kill();
      settleTween = null;
    }
  }

  function settleRoll() {
    if (!rollChars.length || typeof gsap === "undefined") return;

    cancelSettle();

    settleTween = gsap.to(rollChars, {
      rotateX: 0,
      duration: 0.68,
      stagger: SNAP_STAGGER,
      ease: "power2.out",
      force3D: true,
      overwrite: true,
      onComplete: function () {
        resetCharTransforms(rollChars);
        virtualScroll = 0;
        settleTween = null;
      },
    });
  }

  function scheduleSettle() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(settleRoll, IDLE_DELAY);
  }

  function handleScrollDelta(delta) {
    if (!delta || prefersReduced()) return;

    if (settleTween) {
      settleTween.kill();
      settleTween = null;
      syncVirtualFromLeadChar();
    }

    virtualScroll += delta;
    applyRollFromScroll();
    scheduleSettle();
  }

  function readLenisScroll(e) {
    if (typeof e === "number") return e;
    if (e && typeof e.scroll === "number") return e.scroll;
    if (e && typeof e.animatedScroll === "number") return e.animatedScroll;
    return getScrollPosition();
  }

  function onLenisScroll(e) {
    var current = readLenisScroll(e);
    var delta = current - lastLenisScroll;
    lastLenisScroll = current;
    lastScrollY = current;
    if (Math.abs(delta) < 0.1) return;
    handleScrollDelta(delta);
  }

  function killHeaderRollScroll() {
    cancelSettle();

    window.onLenisHeaderRoll = null;

    if (scrollListener) {
      window.removeEventListener("scroll", scrollListener);
      scrollListener = null;
    }

    lastScrollY = 0;
    lastLenisScroll = getScrollPosition();
    virtualScroll = 0;
  }

  function initHeaderRollScroll() {
    killHeaderRollScroll();

    if (prefersReduced() || typeof gsap === "undefined") return;

    rollChars = getRollChars();
    if (!rollChars.length) return;

    resetCharTransforms(rollChars);
    lastScrollY = getScrollPosition();
    lastLenisScroll = lastScrollY;

    window.onLenisHeaderRoll = onLenisScroll;

    if (typeof Lenis === "undefined") {
      scrollListener = function () {
        var current = getScrollPosition();
        var delta = current - lastScrollY;
        if (Math.abs(delta) < 0.1) return;
        lastScrollY = current;
        lastLenisScroll = current;
        handleScrollDelta(delta);
      };

      window.addEventListener("scroll", scrollListener, { passive: true });
    }
  }

  function initHeaderRoll() {
    killHeaderRollScroll();

    document.querySelectorAll(ROLL_SELECTOR).forEach(function (el) {
      if (prefersReduced()) {
        el.classList.remove("roll-text");
        return;
      }

      var text = el.textContent.trim();
      if (!text) return;

      splitRollText(el, text);
    });
  }

  window.initHeaderRoll = initHeaderRoll;
  window.initHeaderRollScroll = initHeaderRollScroll;
})();
