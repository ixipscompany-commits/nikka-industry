(function () {
  "use strict";

  /* ==========================================================================
     NIKKA Opening Intro — GSAP timeline controller
     完全独立。既存サイトのロジックには干渉しない。
     フェーズ: 1 黎明 / 2 引力と太陽 / 3 日下の誕生 / 4 本編への昇華
     ========================================================================== */

  var ROOT_ID = "nk-intro";
  var SESSION_KEY = "nk-intro-seen";

  /* 事業を連想させるコンセプトワード（serif表示） */
  var WORDS = [
    { text: "Beauty", sub: "美", accent: true },
    { text: "Design", sub: "意匠" },
    { text: "Space", sub: "空間", accent: true },
    { text: "Technology", sub: "技術" },
    { text: "Creative", sub: "創造" },
    { text: "Future", sub: "未来", accent: true },
    { text: "Salon", sub: "美容" },
    { text: "Estate", sub: "不動産" },
    { text: "Craft", sub: "匠" },
    { text: "Light", sub: "光", accent: true }
  ];

  /* 画面を満たす浮遊要素の配置（中央はロゴ用に空ける） */
  var SLOTS = [
    { x: 16, y: 20 }, { x: 50, y: 14 }, { x: 83, y: 19 },
    { x: 26, y: 38 }, { x: 74, y: 36 },
    { x: 12, y: 58 }, { x: 88, y: 56 },
    { x: 22, y: 80 }, { x: 50, y: 86 }, { x: 80, y: 78 },
    { x: 38, y: 26 }, { x: 62, y: 72 }, { x: 35, y: 64 }, { x: 67, y: 50 }
  ];

  function prefersReduced() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function lockScroll() {
    document.documentElement.classList.add("nk-intro-lock");
    try {
      window.scrollTo(0, 0);
    } catch (e) {}
  }

  function unlockScroll() {
    document.documentElement.classList.remove("nk-intro-lock");
    /* Lenis 等のスクロールが既に開始していても、最上部へ揃える */
    try {
      window.scrollTo(0, 0);
    } catch (e) {}
  }

  function buildFloats(stage) {
    var floats = [];
    if (!stage) return floats;

    var vw = window.innerWidth;
    var baseFont = vw < 640 ? 26 : vw < 1024 ? 38 : 52;

    SLOTS.forEach(function (slot, i) {
      var el = document.createElement("div");
      el.className = "nk-intro__float";
      el.style.left = slot.x + "%";
      el.style.top = slot.y + "%";

      /* ワードと写真枠を交互気味に配置 */
      var isPhoto = i % 3 === 2;

      if (isPhoto) {
        var size = rand(0.7, 1.15);
        var w = Math.round(baseFont * 2.6 * size);
        var h = Math.round(w * rand(0.72, 1.05));
        el.classList.add("nk-intro__photo");
        el.style.width = w + "px";
        el.style.height = h + "px";
        el.style.position = "absolute";
      } else {
        var word = WORDS[i % WORDS.length];
        el.classList.add("nk-intro__word");
        if (word.accent) el.classList.add("nk-intro__word--accent");
        el.style.fontSize = Math.round(baseFont * rand(0.78, 1.18)) + "px";
        el.innerHTML =
          word.text +
          (word.sub
            ? '<span class="nk-intro__word-sub">' + word.sub + "</span>"
            : "");
      }

      stage.appendChild(el);
      floats.push(el);
    });

    return floats;
  }

  function finish(root) {
    unlockScroll();
    if (root && root.parentNode) {
      root.parentNode.removeChild(root);
    }
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch (e) {}
  }

  /* GSAP 不在 / reduced motion: 即時スキップ */
  function instantSkip(root) {
    finish(root);
  }

  function play(root, reduced, useImage) {
    var gsap = window.gsap;
    var stage = root.querySelector(".nk-intro__stage");
    var aura = root.querySelector(".nk-intro__aura");
    var glow = root.querySelector(".nk-intro__glow");
    var flash = root.querySelector(".nk-intro__flash");
    var arc = root.querySelector(".nk-intro__arc");
    var flames = Array.prototype.slice.call(
      root.querySelectorAll(".nk-intro__flame")
    );
    var iixii = root.querySelector(".nk-intro__iixii");
    var kanji = root.querySelector(".nk-intro__kanji");
    var latin = root.querySelector(".nk-intro__latin");
    var divider = root.querySelector(".nk-intro__divider");
    var logo = root.querySelector(".nk-intro__logo");
    var logoImg = root.querySelector(".nk-intro__logo-img");

    /* 実ロゴ画像を使うか、再現SVGエンブレムを使うか */
    if (!useImage) {
      logo.classList.add("is-fallback");
    }

    /* 短縮版でもワード・写真・集約は必ず見せる（速度だけ上げる） */
    var floats = buildFloats(stage);

    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;

    /* 初期状態 */
    gsap.set(logo, { autoAlpha: 0, scale: 0.9 });
    if (useImage) {
      gsap.set(logoImg, { clipPath: "inset(0 100% 0 0)", scale: 0.92, autoAlpha: 1 });
    } else {
      gsap.set(arc, { scale: 0.7, autoAlpha: 0, rotate: -110 });
      gsap.set(flames, { scaleY: 0, autoAlpha: 0 });
      gsap.set([iixii, kanji, latin], { autoAlpha: 0 });
    }

    var tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: function () {
        finish(root);
      }
    });

    /* 再訪（同一セッション）は全フェーズを保ちつつ高速再生＝短縮 */
    if (reduced) {
      tl.timeScale(1.7);
    }

    /* ----- フェーズ1: 黎明（浮遊して画面を満たす） ----- */
    if (floats.length) {
      tl.to(aura, { autoAlpha: 0.45, scale: 0.7, duration: 2.4 }, 0);

      var n = floats.length;
      floats.forEach(function (el, i) {
        var driftX = rand(-18, 18);
        var driftY = rand(-22, 22);
        /* 順次フィル: ゆったり画面を満たしていく */
        var inAt = (i / n) * 2.4 + rand(0, 0.25);

        gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0.82, x: 0, y: 0 });

        /* ふわっと出現 */
        tl.to(
          el,
          {
            autoAlpha: i % 4 === 0 ? 0.62 : 0.95,
            scale: 1,
            duration: 1.2,
            ease: "power2.out"
          },
          inAt
        );

        /* 心地よい漂い（長めにたゆたう） */
        tl.to(
          el,
          {
            x: driftX,
            y: driftY,
            duration: 2.8,
            ease: "sine.inOut"
          },
          inAt + 0.5
        );
      });

      /* ----- フェーズ2: 引力と太陽（中央へ凝縮） ----- */
      /* 全要素が出そろい、ひと呼吸おいてから集約 */
      tl.addLabel("converge", 4.4);

      floats.forEach(function (el, i) {
        var rect = el.getBoundingClientRect();
        var ex = rect.left + rect.width / 2;
        var ey = rect.top + rect.height / 2;
        var dx = cx - ex;
        var dy = cy - ey;

        /* overwrite:auto で漂いを引き継ぎ、ゆるやかに中央へ吸い込む */
        tl.to(
          el,
          {
            x: dx,
            y: dy,
            scale: 0.1,
            rotation: rand(-45, 45),
            autoAlpha: 0,
            duration: rand(1.5, 1.9),
            ease: "power2.in",
            overwrite: "auto"
          },
          "converge+=" + (i * 0.05)
        );
      });

      /* 引力の中心：オーラが収束し脈動 */
      tl.to(
        aura,
        { scale: 0.3, autoAlpha: 0.9, duration: 1.5, ease: "power2.in" },
        "converge+=0.4"
      );
    }

    /* ----- フェーズ3: 日下の誕生（光と共にシンボル出現） ----- */
    var birth = floats.length ? "-=0.15" : 0.1;

    /* 光のフラッシュ（凝縮の瞬間に弾ける） */
    tl.to(
      flash,
      { autoAlpha: 0.95, duration: 0.28, ease: "power2.out" },
      birth
    );
    tl.to(flash, { autoAlpha: 0, duration: 0.9, ease: "power2.inOut" }, ">-0.02");

    /* オーラ消し込み */
    if (aura) {
      tl.to(aura, { autoAlpha: 0, duration: 0.6 }, "<");
    }

    /* ロゴ枠を可視化 */
    tl.to(logo, { autoAlpha: 1, scale: 1, duration: 0.6 }, "<0.1");

    /* グロー（光が溢れ出る） */
    tl.fromTo(
      glow,
      { autoAlpha: 0, scale: 0.4 },
      { autoAlpha: 1, scale: 1, duration: 0.7, ease: "power2.out" },
      "<"
    );

    if (useImage) {
      /* 実ロゴ: 左（シンボル）→右（日華/NIKKA CO.JP）へ光が走るように出現 */
      tl.to(
        logoImg,
        {
          clipPath: "inset(0 0% 0 0)",
          scale: 1,
          duration: 1.1,
          ease: "power3.out"
        },
        "<0.05"
      );
      /* グローを落ち着かせる */
      tl.to(glow, { autoAlpha: 0.55, scale: 0.95, duration: 0.8 }, ">-0.35");
    } else {
      /* 再現エンブレム: ゴールドの輪 → 炎が立ち上る → iixii → 日華/NIKKA CO.JP */
      tl.to(
        arc,
        {
          scale: 1,
          autoAlpha: 1,
          rotate: -90,
          duration: 0.7,
          ease: "back.out(1.5)"
        },
        "<0.05"
      );
      tl.to(
        flames,
        {
          scaleY: 1,
          autoAlpha: 1,
          duration: 0.6,
          ease: "back.out(1.8)",
          stagger: 0.08
        },
        "<0.12"
      );
      tl.to(
        iixii,
        { autoAlpha: 1, duration: 0.5, ease: "power2.out" },
        ">-0.1"
      );
      tl.to(glow, { autoAlpha: 0.5, scale: 0.92, duration: 0.8 }, "<");

      if (divider) {
        tl.to(divider, { scaleY: 1, duration: 0.5, ease: "power2.out" }, "<0.1");
      }
      tl.to(
        kanji,
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "<0.05"
      );
      tl.fromTo(
        latin,
        { autoAlpha: 0, y: 6, letterSpacing: "0.6em" },
        { autoAlpha: 1, y: 0, letterSpacing: "0.42em", duration: 0.8, ease: "power2.out" },
        "<0.12"
      );
    }

    /* やわらかな呼吸（太陽の脈動） */
    tl.to(glow, { autoAlpha: 0.72, scale: 1, duration: 0.7, ease: "sine.inOut" }, ">");

    /* ----- フェーズ4: 本編への昇華（光に包まれ溶ける） ----- */
    var hold = 0.8;
    tl.to({}, { duration: hold });

    /* 全体が光に包まれてから消える */
    tl.to(flash, { autoAlpha: 0.85, duration: 0.55, ease: "power2.in" });
    tl.to(
      root,
      {
        autoAlpha: 0,
        duration: 0.85,
        ease: "power2.inOut"
      },
      ">-0.25"
    );
    tl.to(flash, { autoAlpha: 0, duration: 0.6 }, "<0.1");

    return tl;
  }

  function startPlayback(root, seen) {
    var img = root.querySelector(".nk-intro__logo-img");
    var started = false;

    function begin(useImage) {
      if (started) return;
      started = true;
      lockScroll();
      play(root, seen, useImage);
    }

    /* 実ロゴ画像の読込可否を判定（成功→画像版 / 失敗→SVGフォールバック） */
    if (!img) {
      begin(false);
      return;
    }

    if (img.complete) {
      begin(img.naturalWidth > 0);
      return;
    }

    img.addEventListener(
      "load",
      function () {
        begin(img.naturalWidth > 0);
      },
      { once: true }
    );
    img.addEventListener(
      "error",
      function () {
        begin(false);
      },
      { once: true }
    );
  }

  function initIntro() {
    var root = document.getElementById(ROOT_ID);
    if (!root) return;

    /* prefers-reduced-motion または GSAP 不在: 即スキップ */
    if (prefersReduced() || typeof window.gsap === "undefined") {
      instantSkip(root);
      return;
    }

    /* 2回目以降（同一セッション）: 短縮版 */
    var seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch (e) {}

    startPlayback(root, seen);
  }

  if (document.readyState === "complete") {
    initIntro();
  } else {
    document.addEventListener("DOMContentLoaded", initIntro);
  }
})();
